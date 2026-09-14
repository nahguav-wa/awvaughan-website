/**
 * Service Area Page Data Loader
 * Provides SEO metadata and the area-served structured data for the map page.
 */

import type { PageLoad } from './$types';
import type { SEOMetadata } from '$lib/types';
import { absoluteUrl, COMPANY_INFO } from '$lib/config/constants';
import { getServiceAreaSchema } from '$lib/utils/seo';

/**
 * Load function for Service Area page
 * Returns SEO metadata and Schema.org area-served data
 */
export const load: PageLoad = () => {
	const seo: SEOMetadata = {
		title: 'Service Area - Counties & Cities We Serve | The A.W. Vaughan Company',
		description:
			'See the Virginia counties and cities we serve on an interactive map — from Virginia Beach and Chesapeake through the Peninsula and Middle Peninsula to Henrico. Gravel driveway repair, drainage, and excavation.',
		canonical: absoluteUrl('/service-area'),
		openGraph: {
			type: 'website',
			title: 'Where We Work | The A.W. Vaughan Company Service Area',
			description:
				'An interactive map of the counties and cities served by The A.W. Vaughan Company for gravel driveway repair, drainage solutions, and small excavation.',
			url: absoluteUrl('/service-area'),
			siteName: COMPANY_INFO.name,
			image: {
				url: absoluteUrl('/og-image.jpg'),
				width: 1200,
				height: 630,
				alt: 'The A.W. Vaughan Company service area across southeastern Virginia'
			}
		}
	};

	return { seo, structuredData: getServiceAreaSchema() };
};
