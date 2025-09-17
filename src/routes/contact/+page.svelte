<script lang="ts">
	const commitments = [
		{
			title: 'Quick response',
			description:
				'We return calls and emails promptly so you can move forward with confidence. Share your timeline and we will work to align our crew availability.'
		},
		{
			title: 'Transparent proposals',
			description:
				'Expect clear scopes with equipment, materials, and scheduling outlined up front. No surprises—just honest pricing and reliable work.'
		},
		{
			title: 'Safety & stewardship',
			description:
				'We maintain safe, tidy sites and respect the neighborhoods we serve. Our team leaves each property ready for residents, guests, or the next trade.'
		}
	];
</script>

<svelte:head>
	<title>Contact AW Vaughan Company | Sitework & Maintenance in Virginia Beach</title>
	<meta
		name="description"
		content="Contact AW Vaughan Company at (757) 402-1100 or alex.vaughan@awvaughan.com for sitework, drainage, and property maintenance services in Virginia Beach and Hampton Roads."
	/>
</svelte:head>

<section class="border-b border-white/5 bg-slate-950 py-20">
	<div class="mx-auto max-w-5xl px-6">
		<p class="text-sm font-semibold tracking-[0.3em] text-cyan-300 uppercase">Contact</p>
		<h1 class="mt-4 text-4xl font-bold text-white sm:text-5xl">Let’s plan your next project</h1>
		<p class="mt-6 text-lg leading-relaxed text-slate-300">
			Share your scope, maintenance needs, or emergency request below. We’ll respond quickly with
			the information you need to move forward.
		</p>
	</div>
</section>

<section class="border-b border-white/5 bg-slate-950 py-16">
	<div class="mx-auto max-w-6xl px-6">
		<div class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
			<div class="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg shadow-cyan-500/5">
				<h2 class="text-2xl font-semibold text-white">Talk with our team</h2>
				<p class="mt-4 text-sm leading-relaxed text-slate-300">
					Reach out using the details provided and let us know how we can help. Include site
					location, target schedule, and any drawings or photos that will help us prepare.
				</p>
				<ul class="mt-6 space-y-4 text-sm leading-relaxed text-slate-300">
					<li>
						<p class="text-xs font-semibold tracking-[0.3em] text-cyan-300 uppercase">Phone</p>
						<a
							class="mt-1 inline-flex items-center gap-2 text-base text-white transition hover:text-cyan-300"
							href="tel:+17574021100"
						>
							<span class="h-1.5 w-1.5 rounded-full bg-cyan-400" aria-hidden="true"></span>
							(757) 402-1100
						</a>
					</li>
					<li>
						<p class="text-xs font-semibold tracking-[0.3em] text-cyan-300 uppercase">Email</p>
						<a
							class="mt-1 inline-flex items-center gap-2 text-base text-white transition hover:text-cyan-300"
							href="mailto:alex.vaughan@awvaughan.com"
						>
							<span class="h-1.5 w-1.5 rounded-full bg-cyan-400" aria-hidden="true"></span>
							alex.vaughan@awvaughan.com
						</a>
					</li>
					<li>
						<p class="text-xs font-semibold tracking-[0.3em] text-cyan-300 uppercase">
							Service Area
						</p>
						<p class="mt-1 text-base text-white">
							Virginia Beach, Norfolk, Chesapeake, and the greater Hampton Roads region
						</p>
					</li>
				</ul>
				<div
					class="mt-8 rounded-2xl border border-cyan-400/40 bg-cyan-400/10 p-6 text-sm text-slate-200"
				>
					<p class="font-semibold text-white">Prefer email?</p>
					<p class="mt-2">
						Send project details and attachments to
						<a
							class="font-semibold text-cyan-300 transition hover:text-cyan-200"
							href="mailto:alex.vaughan@awvaughan.com"
						>
							alex.vaughan@awvaughan.com
						</a>
						and we’ll schedule a follow-up call.
					</p>
				</div>
			</div>

			<div class="space-y-6">
				{#each commitments as commitment (commitment.title)}
					<div
						class="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg shadow-cyan-500/5"
					>
						<h3 class="text-xl font-semibold text-white">{commitment.title}</h3>
						<p class="mt-3 text-sm leading-relaxed text-slate-300">{commitment.description}</p>
					</div>
				{/each}
				<div class="rounded-3xl border border-white/10 bg-slate-950/60 p-8 text-center">
					<p class="text-sm font-semibold tracking-[0.3em] text-cyan-300 uppercase">
						Need fast help?
					</p>
					<p class="mt-3 text-base text-slate-300">
						Call us at
						<a
							class="font-semibold text-white transition hover:text-cyan-300"
							href="tel:+17574021100"
						>
							(757) 402-1100
						</a>
						for urgent storm response or safety repairs.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="bg-gradient-to-b from-slate-950 to-slate-900 py-20">
	<div class="mx-auto max-w-4xl px-6 text-center">
		<h2 class="text-3xl font-bold text-white sm:text-4xl">We look forward to working with you</h2>
		<p class="mt-4 text-base text-slate-300 sm:text-lg">
			Tell us about your project, community, or maintenance program. We’ll follow up with next steps
			and a plan tailored to your goals.
		</p>
		<div class="mt-10 flex justify-center">
			<a
				href="tel:+17574021100"
				class="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold tracking-[0.25em] text-slate-950 uppercase transition hover:-translate-y-0.5 hover:bg-cyan-300 sm:text-base"
			>
				Call (757) 402-1100
			</a>
		</div>
	</div>
</section>
