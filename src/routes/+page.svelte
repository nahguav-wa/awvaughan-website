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
	imageName="hero-image"
	imageWidth={710}
	imageHeight={1125}
	title="Gravel Driveway Repair & Drainage Solutions in Williamsburg, VA"
	subtitle="Gravel driveway grading, drainage and small excavation for Williamsburg, Toano, Yorktown, West Point, Saluda and Gloucester"
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
