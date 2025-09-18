import type { PageLoad } from './$types';
import { createSeo } from '$lib/seo';

export const load: PageLoad = ({ url }) => ({
	seo: createSeo({
		title: 'Careers — AW Vaughan Company',
		description:
			'Explore career opportunities with AW Vaughan Company. Share your resume to join our Virginia Beach sitework and property maintenance team.',
		url
	})
});
