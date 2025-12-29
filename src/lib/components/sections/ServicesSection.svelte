<!--
	Services Section Component
	Displays all service offerings in a grid layout
-->
<script lang="ts">
	import Section from '../ui/Section.svelte';
	import ServiceCard from '../ServiceCard.svelte';
	import { services } from '$lib/data/services';
</script>

<!--
	Services Section
-->
<Section variant="gray">
	<div class="max-w-4xl mx-auto">
		<!-- Section Heading - xl size, bold weight -->
		<h2 class="text-xl font-bold text-gray-900 mb-12 text-center">Our Services</h2>

		<!-- Services Grid -->
		<div class="grid md:grid-cols-2 gap-8">
			{#each services as service}
				<ServiceCard {service} />
			{/each}
		</div>
	</div>
</Section>
