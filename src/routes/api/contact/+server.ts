/**
 * Contact Form API Endpoint
 * Handles form submissions and sends emails via Cloudflare Email Workers
 */

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/**
 * Interface for contact form data
 */
interface ContactFormData {
	name: string;
	email: string;
	phone?: string;
	subject: string;
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
 * POST handler for contact form submissions
 * This endpoint will send emails using Cloudflare's Email Workers
 */
export const POST: RequestHandler = async ({ request, platform }) => {
	try {
		// Parse request body
		const formData: ContactFormData = await request.json();

		// Validate required fields
		if (!formData.name || !formData.email || !formData.subject || !formData.message) {
			throw error(400, 'Missing required fields');
		}

		// Validate email format
		if (!isValidEmail(formData.email)) {
			throw error(400, 'Invalid email address');
		}

		// Sanitize inputs
		const sanitizedData = {
			name: sanitizeInput(formData.name),
			email: sanitizeInput(formData.email),
			phone: formData.phone ? sanitizeInput(formData.phone) : '',
			subject: sanitizeInput(formData.subject),
			message: sanitizeInput(formData.message)
		};

		// Prepare email content
		const emailContent = `
New Contact Form Submission

Name: ${sanitizedData.name}
Email: ${sanitizedData.email}
Phone: ${sanitizedData.phone || 'Not provided'}
Subject: ${sanitizedData.subject}

Message:
${sanitizedData.message}

---
Submitted from: awvaughan.com
Time: ${new Date().toISOString()}
		`.trim();

		// Send email using Cloudflare Email Workers
		// Note: This requires the CONTACT_EMAIL_BINDING to be configured in wrangler.toml
		// and Cloudflare Email Routing to be set up for your domain
		try {
			if (platform?.env?.CONTACT_EMAIL) {
				// Use Cloudflare Email Workers API
				await platform.env.CONTACT_EMAIL.send({
					from: 'noreply@awvaughan.com', // Must be verified sending address
					to: 'alex.vaughan@awvaughan.com',
					subject: `Contact Form: ${sanitizedData.subject}`,
					text: emailContent,
					headers: {
						'Reply-To': sanitizedData.email
					}
				});
			} else {
				// Fallback: Log to console if email service not configured
				// In production, you should configure Cloudflare Email Workers
				console.log('Email service not configured. Form data:', sanitizedData);
				console.log('Email content:', emailContent);

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
