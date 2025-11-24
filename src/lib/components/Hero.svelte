<script lang="ts">
	import { resolve } from '$app/paths';
	import { inView } from '$lib/actions/in-view';
	import { Button } from '$lib/components/ui';
	import heroImage from '$lib/assets/hero-image-01.jpeg';
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
		heading?: string;
		subheading?: string;
		description?: string[];
		backgroundImage?: BackgroundImage;
		backgroundVideo?: BackgroundVideo | null;
	}

	const defaultBackgroundImage: BackgroundImage = {
		src: heroImage,
		alt: 'Compact tractor finishing a pass on a cleared property'
	};

	const defaultBackgroundVideo: BackgroundVideo | null = null;

	const defaultProps: Required<Pick<HeroProps, 'heading' | 'subheading' | 'description'>> = {
		heading: 'Simple tractor work for tidy, dry properties.',
		subheading: 'Local, owner-operated help.',
		description: [
			'Brush cleanup, light grading, and hauling handled start to finish by one person.'
		]
	};

	let {
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
	class="relative isolate -mt-28 overflow-hidden pt-28 text-white lg:-mt-32 lg:pt-32"
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

	<div class="absolute inset-0 bg-[var(--text-dark)]/40 mix-blend-multiply"></div>
	<div
		class="absolute inset-0 bg-gradient-to-b from-black/70 via-[var(--brand-blue)]/40 to-[var(--text-dark)]/70"
	></div>

	<div
		class="relative z-10 mx-auto flex min-h-[70vh] w-full max-w-5xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 sm:py-24"
	>
		<div class="flex w-full max-w-3xl flex-col items-center gap-4 sm:gap-6">
			<h1
				class="reveal text-4xl font-semibold tracking-tight text-white sm:text-5xl sm:leading-[1.05]"
				use:inView
			>
				{heading}
			</h1>

			<p class="reveal text-lg leading-relaxed font-medium text-white/90 sm:text-xl" use:inView>
				{subheading}
			</p>

			<div
				class="space-y-4 text-base leading-relaxed text-slate-100/90 sm:text-lg sm:leading-[1.6]"
			>
				{#each description as paragraph (paragraph)}
					<p class="mx-auto max-w-2xl">{paragraph}</p>
				{/each}
			</div>
		</div>

		<div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
			<Button
				href={resolve('/contact')}
				variant="default"
				size="lg"
				class="rounded-full text-[var(--text-dark)]"
			>
				Plan a project
			</Button>
			<Button
				href="tel:+17574021100"
				variant="ghost"
				size="lg"
				class="gap-3 rounded-full border border-white/40 bg-white/10 text-white hover:bg-white/20"
			>
				<span aria-hidden="true" class="inline-flex h-2 w-2 rounded-full bg-white/80"></span>
				Call (757) 402-1100
			</Button>
		</div>
	</div>
</section>
