import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { SECURITY_HEADERS } from './security-headers';
import { META_PIXEL_ID, ROUTES, SITE_URL } from './constants';
import { serviceDetails } from '$lib/data/services';

/**
 * Guards against the class of bug that caused most of the problems here: two
 * copies of one fact, in files nobody edits together.
 */

function read(path: string): string {
	return readFileSync(new URL(`../../../${path}`, import.meta.url), 'utf8');
}

function exists(path: string): boolean {
	return existsSync(new URL(`../../../${path}`, import.meta.url));
}

describe('package manager', () => {
	it('has exactly one lockfile', () => {
		// Cloudflare Pages picks its package manager from whichever lockfile it
		// finds, so a second one silently splits the toolchain: CI installed from
		// package-lock.json with npm while the deploy installed from
		// pnpm-lock.yaml with pnpm. The two drifted, and a dependency change that
		// passed CI failed every deploy with ERR_PNPM_OUTDATED_LOCKFILE.
		expect(exists('package-lock.json')).toBe(true);
		expect(exists('pnpm-lock.yaml')).toBe(false);
		expect(exists('yarn.lock')).toBe(false);
		expect(exists('bun.lockb')).toBe(false);
	});

	it('installs with npm in CI, matching the lockfile that is committed', () => {
		expect(read('.github/workflows/ci.yml')).toContain('npm ci');
	});
});

describe('security headers', () => {
	const headersFile = read('_headers');

	it('_headers repeats every header the hook sets', () => {
		// The hook covers /contact and /api/*; this file covers the prerendered
		// pages, which never enter the Worker. A header in one and not the other
		// protects two thirds of the site.
		for (const [header, value] of Object.entries(SECURITY_HEADERS)) {
			expect(headersFile).toContain(`${header}: ${value}`);
		}
	});

	it('does not mark the regenerable images immutable', () => {
		// scripts/optimize-images.mjs names derivatives by width and rewrites them
		// in place, so an immutable year-long cache would pin a replaced
		// photograph in returning visitors' browsers indefinitely. Fingerprint the
		// filenames before reinstating `immutable`.
		const imagesRule = headersFile.slice(headersFile.indexOf('/images/*'));
		expect(imagesRule).not.toContain('immutable');
		expect(imagesRule).toContain('stale-while-revalidate');
	});

	it('does not set a Content-Security-Policy', () => {
		// CSP is generated per page by kit.csp and delivered in a <meta> tag. A
		// second policy here would intersect with it and block SvelteKit's own
		// hydration script, which the meta policy allows by hash.
		expect(headersFile.toLowerCase()).not.toContain('content-security-policy:');
	});
});

describe('content security policy', () => {
	const config = read('svelte.config.js');

	it('allows the hosts the Meta pixel actually uses', () => {
		// fbevents.js is served from connect.facebook.net and beacons to
		// www.facebook.com. Omitting either silently blocks the pixel: the inline
		// stub still defines window.fbq, so events queue and are never sent, and
		// _fbp/_fbc are never set — losing the highest-weighted match keys.
		expect(config).toContain('https://connect.facebook.net');
		expect(config).toContain('https://www.facebook.com');
	});

	it('allows Turnstile to load and frame itself', () => {
		expect(config).toContain("'frame-src': ['https://challenges.cloudflare.com']");
	});

	it("does not weaken script-src with 'unsafe-inline'", () => {
		const scriptSrc = config.slice(config.indexOf("'script-src':"));
		const directive = scriptSrc.slice(0, scriptSrc.indexOf(']'));
		expect(directive).not.toContain('unsafe-inline');
	});
});

describe('meta pixel bootstrap', () => {
	it('uses the same pixel ID as the application config', () => {
		// static/meta-pixel.js cannot import from the app, so the ID is repeated.
		expect(read('static/meta-pixel.js')).toContain(META_PIXEL_ID);
	});

	it('is referenced by app.html and is not inlined', () => {
		const appHtml = read('src/app.html');
		expect(appHtml).toContain('meta-pixel.js');
		// An inline bootstrap would force 'unsafe-inline' into script-src.
		expect(appHtml).not.toContain('fbq(');
	});

	it('carries the pixel ID in the noscript fallback too', () => {
		expect(read('src/app.html')).toContain(META_PIXEL_ID);
	});
});

describe('no placeholder configuration reaches the build', () => {
	it('has no leftover placeholder keys in source', () => {
		// A hardcoded placeholder Turnstile site key shipped to production and made
		// the contact form impossible to submit.
		const files = [
			'src/routes/contact/+page.svelte',
			'src/routes/contact/+page.server.ts',
			'src/routes/api/contact/+server.ts'
		];
		for (const file of files) {
			expect(read(file)).not.toContain('placeholder_replace_me');
		}
	});
});

describe('_redirects for retired service pages', () => {
	/** [source, destination] for each non-comment, non-blank line. */
	function redirects(): Array<[string, string]> {
		return read('_redirects')
			.split('\n')
			.map((line) => line.trim())
			.filter((line) => line && !line.startsWith('#'))
			.map((line) => {
				const [source, destination] = line.split(/\s+/);
				return [source, destination] as [string, string];
			});
	}

	const liveRoutes = () => [
		...Object.values(ROUTES),
		...serviceDetails.map(({ slug }) => `/services/${slug}`)
	];

	it('sends every retired service URL somewhere that still exists', () => {
		// A redirect to a page that was itself removed is a 404 with extra steps.
		const routes = liveRoutes();
		for (const [source, destination] of redirects()) {
			expect(routes, `${source} redirects to ${destination}, which is not a route`).toContain(
				destination
			);
		}
	});

	it('never redirects a URL that is still a live service page', () => {
		// A redirect shadows the page: the asset handler answers before the
		// prerendered HTML is ever served, so the service would be unreachable.
		const routes = liveRoutes();
		for (const [source] of redirects()) {
			expect(routes, `${source} is redirected but is still a live route`).not.toContain(source);
		}
	});

	it('uses permanent redirects, so the new URL is the one that gets indexed', () => {
		for (const line of read('_redirects')
			.split('\n')
			.map((l) => l.trim())
			.filter((l) => l && !l.startsWith('#'))) {
			expect(line, `${line} should end in 301`).toMatch(/\s301$/);
		}
	});
});

describe('canonical origin', () => {
	it('has no trailing slash, so absolute URLs join cleanly', () => {
		expect(SITE_URL).toBe('https://awvaughan.com');
	});

	it('is the origin robots.txt points at', () => {
		expect(read('static/robots.txt')).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
	});
});
