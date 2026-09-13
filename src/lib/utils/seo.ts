/**
 * SEO Utilities
 * Helper functions for generating SEO metadata and structured data
 *
 * Target keyword lists used to live here and were rendered into a
 * `<meta name="keywords">` tag. Search engines have ignored that tag for well
 * over a decade, so the tag is gone and the keyword strategy now lives in
 * docs/keyword-strategy.md, where it can be read and maintained as the content
 * planning document it actually is.
 */

import { absoluteUrl, COMPANY_INFO, SITE_URL, SOCIAL_LINKS } from '$lib/config/constants';
import type { SEOMetadata } from '$lib/types';

/**
 * Stable identifier for the business entity, so the LocalBusiness node emitted
 * on every page and the Service nodes that reference it are understood as one
 * organization rather than several.
 */
const BUSINESS_ID = `${SITE_URL}/#business`;

/**
 * Generates Schema.org LocalBusiness structured data
 * @returns JSON-LD structured data object
 */
export function getLocalBusinessSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		'@id': BUSINESS_ID,
		name: COMPANY_INFO.name,
		description: COMPANY_INFO.description,
		url: SITE_URL,
		// E.164, which is the form Google's documentation asks for.
		telephone: COMPANY_INFO.phoneE164,
		email: COMPANY_INFO.email,
		priceRange: '$$',
		logo: absoluteUrl('/Horizontal Color Logo.svg'),
		image: absoluteUrl('/og-image.jpg'),
		foundingDate: String(COMPANY_INFO.yearEstablished),
		// The company started in Virginia Beach and relocated to Williamsburg.
		// `address` is where it operates from now; this records where it began.
		foundingLocation: {
			'@type': 'Place',
			address: {
				'@type': 'PostalAddress',
				addressLocality: 'Virginia Beach',
				addressRegion: 'VA',
				addressCountry: 'US'
			}
		},
		// The social profiles are what let a knowledge panel connect this entity
		// to the accounts that post about it.
		sameAs: [
			SOCIAL_LINKS.facebook,
			SOCIAL_LINKS.instagram,
			SOCIAL_LINKS.youtube,
			SOCIAL_LINKS.nextdoor
		],
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Williamsburg',
			addressRegion: 'VA',
			addressCountry: 'US'
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: 37.2707,
			longitude: -76.7075
		},
		areaServed: COMPANY_INFO.serviceArea.regions.map((region) => ({
			'@type': 'City',
			name: region
		})),
		serviceType: [
			'Land Clearing',
			'Bush Hogging',
			'Forestry Mulching',
			'Trail Construction',
			'Brush Removal',
			'Pasture Reclamation'
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
		// Points at the LocalBusiness node rather than restating it, so the two
		// are not read as separate businesses.
		provider: { '@id': BUSINESS_ID },
		areaServed: COMPANY_INFO.serviceArea.regions.map((region) => ({
			'@type': 'City',
			name: region
		})),
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
		title: `${COMPANY_INFO.name} | ${COMPANY_INFO.businessType} | ${COMPANY_INFO.locationFull}`,
		description: COMPANY_INFO.description,
		type: 'business.business',
		ogImage: '/og-image.jpg',
		canonical: SITE_URL,
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
