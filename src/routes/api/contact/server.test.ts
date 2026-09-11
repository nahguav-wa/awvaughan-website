import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';

// These tests cover deployed behaviour. The development path, where an
// unconfigured mailer is logged rather than treated as a failure, is covered in
// server.dev.test.ts.
vi.mock('$app/environment', () => ({ dev: false }));

/**
 * Contact API endpoint tests
 *
 * Exercises the exported POST handler: validation, normalization, Turnstile
 * verification, delivery outcome reporting, the fallback store, and the Meta
 * Conversions API call.
 *
 * The delivery cases matter most. The handler used to catch every email failure
 * and return `{ success: true }` anyway, so a customer was told they would be
 * contacted while the submission vanished — and a Lead conversion was reported
 * to Meta for a lead nobody received.
 */

// Dynamic import to work around SvelteKit module resolution
const { POST, __resetAccessTokenCache } = await import('./+server');
const { sha256Hex } = await import('$lib/utils/meta');

/** Credentials that make the handler consider mail delivery configured. */
const MAIL_ENV = {
	MS365_TENANT_ID: 'tenant',
	MS365_CLIENT_ID: 'client',
	MS365_CLIENT_SECRET: 'secret',
	MS365_EMAIL: 'contact@awvaughan.com'
};

const VALID_SUBMISSION = {
	firstName: 'John',
	lastName: 'Doe',
	email: 'john@example.com',
	message: 'Hello there'
};

interface FetchCall {
	url: string;
	init: RequestInit;
	body: string;
}

interface StubOptions {
	/** Response for the Azure AD token endpoint. */
	token?: Response | (() => Response);
	/** Response for the Graph sendMail call. */
	graph?: Response | (() => Response);
	/** Response for Turnstile siteverify. */
	turnstile?: Response | (() => Response);
	/** Response for the Meta Conversions API. */
	meta?: Response | (() => Response);
}

let calls: FetchCall[] = [];

function resolve(value: Response | (() => Response) | undefined, fallback: Response): Response {
	if (!value) return fallback;
	return typeof value === 'function' ? value() : value;
}

/**
 * Route outbound calls by host and record every one, so tests can assert on
 * what was actually sent rather than on internals.
 */
function stubFetch(options: StubOptions = {}) {
	calls = [];
	vi.stubGlobal(
		'fetch',
		vi.fn(async (url: string | URL, init: RequestInit = {}) => {
			const href = String(url);
			let body = '';
			if (typeof init.body === 'string') body = init.body;
			else if (init.body instanceof URLSearchParams) body = init.body.toString();
			calls.push({ url: href, init, body });

			if (href.includes('login.microsoftonline.com')) {
				return resolve(options.token, Response.json({ access_token: 'tok', expires_in: 3600 }));
			}
			if (href.includes('graph.microsoft.com')) {
				return resolve(options.graph, new Response(null, { status: 202 }));
			}
			if (href.includes('challenges.cloudflare.com')) {
				return resolve(options.turnstile, Response.json({ success: true }));
			}
			if (href.includes('graph.facebook.com')) {
				return resolve(options.meta, Response.json({ events_received: 1 }));
			}
			return Response.json({ success: true });
		})
	);
	return calls;
}

function callsTo(fragment: string) {
	return calls.filter((call) => call.url.includes(fragment));
}

/** The Meta CAPI event payload, parsed out of the recorded request. */
function metaEvent() {
	const call = callsTo('graph.facebook.com')[0];
	if (!call) return undefined;
	return JSON.parse(call.body).data[0];
}

/** The Graph sendMail message, parsed out of the recorded request. */
function sentMail() {
	const call = callsTo('graph.microsoft.com')[0];
	if (!call) return undefined;
	return JSON.parse(call.body).message;
}

interface CallOptions {
	/** Platform env bindings for this request. */
	env?: Record<string, unknown>;
	cookies?: Record<string, string>;
	headers?: Record<string, string>;
	/** Provide a Cloudflare execution context exposing waitUntil. */
	ctx?: { waitUntil: (promise: Promise<unknown>) => void };
}

