/**
 * Contact Form API Endpoint
 * Handles form submissions and sends emails via MS365 Graph API
 */

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { META_GRAPH_API_VERSION, META_PIXEL_ID } from '$lib/config/constants';

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
	'cf-turnstile-response'?: string;
	event_id?: string;
	event_source_url?: string;
}

/**
 * Verify Cloudflare Turnstile token
 */
async function verifyTurnstile(token: string, secretKey: string): Promise<boolean> {
	const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({ secret: secretKey, response: token })
	});
	const data = await response.json();
	return data.success === true;
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
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
 * Sanitize user input to prevent injection attacks
 * Strips HTML tags, null bytes, and trims whitespace
 */
function sanitizeInput(input: string): string {
	return input
		.replace(/\0/g, '')
		.replace(/<[^>]*>/g, '')
		.replace(/[\r\n]+/g, '\n')
		.trim();
}

/**
 * SHA-256 hash a string — required by Meta for all PII fields
 */
async function sha256(value: string): Promise<string> {
	const data = new TextEncoder().encode(value.toLowerCase().trim());
	const hashBuffer = await crypto.subtle.digest('SHA-256', data);
	return Array.from(new Uint8Array(hashBuffer))
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');
}

/**
 * Normalize a US phone number to digits-only with country code.
 * Meta expects phones as digits with the country code prefix, e.g., 17574021100.
 */
function normalizePhone(phone: string): string {
	const digits = phone.replace(/\D/g, '');
	if (digits.length === 10) return `1${digits}`;
	return digits;
}

/**
 * Send a Lead event to Meta Conversions API
 * Matches on email, phone, name + fbp/fbc cookies + IP + UA for high EMQ.
 */
async function sendMetaConversionEvent(
	accessToken: string,
	pixelId: string,
	eventId: string,
	userData: {
		email: string;
		phone?: string;
		firstName: string;
		lastName: string;
		fbp?: string;
		fbc?: string;
		clientIp?: string;
		userAgent?: string;
	},
	sourceUrl: string,
	testEventCode?: string
): Promise<void> {
	const hashedUserData: Record<string, string> = {
		em: await sha256(userData.email),
		fn: await sha256(userData.firstName),
		ln: await sha256(userData.lastName)
	};
	if (userData.phone) {
		hashedUserData.ph = await sha256(normalizePhone(userData.phone));
	}
	if (userData.fbp) hashedUserData.fbp = userData.fbp;
	if (userData.fbc) hashedUserData.fbc = userData.fbc;
	if (userData.clientIp) hashedUserData.client_ip_address = userData.clientIp;
	if (userData.userAgent) hashedUserData.client_user_agent = userData.userAgent;

	const body: Record<string, unknown> = {
		data: [
			{
				event_name: 'Lead',
				event_time: Math.floor(Date.now() / 1000),
				event_id: eventId,
				action_source: 'website',
				event_source_url: sourceUrl,
				user_data: hashedUserData,
				custom_data: {
					value: 0.0,
					currency: 'USD'
				}
			}
		]
	};
	if (testEventCode) body.test_event_code = testEventCode;

	await fetch(
		`https://graph.facebook.com/${META_GRAPH_API_VERSION}/${pixelId}/events?access_token=${accessToken}`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		}
	);
}

/**
 * Validate field length against maximum
 */
function validateLength(field: string, value: string): boolean {
	const max = MAX_LENGTHS[field];
	return !max || value.length <= max;
}

/**
 * Get MS365 Graph API access token
 */
async function getAccessToken(
	tenantId: string,
	clientId: string,
	clientSecret: string
): Promise<string> {
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
		body: params
	});

	if (!response.ok) {
		const errorData = await response.text();
		throw new Error(`Failed to get access token: ${response.status} ${errorData}`);
	}

	const data = await response.json();
	return data.access_token;
}

/**
 * POST handler for contact form submissions
 * This endpoint will send emails using MS365 Graph API
 */
