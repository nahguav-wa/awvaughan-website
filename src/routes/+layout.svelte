<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Footer, Header } from '$lib';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<a class="skip-link" href="#main-content">Skip to main content</a>

<div class="relative flex min-h-screen flex-col bg-[var(--brand-navy-900)] text-slate-100">
	<Header />
	<main id="main-content" tabindex="-1" class="flex-1 focus:outline-none">
		{@render children?.()}
	</main>
	<Footer />
</div>
