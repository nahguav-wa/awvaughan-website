<!--
	Service Card Component
	Displays a single service offering with title, description, and link
-->
<script lang="ts">
	import Card from './ui/Card.svelte';
	import type { Service } from '$lib/types';

	/**
	 * Component Props
	 */
	interface Props {
		/** Service data */
		service: Service;
	}

	let { service }: Props = $props();
</script>

<!--
	Service card with hover effect
-->
<Card>
	<!-- Service title - xl size, bold weight -->
	<h3 class="text-xl font-bold text-gray-900 mb-4">
		{service.title}
	</h3>
	<!-- Service description - base size, regular weight -->
	<p class="text-base font-normal text-gray-600 mb-4">
		{service.description}
	</p>
	<!-- Learn more link - base size, bold weight -->
	<a href={service.href} class="text-base font-bold text-primary-500 hover:text-primary-600">
		Learn More →
	</a>
</Card>
