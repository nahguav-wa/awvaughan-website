<script lang="ts">
        import { createSeo, getLinkKey, getMetaKey } from '$lib/seo';

        const seo = createSeo({
                title: 'Careers — AW Vaughan Company',
                description:
                        'Explore career opportunities with AW Vaughan Company. Share your resume to join our Virginia Beach sitework and property maintenance team.',
                path: '/careers'
        });
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

<section class="mx-auto max-w-4xl px-6 py-20">
        <h1 class="text-3xl font-semibold text-[var(--text-dark)] sm:text-4xl">Careers</h1>
        <p class="mt-4 text-base text-[var(--text-muted)] sm:text-lg">
                We are building a team of professionals who care about craftsmanship and customer service. Check back soon for
                open positions or reach out directly if you would like to share your resume.
        </p>
        <div class="mt-8">
                <a
                        class="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-orange)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--text-dark)] shadow-[var(--brand-orange)]/30 shadow-lg transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-blue)]"
                        href="mailto:alex.vaughan@awvaughan.com"
                >
                        Email your resume
                </a>
        </div>
</section>
