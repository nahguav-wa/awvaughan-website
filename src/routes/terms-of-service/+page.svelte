<script lang="ts">
        import { createSeo, getLinkKey, getMetaKey } from '$lib/seo';

        const seo = createSeo({
                title: 'Terms of Service — AW Vaughan Company',
                description:
                        'Understand the terms that govern AW Vaughan Company’s website, proposals, and client communication for projects across Hampton Roads.',
                path: '/terms-of-service'
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

<section class="mx-auto max-w-4xl px-6 py-20 space-y-6">
        <h1 class="text-3xl font-semibold text-[var(--text-dark)] sm:text-4xl">Terms of Service</h1>
        <p class="text-base text-[var(--text-muted)] sm:text-lg">
                These terms outline how we operate our website and deliver services. We keep the language simple while we finalize a
                full contract template for clients and vendors.
        </p>
        <div class="space-y-4 text-sm leading-relaxed text-[var(--text-muted)]">
                <p>
                        Using this site or contacting us does not create a formal agreement. We provide proposals, scopes, and contracts on
                        a per-project basis.
                </p>
                <p>
                        If you have questions about these terms, please contact
                        <a class="text-[var(--brand-blue)] underline-offset-4 hover:underline" href="mailto:alex.vaughan@awvaughan.com">
                                alex.vaughan@awvaughan.com
                        </a>.
                </p>
        </div>
</section>
