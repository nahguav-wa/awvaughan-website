import { describe, it, expect } from 'vitest';
import { getPublishedArticles, getArticle, formatDate } from './index';

describe('content loader', () => {
	it('loads the seeded articles', () => {
		const articles = getPublishedArticles();
		expect(articles.length).toBeGreaterThanOrEqual(2);
		for (const article of articles) {
			expect(article.slug).toBeTruthy();
			expect(article.title).toBeTruthy();
			expect(article.description).toBeTruthy();
			expect(article.date).toBeTruthy();
		}
	});

	it('sorts articles newest first', () => {
		const articles = getPublishedArticles();
		for (let i = 1; i < articles.length; i++) {
			const prev = new Date(articles[i - 1].date).getTime();
			const curr = new Date(articles[i].date).getTime();
			expect(prev).toBeGreaterThanOrEqual(curr);
		}
	});

	it('resolves an article by slug with a component', () => {
		const article = getArticle('welcome');
		expect(article).toBeDefined();
		expect(article?.meta.slug).toBe('welcome');
		expect(article?.component).toBeTruthy();
	});

	it('returns undefined for an unknown slug', () => {
		expect(getArticle('does-not-exist')).toBeUndefined();
	});
});

describe('formatDate', () => {
	it('formats an ISO date in a human-readable form', () => {
		expect(formatDate('2026-02-14')).toBe('February 14, 2026');
	});
});
