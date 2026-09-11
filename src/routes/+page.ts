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
			title: `Gravel Driveway Repair & Drainage in Williamsburg VA | ${COMPANY_INFO.name}`,
			description: `Gravel driveway repair, drainage solutions, and small excavation in Williamsburg, VA. Serving Toano, Yorktown, West Point, Saluda, Gloucester and the surrounding Historic Triangle and Middle Peninsula. Call ${COMPANY_INFO.phone} for a free quote.`,
			canonical: absoluteUrl('/'),
			ogImage: absoluteUrl('/og-image.jpg')
		})
	};
};
