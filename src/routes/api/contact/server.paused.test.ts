import { describe, it, expect, vi } from 'vitest';

/**
 * While the site is under construction the endpoint must capture nothing: no
 * email, no KV write, no Meta Lead.
 */
vi.mock('$app/environment', () => ({ dev: false }));
vi.mock('$lib/config/site-status', () => ({ UNDER_CONSTRUCTION: true }));

const { POST } = await import('./+server');

describe('POST /api/contact while under construction', () => {
	it('refuses with 503 and makes no outbound calls', async () => {
		const fetchSpy = vi.fn();
		vi.stubGlobal('fetch', fetchSpy);
		const put = vi.fn();
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

		const event = {
			request,
			platform: { env: { LEADS: { put } } },
			cookies: { get: () => undefined }
		};

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		await expect(POST(event as any)).rejects.toMatchObject({ status: 503 });
		expect(fetchSpy).not.toHaveBeenCalled();
		expect(put).not.toHaveBeenCalled();
		vi.unstubAllGlobals();
	});
});
