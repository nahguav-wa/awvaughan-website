<script lang="ts">
        import { seoHead } from '$lib/seo';

        let { data } = $props();

        const entry = $derived(data.entry);
        const head = $derived(seoHead(data?.seo));
        const formattedPublished = $derived(
                new Date(`${entry.published}T00:00:00Z`).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                })
        );
        const sectionLabel = $derived(entry.type === 'project' ? 'Project profile' : 'Insights');
</script>

{@render head()}

<section class="border-b border-[var(--border-soft)] bg-[var(--surface-muted)] py-20">
        <div class="mx-auto max-w-5xl space-y-6 px-6">
                <p class="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--brand-blue)]">{sectionLabel}</p>
                <h1 class="text-4xl font-semibold text-[var(--text-dark)] sm:text-5xl">{entry.title}</h1>
                <p class="text-base text-[var(--text-muted)] sm:text-lg">{entry.summary}</p>
                <p class="text-xs uppercase tracking-[0.25em] text-[var(--text-muted)]">
                        Published {formattedPublished}
                </p>
        </div>
</section>

{#if entry.image}
        <section class="border-b border-[var(--border-soft)] bg-[var(--surface-base)]">
                <div class="mx-auto max-w-6xl px-6 py-12">
                        <figure class="overflow-hidden rounded-3xl border border-[var(--border-soft)] shadow-sm">
                                <img
                                        class="h-full w-full object-cover"
                                        src={entry.image.src}
                                        alt={entry.image.alt ?? ''}
                                        width={entry.image.width}
                                        height={entry.image.height}
                                        loading="lazy"
                                />
                        </figure>
                </div>
        </section>
{/if}

<section class="bg-[var(--surface-base)] py-16">
        <div class="mx-auto max-w-5xl space-y-6 px-6">
                {#each entry.body as paragraph, index}
                        <p class={`text-base leading-relaxed text-[var(--text-muted)] ${index === 0 ? 'mt-0 text-lg text-[var(--text-dark)]' : ''}`}>
                                {paragraph}
                        </p>
                {/each}
        </div>
</section>
