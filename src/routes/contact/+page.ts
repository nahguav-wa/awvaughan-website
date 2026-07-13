import { getDefaultSEO, formatPageTitle } from '$lib/utils/seo';
import { SITE } from '$lib/config/site';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		seo: getDefaultSEO({
			title: formatPageTitle('Contact'),
			description: `Get in touch with ${SITE.name}.`,
			canonical: `${SITE.url}/contact`
		})
	};
};
