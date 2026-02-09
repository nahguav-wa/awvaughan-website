<!--
	Root Layout Component
	Main application layout wrapper with header, footer, and SEO
-->
<script lang="ts">
	/**
	 * Imports - External Dependencies
	 */
	import '../app.css';

	/**
	 * Imports - Internal Components
	 */
	import { Header, Footer, SEOHead } from '$lib';
	import { getLocalBusinessSchema } from '$lib/utils/seo';

	/**
	 * Imports - Assets
	 */
	const favicon = '/Favicon.svg';

	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	/**
	 * Component Props
	 * Type-safe props using Svelte 5 runes syntax
	 */
	interface Props {
		/** Child pages/routes content */
		children: Snippet;
		/** Route data from load function */
		data: LayoutData;
	}

	let { children, data }: Props = $props();

	/**
	 * Structured data for LocalBusiness schema
	 */
	const structuredData = getLocalBusinessSchema();
</script>

<!--
	Document Head - Favicon and SEO
-->
<svelte:head>
	<!-- Favicon -->
	<link rel="icon" href={favicon} />
</svelte:head>

<!--
	SEO Component - Meta tags and structured data
	Uses data from +layout.ts and page-specific overrides
-->
{#if data?.seo}
	<SEOHead metadata={data.seo} {structuredData} />
{/if}

<!--
	Page Header - Main navigation
-->
<Header />

<!--
	Main Content Area - Page-specific content
	Rendered from individual +page.svelte files
-->
<main>
	{@render children()}
</main>

<!--
	Page Footer - Site-wide footer
-->
<Footer />
