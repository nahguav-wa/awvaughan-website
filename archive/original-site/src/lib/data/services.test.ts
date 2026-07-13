import { describe, it, expect } from 'vitest';
import { services } from './services';

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

	it('each service has SEO keywords', () => {
		services.forEach((service) => {
			expect(service.keywords).toBeDefined();
			expect(service.keywords!.length).toBeGreaterThan(0);
		});
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
