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
		<h2 class="mb-6 font-bold text-gray-900">About Us</h2>

		<!-- Company Description - lg size, regular weight -->
		<p class="mb-8 text-lg font-normal text-gray-600">
			The A.W. Vaughan Company is a land management contractor based in Williamsburg, Virginia. We
			clear land, bush hog fields that have gone up, mulch out underbrush and invasives, and cut
			trail systems that drain properly — on rural and residential property across Williamsburg,
			Toano, Yorktown, New Kent, West Point, Gloucester and Saluda.
		</p>

		<!-- Value Propositions Grid -->
		<div class="mt-12 grid gap-8 md:grid-cols-3">
			{#each features as feature (feature.title)}
				<FeatureCard {feature} />
			{/each}
		</div>
	</div>
</Section>
