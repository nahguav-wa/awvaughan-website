/**
 * Service Area Page Data Loader
 * Provides SEO metadata for the map page.
 *
 * Deliberately contributes no structured data. The layout already emits one
 * LocalBusiness node carrying `areaServed` from `COMPANY_INFO.serviceArea`,
 * which docs/keyword-strategy.md treats as the canonical marketed geography. An
 * earlier version of this page emitted a second `areaServed` against that same
 * `@id`, which merged Virginia Beach and Chesapeake back into the business's
 * serving geography — undoing the separation that keeps Virginia Beach in
 * `foundingLocation` and out of the local pack the company now competes in.
 */

import type { PageLoad } from './$types';
import type { SEOMetadata } from '$lib/types';
import { absoluteUrl, COMPANY_INFO } from '$lib/config/constants';

/**
 * Load function for Service Area page
 * Returns SEO metadata only; see the note above on structured data.
 */
export const load: PageLoad = () => {
	const seo: SEOMetadata = {
		title: 'Service Area | Williamsburg, the Historic Triangle & Middle Peninsula',
		description:
			'An interactive map of the counties and cities we work in, from Williamsburg and the Historic Triangle through New Kent, West Point, Gloucester and Saluda on the Middle Peninsula. Land clearing, bush hogging, forestry mulching, trail systems and property maintenance.',
		canonical: absoluteUrl('/service-area'),
		openGraph: {
			type: 'website',
			title: 'Where We Work | The A.W. Vaughan Company Service Area',
			description:
				'An interactive map of the counties and cities served by The A.W. Vaughan Company for land clearing, bush hogging, forestry mulching, trail systems and property maintenance across the Historic Triangle and Middle Peninsula.',
			url: absoluteUrl('/service-area'),
			siteName: COMPANY_INFO.name,
			image: {
				url: absoluteUrl('/og-image.jpg'),
				width: 1200,
				height: 630,
				alt: 'The A.W. Vaughan Company land management service area around Williamsburg, Virginia'
			}
		}
	};

	return { seo };
};
