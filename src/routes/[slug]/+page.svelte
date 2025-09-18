<script lang="ts">
        import { getLinkKey, getMetaKey } from '$lib/seo';

        let { data } = $props();
        const entry = $derived(data.entry);
        const seo = $derived(data.seo);

        const sectionLabel = $derived(entry.type === 'project' ? 'Project spotlight' : 'Insights');
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

<article class="mx-auto max-w-3xl space-y-8 px-6 py-20">
        <div class="space-y-3">
                <p class="text-xs font-semibold tracking-[0.35em] text-[var(--brand-blue)] uppercase">{sectionLabel}</p>
                <h1 class="text-3xl font-semibold text-[var(--text-dark)] sm:text-4xl">{entry.title}</h1>
                <p class="text-base text-[var(--text-muted)] sm:text-lg">{entry.summary}</p>
        </div>

        <div class="space-y-5 text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
                {#each entry.body as paragraph, index (entry.slug + '-' + index)}
                        <p>{paragraph}</p>
                {/each}
        </div>
</article>
