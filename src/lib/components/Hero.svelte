<script lang="ts">
	import { resolve } from '$app/paths';
	import { inView } from '$lib/actions/in-view';
	import { onMount } from 'svelte';

	type BackgroundImage = {
		src: string;
		alt?: string;
		srcset?: string;
		sizes?: string;
	};

	type BackgroundVideo = {
		src: string;
		poster?: string;
	};

	interface HeroProps {
		eyebrow?: string;
		heading?: string;
		subheading?: string;
		description?: string[];
		backgroundImage?: BackgroundImage;
		backgroundVideo?: BackgroundVideo | null;
	}

	const defaultBackgroundImage: BackgroundImage = {
		src: 'https://images.unsplash.com/photo-1597106658448-9f62510953f8?auto=format&fit=crop&w=1920&q=80',
		alt: 'Compact tractor mowing tall grass along a rural property',
		srcset:
			'https://images.unsplash.com/photo-1597106658448-9f62510953f8?auto=format&fit=crop&w=640&q=70 640w, https://images.unsplash.com/photo-1597106658448-9f62510953f8?auto=format&fit=crop&w=1024&q=75 1024w, https://images.unsplash.com/photo-1597106658448-9f62510953f8?auto=format&fit=crop&w=1920&q=80 1920w',
		sizes: '(min-width: 1024px) 100vw, 100vw'
	};

	const defaultBackgroundVideo: BackgroundVideo | null = null;

	const defaultProps: Required<
		Pick<HeroProps, 'eyebrow' | 'heading' | 'subheading' | 'description'>
	> = {
		eyebrow: 'Small tractor work in Hampton Roads',
		heading: 'Owner-operated tractor services for properties 1 acre and up.',
		subheading: 'Right-sized equipment, careful work, and friendly communication.',
		description: [
			'I help landowners tame overgrown acreage, tidy up storm damage, and keep rural homes looking their best.',
			'Bush hogging, brush cleanup, light grading, and hauling—handled by the same owner who answers your call.'
		]
	};

	let {
		eyebrow = defaultProps.eyebrow,
		heading = defaultProps.heading,
		subheading = defaultProps.subheading,
		description = defaultProps.description,
		backgroundImage = defaultBackgroundImage,
		backgroundVideo = defaultBackgroundVideo
	}: HeroProps = $props();

	let prefersReducedMotion = false;

	onMount(() => {
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		const updatePreference = () => {
			prefersReducedMotion = mediaQuery.matches;
		};

		updatePreference();
		mediaQuery.addEventListener('change', updatePreference);

		return () => {
			mediaQuery.removeEventListener('change', updatePreference);
		};
	});

	const showVideo = $derived(Boolean(backgroundVideo?.src && !prefersReducedMotion));
</script>

<section id="hero" class="relative isolate overflow-hidden text-white">
	{#if showVideo}
		<video
			class="absolute inset-0 h-full w-full object-cover object-center"
			autoplay
			muted
			loop
			playsinline
			poster={backgroundVideo?.poster ?? backgroundImage.src}
			aria-hidden="true"
		>
			<source src={backgroundVideo?.src} type="video/mp4" />
		</video>
	{:else}
		<picture aria-hidden="true">
			{#if backgroundImage?.srcset}
				<source srcset={backgroundImage.srcset} sizes={backgroundImage.sizes} />
			{/if}
			<img
				class="absolute inset-0 h-full w-full object-cover object-center"
				src={backgroundImage?.src}
				alt={backgroundImage?.alt ?? ''}
			/>
		</picture>
	{/if}

	<div class="absolute inset-0 bg-[var(--text-dark)]/40 mix-blend-multiply"></div>
	<div
		class="absolute inset-0 bg-gradient-to-b from-black/70 via-[var(--brand-blue)]/40 to-[var(--text-dark)]/70"
	></div>

	<div
		class="relative z-10 mx-auto flex min-h-[75vh] w-full max-w-4xl flex-col items-center justify-center px-6 py-28 text-center"
	>
		<div
			class="inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-2 text-[0.65rem] font-semibold tracking-[0.35em] text-[var(--brand-orange)] uppercase"
		>
			<span aria-hidden="true" class="inline-flex h-2 w-2 rounded-full bg-[var(--brand-orange)]"
			></span>
			{eyebrow}
		</div>

		<h1
			class="reveal mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl xl:text-6xl"
			use:inView
		>
			{heading}
		</h1>

		<p
			class="reveal mt-4 text-base font-semibold tracking-[0.28em] text-white/80 uppercase sm:text-lg"
			use:inView
		>
			{subheading}
		</p>

		<div class="mt-6 space-y-4 text-base leading-relaxed text-slate-100/90 sm:text-lg">
			{#each description as paragraph (paragraph)}
				<p>{paragraph}</p>
			{/each}
		</div>

		<div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
			<a
				href={resolve('/contact')}
				class="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-orange)] px-7 py-3 text-sm font-semibold tracking-[0.28em] text-[var(--text-dark)] uppercase shadow-[var(--brand-orange)]/30 shadow-lg transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-blue)]"
			>
				Plan a project
			</a>
			<a
				href="tel:+17574021100"
				class="inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold tracking-[0.28em] text-white uppercase transition hover:border-white/60 hover:bg-white/20"
			>
				<span aria-hidden="true" class="inline-flex h-2 w-2 rounded-full bg-[var(--brand-orange)]"
				></span>
				Call (757) 402-1100
			</a>
		</div>
	</div>
</section>
