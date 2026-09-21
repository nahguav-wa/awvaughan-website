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
			Looking for a maintenance program you do not have to chase? Tell us about the property and we
			will come walk it with you and put a plan and a budget in writing. Free quotes across
			Williamsburg, the Historic Triangle, and the Middle Peninsula — call {COMPANY_INFO.phone}.
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
