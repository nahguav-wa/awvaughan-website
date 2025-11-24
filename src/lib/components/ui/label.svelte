<script lang="ts">
        import { cn } from '$lib/utils/cn';
        import type { HTMLLabelAttributes } from 'svelte/elements';
        import type { Snippet } from 'svelte';

        type LabelProps = HTMLLabelAttributes & {
                class?: string;
                children?: Snippet;
        };

        type $$Props = LabelProps;

        let { class: className = '', children, ...restProps }: $$Props = $props();
        const classes = $derived(
                cn(
                        'text-xs font-semibold uppercase tracking-[0.3em] text-[hsl(var(--muted-foreground))] peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                        className
                )
        );
</script>

<label {...restProps} class={classes}>
        {@render children?.()}
</label>
