<script lang="ts">
	import { cn } from '$lib/utils/cn';

	type SeparatorProps = {
		class?: string;
		orientation?: 'horizontal' | 'vertical';
		decorative?: boolean;
	};

	let {
		class: className = '',
		orientation = 'horizontal',
		decorative = true
	}: SeparatorProps = $props();
	const restProps = $restProps();
	const ariaRole = $derived(decorative ? 'presentation' : 'separator');
	$: classes = cn(
		'shrink-0 bg-border',
		orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
		className,
		restProps.class
	);
</script>

<div {...restProps} role={ariaRole} aria-orientation={orientation} class={classes} />
