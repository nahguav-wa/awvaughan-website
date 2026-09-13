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
		title: 'Services | Land Clearing, Mulching & Property Maintenance in Williamsburg VA',
		description:
			'Land clearing, bush hogging, forestry mulching, trail systems and property maintenance in Williamsburg, VA. Serving Toano, Yorktown, New Kent, West Point, Gloucester and Saluda.',
		canonical: absoluteUrl('/services'),
		openGraph: {
			type: 'website',
			title: 'Land Management Services | The A.W. Vaughan Company',
			description:
				'Land clearing, bush hogging, forestry mulching, trail systems and property maintenance across the Historic Triangle and Middle Peninsula.',
			url: absoluteUrl('/services'),
			siteName: COMPANY_INFO.name,
			image: {
				url: absoluteUrl('/og-image.jpg'),
				width: 1200,
				height: 630,
				alt: 'The A.W. Vaughan Company land management services in Williamsburg, VA'
			}
		}
	};

	return { seo };
};
