<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement> & {
		class?: string;
		children?: Snippet;
	};

	type $$Props = CardDescriptionProps;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	type $$Slots = { default: Snippet };

	let { class: className = '', children, ...restProps }: $$Props = $props();
	const classes = $derived(
		cn('text-sm leading-relaxed text-[hsl(var(--muted-foreground))]', className)
	);
</script>

<p {...restProps} class={classes}>
	{@render children?.()}
</p>
