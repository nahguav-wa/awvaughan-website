<script lang="ts">
	import { resolve } from '$app/paths';

	const offerings = [
		{
			title: 'Sitework & Earthwork',
			description:
				'Grading, excavation, and prep work that set the foundation for residential and commercial improvements across Hampton Roads.',
			items: [
				'Cut/fill balancing for new builds, additions, and amenities',
				'Fine grading for slabs, driveways, and hardscape crews',
				'Structural fill placement, compaction, and haul off'
			]
		},
		{
			title: 'Drainage & Utilities',
			description:
				'Solutions that keep water moving in coastal environments and protect your investment in infrastructure.',
			items: [
				'French drains, swales, and erosion control installations',
				'Downspout tie-ins, stormwater repairs, and culvert resets',
				'Trenching and backfill for light utility upgrades'
			]
		},
		{
			title: 'Property Maintenance',
			description:
				'Ongoing care for neighborhoods, campuses, and commercial spaces tailored to Virginia Beach’s climate.',
			items: [
				'Seasonal mowing, edging, and landscape cleanups',
				'Parking lot sweeping, debris removal, and disposal',
				'Light carpentry, fencing, and amenity upkeep'
			]
		},
		{
			title: 'Responsive Support',
			description:
				'We are on call when the weather turns or unexpected issues arise, minimizing downtime for your residents or crews.',
			items: [
				'Storm cleanup and washout mitigation',
				'Emergency board-ups and site safety repairs',
				'Weekend and after-hours mobilization when needed'
			]
		}
	];
</script>

<svelte:head>
	<title>Services | AW Vaughan Company</title>
	<meta
		name="description"
		content="Explore AW Vaughan Company's sitework, drainage, maintenance, and emergency response services for Virginia Beach and Hampton Roads properties."
	/>
</svelte:head>

<section class="border-b border-white/5 bg-slate-950 py-20">
	<div class="mx-auto max-w-5xl px-6">
		<p class="text-sm font-semibold tracking-[0.3em] text-cyan-300 uppercase">Services</p>
		<h1 class="mt-4 text-4xl font-bold text-white sm:text-5xl">
			Comprehensive care for your job sites and communities
		</h1>
		<p class="mt-6 text-lg leading-relaxed text-slate-300">
			AW Vaughan Company delivers sitework, drainage, and property maintenance services for clients
			throughout Virginia Beach, Norfolk, Chesapeake, and the surrounding Hampton Roads region. We
			tailor each scope to your timeline and budget while maintaining the level of detail you expect
			from an owner-led crew.
		</p>
	</div>
</section>

<section class="border-b border-white/5 bg-slate-950 py-16">
	<div class="mx-auto max-w-6xl px-6">
		<div class="grid gap-8 md:grid-cols-2">
			{#each offerings as offering (offering.title)}
				<div class="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg shadow-cyan-500/5">
					<h2 class="text-2xl font-semibold text-white">{offering.title}</h2>
					<p class="mt-3 text-sm leading-relaxed text-slate-300">{offering.description}</p>
					<ul class="mt-5 space-y-2 text-sm leading-relaxed text-slate-300">
						{#each offering.items as item (item)}
							<li class="flex items-start gap-2">
								<span
									class="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400"
									aria-hidden="true"
								></span>
								<span>{item}</span>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="bg-gradient-to-b from-slate-950 to-slate-900 py-20">
	<div class="mx-auto max-w-5xl px-6">
		<div
			class="rounded-3xl border border-white/10 bg-white/5 p-10 text-center shadow-xl shadow-cyan-500/10"
		>
			<h2 class="text-3xl font-bold text-white sm:text-4xl">Ready for your next project?</h2>
			<p class="mt-4 text-base text-slate-300 sm:text-lg">
				Let us know what you need—whether it’s breaking ground on a new build or keeping established
				properties looking their best. We’ll put together a plan that respects your schedule and
				budget.
			</p>
			<div
				class="mt-8 flex flex-col items-center justify-center gap-4 text-sm text-slate-300 sm:flex-row sm:text-base"
			>
				<div class="inline-flex items-center gap-2">
					<span class="h-2 w-2 rounded-full bg-cyan-400" aria-hidden="true"></span>
					Virginia Beach, Virginia
				</div>
				<span class="hidden h-4 w-px bg-white/20 sm:inline" aria-hidden="true"></span>
				<a
					class="inline-flex items-center gap-2 transition hover:text-cyan-300"
					href="mailto:alex.vaughan@awvaughan.com"
				>
					<span class="h-2 w-2 rounded-full bg-cyan-400" aria-hidden="true"></span>
					alex.vaughan@awvaughan.com
				</a>
				<span class="hidden h-4 w-px bg-white/20 sm:inline" aria-hidden="true"></span>
				<a
					class="inline-flex items-center gap-2 transition hover:text-cyan-300"
					href="tel:+17574021100"
				>
					<span class="h-2 w-2 rounded-full bg-cyan-400" aria-hidden="true"></span>
					(757) 402-1100
				</a>
			</div>
			<div class="mt-10">
				<a
					href={resolve('/contact')}
					class="inline-flex items-center justify-center rounded-full border border-cyan-400/70 px-6 py-3 text-sm font-semibold tracking-[0.25em] text-cyan-300 uppercase transition hover:-translate-y-0.5 hover:border-cyan-300 hover:text-white sm:text-base"
				>
					Start a Conversation
				</a>
			</div>
		</div>
	</div>
</section>
