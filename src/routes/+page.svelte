<script lang="ts">
	import { resolve } from '$app/paths';
	import { getLinkKey, getMetaKey } from '$lib/seo';
	import { Hero } from '$lib';
	import { inView } from '$lib/actions/in-view';
	import CoastalIcon from '$lib/components/icons/CoastalIcon.svelte';
	import ExcavatorIcon from '$lib/components/icons/ExcavatorIcon.svelte';
	import LeadershipIcon from '$lib/components/icons/LeadershipIcon.svelte';
	import MaintenanceIcon from '$lib/components/icons/MaintenanceIcon.svelte';
	import ServiceIcon from '$lib/components/icons/ServiceIcon.svelte';
	import WaterIcon from '$lib/components/icons/WaterIcon.svelte';
	import type { ComponentType } from 'svelte';

	let { data } = $props();
	const seo = $derived(data.seo);

	const email = 'alex.vaughan@awvaughan.com';
	const phoneLabel = '(757) 402-1100';

	const proofPoints = [
		{
			value: '20+ years',
			title: 'Crew experience',
			description:
				'Civil, utilities, and maintenance backgrounds that keep complex scopes on schedule.'
		},
		{
			value: '< 24 hrs',
			title: 'Emergency response',
			description: 'Rapid mobilization for washouts, storm cleanup, and urgent safety repairs.'
		},
		{
			value: 'Class A',
			title: 'Licensed & insured',
			description:
				'Virginia contractor with full coverage, safety planning, and site documentation.'
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
			title: 'Sitework & Grading',
			description:
				'Fine grading, earthwork, and structural prep that set the pace for builders and commercial crews throughout Hampton Roads.',
			icon: ExcavatorIcon,
			image:
				'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&w=1200&q=80',
			alt: 'Excavator shaping soil on an active job site.'
		},
		{
			title: 'Drainage & Utilities',
			description:
				'Stormwater repairs, tie-ins, and erosion control tailored to coastal soils so properties stay accessible year-round.',
			icon: WaterIcon,
			image:
				'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
			alt: 'Crew lowering new drainage pipe into place.'
		},
		{
			title: 'Property Maintenance',
			description:
				'Recurring mowing, cleanup, and amenity upkeep that reflect well on your residents, tenants, and guests.',
			icon: MaintenanceIcon,
			image:
				'https://images.unsplash.com/photo-1487956382158-bb926046304a?auto=format&fit=crop&w=1200&q=80',
			alt: 'Grounds team trimming landscaping around a community amenity.'
		}
	];

	const featuredProjects = [
		{
			title: 'Coastal resort stormwater rehab',
			sector: 'Hospitality, Virginia Beach',
			summary:
				'Stabilized dunes, regraded parking courts, and reset drainage in 72 hours so the resort could reopen ahead of the weekend.',
			image:
				'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80',
			alt: 'Stormwater crew restoring a beachfront property.'
		},
		{
			title: 'HOA amenity refresh & drainage',
			sector: 'Community Association, Chesapeake',
			summary:
				'Rebuilt walking trails, corrected drainage around the clubhouse, and delivered a phased landscaping plan with minimal disruption.',
			image:
				'https://images.unsplash.com/photo-1556760544-74068565f05c?auto=format&fit=crop&w=1600&q=80',
			alt: 'Neighborhood walking path construction at sunset.'
		},
		{
			title: 'Logistics yard expansion',
			sector: 'Industrial, Norfolk',
			summary:
				'Cut/fill balancing, aggregate surfacing, and lighting trenching completed under an accelerated schedule for a regional carrier.',
			image:
				'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
			alt: 'Industrial site graded and compacted for expansion.'
		}
	] as const;

	const testimonial = {
		quote:
			'We plan each project like we are part of your team—clear communication, tidy sites, and follow-through when weather or schedules change.',
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
				'Clients count on us for steady communication and reliable crews. We show up prepared, keep jobsites tidy, and deliver when we say we will.',
			icon: ServiceIcon
		},
		{
			title: 'Coastal expertise',
			description:
				'From sandy soils to salt-laden air, Hampton Roads presents unique challenges. We tailor solutions and materials that stand up to local conditions.',
			icon: CoastalIcon
		},
		{
			title: 'Hands-on leadership',
			description:
				'Owner Alex Vaughan stays engaged from estimate through closeout so every detail reflects our standards and your expectations.',
			icon: LeadershipIcon
		}
	];
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

<Hero />

