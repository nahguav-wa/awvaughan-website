/**
 * Service Page Data Loader
 *
 * Resolves one service from src/lib/data/services.ts and builds its SEO
 * metadata and Schema.org Service entity from that single record.
 */

import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageLoad } from './$types';
import type { SEOMetadata } from '$lib/types';
import { getServiceBySlug, serviceDetails } from '$lib/data/services';
import { absoluteUrl, COMPANY_INFO } from '$lib/config/constants';
import { getServiceSchema } from '$lib/utils/seo';

/** Tells the prerenderer which slugs exist, so all four pages are built. */
export const entries: EntryGenerator = () => serviceDetails.map(({ slug }) => ({ slug }));

export const load: PageLoad = ({ params }) => {
	const service = getServiceBySlug(params.slug);
	if (!service) {
		throw error(404, 'Service not found');
	}

	const canonical = absoluteUrl(`/services/${service.slug}`);

	const seo: SEOMetadata = {
		title: service.seo.title,
		description: service.seo.description,
		canonical,
		openGraph: {
			type: 'website',
			title: service.seo.ogTitle,
			description: service.seo.ogDescription,
			url: canonical,
			siteName: COMPANY_INFO.name,
			image: {
				url: absoluteUrl('/og-image.jpg'),
				width: 1200,
				height: 630,
				alt: service.seo.ogImageAlt
			}
		}
	};

	const structuredData = getServiceSchema(service.title, service.schemaDescription);

	return { service, seo, structuredData };
};
