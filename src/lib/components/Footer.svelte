<script lang="ts">
	import { resolve } from '$app/paths';
	import { Badge, Button, Separator } from '$lib/components/ui';

        const currentYear = new Date().getFullYear();

        const companyLinks = [
                { href: '/about', label: 'About Us' },
                { href: '/services', label: 'Services' },
                { href: '/contact', label: 'Contact' },
                { href: '/careers', label: 'Careers' }
        ] as const;

	const legalLinks = [
		{ href: '/privacy-policy', label: 'Privacy Policy' },
		{ href: '/terms-of-service', label: 'Terms of Service' }
	] as const;
</script>

<footer class="border-t border-border/60 bg-background py-12">
	<div class="mx-auto max-w-6xl px-6">
		<div class="grid gap-10 text-sm text-[hsl(var(--muted-foreground))] md:grid-cols-3">
			<div class="space-y-4">
				<Badge variant="secondary" class="w-fit normal-case tracking-[0.2em]">
					A.W. Vaughan Company, LLC
				</Badge>
				<p class="text-base font-semibold text-[hsl(var(--foreground))]">
					Neighbor-first tractor work for Hampton Roads and Northeast North Carolina.
				</p>
				<Button
					href={resolve('/contact')}
					variant="default"
					size="sm"
					class="mt-2 w-fit rounded-full"
				>
					Plan a project
				</Button>
			</div>
			<nav aria-labelledby="footer-company-heading" class="space-y-3">
				<p
					id="footer-company-heading"
					class="text-xs font-semibold uppercase tracking-[0.3em] text-[hsl(var(--foreground))]"
				>
					Company
				</p>
				<ul class="space-y-3">
					<!-- eslint-disable svelte/no-navigation-without-resolve -->
					{#each companyLinks as link (link.href)}
						<li>
							<a class="transition hover:text-[hsl(var(--foreground))]" href={resolve(link.href)}>
								{link.label}
							</a>
						</li>
					{/each}
					<!-- eslint-enable svelte/no-navigation-without-resolve -->
				</ul>
			</nav>
			<nav aria-labelledby="footer-legal-heading" class="space-y-3">
				<p
					id="footer-legal-heading"
					class="text-xs font-semibold uppercase tracking-[0.3em] text-[hsl(var(--foreground))]"
				>
					Legal
				</p>
				<ul class="space-y-3">
					<!-- eslint-disable svelte/no-navigation-without-resolve -->
					{#each legalLinks as link (link.href)}
						<li>
							<a class="transition hover:text-[hsl(var(--foreground))]" href={resolve(link.href)}>
								{link.label}
							</a>
						</li>
					{/each}
					<!-- eslint-enable svelte/no-navigation-without-resolve -->
				</ul>
			</nav>
		</div>

		<Separator class="mt-12" />

		<p class="pt-6 text-center text-xs text-[hsl(var(--muted-foreground))]">
			&copy; {currentYear} A.W. Vaughan Company, LLC. All rights reserved.
		</p>
	</div>
</footer>
