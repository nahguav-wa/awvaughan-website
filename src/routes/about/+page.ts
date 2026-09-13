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
		title: 'About Us | Williamsburg VA Land Management Contractor',
		description:
			'The A.W. Vaughan Company is a Williamsburg, VA land management contractor — land clearing, bush hogging, forestry mulching and trail systems for Toano, Norge, Yorktown, New Kent, West Point, Gloucester and Saluda.',
		canonical: absoluteUrl('/about'),
		openGraph: {
			type: 'website',
			title: 'About The A.W. Vaughan Company | Williamsburg VA Land Management',
			description:
				'Land clearing, bush hogging, forestry mulching and trail systems across the Historic Triangle and Middle Peninsula.',
			url: absoluteUrl('/about'),
			siteName: COMPANY_INFO.name,
			image: {
				url: absoluteUrl('/og-image.jpg'),
				width: 1200,
				height: 630,
				alt: 'The A.W. Vaughan Company - Williamsburg VA Land Management and Clearing'
			}
		}
	};

	return { seo };
};