export const POST: RequestHandler = async ({ request, platform, cookies }) => {
	try {
		// Parse request body
		const formData: ContactFormData = await request.json();

		// Validate required fields
		if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
			throw error(400, 'Missing required fields');
		}

		// Validate email format
		if (!isValidEmail(formData.email)) {
			throw error(400, 'Invalid email address');
		}

		// Validate field lengths
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
			if (value && !validateLength(field, value)) {
				throw error(400, `${field} exceeds maximum allowed length`);
			}
		}

		// Verify Turnstile token (if secret key is configured)
		const turnstileSecret = platform?.env?.TURNSTILE_SECRET_KEY;
		if (turnstileSecret) {
			const turnstileToken = formData['cf-turnstile-response'];
			if (!turnstileToken) {
				throw error(400, 'Please complete the CAPTCHA verification');
			}
			const isValid = await verifyTurnstile(turnstileToken, turnstileSecret);
			if (!isValid) {
				throw error(400, 'CAPTCHA verification failed. Please try again.');
			}
		}

		// Sanitize inputs
		const sanitizedData = {
			firstName: sanitizeInput(formData.firstName),
			lastName: sanitizeInput(formData.lastName),
			company: formData.company ? sanitizeInput(formData.company) : '',
			email: sanitizeInput(formData.email),
			phone: formData.phone ? sanitizeInput(formData.phone) : '',
			subject: formData.subject ? sanitizeInput(formData.subject) : '',
			message: sanitizeInput(formData.message)
		};

		// Prepare email content
		const emailContent = `
New Contact Form Submission

Name: ${sanitizedData.firstName} ${sanitizedData.lastName}
Company: ${sanitizedData.company || 'Not provided'}
Email: ${sanitizedData.email}
Phone: ${sanitizedData.phone || 'Not provided'}
Subject: ${sanitizedData.subject || 'Not provided'}

Message:
${sanitizedData.message}

---
Submitted from: awvaughan.com
Time: ${new Date().toISOString()}
		`.trim();

		// Send email using MS365 Graph API
		try {
			const tenantId = platform?.env?.MS365_TENANT_ID;
			const clientId = platform?.env?.MS365_CLIENT_ID;
			const clientSecret = platform?.env?.MS365_CLIENT_SECRET;
			const fromEmail = platform?.env?.MS365_EMAIL;

			if (tenantId && clientId && clientSecret && fromEmail) {
				// Get access token
				const accessToken = await getAccessToken(tenantId, clientId, clientSecret);

				// Send email via Graph API
				const graphResponse = await fetch(
					`https://graph.microsoft.com/v1.0/users/${fromEmail}/sendMail`,
					{
						method: 'POST',
						headers: {
							Authorization: `Bearer ${accessToken}`,
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							message: {
								subject: `Contact Form: ${sanitizedData.subject || 'New Inquiry'}`,
								body: {
									contentType: 'Text',
									content: emailContent
								},
								toRecipients: [
									{
										emailAddress: {
											address: 'alex.vaughan@awvaughan.com'
										}
									}
								],
								replyTo: [
									{
										emailAddress: {
											address: sanitizedData.email,
											name: `${sanitizedData.firstName} ${sanitizedData.lastName}`
										}
									}
								]
							},
							saveToSentItems: 'false'
						})
					}
				);

				if (!graphResponse.ok) {
					const errorData = await graphResponse.text();
					throw new Error(
						`Failed to send email via Graph API: ${graphResponse.status} ${errorData}`
					);
				}
			} else {
				// MS365 not configured — silently accept in dev, form data is not persisted
			}
		} catch {
			// Silently accept to avoid exposing internal errors to the client
		}

		// Send Lead event to Meta Conversions API for server-side tracking.
		// Event ID is shared with the browser pixel for deduplication.
		// fbp/fbc come from cookies set by the browser pixel — these are among the
		// highest-weighted match keys Meta uses for Event Match Quality.
		try {
			const metaToken = platform?.env?.META_PIXEL_TOKEN;
			if (metaToken) {
				const eventId = formData.event_id ?? crypto.randomUUID();
				const sourceUrl =
					formData.event_source_url ??
					request.headers.get('referer') ??
					'https://awvaughan.com/contact';
				const clientIp =
					request.headers.get('cf-connecting-ip') ??
					request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
					undefined;
				const userAgent = request.headers.get('user-agent') ?? undefined;
				await sendMetaConversionEvent(
					metaToken,
					META_PIXEL_ID,
					eventId,
					{
						email: sanitizedData.email,
						phone: sanitizedData.phone || undefined,
						firstName: sanitizedData.firstName,
						lastName: sanitizedData.lastName,
						fbp: cookies.get('_fbp'),
						fbc: cookies.get('_fbc'),
						clientIp,
						userAgent
					},
					sourceUrl,
					platform?.env?.META_TEST_EVENT_CODE
				);
			}
		} catch {
			// CAPI failure must not break form submission
		}

		// Return success response
		return json({
			success: true,
			message: 'Thank you for your message. We will get back to you soon!'
		});
	} catch (err) {
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}

		throw error(500, 'Failed to process contact form submission');
	}
};
