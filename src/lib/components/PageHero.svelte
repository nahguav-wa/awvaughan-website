<script lang="ts">
	import { inView } from '$lib/actions/in-view';
	import { Badge } from '$lib/components/ui';
	import heroImage from '$lib/assets/hero-image-01.jpeg';

	type BackgroundImage = {
		src: string;
		alt?: string;
		srcset?: string;
		sizes?: string;
	};

	type PageHeroProps = {
		eyebrow?: string;
		heading: string;
		description?: string | string[];
		align?: 'left' | 'center';
		backgroundImage?: BackgroundImage;
	};

	let {
		eyebrow = '',
		heading,
		description = [],
		align = 'left',
		backgroundImage = {
			src: heroImage,
			alt: 'Compact tractor finishing a pass on a cleared property'
		}
	}: PageHeroProps = $props();

	const descriptionLines = $derived(
		Array.isArray(description) ? description : description ? [description] : []
	);

	const alignmentClass = $derived(
		align === 'center' ? 'items-center text-center' : 'items-start text-left'
	);
</script>

<section class="relative isolate overflow-hidden text-white">
	<picture aria-hidden="true">
		{#if backgroundImage.srcset}
			<source srcset={backgroundImage.srcset} sizes={backgroundImage.sizes} />
		{/if}
		<img
			class="absolute inset-0 h-full w-full object-cover object-center"
			src={backgroundImage.src}
			alt={backgroundImage.alt ?? ''}
		/>
	</picture>

	<div class="absolute inset-0 bg-[var(--text-dark)]/55 mix-blend-multiply"></div>
	<div
		class="absolute inset-0 bg-gradient-to-b from-black/60 via-[var(--brand-blue)]/35 to-[var(--text-dark)]/75"
	></div>

	<div
		class={`relative z-10 mx-auto flex min-h-[60vh] w-full max-w-4xl flex-col justify-center px-6 py-24 ${alignmentClass}`}
	>
		{#if eyebrow}
			<Badge
				variant="accent"
				class="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white"
			>
				<span aria-hidden="true" class="inline-flex h-2 w-2 rounded-full bg-white/80"></span>
				{eyebrow}
			</Badge>
		{/if}

		<h1 class="reveal mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl" use:inView>
			{heading}
		</h1>

		{#if descriptionLines.length}
			<div class="mt-4 space-y-3 text-lg leading-relaxed text-white/90 sm:text-xl">
				{#each descriptionLines as paragraph (paragraph)}
					<p>{paragraph}</p>
				{/each}
			</div>
		{/if}
	</div>
</section>
