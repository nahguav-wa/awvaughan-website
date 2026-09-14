<!--
	Service Area Page Component
	Interactive map of the counties and cities served, plus contact prompts.
-->
<script lang="ts">
	import { Section, ServiceAreaMap, CTASection } from '$lib';
	import { COMPANY_INFO } from '$lib/config/constants';
	import { serviceAreaLocalities } from '$lib/data/service-area';

	const counties = serviceAreaLocalities.filter((l) => l.kind === 'county').length;
	const cities = serviceAreaLocalities.length - counties;
</script>

<!--
	Page Hero Section

	Leads with Williamsburg and reaches for COMPANY_INFO.serviceArea.region rather
	than spelling the region out, both per docs/keyword-strategy.md. The southern
	localities the map shades are deliberately not named in prose: Virginia Beach,
	Chesapeake and "Hampton Roads" are retired target terms, and ranking for land
	clearing down there earns calls that are a sixty-mile drive away.
-->
<Section variant="gray">
	<div class="mx-auto max-w-4xl text-center">
		<h1 class="mb-6 font-bold text-gray-900">Our Williamsburg Service Area</h1>
		<p class="text-lg font-normal text-gray-600">
			Land clearing, bush hogging, forestry mulching, trail systems and property maintenance across
			{counties} counties and {cities} cities. We are based in {COMPANY_INFO.serviceArea.primary} and
			work throughout {COMPANY_INFO.serviceArea.region} — Toano and Norge, out to Yorktown, up through
			New Kent and West Point, and across to Gloucester, Saluda and Urbanna.
		</p>
	</div>
</Section>

<!--
	Interactive Map Section
-->
<Section variant="white">
	<div class="mx-auto max-w-5xl">
		<ServiceAreaMap />
	</div>
</Section>

<!--
	Context and Edge-of-Area Section
-->
<Section variant="gray">
	<div class="mx-auto max-w-4xl">
		<h2 class="mb-6 font-bold text-gray-900">Close to the line? Call anyway.</h2>
		<p class="mb-4 text-base font-normal text-gray-600">
			The map shows where we work, not a fence. If your property sits just outside a shaded county —
			or you have a larger job that makes the drive worth it — call
			<a
				href={COMPANY_INFO.phoneHref}
				class="font-bold text-primary-500 underline transition-colors hover:text-primary-600"
			>
				{COMPANY_INFO.phone}
			</a>
			and we will tell you straight away whether we can take it on.
		</p>
		<p class="text-base font-normal text-gray-600">
			Virginia is unusual in having independent cities that sit outside any county, which is why
			several entries above are listed as cities rather than counties. Clearing, cutting, mulching,
			trail work, and property upkeep all get the same attention wherever you are on the map.
		</p>
	</div>
</Section>

<!--
	Call to Action Section
-->
<CTASection />
