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
	eyebrow="Privacy policy"
	heading="How we protect your information"
	description="We respect your privacy and only use the details you share to respond to your inquiry. Review the commitments below while we finalize our formal policy."
	backgroundImage={{
		src: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80',
		srcset:
			'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=640&q=70 640w, https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1024&q=75 1024w, https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80 1600w',
		sizes: '(min-width: 1024px) 100vw, 100vw',
		alt: 'Business owner reviewing paperwork at a desk with a cup of coffee.'
	}}
/>

<section class="mx-auto max-w-4xl space-y-6 px-6 py-16">
	<h2 class="reveal text-2xl font-semibold text-[var(--text-dark)] sm:text-3xl" use:inView>
		Our current commitments
	</h2>
	<div class="space-y-4 text-sm leading-relaxed text-[var(--text-muted)]">
		<p>
			We only use the details you provide through our contact form or direct emails to respond to
			your inquiry. We do not sell or share this information.
		</p>
		<p>
			If you would like us to remove your information from our records, please email
			<a
				class="text-[var(--brand-blue)] underline-offset-4 hover:underline"
				href="mailto:alex.vaughan@awvaughan.com"
			>
				alex.vaughan@awvaughan.com
			</a>.
		</p>
	</div>
</section>
