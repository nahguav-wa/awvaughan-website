<!--
	Section Component
	Standardized page section wrapper with consistent spacing
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Component Props
	 */
	interface Props {
		/** Background color variant */
		variant?: 'white' | 'gray' | 'blue' | 'dark';
		/** Additional CSS classes */
		class?: string;
		/** Child content */
		children: Snippet;
	}

	let { variant = 'white', class: className = '', children }: Props = $props();

	/**
	 * Variant-specific background styles
	 */
	const variantStyles = {
		white: 'bg-white',
		gray: 'bg-gray-50',
		blue: 'bg-primary-500 text-white',
		dark: 'bg-gray-900 text-white'
	};

	/**
	 * Computed CSS classes
	 * Uses $derived for reactivity in Svelte 5
	 */
	const computedClasses = $derived(`py-20 ${variantStyles[variant]} ${className}`);
</script>

<!--
	Section wrapper with standardized padding
-->
<section class={computedClasses}>
	<div class="container mx-auto px-4">
		{@render children()}
	</div>
</section>
