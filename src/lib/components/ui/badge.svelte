<script lang="ts">
	import { cva, type VariantProps } from 'class-variance-authority';
	import { cn } from '$lib/utils/cn';

	const badgeVariants = cva(
		'inline-flex items-center rounded-full border px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
		{
			variants: {
				variant: {
					default: 'border-transparent bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]',
					secondary:
						'border-transparent bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]',
					outline: 'border-border text-[hsl(var(--foreground))] bg-[hsl(var(--background))]',
					accent:
						'border-transparent bg-[hsl(var(--accent))]/15 text-[hsl(var(--accent))] shadow-sm'
				}
			},
			defaultVariants: {
				variant: 'default'
			}
		}
	);

	type BadgeProps = {
		class?: string;
		variant?: VariantProps<typeof badgeVariants>['variant'];
	};

        let { class: className = '', variant = 'default' }: BadgeProps = $props();
        const restProps = $restProps();
        const classes = $derived(cn(badgeVariants({ variant }), className, restProps.class));
</script>

<span {...restProps} class={classes}>
        <slot />
</span>
