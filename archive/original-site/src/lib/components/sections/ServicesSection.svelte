<!--
	Services Section Component
	Displays all service offerings in a grid layout
-->
<script lang="ts">
	import { Section, ServiceCard } from '$lib';
	import { services } from '$lib/data/services';
</script>

<!--
	Services Section
-->
<Section variant="gray">
	<div class="mx-auto max-w-4xl">
		<!-- Section Heading - xl size, bold weight -->
		<h2 class="mb-12 text-center text-xl font-bold text-gray-900">Our Services</h2>

		<!-- Services Grid -->
		<div class="grid gap-8 md:grid-cols-2">
			{#each services as service (service.title)}
				<ServiceCard {service} />
			{/each}
		</div>
	</div>
</Section>
