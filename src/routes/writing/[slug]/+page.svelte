<!--
	Article Page
	Renders a single Markdown article inside prose styling.
	The mdsvex component is resolved locally from the content map so `load` data
	stays fully serializable.
-->
<script lang="ts">
	import { getArticle, formatDate } from '$lib/content';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const article = $derived(getArticle(data.slug));
	const Content = $derived(article?.component);
</script>

<article class="py-8">
	<a href="/writing" class="text-sm font-normal text-primary-600 hover:underline">← Writing</a>

	<header class="mt-4">
		<h1 class="text-2xl font-bold tracking-tight text-stone-900 dark:text-white">
			{data.meta.title}
		</h1>
		<div class="mt-2 flex flex-wrap items-center gap-3 text-sm text-stone-500 dark:text-stone-400">
			<time datetime={data.meta.date}>{formatDate(data.meta.date)}</time>
			{#if data.meta.tags && data.meta.tags.length > 0}
				<span aria-hidden="true">·</span>
				<span>{data.meta.tags.join(', ')}</span>
			{/if}
		</div>
	</header>

	<div
		class="prose mt-8 max-w-none prose-stone dark:prose-invert prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline"
	>
		{#if Content}
			<Content />
		{/if}
	</div>
</article>
