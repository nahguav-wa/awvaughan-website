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
		<h2 class="mb-6 font-bold">Ready to Get Started?</h2>

		<!-- CTA Description - lg size, regular weight -->
		<p class="mx-auto mb-8 max-w-2xl text-lg font-normal">
			Have a parcel that has grown up, a field that needs cutting, or a trail you want opened? Tell
			us what you are looking at and we will come walk it with you. Free quotes across Williamsburg,
			the Historic Triangle, and the Middle Peninsula — call {COMPANY_INFO.phone}.
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
