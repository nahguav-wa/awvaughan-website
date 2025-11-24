<script lang="ts">
	import { cn } from '$lib/utils/cn';

        type TextareaProps = {
                class?: string;
        };

        let { class: className = '' }: TextareaProps = $props();
        const restProps = $restProps();
        const classes = $derived(
                cn(
                        'flex min-h-[9rem] w-full rounded-3xl border border-border bg-background px-4 py-3 text-sm text-[hsl(var(--foreground))] shadow-sm transition-colors placeholder:text-[hsl(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
                        className,
                        restProps.class
                )
        );
</script>

<textarea {...restProps} class={classes}></textarea>
