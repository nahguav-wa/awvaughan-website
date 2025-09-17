import { createRawSnippet, type Snippet } from 'svelte';
import { appConfig, type SeoImage as ConfigSeoImage } from '../app.config';

export type SeoImage = ConfigSeoImage;

export type SeoData = {
        title?: string;
        description?: string;
        canonical?: string;
        robots?: string;
        image?: SeoImage;
};

type ResolvedSeo = {
        title: string;
        description: string;
        canonical?: string;
        robots?: string;
        image?: SeoImage;
};

const isAbsoluteUrl = (value: string) => /^https?:\/\//.test(value);

const normaliseUrl = (value: string) => (isAbsoluteUrl(value) ? value : new URL(value, appConfig.siteUrl).toString());

const escapeHtml = (value: string) =>
        value
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');

const escapeAttribute = (value: string) => escapeHtml(value).replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const resolveSeo = (input?: SeoData): ResolvedSeo => {
        const defaults = appConfig.seo;

        return {
                title: input?.title ?? defaults.title,
                description: input?.description ?? defaults.description,
                canonical: input?.canonical,
                robots: input?.robots,
                image: input?.image ?? defaults.image
        };
};

const renderHead = (seo: ResolvedSeo) => {
        const canonical = seo.canonical ? normaliseUrl(seo.canonical) : undefined;
        const image = seo.image ? { ...seo.image, src: normaliseUrl(seo.image.src) } : undefined;

        const tags: string[] = [
                '<svelte:head>',
                `        <title>${escapeHtml(seo.title)}</title>`,
                `        <meta name="description" content="${escapeAttribute(seo.description)}" />`,
                `        <meta property="og:site_name" content="${escapeAttribute(appConfig.siteName)}" />`,
                '        <meta property="og:type" content="website" />',
                `        <meta property="og:title" content="${escapeAttribute(seo.title)}" />`,
                `        <meta property="og:description" content="${escapeAttribute(seo.description)}" />`,
                `        <meta name="twitter:title" content="${escapeAttribute(seo.title)}" />`,
                `        <meta name="twitter:description" content="${escapeAttribute(seo.description)}" />`,
                `        <meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}" />`
        ];

        if (seo.robots) {
                tags.push(`        <meta name="robots" content="${escapeAttribute(seo.robots)}" />`);
        }

        if (canonical) {
                const escapedCanonical = escapeAttribute(canonical);
                tags.push(`        <link rel="canonical" href="${escapedCanonical}" />`);
                tags.push(`        <meta property="og:url" content="${escapedCanonical}" />`);
                tags.push(`        <meta name="twitter:url" content="${escapedCanonical}" />`);
        }

        if (image) {
                const escapedSrc = escapeAttribute(image.src);
                tags.push(`        <meta property="og:image" content="${escapedSrc}" />`);
                if (image.alt) {
                        tags.push(`        <meta property="og:image:alt" content="${escapeAttribute(image.alt)}" />`);
                }
                if (typeof image.width === 'number') {
                        tags.push(`        <meta property="og:image:width" content="${escapeAttribute(String(image.width))}" />`);
                }
                if (typeof image.height === 'number') {
                        tags.push(`        <meta property="og:image:height" content="${escapeAttribute(String(image.height))}" />`);
                }
                tags.push(`        <meta name="twitter:image" content="${escapedSrc}" />`);
                if (image.alt) {
                        tags.push(`        <meta name="twitter:image:alt" content="${escapeAttribute(image.alt)}" />`);
                }
        }

        tags.push('</svelte:head>');

        return tags.join('\n');
};

export const seoHead = (input?: SeoData): Snippet => {
        const resolved = resolveSeo(input);

        return createRawSnippet(() => ({
                render: () => renderHead(resolved)
        }));
};
