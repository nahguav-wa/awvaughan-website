<script lang="ts">
	import { cn } from '$lib/utils/cn';

	type CardDescriptionProps = {
		class?: string;
	};

	let { class: className = '' }: CardDescriptionProps = $props();
	const restProps = $restProps();
	$: classes = cn(
		'text-sm leading-relaxed text-[hsl(var(--muted-foreground))]',
		className,
		restProps.class
	);
</script>

<p {...restProps} class={classes}>
	<slot />
</p>
