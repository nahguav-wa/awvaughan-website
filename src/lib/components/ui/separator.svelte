<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { HTMLAttributes } from 'svelte/elements';

	type SeparatorProps = HTMLAttributes<HTMLDivElement> & {
		class?: string;
		orientation?: 'horizontal' | 'vertical';
		decorative?: boolean;
	};

	type $$Props = SeparatorProps;

	let {
		class: className = '',
		orientation = 'horizontal',
		decorative = true,
		...restProps
	}: $$Props = $props();
	const ariaRole = $derived(decorative ? 'presentation' : 'separator');
	const classes = $derived(
		cn(
			'shrink-0 bg-border',
			orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
			className
		)
	);
</script>

<div {...restProps} role={ariaRole} aria-orientation={orientation} class={classes}></div>