async function callPOST(body: Record<string, unknown>, options: CallOptions = {}) {
	const request = new Request('http://localhost/api/contact', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	});
	for (const [name, value] of Object.entries(options.headers ?? {})) {
		request.headers.set(name, value);
	}
	const cookies = { get: (name: string) => options.cookies?.[name] };
	const platform = { env: options.env ?? {}, ctx: options.ctx };
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return POST({ request, platform, cookies } as any);
}

/** Await the handler and return the thrown SvelteKit HttpError. */
async function expectError(promise: unknown) {
	try {
		await promise;
	} catch (err) {
		return err as { status: number; body: { message: string } };
	}
	throw new Error('expected the handler to throw');
}

beforeEach(() => {
	__resetAccessTokenCache();
	stubFetch();
	// The local-development path logs the submission it did not send; keep it
	// out of the test output.
	vi.spyOn(console, 'info').mockImplementation(() => {});
});

afterEach(() => {
	vi.unstubAllGlobals();
	vi.restoreAllMocks();
});

describe('POST /api/contact — validation', () => {
	it('accepts a valid submission', async () => {
		const response = await callPOST(VALID_SUBMISSION, { env: MAIL_ENV });

		expect(response.status).toBe(200);
		const data = await response.json();
		expect(data.success).toBe(true);
		expect(data.delivered).toBe(true);
		expect(data.message).toContain('Thank you');
	});

	it.each(['firstName', 'lastName', 'email', 'message'])('rejects a missing %s', async (field) => {
		const error = await expectError(
			callPOST({ ...VALID_SUBMISSION, [field]: '' }, { env: MAIL_ENV })
		);
		expect(error.status).toBe(400);
		expect(error.body.message).toBe('Missing required fields');
	});

	it('rejects a required field that is only whitespace', async () => {
		// Validation runs on the normalized value. Checking the raw value first
		// let inputs through that were empty by the time they reached the email.
		const error = await expectError(
			callPOST({ ...VALID_SUBMISSION, firstName: '   \n\t  ' }, { env: MAIL_ENV })
		);
		expect(error.status).toBe(400);
		expect(error.body.message).toBe('Missing required fields');
	});

	it('preserves a value containing angle brackets rather than emptying it', async () => {
		// The old tag-stripping regex reduced "<b>Jo</b>" to nothing, which then
		// passed the required-field check and produced a nameless lead.
		await callPOST({ ...VALID_SUBMISSION, firstName: '<b>Jo</b>' }, { env: MAIL_ENV });

		expect(sentMail()?.body.content).toContain('<b>Jo</b> Doe');
	});

	it('rejects an invalid email address', async () => {
		const error = await expectError(
			callPOST({ ...VALID_SUBMISSION, email: 'not-an-email' }, { env: MAIL_ENV })
		);
		expect(error.status).toBe(400);
		expect(error.body.message).toBe('Invalid email address');
	});

	it('rejects an over-long field', async () => {
		const error = await expectError(
			callPOST({ ...VALID_SUBMISSION, message: 'x'.repeat(5001) }, { env: MAIL_ENV })
		);
		expect(error.status).toBe(400);
		expect(error.body.message).toContain('message exceeds maximum allowed length');
	});

	it('rejects an oversized body before parsing it', async () => {
		const error = await expectError(
			callPOST(VALID_SUBMISSION, {
				env: MAIL_ENV,
				headers: { 'content-length': String(64 * 1024 + 1) }
			})
		);
		expect(error.status).toBe(413);
	});

	it('rejects a malformed body with 400 rather than 500', async () => {
		const request = new Request('http://localhost/api/contact', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: 'not json'
		});
		const error = await expectError(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			POST({ request, platform: undefined, cookies: { get: () => undefined } } as any)
		);
		expect(error.status).toBe(400);
		expect(error.body.message).toBe('Invalid request body');
	});
});

