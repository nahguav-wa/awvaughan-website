/**
 * Homepage Load Function
 * Provides SEO metadata specific to the homepage
 */

import { absoluteUrl, COMPANY_INFO } from '$lib/config/constants';
import { getDefaultSEO } from '$lib/utils/seo';
import type { PageLoad } from './$types';

/**
 * Load function for homepage
 * Overrides global SEO with homepage-specific metadata
 */
export const load: PageLoad = () => {
	return {
		seo: getDefaultSEO({
			title: `Landscape Maintenance & Management in Williamsburg VA | ${COMPANY_INFO.name}`,
			description: `Landscape maintenance and management in Williamsburg, VA. Comprehensive maintenance programs, full service turf care, tree and shrub care, and spring and fall clean-up. Serving Toano, Yorktown, New Kent, West Point, Saluda and Gloucester. Call ${COMPANY_INFO.phone} for a free quote.`,
			canonical: absoluteUrl('/'),
			ogImage: absoluteUrl('/og-image.jpg')
		})
	};
};
