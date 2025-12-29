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
		structuredData?: object | object[];
	}

	let { metadata, structuredData }: Props = $props();

	/**
	 * Process structured data into JSON-LD format
	 */
	const getStructuredDataScript = () => {
		if (!structuredData) return '';

		const data = Array.isArray(structuredData) ? structuredData : [structuredData];

		return data.map((item) => JSON.stringify(item)).join('\n');
	};
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

	{#if metadata.keywords}
		<meta name="keywords" content={metadata.keywords} />
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
	<meta property="og:type" content={metadata.type || 'website'} />
	<meta property="og:url" content={metadata.canonical || 'https://awvaughan.com'} />
	<meta property="og:title" content={metadata.title} />
	<meta property="og:description" content={metadata.description} />
	{#if metadata.ogImage}
		<meta property="og:image" content={metadata.ogImage} />
	{/if}

	<!-- Twitter Card Meta Tags -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={metadata.canonical || 'https://awvaughan.com'} />
	<meta property="twitter:title" content={metadata.title} />
	<meta property="twitter:description" content={metadata.description} />
	{#if metadata.ogImage}
		<meta property="twitter:image" content={metadata.ogImage} />
	{/if}

	<!-- Structured Data (JSON-LD) -->
	{#if structuredData}
		{@html `<script type="application/ld+json">${getStructuredDataScript()}</script>`}
	{/if}
</svelte:head>