describe('POST /api/contact — message content', () => {
	it('preserves angle brackets in the message body', async () => {
		// The old tag-stripping regex turned this into "I need a pad  wide",
		// deleting the dimensions of the job from the notification email.
		await callPOST(
			{ ...VALID_SUBMISSION, message: 'I need a pad <10 ft > wide, budget <$500' },
			{ env: MAIL_ENV }
		);

		expect(sentMail()?.body.content).toContain('I need a pad <10 ft > wide, budget <$500');
	});

	it('strips control characters and collapses blank lines', async () => {
		await callPOST(
			{ ...VALID_SUBMISSION, message: 'line one \r\n\n\n\nline two' },
			{ env: MAIL_ENV }
		);

		const content = sentMail()?.body.content as string;
		expect(content).toContain('line one\n\nline two');
		expect(content).not.toContain(' ');
	});

	it('sends as plain text, replying to the submitter', async () => {
		await callPOST(VALID_SUBMISSION, {
			env: { ...MAIL_ENV, CONTACT_RECIPIENT_EMAIL: 'leads@awvaughan.com' }
		});

		const message = sentMail();
		expect(message?.body.contentType).toBe('Text');
		expect(message?.toRecipients[0].emailAddress.address).toBe('leads@awvaughan.com');
		expect(message?.replyTo[0].emailAddress.address).toBe('john@example.com');
		expect(message?.replyTo[0].emailAddress.name).toBe('John Doe');
	});
});

describe('POST /api/contact — delivery outcome', () => {
	it('reports success when the email is sent', async () => {
		const response = await callPOST(VALID_SUBMISSION, { env: MAIL_ENV });

		expect(response.status).toBe(200);
		expect((await response.json()).delivered).toBe(true);
	});

	it('reuses the access token across submissions', async () => {
		await callPOST(VALID_SUBMISSION, { env: MAIL_ENV });
		await callPOST(VALID_SUBMISSION, { env: MAIL_ENV });

		expect(callsTo('login.microsoftonline.com')).toHaveLength(1);
		expect(callsTo('graph.microsoft.com')).toHaveLength(2);
	});

	it('fails loudly when the email cannot be sent and there is no fallback store', async () => {
		stubFetch({ graph: () => new Response('upstream boom', { status: 500 }) });
		vi.spyOn(console, 'error').mockImplementation(() => {});

		const error = await expectError(callPOST(VALID_SUBMISSION, { env: MAIL_ENV }));

		expect(error.status).toBe(502);
		expect(error.body.message).toContain('757-402-1100');
	});

	it('does not report a Meta conversion for a submission it failed to capture', async () => {
		stubFetch({ graph: () => new Response('boom', { status: 500 }) });
		vi.spyOn(console, 'error').mockImplementation(() => {});

		await expectError(
			callPOST(VALID_SUBMISSION, { env: { ...MAIL_ENV, META_PIXEL_TOKEN: 'meta-token' } })
		);

		expect(callsTo('graph.facebook.com')).toHaveLength(0);
	});

	it('treats missing mail credentials in a deployed environment as a failure', async () => {
		vi.spyOn(console, 'error').mockImplementation(() => {});

		const error = await expectError(callPOST(VALID_SUBMISSION, { env: {} }));

		expect(error.status).toBe(502);
	});

	it('stores the submission when email fails and KV is bound', async () => {
		stubFetch({ graph: () => new Response('boom', { status: 500 }) });
		vi.spyOn(console, 'error').mockImplementation(() => {});
		const put = vi.fn(async () => {});

		const response = await callPOST(
			{ ...VALID_SUBMISSION, message: 'Standing water by the shed' },
			{ env: { ...MAIL_ENV, LEADS: { put } }, headers: { 'cf-connecting-ip': '203.0.113.7' } }
		);

		expect(response.status).toBe(200);
		const data = await response.json();
		expect(data.success).toBe(true);
		expect(data.delivered).toBe(false);
		expect(data.message).toContain('757-402-1100');

		expect(put).toHaveBeenCalledTimes(1);
		const [key, value, options] = put.mock.calls[0] as unknown as [
			string,
			string,
			{ expirationTtl: number }
		];
		expect(key).toMatch(/^lead:/);
		const stored = JSON.parse(value);
		expect(stored.email).toBe('john@example.com');
		expect(stored.message).toBe('Standing water by the shed');
		expect(stored.clientIp).toBe('203.0.113.7');
		expect(options.expirationTtl).toBeGreaterThan(0);
	});

	it('still fails loudly when both the email and the fallback store fail', async () => {
		stubFetch({ graph: () => new Response('boom', { status: 500 }) });
		vi.spyOn(console, 'error').mockImplementation(() => {});
		const put = vi.fn(async () => {
			throw new Error('kv down');
		});

		const error = await expectError(
			callPOST(VALID_SUBMISSION, { env: { ...MAIL_ENV, LEADS: { put } } })
		);

		expect(error.status).toBe(502);
	});
});

