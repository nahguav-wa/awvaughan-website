<script lang="ts">
	import { resolve } from '$app/paths';
	import { Hero } from '$lib';

	const email = 'alex.vaughan@awvaughan.com';
	const phoneLabel = '(757) 402-1100';
</script>

<svelte:head>
	<title>AW Vaughan Company — Sitework &amp; Property Maintenance in Virginia Beach, VA</title>
	<meta
		name="description"
		content="AW Vaughan Company provides dependable sitework, grading, drainage, and property maintenance services for builders, HOAs, and property managers across Virginia Beach and Hampton Roads."
	/>
</svelte:head>

<Hero />

<section id="services" class="border-b border-white/5 bg-slate-950 py-20">
	<div class="mx-auto max-w-6xl px-6">
		<p class="text-sm font-semibold tracking-[0.3em] text-cyan-300 uppercase">Our Capabilities</p>
		<h2 class="mt-4 text-3xl font-bold text-white sm:text-4xl">
			Site-ready solutions from one reliable crew
		</h2>
		<p class="mt-3 max-w-2xl text-base text-slate-300 sm:text-lg">
			We partner with general contractors, property managers, and community associations throughout
			Virginia Beach and the greater Hampton Roads area. Count on us for responsive field
			leadership, tidy work zones, and crews who respect your properties.
		</p>

		<div class="mt-12 grid gap-8 md:grid-cols-3">
			<div class="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg shadow-cyan-500/5">
				<h3 class="text-xl font-semibold text-white">Sitework &amp; Grading</h3>
				<p class="mt-3 text-sm leading-relaxed text-slate-300">
					Precise earthwork, grading, and drainage improvements that prepare infill lots, additions,
					and amenities for the next trade.
				</p>
			</div>
			<div class="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg shadow-cyan-500/5">
				<h3 class="text-xl font-semibold text-white">Property Maintenance</h3>
				<p class="mt-3 text-sm leading-relaxed text-slate-300">
					Scheduled mowing, cleanups, repairs, and seasonal upkeep tailored to the coastal climate
					so your sites stay safe and welcoming year-round.
				</p>
			</div>
			<div class="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg shadow-cyan-500/5">
				<h3 class="text-xl font-semibold text-white">Storm &amp; Emergency Response</h3>
				<p class="mt-3 text-sm leading-relaxed text-slate-300">
					Rapid storm cleanup, washout mitigation, and after-hours calls handled quickly so you can
					protect assets and restore access without delay.
				</p>
			</div>
		</div>
	</div>
</section>

<section id="contact" class="bg-gradient-to-b from-slate-950 to-slate-900 py-20">
	<div
		class="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 px-6 py-16 text-center shadow-xl shadow-cyan-500/10"
	>
		<p class="text-sm font-semibold tracking-[0.3em] text-cyan-300 uppercase">Let’s get to work</p>
		<h2 class="mt-4 text-3xl font-bold text-white sm:text-4xl">
			Count on AW Vaughan Company for responsive support
		</h2>
		<p class="mt-3 text-base text-slate-300 sm:text-lg">
			Share your scope, timeline, and maintenance needs. We’ll provide a plan that keeps your
			property accessible, safe, and ready for the next milestone.
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
				{email}
			</a>
			<span class="hidden h-4 w-px bg-white/20 sm:inline" aria-hidden="true"></span>
			<a
				class="inline-flex items-center gap-2 transition hover:text-cyan-300"
				href="tel:+17574021100"
			>
				<span class="h-2 w-2 rounded-full bg-cyan-400" aria-hidden="true"></span>
				{phoneLabel}
			</a>
		</div>
		<div class="mt-10 flex justify-center">
			<a
				class="inline-flex items-center justify-center rounded-full border border-cyan-400/70 px-6 py-3 text-sm font-semibold tracking-[0.25em] text-cyan-300 uppercase transition hover:-translate-y-0.5 hover:border-cyan-300 hover:text-white sm:text-base"
				href={resolve('/contact')}
			>
				Visit the Contact Page
			</a>
		</div>
	</div>
</section>
