import { getPublishedArticles } from '$lib/content';
import { getDefaultSEO, formatPageTitle } from '$lib/utils/seo';
import { SITE } from '$lib/config/site';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		seo: getDefaultSEO({
			title: formatPageTitle('Writing'),
			description: `Essays and field notes by ${SITE.name} on construction technology and marketing.`,
			canonical: `${SITE.url}/writing`
		}),
		articles: getPublishedArticles()
	};
};
