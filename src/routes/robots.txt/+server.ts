import type { RequestHandler } from './$types';
import { appConfig } from '../../app.config';

const disallowedPaths = ['/admin', '/private'];

export const GET: RequestHandler = () => {
	const lines = [
		'User-agent: *',
		...disallowedPaths.map((path) => `Disallow: ${path}`),
		`Sitemap: ${appConfig.siteUrl}/sitemap.xml`
	];

	return new Response(lines.join('\n'), {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	});
};
