import { describe, it, expect } from 'vitest';
import { COMPANY_INFO, ROUTES, SOCIAL_LINKS, DESIGN_TOKENS } from './constants';

describe('COMPANY_INFO', () => {
	it('has required contact information', () => {
		expect(COMPANY_INFO.name).toBe('The A.W. Vaughan Company');
		expect(COMPANY_INFO.phone).toMatch(/^\d{3}-\d{3}-\d{4}$/);
		expect(COMPANY_INFO.email).toContain('@awvaughan.com');
		expect(COMPANY_INFO.phoneHref).toMatch(/^tel:\+1/);
		expect(COMPANY_INFO.emailHref).toMatch(/^mailto:/);
	});

	it('has service area information', () => {
		expect(COMPANY_INFO.serviceArea.primary).toBe('Virginia Beach');
		expect(COMPANY_INFO.serviceArea.areaCode).toBe('757');
		expect(COMPANY_INFO.serviceArea.regions.length).toBeGreaterThan(0);
	});
});

describe('ROUTES', () => {
	it('has all expected routes', () => {
		expect(ROUTES.home).toBe('/');
		expect(ROUTES.about).toBe('/about');
		expect(ROUTES.services).toBe('/services');
		expect(ROUTES.contact).toBe('/contact');
	});

	it('all routes start with /', () => {
		Object.values(ROUTES).forEach((route) => {
			expect(route).toMatch(/^\//);
		});
	});
});

describe('SOCIAL_LINKS', () => {
	it('has all social media platforms', () => {
		expect(SOCIAL_LINKS.instagram).toContain('instagram.com');
		expect(SOCIAL_LINKS.facebook).toContain('facebook.com');
		expect(SOCIAL_LINKS.youtube).toContain('youtube.com');
		expect(SOCIAL_LINKS.nextdoor).toContain('nextdoor.com');
	});

	it('all links use https', () => {
		Object.values(SOCIAL_LINKS).forEach((link) => {
			expect(link).toMatch(/^https:\/\//);
		});
	});
});

describe('DESIGN_TOKENS', () => {
	it('has typography scale with 4 sizes', () => {
		expect(Object.keys(DESIGN_TOKENS.typography.sizes)).toHaveLength(4);
		expect(DESIGN_TOKENS.typography.sizes.sm).toBe('text-sm');
		expect(DESIGN_TOKENS.typography.sizes.base).toBe('text-base');
		expect(DESIGN_TOKENS.typography.sizes.lg).toBe('text-lg');
		expect(DESIGN_TOKENS.typography.sizes.xl).toBe('text-xl');
	});

	it('has 2 font weights', () => {
		expect(Object.keys(DESIGN_TOKENS.typography.weights)).toHaveLength(2);
		expect(DESIGN_TOKENS.typography.weights.regular).toBe('font-normal');
		expect(DESIGN_TOKENS.typography.weights.bold).toBe('font-bold');
	});
});
