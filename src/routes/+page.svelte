<script lang="ts">
  import { Hero } from '$lib';
  import { getLinkKey, getMetaKey } from '$lib/seo';

  let { data } = $props();
  const seo = $derived(data.seo);

  const description = ['Reliable site work in 757/252', 'Owner-operated for quality'];
</script>

<svelte:head>
  <title>{seo.title}</title>
  {#each seo.meta as tag (getMetaKey(tag))}
    <meta {...tag} />
  {/each}
  {#each seo.links as link (getLinkKey(link))}
    <link {...link} />
  {/each}
</svelte:head>

<Hero heading="AW Vaughan Company" subheading="Site Construction Specialists" {description} />