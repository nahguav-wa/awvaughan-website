/**
 * Contact Form API Endpoint
 * Handles form submissions and sends emails via MS365 Graph API
 */

import { json, error } from '@sveltejs/kit';
import { dev } from '$app/environment';
import type { RequestHandler } from './$types';
import { COMPANY_INFO, META_PIXEL_ID } from '$lib/config/constants';
import { isValidEventId, resolveEventSourceUrl, sendMetaConversionEvent } from '$lib/utils/meta';

/**
 * Interface for contact form data
 */
interface ContactFormData {
	firstName: string;
	lastName: string;
	company?: string;
	email: string;
	phone?: string;
	subject?: string;
	message: string;
	/** Honeypot. Hidden from real users; only bots fill it in. */
	website?: string;
	'cf-turnstile-response'?: string;
	event_id?: string;
	event_source_url?: string;
}

/**
 * Maximum allowed lengths for form fields
 */
const MAX_LENGTHS: Record<string, number> = {
	firstName: 100,
	lastName: 100,
	company: 200,
	email: 254,
	phone: 30,
	subject: 200,
	message: 5000
};

/**
 * Request body ceiling. Generous for the longest allowed message, but the body
 * is parsed before any field can be measured, so it needs its own limit.
 */
const MAX_BODY_BYTES = 64 * 1024;

/** Every outbound call is bounded: an unbounded one burns the Worker's budget. */
const FETCH_TIMEOUT_MS = 8000;

/** How long a failed submission is retained in the KV fallback store. */
const FALLBACK_RETENTION_SECONDS = 60 * 60 * 24 * 90;

/** Fallback recipient, used when CONTACT_RECIPIENT_EMAIL is not configured. */
const DEFAULT_RECIPIENT = 'alex.vaughan@awvaughan.com';

/**
 * Whether the submission was captured, and how.
 *
 * `skipped` means no mail transport is configured and this is a development
 * run. A real deployment with missing credentials is a `failed` delivery, not a
 * skipped one — treating the two alike is what let misconfiguration masquerade
 * as success.
 */
type DeliveryOutcome = 'sent' | 'stored' | 'skipped' | 'failed';

/**
 * Control characters to strip: everything below space except tab and newline,
 * plus DEL. Written as escapes so the source file stays free of raw control
 * bytes.
 */
// eslint-disable-next-line no-control-regex -- matching control characters is the purpose
const CONTROL_CHARACTERS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

/**
 * Normalize submitted text.
 *
 * Strips control characters, folds CRLF to LF, collapses runs of blank lines,
 * and trims.
 *
 * It deliberately does not strip HTML tags. The notification email is sent as
 * `contentType: 'Text'`, so there is nothing to inject into, and the tag regex
 * silently ate real content: "I need a pad <10 ft > wide" arrived as "I need a
 * pad  wide", deleting the dimensions of the job. Anything that renders this
 * text as HTML later must escape it at the point of rendering.
 */
function normalizeText(input: string): string {
	return input
		.replace(CONTROL_CHARACTERS, '')
		.replace(/\r\n?/g, '\n')
		.replace(/\n{3,}/g, '\n\n')
		.trim();
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

/**
 * Verify Cloudflare Turnstile token.
 *
 * Returns the raw outcome so the caller can distinguish a spent or expired
 * token — which the visitor can recover from by solving the widget again — from
 * an outright rejection.
 */
async function verifyTurnstile(
	token: string,
	secretKey: string,
	remoteIp?: string
): Promise<{ success: boolean; expired: boolean }> {
	const body = new URLSearchParams({ secret: secretKey, response: token });
	if (remoteIp) body.set('remoteip', remoteIp);

	const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body,
		signal: AbortSignal.timeout(FETCH_TIMEOUT_MS)
	});
	const data = (await response.json()) as {
		success?: boolean;
		'error-codes'?: string[];
	};

	const errorCodes = data['error-codes'] ?? [];
	return {
		success: data.success === true,
		expired: errorCodes.includes('timeout-or-duplicate')
	};
}

