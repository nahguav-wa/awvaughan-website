<!--
	Hero Section Component
	Full-screen hero section with background image, title, subtitle, and CTA buttons
-->
<script lang="ts">
	import { Button, Picture } from '$lib';

	/**
	 * Component Props
	 */
	interface Props {
		/** Basename of the background photograph under /images. */
		imageName?: string;
		/** Intrinsic width of the source photograph. */
		imageWidth?: number;
		/** Intrinsic height of the source photograph. */
		imageHeight?: number;
		/** Main heading text */
		title?: string;
		/** Subtitle/tagline text */
		subtitle?: string;
		/** Primary CTA button text */
		primaryCTA?: string;
		/** Primary CTA button href */
		primaryHref?: string;
		/** Secondary CTA button text */
		secondaryCTA?: string;
		/** Secondary CTA button href */
		secondaryHref?: string;
	}

	let {
		imageName = 'hero-image',
		imageWidth = 710,
		imageHeight = 1125,
		title = 'Land Clearing, Bush Hogging & Forestry Mulching',
		subtitle = 'Serving Williamsburg, the Historic Triangle, and the Middle Peninsula with land clearing, mowing and trail work',
		primaryCTA = 'Get Started',
		primaryHref = '/contact',
		secondaryCTA = 'Our Services',
		secondaryHref = '/services'
	}: Props = $props();
</script>

<svelte:head>
	<!--
		The hero photograph is the LCP element, so the browser is told about it
		before it has parsed this far. Browsers without AVIF support skip a
		preload carrying a type they cannot decode.
	-->
	<link
		rel="preload"
		as="image"
		type="image/avif"
		href="/images/{imageName}.avif"
		imagesrcset="/images/{imageName}-480.avif 480w, /images/{imageName}.avif {imageWidth}w"
		imagesizes="100vw"
	/>
</svelte:head>

<!--
	Hero Section - Full viewport height with background image.
	`min-h-dvh` rather than `h-screen`: on iOS Safari, 100vh includes the browser
	chrome, so a 100vh hero is taller than the visible viewport and its content
	is clipped until the toolbar collapses.
-->
<section class="relative min-h-dvh w-full pt-16 md:pt-24">
	<!-- Background Image Container -->
	<div class="absolute inset-0 overflow-hidden">
		<!--
			Decorative: the headline and subtitle below carry the meaning, so an alt
			description here would only make a screen reader read marketing copy
			before reaching the actual content.
		-->
		<Picture
			name={imageName}
			alt=""
			width={imageWidth}
			height={imageHeight}
			sizes="100vw"
			class="h-full w-full object-cover object-top"
			priority
		/>

		<!-- Dark overlay for better text readability -->
		<div class="absolute inset-0 bg-black/40"></div>
	</div>

	<!-- Hero Content - Centered -->
	<div
		class="relative z-10 container mx-auto flex min-h-dvh items-center justify-center px-4 py-24"
	>
		<div class="max-w-4xl text-center text-white">
			<!-- Main Heading -->
			<h1 class="mb-6 drop-shadow-lg">
				{title}
			</h1>

			<!-- Subtitle - lg size, regular weight -->
			<p class="mb-8 text-lg font-normal drop-shadow-md">
				{subtitle}
			</p>

			<!-- Call-to-Action Buttons -->
			<div class="flex flex-wrap justify-center gap-4">
				<Button variant="primary" href={primaryHref} size="lg">
					{primaryCTA}
				</Button>
				<Button variant="outline" href={secondaryHref} size="lg">
					{secondaryCTA}
				</Button>
			</div>
		</div>
	</div>

	<!-- Scroll Indicator (animated; suppressed by prefers-reduced-motion) -->
	<div class="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
		<svg
			class="h-6 w-6 text-white"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M19 14l-7 7m0 0l-7-7m7 7V3"
			/>
		</svg>
	</div>
</section>
