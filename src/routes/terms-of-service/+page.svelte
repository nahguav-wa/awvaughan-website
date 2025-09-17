<script lang="ts">
        import { PageHero } from '$lib';
        import { inView } from '$lib/actions/in-view';
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

<PageHero
	eyebrow="Terms of service"
	heading="How we work with clients and partners"
	description="These guidelines outline how AW Vaughan Company communicates, scopes projects, and serves clients across Hampton Roads."
	backgroundImage={{
		src: 'https://images.unsplash.com/photo-1528747045269-390fe33c19d4?auto=format&fit=crop&w=1600&q=80',
		srcset:
			'https://images.unsplash.com/photo-1528747045269-390fe33c19d4?auto=format&fit=crop&w=640&q=70 640w, https://images.unsplash.com/photo-1528747045269-390fe33c19d4?auto=format&fit=crop&w=1024&q=75 1024w, https://images.unsplash.com/photo-1528747045269-390fe33c19d4?auto=format&fit=crop&w=1600&q=80 1600w',
		sizes: '(min-width: 1024px) 100vw, 100vw',
		alt: 'Paperwork and pen laid out for a contracting agreement.'
	}}
/>

<section class="mx-auto max-w-4xl space-y-6 px-6 py-16">
        <h2 class="text-2xl font-semibold text-[var(--text-dark)] sm:text-3xl reveal" use:inView>
                What these terms cover
        </h2>
	<div class="space-y-4 text-sm leading-relaxed text-[var(--text-muted)]">
		<p>
			Using this site or contacting us does not create a formal agreement. We provide proposals,
			scopes, and contracts on a per-project basis.
		</p>
		<p>
			If you have questions about these terms, please contact
			<a
				class="text-[var(--brand-blue)] underline-offset-4 hover:underline"
				href="mailto:alex.vaughan@awvaughan.com"
			>
				alex.vaughan@awvaughan.com
			</a>.
		</p>
	</div>
</section>
