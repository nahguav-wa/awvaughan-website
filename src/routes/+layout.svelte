<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Footer, Header } from '$lib';

	let { children } = $props();
	const emergencyPhone = '+17574021100';
	const emergencyLabel = 'Call (757) 402-1100';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<a class="skip-link" href="#main-content">Skip to main content</a>

<div class="relative flex min-h-screen flex-col bg-[var(--surface-muted)] text-[var(--text-dark)]">
	<Header />
	<main id="main-content" tabindex="-1" class="flex-1 pt-28 focus:outline-none lg:pt-32">
		{@render children?.()}
	</main>
	<Footer />

	<a
		class="fixed right-5 bottom-5 z-40 inline-flex items-center gap-2 rounded-full bg-[var(--brand-orange)] px-5 py-3 text-sm font-semibold text-[var(--text-dark)] shadow-xl shadow-slate-400/40 transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-blue)] sm:hidden"
		href={`tel:${emergencyPhone}`}
	>
		<span aria-hidden="true" class="inline-flex h-2 w-2 rounded-full bg-[var(--text-dark)]"></span>
		{emergencyLabel}
	</a>
</div>
