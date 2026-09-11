import { describe, it, expect, vi, afterEach } from 'vitest';

/**
 * Contact API endpoint tests
 * Tests the exported POST handler's validation and sanitization logic
 */

// Since the endpoint uses SvelteKit's RequestHandler interface and platform bindings,
// we test the validation/sanitization logic indirectly by importing and invoking the handler.
// We mock the minimal request/platform interface needed.

async function createRequest(body: Record<string, unknown>): Promise<Request> {
	return new Request('http://localhost/api/contact', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	});
}

// Dynamic import to work around SvelteKit module resolution
const { POST } = await import('./+server');

async function callPOST(
	body: Record<string, unknown>,
	options: {
		env?: Record<string, string>;
		cookies?: Record<string, string>;
		headers?: Record<string, string>;
	} = {}
) {
	const request = await createRequest(body);
	for (const [name, value] of Object.entries(options.headers ?? {})) {
		request.headers.set(name, value);
	}
	const cookies = { get: (name: string) => options.cookies?.[name] };
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return POST({ request, platform: { env: options.env ?? {} }, cookies } as any);
}

const VALID_SUBMISSION = {
	firstName: 'John',
	lastName: 'Doe',
	email: 'john@example.com',
	message: 'Hello there'
};

/** Capture only the Meta Conversions API calls, letting any others resolve harmlessly. */
function stubMetaFetch(response = Response.json({ events_received: 1 })) {
	const metaCalls: Array<[string, RequestInit]> = [];
	vi.stubGlobal(
		'fetch',
		vi.fn(async (url: string, init: RequestInit) => {
			if (String(url).includes('graph.facebook.com')) {
				metaCalls.push([String(url), init]);
				return response;
			}
			return Response.json({ success: true });
		})
	);
	return metaCalls;
}

describe('POST /api/contact', () => {
	it('returns success for valid submission', async () => {
		const response = await callPOST({
			firstName: 'John',
			lastName: 'Doe',
			email: 'john@example.com',
			message: 'Hello there'
		});

		expect(response.status).toBe(200);
		const data = await response.json();
		expect(data.success).toBe(true);
		expect(data.message).toContain('Thank you');
	});

	it('rejects missing required fields', async () => {
		await expect(
			callPOST({
				firstName: 'John',
				lastName: '',
				email: 'john@example.com',
				message: 'Hello'
			})
		).rejects.toThrow();
	});

	it('rejects missing firstName', async () => {
		await expect(
			callPOST({
				firstName: '',
				lastName: 'Doe',
				email: 'john@example.com',
				message: 'Hello'
			})
		).rejects.toThrow();
	});

	it('rejects missing email', async () => {
		await expect(
			callPOST({
				firstName: 'John',
				lastName: 'Doe',
				email: '',
				message: 'Hello'
			})
		).rejects.toThrow();
	});

	it('rejects missing message', async () => {
		await expect(
			callPOST({
				firstName: 'John',
				lastName: 'Doe',
				email: 'john@example.com',
				message: ''
			})
		).rejects.toThrow();
	});

	it('rejects invalid email format', async () => {
		await expect(
			callPOST({
				firstName: 'John',
				lastName: 'Doe',
				email: 'not-an-email',
				message: 'Hello'
			})
		).rejects.toThrow();
	});

	it('rejects fields exceeding maximum length', async () => {
		await expect(
			callPOST({
				firstName: 'A'.repeat(101),
				lastName: 'Doe',
				email: 'john@example.com',
				message: 'Hello'
			})
		).rejects.toThrow();
	});

	it('rejects message exceeding maximum length', async () => {
		await expect(
			callPOST({
				firstName: 'John',
				lastName: 'Doe',
				email: 'john@example.com',
				message: 'A'.repeat(5001)
			})
		).rejects.toThrow();
	});

	it('accepts optional fields', async () => {
		const response = await callPOST({
			firstName: 'John',
			lastName: 'Doe',
			email: 'john@example.com',
			message: 'Hello',
			company: 'Acme Corp',
			phone: '757-555-1234',
			subject: 'Test inquiry'
		});

		expect(response.status).toBe(200);
		const data = await response.json();
		expect(data.success).toBe(true);
	});

	it('sanitizes HTML in input fields', async () => {
		// Should succeed without error — HTML is stripped, not rejected
		const response = await callPOST({
			firstName: '<script>alert("xss")</script>John',
			lastName: 'Doe',
			email: 'john@example.com',
			message: 'Hello <b>world</b>'
		});

		expect(response.status).toBe(200);
	});
});

