import type { PageLoad } from './$types';
import type { SEOMetadata } from '$lib/types';
import { getServiceSchema } from '$lib/utils/seo';

export const load: PageLoad = () => {
	const seo: SEOMetadata = {
		title:
			'Gravel Driveway Repair & Restoration | Virginia Beach 757 | The A.W. Vaughan Company',
		description:
			'Expert gravel driveway repair in Virginia Beach and the 757 area. Crown restoration, pothole filling, washout repair, and professional driveway grading. Call (757) 402-1100 for a free quote.',
		keywords: [
			'gravel driveway repair Virginia Beach',
			'gravel driveway repair 757',
			'driveway crown restoration',
			'gravel driveway potholes repair',
			'driveway grading Virginia Beach',
			'gravel driveway washout repair'
		],
		canonical: 'https://awvaughan.com/services/gravel-driveway-repair',
		openGraph: {
			type: 'website',
			title: 'Gravel Driveway Repair & Restoration | The A.W. Vaughan Company',
			description:
				'Professional gravel driveway repair services in Virginia Beach. Crown restoration, pothole filling, and washout repair.',
			url: 'https://awvaughan.com/services/gravel-driveway-repair',
			siteName: 'The A.W. Vaughan Company',
			image: {
				url: 'https://awvaughan.com/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'Gravel Driveway Repair Services - The A.W. Vaughan Company'
			}
		}
	};

	const structuredData = getServiceSchema(
		'Gravel Driveway Repair & Restoration',
		'Expert gravel driveway repair services including crown restoration, pothole filling, washout repair, and professional grading in Virginia Beach and the 757 area.'
	);

	return { seo, structuredData };
};
