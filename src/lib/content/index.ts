/**
 * Article Content Loader
 *
 * Articles are plain Markdown files in `src/lib/content/articles/*.md`, each with
 * YAML frontmatter (title, description, date, ...). mdsvex compiles them to Svelte
 * components at build time; here we eagerly import them and expose helpers for the
 * routes, RSS feed, and sitemap.
 *
 * To publish a new article: add a Markdown file to the `articles/` directory and push.
 */

import type { Component } from 'svelte';
import type { Article, ArticleFrontmatter, ArticleMeta } from '$lib/types';

interface MarkdownModule {
	metadata: ArticleFrontmatter;
	default: Component;
}

const modules = import.meta.glob<MarkdownModule>('./articles/*.md', { eager: true });

/**
 * Derive a slug from a module path like "./articles/my-post.md".
 */
function slugFromPath(path: string): string {
	return path.split('/').pop()!.replace(/\.md$/, '');
}

/**
 * All articles keyed by slug, including drafts.
 */
const articlesBySlug: Record<string, Article> = {};

for (const [path, module] of Object.entries(modules)) {
	const slug = module.metadata.slug ?? slugFromPath(path);
	articlesBySlug[slug] = {
		meta: { ...module.metadata, slug },
		component: module.default
	};
}

/**
 * Compare two articles by date, newest first.
 */
function byDateDesc(a: ArticleMeta, b: ArticleMeta): number {
	return new Date(b.date).getTime() - new Date(a.date).getTime();
}

/**
 * Published (non-draft) article metadata, newest first.
 * Used for listings, the RSS feed, and the sitemap.
 */
export function getPublishedArticles(): ArticleMeta[] {
	return Object.values(articlesBySlug)
		.map((article) => article.meta)
		.filter((meta) => !meta.draft)
		.sort(byDateDesc);
}

/**
 * Look up a single article by slug (drafts included, for direct-link preview).
 */
export function getArticle(slug: string): Article | undefined {
	return articlesBySlug[slug];
}

/**
 * Format an ISO date string for human display, e.g. "February 14, 2026".
 */
export function formatDate(iso: string): string {
	return new Date(iso).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'UTC'
	});
}
