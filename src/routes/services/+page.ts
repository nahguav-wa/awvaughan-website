/**
 * Services Page Data Loader
 * Provides SEO metadata for the Services page
 */

import type { PageLoad } from './$types';
import type { SEOMetadata } from '$lib/types';

/**
 * Load function for Services page
 * Returns SEO metadata for the page
 */
export const load: PageLoad = () => {
	const seo: SEOMetadata = {
		title: 'Our Services - Gravel Driveway Repair & Drainage Solutions | Virginia Beach 757',
		description:
			'Professional excavation services including gravel driveway repair, drainage solutions, shed pad preparation, and site work in Virginia Beach and the 757 area.',
		keywords: [
			'gravel driveway repair Virginia Beach',
			'drainage solutions 757',
			'excavation services Hampton Roads',
			'shed pad preparation',
			'driveway grading Norfolk VA',
			'culvert repair Virginia Beach'
		],
		canonical: 'https://awvaughan.com/services',
		openGraph: {
			type: 'website',
			title: 'Professional Excavation Services | The A.W. Vaughan Company',
			description:
				'Expert gravel driveway repair, drainage solutions, shed pad preparation, and excavation services serving Virginia Beach and the 757 area.',
			url: 'https://awvaughan.com/services',
			siteName: 'The A.W. Vaughan Company',
			image: {
				url: 'https://awvaughan.com/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'The A.W. Vaughan Company Excavation Services'
			}
		}
	};

	return { seo };
};
