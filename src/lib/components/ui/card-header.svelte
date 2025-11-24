<script lang="ts">
        import { cn } from '$lib/utils/cn';
        import type { HTMLAttributes } from 'svelte/elements';
        import type { Snippet } from 'svelte';

        type CardHeaderProps = HTMLAttributes<HTMLDivElement> & {
                class?: string;
                children?: Snippet;
        };

        type $$Props = CardHeaderProps;
        type $$Slots = { default: Snippet };

        let { class: className = '', children, ...restProps }: $$Props = $props();
        const classes = $derived(cn('flex flex-col gap-3 p-6', className));
</script>

<div {...restProps} class={classes}>
        {@render children?.()}
</div>
