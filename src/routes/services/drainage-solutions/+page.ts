import type { PageLoad } from './$types';
import type { SEOMetadata } from '$lib/types';
import { getServiceSchema } from '$lib/utils/seo';

export const load: PageLoad = () => {
	const seo: SEOMetadata = {
		title: 'Drainage Solutions & Grading | Virginia Beach 757 | The A.W. Vaughan Company',
		description:
			'Professional drainage solutions in Virginia Beach and the 757 area. French drains, swale repair, culvert installation, and site grading to eliminate standing water. Call (757) 402-1100.',
		keywords: [
			'drainage solutions Norfolk VA',
			'drainage solutions Virginia Beach',
			'driveway grading 757',
			'ditch and swale repair Virginia Beach',
			'French drain installation Virginia Beach',
			'culvert repair Virginia Beach',
			'standing water driveway fix'
		],
		canonical: 'https://awvaughan.com/services/drainage-solutions',
		openGraph: {
			type: 'website',
			title: 'Drainage Solutions & Grading | The A.W. Vaughan Company',
			description:
				'Professional drainage solutions and grading services in Virginia Beach. Eliminate standing water and protect your property.',
			url: 'https://awvaughan.com/services/drainage-solutions',
			siteName: 'The A.W. Vaughan Company',
			image: {
				url: 'https://awvaughan.com/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'Drainage Solutions - The A.W. Vaughan Company'
			}
		}
	};

	const structuredData = getServiceSchema(
		'Drainage Solutions & Grading',
		'Professional drainage solutions including French drains, swale repair, culvert installation, and site grading in Virginia Beach and the 757 area.'
	);

	return { seo, structuredData };
};
