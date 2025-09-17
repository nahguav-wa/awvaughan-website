<script lang="ts">
	import { resolve } from '$app/paths';
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
		src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1920&q=80',
		alt: 'Crew installing underground utilities on a construction site',
		srcset:
			'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=640&q=70 640w, https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1024&q=75 1024w, https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1920&q=80 1920w',
		sizes: '(min-width: 1024px) 100vw, 100vw'
	};

	const defaultBackgroundVideo: BackgroundVideo = {
		src: 'https://cdn.coverr.co/videos/coverr-workers-pouring-concrete-3991/1080p.mp4',
		poster: defaultBackgroundImage.src
	};

	const defaultProps: Required<
		Pick<HeroProps, 'eyebrow' | 'heading' | 'subheading' | 'description'>
	> = {
		eyebrow: 'Civil Construction & Site Support',
		heading: 'Infrastructure-ready crews for Hampton Roads properties.',
		subheading: 'Garney-inspired performance with small-team responsiveness.',
		description: [
			'From grading and drainage to emergency storm response, AW Vaughan Company keeps critical work on schedule for builders, HOAs, and facility managers.',
			'We bring the safety culture, communication cadence, and craftsmanship you expect from national contractors—while staying as nimble as the neighborhoods we serve.'
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

<section
	id="hero"
	class="relative isolate overflow-hidden border-b border-white/10 bg-[var(--brand-navy-900)] text-white"
>
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

	<div
		class="absolute inset-0 bg-gradient-to-br from-[var(--brand-navy-900)]/90 via-[var(--brand-navy-800)]/70 to-black/50"
	></div>
	<div
		class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-[var(--brand-blue)]/40"
	></div>

	<div
		class="relative z-10 mx-auto flex min-h-[75vh] w-full max-w-6xl flex-col justify-center gap-10 px-6 py-24 lg:flex-row lg:items-end lg:gap-16"
	>
		<div class="max-w-3xl space-y-6">
			<div
				class="inline-flex items-center gap-4 rounded-full bg-white/10 px-4 py-2 text-[0.65rem] font-semibold tracking-[0.4em] text-[var(--brand-teal)] uppercase"
			>
				<span aria-hidden="true" class="inline-flex h-2 w-2 rounded-full bg-[var(--brand-orange)]"
				></span>
				{eyebrow}
			</div>

			<h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl xl:text-6xl">
				{heading}
			</h1>

			<p class="text-lg font-semibold tracking-[0.3em] text-[var(--brand-orange)] uppercase">
				{subheading}
			</p>

			{#each description as paragraph (paragraph)}
				<p class="text-base leading-relaxed text-slate-100/90 sm:text-lg">{paragraph}</p>
			{/each}

			<div class="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
				<a
					href={resolve('/contact')}
					class="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-orange)] px-6 py-3 text-sm font-semibold tracking-[0.28em] text-[var(--brand-navy-900)] uppercase shadow-[var(--brand-orange)]/35 shadow-lg transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-cream)]"
				>
					Plan a project
				</a>
				<a
					href="tel:+17574021100"
					class="inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold tracking-[0.28em] text-white uppercase transition hover:border-white/60 hover:bg-white/20"
				>
					<span aria-hidden="true" class="inline-flex h-2 w-2 rounded-full bg-[var(--brand-orange)]"
					></span>
					Call (757) 402-1100
				</a>
			</div>
		</div>

		<div
			class="mb-6 grid flex-1 gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-100 backdrop-blur md:grid-cols-2 md:p-8"
		>
			<div>
				<p class="text-xs font-semibold tracking-[0.4em] text-slate-300 uppercase">
					Emergency Ready
				</p>
				<p class="mt-2 text-2xl font-bold text-white">Storm response in under 24 hours</p>
				<p class="mt-3 text-sm text-slate-200">
					Mobilize our crew for washouts, debris removal, and safety repairs as soon as the weather
					clears.
				</p>
			</div>
			<div>
				<p class="text-xs font-semibold tracking-[0.4em] text-slate-300 uppercase">
					Trusted Regionally
				</p>
				<p class="mt-2 text-2xl font-bold text-white">Serving Hampton Roads</p>
				<p class="mt-3 text-sm text-slate-200">
					Virginia Beach, Norfolk, Chesapeake, and the Tidewater communities rely on us for ongoing
					site care.
				</p>
			</div>
		</div>
	</div>
</section>
