import { getPublishedArticles } from '$lib/content';
import { getDefaultSEO } from '$lib/utils/seo';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		seo: getDefaultSEO(),
		articles: getPublishedArticles().slice(0, 5)
	};
};
