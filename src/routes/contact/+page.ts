import type { PageLoad } from './$types';
import { createSeo } from '$lib/seo';

export const load: PageLoad = ({ url }) => ({
	seo: createSeo({
		title: 'Contact AW Vaughan Company | Sitework & Property Maintenance in Virginia Beach',
		description:
			'Contact AW Vaughan Company at (757) 402-1100 or alex.vaughan@awvaughan.com for sitework, drainage, and property maintenance services in Virginia Beach and Hampton Roads.',
		url
	})
});
