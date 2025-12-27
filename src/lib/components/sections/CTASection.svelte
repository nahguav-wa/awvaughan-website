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
		<!-- CTA Heading -->
		<h2 class="text-4xl font-bold mb-6">Ready to Get Started?</h2>

		<!-- CTA Description -->
		<p class="text-xl mb-8 max-w-2xl mx-auto">
			Need gravel driveway repair, drainage solutions, or excavation services in Virginia Beach?
			Let's work together to solve your property maintenance challenges. Contact us today at
			{COMPANY_INFO.phone} for a consultation.
		</p>

		<!-- CTA Button -->
		<Button variant="secondary" href="/contact" size="lg" class="bg-white text-blue-600 hover:bg-gray-100">
			Contact Us Now
		</Button>
	</div>
</Section>