describe('POST /api/contact — spam controls', () => {
	it('silently drops a submission that fills the honeypot', async () => {
		const response = await callPOST(
			{ ...VALID_SUBMISSION, website: 'http://spam.example' },
			{ env: { ...MAIL_ENV, META_PIXEL_TOKEN: 'meta-token' } }
		);

		// Looks accepted, so the bot learns nothing.
		expect(response.status).toBe(200);
		// But nothing was sent or tracked.
		expect(callsTo('graph.microsoft.com')).toHaveLength(0);
		expect(callsTo('graph.facebook.com')).toHaveLength(0);
	});

	it('requires a Turnstile token when the secret is configured', async () => {
		const error = await expectError(
			callPOST(VALID_SUBMISSION, { env: { TURNSTILE_SECRET_KEY: 'shh' } })
		);

		expect(error.status).toBe(400);
		expect(error.body.message).toContain('CAPTCHA');
	});

	it('tells the visitor to solve it again when the token is spent or expired', async () => {
		stubFetch({
			turnstile: () => Response.json({ success: false, 'error-codes': ['timeout-or-duplicate'] })
		});

		const error = await expectError(
			callPOST(
				{ ...VALID_SUBMISSION, 'cf-turnstile-response': 'stale' },
				{ env: { TURNSTILE_SECRET_KEY: 'shh' } }
			)
		);

		expect(error.status).toBe(400);
		expect(error.body.message).toContain('expired');
	});

	it('rejects a token Cloudflare does not accept', async () => {
		stubFetch({
			turnstile: () => Response.json({ success: false, 'error-codes': ['invalid-input-response'] })
		});

		const error = await expectError(
			callPOST(
				{ ...VALID_SUBMISSION, 'cf-turnstile-response': 'bad' },
				{ env: { TURNSTILE_SECRET_KEY: 'shh' } }
			)
		);

		expect(error.status).toBe(400);
		expect(error.body.message).toContain('failed');
	});

	it('forwards the visitor IP to siteverify', async () => {
		await callPOST(
			{ ...VALID_SUBMISSION, 'cf-turnstile-response': 'ok' },
			{
				env: { ...MAIL_ENV, TURNSTILE_SECRET_KEY: 'shh' },
				headers: { 'cf-connecting-ip': '1.2.3.4' }
			}
		);

		expect(callsTo('challenges.cloudflare.com')[0].body).toContain('remoteip=1.2.3.4');
	});

	it('skips verification entirely when no secret is configured', async () => {
		await callPOST(VALID_SUBMISSION, { env: MAIL_ENV });
		expect(callsTo('challenges.cloudflare.com')).toHaveLength(0);
	});
});

