<!--
	Feature Card Component
	Displays a company value proposition with icon, title, and description
-->
<script lang="ts">
	import type { Feature } from '$lib/types';

	/**
	 * Component Props
	 */
	interface Props {
		/** Feature data */
		feature: Feature;
	}

	let { feature }: Props = $props();

	/**
	 * Extract icon component from feature data
	 * Uses $derived for reactivity in Svelte 5
	 */
	const IconComponent = $derived(feature.icon);
</script>

<!--
	Feature card with icon
-->
<div class="p-6 text-center">
	<!-- Icon wrapper -->
	<div class="text-primary-500 mb-4">
		<IconComponent class="w-12 h-12 mx-auto" />
	</div>

	<!-- Feature title - xl size, bold weight -->
	<h3 class="text-xl font-bold text-gray-900 mb-2">
		{feature.title}
	</h3>

	<!-- Feature description - base size, regular weight -->
	<p class="text-base font-normal text-gray-600">
		{feature.description}
	</p>
</div>
