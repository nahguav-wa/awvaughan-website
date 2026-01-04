<!--
	Hero Section Component
	Full-screen hero section with background image, title, subtitle, and CTA buttons
-->
<script lang="ts">
	import Button from '../ui/Button.svelte';

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
<section class="relative w-full h-screen pt-16 md:pt-24">
	<!-- Background Image Container -->
	<div class="absolute inset-0 overflow-hidden">
		<img
			src={imageSrc}
			alt={imageAlt}
			class="w-full h-full object-cover object-top"
			loading="eager"
		/>

		<!-- Dark overlay for better text readability -->
		<div class="absolute inset-0 bg-black bg-opacity-40"></div>
	</div>

	<!-- Hero Content - Centered -->
	<div class="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
		<div class="text-center text-white max-w-4xl">
			<!-- Main Heading - 4xl to 6xl size, bold weight -->
			<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
				{title}
			</h1>

			<!-- Subtitle - lg size, regular weight -->
			<p class="text-lg font-normal mb-8 drop-shadow-md">
				{subtitle}
			</p>

			<!-- Call-to-Action Buttons -->
			<div class="flex gap-4 justify-center flex-wrap">
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
	<div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
		<svg
			class="w-6 h-6 text-white"
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
