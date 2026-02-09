<!--
	SEO Head Component
	Renders meta tags, Open Graph tags, Twitter Cards, and structured data for SEO
-->
<script lang="ts">
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

	/**
	 * Resolve keywords to a string (handles both string and string[])
	 */
	const resolvedKeywords = $derived(
		Array.isArray(metadata.keywords) ? metadata.keywords.join(', ') : metadata.keywords
	);

	/** Use openGraph overrides when available, fall back to top-level metadata */
	const ogType = $derived(metadata.openGraph?.type || metadata.type || 'website');
	const ogTitle = $derived(metadata.openGraph?.title || metadata.title);
	const ogDescription = $derived(metadata.openGraph?.description || metadata.description);
	const ogUrl = $derived(
		metadata.openGraph?.url || metadata.canonical || 'https://awvaughan.com'
	);
	const ogImage = $derived(
		metadata.openGraph?.image?.url || metadata.ogImage
	);

	/**
	 * Build the full JSON-LD script tag HTML for structured data
	 */
	const structuredDataHtml = $derived.by(() => {
		if (!structuredData) return '';
		const data = Array.isArray(structuredData) ? structuredData : [structuredData];
		const json = data.map((item) => JSON.stringify(item)).join('\n');
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
	<meta name="title" content={metadata.title} />
	<meta name="description" content={metadata.description} />

	{#if resolvedKeywords}
		<meta name="keywords" content={resolvedKeywords} />
	{/if}

	<!-- Canonical URL -->
	{#if metadata.canonical}
		<link rel="canonical" href={metadata.canonical} />
	{/if}

	<!-- Robots Meta Tags -->
	{#if metadata.noindex || metadata.nofollow}
		<meta
			name="robots"
			content="{metadata.noindex ? 'noindex' : 'index'},{metadata.nofollow
				? 'nofollow'
				: 'follow'}"
		/>
	{/if}

	<!-- Open Graph / Facebook Meta Tags -->
	<meta property="og:type" content={ogType} />
	<meta property="og:url" content={ogUrl} />
	<meta property="og:title" content={ogTitle} />
	<meta property="og:description" content={ogDescription} />
	{#if metadata.openGraph?.siteName}
		<meta property="og:site_name" content={metadata.openGraph.siteName} />
	{/if}
	{#if ogImage}
		<meta property="og:image" content={ogImage} />
	{/if}
	{#if metadata.openGraph?.image?.width}
		<meta property="og:image:width" content={String(metadata.openGraph.image.width)} />
	{/if}
	{#if metadata.openGraph?.image?.height}
		<meta property="og:image:height" content={String(metadata.openGraph.image.height)} />
	{/if}
	{#if metadata.openGraph?.image?.alt}
		<meta property="og:image:alt" content={metadata.openGraph.image.alt} />
	{/if}

	<!-- Twitter Card Meta Tags -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={ogUrl} />
	<meta property="twitter:title" content={ogTitle} />
	<meta property="twitter:description" content={ogDescription} />
	{#if ogImage}
		<meta property="twitter:image" content={ogImage} />
	{/if}

	<!-- Structured Data (JSON-LD) -->
	{#if structuredData}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html structuredDataHtml}
	{/if}
</svelte:head>
