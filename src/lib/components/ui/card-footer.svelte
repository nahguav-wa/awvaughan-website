<script lang="ts">
	import { cn } from '$lib/utils/cn';

        type CardFooterProps = {
                class?: string;
        };

        let { class: className = '' }: CardFooterProps = $props();
        const restProps = $restProps();
        const classes = $derived(cn('flex items-center gap-3 p-6 pt-0', className, restProps.class));
</script>

<div {...restProps} class={classes}>
        <slot />
</div>
