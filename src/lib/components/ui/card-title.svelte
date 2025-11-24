<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	type CardTitleProps = HTMLAttributes<HTMLHeadingElement> & {
		class?: string;
		children?: Snippet;
	};

	type $$Props = CardTitleProps;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	type $$Slots = { default: Snippet };

	let { class: className = '', children, ...restProps }: $$Props = $props();
	const classes = $derived(
		cn('text-xl font-semibold tracking-tight text-[hsl(var(--foreground))]', className)
	);
</script>

<h3 {...restProps} class={classes}>
	{@render children?.()}
</h3>
