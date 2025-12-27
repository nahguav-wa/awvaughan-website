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
	<h3 class="text-2xl font-semibold text-gray-900 mb-4">
		{service.title}
	</h3>
	<p class="text-gray-600 mb-4">
		{service.description}
	</p>
	<a href={service.href} class="text-blue-600 hover:text-blue-700 font-medium">
		Learn More →
	</a>
</Card>
