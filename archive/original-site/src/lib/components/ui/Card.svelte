<!--
	Card Component
	Reusable card container with consistent styling
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Component Props
	 */
	interface Props {
		/** Enable hover effect */
		hoverable?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Child content */
		children: Snippet;
	}

	let { hoverable = true, class: className = '', children }: Props = $props();

	/**
	 * Base card styles
	 */
	const baseStyles = 'bg-white p-8 rounded-lg shadow-md';

	/**
	 * Hover effect styles (conditional)
	 * Uses $derived for reactivity in Svelte 5
	 */
	const hoverStyles = $derived(hoverable ? 'hover:shadow-lg transition-shadow duration-200' : '');

	/**
	 * Computed CSS classes
	 * Uses $derived for reactivity in Svelte 5
	 */
	const computedClasses = $derived(`${baseStyles} ${hoverStyles} ${className}`);
</script>

<!--
	Card container
-->
<div class={computedClasses}>
	{@render children()}
</div>
