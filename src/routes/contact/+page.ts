import type { PageLoad } from './$types';
import { createSeo } from '$lib/seo';

export const load: PageLoad = ({ url }) => ({
	seo: createSeo({
		title: 'Contact AW Vaughan Company | Tractor Services in Hampton Roads',
		description:
			'Reach owner-operator Alex Vaughan at (757) 402-1100 or alex.vaughan@awvaughan.com for bush hogging, brush cleanup, driveway grading, and hauling across Hampton Roads and northeast North Carolina.',
		url
	})
});
