<script lang="ts">
	import { resolve } from '$app/paths';
	import ExcavatorIcon from '$lib/components/icons/ExcavatorIcon.svelte';
	import MaintenanceIcon from '$lib/components/icons/MaintenanceIcon.svelte';
	import ServiceIcon from '$lib/components/icons/ServiceIcon.svelte';
	import WaterIcon from '$lib/components/icons/WaterIcon.svelte';
	import type { ComponentType } from 'svelte';

	const offerings: readonly {
		title: string;
		description: string;
		icon: ComponentType;
		image: string;
		alt: string;
		items: readonly string[];
	}[] = [
		{
			title: 'Light grading & driveway resurfacing',
			description:
				'Regrade gravel driveways, repair washouts, and prepare small building pads with compact equipment that fits tight sites.',
			icon: ExcavatorIcon,
			image:
				'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&w=1600&q=80',
			alt: 'Compact track loader smoothing a driveway.',
			items: [
				'Regrade gravel and stone driveways after heavy use or seasonal wear',
				'Level shed pads, patios, and walkways for new improvements',
				'Repair drainage ditches and touch up swales for better flow'
			]
		},
		{
			title: 'Hauling & material delivery',
			description:
				'Bring in gravel, soil, mulch, or stone and haul off debris without tearing up your yard or driveway.',
			icon: ServiceIcon,
			image:
				'https://images.unsplash.com/photo-1583525374614-85244a6c78de?auto=format&fit=crop&w=1600&q=80',
			alt: 'Dump truck delivering stone for a driveway project.',
			items: [
				'Deliver gravel, rock, mulch, and topsoil where you need it',
				'Haul away spoils, brush, and jobsite debris after cleanups',
				'Coordinate disposal sites and timing to keep your project moving'
			]
		},
		{
			title: 'Small tractor projects & grading touch-ups',
			description:
				'Use compact tractors and attachments to fine-tune yards, drainage paths, and landscape beds.',
			icon: WaterIcon,
			image:
				'https://images.unsplash.com/photo-1523419409543-0c1df022bdd7?auto=format&fit=crop&w=1600&q=80',
			alt: 'Tractor shaping soil along a residential lawn.',
			items: [
				'Box blade driveways, lanes, and parking pads to smooth ruts',
				'Cut shallow swales to guide water away from structures',
				'Prep lawns and landscape beds for seeding or planting'
			]
		},
		{
			title: 'Bush hogging & property cleanup',
			description:
				'Knock down overgrowth and reclaim fields, ditches, and roadside edges with professional equipment.',
			icon: MaintenanceIcon,
			image:
				'https://images.unsplash.com/photo-1505692521665-9aa23dd80c2c?auto=format&fit=crop&w=1600&q=80',
			alt: 'Tractor cutting tall grass across a pasture.',
			items: [
				'Maintain acreage, vacant lots, and rights-of-way throughout the season',
				'Clear fence lines, drainage easements, and pond banks',
				'Remove limbs and debris so the site is ready for your next steps'
			]
		}
	] as const;
</script>

<svelte:head>
	<title>Services | AW Vaughan Company</title>
	<meta
		name="description"
		content="Explore AW Vaughan Company's owner-operated services: light grading, hauling, small tractor work, bush hogging, and driveway resurfacing across Hampton Roads."
	/>
</svelte:head>

<section
	class="border-b border-white/10 bg-gradient-to-b from-[var(--brand-navy-900)] to-[var(--brand-navy-800)] py-20"
>
	<div class="mx-auto max-w-5xl px-6">
		<p class="text-sm font-semibold tracking-[0.35em] text-[var(--brand-teal)] uppercase">
			Services
		</p>
		<h1 class="mt-4 text-4xl font-bold text-white sm:text-5xl">
			Hands-on services for your property or project
		</h1>
		<p class="mt-6 text-lg leading-relaxed text-slate-200">
			AW Vaughan Company is an owner-operated contractor serving Virginia Beach, Norfolk,
			Chesapeake, and the surrounding Hampton Roads region. From light grading and driveway
			resurfacing to hauling, small tractor work, and bush hogging, every service is delivered with
			personal attention.
		</p>
	</div>
