<!--
	Homepage
	A brief personal introduction followed by the most recent writing.
-->
<script lang="ts">
	import { ArticleCard } from '$lib';
	import { SITE } from '$lib/config/site';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<section class="py-8">
	<h1 class="text-2xl font-bold tracking-tight text-stone-900 dark:text-white">{SITE.name}</h1>
	<p class="mt-1 text-lg font-normal text-primary-600">{SITE.title}</p>
	<p class="mt-6 max-w-2xl text-lg font-normal text-stone-600 dark:text-stone-300">
		{SITE.intro}
	</p>
	<div class="mt-6 flex gap-4">
		<a
			href="/writing"
			class="rounded-lg bg-primary-500 px-5 py-2.5 text-base font-bold text-white transition hover:bg-primary-600"
		>
			Read the writing
		</a>
		<a
			href="/contact"
			class="rounded-lg border border-stone-300 px-5 py-2.5 text-base font-bold text-stone-700 transition hover:border-stone-400 dark:border-stone-700 dark:text-stone-200"
		>
			Get in touch
		</a>
	</div>
</section>

{#if data.articles.length > 0}
	<section class="mt-12">
		<div class="flex items-baseline justify-between">
			<h2 class="text-lg font-bold text-stone-900 dark:text-white">Latest writing</h2>
			<a href="/writing" class="text-sm font-normal text-primary-600 hover:underline">
				All articles →
			</a>
		</div>
		<div class="mt-2">
			{#each data.articles as article (article.slug)}
				<ArticleCard {article} />
			{/each}
		</div>
	</section>
{/if}
