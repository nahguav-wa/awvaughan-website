import type { PageLoad } from './$types';
import type { SEOMetadata } from '$lib/types';
import { getServiceSchema } from '$lib/utils/seo';

export const load: PageLoad = () => {
	const seo: SEOMetadata = {
		title: 'Small Excavation & Site Work | Virginia Beach 757 | The A.W. Vaughan Company',
		description:
			'Specialized small excavation contractor in Virginia Beach and the 757 area. Lot clearing, trenching, culvert repair, and rural property maintenance. Call (757) 402-1100 for a free quote.',
		keywords: [
			'small excavation contractor 757',
			'culvert repair Virginia Beach',
			'rural property drainage solutions',
			'small site work contractor',
			'lot clearing Virginia Beach',
			'trenching services 757'
		],
		canonical: 'https://awvaughan.com/services/excavation',
		openGraph: {
			type: 'website',
			title: 'Small Excavation & Site Work | The A.W. Vaughan Company',
			description:
				'Specialized small excavation services in Virginia Beach. Lot clearing, trenching, and rural property maintenance.',
			url: 'https://awvaughan.com/services/excavation',
			siteName: 'The A.W. Vaughan Company',
			image: {
				url: 'https://awvaughan.com/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'Small Excavation Services - The A.W. Vaughan Company'
			}
		}
	};

	const structuredData = getServiceSchema(
		'Small Excavation & Site Work',
		'Specialized small excavation services including lot clearing, trenching, culvert repair, and rural property maintenance in Virginia Beach and the 757 area.'
	);

	return { seo, structuredData };
};
