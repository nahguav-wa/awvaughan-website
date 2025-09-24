import type { PageLoad } from './$types';
import { createSeo } from '$lib/seo';

export const load: PageLoad = ({ url }) => ({
	seo: createSeo({
		title: 'Project Highlights | AW Vaughan Company',
		description:
			'Explore recent tractor projects completed across Hampton Roads and northeast North Carolina, including mowing, brush cleanup, and driveway restoration.',
		url
	})
});
