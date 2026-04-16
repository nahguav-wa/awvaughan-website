/**
 * Homepage Load Function
 * Provides SEO metadata specific to the homepage
 */

import { COMPANY_INFO } from '$lib/config/constants';
import { getDefaultSEO, PRIMARY_KEYWORDS } from '$lib/utils/seo';
import type { PageLoad } from './$types';

/**
 * Load function for homepage
 * Overrides global SEO with homepage-specific metadata
 */
export const load: PageLoad = () => {
	return {
		seo: getDefaultSEO({
			title: `${COMPANY_INFO.name} | Land Clearing, Bush Hogging & Land Management Virginia Beach 757`,
			description: `Professional land management services in Virginia Beach and the 757 area. Land clearing, bush hogging, gravel driveway repair, lawn care, trail systems, and project management. Call ${COMPANY_INFO.phone} for a free quote.`,
			keywords: PRIMARY_KEYWORDS.join(', '),
			canonical: 'https://awvaughan.com/',
			ogImage: 'https://awvaughan.com/og-image.jpg'
		})
	};
};
