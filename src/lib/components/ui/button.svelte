<script lang="ts">
        import { cva, type VariantProps } from 'class-variance-authority';
        import type { HTMLAnchorAttributes, HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';
        import type { Snippet } from 'svelte';

        import { cn } from '$lib/utils/cn';

	const buttonVariants = cva(
		'inline-flex items-center justify-center whitespace-nowrap rounded-full text-xs font-semibold tracking-[0.28em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
		{
			variants: {
				variant: {
                                        default:
                                                'bg-[#ffa500] text-slate-900 shadow-sm hover:bg-[#ffa500]/90',
					destructive:
						'bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))] shadow-sm hover:bg-[hsl(var(--destructive))]/90',
					outline:
						'border border-border bg-transparent text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))] shadow-sm',
					secondary:
						'bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] shadow-sm hover:bg-[hsl(var(--secondary))]/80',
					ghost: 'text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))]/70',
                                        link: 'text-[#ffa500] underline-offset-4 hover:underline'
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

        type ButtonRestProps = HTMLAnchorAttributes & HTMLButtonAttributes & HTMLAttributes<HTMLButtonElement>;

        type ButtonProps = ButtonRestProps & {
                class?: string;
                variant?: VariantProps<typeof buttonVariants>['variant'];
                size?: VariantProps<typeof buttonVariants>['size'];
                type?: 'button' | 'submit' | 'reset';
                href?: string;
                external?: boolean;
                children?: Snippet;
        };

        type $$Events = { click: MouseEvent };

        type $$Props = ButtonProps;
        type $$Slots = { default: Snippet };

        let {
                class: className = '',
                variant = 'default',
                size = 'default',
                type = 'button',
                href,
                external = false,
                children,
                ...restProps
        }: $$Props = $props();

        const classes = $derived(cn(buttonVariants({ variant, size }), className));
</script>

{#if href}
        <a
                {...restProps}
                {href}
                target={external ? '_blank' : restProps.target}
                rel={external ? 'noreferrer' : restProps.rel}
                class={classes}
        >
                {@render children?.()}
        </a>
{:else}
        <button {...restProps} {type} class={classes}>
                {@render children?.()}
        </button>
{/if}
