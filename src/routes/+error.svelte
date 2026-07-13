<!--
	Error Page
	Simple, friendly error page for 404s and unexpected errors.
-->
<script lang="ts">
	import { page } from '$app/stores';
	import { SITE } from '$lib/config/site';
</script>

<svelte:head>
	<title>{$page.status === 404 ? 'Page Not Found' : 'Something Went Wrong'} | {SITE.name}</title>
</svelte:head>

<section class="py-16 text-center">
	<p class="text-lg font-bold text-primary-600">{$page.status}</p>
	<h1 class="mt-2 text-2xl font-bold text-stone-900 dark:text-white">
		{#if $page.status === 404}
			Page not found
		{:else}
			Something went wrong
		{/if}
	</h1>
	<p class="mx-auto mt-4 max-w-md text-base font-normal text-stone-600 dark:text-stone-300">
		{#if $page.status === 404}
			The page you're looking for doesn't exist or has moved.
		{:else}
			An unexpected error occurred. Please try again.
		{/if}
	</p>
	<div class="mt-8 flex justify-center gap-4">
		<a
			href="/"
			class="rounded-lg bg-primary-500 px-5 py-2.5 text-base font-bold text-white transition hover:bg-primary-600"
		>
			Back home
		</a>
		<a
			href="/writing"
			class="rounded-lg border border-stone-300 px-5 py-2.5 text-base font-bold text-stone-700 transition hover:border-stone-400 dark:border-stone-700 dark:text-stone-200"
		>
			Read the writing
		</a>
	</div>
</section>
