import { getPublishedArticles } from '$lib/content';
import { SITE } from '$lib/config/site';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = () => {
	const staticPaths = ['/', '/writing', '/contact'];
	const articlePaths = getPublishedArticles().map((article) => ({
		path: `/writing/${article.slug}`,
		lastmod: article.date
	}));

	const urls = [
		...staticPaths.map((path) => `	<url>\n\t\t<loc>${SITE.url}${path}</loc>\n\t</url>`),
		...articlePaths.map(
			({ path, lastmod }) =>
				`	<url>\n\t\t<loc>${SITE.url}${path}</loc>\n\t\t<lastmod>${lastmod}</lastmod>\n\t</url>`
		)
	].join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
