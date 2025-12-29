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
			title: `${COMPANY_INFO.name} | Gravel Driveway Repair & Drainage Solutions Virginia Beach 757`,
			description: `Professional gravel driveway repair, drainage solutions, and excavation services in Virginia Beach and the 757 area. Expert driveway grading, shed pad preparation, and rural property maintenance. Call ${COMPANY_INFO.phone} for quality service.`,
			keywords: PRIMARY_KEYWORDS.join(', '),
			canonical: 'https://awvaughan.com/',
			ogImage: 'https://awvaughan.com/og-home.jpg'
		})
	};
};
