<!--
	Call-to-Action Section Component
	Prominent CTA section encouraging user engagement
-->
<script lang="ts">
	import { Section, Button } from '$lib';
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
			Need gravel driveway repair, drainage solutions, or excavation services in Virginia Beach?
			Let's work together to solve your property maintenance challenges. Contact us today at
			{COMPANY_INFO.phone} for a consultation.
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
