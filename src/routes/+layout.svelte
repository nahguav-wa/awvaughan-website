<!--
	Root Layout Component
	Wraps every page with the header, footer, and SEO/structured-data head.
-->
<script lang="ts">
	import '../app.css';

	import { page } from '$app/stores';
	import { Header, Footer, SEOHead } from '$lib';
	import { getDefaultSEO, getPersonSchema, getWebsiteSchema } from '$lib/utils/seo';

	import type { Snippet } from 'svelte';
	import type { SEOMetadata } from '$lib/types';

	interface Props {
		/** Child pages/routes content */
		children: Snippet;
	}

	let { children }: Props = $props();

	const favicon = '/Favicon.svg';

	/** Site-wide default structured data (Person + WebSite) */
	const defaultStructuredData = [getPersonSchema(), getWebsiteSchema()];

	/** Merged page data provides per-page SEO + optional structured data overrides */
	const seo = $derived(($page.data.seo as SEOMetadata | undefined) ?? getDefaultSEO());
	const structuredData = $derived(
		($page.data.structuredData as Record<string, unknown>[] | undefined) ?? defaultStructuredData
	);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<SEOHead metadata={seo} {structuredData} />

<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:rounded-md focus:bg-primary-500 focus:px-4 focus:py-2 focus:text-white"
>
	Skip to main content
</a>

<Header />

<main id="main-content" class="mx-auto min-h-[60vh] max-w-3xl px-4 py-12">
	{@render children()}
</main>

<Footer />
