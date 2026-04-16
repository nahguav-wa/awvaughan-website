<!--
	Call-to-Action Section Component
	Prominent CTA section encouraging user engagement
-->
<script lang="ts">
	import Section from '../ui/Section.svelte';
	import Button from '../ui/Button.svelte';
	import { COMPANY_INFO } from '$lib/config/constants';
</script>

<!--
	CTA Section with blue background
-->
<Section variant="blue">
	<div class="text-center">
		<!-- CTA Heading - xl size, bold weight -->
		<h2 class="mb-6 text-xl font-bold">Ready to Get Started?</h2>

		<!-- CTA Description - lg size, regular weight -->
		<p class="mx-auto mb-8 max-w-2xl text-lg font-normal">
			We make land beautiful and look forward to making your dreams for your property become
			reality. Serving Virginia Beach and the 757 area — contact us today at {COMPANY_INFO.phone}
			to get started.
		</p>

		<!-- CTA Button -->
		<Button
			variant="secondary"
			href="/contact"
			size="lg"
			class="bg-white !text-primary-500 hover:bg-gray-100"
		>
			Contact Us
		</Button>
	</div>
</Section>
