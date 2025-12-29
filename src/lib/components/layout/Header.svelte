<!--
	Header Component
	Combined header with contact bar and main navigation
	Implements scroll-aware behavior for both sections
-->
<script lang="ts">
	import { MapPin, Phone, Mail, Menu } from '@lucide/svelte';
	import { createScrollObserver } from '$lib/utils/scroll';
	import { COMPANY_INFO, ROUTES } from '$lib/config/constants';

	/**
	 * Reactive scroll state
	 */
	let scrollY = $state(0);
	let mobileMenuOpen = $state(false);

	/**
	 * Computed states based on scroll position
	 */
	const isTopBarVisible = $derived(scrollY === 0);
	const isScrolled = $derived(scrollY > 10);

	/**
	 * Navigation links configuration
	 */
	const navLinks = [
		{ label: 'About', href: ROUTES.about },
		{ label: 'Services', href: ROUTES.services },
		{ label: 'Contact', href: ROUTES.contact }
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
	class="fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white transition-transform duration-300 hidden md:block"
	class:translate-y-0={isTopBarVisible}
	class:-translate-y-full={!isTopBarVisible}
>
	<div class="container mx-auto px-4">
		<div class="flex items-center justify-center gap-8 py-3 text-sm font-normal">
			<!-- Location -->
			<div class="flex items-center gap-2">
				<MapPin class="w-4 h-4" aria-hidden="true" />
				<span>{COMPANY_INFO.location}</span>
			</div>

			<!-- Phone -->
			<div class="flex items-center gap-2">
				<Phone class="w-4 h-4" aria-hidden="true" />
				<a
					href={COMPANY_INFO.phoneHref}
					class="hover:text-gray-300 transition-colors"
					aria-label="Call us at {COMPANY_INFO.phone}"
				>
					{COMPANY_INFO.phone}
				</a>
			</div>

			<!-- Email -->
			<div class="flex items-center gap-2">
				<Mail class="w-4 h-4" aria-hidden="true" />
				<a
					href={COMPANY_INFO.emailHref}
					class="hover:text-gray-300 transition-colors"
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
-->
<header
	class="fixed left-0 right-0 z-40 transition-all duration-300"
	class:top-0={isScrolled}
	class:top-12={!isScrolled}
	class:bg-transparent={!isScrolled}
	class:bg-white={isScrolled}
	class:shadow-md={isScrolled}
>
	<div class="container mx-auto px-4">
		<div class="flex items-center justify-between py-4">
			<!-- Logo - Left Aligned -->
			<a href={ROUTES.home} class="flex items-center" aria-label="The A.W. Vaughan Company Home">
				<img
					src="/logo.svg"
					alt="{COMPANY_INFO.name} Logo"
					class="h-12 w-auto transition-all duration-300"
					class:h-10={isScrolled}
				/>
			</a>

			<!-- Desktop Navigation - Right Aligned -->
			<nav class="hidden md:block" aria-label="Main navigation">
				<ul class="flex items-center gap-8">
					{#each navLinks as link}
						<li>
							<a
								href={link.href}
								class="text-base font-bold transition-colors duration-200 hover:text-blue-600"
								class:text-white={!isScrolled}
								class:text-gray-800={isScrolled}
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</nav>

			<!-- Mobile Menu Button -->
			<button
				class="md:hidden p-2"
				onclick={toggleMobileMenu}
				aria-label="Toggle navigation menu"
				aria-expanded={mobileMenuOpen}
			>
				<Menu
					class="w-6 h-6 transition-colors {isScrolled ? 'text-gray-800' : 'text-white'}"
				/>
			</button>
		</div>
	</div>

	<!-- Mobile Navigation Menu -->
	{#if mobileMenuOpen}
		<div class="md:hidden bg-white border-t border-gray-200 shadow-lg">
			<nav aria-label="Mobile navigation">
				<ul class="container mx-auto px-4 py-4 space-y-4">
					{#each navLinks as link}
						<li>
							<a
								href={link.href}
								class="block text-base font-bold text-gray-800 hover:text-blue-600 transition-colors"
								onclick={toggleMobileMenu}
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</div>
	{/if}
</header>
