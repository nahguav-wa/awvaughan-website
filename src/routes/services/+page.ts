/**
 * Services Page Data Loader
 * Provides SEO metadata for the Services page
 */

import type { PageLoad } from './$types';
import type { SEOMetadata } from '$lib/types';

/**
 * Load function for Services page
 * Returns SEO metadata for the page
 */
export const load: PageLoad = () => {
	const seo: SEOMetadata = {
		title: 'Our Services - Land Clearing, Bush Hogging & More | Virginia Beach 757',
		description:
			'Land management services in Virginia Beach and the 757 area. Land clearing, bush hogging, gravel driveway repair, lawn care, trail systems, and property project management.',
		keywords: [
			'land clearing Virginia Beach',
			'bush hogging 757',
			'gravel driveway repair Virginia Beach',
			'lawn care Hampton Roads',
			'trail systems Virginia Beach',
			'project management 757'
		],
		canonical: 'https://awvaughan.com/services',
		openGraph: {
			type: 'website',
			title: 'Land Management Services | The A.W. Vaughan Company',
			description:
				'Professional land clearing, bush hogging, gravel driveway repair, lawn care, trail systems, and project management serving Virginia Beach and the 757 area.',
			url: 'https://awvaughan.com/services',
			siteName: 'The A.W. Vaughan Company',
			image: {
				url: 'https://awvaughan.com/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'The A.W. Vaughan Company Land Management Services'
			}
		}
	};

	return { seo };
};
