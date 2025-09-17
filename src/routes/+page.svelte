<script lang="ts">
	import { Hero } from '$lib';
</script>

<svelte:head>
	<title>AW Vaughan — Strategic Web Design Studio</title>
	<meta
		name="description"
		content="Crafting conversion-driven websites for brands ready to stand out online."
	/>
</svelte:head>

<Hero />

<section id="services" class="border-b border-white/5 bg-slate-950 py-20">
	<div class="mx-auto max-w-6xl px-6">
		<p class="text-sm font-semibold tracking-[0.3em] text-cyan-300 uppercase">What We Do</p>
		<h2 class="mt-4 text-3xl font-bold text-white sm:text-4xl">
			A strategic partner for every stage
		</h2>
		<p class="mt-3 max-w-2xl text-base text-slate-300 sm:text-lg">
			From first impressions to final conversions, our collaborative process keeps your goals at the
			center. Here's how we bring your brand to life online.
		</p>

		<div class="mt-12 grid gap-8 md:grid-cols-3">
			<div class="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg shadow-cyan-500/5">
				<h3 class="text-xl font-semibold text-white">Brand Discovery</h3>
				<p class="mt-3 text-sm leading-relaxed text-slate-300">
					Deep research and positioning workshops align your story, audience, and business goals for
					a compelling digital presence.
				</p>
			</div>
			<div class="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg shadow-cyan-500/5">
				<h3 class="text-xl font-semibold text-white">Experience Design</h3>
				<p class="mt-3 text-sm leading-relaxed text-slate-300">
					High-fidelity design systems, prototypes, and interactions guide visitors seamlessly from
					curiosity to conversion.
				</p>
			</div>
			<div class="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg shadow-cyan-500/5">
				<h3 class="text-xl font-semibold text-white">Launch &amp; Support</h3>
				<p class="mt-3 text-sm leading-relaxed text-slate-300">
					Performance-optimized builds, analytics, and continuous support keep your site evolving
					with your ambitions.
				</p>
			</div>
		</div>
	</div>
</section>

<section id="contact" class="bg-gradient-to-b from-slate-950 to-slate-900 py-20">
	<div
		class="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 px-6 py-16 text-center shadow-xl shadow-cyan-500/10"
	>
		<p class="text-sm font-semibold tracking-[0.3em] text-cyan-300 uppercase">Let’s collaborate</p>
		<h2 class="mt-4 text-3xl font-bold text-white sm:text-4xl">
			Ready to create your next big moment?
		</h2>
		<p class="mt-3 text-base text-slate-300 sm:text-lg">
			Share your vision and we’ll craft a plan that aligns every pixel with your purpose. Reach out
			to start the conversation.
		</p>
		<div
			class="mt-8 flex flex-col items-center justify-center gap-4 text-sm text-slate-300 sm:flex-row sm:text-base"
		>
			<a
				class="inline-flex items-center gap-2 transition hover:text-cyan-300"
				href="mailto:hello@awvaughan.com"
			>
				<span class="h-2 w-2 rounded-full bg-cyan-400" aria-hidden="true"></span>
				hello@awvaughan.com
			</a>
			<span class="hidden h-4 w-px bg-white/20 sm:inline" aria-hidden="true"></span>
			<a
				class="inline-flex items-center gap-2 transition hover:text-cyan-300"
				href="tel:+1234567890"
			>
				<span class="h-2 w-2 rounded-full bg-cyan-400" aria-hidden="true"></span>
				+1 (234) 567-890
			</a>
		</div>
	</div>
</section>
