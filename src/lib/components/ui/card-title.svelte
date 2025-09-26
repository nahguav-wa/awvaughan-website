<script lang="ts">
	import { cn } from '$lib/utils/cn';

	type CardTitleProps = {
		class?: string;
	};

	let { class: className = '' }: CardTitleProps = $props();
	const restProps = $restProps();
	$: classes = cn(
		'text-xl font-semibold tracking-tight text-[hsl(var(--foreground))]',
		className,
		restProps.class
	);
</script>

<h3 {...restProps} class={classes}>
	<slot />
</h3>
