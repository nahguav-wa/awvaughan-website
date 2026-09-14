<!--
	Service Area Map

	An inline SVG of the localities we serve, drawn from Census boundaries by
	scripts/build-service-area-map.mjs. There is deliberately no mapping library
	and no tile layer: a service area map shows shaded regions, not streets, so
	tiles would add a third-party dependency, two CSP directives and ~45KB of
	JavaScript to display information the shapes already carry. Being plain SVG,
	it also survives prerendering — a client-only map renders as a blank box in
	the HTML a crawler sees first.

	Accessibility: the shapes are a visual affordance only, so the SVG is a
	labelled image and the paths are hidden from assistive technology. The
	locality list beside it is the accessible equivalent — real buttons, reachable
	by keyboard, and the text that search engines index.
-->
<script lang="ts">
	import {
		SERVICE_AREA_CONTEXT_PATH,
		SERVICE_AREA_VIEWBOX,
		serviceAreaLocalities
	} from '$lib/data/service-area';

	let activeGeoid = $state<string | null>(null);

	const active = $derived(serviceAreaLocalities.find((l) => l.geoid === activeGeoid) ?? null);

	/**
	 * Full legal name. Virginia's independent cities are not in any county, so
	 * "Suffolk County" would be wrong rather than merely informal.
	 */
	function fullName(name: string, kind: 'county' | 'city'): string {
		return kind === 'county' ? `${name} County` : `City of ${name}`;
	}
</script>

<h2 class="mb-10 text-center font-bold text-gray-900">Counties &amp; cities we serve</h2>

<div class="grid gap-10 lg:grid-cols-5 lg:items-start">
	<!-- Map -->
	<div class="lg:col-span-3">
		<figure class="m-0">
			<svg
				viewBox={SERVICE_AREA_VIEWBOX}
				class="h-auto w-full"
				role="img"
				aria-label="Map of southeastern Virginia showing the {serviceAreaLocalities.length} counties and cities served by The A.W. Vaughan Company"
			>
				<!--
					Neighbouring localities. Unlabelled and non-interactive: they exist so
					the served area reads as part of a coastline rather than a shape
					floating in white space.
				-->
				<path
					d={SERVICE_AREA_CONTEXT_PATH}
					class="fill-gray-200 stroke-white"
					stroke-width="1.5"
					aria-hidden="true"
				/>

				<!--
					The paths are pointer affordances duplicating the button list below,
					which is what carries keyboard and screen reader access — hence
					aria-hidden, and hence no keyboard handler on the shapes themselves.
				-->
				{#each serviceAreaLocalities as locality (locality.geoid)}
					<path
						d={locality.path}
						class="cursor-pointer stroke-white transition-colors duration-150 {locality.geoid ===
						activeGeoid
							? 'fill-primary-600'
							: 'fill-primary-500'}"
						stroke-width="1.5"
						aria-hidden="true"
						onpointerenter={() => (activeGeoid = locality.geoid)}
						onpointerleave={() => (activeGeoid = null)}
						onclick={() => (activeGeoid = locality.geoid)}
					></path>
				{/each}
			</svg>

			<!--
				Readout for the hovered or focused locality. Hidden from assistive
				technology on purpose: it only ever repeats the label of the control
				the user is already on, so announcing it as well is noise. The height
				is reserved so the map does not jump as the caption comes and goes.
			-->
			<figcaption
				class="mt-4 min-h-6 text-center text-base font-bold text-gray-900"
				aria-hidden="true"
			>
				{#if active}
					{fullName(active.name, active.kind)}
				{/if}
			</figcaption>
		</figure>
	</div>

	<!-- Locality list -->
	<div class="lg:col-span-2">
		<ul class="grid grid-cols-2 gap-x-4 gap-y-1 lg:grid-cols-1">
			{#each serviceAreaLocalities as locality (locality.geoid)}
				<li>
					<button
						type="button"
						class="w-full rounded-sm px-2 py-1 text-left text-base font-normal transition-colors focus:ring-2 focus:ring-primary-500 focus:outline-none {locality.geoid ===
						activeGeoid
							? 'bg-primary-500 text-white'
							: 'text-gray-600 hover:bg-gray-100'}"
						aria-label="Show {fullName(locality.name, locality.kind)} on the map"
						aria-pressed={locality.geoid === activeGeoid}
						onpointerenter={() => (activeGeoid = locality.geoid)}
						onpointerleave={() => (activeGeoid = null)}
						onfocus={() => (activeGeoid = locality.geoid)}
						onblur={() => (activeGeoid = null)}
						onclick={() => (activeGeoid = locality.geoid)}
					>
						{fullName(locality.name, locality.kind)}
					</button>
				</li>
			{/each}
		</ul>
	</div>
</div>
