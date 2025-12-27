<!-- Import shit here -->
<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Header1, Header2, Footer } from '$lib';

	let { children, data } = $props();
</script>

<!-- Set the favicon in the tab -->
<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<!-- Stupid double header thingy here -->
<Header1 />
<Header2 />

<!-- This inserts +page.svelte -->
{@render children()}

<!-- This is the footer -->
<Footer />
