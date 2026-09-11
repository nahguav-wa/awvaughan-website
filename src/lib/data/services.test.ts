import { describe, it, expect } from 'vitest';
import { getServiceBySlug, serviceDetails, services } from './services';

describe('services data', () => {
	it('has 4 services', () => {
		expect(services).toHaveLength(4);
	});

	it('each service has required fields', () => {
		services.forEach((service) => {
			expect(service.title).toBeTruthy();
			expect(service.description).toBeTruthy();
			expect(service.href).toMatch(/^\/services\//);
		});
	});

	it('each service page has the content the template renders', () => {
		serviceDetails.forEach((service) => {
			expect(service.slug).toMatch(/^[a-z0-9-]+$/);
			expect(service.heading).toBeTruthy();
			expect(service.intro).toBeTruthy();
			expect(service.problem.paragraphs.length).toBeGreaterThan(0);
			expect(service.offerings.length).toBeGreaterThan(0);
			expect(service.cta.heading).toBeTruthy();
			expect(service.schemaDescription).toBeTruthy();
			expect(service.seo.title).toBeTruthy();
			expect(service.seo.description).toBeTruthy();
		});
	});

	it('card hrefs are derived from the slugs, so they cannot drift', () => {
		serviceDetails.forEach((service, index) => {
			expect(services[index].href).toBe(`/services/${service.slug}`);
		});
	});

	it('every service page declares real image dimensions', () => {
		// A wrong intrinsic size makes the browser reserve the wrong box and the
		// page shifts once the photo decodes.
		serviceDetails.forEach((service) => {
			expect(service.image.width).toBeGreaterThan(0);
			expect(service.image.height).toBeGreaterThan(0);
		});
	});

	it('resolves a service by slug and rejects unknown ones', () => {
		expect(getServiceBySlug('drainage-solutions')?.title).toBe('Drainage Solutions & Grading');
		expect(getServiceBySlug('nope')).toBeUndefined();
	});

	it('slugs are unique', () => {
		const slugs = serviceDetails.map((service) => service.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
	});

	it('service hrefs match expected routes', () => {
		const expectedHrefs = [
			'/services/gravel-driveway-repair',
			'/services/drainage-solutions',
			'/services/shed-pad-preparation',
			'/services/excavation'
		];
		const actualHrefs = services.map((s) => s.href);
		expectedHrefs.forEach((href) => {
			expect(actualHrefs).toContain(href);
		});
	});
});
