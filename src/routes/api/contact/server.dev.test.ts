import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

/**
 * Development-mode behaviour of the contact endpoint.
 *
 * With no mailer configured, a local run logs the submission and reports
 * success so the form can be worked on without credentials. Deployed behaviour
 * is the opposite — see server.test.ts.
 */
vi.mock('$app/environment', () => ({ dev: true }));

const { POST } = await import('./+server');

async function callPOST(env: Record<string, unknown> = {}) {
	const request = new Request('http://localhost/api/contact', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			firstName: 'John',
			lastName: 'Doe',
			email: 'john@example.com',
			message: 'Hello there'
		})
	});
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return POST({ request, platform: { env }, cookies: { get: () => undefined } } as any);
}

beforeEach(() => {
	vi.stubGlobal(
		'fetch',
		vi.fn(async () => Response.json({ success: true }))
	);
});

afterEach(() => {
	vi.unstubAllGlobals();
	vi.restoreAllMocks();
});

describe('POST /api/contact in development', () => {
	it('accepts the submission and logs it instead of sending', async () => {
		const info = vi.spyOn(console, 'info').mockImplementation(() => {});

		const response = await callPOST();

		expect(response.status).toBe(200);
		expect((await response.json()).delivered).toBe(true);
		expect(info).toHaveBeenCalledWith(
			'MS365 not configured — contact form submission not delivered:',
			expect.stringContaining('john@example.com')
		);
	});

	it('does not treat the missing mailer as a delivery failure', async () => {
		vi.spyOn(console, 'info').mockImplementation(() => {});
		const error = vi.spyOn(console, 'error').mockImplementation(() => {});

		await callPOST();

		expect(error).not.toHaveBeenCalled();
	});
});
