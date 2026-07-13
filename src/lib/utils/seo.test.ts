import { describe, it, expect } from 'vitest';
import {
	absoluteUrl,
	formatPageTitle,
	getDefaultSEO,
	getArticleSEO,
	getArticleSchema,
	getPersonSchema,
	getWebsiteSchema
} from './seo';
import { SITE } from '$lib/config/site';
import type { ArticleMeta } from '$lib/types';

const sampleArticle: ArticleMeta = {
	title: 'Test Article',
	description: 'A test description.',
	date: '2026-02-14',
	slug: 'test-article',
	tags: ['testing', 'seo']
};

describe('absoluteUrl', () => {
	it('passes through absolute URLs unchanged', () => {
		expect(absoluteUrl('https://example.com/x')).toBe('https://example.com/x');
	});

	it('prefixes the site origin for paths', () => {
		expect(absoluteUrl('/writing/test')).toBe(`${SITE.url}/writing/test`);
	});

	it('adds a slash for relative paths without one', () => {
		expect(absoluteUrl('writing/test')).toBe(`${SITE.url}/writing/test`);
	});
});

describe('formatPageTitle', () => {
	it('appends the site name', () => {
		expect(formatPageTitle('Writing')).toBe(`Writing | ${SITE.name}`);
	});
});

describe('getDefaultSEO', () => {
	it('returns sensible defaults', () => {
		const seo = getDefaultSEO();
		expect(seo.title).toContain(SITE.name);
		expect(seo.description).toBe(SITE.description);
		expect(seo.canonical).toBe(SITE.url);
		expect(seo.type).toBe('website');
	});

	it('applies overrides', () => {
		const seo = getDefaultSEO({ title: 'Custom', canonical: `${SITE.url}/x` });
		expect(seo.title).toBe('Custom');
		expect(seo.canonical).toBe(`${SITE.url}/x`);
	});
});

describe('getArticleSEO', () => {
	it('builds article-type Open Graph metadata', () => {
		const seo = getArticleSEO(sampleArticle);
		expect(seo.type).toBe('article');
		expect(seo.canonical).toBe(`${SITE.url}/writing/test-article`);
		expect(seo.openGraph?.type).toBe('article');
		expect(seo.openGraph?.publishedTime).toBe('2026-02-14');
		expect(seo.keywords).toEqual(['testing', 'seo']);
	});

	it('marks drafts as noindex', () => {
		const seo = getArticleSEO({ ...sampleArticle, draft: true });
		expect(seo.noindex).toBe(true);
	});
});

describe('structured data', () => {
	it('produces a BlogPosting for articles', () => {
		const schema = getArticleSchema(sampleArticle);
		expect(schema['@type']).toBe('BlogPosting');
		expect(schema.headline).toBe('Test Article');
		expect(schema.url).toBe(`${SITE.url}/writing/test-article`);
		expect(schema.datePublished).toBe('2026-02-14');
	});

	it('produces Person and WebSite schemas', () => {
		expect(getPersonSchema()['@type']).toBe('Person');
		expect(getWebsiteSchema()['@type']).toBe('WebSite');
	});
});
