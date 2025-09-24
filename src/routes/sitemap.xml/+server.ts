import type { RequestHandler } from './$types';
import { join } from 'node:path';

import { appConfig } from '../../app.config';
import { contentEntries } from '$lib/data/content';

const routeFiles = import.meta.glob('/src/routes/**/+page.svelte', { eager: true });

const normalizeFilePath = (filePath: string) =>
	filePath.startsWith('/') ? filePath.slice(1) : filePath;

const isNodeEnvironment = typeof process !== 'undefined' && Boolean(process.versions?.node);

const toAbsolutePath = (filePath: string) => {
        if (!isNodeEnvironment) {
                throw new Error('Cannot resolve absolute paths outside of a Node.js environment');
        }

        return join(process.cwd(), normalizeFilePath(filePath));
};

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

const getLastModifiedIso = async (files: readonly string[]) => {
        if (!isNodeEnvironment) {
                return new Date().toISOString();
        }

        const { existsSync, statSync } = await import('node:fs');

        const timestamps = files
                .map(toAbsolutePath)
                .filter((absolutePath) => existsSync(absolutePath))
                .map((absolutePath) => statSync(absolutePath).mtime.getTime());

        if (timestamps.length === 0) {
                return new Date().toISOString();
        }

        return new Date(Math.max(...timestamps)).toISOString();
};

const buildStaticRoutes = async () => {
        const staticRouteEntries = Object.keys(routeFiles).filter((filePath) => !/\[.*\]/.test(filePath));

        const routes = await Promise.all(
                staticRouteEntries.map(async (filePath) => {
                        const companions = companionPageFiles(filePath);
                        const routePath = formatRoutePath(filePath);
                        const url = new URL(routePath, appConfig.siteUrl).toString();
                        const lastmod = await getLastModifiedIso([filePath, ...companions]);

                        return { loc: url, lastmod } as const;
                })
        );

        return routes;
};

const dynamicTemplateFiles = [
        'src/routes/[slug]/+page.svelte',
        'src/routes/[slug]/+page.server.ts',
        'src/lib/data/content.ts'
] as const;

const buildDynamicRoutes = async () => {
        const lastmod = await getLastModifiedIso(dynamicTemplateFiles);

        return contentEntries.map((entry) => ({
                loc: new URL(`/${entry.slug}`, appConfig.siteUrl).toString(),
                lastmod
        }));
};

const xmlPromise = (async () => {
        const [staticRoutes, dynamicRoutes] = await Promise.all([
                buildStaticRoutes(),
                buildDynamicRoutes()
        ]);

        const urls = [...staticRoutes, ...dynamicRoutes].sort((a, b) => a.loc.localeCompare(b.loc));

        return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
                .map(
                        ({ loc, lastmod }) =>
                                `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`
                )
                .join('\n')}\n</urlset>`;
})();

export const GET: RequestHandler = async () =>
        new Response(await xmlPromise, {
                headers: {
                        'Content-Type': 'application/xml; charset=utf-8'
                }
        });
