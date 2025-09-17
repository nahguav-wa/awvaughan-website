<script lang="ts">
	import { resolve } from '$app/paths';
	import { Hero } from '$lib';
	import CoastalIcon from '$lib/components/icons/CoastalIcon.svelte';
	import ExcavatorIcon from '$lib/components/icons/ExcavatorIcon.svelte';
	import LeadershipIcon from '$lib/components/icons/LeadershipIcon.svelte';
	import MaintenanceIcon from '$lib/components/icons/MaintenanceIcon.svelte';
	import ServiceIcon from '$lib/components/icons/ServiceIcon.svelte';
	import WaterIcon from '$lib/components/icons/WaterIcon.svelte';
	import type { ComponentType } from 'svelte';

	const email = 'alex.vaughan@awvaughan.com';
	const phoneLabel = '(757) 402-1100';

	const proofPoints = [
		{
			value: 'Owner-led',
			title: 'On every job',
			description:
				'Work directly with Alex Vaughan from the first walk-through to the final cleanup.'
		},
		{
			value: '1:1 support',
			title: 'Direct communication',
			description:
				'Expect updates before, during, and after each visit so you always know what is happening.'
		},
		{
			value: 'Class A',
			title: 'Licensed & insured',
			description:
				'Virginia Class A contractor with the coverage and documentation to protect your property.'
		}
	] as const;

	type IconComponent = ComponentType;

	const services: readonly {
		title: string;
		description: string;
		icon: IconComponent;
		image: string;
		alt: string;
	}[] = [
		{
			title: 'Light grading & driveways',
			description:
				'Cut high spots, fill washouts, and resurface gravel drives so your property stays accessible year-round.',
			icon: ExcavatorIcon,
			image:
				'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&w=1200&q=80',
			alt: 'Compact track loader regrading a gravel driveway.'
		},
		{
			title: 'Hauling & material delivery',
			description:
				'Gravel, stone, soil, mulch, or debris hauled in and out with care for your yard and neighbors.',
			icon: ServiceIcon,
			image:
				'https://images.unsplash.com/photo-1583525374614-85244a6c78de?auto=format&fit=crop&w=1200&q=80',
			alt: 'Dump truck delivering gravel onto a driveway.'
		},
		{
			title: 'Small tractor projects',
			description:
				'Box blade touch-ups, drainage swales, and landscape prep handled with compact equipment.',
			icon: WaterIcon,
			image:
				'https://images.unsplash.com/photo-1523419409543-0c1df022bdd7?auto=format&fit=crop&w=1200&q=80',
			alt: 'Small tractor smoothing soil beside a home.'
		},
		{
			title: 'Bush hogging & cleanup',
			description:
				'Cut back overgrowth, fields, and roadside edges to reclaim usable space and improve sightlines.',
			icon: MaintenanceIcon,
			image:
				'https://images.unsplash.com/photo-1505692521665-9aa23dd80c2c?auto=format&fit=crop&w=1200&q=80',
			alt: 'Tractor cutting tall grass in a rural field.'
		}
	];

	const featuredProjects = [
		{
			title: 'Country driveway resurfacing',
			sector: 'Residential | Pungo',
			summary:
				'Stripped ruts, delivered new stone, and compacted a 500-foot farm driveway for smoother daily use.',
			image:
				'https://images.unsplash.com/photo-1565631622111-7d3e3e48547c?auto=format&fit=crop&w=1600&q=80',
			alt: 'Fresh gravel being spread on a country driveway.'
		},
		{
			title: 'Five-acre bush hogging & cleanup',
			sector: 'Landowner | Chesapeake',
			summary:
				'Cleared shoulder-high brush, mulched debris, and opened access paths for a family property.',
			image:
				'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1600&q=80',
			alt: 'Tractor mowing overgrown acreage.'
		},
		{
			title: 'Material hauling & grading refresh',
			sector: 'Commercial | Virginia Beach',
			summary:
				'Cleared leftover debris, hauled in fresh stone, and reestablished drainage swales to keep operations moving.',
			image:
				'https://images.unsplash.com/photo-1503389152951-9f343605f61e?auto=format&fit=crop&w=1600&q=80',
			alt: 'Loader moving material beside a commercial site.'
		}
	] as const;

	const testimonial = {
		quote:
			'Clear communication and tidy work are non-negotiable. I treat every project like it is my own property and keep you informed at every step.',
		name: 'Alex Vaughan',
		role: 'Owner, AW Vaughan Company'
	} as const;

	const serviceArea = [
		'Virginia Beach',
		'Norfolk',
		'Chesapeake',
		'Portsmouth',
		'Suffolk',
		'Greater Hampton Roads'
	] as const;

	const valueHighlights: readonly {
		title: string;
		description: string;
		icon: IconComponent;
	}[] = [
		{
			title: 'Grounded in service',
			description:
				'Count on consistent communication, tidy work areas, and follow-through from the person who owns the company.',
			icon: ServiceIcon
		},
		{
			title: 'Coastal expertise',
			description:
				'From sandy soils to salt-laden air, Hampton Roads presents unique challenges. I tailor solutions and materials that stand up to local conditions.',
			icon: CoastalIcon
		},
		{
			title: 'Hands-on leadership',
			description:
				'Owner Alex Vaughan stays engaged from estimate through closeout so every detail reflects my standards and your expectations.',
			icon: LeadershipIcon
		}
	];
