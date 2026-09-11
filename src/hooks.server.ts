/**
 * Server Hooks
 *
 * Adds the shared security headers to server-rendered responses. Prerendered
 * pages never reach this hook — see src/lib/config/security-headers.ts.
 */

import type { Handle } from '@sveltejs/kit';
import { SECURITY_HEADERS } from '$lib/config/security-headers';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	for (const [header, value] of Object.entries(SECURITY_HEADERS)) {
		response.headers.set(header, value);
	}

	return response;
};
