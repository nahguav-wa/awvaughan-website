<script lang="ts">
	import { cn } from '$lib/utils/cn';

	type InputProps = {
		class?: string;
	};

	let { class: className = '' }: InputProps = $props();
	const restProps = $restProps();
	$: classes = cn(
		'flex h-11 w-full rounded-full border border-border bg-background px-4 text-sm text-[hsl(var(--foreground))] shadow-sm transition-colors placeholder:text-[hsl(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
		className,
		restProps.class
	);
</script>

<input {...restProps} class={classes} />
