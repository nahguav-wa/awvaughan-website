<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	type CardProps = HTMLAttributes<HTMLDivElement> & {
		class?: string;
		children?: Snippet;
	};

	type $$Props = CardProps;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	type $$Slots = { default: Snippet };

	let { class: className = '', children, ...restProps }: $$Props = $props();
	const classes = $derived(
		cn('rounded-3xl border border-border bg-card text-card-foreground shadow-sm', className)
	);
</script>

<div {...restProps} class={classes}>
	{@render children?.()}
</div>
