<!--
	Root Layout Component
	Main application layout wrapper with header, footer, and SEO
-->
<script lang="ts">
	/**
	 * Imports - External Dependencies
	 */
	import '../app.css';
	import { page } from '$app/state';

	/**
	 * Imports - Internal Components
	 */
	import { Header, Footer, SEOHead } from '$lib';
	import { getLocalBusinessSchema } from '$lib/utils/seo';

	import type { Snippet } from 'svelte';
	import type { SEOMetadata } from '$lib/types';
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
	 * Resolved SEO metadata for the current route.
	 *
	 * Read from `page.data`, which merges layout and page data, rather than from
	 * this layout's own `data`. Reading `data.seo` here meant every route shipped
	 * the layout's defaults: identical <title> tags sitewide, and a canonical of
	 * https://awvaughan.com on every page — which told search engines that the
	 * service pages *were* the homepage and should be dropped from the index.
	 * Page-level values are layered over the defaults so a page only has to
	 * specify what differs.
	 */
	const seo = $derived<SEOMetadata>({
		...data.seo,
		...(page.data.seo ?? {})
	});

	/**
	 * Structured data for the current route.
	 *
	 * LocalBusiness describes the company on every page; a page may contribute an
	 * additional entity (service pages add Schema.org Service).
	 */
	const structuredData = $derived([
		getLocalBusinessSchema(),
		...(page.data.structuredData ? [page.data.structuredData] : [])
	]);

	/**
	 * The header is fixed, so content needs to clear it. The homepage is exempt:
	 * its hero is deliberately full-bleed and sits underneath the transparent
	 * header. This used to be an `mt-16 md:mt-28` repeated in every page
	 * component, which meant seven files had to change together whenever the
	 * header's height did.
	 */
	const isHomepage = $derived(page.url.pathname === '/');
</script>

<!--
	SEO Component - Meta tags and structured data
	Uses defaults from +layout.ts, overridden per page via page.data
-->
<SEOHead metadata={seo} {structuredData} />

<!--
	Skip to Content Link - Accessibility
-->
<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:rounded-md focus:bg-primary-500 focus:px-4 focus:py-2 focus:text-white"
>
	Skip to main content
</a>

<!--
	Page Header - Main navigation
-->
<Header />

<!--
	Main Content Area - Page-specific content
	Rendered from individual +page.svelte files
-->
<main id="main-content" class={isHomepage ? '' : 'pt-16 md:pt-28'}>
	{@render children()}
</main>

<!--
	Page Footer - Site-wide footer
-->
<Footer />
