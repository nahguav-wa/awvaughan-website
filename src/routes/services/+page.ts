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
		title: 'Services | Landscape Maintenance & Management in Williamsburg VA',
		description:
			'Landscape maintenance and management in Williamsburg, VA. Comprehensive maintenance programs, full service turf care, tree and shrub care, and spring and fall clean-up. Serving Toano, Yorktown, New Kent, West Point, Gloucester and Saluda.',
		canonical: absoluteUrl('/services'),
		openGraph: {
			type: 'website',
			title: 'Landscape Maintenance & Management | The A.W. Vaughan Company',
			description:
				'Comprehensive maintenance programs, full service turf care, tree and shrub care, and seasonal clean-up across the Historic Triangle and Middle Peninsula.',
			url: absoluteUrl('/services'),
			siteName: COMPANY_INFO.name,
			image: {
				url: absoluteUrl('/og-image.jpg'),
				width: 1200,
				height: 630,
				alt: 'The A.W. Vaughan Company landscape maintenance services in Williamsburg, VA'
			}
		}
	};

	return { seo };
};
