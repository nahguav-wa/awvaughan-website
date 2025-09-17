<script lang="ts">
	import { resolve } from '$app/paths';
	import CoastalIcon from '$lib/components/icons/CoastalIcon.svelte';
	import LeadershipIcon from '$lib/components/icons/LeadershipIcon.svelte';
	import ServiceIcon from '$lib/components/icons/ServiceIcon.svelte';
	import type { ComponentType } from 'svelte';

	const values: readonly {
		title: string;
		description: string;
		icon: ComponentType;
	}[] = [
		{
			title: 'Grounded in service',
			description:
				'Clients count on steady communication and careful workmanship. I show up prepared, keep jobsites tidy, and deliver when I say I will.',
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

	const steps = [
		{
			title: 'Walk the site',
			description:
				'I meet with you in person to understand the scope, inspect site conditions, and review scheduling needs or access constraints.'
		},
		{
			title: 'Plan the work',
			description:
				'You receive a clear proposal outlining equipment, materials, and timeline so you know what to expect before I mobilize.'
		},
		{
			title: 'Deliver consistently',
			description:
				'I execute safely and efficiently—bringing in trusted partners only when needed—and leave the site ready for the next trade.'
		}
	] as const;

	const certifications = [
		{ label: 'Virginia Class A Contractor', detail: 'License #2705181906' },
		{ label: 'SWaM-certified small business', detail: 'Commonwealth of Virginia' },
		{ label: 'OSHA 30 & CPR trained', detail: 'Jobsite safety is my baseline' }
	] as const;

	const serviceArea = [
		'Virginia Beach',
		'Norfolk',
		'Chesapeake',
		'Portsmouth',
		'Suffolk',
		'Greater Hampton Roads'
	] as const;
</script>

<svelte:head>
	<title>About AW Vaughan Company | Owner-Operated Land Services</title>
	<meta
		name="description"
		content="Learn how owner Alex Vaughan delivers light grading, hauling, bush hogging, and driveway care to Virginia Beach and Hampton Roads properties."
	/>
</svelte:head>

<section
	class="border-b border-white/10 bg-gradient-to-b from-[var(--brand-navy-900)] to-[var(--brand-navy-800)] py-20"
>
	<div class="mx-auto max-w-5xl px-6">
		<p class="text-sm font-semibold tracking-[0.35em] text-[var(--brand-teal)] uppercase">
			About us
		</p>
		<h1 class="mt-4 text-4xl font-bold text-white sm:text-5xl">
			Owner-operated land services rooted in Hampton Roads
		</h1>
		<p class="mt-6 text-lg leading-relaxed text-slate-200">
			AW Vaughan Company is a Virginia Beach–based contractor owned and operated by Alex Vaughan. I
			help homeowners, small businesses, and property managers with light grading, hauling, bush
			hogging, driveway resurfacing, and year-round site support.
		</p>
		<p class="mt-4 text-lg leading-relaxed text-slate-200">
			Years on heavy civil projects taught me the value of planning, documentation, and safety. Now
			I bring that same discipline to every small-scale scope while keeping communication direct and
			personal.
		</p>
	</div>
</section>

<section class="border-b border-white/10 bg-[var(--brand-navy-800)] py-16">
	<div class="mx-auto max-w-6xl px-6">
		<div class="grid gap-8 md:grid-cols-3">
			{#each values as value (value.title)}
				<article
					class="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/25 transition hover:border-white/40 hover:bg-white/10"
				>
					<span
						class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-[var(--brand-orange)] shadow-inner shadow-black/40"
					>
						<svelte:component this={value.icon} class="h-6 w-6" />
					</span>
					<h2 class="mt-6 text-xl font-semibold text-white">{value.title}</h2>
					<p class="mt-3 text-sm leading-relaxed text-slate-200">{value.description}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<section
	class="border-b border-white/10 bg-gradient-to-br from-[var(--brand-navy-900)] via-[var(--brand-navy-800)] to-black py-20"
>
	<div class="mx-auto max-w-5xl px-6">
		<div class="flex flex-col gap-10 lg:flex-row lg:items-center">
			<div class="flex-1 space-y-4">
				<p class="text-sm font-semibold tracking-[0.35em] text-[var(--brand-teal)] uppercase">
					Our process
				</p>
				<h2 class="text-3xl font-bold text-white sm:text-4xl">What to expect when you call Alex</h2>
				<p class="text-base text-slate-200 sm:text-lg">
					Every project starts with a conversation. I listen first, align on expectations, and
					communicate throughout the job so there are no surprises along the way.
				</p>
			</div>
			<div
				class="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/35 lg:w-80"
			>
				<p class="text-xs font-semibold tracking-[0.35em] text-[var(--brand-orange)] uppercase">
					Credentials
				</p>
				<ul class="mt-4 space-y-3 text-sm text-slate-200">
					{#each certifications as item (item.label)}
						<li>
							<p class="font-semibold text-white">{item.label}</p>
							<p>{item.detail}</p>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="mt-12 grid gap-8 md:grid-cols-3">
			{#each steps as step, index (step.title)}
				<article
					class="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg shadow-black/30"
				>
					<div
						class="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-orange)]/10 text-sm font-semibold text-[var(--brand-orange)]"
					>
						{index + 1}
					</div>
					<h3 class="mt-4 text-lg font-semibold text-white">{step.title}</h3>
					<p class="mt-3 text-sm leading-relaxed text-slate-200">{step.description}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<section class="border-b border-white/10 bg-[var(--brand-navy-900)] py-20">
	<div class="mx-auto flex max-w-6xl flex-col gap-10 px-6 lg:flex-row">
		<div class="flex-1 space-y-4">
			<p class="text-sm font-semibold tracking-[0.35em] text-[var(--brand-teal)] uppercase">
				Service area
			</p>
			<h2 class="text-3xl font-bold text-white sm:text-4xl">Proud to serve Hampton Roads</h2>
			<p class="text-base text-slate-200 sm:text-lg">
				From the Oceanfront to inland logistics hubs, I support properties across the region with
				responsive maintenance and site services.
			</p>
			<ul class="mt-6 grid grid-cols-1 gap-3 text-sm text-slate-200 sm:grid-cols-2">
				{#each serviceArea as area (area)}
					<li class="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2">
						<span
							aria-hidden="true"
							class="inline-flex h-1.5 w-1.5 rounded-full bg-[var(--brand-orange)]"
						></span>
						{area}
					</li>
				{/each}
			</ul>
		</div>
		<div class="flex-1 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/30">
			<svg
				viewBox="0 0 320 200"
				class="h-full w-full"
				role="img"
				aria-labelledby="mapTitle mapDesc"
			>
				<title id="mapTitle">Stylized service map of Hampton Roads</title>
				<desc id="mapDesc"
					>Illustrative map highlighting the Hampton Roads region where AW Vaughan Company works.</desc
				>
				<defs>
					<linearGradient id="gradient" x1="0" x2="1" y1="1" y2="0">
						<stop offset="0" stop-color="var(--brand-navy-900)" />
						<stop offset="1" stop-color="var(--brand-teal)" />
					</linearGradient>
				</defs>
				<path
					d="M40 140 C80 60, 160 40, 240 70 C280 90, 300 120, 260 150 C220 180, 140 190, 80 170 Z"
					fill="url(#gradient)"
					stroke="rgba(255,255,255,0.4)"
					stroke-width="3"
				/>
				<g fill="var(--brand-orange)">
					<circle cx="120" cy="120" r="6" />
					<circle cx="200" cy="110" r="6" />
					<circle cx="170" cy="150" r="6" />
				</g>
				<g fill="white" font-size="12" font-weight="600">
					<text x="110" y="115">VB</text>
					<text x="192" y="105">NOR</text>
					<text x="160" y="145">CHS</text>
				</g>
			</svg>
		</div>
	</div>
</section>

<section class="bg-gradient-to-b from-[var(--brand-navy-900)] to-[var(--brand-navy-800)] py-20">
	<div
		class="mx-auto max-w-4xl rounded-4xl border border-white/10 bg-white/5 px-6 py-12 text-center shadow-xl shadow-black/35"
	>
		<p class="text-sm font-semibold tracking-[0.35em] text-[var(--brand-teal)] uppercase">
			Ready when you are
		</p>
		<h2 class="mt-4 text-3xl font-bold text-white sm:text-4xl">Let’s plan your next project</h2>
		<p class="mt-3 text-base text-slate-200 sm:text-lg">
			Share your scope, maintenance needs, or project ideas. I’ll respond quickly with the
			information you need to move forward.
		</p>
		<div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
			<a
				href={resolve('/services')}
				class="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-orange)] px-6 py-3 text-sm font-semibold tracking-[0.28em] text-[var(--brand-navy-900)] uppercase shadow-[var(--brand-orange)]/35 shadow-lg transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-cream)]"
			>
				Explore our services
			</a>
			<a
				href={resolve('/contact')}
				class="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold tracking-[0.28em] text-white uppercase transition hover:border-white/60 hover:bg-white/20"
			>
				Contact Alex
			</a>
		</div>
	</div>
</section>
