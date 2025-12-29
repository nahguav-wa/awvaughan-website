/**
 * Contact Form API Endpoint
 * Handles form submissions and sends emails via MS365 Graph API
 */

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

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
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

/**
 * Sanitize user input to prevent injection attacks
 */
function sanitizeInput(input: string): string {
	return input.replace(/[<>]/g, '').trim();
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
export const POST: RequestHandler = async ({ request, platform }) => {
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
					throw new Error(`Failed to send email via Graph API: ${graphResponse.status} ${errorData}`);
				}
			} else {
				// Fallback: Log to console if MS365 not configured
				console.log('MS365 Graph API not configured. Form data:', sanitizedData);
				console.log('Email content:', emailContent);
				console.log('Missing env vars:', {
					tenantId: !!tenantId,
					clientId: !!clientId,
					clientSecret: !!clientSecret,
					fromEmail: !!fromEmail
				});

				// For development/testing, return success anyway
				// In production, you might want to throw an error instead
			}
		} catch (emailError) {
			console.error('Failed to send email:', emailError);
			// Still return success to user to avoid exposing internal errors
			// Log the error for debugging
		}

		// Return success response
		return json({
			success: true,
			message: 'Thank you for your message. We will get back to you soon!'
		});
	} catch (err) {
		// Handle errors
		console.error('Contact form error:', err);

		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}

		throw error(500, 'Failed to process contact form submission');
	}
};
