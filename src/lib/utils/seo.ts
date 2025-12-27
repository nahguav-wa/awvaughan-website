/**
 * SEO Utilities
 * Helper functions for generating SEO metadata and structured data
 */

import { COMPANY_INFO } from '$lib/config/constants';
import type { SEOMetadata } from '$lib/types';

/**
 * Primary SEO Keywords
 * Target keywords for search engine optimization
 */
export const PRIMARY_KEYWORDS = [
	// Geographic + Core Services
	'gravel driveway repair Virginia Beach',
	'gravel driveway repair 757',
	'drainage solutions Norfolk VA',
	'shed pad preparation Virginia Beach',
	'driveway grading 757',
	'ditch and swale repair Virginia Beach',

	// Service-Specific
	'gravel driveway crown restoration',
	'driveway drainage repair near me',
	'small excavation contractor 757',
	'shed foundation prep Virginia Beach',
	'culvert repair Virginia Beach',
	'rural property drainage solutions'
];

/**
 * Secondary SEO Keywords
 * Problem-focused search terms
 */
export const SECONDARY_KEYWORDS = [
	'how to fix standing water in driveway',
	'gravel driveway potholes repair cost',
	'why does my driveway wash out',
	'small site prep contractor',
	'fixing muddy driveway',
	'driveway crown repair'
];

/**
 * Generates Schema.org LocalBusiness structured data
 * @returns JSON-LD structured data object
 */
export function getLocalBusinessSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		name: COMPANY_INFO.name,
		description: COMPANY_INFO.description,
		url: 'https://awvaughan.com',
		telephone: COMPANY_INFO.phone,
		email: COMPANY_INFO.email,
		priceRange: '$$',
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Virginia Beach',
			addressRegion: 'VA',
			addressCountry: 'US'
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: 36.8529,
			longitude: -75.9780
		},
		areaServed: COMPANY_INFO.serviceArea.regions.map((region) => ({
			'@type': 'City',
			name: region
		})),
		serviceType: [
			'Gravel Driveway Repair',
			'Drainage Solutions',
			'Excavation Services',
			'Driveway Grading',
			'Shed Pad Preparation'
		]
	};
}

/**
 * Generates Schema.org Service structured data
 * @param serviceName - Name of the service
 * @param description - Service description
 * @returns JSON-LD structured data object
 */
export function getServiceSchema(serviceName: string, description: string) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Service',
		serviceType: serviceName,
		provider: {
			'@type': 'LocalBusiness',
			name: COMPANY_INFO.name,
			telephone: COMPANY_INFO.phone
		},
		areaServed: {
			'@type': 'State',
			name: 'Virginia'
		},
		description
	};
}

/**
 * Generates default SEO metadata for pages
 * @param overrides - Partial SEO metadata to merge with defaults
 * @returns Complete SEO metadata object
 */
export function getDefaultSEO(overrides?: Partial<SEOMetadata>): SEOMetadata {
	return {
		title: `${COMPANY_INFO.name} | ${COMPANY_INFO.businessType} | ${COMPANY_INFO.serviceArea.primary}`,
		description: COMPANY_INFO.description,
		keywords: PRIMARY_KEYWORDS.join(', '),
		type: 'business.business',
		ogImage: '/og-image.jpg',
		canonical: 'https://awvaughan.com',
		...overrides
	};
}

/**
 * Formats page title with company name
 * @param pageTitle - Title specific to the page
 * @returns Formatted title string
 */
export function formatPageTitle(pageTitle: string): string {
	return `${pageTitle} | ${COMPANY_INFO.name}`;
}
