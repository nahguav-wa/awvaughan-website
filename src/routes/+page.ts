import type { PageLoad } from './$types';
import { createSeo } from '$lib/seo';

export const load: PageLoad = ({ url }) => ({
	seo: createSeo({
		title: 'AW Vaughan Company — Owner-Operated Tractor Services in Hampton Roads, VA',
		description:
			'Small tractor work for properties 1 acre and larger. Bush hogging, brush cleanup, light grading, driveway touchups, and hauling across Virginia Beach, Chesapeake, Norfolk, and nearby communities.',
		url
	})
});
