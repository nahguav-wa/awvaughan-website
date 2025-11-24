<script lang="ts">
	import { cva, type VariantProps } from 'class-variance-authority';
	import { cn } from '$lib/utils/cn';

	const buttonVariants = cva(
		'inline-flex items-center justify-center whitespace-nowrap rounded-full text-xs font-semibold tracking-[0.28em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
		{
			variants: {
				variant: {
					default:
						'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-sm hover:bg-[hsl(var(--primary))]/90',
					destructive:
						'bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))] shadow-sm hover:bg-[hsl(var(--destructive))]/90',
					outline:
						'border border-border bg-transparent text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))] shadow-sm',
					secondary:
						'bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] shadow-sm hover:bg-[hsl(var(--secondary))]/80',
					ghost: 'text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))]/70',
					link: 'text-[hsl(var(--primary))] underline-offset-4 hover:underline'
				},
				size: {
					default: 'h-11 px-6',
					sm: 'h-9 px-4 text-[0.65rem]',
					lg: 'h-12 px-8 text-sm',
					icon: 'h-10 w-10'
				}
			},
			defaultVariants: {
				variant: 'default',
				size: 'default'
			}
		}
	);

	type ButtonProps = {
		class?: string;
		variant?: VariantProps<typeof buttonVariants>['variant'];
		size?: VariantProps<typeof buttonVariants>['size'];
		type?: 'button' | 'submit' | 'reset';
		href?: string;
		external?: boolean;
	};

        let {
                class: className = '',
                variant = 'default',
                size = 'default',
                type = 'button',
                href,
                external = false
        }: ButtonProps = $props();

        const restProps = $restProps();
        const classes = $derived(cn(buttonVariants({ variant, size }), className, restProps.class));
</script>

{#if href}
        <a
                {...restProps}
                {href}
                target={external ? '_blank' : restProps.target}
                rel={external ? 'noreferrer' : restProps.rel}
                class={classes}
        >
                <slot />
        </a>
{:else}
        <button {...restProps} {type} class={classes}>
                <slot />
        </button>
{/if}
