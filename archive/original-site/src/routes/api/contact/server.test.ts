import { describe, it, expect } from 'vitest';

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

async function callPOST(body: Record<string, unknown>) {
	const request = await createRequest(body);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return POST({ request, platform: {} } as any);
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
