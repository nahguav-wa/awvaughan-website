/**
 * Security headers applied to every response.
 *
 * Content-Security-Policy is deliberately absent: it is owned by `kit.csp` in
 * svelte.config.js, which is the only mechanism that can also protect
 * prerendered pages. Those are served straight off Cloudflare's asset handler
 * without ever entering the Worker, so anything set in hooks.server.ts covers
 * only `/contact` and `/api/*`. Setting CSP here as well would overwrite the
 * nonce-bearing policy SvelteKit generates and break hydration.
 *
 * `static/_headers` mirrors this list for statically served routes. The two are
 * kept in sync by a test — edit both, or the test fails.
 */
export const SECURITY_HEADERS: Record<string, string> = {
	/**
	 * Clickjacking protection. X-Frame-Options is legacy, but CSP
	 * `frame-ancestors` is ignored when a policy is delivered via <meta>, which
	 * is how prerendered pages receive theirs — so this is the only directive
	 * that actually covers the whole site.
	 */
	'X-Frame-Options': 'DENY',
	'X-Content-Type-Options': 'nosniff',
	'Referrer-Policy': 'strict-origin-when-cross-origin',
	'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
	'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
};
