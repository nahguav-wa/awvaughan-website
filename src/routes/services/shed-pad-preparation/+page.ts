import type { PageLoad } from './$types';
import type { SEOMetadata } from '$lib/types';
import { getServiceSchema } from '$lib/utils/seo';

export const load: PageLoad = () => {
	const seo: SEOMetadata = {
		title: 'Shed Pad & Foundation Preparation | Virginia Beach 757 | The A.W. Vaughan Company',
		description:
			'Professional shed pad preparation and foundation work in Virginia Beach. Precise site leveling, gravel base installation, and proper drainage for sheds and small structures. Call (757) 402-1100.',
		keywords: [
			'shed pad preparation Virginia Beach',
			'shed foundation prep',
			'shed base preparation 757',
			'site prep contractor Virginia Beach',
			'shed pad gravel base',
			'small building foundation Virginia Beach'
		],
		canonical: 'https://awvaughan.com/services/shed-pad-preparation',
		openGraph: {
			type: 'website',
			title: 'Shed Pad & Foundation Preparation | The A.W. Vaughan Company',
			description:
				'Professional shed pad preparation in Virginia Beach. Site leveling, gravel base installation, and proper drainage.',
			url: 'https://awvaughan.com/services/shed-pad-preparation',
			siteName: 'The A.W. Vaughan Company',
			image: {
				url: 'https://awvaughan.com/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'Shed Pad Preparation - The A.W. Vaughan Company'
			}
		}
	};

	const structuredData = getServiceSchema(
		'Shed Pad & Foundation Preparation',
		'Professional shed pad preparation including site clearing, leveling, gravel base installation, and compaction in Virginia Beach and the 757 area.'
	);

	return { seo, structuredData };
};