/**
 * Cached MS365 access token, scoped to this isolate.
 *
 * These tokens are valid for about an hour, so requesting a fresh one per
 * submission added a round trip to Azure on the critical path for no benefit.
 * A Worker isolate is short-lived and there may be many, so this is a
 * best-effort cache, not a shared one.
 */
let cachedAccessToken: { value: string; expiresAt: number } | null = null;

/** Discard the cached token this many seconds before it actually expires. */
const TOKEN_EXPIRY_MARGIN_SECONDS = 60;

/** Exported for tests: drops the cached token. */
export function __resetAccessTokenCache(): void {
	cachedAccessToken = null;
}

/**
 * Get MS365 Graph API access token
 */
async function getAccessToken(
	tenantId: string,
	clientId: string,
	clientSecret: string
): Promise<string> {
	if (cachedAccessToken && cachedAccessToken.expiresAt > Date.now()) {
		return cachedAccessToken.value;
	}

	const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

	const params = new URLSearchParams({
		client_id: clientId,
		scope: 'https://graph.microsoft.com/.default',
		client_secret: clientSecret,
		grant_type: 'client_credentials'
	});

	const response = await fetch(tokenUrl, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: params,
		signal: AbortSignal.timeout(FETCH_TIMEOUT_MS)
	});

	if (!response.ok) {
		const errorData = await response.text();
		throw new Error(`Failed to get access token: ${response.status} ${errorData}`);
	}

	const data = (await response.json()) as { access_token: string; expires_in?: number };
	const lifetime = (data.expires_in ?? 3600) - TOKEN_EXPIRY_MARGIN_SECONDS;
	cachedAccessToken = {
		value: data.access_token,
		expiresAt: Date.now() + Math.max(lifetime, 0) * 1000
	};

	return data.access_token;
}

/**
 * Send the notification email via the Graph API.
 */
async function sendNotificationEmail(options: {
	tenantId: string;
	clientId: string;
	clientSecret: string;
	fromEmail: string;
	toEmail: string;
	subject: string;
	content: string;
	replyToEmail: string;
	replyToName: string;
}): Promise<void> {
	const accessToken = await getAccessToken(
		options.tenantId,
		options.clientId,
		options.clientSecret
	);

	const graphResponse = await fetch(
		`https://graph.microsoft.com/v1.0/users/${options.fromEmail}/sendMail`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				message: {
					subject: options.subject,
					body: { contentType: 'Text', content: options.content },
					toRecipients: [{ emailAddress: { address: options.toEmail } }],
					replyTo: [
						{
							emailAddress: {
								address: options.replyToEmail,
								name: options.replyToName
							}
						}
					]
				},
				saveToSentItems: 'false'
			}),
			signal: AbortSignal.timeout(FETCH_TIMEOUT_MS)
		}
	);

	if (!graphResponse.ok) {
		const errorData = await graphResponse.text();
		throw new Error(`Failed to send email via Graph API: ${graphResponse.status} ${errorData}`);
	}
}

/**
 * POST handler for contact form submissions
 */
