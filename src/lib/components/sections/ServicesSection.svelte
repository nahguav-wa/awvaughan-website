<!--
	Services Section Component
	Homepage carousel of the service offerings

	The track is a native scroll-snap container, so it swipes on touch and
	scrolls with the keyboard before any JavaScript runs, and every service card
	is a real link present in the prerendered HTML. The arrows and dots are
	progressive enhancement: they only appear once mounted, because without
	JavaScript they would do nothing.
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	import { Section, ServiceCard } from '$lib';
	import { services } from '$lib/data/services';

	let scroller: HTMLDivElement;
	let mounted = $state(false);
	let pageCount = $state(1);
	let activePage = $state(0);

	/**
	 * How many cards are visible at once is decided by CSS, not by this
	 * component, so it is measured rather than assumed: the distance between two
	 * adjacent cards divided into the visible width.
	 */
	function metrics() {
		const cards = scroller.children;
		const first = cards[0] as HTMLElement;
		const step =
			cards.length > 1
				? (cards[1] as HTMLElement).offsetLeft - first.offsetLeft
				: first.offsetWidth;
		return {
			step,
			perView: Math.max(1, Math.round(scroller.clientWidth / step)),
			maxScroll: scroller.scrollWidth - scroller.clientWidth
		};
	}

	function update() {
		const { step, perView, maxScroll } = metrics();
		pageCount = Math.ceil(services.length / perView);
		// The final page is a partial one whenever the cards do not divide evenly,
		// so it is recognised by the scroll bottoming out rather than by position.
		activePage =
			scroller.scrollLeft >= maxScroll - 1
				? pageCount - 1
				: Math.min(pageCount - 1, Math.round(scroller.scrollLeft / (step * perView)));
	}

	function goTo(page: number) {
		const { step, perView } = metrics();
		scroller.scrollTo({ left: Math.max(0, Math.min(page, pageCount - 1)) * step * perView });
	}

	onMount(() => {
		update();
		mounted = true;

		const observer = new ResizeObserver(update);
		observer.observe(scroller);
		return () => observer.disconnect();
	});
</script>

<!--
	Services Section
-->
<Section variant="gray">
	<div class="mx-auto max-w-4xl">
		<!-- Section Heading - bold weight, size from the heading scale -->
		<h2 class="mb-12 text-center font-bold text-gray-900">Our Services</h2>

		<div role="group" aria-roledescription="carousel" aria-label="Our services">
			<!--
				Scroll-snap track: one card per view, two from md up.

				svelte-ignore a11y_no_noninteractive_tabindex — a scrollable region has
				to be reachable by keyboard, and only Chrome and Firefox focus one
				implicitly. The explicit tabindex is what makes it work in Safari.
			-->
			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<div
				bind:this={scroller}
				onscroll={update}
				tabindex="0"
				role="group"
				aria-label="Services, scrollable"
				class="services-track flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500"
			>
				{#each services as service (service.title)}
					<div class="w-full shrink-0 snap-start md:w-[calc(50%-1rem)]">
						<ServiceCard {service} />
					</div>
				{/each}
			</div>

			<!-- Controls. The row keeps its height before mount so nothing shifts. -->
			<div class="mt-8 flex h-10 items-center justify-center gap-4">
				{#if mounted}
					<button
						type="button"
						onclick={() => goTo(activePage - 1)}
						disabled={activePage === 0}
						aria-label="Previous services"
						class="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900 shadow-md transition hover:bg-primary-500 hover:text-white disabled:pointer-events-none disabled:opacity-40"
					>
						<ChevronLeft size={20} aria-hidden="true" />
					</button>

					<div class="flex items-center gap-2">
						{#each { length: pageCount }, page (page)}
							<button
								type="button"
								onclick={() => goTo(page)}
								aria-label="Go to services {page + 1} of {pageCount}"
								aria-current={activePage === page ? 'true' : undefined}
								class="h-2.5 rounded-full transition-all {activePage === page
									? 'w-6 bg-primary-500'
									: 'w-2.5 bg-gray-300 hover:bg-gray-400'}"
							></button>
						{/each}
					</div>

					<button
						type="button"
						onclick={() => goTo(activePage + 1)}
						disabled={activePage === pageCount - 1}
						aria-label="Next services"
						class="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900 shadow-md transition hover:bg-primary-500 hover:text-white disabled:pointer-events-none disabled:opacity-40"
					>
						<ChevronRight size={20} aria-hidden="true" />
					</button>
				{/if}
			</div>
		</div>
	</div>
</Section>

<style>
	/* The dots are the scroll position indicator; a scrollbar as well is noise. */
	.services-track {
		scrollbar-width: none;
	}

	.services-track::-webkit-scrollbar {
		display: none;
	}
</style>
