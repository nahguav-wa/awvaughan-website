<script lang="ts">
	import { resolve } from '$app/paths';
	import { PageHero } from '$lib';
	import { inView } from '$lib/actions/in-view';
	import { featuredProjects } from '$lib/data/projects';
	import { getLinkKey, getMetaKey } from '$lib/seo';
	import {
		Badge,
		Button,
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui';

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

<section id="projects" class="border-b border-border/60 bg-background py-20">
	<div class="mx-auto max-w-6xl space-y-12 px-6">
		<div class="mx-auto max-w-3xl space-y-4 text-center">
			<Badge variant="secondary" class="w-fit normal-case tracking-[0.3em]">
				Recent highlights
			</Badge>
			<h2
				class="reveal text-3xl font-semibold text-[hsl(var(--foreground))] sm:text-4xl"
				use:inView
			>
				Acreage projects finished with care
			</h2>
			<p class="text-base text-[hsl(var(--muted-foreground))] sm:text-lg">
				Every project starts with listening and ends with a tidy site. These spotlights show the
				type of mowing, cleanup, and driveway work landowners trust me to handle.
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-3">
			{#each featuredProjects as project (project.title)}
				<Card class="group flex h-full flex-col overflow-hidden">
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
					<CardHeader class="flex flex-1 flex-col gap-4 text-left">
						<Badge variant="secondary" class="w-fit normal-case tracking-[0.3em]">
							{project.sector}
						</Badge>
						<CardTitle class="reveal text-xl" use:inView>{project.title}</CardTitle>
						<CardDescription>{project.summary}</CardDescription>
					</CardHeader>
					<CardFooter class="pt-0">
						<Button class="gap-2 text-[hsl(var(--primary))]" href={contactHref} variant="link">
							Start a similar project
							<svg
								class="h-3 w-3"
								viewBox="0 0 16 16"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
							>
								<path d="M3 8h10" />
								<path d="M9 4l4 4-4 4" />
							</svg>
						</Button>
					</CardFooter>
				</Card>
			{/each}
		</div>
	</div>
</section>

<section class="border-b border-border/60 bg-muted/40 py-20">
	<div class="mx-auto max-w-6xl px-6">
		<div class="flex flex-col gap-12 lg:flex-row lg:items-center">
			<div class="flex-1 space-y-4">
				<Badge variant="secondary" class="w-fit normal-case tracking-[0.3em]">
					How we handle each job
				</Badge>
				<h2
					class="reveal text-3xl font-semibold text-[hsl(var(--foreground))] sm:text-4xl"
					use:inView
				>
					A proven process for tidy results
				</h2>
				<p class="text-base text-[hsl(var(--muted-foreground))] sm:text-lg">
					Clear communication, right-sized equipment, and careful passes keep projects on schedule.
					Here is what to expect when we plan work together.
				</p>
			</div>
			<div class="flex-1 space-y-6">
				{#each approach as step (step.title)}
					<Card>
						<CardHeader class="space-y-2">
							<CardTitle class="reveal text-lg" use:inView>{step.title}</CardTitle>
							<CardDescription>{step.description}</CardDescription>
						</CardHeader>
					</Card>
				{/each}
			</div>
		</div>
	</div>
</section>

<section class="bg-background py-20">
	<div class="mx-auto max-w-5xl px-6">
		<Card
			class="rounded-4xl bg-gradient-to-br from-background via-[hsl(var(--secondary))]/30 to-background text-center shadow-md"
		>
			<CardHeader class="space-y-4">
				<CardTitle
					class="reveal text-3xl font-semibold text-[hsl(var(--foreground))] sm:text-4xl"
					use:inView
				>
					Ready to talk about your property?
				</CardTitle>
				<CardDescription class="text-base text-[hsl(var(--muted-foreground))] sm:text-lg">
					Tell me what you are facing—overgrowth, brush piles, drainage issues, or driveway ruts. I
					will share recommendations and schedule the passes needed to get you back on track.
				</CardDescription>
			</CardHeader>
			<CardContent class="space-y-3 text-sm text-[hsl(var(--muted-foreground))] sm:text-base">
				<ul class="flex flex-col gap-3 sm:flex-row sm:justify-center">
					{#each assurances as item (item)}
						<li class="flex items-center justify-center gap-2">
							<span class="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" aria-hidden="true"
							></span>
							{item}
						</li>
					{/each}
				</ul>
			</CardContent>
			<CardFooter class="justify-center gap-4 pt-0">
				<Button href={contactHref} variant="default" size="lg" class="rounded-full">
					Plan a project
				</Button>
				<Button href={resolve('/services')} variant="ghost" size="lg" class="rounded-full">
					Explore services
				</Button>
			</CardFooter>
		</Card>
	</div>
</section>
