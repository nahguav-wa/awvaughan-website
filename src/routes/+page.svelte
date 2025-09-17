<script lang="ts">
	import { Hero } from '$lib';
</script>

<svelte:head>
	<title>AW Vaughan Company — Sitework &amp; Property Maintenance Contractors</title>
	<meta
		name="description"
		content="AW Vaughan Company provides dependable sitework, grading, drainage, and property maintenance services for builders, HOAs, and property managers across North Georgia."
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
			We partner with general contractors, property managers, and community associations to deliver
			responsive work that keeps your timelines on track and your grounds looking their best.
		</p>

		<div class="mt-12 grid gap-8 md:grid-cols-3">
			<div class="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg shadow-cyan-500/5">
				<h3 class="text-xl font-semibold text-white">Sitework &amp; Grading</h3>
				<p class="mt-3 text-sm leading-relaxed text-slate-300">
					Precise earthwork, grading, and drainage improvements that prepare residential and
					commercial sites for concrete, asphalt, and landscaping crews.
				</p>
			</div>
			<div class="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg shadow-cyan-500/5">
				<h3 class="text-xl font-semibold text-white">Property Maintenance</h3>
				<p class="mt-3 text-sm leading-relaxed text-slate-300">
					Scheduled mowing, cleanups, light repairs, and seasonal upkeep to keep your properties
					safe, clean, and welcoming for residents and visitors.
				</p>
			</div>
			<div class="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg shadow-cyan-500/5">
				<h3 class="text-xl font-semibold text-white">Emergency Response</h3>
				<p class="mt-3 text-sm leading-relaxed text-slate-300">
					Storm cleanup, washout mitigation, and after-hours calls handled quickly so you can
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
			property safe, accessible, and ready for whatever comes next.
		</p>
		<div
			class="mt-8 flex flex-col items-center justify-center gap-4 text-sm text-slate-300 sm:flex-row sm:text-base"
		>
			<a
				class="inline-flex items-center gap-2 transition hover:text-cyan-300"
				href="mailto:info@awvaughan.com"
			>
				<span class="h-2 w-2 rounded-full bg-cyan-400" aria-hidden="true"></span>
				info@awvaughan.com
			</a>
			<span class="hidden h-4 w-px bg-white/20 sm:inline" aria-hidden="true"></span>
			<a
				class="inline-flex items-center gap-2 transition hover:text-cyan-300"
				href="tel:+17705551234"
			>
				<span class="h-2 w-2 rounded-full bg-cyan-400" aria-hidden="true"></span>
				(770) 555-1234
			</a>
		</div>
	</div>
</section>
