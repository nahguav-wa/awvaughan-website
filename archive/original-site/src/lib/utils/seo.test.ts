import { describe, it, expect } from 'vitest';
import {
	getDefaultSEO,
	formatPageTitle,
	getLocalBusinessSchema,
	getServiceSchema,
	PRIMARY_KEYWORDS,
	SECONDARY_KEYWORDS
} from './seo';

describe('formatPageTitle', () => {
	it('appends company name to page title', () => {
		const result = formatPageTitle('About Us');
		expect(result).toBe('About Us | The A.W. Vaughan Company');
	});

	it('handles empty page title', () => {
		const result = formatPageTitle('');
		expect(result).toBe(' | The A.W. Vaughan Company');
	});
});

describe('getDefaultSEO', () => {
	it('returns default SEO metadata with required fields', () => {
		const seo = getDefaultSEO();
		expect(seo.title).toBeTruthy();
		expect(seo.description).toBeTruthy();
		expect(seo.keywords).toBeTruthy();
		expect(seo.canonical).toBe('https://awvaughan.com');
	});

	it('allows overriding individual fields', () => {
		const seo = getDefaultSEO({ title: 'Custom Title', canonical: 'https://awvaughan.com/about' });
		expect(seo.title).toBe('Custom Title');
		expect(seo.canonical).toBe('https://awvaughan.com/about');
		expect(seo.description).toBeTruthy(); // default preserved
	});

	it('includes keywords as a comma-separated string', () => {
		const seo = getDefaultSEO();
		expect(typeof seo.keywords).toBe('string');
		expect((seo.keywords as string).split(', ').length).toBeGreaterThan(1);
	});
});

describe('getLocalBusinessSchema', () => {
	it('returns valid Schema.org LocalBusiness structure', () => {
		const schema = getLocalBusinessSchema();
		expect(schema['@context']).toBe('https://schema.org');
		expect(schema['@type']).toBe('LocalBusiness');
		expect(schema.name).toBe('The A.W. Vaughan Company');
		expect(schema.telephone).toBeTruthy();
		expect(schema.email).toBeTruthy();
		expect(schema.url).toBe('https://awvaughan.com');
	});

	it('includes address information', () => {
		const schema = getLocalBusinessSchema();
		expect(schema.address['@type']).toBe('PostalAddress');
		expect(schema.address.addressLocality).toBe('Virginia Beach');
		expect(schema.address.addressRegion).toBe('VA');
	});

	it('includes service areas', () => {
		const schema = getLocalBusinessSchema();
		expect(Array.isArray(schema.areaServed)).toBe(true);
		expect(schema.areaServed.length).toBeGreaterThan(0);
		expect(schema.areaServed[0]['@type']).toBe('City');
	});

	it('includes service types', () => {
		const schema = getLocalBusinessSchema();
		expect(Array.isArray(schema.serviceType)).toBe(true);
		expect(schema.serviceType).toContain('Gravel Driveway Repair');
	});
});

describe('getServiceSchema', () => {
	it('returns valid Schema.org Service structure', () => {
		const schema = getServiceSchema('Test Service', 'Test description');
		expect(schema['@context']).toBe('https://schema.org');
		expect(schema['@type']).toBe('Service');
		expect(schema.serviceType).toBe('Test Service');
		expect(schema.description).toBe('Test description');
	});

	it('includes provider information', () => {
		const schema = getServiceSchema('Test', 'Description');
		expect(schema.provider['@type']).toBe('LocalBusiness');
		expect(schema.provider.name).toBe('The A.W. Vaughan Company');
	});
});

describe('keyword arrays', () => {
	it('PRIMARY_KEYWORDS has at least 10 keywords', () => {
		expect(PRIMARY_KEYWORDS.length).toBeGreaterThanOrEqual(10);
	});

	it('SECONDARY_KEYWORDS has at least 5 keywords', () => {
		expect(SECONDARY_KEYWORDS.length).toBeGreaterThanOrEqual(5);
	});

	it('all keywords are non-empty strings', () => {
		[...PRIMARY_KEYWORDS, ...SECONDARY_KEYWORDS].forEach((kw) => {
			expect(typeof kw).toBe('string');
			expect(kw.trim().length).toBeGreaterThan(0);
		});
	});
});
