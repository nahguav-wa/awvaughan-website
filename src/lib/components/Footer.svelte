<script lang="ts">
	import { resolve } from '$app/paths';
	import { Button, Separator } from '$lib/components/ui';
	import { Facebook, Globe2, Instagram, Youtube } from 'lucide-svelte';
	import logoAsset from '$lib/assets/Asset 3@1x.png';

	const currentYear = new Date().getFullYear();

	const companyLinks = [
		{ href: '/about', label: 'About Us' },
		{ href: '/services', label: 'Services' },
		{ href: '/contact', label: 'Contact' }
	] as const;

	const legalLinks = [
		{ href: '/privacy-policy', label: 'Privacy Policy' },
		{ href: '/terms-of-service', label: 'Terms of Service' }
	] as const;

	const socialLinks = [
		{
			href: 'https://www.instagram.com/awvaughanco',
			label: 'Instagram',
			icon: Instagram
		},
		{
			href: 'https://www.facebook.com/awvaughanco',
			label: 'Facebook',
			icon: Facebook
		},
		{
			href: 'https://nextdoor.com/page/aw-vaughan-company-virginia-beach-va/',
			label: 'Nextdoor',
			icon: Globe2
		},
		{
			href: 'https://www.youtube.com/@AWVaughanCo',
			label: 'YouTube',
			icon: Youtube
		}
	] as const;
</script>

<footer class="border-border/60 border-t bg-background py-12">
	<div class="content-container">
		<div class="grid gap-10 text-sm text-[hsl(var(--muted-foreground))] md:grid-cols-4">
			<div class="space-y-4">
				<img src={logoAsset} alt="A.W. Vaughan Company logo" class="h-14 w-auto" />
				<p class="text-base font-semibold text-[hsl(var(--foreground))]">Jeremiah 29:11</p>
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
					class="text-xs font-semibold tracking-[0.3em] text-[hsl(var(--foreground))] uppercase"
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
					class="text-xs font-semibold tracking-[0.3em] text-[hsl(var(--foreground))] uppercase"
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
			<nav aria-labelledby="footer-social-heading" class="space-y-3">
				<p
					id="footer-social-heading"
					class="text-xs font-semibold tracking-[0.3em] text-[hsl(var(--foreground))] uppercase"
				>
					Social
				</p>
				<ul class="space-y-3">
					<!-- eslint-disable svelte/no-navigation-without-resolve -->
					{#each socialLinks as link (link.href)}
						<li>
							<a
								class="flex items-center gap-3 transition hover:text-[hsl(var(--foreground))]"
								href={link.href}
								rel="noreferrer"
								target="_blank"
							>
								<svelte:component this={link.icon} class="h-4 w-4" />
								<span>{link.label}</span>
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
