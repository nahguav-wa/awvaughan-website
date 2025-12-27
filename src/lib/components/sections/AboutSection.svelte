<!--
	About Section Component
	Company introduction with value propositions
-->
<script lang="ts">
	import Section from '../ui/Section.svelte';
	import FeatureCard from '../FeatureCard.svelte';
	import { features } from '$lib/data/features';
</script>

<!--
	About Section
-->
<Section variant="white">
	<div class="max-w-4xl mx-auto text-center">
		<!-- Section Heading -->
		<h2 class="text-4xl font-bold text-gray-900 mb-6">About Us</h2>

		<!-- Company Description -->
		<p class="text-lg text-gray-600 mb-8">
			We are The A.W. Vaughan Company, a leading gravel driveway repair and drainage solutions
			provider in Virginia Beach and the 757 area. With specialized expertise in excavation,
			driveway grading, and rural property maintenance, we deliver results that exceed
			expectations. From fixing standing water issues to professional shed pad preparation, we're
			the small excavation contractor dedicated to your success.
		</p>

		<!-- Value Propositions Grid -->
		<div class="grid md:grid-cols-3 gap-8 mt-12">
			{#each features as feature}
				<FeatureCard {feature} />
			{/each}
		</div>
	</div>
</Section>
