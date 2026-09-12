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
		title: 'About Us | Williamsburg VA Excavation & Driveway Contractor',
		description:
			'The A.W. Vaughan Company is a Williamsburg, VA gravel driveway repair, drainage, and small excavation contractor serving Toano, Norge, Yorktown, New Kent, West Point, Gloucester and Saluda across the Historic Triangle and Middle Peninsula.',
		canonical: absoluteUrl('/about'),
		openGraph: {
			type: 'website',
			title: 'About The A.W. Vaughan Company | Williamsburg VA Excavation',
			description:
				'Gravel driveway repair and drainage solutions across the Historic Triangle and Middle Peninsula. Small excavation for residential and rural properties.',
			url: absoluteUrl('/about'),
			siteName: COMPANY_INFO.name,
			image: {
				url: absoluteUrl('/og-image.jpg'),
				width: 1200,
				height: 630,
				alt: 'The A.W. Vaughan Company - Williamsburg VA Excavation and Grading'
			}
		}
	};

	return { seo };
};
