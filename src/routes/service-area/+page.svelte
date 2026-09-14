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
-->
<Section variant="gray">
	<div class="mx-auto max-w-4xl text-center">
		<h1 class="mb-6 font-bold text-gray-900">Our Service Area</h1>
		<p class="text-lg font-normal text-gray-600">
			We bring gravel driveway repair, drainage solutions, and small excavation to {counties} counties
			and {cities} cities across southeastern Virginia — from the oceanfront up through the Peninsula
			and Middle Peninsula to Greater Richmond.
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
			The map shows where we work routinely, not a fence. If your property sits just outside a
			shaded county — or you have a larger job that makes the drive worth it — call
			<a
				href={COMPANY_INFO.phoneHref}
				class="font-bold text-primary-500 underline transition-colors hover:text-primary-600"
			>
				{COMPANY_INFO.phone}
			</a>
			and we will tell you straight away whether we can take it on.
		</p>
		<p class="text-base font-normal text-gray-600">
			Virginia's independent cities sit outside any county, so Virginia Beach, Chesapeake, Suffolk,
			Williamsburg, and Poquoson are listed as cities rather than counties above. Gravel driveways,
			ditches, swales, culverts, and shed pads all get the same attention wherever you are on the
			map.
		</p>
	</div>
</Section>

<!--
	Call to Action Section
-->
<CTASection />
