<!--
	Header Component
	Combined header with contact bar and main navigation
	Implements scroll-aware behavior for both sections
-->
<script lang="ts">
	import { MapPin, Phone, Mail, Menu } from '@lucide/svelte';
	import { page } from '$app/stores';
	import { createScrollObserver } from '$lib/utils/scroll';
	import { COMPANY_INFO, ROUTES } from '$lib/config/constants';
	import { Button } from '$lib';

	/**
	 * Reactive scroll state
	 */
	let scrollY = $state(0);
	let mobileMenuOpen = $state(false);

	/**
	 * Check if we're on the homepage (which has a hero image)
	 */
	const isHomepage = $derived($page.url.pathname === '/');

	/**
	 * Computed states based on scroll position and route
	 */
	const isTopBarVisible = $derived(scrollY === 0);
	const isScrolled = $derived(scrollY > 10);

	/**
	 * Header should be transparent only on homepage when not scrolled
	 */
	const isTransparent = $derived(isHomepage && !isScrolled);

	/**
	 * Navigation links configuration
	 */
	const navLinks = [
		{ label: 'About', href: ROUTES.about },
		{ label: 'Services', href: ROUTES.services }
	];

	/**
	 * Initialize scroll observer
	 */
	createScrollObserver((y) => {
		scrollY = y;
	});

	/**
	 * Toggle mobile menu
	 */
	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}
</script>

<!--
	Top Contact Bar
	Visible only when at the top of the page, hidden on desktop breakpoint
-->
<header
	class="fixed top-0 right-0 left-0 z-50 hidden bg-dark-gray text-white transition-transform duration-300 md:block"
	class:translate-y-0={isTopBarVisible}
	class:-translate-y-full={!isTopBarVisible}
>
	<div class="container mx-auto px-4">
		<div class="flex items-center justify-center gap-8 py-3 text-sm font-normal">
			<!-- Location -->
			<div class="flex items-center gap-2">
				<MapPin class="h-4 w-4 text-primary-500" aria-hidden="true" />
				<span>{COMPANY_INFO.location}</span>
			</div>

			<!-- Phone -->
			<div class="flex items-center gap-2">
				<Phone class="h-4 w-4 text-primary-500" aria-hidden="true" />
				<a
					href={COMPANY_INFO.phoneHref}
					class="transition-colors hover:text-gray-300"
					aria-label="Call us at {COMPANY_INFO.phone}"
				>
					{COMPANY_INFO.phone}
				</a>
			</div>

			<!-- Email -->
			<div class="flex items-center gap-2">
				<Mail class="h-4 w-4 text-primary-500" aria-hidden="true" />
				<a
					href={COMPANY_INFO.emailHref}
					class="transition-colors hover:text-gray-300"
					aria-label="Email us at {COMPANY_INFO.email}"
				>
					{COMPANY_INFO.email}
				</a>
			</div>
		</div>
	</div>
</header>

<!--
	Main Navigation Header
	Sticky header with logo and navigation menu
	Adjusts position and styling based on scroll state
	- Mobile: Always at top-0 (contact bar is hidden)
	- Desktop: top-12 when contact bar visible, top-0 when scrolled
-->
<header
	class="fixed top-0 right-0 left-0 z-40 transition-all duration-300"
	class:md:top-12={isTopBarVisible}
	class:md:top-0={!isTopBarVisible}
	class:bg-transparent={isTransparent}
	class:bg-white={!isTransparent}
	class:shadow-md={!isTransparent}
>
	<div class="container mx-auto px-4">
		<div class="flex items-center justify-between py-4">
			<!-- Logo - Left Aligned -->
			<a href={ROUTES.home} class="flex items-center" aria-label="The A.W. Vaughan Company Home">
				<img
					src={isTransparent ? '/Horizontal White Logo.svg' : '/Horizontal Color Logo.svg'}
					alt="{COMPANY_INFO.name} Logo"
					class="h-12 w-auto transition-all duration-300"
					class:h-10={!isTransparent}
				/>
			</a>

			<!-- Desktop Navigation - Right Aligned -->
			<nav class="hidden md:block" aria-label="Main navigation">
				<ul class="flex items-center gap-8">
					{#each navLinks as link (link.href)}
						<li>
							<a
								href={link.href}
								class="rounded-sm text-base font-bold transition-colors duration-200 hover:text-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:outline-none"
								class:text-white={isTransparent}
								class:text-gray-800={!isTransparent}
							>
								{link.label}
							</a>
						</li>
					{/each}
					<li>
						<Button variant={isTransparent ? 'outline' : 'primary'} href={ROUTES.contact} size="md">
							Contact Us
						</Button>
					</li>
				</ul>
			</nav>

			<!-- Mobile Menu Button -->
			<button
				class="p-2 md:hidden"
				onclick={toggleMobileMenu}
				aria-label="Toggle navigation menu"
				aria-expanded={mobileMenuOpen}
			>
				<Menu class="h-6 w-6 transition-colors {isTransparent ? 'text-white' : 'text-gray-800'}" />
			</button>
		</div>
	</div>

	<!-- Mobile Navigation Menu -->
	{#if mobileMenuOpen}
		<div class="border-t border-gray-200 bg-white shadow-lg md:hidden">
			<nav aria-label="Mobile navigation">
				<ul class="container mx-auto space-y-4 px-4 py-4">
					{#each navLinks as link (link.href)}
						<li>
							<a
								href={link.href}
								class="block text-base font-bold text-gray-800 transition-colors hover:text-primary-500"
								onclick={toggleMobileMenu}
							>
								{link.label}
							</a>
						</li>
					{/each}
					<li>
						<Button variant="primary" href={ROUTES.contact} size="md" class="w-full">
							Contact Us
						</Button>
					</li>
				</ul>
			</nav>
		</div>
	{/if}
</header>
