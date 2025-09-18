import type { RequestHandler } from './$types';
import { existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

import { appConfig } from '../../app.config';
import { contentEntries } from '$lib/data/content';

const routeFiles = import.meta.glob('/src/routes/**/+page.svelte', { eager: true });

const normalizeFilePath = (filePath: string) =>
	filePath.startsWith('/') ? filePath.slice(1) : filePath;

const toAbsolutePath = (filePath: string) => join(process.cwd(), normalizeFilePath(filePath));

const formatRoutePath = (filePath: string) => {
	const normalized = normalizeFilePath(filePath);
	const withoutPrefix = normalized.replace(/^src\/routes/, '');
	const withoutSuffix = withoutPrefix.replace(/\/\+page\.svelte$/, '');

	if (withoutSuffix === '') {
		return '/';
	}

	return withoutSuffix.startsWith('/') ? withoutSuffix : `/${withoutSuffix}`;
};

const companionPageFiles = (filePath: string) => {
	const normalized = normalizeFilePath(filePath);
	const base = normalized.replace(/\+page\.svelte$/, '+page');
	return [`${base}.ts`, `${base}.js`, `${base}.server.ts`, `${base}.server.js`];
};

const getLastModifiedIso = (files: readonly string[]) => {
	const timestamps = files
		.map(toAbsolutePath)
		.filter((absolutePath) => existsSync(absolutePath))
		.map((absolutePath) => statSync(absolutePath).mtime.getTime());

	if (timestamps.length === 0) {
		return new Date().toISOString();
	}

	return new Date(Math.max(...timestamps)).toISOString();
};

const staticRoutes = Object.keys(routeFiles)
	.filter((filePath) => !/\[.*\]/.test(filePath))
	.map((filePath) => {
		const companions = companionPageFiles(filePath);
		const routePath = formatRoutePath(filePath);
		const url = new URL(routePath, appConfig.siteUrl).toString();
		const lastmod = getLastModifiedIso([filePath, ...companions]);

		return { loc: url, lastmod } as const;
	});

const dynamicTemplateFiles = [
	'src/routes/[slug]/+page.svelte',
	'src/routes/[slug]/+page.server.ts',
	'src/lib/data/content.ts'
] as const;

const dynamicLastModified = getLastModifiedIso(dynamicTemplateFiles);

const dynamicRoutes = contentEntries.map((entry) => ({
	loc: new URL(`/${entry.slug}`, appConfig.siteUrl).toString(),
	lastmod: dynamicLastModified
}));

const urls = [...staticRoutes, ...dynamicRoutes].sort((a, b) => a.loc.localeCompare(b.loc));

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
	.map(
		({ loc, lastmod }) =>
			`  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`
	)
	.join('\n')}\n</urlset>`;

export const GET: RequestHandler = () =>
	new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8'
		}
	});
