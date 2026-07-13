<!--
	Writing Index
	Chronological list of all published articles.
-->
<script lang="ts">
	import { ArticleCard } from '$lib';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<section class="py-8">
	<h1 class="text-xl font-bold tracking-tight text-stone-900 dark:text-white">Writing</h1>
	<p class="mt-2 text-base font-normal text-stone-600 dark:text-stone-300">
		Essays and field notes on construction technology and marketing.
	</p>

	<div class="mt-6">
		{#if data.articles.length > 0}
			{#each data.articles as article (article.slug)}
				<ArticleCard {article} />
			{/each}
		{:else}
			<p class="text-base font-normal text-stone-500 dark:text-stone-400">
				No articles yet — check back soon.
			</p>
		{/if}
	</div>
</section>
