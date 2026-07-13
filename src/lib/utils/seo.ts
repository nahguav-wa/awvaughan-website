/**
 * SEO Utilities
 * Helpers for generating SEO metadata and structured data.
 */

import { SITE } from '$lib/config/site';
import type { ArticleMeta, SEOMetadata } from '$lib/types';

/**
 * Resolve a path or URL to an absolute URL against the site origin.
 */
export function absoluteUrl(pathOrUrl: string): string {
	if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
	return `${SITE.url}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`;
}

/**
 * Format a page title with the site owner's name.
 */
export function formatPageTitle(pageTitle: string): string {
	return `${pageTitle} | ${SITE.name}`;
}

/**
 * Default SEO metadata, merged with optional per-page overrides.
 */
export function getDefaultSEO(overrides?: Partial<SEOMetadata>): SEOMetadata {
	return {
		title: `${SITE.name} — ${SITE.title}`,
		description: SITE.description,
		type: 'website',
		canonical: SITE.url,
		ogImage: SITE.ogImage || undefined,
		...overrides
	};
}

/**
 * Schema.org Person structured data for the site owner.
 */
export function getPersonSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: SITE.name,
		description: SITE.description,
		url: SITE.url,
		email: SITE.email
	};
}

/**
 * Schema.org WebSite structured data.
 */
export function getWebsiteSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: SITE.name,
		description: SITE.description,
		url: SITE.url,
		author: { '@type': 'Person', name: SITE.name }
	};
}

/**
 * Schema.org Article (BlogPosting) structured data for a single article.
 */
export function getArticleSchema(article: ArticleMeta) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: article.title,
		description: article.description,
		datePublished: article.date,
		url: absoluteUrl(`/writing/${article.slug}`),
		...(article.ogImage ? { image: absoluteUrl(article.ogImage) } : {}),
		author: { '@type': 'Person', name: SITE.name },
		keywords: article.tags?.join(', ')
	};
}

/**
 * Build SEO metadata for an article page.
 */
export function getArticleSEO(article: ArticleMeta): SEOMetadata {
	const url = absoluteUrl(`/writing/${article.slug}`);
	const ogImage = article.ogImage ? absoluteUrl(article.ogImage) : SITE.ogImage || undefined;
	return {
		title: formatPageTitle(article.title),
		description: article.description,
		keywords: article.tags,
		type: 'article',
		canonical: url,
		ogImage,
		noindex: article.draft,
		openGraph: {
			type: 'article',
			title: article.title,
			description: article.description,
			url,
			siteName: SITE.name,
			publishedTime: article.date,
			...(ogImage ? { image: { url: ogImage, alt: article.title } } : {})
		}
	};
}