describe('POST /api/contact — Meta Conversions API', () => {
	afterEach(() => {
		vi.unstubAllGlobals();
		vi.restoreAllMocks();
	});

	it('does not call Meta when no access token is configured', async () => {
		const metaCalls = stubMetaFetch();

		await callPOST(VALID_SUBMISSION);

		expect(metaCalls).toHaveLength(0);
	});

	it('sends a Lead event when a token is configured', async () => {
		const metaCalls = stubMetaFetch();

		await callPOST(VALID_SUBMISSION, { env: { META_PIXEL_TOKEN: 'token-123' } });

		expect(metaCalls).toHaveLength(1);
		const body = JSON.parse(metaCalls[0][1].body as string);
		expect(body.data[0].event_name).toBe('Lead');
	});

	it('reuses the browser event ID so the pixel and CAPI events deduplicate', async () => {
		const metaCalls = stubMetaFetch();

		await callPOST(
			{ ...VALID_SUBMISSION, event_id: 'shared-event-id' },
			{ env: { META_PIXEL_TOKEN: 'token-123' } }
		);

		expect(JSON.parse(metaCalls[0][1].body as string).data[0].event_id).toBe('shared-event-id');
	});

	it('generates an event ID when the browser did not supply one', async () => {
		const metaCalls = stubMetaFetch();

		await callPOST(VALID_SUBMISSION, { env: { META_PIXEL_TOKEN: 'token-123' } });

		expect(JSON.parse(metaCalls[0][1].body as string).data[0].event_id).toBeTruthy();
	});

	it('forwards the fbp and fbc cookies unhashed', async () => {
		const metaCalls = stubMetaFetch();

		await callPOST(VALID_SUBMISSION, {
			env: { META_PIXEL_TOKEN: 'token-123' },
			cookies: { _fbp: 'fb.1.123.456', _fbc: 'fb.1.123.abc' }
		});

		const userData = JSON.parse(metaCalls[0][1].body as string).data[0].user_data;
		expect(userData.fbp).toBe('fb.1.123.456');
		expect(userData.fbc).toBe('fb.1.123.abc');
	});

	it('never sends raw PII — email, name, and phone are hashed', async () => {
		const metaCalls = stubMetaFetch();

		await callPOST(
			{ ...VALID_SUBMISSION, phone: '757-402-1100' },
			{ env: { META_PIXEL_TOKEN: 'token-123' } }
		);

		const body = metaCalls[0][1].body as string;
		expect(body).not.toContain('john@example.com');
		expect(body).not.toContain('7574021100');
		expect(body).not.toContain('John');
		expect(body).not.toContain('Doe');
	});

	it('trusts cf-connecting-ip and ignores a spoofable x-forwarded-for', async () => {
		const metaCalls = stubMetaFetch();

		await callPOST(VALID_SUBMISSION, {
			env: { META_PIXEL_TOKEN: 'token-123' },
			headers: { 'cf-connecting-ip': '203.0.113.10', 'x-forwarded-for': '198.51.100.7' }
		});

		const userData = JSON.parse(metaCalls[0][1].body as string).data[0].user_data;
		expect(userData.client_ip_address).toBe('203.0.113.10');
	});

	it('drops a client-supplied off-site event_source_url', async () => {
		const metaCalls = stubMetaFetch();

		await callPOST(
			{ ...VALID_SUBMISSION, event_source_url: 'https://evil.example.com/phish' },
			{ env: { META_PIXEL_TOKEN: 'token-123' } }
		);

		expect(JSON.parse(metaCalls[0][1].body as string).data[0].event_source_url).toBe(
			'https://awvaughan.com/contact'
		);
	});

	it('still returns success to the visitor when Meta rejects the event', async () => {
		vi.spyOn(console, 'error').mockImplementation(() => {});
		stubMetaFetch(
			Response.json({ error: { message: 'Invalid OAuth access token' } }, { status: 400 })
		);

		const response = await callPOST(VALID_SUBMISSION, { env: { META_PIXEL_TOKEN: 'bad-token' } });

		expect(response.status).toBe(200);
		expect((await response.json()).success).toBe(true);
	});

	it('logs a Meta failure rather than swallowing it silently', async () => {
		const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
		stubMetaFetch(
			Response.json({ error: { message: 'Invalid OAuth access token' } }, { status: 400 })
		);

		await callPOST(VALID_SUBMISSION, { env: { META_PIXEL_TOKEN: 'bad-token' } });

		expect(consoleError).toHaveBeenCalledWith(
			'Meta CAPI Lead event failed:',
			expect.objectContaining({ message: expect.stringContaining('Invalid OAuth access token') })
		);
	});
});
