<script lang="ts">
        import { cn } from '$lib/utils/cn';
        import type { HTMLAttributes } from 'svelte/elements';
        import type { Snippet } from 'svelte';

        type CardFooterProps = HTMLAttributes<HTMLDivElement> & {
                class?: string;
                children?: Snippet;
        };

        type $$Props = CardFooterProps;
        type $$Slots = { default: Snippet };

        let { class: className = '', children, ...restProps }: $$Props = $props();
        const classes = $derived(cn('flex items-center gap-3 p-6 pt-0', className));
</script>

<div {...restProps} class={classes}>
        {@render children?.()}
</div>
