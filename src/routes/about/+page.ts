/**
 * About Page Data Loader
 * Provides SEO metadata for the About page
 */

import type { PageLoad } from './$types';
import type { SEOMetadata } from '$lib/types';

/**
 * Load function for About page
 * Returns SEO metadata for the page
 */
export const load: PageLoad = () => {
	const seo: SEOMetadata = {
		title: 'About Us - The A.W. Vaughan Company | Land Management Virginia Beach 757',
		description:
			'Learn about The A.W. Vaughan Company, your trusted partner for land clearing, bush hogging, gravel driveway repair, and land management services in Virginia Beach and the 757 area.',
		keywords: [
			'about A.W. Vaughan Company',
			'Virginia Beach land management company',
			'land clearing contractor 757',
			'bush hogging Virginia Beach',
			'local land management contractor'
		],
		canonical: 'https://awvaughan.com/about',
		openGraph: {
			type: 'website',
			title: 'About The A.W. Vaughan Company | Land Management Virginia Beach',
			description:
				'Professional land management serving Virginia Beach and the 757 area. Land clearing, bush hogging, gravel driveways, lawn care, trail systems, and project management.',
			url: 'https://awvaughan.com/about',
			siteName: 'The A.W. Vaughan Company',
			image: {
				url: 'https://awvaughan.com/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'The A.W. Vaughan Company - Land Management Virginia Beach'
			}
		}
	};

	return { seo };
};