export const POST: RequestHandler = async ({ request, platform, cookies }) => {
	const declaredLength = Number(request.headers.get('content-length') ?? 0);
	if (declaredLength > MAX_BODY_BYTES) {
		throw error(413, 'Message is too large');
	}

	let formData: ContactFormData;
	try {
		formData = await request.json();
	} catch {
		throw error(400, 'Invalid request body');
	}

	if (!formData || typeof formData !== 'object') {
		throw error(400, 'Invalid request body');
	}

	// Length is validated on the raw values, before normalization can shrink them.
	const fieldsToValidate = [
		'firstName',
		'lastName',
		'company',
		'email',
		'phone',
		'subject',
		'message'
	] as const;
	for (const field of fieldsToValidate) {
		const value = formData[field];
		if (typeof value === 'string' && value.length > MAX_LENGTHS[field]) {
			throw error(400, `${field} exceeds maximum allowed length`);
		}
	}

	// Normalize first, then validate: an input of "<b></b>" is truthy but
	// normalizes to nothing, and previously passed the required-field check to
	// produce a nameless lead.
	const normalized = {
		firstName: normalizeText(formData.firstName ?? ''),
		lastName: normalizeText(formData.lastName ?? ''),
		company: normalizeText(formData.company ?? ''),
		email: normalizeText(formData.email ?? ''),
		phone: normalizeText(formData.phone ?? ''),
		subject: normalizeText(formData.subject ?? ''),
		message: normalizeText(formData.message ?? '')
	};

	if (!normalized.firstName || !normalized.lastName || !normalized.email || !normalized.message) {
		throw error(400, 'Missing required fields');
	}

	if (!isValidEmail(normalized.email)) {
		throw error(400, 'Invalid email address');
	}

	// Honeypot: a hidden field no human sees. Accepted silently so the bot cannot
	// learn that it was filtered, but nothing is sent or tracked.
	if (formData.website) {
		return json({
			success: true,
			delivered: true,
			message: 'Thank you for your message. We will get back to you soon!'
		});
	}

	const clientIp = request.headers.get('cf-connecting-ip') ?? undefined;

	// Verify Turnstile token (if secret key is configured)
	const turnstileSecret = platform?.env?.TURNSTILE_SECRET_KEY;
	if (turnstileSecret) {
		const turnstileToken = formData['cf-turnstile-response'];
		if (!turnstileToken) {
			throw error(400, 'Please complete the CAPTCHA verification');
		}
		const outcome = await verifyTurnstile(turnstileToken, turnstileSecret, clientIp);
		if (!outcome.success) {
			throw error(
				400,
				outcome.expired
					? 'Your CAPTCHA verification expired. Please solve it again and resubmit.'
					: 'CAPTCHA verification failed. Please try again.'
			);
		}
	}

	const emailContent = `
New Contact Form Submission

Name: ${normalized.firstName} ${normalized.lastName}
Company: ${normalized.company || 'Not provided'}
Email: ${normalized.email}
Phone: ${normalized.phone || 'Not provided'}
Subject: ${normalized.subject || 'Not provided'}

Message:
${normalized.message}

---
Submitted from: awvaughan.com
Time: ${new Date().toISOString()}
	`.trim();

	const tenantId = platform?.env?.MS365_TENANT_ID;
	const clientId = platform?.env?.MS365_CLIENT_ID;
	const clientSecret = platform?.env?.MS365_CLIENT_SECRET;
	const fromEmail = platform?.env?.MS365_EMAIL;

	let outcome: DeliveryOutcome;

	if (tenantId && clientId && clientSecret && fromEmail) {
		try {
			await sendNotificationEmail({
				tenantId,
				clientId,
				clientSecret,
				fromEmail,
				toEmail: platform?.env?.CONTACT_RECIPIENT_EMAIL ?? DEFAULT_RECIPIENT,
				subject: `Contact Form: ${normalized.subject || 'New Inquiry'}`,
				content: emailContent,
				replyToEmail: normalized.email,
				replyToName: `${normalized.firstName} ${normalized.lastName}`
			});
			outcome = 'sent';
		} catch (emailError) {
			console.error('Contact form email delivery failed:', emailError);
			outcome = 'failed';
		}
	} else if (!dev) {
		// Deployed, but the mail credentials are absent or misspelled. This checks
		// `dev` rather than the presence of `platform`: both `vite dev` and
		// `vite preview` supply a platform object with an empty env, so keying off
		// it would make every local submission look like a production
		// misconfiguration.
		console.error('Contact form email delivery failed: MS365 credentials are not configured');
		outcome = 'failed';
	} else {
		// Local development: log the submission instead of delivering it.
		console.info('MS365 not configured — contact form submission not delivered:', emailContent);
		outcome = 'skipped';
	}

	// Email failed, so persist the submission rather than lose the lead. The
	// previous implementation swallowed the error and returned success, which told
	// the customer they would be contacted and left no record anywhere.
	if (outcome === 'failed' && platform?.env?.LEADS) {
		try {
			await platform.env.LEADS.put(
				`lead:${new Date().toISOString()}:${crypto.randomUUID()}`,
				JSON.stringify({ ...normalized, receivedAt: new Date().toISOString(), clientIp }),
				{ expirationTtl: FALLBACK_RETENTION_SECONDS }
			);
			outcome = 'stored';
		} catch (storeError) {
			console.error('Contact form fallback store failed:', storeError);
		}
	}

	if (outcome === 'failed') {
		// Nothing captured the submission. Say so, rather than claiming success.
		throw error(
			502,
			`We could not submit your message. Please call us at ${COMPANY_INFO.phone} or email ${COMPANY_INFO.email}.`
		);
	}

	// Send Lead event to Meta Conversions API for server-side tracking.
	//
	// Only reached once the submission is actually captured: reporting a
	// conversion for a lead that was never received trains Meta to buy more
	// traffic that produces nothing.
	//
	// Event ID is shared with the browser pixel for deduplication.
	// fbp/fbc come from cookies set by the browser pixel — these are among the
	// highest-weighted match keys Meta uses for Event Match Quality.
	const metaToken = platform?.env?.META_PIXEL_TOKEN;
	if (metaToken) {
		const leadValueRaw = platform?.env?.META_LEAD_VALUE;
		const leadValue = leadValueRaw === undefined ? undefined : Number(leadValueRaw);

		const capiCall = sendMetaConversionEvent({
			accessToken: metaToken,
			pixelId: META_PIXEL_ID,
			eventId: isValidEventId(formData.event_id) ? formData.event_id! : crypto.randomUUID(),
			user: {
				// Hash the submitted values, not the normalized ones: normalization
				// rewrites characters and a rewritten value no longer matches Meta's
				// records.
				email: formData.email,
				phone: formData.phone,
				firstName: formData.firstName,
				lastName: formData.lastName,
				fbp: cookies.get('_fbp'),
				fbc: cookies.get('_fbc'),
				// cf-connecting-ip is set by Cloudflare and cannot be spoofed by the
				// client. x-forwarded-for is deliberately not used as a fallback: off
				// Cloudflare it is pure client input, and a forged IP corrupts
				// attribution.
				clientIp,
				userAgent: request.headers.get('user-agent') ?? undefined
			},
			sourceUrl: resolveEventSourceUrl(formData.event_source_url ?? request.headers.get('referer')),
			testEventCode: platform?.env?.META_TEST_EVENT_CODE,
			leadValue: leadValue !== undefined && Number.isFinite(leadValue) ? leadValue : undefined
		}).catch((metaError) => {
			// A CAPI failure must not break form submission, but it must be visible:
			// an unlogged failure means Lead tracking can stop entirely without
			// warning.
			console.error('Meta CAPI Lead event failed:', metaError);
		});

		// Hand the request off to the platform so the visitor is not kept waiting on
		// Meta. Falls back to awaiting when no execution context is available.
		const context = platform?.ctx ?? platform?.context;
		if (context) {
			context.waitUntil(capiCall);
		} else {
			await capiCall;
		}
	}

	if (outcome === 'stored') {
		return json({
			success: true,
			delivered: false,
			message: `We have received your message, but our email system is currently delayed. If this is urgent, please call us at ${COMPANY_INFO.phone}.`
		});
	}

	return json({
		success: true,
		delivered: true,
		message: 'Thank you for your message. We will get back to you soon!'
	});
};
