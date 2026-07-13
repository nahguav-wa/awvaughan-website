<!--
	ArticleCard Component
	A single article entry used in the writing index and homepage list.
-->
<script lang="ts">
	import { formatDate } from '$lib/content';
	import type { ArticleMeta } from '$lib/types';

	interface Props {
		article: ArticleMeta;
	}

	let { article }: Props = $props();
</script>

<article class="group border-b border-stone-200 py-6 last:border-b-0 dark:border-stone-800">
	<a href="/writing/{article.slug}" class="block">
		<time datetime={article.date} class="text-sm font-normal text-stone-500 dark:text-stone-400">
			{formatDate(article.date)}
		</time>
		<h2
			class="mt-1 text-lg font-bold text-stone-900 transition-colors group-hover:text-primary-600 dark:text-white"
		>
			{article.title}
		</h2>
		<p class="mt-2 text-base font-normal text-stone-600 dark:text-stone-300">
			{article.description}
		</p>
	</a>
</article>
