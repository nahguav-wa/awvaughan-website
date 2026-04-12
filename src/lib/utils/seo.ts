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
	'land clearing Virginia Beach',
	'land clearing 757',
	'bush hogging Virginia Beach',
	'bush hogging 757',
	'gravel driveway repair Virginia Beach',
	'gravel driveway repair 757',
	'land management Hampton Roads',
	'lawn care Virginia Beach',

	// Service-Specific
	'lot clearing contractor 757',
	'field mowing Virginia Beach',
	'trail systems Virginia Beach',
	'property project management 757',
	'excavation contractor Virginia Beach',
	'driveway crown restoration 757'
];

/**
 * Secondary SEO Keywords
 * Problem-focused search terms
 */
export const SECONDARY_KEYWORDS = [
	'how to clear overgrown land Virginia',
	'bush hogging cost 757',
	'land management company near me',
	'gravel driveway repair cost Virginia Beach',
	'who does bush hogging near me',
	'trail building contractor Hampton Roads'
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
			longitude: -75.978
		},
		areaServed: COMPANY_INFO.serviceArea.regions.map((region) => ({
			'@type': 'City',
			name: region
		})),
		serviceType: [
			'Land Clearing',
			'Bush Hogging',
			'Gravel Driveway Repair',
			'Lawn Care and Landscaping',
			'Trail Systems',
			'Project Management'
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
