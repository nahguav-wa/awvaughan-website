<script lang="ts">
  import { page } from '$app/stores';
  import { createSeo } from '$lib/seo';
  import Header from '$lib/Header.svelte';
  import Footer from '$lib/Footer.svelte';

  $: seo = createSeo({ url: $page.url, title: $page.data.title, description: $page.data.description });
</script>

<svelte:head>
  <title>{seo.title}</title>
  {#each seo.meta as m}
    <meta name={m.name} content={m.content} />
  {/each}
  {#each seo.links as l}
    <link rel={l.rel} href={l.href} />
  {/each}
</svelte:head>

<Header />
<main class="section-spacing">
  <slot />
</main>
<Footer />