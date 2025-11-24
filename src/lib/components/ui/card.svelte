<script lang="ts">
	import { cn } from '$lib/utils/cn';

        type CardProps = {
                class?: string;
        };

        let { class: className = '' }: CardProps = $props();
        const restProps = $restProps();
        const classes = $derived(
                cn('rounded-3xl border border-border bg-card text-card-foreground shadow-sm', className, restProps.class)
        );
</script>

<div {...restProps} class={classes}>
        <slot />
</div>
