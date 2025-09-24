<script lang="ts">
	import { resolve } from '$app/paths';
	import { PageHero } from '$lib';
	import { inView } from '$lib/actions/in-view';
	import { featuredProjects } from '$lib/data/projects';
	import { getLinkKey, getMetaKey } from '$lib/seo';

	let { data } = $props();
	const seo = $derived(data.seo);

	const contactHref = resolve('/contact');

	const approach = [
		{
			title: 'Walk the site together',
			description:
				'I listen to your goals, walk through access points, and note drainage or grading challenges before recommending a plan.'
		},
		{
			title: 'Outline the work clearly',
			description:
				'You get a straightforward scope, timeline, and pricing so you know exactly what will happen once the tractor unloads.'
		},
		{
			title: 'Deliver tidy results',
			description:
				'I complete the passes we discussed, tidy edges, and check the finished work with you before heading out.'
		}
	] as const;

	const assurances = [
		'Owner-operated equipment on every project',
		'Scheduling that works around weather and access needs',
		'Detailed updates before, during, and after the work'
	] as const;
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
	eyebrow="Projects"
	align="center"
	heading="Property improvements finished the right way"
	description="Here is a sampling of recent mowing, cleanup, and driveway work completed for acreage properties across Hampton Roads and northeast North Carolina."
	backgroundImage={{
		src: 'https://images.unsplash.com/photo-1577200734414-95210391b6a5?auto=format&fit=crop&w=1600&q=80',
		srcset:
			'https://images.unsplash.com/photo-1577200734414-95210391b6a5?auto=format&fit=crop&w=640&q=70 640w, https://images.unsplash.com/photo-1577200734414-95210391b6a5?auto=format&fit=crop&w=1024&q=75 1024w, https://images.unsplash.com/photo-1577200734414-95210391b6a5?auto=format&fit=crop&w=1600&q=80 1600w',
		sizes: '(min-width: 1024px) 100vw, 100vw',
		alt: 'Compact tractor finishing a pass across a large open field at sunset.'
	}}
/>

<section id="projects" class="border-b border-[var(--border-soft)] bg-[var(--surface-base)] py-20">
	<div class="mx-auto max-w-6xl px-6">
		<div class="mx-auto max-w-3xl text-center">
			<p class="text-xs font-semibold tracking-[0.35em] text-[var(--brand-blue)] uppercase">
				Recent highlights
			</p>
			<h2 class="reveal mt-4 text-3xl font-semibold text-[var(--text-dark)] sm:text-4xl" use:inView>
				Acreage projects finished with care
			</h2>
			<p class="mt-4 text-base text-[var(--text-muted)] sm:text-lg">
				Every project starts with listening and ends with a tidy site. These spotlights show the
				type of mowing, cleanup, and driveway work landowners trust me to handle.
			</p>
		</div>

		<div class="mt-14 grid gap-8 md:grid-cols-3">
			{#each featuredProjects as project (project.title)}
				<article
					class="group flex h-full flex-col overflow-hidden rounded-4xl border border-[var(--border-soft)] bg-[var(--surface-soft)] shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
				>
					<div class="relative h-52 overflow-hidden">
						<img
							src={project.image}
							alt={project.alt}
							class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
						/>
						<div
							class="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40"
						></div>
					</div>
					<div class="flex flex-1 flex-col gap-4 p-6 text-left">
						<span
							class="text-xs font-semibold tracking-[0.3em] text-[var(--brand-orange)] uppercase"
						>
							{project.sector}
						</span>
						<h3 class="reveal text-xl font-semibold text-[var(--text-dark)]" use:inView>
							{project.title}
						</h3>
						<p class="text-sm leading-relaxed text-[var(--text-muted)]">{project.summary}</p>
						<a
							class="mt-auto inline-flex items-center gap-2 text-xs font-semibold tracking-[0.28em] text-[var(--brand-blue)] uppercase transition hover:text-[var(--brand-orange)]"
							href={contactHref}
						>
							Start a similar project
						</a>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<section class="border-b border-[var(--border-soft)] bg-[var(--surface-muted)] py-20">
	<div class="mx-auto max-w-6xl px-6">
		<div class="flex flex-col gap-12 lg:flex-row lg:items-center">
			<div class="flex-1 space-y-4">
				<p class="text-xs font-semibold tracking-[0.35em] text-[var(--brand-blue)] uppercase">
					How we handle each job
				</p>
				<h2 class="reveal text-3xl font-semibold text-[var(--text-dark)] sm:text-4xl" use:inView>
					A proven process for tidy results
				</h2>
				<p class="text-base text-[var(--text-muted)] sm:text-lg">
					Clear communication, right-sized equipment, and careful passes keep projects on schedule.
					Here is what to expect when we plan work together.
				</p>
			</div>
			<div class="flex-1 space-y-6">
				{#each approach as step (step.title)}
					<article
						class="rounded-3xl border border-[var(--border-soft)] bg-[var(--surface-base)] p-6 shadow-sm"
					>
						<h3 class="reveal text-lg font-semibold text-[var(--text-dark)]" use:inView>
							{step.title}
						</h3>
						<p class="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{step.description}</p>
					</article>
				{/each}
			</div>
		</div>
	</div>
</section>

<section class="bg-[var(--surface-base)] py-20">
	<div
		class="mx-auto max-w-5xl rounded-4xl border border-[var(--border-soft)] bg-gradient-to-br from-[var(--surface-base)] via-[var(--surface-soft)] to-[var(--surface-muted)] px-6 py-16 text-center shadow-md"
	>
		<h2 class="reveal text-3xl font-semibold text-[var(--text-dark)] sm:text-4xl" use:inView>
			Ready to talk about your property?
		</h2>
		<p class="mt-4 text-base text-[var(--text-muted)] sm:text-lg">
			Tell me what you are facing—overgrowth, brush piles, drainage issues, or driveway ruts. I will
			share recommendations and schedule the passes needed to get you back on track.
		</p>
		<ul
			class="mt-8 flex flex-col gap-3 text-sm text-[var(--text-muted)] sm:flex-row sm:justify-center"
		>
			{#each assurances as item (item)}
				<li
					class="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/70 px-4 py-2"
				>
					<span
						aria-hidden="true"
						class="inline-flex h-1.5 w-1.5 rounded-full bg-[var(--brand-orange)]"
					></span>
					{item}
				</li>
			{/each}
		</ul>
		<div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
			<a
				href={contactHref}
				class="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-orange)] px-8 py-3 text-sm font-semibold tracking-[0.28em] text-[var(--text-dark)] uppercase shadow-[var(--brand-orange)]/30 shadow-lg transition hover:-translate-y-0.5"
			>
				Plan a project
			</a>
			<a
				href="tel:+17574021100"
				class="inline-flex items-center gap-3 rounded-full border border-[var(--border-soft)] bg-white/70 px-6 py-3 text-sm font-semibold tracking-[0.28em] text-[var(--brand-blue)] uppercase transition hover:border-[var(--brand-blue)] hover:text-[var(--brand-orange)]"
			>
				Call (757) 402-1100
			</a>
		</div>
	</div>
</section>
