<script lang="ts">
	import { resolve } from '$app/paths';

	const values = [
		{
			title: 'Grounded in Service',
			description:
				'Clients count on us for steady communication and reliable crews. We show up prepared, keep job sites tidy, and finish when we say we will.'
		},
		{
			title: 'Coastal Expertise',
			description:
				'From sandy soils to salt-laden air, Hampton Roads presents unique challenges. We tailor solutions that stand up to local conditions.'
		},
		{
			title: 'Hands-On Leadership',
			description:
				'Owner Alex Vaughan stays engaged from estimate through closeout, ensuring every detail reflects our standards and your expectations.'
		}
	];

	const steps = [
		{
			title: 'Walk the site',
			description:
				'We meet with you in person to understand the scope, inspect site conditions, and review scheduling needs or access constraints.'
		},
		{
			title: 'Plan the work',
			description:
				'You receive a clear proposal outlining crew size, equipment, and timeline so you know what to expect before we mobilize.'
		},
		{
			title: 'Deliver consistently',
			description:
				'Our team executes the plan safely and efficiently, communicating updates along the way and leaving the site ready for the next trade.'
		}
	];
</script>

<svelte:head>
	<title>About AW Vaughan Company | Virginia Beach Sitework Contractors</title>
	<meta
		name="description"
		content="Learn about AW Vaughan Company, a Virginia Beach, VA sitework and property maintenance contractor serving Hampton Roads with responsive leadership and quality workmanship."
	/>
</svelte:head>

<section class="border-b border-white/5 bg-slate-950 py-20">
	<div class="mx-auto max-w-5xl px-6">
		<p class="text-sm font-semibold tracking-[0.3em] text-cyan-300 uppercase">About Us</p>
		<h1 class="mt-4 text-4xl font-bold text-white sm:text-5xl">
			Built on service, grounded in integrity
		</h1>
		<p class="mt-6 text-lg leading-relaxed text-slate-300">
			AW Vaughan Company is a sitework and property maintenance contractor based in Virginia Beach,
			Virginia. We partner with builders, HOAs, and facility managers to keep projects moving and
			properties looking their best across Hampton Roads.
		</p>
		<p class="mt-4 text-lg leading-relaxed text-slate-300">
			We combine dependable scheduling with the kind of attention to detail you expect from a local,
			owner-led business. Whether you need grading ahead of concrete crews or recurring maintenance
			for a coastal community, our team shows up ready to work.
		</p>
	</div>
</section>

<section class="border-b border-white/5 bg-slate-950 py-16">
	<div class="mx-auto max-w-6xl px-6">
		<div class="grid gap-8 md:grid-cols-3">
			{#each values as value (value.title)}
				<div class="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg shadow-cyan-500/5">
					<h2 class="text-xl font-semibold text-white">{value.title}</h2>
					<p class="mt-3 text-sm leading-relaxed text-slate-300">{value.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="bg-gradient-to-b from-slate-950 to-slate-900 py-20">
	<div class="mx-auto max-w-5xl px-6">
		<h2 class="text-3xl font-bold text-white sm:text-4xl">What to expect when you call us</h2>
		<p class="mt-3 max-w-3xl text-base text-slate-300 sm:text-lg">
			Every project starts with a conversation. We listen first, align on expectations, and
			communicate throughout the job so there are no surprises along the way.
		</p>
		<div class="mt-10 grid gap-8 md:grid-cols-3">
			{#each steps as step, index (step.title)}
				<div class="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg shadow-cyan-500/10">
					<div
						class="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/60 bg-cyan-400/10 text-sm font-semibold text-cyan-300"
					>
						{index + 1}
					</div>
					<h3 class="mt-4 text-lg font-semibold text-white">{step.title}</h3>
					<p class="mt-3 text-sm leading-relaxed text-slate-300">{step.description}</p>
				</div>
			{/each}
		</div>
		<div class="mt-12">
			<a
				href={resolve('/services')}
				class="inline-flex items-center justify-center rounded-full border border-cyan-400/70 px-6 py-3 text-sm font-semibold tracking-[0.25em] text-cyan-300 uppercase transition hover:-translate-y-0.5 hover:border-cyan-300 hover:text-white sm:text-base"
			>
				Explore Our Services
			</a>
		</div>
	</div>
</section>
