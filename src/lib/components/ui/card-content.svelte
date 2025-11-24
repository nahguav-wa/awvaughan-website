<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	type CardContentProps = HTMLAttributes<HTMLDivElement> & {
		class?: string;
		children?: Snippet;
	};

	type $$Props = CardContentProps;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	type $$Slots = { default: Snippet };

	let { class: className = '', children, ...restProps }: $$Props = $props();
	const classes = $derived(cn('p-6 pt-0 text-sm text-[hsl(var(--muted-foreground))]', className));
</script>

<div {...restProps} class={classes}>
	{@render children?.()}
</div>