describe('POST /api/contact — Meta Conversions API', () => {
	const META_ENV = { ...MAIL_ENV, META_PIXEL_TOKEN: 'meta-token' };

	it('sends a Lead event with hashed identifiers', async () => {
		await callPOST(VALID_SUBMISSION, { env: META_ENV });

		const event = metaEvent();
		expect(event.event_name).toBe('Lead');
		expect(event.action_source).toBe('website');
		// SHA-256 of the normalized email.
		expect(event.user_data.em).toMatch(/^[0-9a-f]{64}$/);
		expect(event.user_data.fn).toMatch(/^[0-9a-f]{64}$/);
	});

	it('sends the token as a Bearer header, never in the URL', async () => {
		await callPOST(VALID_SUBMISSION, { env: META_ENV });

		const call = callsTo('graph.facebook.com')[0];
		expect(call.url).not.toContain('meta-token');
		expect((call.init.headers as Record<string, string>).Authorization).toBe('Bearer meta-token');
	});

	it('hashes a name written in a non-Latin script', async () => {
		// The old normalizer stripped everything outside a-z, reducing this to an
		// empty string and hashing that instead — an identifier that can never
		// match, and the same one for every such customer.
		await callPOST({ ...VALID_SUBMISSION, firstName: '王小明' }, { env: META_ENV });

		expect(metaEvent().user_data.fn).toBe(await sha256Hex('王小明'));
	});

	it('folds accents so José and Jose produce the same hash', async () => {
		await callPOST({ ...VALID_SUBMISSION, firstName: 'José' }, { env: META_ENV });

		expect(metaEvent().user_data.fn).toBe(await sha256Hex('jose'));
	});

	it('omits an identifier whose normalized value is empty', async () => {
		// Punctuation-only input normalizes to nothing. Hashing the empty string
		// produces a valid-looking digest that can never match and is identical
		// for every affected submission, so the field is left out instead.
		await callPOST({ ...VALID_SUBMISSION, firstName: '---' }, { env: META_ENV });

		const userData = metaEvent().user_data;
		expect(userData.fn).toBeUndefined();
		expect(userData.ln).toBeDefined();
		expect(userData.em).toBeDefined();
	});

	it('reuses a well-formed client event ID for deduplication', async () => {
		const eventId = '123e4567-e89b-42d3-a456-426614174000';
		await callPOST({ ...VALID_SUBMISSION, event_id: eventId }, { env: META_ENV });

		expect(metaEvent().event_id).toBe(eventId);
	});

	it('replaces an event ID that is not a UUID', async () => {
		await callPOST({ ...VALID_SUBMISSION, event_id: 'not-a-uuid' }, { env: META_ENV });

		expect(metaEvent().event_id).not.toBe('not-a-uuid');
		expect(metaEvent().event_id).toMatch(/^[0-9a-f-]{36}$/);
	});

	it('forwards the pixel cookies, IP and user agent unhashed', async () => {
		await callPOST(VALID_SUBMISSION, {
			env: META_ENV,
			cookies: { _fbp: 'fb.1.123', _fbc: 'fb.1.456.clickid' },
			headers: { 'cf-connecting-ip': '198.51.100.9', 'user-agent': 'TestAgent/1.0' }
		});

		const userData = metaEvent().user_data;
		expect(userData.fbp).toBe('fb.1.123');
		expect(userData.fbc).toBe('fb.1.456.clickid');
		expect(userData.client_ip_address).toBe('198.51.100.9');
		expect(userData.client_user_agent).toBe('TestAgent/1.0');
	});

	it('omits the conversion value when none is configured', async () => {
		await callPOST(VALID_SUBMISSION, { env: META_ENV });

		// A hardcoded 0.0 gives value-based bidding nothing to optimize toward
		// while looking like a real measurement.
		expect(metaEvent().custom_data).toBeUndefined();
	});

	it('includes the conversion value when one is configured', async () => {
		await callPOST(VALID_SUBMISSION, { env: { ...META_ENV, META_LEAD_VALUE: '250' } });

		expect(metaEvent().custom_data).toEqual({ value: 250, currency: 'USD' });
	});

	it('ignores a non-numeric configured value', async () => {
		await callPOST(VALID_SUBMISSION, { env: { ...META_ENV, META_LEAD_VALUE: 'lots' } });

		expect(metaEvent().custom_data).toBeUndefined();
	});

	it('only accepts an event source URL on this site', async () => {
		await callPOST(
			{ ...VALID_SUBMISSION, event_source_url: 'https://evil.example/contact' },
			{ env: META_ENV }
		);

		expect(metaEvent().event_source_url).toBe('https://awvaughan.com/contact');
	});

	it('still returns success to the visitor when Meta rejects the event', async () => {
		stubFetch({ meta: () => Response.json({ error: { message: 'Invalid parameter' } }) });
		const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

		const response = await callPOST(VALID_SUBMISSION, { env: META_ENV });

		expect(response.status).toBe(200);
		expect((await response.json()).delivered).toBe(true);
		expect(consoleError).toHaveBeenCalledWith(
			'Meta CAPI Lead event failed:',
			expect.objectContaining({ message: expect.stringContaining('Invalid parameter') })
		);
	});

	it('defers the Meta call to waitUntil when an execution context exists', async () => {
		const pending: Promise<unknown>[] = [];
		const response = await callPOST(VALID_SUBMISSION, {
			env: META_ENV,
			ctx: { waitUntil: (promise) => pending.push(promise) }
		});

		expect(response.status).toBe(200);
		expect(pending).toHaveLength(1);
		await Promise.all(pending);
	});

	it('does nothing when no Meta token is configured', async () => {
		await callPOST(VALID_SUBMISSION, { env: MAIL_ENV });
		expect(callsTo('graph.facebook.com')).toHaveLength(0);
	});
});
