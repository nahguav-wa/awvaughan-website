<!--
	SEO Head Component
	Renders meta tags, Open Graph tags, Twitter Cards, and structured data for SEO
-->
<script lang="ts">
	import { absoluteUrl, COMPANY_INFO, SITE_URL } from '$lib/config/constants';
	import type { SEOMetadata } from '$lib/types';

	/**
	 * Component Props
	 */
	interface Props {
		/** SEO metadata configuration */
		metadata: SEOMetadata;
		/** Optional JSON-LD structured data */
		structuredData?: Record<string, unknown> | Record<string, unknown>[];
	}

	let { metadata, structuredData }: Props = $props();

	/** Dimensions of static/og-image.jpg, produced by scripts/optimize-images.mjs. */
	const OG_IMAGE_WIDTH = 1200;
	const OG_IMAGE_HEIGHT = 630;

	/** Use openGraph overrides when available, fall back to top-level metadata */
	const ogType = $derived(metadata.openGraph?.type || metadata.type || 'website');
	const ogTitle = $derived(metadata.openGraph?.title || metadata.title);
	const ogDescription = $derived(metadata.openGraph?.description || metadata.description);
	const ogUrl = $derived(metadata.openGraph?.url || metadata.canonical || SITE_URL);

	/**
	 * Open Graph and Twitter images must be absolute URLs; a relative path is not
	 * resolved reliably by crawlers, so a page whose metadata carries only
	 * `/og-image.jpg` previously shared with no image at all.
	 */
	const ogImage = $derived.by(() => {
		const candidate = metadata.openGraph?.image?.url || metadata.ogImage;
		return candidate ? absoluteUrl(candidate) : undefined;
	});

	const ogImageWidth = $derived(metadata.openGraph?.image?.width ?? OG_IMAGE_WIDTH);
	const ogImageHeight = $derived(metadata.openGraph?.image?.height ?? OG_IMAGE_HEIGHT);
	const ogImageAlt = $derived(metadata.openGraph?.image?.alt ?? metadata.title);

	/**
	 * Build the full JSON-LD script tag HTML for structured data.
	 *
	 * `<` is escaped to its JSON unicode form so no value can terminate the
	 * script element early, whatever ends up in the data.
	 */
	const structuredDataHtml = $derived.by(() => {
		if (!structuredData) return '';
		const data = Array.isArray(structuredData) ? structuredData : [structuredData];
		const json = data.map((item) => JSON.stringify(item).replace(/</g, '\\u003c')).join('\n');
		return '<script type="application/ld+json">' + json + '</' + 'script>';
	});
</script>

<!--
	SEO Meta Tags
	Critical metadata for search engine optimization
-->
<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{metadata.title}</title>
	<meta name="description" content={metadata.description} />

	<!-- Canonical URL -->
	{#if metadata.canonical}
		<link rel="canonical" href={metadata.canonical} />
	{/if}

	<!-- Robots Meta Tags -->
	{#if metadata.noindex || metadata.nofollow}
		<meta
			name="robots"
			content="{metadata.noindex ? 'noindex' : 'index'},{metadata.nofollow ? 'nofollow' : 'follow'}"
		/>
	{/if}

	<!-- Open Graph / Facebook Meta Tags -->
	<meta property="og:type" content={ogType} />
	<meta property="og:url" content={ogUrl} />
	<meta property="og:title" content={ogTitle} />
	<meta property="og:description" content={ogDescription} />
	<meta property="og:locale" content="en_US" />
	<meta property="og:site_name" content={metadata.openGraph?.siteName ?? COMPANY_INFO.name} />
	{#if ogImage}
		<meta property="og:image" content={ogImage} />
		<meta property="og:image:width" content={String(ogImageWidth)} />
		<meta property="og:image:height" content={String(ogImageHeight)} />
		<meta property="og:image:alt" content={ogImageAlt} />
	{/if}

	<!--
		Twitter Card Meta Tags
		Twitter reads these from `name`, not `property`.
	-->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={ogTitle} />
	<meta name="twitter:description" content={ogDescription} />
	{#if ogImage}
		<meta name="twitter:image" content={ogImage} />
		<meta name="twitter:image:alt" content={ogImageAlt} />
	{/if}

	<!-- Structured Data (JSON-LD) -->
	{#if structuredData}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html structuredDataHtml}
	{/if}
</svelte:head>
