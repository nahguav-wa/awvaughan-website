<!--
	Header Component
	Minimal sticky site header: name on the left, primary nav on the right.
-->
<script lang="ts">
	import { page } from '$app/stores';
	import { SITE, NAV_LINKS } from '$lib/config/site';

	let mobileMenuOpen = $state(false);

	/** Highlight the active section (treat /writing/* as Writing) */
	function isActive(href: string): boolean {
		const path = $page.url.pathname;
		if (href === '/') return path === '/';
		return path === href || path.startsWith(`${href}/`);
	}
</script>

<header
	class="sticky top-0 z-40 border-b border-stone-200 bg-white/90 backdrop-blur dark:border-stone-800 dark:bg-stone-900/90"
>
	<div class="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
		<a
			href="/"
			class="text-base font-bold tracking-tight text-stone-900 hover:text-primary-600 dark:text-white"
		>
			{SITE.name}
		</a>

		<!-- Desktop navigation -->
		<nav class="hidden gap-6 sm:flex" aria-label="Main navigation">
			{#each NAV_LINKS as link (link.href)}
				<a
					href={link.href}
					class="text-sm font-normal transition-colors hover:text-primary-600"
					class:text-primary-600={isActive(link.href)}
					class:text-stone-600={!isActive(link.href)}
					class:dark:text-stone-300={!isActive(link.href)}
					aria-current={isActive(link.href) ? 'page' : undefined}
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<!-- Mobile menu button -->
		<button
			class="text-stone-700 sm:hidden dark:text-stone-200"
			onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
			aria-label="Toggle navigation menu"
			aria-expanded={mobileMenuOpen}
		>
			{mobileMenuOpen ? 'Close' : 'Menu'}
		</button>
	</div>

	<!-- Mobile navigation -->
	{#if mobileMenuOpen}
		<nav
			class="border-t border-stone-200 sm:hidden dark:border-stone-800"
			aria-label="Mobile navigation"
		>
			<ul class="mx-auto max-w-3xl space-y-1 px-4 py-3">
				{#each NAV_LINKS as link (link.href)}
					<li>
						<a
							href={link.href}
							class="block py-1 text-base font-normal text-stone-700 hover:text-primary-600 dark:text-stone-200"
							onclick={() => (mobileMenuOpen = false)}
						>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	{/if}
</header>
