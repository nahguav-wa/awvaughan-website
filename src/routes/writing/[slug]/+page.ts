import { error } from '@sveltejs/kit';
import { getAllArticles, getArticle } from '$lib/content';
import { getArticleSEO, getArticleSchema } from '$lib/utils/seo';
import type { EntryGenerator, PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const article = getArticle(params.slug);

	if (!article) {
		error(404, 'Article not found');
	}

	return {
		slug: article.meta.slug,
		meta: article.meta,
		seo: getArticleSEO(article.meta),
		structuredData: [getArticleSchema(article.meta)]
	};
};

/** Prerender an entry for every article, including drafts (drafts stay noindex). */
export const entries: EntryGenerator = () => {
	return getAllArticles().map((article) => ({ slug: article.slug }));
};
