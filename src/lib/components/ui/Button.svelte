<!--
	Button Component
	Reusable button/link component with consistent styling
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Component Props
	 */
	interface Props {
		/** Button style variant */
		variant?: 'primary' | 'secondary' | 'outline';
		/** Button size */
		size?: 'sm' | 'md' | 'lg';
		/** If provided, renders as an anchor tag */
		href?: string;
		/** Button HTML type (only applies when href is not provided) */
		type?: 'button' | 'submit' | 'reset';
		/** Additional CSS classes */
		class?: string;
		/** Child content */
		children: Snippet;
	}

	let {
		variant = 'primary',
		size = 'md',
		href,
		type = 'button',
		class: className = '',
		children
	}: Props = $props();

	/**
	 * Base button styles (shared across all variants)
	 * Uses bold weight from typography system
	 */
	const baseStyles = 'font-bold rounded-lg transition-all duration-200 inline-block text-center';

	/**
	 * Size-specific styles
	 */
	const sizeStyles = {
		sm: 'px-4 py-2 text-sm',
		md: 'px-8 py-3 text-base',
		lg: 'px-10 py-4 text-lg'
	};

	/**
	 * Variant-specific styles
	 */
	const variantStyles = {
		primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl',
		secondary: 'bg-gray-600 hover:bg-gray-700 text-white shadow-lg hover:shadow-xl',
		outline:
			'bg-transparent hover:bg-white hover:text-gray-900 text-white border-2 border-white transition-all'
	};

	/**
	 * Computed CSS classes
	 * Uses $derived for reactivity in Svelte 5
	 */
	const computedClasses = $derived(`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`);
</script>

<!-- Render as anchor tag if href is provided, otherwise as button -->
{#if href}
	<a {href} class={computedClasses}>
		{@render children()}
	</a>
{:else}
	<button {type} class={computedClasses}>
		{@render children()}
	</button>
{/if}
