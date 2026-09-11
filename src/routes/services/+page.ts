/**
 * Services Page Data Loader
 * Provides SEO metadata for the Services page
 */

import type { PageLoad } from './$types';
import type { SEOMetadata } from '$lib/types';
import { absoluteUrl, COMPANY_INFO } from '$lib/config/constants';

/**
 * Load function for Services page
 * Returns SEO metadata for the page
 */
export const load: PageLoad = () => {
	const seo: SEOMetadata = {
		title: 'Our Services - Gravel Driveway Repair & Drainage Solutions | Virginia Beach 757',
		description:
			'Professional excavation services including gravel driveway repair, drainage solutions, shed pad preparation, and site work in Virginia Beach and the 757 area.',
		canonical: absoluteUrl('/services'),
		openGraph: {
			type: 'website',
			title: 'Professional Excavation Services | The A.W. Vaughan Company',
			description:
				'Expert gravel driveway repair, drainage solutions, shed pad preparation, and excavation services serving Virginia Beach and the 757 area.',
			url: absoluteUrl('/services'),
			siteName: COMPANY_INFO.name,
			image: {
				url: absoluteUrl('/og-image.jpg'),
				width: 1200,
				height: 630,
				alt: 'The A.W. Vaughan Company Excavation Services'
			}
		}
	};

	return { seo };
};
