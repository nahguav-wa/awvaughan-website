import type { PageLoad } from './$types';
import { createSeo } from '$lib/seo';

export const load: PageLoad = ({ url }) => ({
	seo: createSeo({
		title: 'About AW Vaughan Company | Owner-Operated Tractor Services',
		description:
			'Meet Alex Vaughan, the owner-operator providing bush hogging, brush cleanup, light grading, and hauling for acreage properties across Hampton Roads and northeast North Carolina.',
		url
	})
});
