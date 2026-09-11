/**
 * About Page Data Loader
 * Provides SEO metadata for the About page
 */

import type { PageLoad } from './$types';
import type { SEOMetadata } from '$lib/types';
import { absoluteUrl, COMPANY_INFO } from '$lib/config/constants';

/**
 * Load function for About page
 * Returns SEO metadata for the page
 */
export const load: PageLoad = () => {
	const seo: SEOMetadata = {
		title: 'About Us - The A.W. Vaughan Company | Virginia Beach Excavation Experts',
		description:
			'Learn about The A.W. Vaughan Company, your trusted partner for gravel driveway repair, drainage solutions, and excavation services in Virginia Beach and the 757 area since 2025.',
		canonical: absoluteUrl('/about'),
		openGraph: {
			type: 'website',
			title: 'About The A.W. Vaughan Company | Virginia Beach Excavation',
			description:
				'Professional gravel driveway repair and drainage solutions serving Virginia Beach and the 757 area. Expert excavation services for residential and rural properties.',
			url: absoluteUrl('/about'),
			siteName: COMPANY_INFO.name,
			image: {
				url: absoluteUrl('/og-image.jpg'),
				width: 1200,
				height: 630,
				alt: 'The A.W. Vaughan Company - Virginia Beach Excavation Experts'
			}
		}
	};

	return { seo };
};
