<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<section
	id="hero"
	class="relative isolate min-h-[75vh] overflow-hidden border-b border-white/5 bg-slate-950"
>
	<!-- Full-bleed hero image -->
	<img
		src="https://images.unsplash.com/photo-1503389152951-9f343605f61e?auto=format&fit=crop&w=1920&q=80"
		alt="Crew performing sitework with heavy equipment near the Atlantic coast"
		class="absolute inset-0 h-full w-full object-cover object-center"
	/>

	<!-- Soft readability overlay -->
	<div
		class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/30 to-transparent"
	></div>

	<!-- Optional cyan top glow (kept, but under text) -->
	<div
		class="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-cyan-500/20 via-transparent to-transparent"
	></div>

	<!-- Text/content on top of image -->
	<div class="relative z-10 mx-auto max-w-6xl px-6 py-20 sm:py-24 lg:py-28">
		<div class="max-w-3xl">
			<p class="text-sm font-semibold tracking-[0.3em] text-cyan-300 uppercase">
				Sitework &amp; Property Maintenance
			</p>

			<h1 class="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl xl:text-6xl">
				Proven site solutions for Hampton Roads properties.
			</h1>

			<p class="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
				AW Vaughan Company is a Virginia Beach–based sitework and property maintenance contractor
				delivering grading, drainage, and grounds support for builders, HOAs, and facility managers
				across Hampton Roads.
			</p>

			<p class="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
				We are a small, hands-on crew who keeps communication clear, respects your schedule, and
				stands behind every job we touch.
			</p>

			<div class="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
				<a
					href={resolve('/contact')}
					class="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold tracking-[0.25em] text-slate-950 uppercase transition hover:-translate-y-0.5 hover:bg-cyan-300"
				>
					Contact Us
				</a>

				<div class="flex items-center gap-4 text-left text-sm text-slate-300">
					<div
						class="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sm font-semibold text-cyan-300"
					>
						VA
					</div>
					<p class="max-w-[12rem]">
						Local expertise for Virginia Beach, Norfolk, Chesapeake, and the greater Hampton Roads
						region.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
