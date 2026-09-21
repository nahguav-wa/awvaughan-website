import { describe, it, expect } from 'vitest';
import { getServiceBySlug, serviceDetails, services } from './services';

describe('services data', () => {
	it('has 4 services', () => {
		// Four pages cover the five "We Provide" commitments: spring and fall
		// clean-up is what the seasonal clean-up page is. See services.ts.
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

	it('every service page that has an image declares real dimensions', () => {
		// A wrong intrinsic size makes the browser reserve the wrong box and the
		// page shifts once the photo decodes. The image is optional: a service
		// with no honest photograph of the work ships without one rather than
		// illustrating itself with a picture of something else.
		serviceDetails.forEach((service) => {
			if (!service.image) return;
			expect(service.image.width).toBeGreaterThan(0);
			expect(service.image.height).toBeGreaterThan(0);
			expect(service.image.alt).toBeTruthy();
		});
	});

	it('resolves a service by slug and rejects unknown ones', () => {
		expect(getServiceBySlug('turf-care')?.title).toBe('Full Service Turf Care Programs');
		expect(getServiceBySlug('nope')).toBeUndefined();
	});

	it('does not resurrect a retired service slug', () => {
		// Two rounds of retirements: the excavation services, and then the land
		// management services the company moved on from. _redirects points every
		// one of these URLs elsewhere, so a slug reappearing here would be
		// shadowed by its own redirect and never render.
		for (const slug of [
			'gravel-driveway-repair',
			'drainage-solutions',
			'shed-pad-preparation',
			'excavation',
			'land-clearing',
			'bush-hogging',
			'forestry-mulching',
			'trail-systems',
			'property-maintenance'
		]) {
			expect(getServiceBySlug(slug)).toBeUndefined();
		}
	});

	it('slugs are unique', () => {
		const slugs = serviceDetails.map((service) => service.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
	});

	it('service hrefs match expected routes', () => {
		const expectedHrefs = [
			'/services/maintenance-solutions',
			'/services/turf-care',
			'/services/tree-and-shrub-care',
			'/services/seasonal-cleanup'
		];
		const actualHrefs = services.map((s) => s.href);
		expectedHrefs.forEach((href) => {
			expect(actualHrefs).toContain(href);
		});
	});
});
