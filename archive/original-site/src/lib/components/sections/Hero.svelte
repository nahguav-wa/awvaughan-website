<!--
	Hero Section Component
	Full-screen hero section with background image, title, subtitle, and CTA buttons
-->
<script lang="ts">
	import { Button } from '$lib';

	/**
	 * Component Props
	 */
	interface Props {
		/** Background image source URL */
		imageSrc?: string;
		/** Image alt text for accessibility */
		imageAlt?: string;
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
		imageSrc = '/hero-image.jpg',
		imageAlt = 'The A.W. Vaughan Company - Professional Gravel Driveway Repair and Drainage Solutions',
		title = 'Professional Gravel Driveway Repair & Drainage Solutions',
		subtitle = 'Serving Virginia Beach and the 757 area with expert excavation and site work',
		primaryCTA = 'Get Started',
		primaryHref = '/contact',
		secondaryCTA = 'Our Services',
		secondaryHref = '/services'
	}: Props = $props();
</script>

<!--
	Hero Section - Full viewport height with background image
-->
<section class="relative h-screen w-full pt-16 md:pt-24">
	<!-- Background Image Container -->
	<div class="absolute inset-0 overflow-hidden">
		<img
			src={imageSrc}
			alt={imageAlt}
			class="h-full w-full object-cover object-top"
			width="710"
			height="1125"
			loading="eager"
		/>

		<!-- Dark overlay for better text readability -->
		<div class="absolute inset-0 bg-black/40"></div>
	</div>

	<!-- Hero Content - Centered -->
	<div class="relative z-10 container mx-auto flex h-full items-center justify-center px-4">
		<div class="max-w-4xl text-center text-white">
			<!-- Main Heading - Responsive hero sizing via clamp -->
			<h1 class="hero-heading mb-6 font-bold drop-shadow-lg">
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

	<!-- Scroll Indicator (animated) -->
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
