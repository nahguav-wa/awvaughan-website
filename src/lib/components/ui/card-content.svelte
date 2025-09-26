<script lang="ts">
	import { cn } from '$lib/utils/cn';

	type CardContentProps = {
		class?: string;
	};

	let { class: className = '' }: CardContentProps = $props();
	const restProps = $restProps();
	$: classes = cn(
		'p-6 pt-0 text-sm text-[hsl(var(--muted-foreground))]',
		className,
		restProps.class
	);
</script>

<div {...restProps} class={classes}>
	<slot />
</div>
