import type { PageLoad } from './$types';
import { createSeo } from '$lib/seo';

export const load: PageLoad = ({ url }) => ({
	seo: createSeo({
		title: 'Terms of Service — AW Vaughan Company',
		description:
			'Understand the terms that govern AW Vaughan Company’s website, proposals, and client communication for projects across Hampton Roads.',
		url
	})
});
