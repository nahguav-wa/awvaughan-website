<script lang="ts">
        import { seoHead } from '$lib/seo';

        let { data } = $props();
        const head = $derived(seoHead(data?.seo));
</script>

{@render head()}

<section class="mx-auto max-w-4xl px-6 py-20 space-y-6">
        <h1 class="text-3xl font-semibold text-[var(--text-dark)] sm:text-4xl">Privacy Policy</h1>
        <p class="text-base text-[var(--text-muted)] sm:text-lg">
                We respect your privacy. This placeholder policy outlines how we handle the limited information collected through our
                website. We update this document as we formalize our processes.
        </p>
        <div class="space-y-4 text-sm leading-relaxed text-[var(--text-muted)]">
                <p>
                        We only use the details you provide through our contact form or direct emails to respond to your inquiry. We do not sell or
                        share this information.
                </p>
                <p>
                        If you would like us to remove your information from our records, please email
                        <a class="text-[var(--brand-blue)] underline-offset-4 hover:underline" href="mailto:alex.vaughan@awvaughan.com">
                                alex.vaughan@awvaughan.com
                        </a>.
                </p>
        </div>
</section>