<section class="border-b border-[var(--border-soft)] bg-[var(--surface-base)] py-20">
	<div class="mx-auto max-w-6xl px-6">
		<div class="max-w-3xl space-y-4">
			<p class="text-xs font-semibold tracking-[0.35em] text-[var(--brand-blue)] uppercase">
				Proof points
			</p>
			<h2 class="reveal text-3xl font-semibold text-[var(--text-dark)] sm:text-4xl" use:inView>
				Credentials that match national contractors
			</h2>
			<p class="text-base text-[var(--text-muted)] sm:text-lg">
				Clients choose us for Garney-level reliability with a tight-knit crew. These highlights
				reinforce why builders and property managers across Hampton Roads keep us on call.
			</p>
		</div>

		<div class="mt-10 grid gap-6 md:grid-cols-3">
			{#each proofPoints as point (point.title)}
				<article
					class="rounded-3xl border border-[var(--border-soft)] bg-[var(--surface-soft)] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
				>
					<p class="text-xs font-semibold tracking-[0.35em] text-[var(--brand-blue)] uppercase">
						{point.title}
					</p>
					<p class="mt-3 text-2xl font-bold text-[var(--text-dark)]">{point.value}</p>
					<p class="mt-3 text-sm text-[var(--text-muted)]">{point.description}</p>
				</article>
			{/each}
		</div>

		<div class="mt-16 grid gap-6 md:grid-cols-3">
			{#each valueHighlights as highlight (highlight.title)}
				<article
					class="rounded-3xl border border-[var(--border-soft)] bg-[var(--surface-soft)] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
				>
					<span
						class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand-blue-soft)] text-[var(--brand-blue)]"
					>
						<svelte:component this={highlight.icon} class="h-6 w-6" />
					</span>
					<h3 class="mt-4 text-lg font-semibold text-[var(--text-dark)]">{highlight.title}</h3>
					<p class="mt-2 text-sm text-[var(--text-muted)]">{highlight.description}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<section id="services" class="border-b border-[var(--border-soft)] bg-[var(--surface-muted)] py-20">
	<div class="mx-auto max-w-6xl px-6">
		<div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
			<div class="max-w-3xl space-y-4">
				<p class="text-xs font-semibold tracking-[0.35em] text-[var(--brand-blue)] uppercase">
					Our capabilities
				</p>
				<h2 class="reveal text-3xl font-semibold text-[var(--text-dark)] sm:text-4xl" use:inView>
					Site-ready solutions from one reliable crew
				</h2>
				<p class="text-base text-[var(--text-muted)] sm:text-lg">
					We combine responsive leadership with the resources to tackle grading, drainage, and
					ongoing property maintenance.
				</p>
			</div>
			<a
				class="inline-flex items-center justify-center gap-2 self-start rounded-full border border-[var(--border-soft)] bg-[var(--surface-base)] px-5 py-2 text-xs font-semibold tracking-[0.25em] text-[var(--text-dark)] uppercase transition hover:bg-[var(--brand-blue-soft)] hover:text-[var(--brand-blue)] focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-blue)]"
				href={resolve('/services')}
			>
				View full services
			</a>
		</div>

		<div class="mt-12 grid gap-8 md:grid-cols-3">
			{#each services as service (service.title)}
				<article
					class="group flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--border-soft)] bg-[var(--surface-base)] shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
				>
					<div class="relative h-48 overflow-hidden">
						<img
							src={service.image}
							alt={service.alt}
							class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
						/>
						<div
							class="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40"
						></div>
					</div>
					<div class="flex flex-1 flex-col gap-4 p-6">
						<span
							class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand-blue-soft)] text-[var(--brand-blue)]"
						>
							<svelte:component this={service.icon} class="h-6 w-6" />
						</span>
						<h3 class="text-xl font-semibold text-[var(--text-dark)]">{service.title}</h3>
						<p class="text-sm text-[var(--text-muted)]">{service.description}</p>
						<div class="mt-auto pt-4">
							<a
								href={resolve('/services')}
								class="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[var(--brand-blue)] uppercase transition hover:text-[var(--brand-orange)]"
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

