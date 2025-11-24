<script lang="ts">
        import { getLinkKey, getMetaKey } from '$lib/seo';
        import { Hero } from '$lib';

        let { data } = $props();
        const seo = $derived(data.seo);
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

<Hero />