</script>

<svelte:head>
	<title>AW Vaughan Company — Owner-Operated Land Services in Virginia Beach, VA</title>
	<meta
		name="description"
		content="AW Vaughan Company is an owner-operated contractor offering light grading, hauling, bush hogging, driveway resurfacing, and small tractor work across Hampton Roads."
	/>
</svelte:head>

<Hero />

<section class="border-b border-white/10 bg-[var(--brand-navy-900)]/95 py-16">
	<div class="mx-auto flex max-w-6xl flex-col gap-12 px-6 lg:flex-row lg:items-center">
		<div class="max-w-xl space-y-4">
			<p class="text-sm font-semibold tracking-[0.35em] text-[var(--brand-teal)] uppercase">
				Proof points
			</p>
			<h2 class="text-3xl font-bold text-white sm:text-4xl">
				What you can expect from an owner-operator
			</h2>
			<p class="text-base text-slate-200 sm:text-lg">
				When you work with AW Vaughan Company, you work with me. These proof points show why
				homeowners, small businesses, and property managers keep my number saved.
			</p>
		</div>
		<div class="grid flex-1 gap-6 md:grid-cols-3">
			{#each proofPoints as point (point.title)}
				<article
					class="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20 transition hover:border-white/30 hover:bg-white/10"
				>
					<p class="text-xs font-semibold tracking-[0.4em] text-[var(--brand-teal)] uppercase">
						{point.title}
					</p>
					<p class="mt-3 text-2xl font-bold text-white">{point.value}</p>
					<p class="mt-3 text-sm text-slate-200">{point.description}</p>
				</article>
			{/each}
		</div>
	</div>

	<div class="mx-auto mt-12 grid max-w-6xl gap-6 px-6 md:grid-cols-3">
		{#each valueHighlights as highlight (highlight.title)}
			<article
				class="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20 transition hover:border-white/30 hover:bg-white/10"
			>
				<span
					class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[var(--brand-orange)] shadow-inner shadow-black/40"
				>
					<svelte:component this={highlight.icon} class="h-6 w-6" />
				</span>
				<h3 class="mt-4 text-lg font-semibold text-white">{highlight.title}</h3>
				<p class="mt-2 text-sm text-slate-200">{highlight.description}</p>
			</article>
		{/each}
	</div>
</section>

<section
	id="services"
	class="border-b border-white/10 bg-gradient-to-b from-[var(--brand-navy-900)] to-[var(--brand-navy-800)] py-20"
>
	<div class="mx-auto max-w-6xl px-6">
		<div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
			<div>
				<p class="text-sm font-semibold tracking-[0.35em] text-[var(--brand-teal)] uppercase">
					Our capabilities
				</p>
				<h2 class="mt-3 text-3xl font-bold text-white sm:text-4xl">
					Site-ready solutions from one reliable owner-operator
				</h2>
				<p class="mt-4 max-w-2xl text-base text-slate-200 sm:text-lg">
					From small tractor work to hauling and bush hogging, each service is performed with the
					same care I would bring to my own property. Hover or focus on each service to preview
					recent work.
				</p>
			</div>
			<a
				class="inline-flex items-center justify-center gap-2 self-start rounded-full border border-white/30 bg-white/5 px-5 py-2 text-xs font-semibold tracking-[0.28em] text-white uppercase transition hover:border-white/60 hover:bg-white/10 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-cream)]"
				href={resolve('/services')}
			>
				View full services
			</a>
		</div>

		<div class="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
			{#each services as service (service.title)}
				<article
					class="group relative overflow-hidden rounded-4xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/25 transition focus-within:border-white/40 hover:border-white/40 hover:shadow-2xl"
				>
					<div
						class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
					>
						<img src={service.image} alt={service.alt} class="h-full w-full object-cover" />
						<div
							class="absolute inset-0 bg-gradient-to-br from-[var(--brand-navy-900)]/80 via-[var(--brand-navy-800)]/60 to-black/70"
						></div>
					</div>

					<div class="relative z-10 flex h-full flex-col gap-4">
						<span
							class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-[var(--brand-orange)] shadow-inner shadow-black/50"
						>
							<svelte:component this={service.icon} class="h-6 w-6" />
						</span>
						<h3 class="text-xl font-semibold text-white">{service.title}</h3>
						<p class="text-sm text-slate-200">{service.description}</p>
						<div class="mt-auto pt-4">
							<a
								href={resolve('/services')}
								class="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.32em] text-[var(--brand-teal)] uppercase transition hover:text-[var(--brand-orange)]"
							>
								Explore more
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
							</a>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<section id="projects" class="border-b border-white/10 bg-[var(--brand-navy-800)] py-20">
	<div class="mx-auto max-w-6xl px-6">
		<div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
			<div>
				<p class="text-sm font-semibold tracking-[0.35em] text-[var(--brand-teal)] uppercase">
					Featured projects
				</p>
				<h2 class="mt-3 text-3xl font-bold text-white sm:text-4xl">
					Recent scopes completed around Hampton Roads
				</h2>
				<p class="mt-4 max-w-2xl text-base text-slate-200 sm:text-lg">
					Here are a few examples of the owner-operated work my clients call me for. Each one was
					handled with careful planning and respectful communication.
				</p>
			</div>
			<a
				class="inline-flex items-center justify-center gap-2 self-start rounded-full bg-[var(--brand-orange)] px-5 py-2 text-xs font-semibold tracking-[0.28em] text-[var(--brand-navy-900)] uppercase shadow-[var(--brand-orange)]/30 shadow-lg transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-cream)]"
				href={resolve('/contact')}
			>
				Request a similar plan
			</a>
		</div>

		<div class="mt-12 grid gap-8 md:grid-cols-3">
			{#each featuredProjects as project (project.title)}
				<article
					class="flex h-full flex-col overflow-hidden rounded-4xl border border-white/10 bg-white/5 shadow-xl shadow-black/25 transition hover:border-white/40 hover:shadow-2xl"
				>
					<div class="relative h-56 overflow-hidden">
						<img src={project.image} alt={project.alt} class="h-full w-full object-cover" />
						<div
							class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
						></div>
					</div>
					<div class="flex flex-1 flex-col gap-4 p-6">
						<p class="text-xs font-semibold tracking-[0.35em] text-[var(--brand-teal)] uppercase">
							{project.sector}
						</p>
						<h3 class="text-xl font-semibold text-white">{project.title}</h3>
						<p class="text-sm text-slate-200">{project.summary}</p>
						<div class="mt-auto pt-4">
							<a
								href={resolve('/contact')}
								class="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.32em] text-[var(--brand-orange)] uppercase transition hover:text-white"
							>
								Start your project
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
							</a>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<section
	class="border-b border-white/10 bg-gradient-to-br from-[var(--brand-navy-900)] via-[var(--brand-navy-800)] to-black py-20"
>
	<div class="mx-auto max-w-5xl px-6">
		<div class="rounded-4xl border border-white/10 bg-white/5 p-10 shadow-2xl shadow-black/40">
			<p class="text-sm font-semibold tracking-[0.35em] text-[var(--brand-teal)] uppercase">
				From our owner
			</p>
			<blockquote class="mt-6 text-2xl font-semibold text-white sm:text-3xl">
				“{testimonial.quote}”
			</blockquote>
			<p class="mt-6 text-sm font-semibold tracking-[0.3em] text-[var(--brand-orange)] uppercase">
				{testimonial.name}
			</p>
			<p class="text-sm text-slate-200">{testimonial.role}</p>
			<div class="mt-8 flex flex-wrap gap-3 text-xs tracking-[0.28em] text-slate-300 uppercase">
				{#each serviceArea as area (area)}
					<span
						class="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2"
					>
						<span
							aria-hidden="true"
							class="inline-flex h-1.5 w-1.5 rounded-full bg-[var(--brand-orange)]"
						></span>
						{area}
					</span>
				{/each}
			</div>
		</div>
	</div>
</section>

<section
	id="contact"
	class="bg-gradient-to-b from-[var(--brand-navy-900)] to-[var(--brand-navy-800)] py-20"
>
	<div
		class="mx-auto max-w-4xl rounded-4xl border border-white/10 bg-white/5 px-6 py-16 text-center shadow-xl shadow-black/40"
	>
		<p class="text-sm font-semibold tracking-[0.35em] text-[var(--brand-teal)] uppercase">
			Let’s get to work
		</p>
		<h2 class="mt-4 text-3xl font-bold text-white sm:text-4xl">
			Count on AW Vaughan Company for owner-operated support
		</h2>
		<p class="mt-3 text-base text-slate-200 sm:text-lg">
			Share your scope, timeline, and maintenance needs. I will personally build a plan that keeps
			your property accessible, safe, and ready for the next milestone.
		</p>
		<div
			class="mt-8 flex flex-col items-center justify-center gap-4 text-sm text-slate-200 sm:flex-row sm:text-base"
		>
			<div class="inline-flex items-center gap-2">
				<span class="h-2 w-2 rounded-full bg-[var(--brand-orange)]" aria-hidden="true"></span>
				Virginia Beach, Virginia
			</div>
			<span class="hidden h-4 w-px bg-white/20 sm:inline" aria-hidden="true"></span>
			<a
				class="inline-flex items-center gap-2 transition hover:text-[var(--brand-orange)]"
				href={`mailto:${email}`}
			>
				<span class="h-2 w-2 rounded-full bg-[var(--brand-orange)]" aria-hidden="true"></span>
				{email}
			</a>
			<span class="hidden h-4 w-px bg-white/20 sm:inline" aria-hidden="true"></span>
			<a
				class="inline-flex items-center gap-2 transition hover:text-[var(--brand-orange)]"
				href="tel:+17574021100"
			>
				<span class="h-2 w-2 rounded-full bg-[var(--brand-orange)]" aria-hidden="true"></span>
				{phoneLabel}
			</a>
		</div>
		<div class="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
			<a
				class="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-orange)] px-6 py-3 text-sm font-semibold tracking-[0.28em] text-[var(--brand-navy-900)] uppercase shadow-[var(--brand-orange)]/35 shadow-lg transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-cream)] sm:text-base"
				href={resolve('/contact')}
			>
				Visit the contact page
			</a>
			<a
				class="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold tracking-[0.28em] text-white uppercase transition hover:border-white/60 hover:bg-white/20 sm:text-base"
				href="tel:+17574021100"
			>
				Call us directly
			</a>
		</div>
	</div>
</section>
