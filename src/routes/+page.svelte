<!--
	Homepage Component
	Main landing page with hero, about, services, and CTA sections
-->
<script lang="ts">
	/**
	 * Imports - Page Section Components
	 */
	import { Hero, AboutSection, ServicesSection, CTASection } from '$lib';
</script>

<!--
	Hero Section
	Full-screen hero with background image and CTAs
-->
<Hero
	imageSrc="/hero-image.jpg"
	imageAlt="Land management, land clearing, and bush hogging services in Virginia Beach - The A.W. Vaughan Company"
	title="We Make Land Beautiful"
	subtitle="Serving Virginia Beach and the 757 area with land clearing, bush hogging, gravel driveways, and more"
	primaryCTA="Get a Free Quote"
	primaryHref="/contact"
	secondaryCTA="View Our Services"
	secondaryHref="/services"
/>

<!--
	About Section
	Company introduction and value propositions
-->
<AboutSection />

<!--
	Services Section
	Grid of service offerings
-->
<ServicesSection />

<!--
	Call-to-Action Section
	Conversion-focused CTA
-->
<CTASection />