<section id="projects" class="border-b border-[var(--border-soft)] bg-[var(--surface-base)] py-20">
	<div class="mx-auto max-w-6xl px-6">
		<div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
			<div class="max-w-3xl space-y-4">
				<p class="text-xs font-semibold tracking-[0.35em] text-[var(--brand-blue)] uppercase">
					Featured projects
				</p>
				<h2 class="reveal text-3xl font-semibold text-[var(--text-dark)] sm:text-4xl" use:inView>
					Recent scopes we have delivered
				</h2>
				<p class="text-base text-[var(--text-muted)] sm:text-lg">
					While we keep client names private, these highlights mirror the heavy civil and
					maintenance work we perform across Hampton Roads.
				</p>
			</div>
			<a
				class="inline-flex items-center justify-center gap-2 self-start rounded-full bg-[var(--brand-orange)] px-5 py-2 text-xs font-semibold tracking-[0.25em] text-[var(--text-dark)] uppercase shadow-[var(--brand-orange)]/30 shadow-lg transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-blue)]"
				href={resolve('/contact')}
			>
				Request a similar plan
			</a>
		</div>

		<div class="mt-12 grid gap-8 md:grid-cols-3">
			{#each featuredProjects as project (project.title)}
				<article
					class="flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--border-soft)] bg-[var(--surface-base)] shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
				>
					<div class="relative h-56 overflow-hidden">
						<img src={project.image} alt={project.alt} class="h-full w-full object-cover" />
						<div
							class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent"
						></div>
					</div>
					<div class="flex flex-1 flex-col gap-4 p-6">
						<p class="text-xs font-semibold tracking-[0.35em] text-[var(--brand-blue)] uppercase">
							{project.sector}
						</p>
						<h3 class="text-xl font-semibold text-[var(--text-dark)]">{project.title}</h3>
						<p class="text-sm text-[var(--text-muted)]">{project.summary}</p>
						<div class="mt-auto pt-4">
							<a
								href={resolve('/contact')}
								class="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[var(--brand-orange)] uppercase transition hover:text-[var(--brand-blue)]"
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

<section class="border-b border-[var(--border-soft)] bg-[var(--surface-muted)] py-20">
	<div class="mx-auto max-w-5xl px-6">
		<div
			class="rounded-3xl border border-[var(--border-soft)] bg-[var(--surface-base)] p-10 shadow-sm"
		>
			<p class="text-xs font-semibold tracking-[0.35em] text-[var(--brand-blue)] uppercase">
				From our owner
			</p>
			<blockquote class="mt-6 text-2xl font-semibold text-[var(--text-dark)] sm:text-3xl">
				“{testimonial.quote}”
			</blockquote>
			<p class="mt-6 text-sm font-semibold tracking-[0.3em] text-[var(--brand-orange)] uppercase">
				{testimonial.name}
			</p>
			<p class="text-sm text-[var(--text-muted)]">{testimonial.role}</p>
			<div
				class="mt-8 flex flex-wrap gap-3 text-xs font-semibold tracking-[0.28em] text-[var(--text-muted)] uppercase"
			>
				{#each serviceArea as area (area)}
					<span
						class="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] px-4 py-2"
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

<section id="contact" class="bg-[var(--brand-blue)] py-20 text-white">
	<div
		class="mx-auto max-w-4xl rounded-3xl border border-white/20 bg-white/5 px-6 py-16 text-center shadow-[var(--brand-blue)]/30 shadow-2xl"
	>
		<p class="text-xs font-semibold tracking-[0.35em] text-white/70 uppercase">Let’s get to work</p>
		<h2 class="reveal mt-4 text-3xl font-semibold sm:text-4xl" use:inView>
			Count on AW Vaughan Company for responsive support
		</h2>
		<p class="mt-3 text-base text-white/80 sm:text-lg">
			Share your scope, timeline, and maintenance needs. We’ll provide a plan that keeps your
			property accessible, safe, and ready for the next milestone.
		</p>
		<div
			class="mt-8 flex flex-col items-center justify-center gap-4 text-sm text-white/80 sm:flex-row sm:text-base"
		>
			<div class="inline-flex items-center gap-2">
				<span class="h-2 w-2 rounded-full bg-[var(--brand-orange)]" aria-hidden="true"></span>
				Virginia Beach, Virginia
			</div>
			<span class="hidden h-4 w-px bg-white/30 sm:inline" aria-hidden="true"></span>
			<a
				class="inline-flex items-center gap-2 transition hover:text-white"
				href={`mailto:${email}`}
			>
				<span class="h-2 w-2 rounded-full bg-[var(--brand-orange)]" aria-hidden="true"></span>
				{email}
			</a>
			<span class="hidden h-4 w-px bg-white/30 sm:inline" aria-hidden="true"></span>
			<a class="inline-flex items-center gap-2 transition hover:text-white" href="tel:+17574021100">
				<span class="h-2 w-2 rounded-full bg-[var(--brand-orange)]" aria-hidden="true"></span>
				{phoneLabel}
			</a>
		</div>
		<div class="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
			<a
				class="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-orange)] px-6 py-3 text-sm font-semibold tracking-[0.28em] text-[var(--text-dark)] uppercase shadow-[var(--brand-orange)]/30 shadow-lg transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-white sm:text-base"
				href={resolve('/contact')}
			>
				Visit the contact page
			</a>
			<a
				class="inline-flex items-center justify-center gap-2 rounded-full border border-white/60 bg-white/10 px-6 py-3 text-sm font-semibold tracking-[0.28em] text-white uppercase transition hover:border-white hover:bg-white/20 sm:text-base"
				href="tel:+17574021100"
			>
				Call us directly
			</a>
		</div>
	</div>
</section>
