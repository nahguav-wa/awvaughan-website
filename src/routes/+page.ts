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
			title: `Land Clearing & Forestry Mulching in Williamsburg VA | ${COMPANY_INFO.name}`,
			description: `Land clearing, bush hogging, forestry mulching, trail systems and property maintenance in Williamsburg, VA. Serving Toano, Yorktown, New Kent, West Point, Saluda and Gloucester. Call ${COMPANY_INFO.phone} for a free quote.`,
			canonical: absoluteUrl('/'),
			ogImage: absoluteUrl('/og-image.jpg')
		})
	};
};
