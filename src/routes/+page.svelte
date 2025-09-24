<script lang="ts">
	import { resolve } from '$app/paths';
	import { getLinkKey, getMetaKey } from '$lib/seo';
	import { Hero } from '$lib';
	import { inView } from '$lib/actions/in-view';
	import { featuredProjects } from '$lib/data/projects';
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
			value: 'Owner-operated',
			title: 'Hands-on service',
			description:
				'You work directly with me—Alex Vaughan—from the first walk-through to the final cleanup.'
		},
		{
			value: 'Compact tractor',
			title: 'Right-sized equipment',
			description:
				'A nimble setup that fits through gates, works around trees, and leaves a tidy finish.'
		},
		{
			value: 'Flexible scheduling',
			title: 'Quick turnaround',
			description:
				'Most mowing, cleanup, and driveway touchups are completed within days of your call.'
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
			title: 'Field & pasture mowing',
			description:
				'Bush hogging for large yards, pastures, and roadside frontage so tall grass and weeds stay under control.',
			icon: ExcavatorIcon,
			image:
				'https://images.unsplash.com/photo-1596588801060-5d56586eca12?auto=format&fit=crop&w=1200&q=80',
			alt: 'Compact tractor cutting tall grass in an open field.'
		},
		{
			title: 'Brush & limb cleanup',
			description:
				'Storm cleanups, fallen limbs, and brush piles hauled off to give your property a fresh start.',
			icon: MaintenanceIcon,
			image:
				'https://images.unsplash.com/photo-1520854221050-0f4caff449fb?auto=format&fit=crop&w=1200&q=80',
			alt: 'Trailer loaded with trimmed limbs ready for hauling.'
		},
		{
			title: 'Driveway & dirt work',
			description:
				'Light grading, driveway touchups, and drainage improvements that keep rural properties accessible.',
			icon: WaterIcon,
			image:
				'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=1200&q=80',
			alt: 'Gravel driveway being leveled with tractor attachments.'
		}
	];

	const testimonial = {
		quote:
			'Every job gets the same care I would give my own place. I walk the site with you, explain the plan, and stay until you are happy with the finish.',
		name: 'Alex Vaughan',
		role: 'Owner & operator, AW Vaughan Company'
	} as const;

	const serviceArea = [
		'Virginia Beach',
		'Chesapeake',
		'Norfolk',
		'Suffolk',
		'Isle of Wight',
		'Currituck County, NC'
	] as const;

	const valueHighlights: readonly {
		title: string;
		description: string;
		icon: IconComponent;
	}[] = [
		{
			title: 'Respect for your property',
			description:
				'I treat every acre like my own—mindful of septic fields, fences, landscaping, and neighbors.',
			icon: ServiceIcon
		},
		{
			title: 'Local know-how',
			description:
				'Coastal soils, soggy ditches, sandy drives—I live here too and know how to keep them in shape.',
			icon: CoastalIcon
		},
		{
			title: 'Clear communication',
			description:
				'Text me pictures, call with questions, and expect honest updates before, during, and after the job.',
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
				Why neighbors call me
			</p>
			<h2 class="reveal text-3xl font-semibold text-[var(--text-dark)] sm:text-4xl" use:inView>
				Small-business care with professional results
			</h2>
			<p class="text-base text-[var(--text-muted)] sm:text-lg">
				Here is what you can expect when you invite me onto your property. No large crews—just
				dependable service from the person who owns the equipment.
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
					Tractor services
				</p>
				<h2 class="reveal text-3xl font-semibold text-[var(--text-dark)] sm:text-4xl" use:inView>
					Practical help for large residential properties
				</h2>
				<p class="text-base text-[var(--text-muted)] sm:text-lg">
					Whether you just bought land or need a seasonal tune-up, I bring dependable equipment and
					a careful approach to every visit.
				</p>
			</div>
			<a
				class="inline-flex items-center justify-center gap-2 self-start rounded-full border border-[var(--border-soft)] bg-[var(--surface-base)] px-5 py-2 text-xs font-semibold tracking-[0.25em] text-[var(--text-dark)] uppercase transition hover:bg-[var(--brand-blue-soft)] hover:text-[var(--brand-blue)] focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-blue)]"
				href={resolve('/services')}
			>
				See everything I offer
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
					Recent jobs
				</p>
				<h2 class="reveal text-3xl font-semibold text-[var(--text-dark)] sm:text-4xl" use:inView>
					A look at the kind of work I handle
				</h2>
				<p class="text-base text-[var(--text-muted)] sm:text-lg">
					Every property is different, but these jobs show the type of mowing, cleanup, and dirt
					work I am called for most often.
				</p>
			</div>
			<a
				class="inline-flex items-center justify-center gap-2 self-start rounded-full bg-[var(--brand-orange)] px-5 py-2 text-xs font-semibold tracking-[0.25em] text-[var(--text-dark)] uppercase shadow-[var(--brand-orange)]/30 shadow-lg transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-blue)]"
				href={resolve('/contact')}
			>
				Request a quote
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
								Start a project
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
				From the operator
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
		<p class="text-xs font-semibold tracking-[0.35em] text-white/70 uppercase">
			Let’s talk through your property
		</p>
		<h2 class="reveal mt-4 text-3xl font-semibold sm:text-4xl" use:inView>
			Ready when your land needs a little extra muscle
		</h2>
		<p class="mt-3 text-base text-white/80 sm:text-lg">
			Tell me what you are dealing with—overgrown fields, storm debris, rough driveways, or
			something similar. I will recommend a straightforward plan and schedule.
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
