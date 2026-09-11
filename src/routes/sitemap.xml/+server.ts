/**
 * Sitemap
 *
 * Generated from the same data that builds the routes, so it cannot fall out of
 * step with the site. The previous static file hardcoded `lastmod 2026-02-18`
 * on every URL and had to be hand-edited whenever a page was added.
 *
 * `changefreq` and `priority` are omitted: Google has stated it ignores both.
 * `lastmod` is omitted because a value that is not genuinely accurate is
 * ignored too, and there is nothing in the build that knows when a given page's
 * content last changed.
 */

import { SITE_URL } from '$lib/config/constants';
import { serviceDetails } from '$lib/data/services';
import type { RequestHandler } from './$types';

export const prerender = true;

const paths = [
	'/',
	'/about',
	'/services',
	...serviceDetails.map(({ slug }) => `/services/${slug}`),
	'/contact'
];

export const GET: RequestHandler = () => {
	const urls = paths
		.map((path) => `\t<url>\n\t\t<loc>${SITE_URL}${path}</loc>\n\t</url>`)
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
