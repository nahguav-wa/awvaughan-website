<script lang="ts">
	import { PageHero } from '$lib';
	import { inView } from '$lib/actions/in-view';
	import { getLinkKey, getMetaKey } from '$lib/seo';

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

<PageHero
        eyebrow="Careers"
        heading="Join a crew that leads with service"
        description="Share your resume to be considered for upcoming roles supporting sitework and property maintenance projects across Hampton Roads."
/>

<section class="mx-auto max-w-4xl px-6 py-16">
	<h2 class="reveal text-2xl font-semibold text-[var(--text-dark)] sm:text-3xl" use:inView>
		Grow with AW Vaughan Company
	</h2>
	<p class="mt-4 text-base text-[var(--text-muted)] sm:text-lg">
		We are building a team of professionals who care about craftsmanship and customer service. Check
		back soon for open positions or reach out directly if you would like to share your resume.
	</p>
	<div class="mt-8">
		<a
			class="shadow-[var(--brand-orange)]/30 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-orange)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--text-dark)] shadow-lg transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-blue)]"
			href="mailto:alex.vaughan@awvaughan.com"
		>
			Email your resume
		</a>
	</div>
</section>
