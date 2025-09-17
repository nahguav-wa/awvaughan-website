<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Footer, Header } from '$lib';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex min-h-screen flex-col bg-slate-950 text-slate-100">
	<Header />
	<main class="flex-1">{@render children?.()}</main>
	<Footer />
</div>
