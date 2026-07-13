/**
 * Contact Page Data Loader
 * Provides SEO metadata for the Contact page
 */

import type { PageLoad } from './$types';
import type { SEOMetadata } from '$lib/types';

/**
 * Load function for Contact page
 * Returns SEO metadata for the page
 */
export const load: PageLoad = () => {
	const seo: SEOMetadata = {
		title: 'Contact Us - Get a Free Quote | The A.W. Vaughan Company Virginia Beach',
		description:
			'Contact The A.W. Vaughan Company for a free quote on gravel driveway repair, drainage solutions, and excavation services in Virginia Beach and the 757 area. Call (757) 402-1100.',
		keywords: [
			'contact A.W. Vaughan',
			'free excavation quote Virginia Beach',
			'gravel driveway quote 757',
			'drainage solutions contact',
			'excavation contractor Virginia Beach'
		],
		canonical: 'https://awvaughan.com/contact',
		openGraph: {
			type: 'website',
			title: 'Contact The A.W. Vaughan Company | Free Quotes',
			description:
				'Get a free quote for professional gravel driveway repair, drainage solutions, and excavation services in Virginia Beach. Call (757) 402-1100 or fill out our contact form.',
			url: 'https://awvaughan.com/contact',
			siteName: 'The A.W. Vaughan Company',
			image: {
				url: 'https://awvaughan.com/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'Contact The A.W. Vaughan Company'
			}
		}
	};

	return { seo };
};

/** Contact page has a form that submits to the API, so it cannot be prerendered */
export const prerender = false;
