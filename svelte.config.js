import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		// Pinned rather than adapter-auto: `npm run build` locally produced no
		// deployable output under adapter-auto ("could not detect a supported
		// production environment"), so local builds did not match production.
		// This adapter also types `platform` and emits `_routes.json`.
		adapter: adapter(),

		/**
		 * Content-Security-Policy.
		 *
		 * Owned here rather than in hooks.server.ts because most pages are
		 * prerendered and are served by Cloudflare's asset handler without
		 * entering the Worker — a policy set in the hook would only ever cover
		 * `/contact` and `/api/*`. SvelteKit emits this as a response header for
		 * server-rendered pages and as a <meta> tag for prerendered ones, and
		 * adds a nonce or hash for its own inline hydration scripts, which is
		 * what lets `script-src` stay free of 'unsafe-inline'.
		 *
		 * `frame-ancestors` is absent on purpose: it is ignored when a policy
		 * arrives via <meta>, so clickjacking protection is carried by
		 * X-Frame-Options instead (see src/lib/config/security-headers.ts).
		 */
		csp: {
			mode: 'auto',
			directives: {
				'default-src': ['self'],
				// connect.facebook.net serves fbevents.js; without it the Meta
				// pixel is silently blocked and the browser Lead event never
				// leaves the queue.
				'script-src': ['self', 'https://connect.facebook.net', 'https://challenges.cloudflare.com'],
				// No inline event-handler attributes anywhere in the app.
				'script-src-attr': ['none'],
				'style-src': ['self', 'unsafe-inline'],
				// Kept separate so inline style attributes survive the nonce
				// SvelteKit may add to style-src.
				'style-src-attr': ['unsafe-inline'],
				// www.facebook.com serves the pixel's tracking beacon and the
				// <noscript> fallback image.
				'img-src': ['self', 'data:', 'https://www.facebook.com'],
				'connect-src': [
					'self',
					'https://www.facebook.com',
					'https://connect.facebook.net',
					'https://graph.facebook.com',
					'https://challenges.cloudflare.com'
				],
				'font-src': ['self'],
				'frame-src': ['https://challenges.cloudflare.com'],
				'object-src': ['none'],
				'base-uri': ['self'],
				'form-action': ['self'],
				'manifest-src': ['self'],
				'worker-src': ['self']
			}
		}
	}
};

export default config;
