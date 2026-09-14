<!--
	Service Card Component
	Displays a single service offering with title, description, and link
-->
<script lang="ts">
	import { Card } from '$lib';
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
	Service card with hover effect.

	A full-height column so cards sit level whatever their copy length — the grid
	on /services equalised them for free, the homepage carousel's flex row does
	not — and so "Learn More" lands on the same line across a row.
-->
<Card class="flex h-full flex-col">
	<!-- Service title - bold weight, size from the heading scale -->
	<h3 class="mb-4 font-bold text-gray-900">
		{service.title}
	</h3>
	<!-- Service description - base size, regular weight -->
	<p class="mb-4 flex-1 text-base font-normal text-gray-600">
		{service.description}
	</p>
	<!-- Learn more link - base size, bold weight -->
	<a href={service.href} class="text-base font-bold text-primary-500 hover:text-primary-600">
		Learn More →
	</a>
</Card>
