<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Footer, Header } from '$lib';
	import { page } from '$app/stores';

	let { children } = $props();
	const emergencyPhone = '+17574021100';
	const emergencyLabel = 'Call (757) 402-1100';
	const isHome = $derived($page.url.pathname === '/');
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<a class="skip-link" href="#main-content">Skip to main content</a>

<div class="relative flex min-h-screen flex-col bg-[var(--surface-muted)] text-[var(--text-dark)]">
	<Header />
	<main
		id="main-content"
		tabindex="-1"
		class={`flex-1 focus:outline-none ${isHome ? '' : 'pt-32 lg:pt-36'}`}
	>
		{@render children?.()}
	</main>
	<Footer />

	<a
		class="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[var(--brand-orange)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-dark)] shadow-xl shadow-slate-400/40 transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-blue)] sm:hidden"
		href={`tel:${emergencyPhone}`}
	>
		<span aria-hidden="true" class="inline-flex h-2 w-2 rounded-full bg-[var(--text-dark)]"></span>
		{emergencyLabel}
	</a>
</div>
