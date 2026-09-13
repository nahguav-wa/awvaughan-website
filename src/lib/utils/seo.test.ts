import { describe, it, expect } from 'vitest';
import { getDefaultSEO, formatPageTitle, getLocalBusinessSchema, getServiceSchema } from './seo';

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
		expect(seo.canonical).toBe('https://awvaughan.com');
	});

	it('allows overriding individual fields', () => {
		const seo = getDefaultSEO({ title: 'Custom Title', canonical: 'https://awvaughan.com/about' });
		expect(seo.title).toBe('Custom Title');
		expect(seo.canonical).toBe('https://awvaughan.com/about');
		expect(seo.description).toBeTruthy(); // default preserved
	});

	it('uses the canonical origin for the default Open Graph image', () => {
		const seo = getDefaultSEO();
		// Relative paths are not reliably resolved by crawlers.
		expect(seo.ogImage).toBe('/og-image.jpg');
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
		expect(schema.address.addressLocality).toBe('Williamsburg');
		expect(schema.address.addressRegion).toBe('VA');
	});

	it('records the founding city separately from where the business now operates', () => {
		// The business moved from Virginia Beach to Williamsburg. `address` must
		// track the current base, or the local pack is optimized for the wrong
		// city; `foundingLocation` keeps the history without competing with it.
		const schema = getLocalBusinessSchema();
		expect(schema.foundingLocation.address.addressLocality).toBe('Virginia Beach');
		expect(schema.address.addressLocality).not.toBe(
			schema.foundingLocation.address.addressLocality
		);
	});

	it('serves every town listed in the service area', () => {
		const schema = getLocalBusinessSchema();
		const served = schema.areaServed.map((area) => area.name);
		expect(served).toContain('Williamsburg');
		expect(served).toContain('Gloucester');
		expect(served).not.toContain('Virginia Beach');
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
		expect(schema.serviceType).toContain('Land Clearing');
		expect(schema.serviceType).toContain('Forestry Mulching');
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
		// References the LocalBusiness node rather than restating it, so the two
		// are not read as separate businesses.
		expect(schema.provider['@id']).toBe('https://awvaughan.com/#business');
		expect(getLocalBusinessSchema()['@id']).toBe(schema.provider['@id']);
	});
});