</section>

<section class="border-b border-white/10 bg-[var(--brand-navy-900)] py-16">
	<div class="mx-auto max-w-6xl px-6">
		<div class="grid gap-8 md:grid-cols-2">
			{#each offerings as offering (offering.title)}
				<article
					class="group relative overflow-hidden rounded-4xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/25 transition hover:border-white/40 hover:shadow-2xl"
				>
					<div
						class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
					>
						<img src={offering.image} alt={offering.alt} class="h-full w-full object-cover" />
						<div
							class="absolute inset-0 bg-gradient-to-br from-[var(--brand-navy-900)]/85 via-[var(--brand-navy-800)]/70 to-black/70"
						></div>
					</div>

					<div class="relative z-10 flex h-full flex-col gap-4">
						<span
							class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-[var(--brand-orange)] shadow-inner shadow-black/40"
						>
							<svelte:component this={offering.icon} class="h-6 w-6" />
						</span>
						<h2 class="text-2xl font-semibold text-white">{offering.title}</h2>
						<p class="text-sm leading-relaxed text-slate-200">{offering.description}</p>
						<ul class="mt-4 space-y-3 text-sm leading-relaxed text-slate-200">
							{#each offering.items as item (item)}
								<li class="flex items-start gap-2">
									<span
										aria-hidden="true"
										class="mt-1 inline-flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--brand-orange)]"
									></span>
									<span>{item}</span>
								</li>
							{/each}
						</ul>
						<div class="mt-auto pt-4">
							<a
								href={resolve('/contact')}
								class="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.32em] text-[var(--brand-teal)] uppercase transition hover:text-[var(--brand-orange)]"
							>
								Request a quote
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

<section class="bg-gradient-to-b from-[var(--brand-navy-900)] to-[var(--brand-navy-800)] py-20">
	<div class="mx-auto max-w-5xl px-6">
		<div
			class="rounded-4xl border border-white/10 bg-white/5 p-10 text-center shadow-xl shadow-black/35"
		>
			<h2 class="text-3xl font-bold text-white sm:text-4xl">Ready for your next project?</h2>
			<p class="mt-4 text-base text-slate-200 sm:text-lg">
				Let me know what you need—whether it’s refreshing a driveway, taming overgrowth, or hauling
				materials. I’ll build a plan that respects your schedule and budget.
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
					href="mailto:alex.vaughan@awvaughan.com"
				>
					<span class="h-2 w-2 rounded-full bg-[var(--brand-orange)]" aria-hidden="true"></span>
					alex.vaughan@awvaughan.com
				</a>
				<span class="hidden h-4 w-px bg-white/20 sm:inline" aria-hidden="true"></span>
				<a
					class="inline-flex items-center gap-2 transition hover:text-[var(--brand-orange)]"
					href="tel:+17574021100"
				>
					<span class="h-2 w-2 rounded-full bg-[var(--brand-orange)]" aria-hidden="true"></span>
					(757) 402-1100
				</a>
			</div>
			<div class="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
				<a
					href={resolve('/contact')}
					class="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-orange)] px-6 py-3 text-sm font-semibold tracking-[0.28em] text-[var(--brand-navy-900)] uppercase shadow-[var(--brand-orange)]/35 shadow-lg transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-cream)] sm:text-base"
				>
					Start a conversation
				</a>
				<a
					href="tel:+17574021100"
					class="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold tracking-[0.28em] text-white uppercase transition hover:border-white/60 hover:bg-white/20 sm:text-base"
				>
					Call (757) 402-1100
				</a>
			</div>
		</div>
	</div>
</section>
