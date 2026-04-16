<!--
	About Section Component
	Company introduction with value propositions
-->
<script lang="ts">
	import { Section, FeatureCard } from '$lib';
	import { features } from '$lib/data/features';
</script>

<!--
	About Section
-->
<Section variant="white">
	<div class="mx-auto max-w-4xl text-center">
		<!-- Section Heading - xl size, bold weight -->
		<h2 class="mb-6 text-xl font-bold text-gray-900">About Us</h2>

		<!-- Company Description - lg size, regular weight -->
		<p class="mb-8 text-lg font-normal text-gray-600">
			We have a passion for land and homes that is reflected in our work. The A.W. Vaughan Company
			serves Virginia Beach and the 757 area with land clearing, bush hogging, gravel driveway
			repair, lawn care, trail systems, and full property project management. We believe managing
			land sustainably is a true craft — and we look forward to making your property dreams a
			reality.
		</p>

		<!-- Value Propositions Grid -->
		<div class="mt-12 grid gap-8 md:grid-cols-3">
			{#each features as feature (feature.title)}
				<FeatureCard {feature} />
			{/each}
		</div>
	</div>
</Section>
