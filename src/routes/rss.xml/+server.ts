import { getPublishedArticles } from '$lib/content';
import { SITE } from '$lib/config/site';
import type { RequestHandler } from './$types';

export const prerender = true;

/** Escape characters that are unsafe in XML text nodes. */
function escapeXml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

export const GET: RequestHandler = () => {
	const articles = getPublishedArticles();

	const items = articles
		.map((article) => {
			const url = `${SITE.url}/writing/${article.slug}`;
			return `		<item>
			<title>${escapeXml(article.title)}</title>
			<link>${url}</link>
			<guid isPermaLink="true">${url}</guid>
			<description>${escapeXml(article.description)}</description>
			<pubDate>${new Date(article.date).toUTCString()}</pubDate>
		</item>`;
		})
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>${escapeXml(SITE.name)} — Writing</title>
		<link>${SITE.url}</link>
		<description>${escapeXml(SITE.description)}</description>
		<language>${SITE.language}</language>
		<atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml" />
${items}
	</channel>
</rss>
`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
