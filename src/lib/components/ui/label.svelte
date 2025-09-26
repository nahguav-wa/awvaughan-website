<script lang="ts">
	import { cn } from '$lib/utils/cn';

	type LabelProps = {
		class?: string;
	};

	let { class: className = '' }: LabelProps = $props();
	const restProps = $restProps();
	$: classes = cn(
		'text-xs font-semibold uppercase tracking-[0.3em] text-[hsl(var(--muted-foreground))] peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
		className,
		restProps.class
	);
</script>

<label {...restProps} class={classes}>
	<slot />
</label>
