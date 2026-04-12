<!--
	About Page Component
	Company information, history, values, and team
-->
<script lang="ts">
	import { Section, FeatureCard } from '$lib';
	import { features } from '$lib/data/features';
	import { COMPANY_INFO } from '$lib/config/constants';
</script>

<!--
	Page Hero Section
-->
<Section variant="gray" class="mt-16 md:mt-28">
	<div class="mx-auto max-w-4xl text-center">
		<h1 class="mb-6 text-xl font-bold text-gray-900">About The A.W. Vaughan Company</h1>
		<p class="text-lg font-normal text-gray-600">
			We have a passion for land and homes that is reflected in our work. We pride ourselves on our
			communication, professionalism, and transparency.
		</p>
	</div>
</Section>

<!--
	Company Story Section
-->
<Section variant="white">
	<div class="mx-auto max-w-4xl">
		<div class="grid items-center gap-12 md:grid-cols-2">
			<!-- Company Image -->
			<div class="overflow-hidden rounded-lg shadow-lg">
				<img
					src="/about-image.jpg"
					alt="The A.W. Vaughan Company team working on a land management project in Virginia Beach"
					class="h-auto w-full object-cover"
					width="844"
					height="1125"
					loading="lazy"
				/>
			</div>

			<!-- Company Story -->
			<div>
				<h2 class="mb-4 text-xl font-bold text-gray-900">Our Story</h2>
				<div class="space-y-4 text-base font-normal text-gray-600">
					<p>
						Founded in {COMPANY_INFO.yearEstablished}, The A.W. Vaughan Company was built on a
						genuine passion for land and a belief that managing it well is a true craft. We serve
						Virginia Beach and the 757 area with a full range of land management services — from
						land clearing and bush hogging to gravel driveways and trail systems.
					</p>
					<p>
						We specialize in the kinds of projects that require real expertise and the right
						equipment: clearing overgrown lots, restoring neglected fields, building out trail
						systems, and keeping gravel driveways in top shape through the coastal seasons. No
						project too small, no detail overlooked.
					</p>
					<p>
						Our commitment is simple: take the stress out of land management. We show up on time,
						communicate clearly, and do the work right. We look forward to making your dreams for
						your property become reality.
					</p>
				</div>
			</div>
		</div>
	</div>
</Section>

<!--
	Our Values Section
-->
<Section variant="gray">
	<div class="mx-auto max-w-4xl">
		<h2 class="mb-12 text-center text-xl font-bold text-gray-900">What We Stand For</h2>

		<!-- Value Propositions Grid -->
		<div class="grid gap-8 md:grid-cols-3">
			{#each features as feature (feature.title)}
				<FeatureCard {feature} />
			{/each}
		</div>
	</div>
</Section>

<!--
	Why Choose Us Section
-->
<Section variant="white">
	<div class="mx-auto max-w-4xl">
		<h2 class="mb-8 text-center text-xl font-bold text-gray-900">Why Choose Us</h2>

		<div class="grid gap-8 md:grid-cols-2">
			<!-- Reason 1 -->
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="mb-2 text-xl font-bold text-gray-900">Local Knowledge</h3>
				<p class="text-base font-normal text-gray-600">
					We know Virginia Beach and the 757 area — the soil, the climate, and the challenges that
					come with coastal property. Our solutions are built for this environment.
				</p>
			</div>

			<!-- Reason 2 -->
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="mb-2 text-xl font-bold text-gray-900">Right-Sized Service</h3>
				<p class="text-base font-normal text-gray-600">
					We specialize in residential and rural properties. You won't be too small for us — these
					are exactly the projects we excel at and genuinely enjoy.
				</p>
			</div>

			<!-- Reason 3 -->
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="mb-2 text-xl font-bold text-gray-900">Craft & Care</h3>
				<p class="text-base font-normal text-gray-600">
					We treat every property as if it were our own. From the first consultation to the final
					pass, we bring attention to detail and a standard of quality we're proud to stand behind.
				</p>
			</div>

			<!-- Reason 4 -->
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="mb-2 text-xl font-bold text-gray-900">Clear Communication</h3>
				<p class="text-base font-normal text-gray-600">
					Honest estimates, transparent timelines, and no surprises. We keep you in the loop from
					start to finish so you always know where things stand.
				</p>
			</div>
		</div>
	</div>
</Section>

<!--
	Service Area Section
-->
<Section variant="gray">
	<div class="mx-auto max-w-4xl text-center">
		<h2 class="mb-6 text-xl font-bold text-gray-900">Serving the 757 Area</h2>
		<p class="mb-8 text-lg font-normal text-gray-600">
			Proudly serving {COMPANY_INFO.serviceArea.primary} and surrounding communities including
			{COMPANY_INFO.serviceArea.regions.slice(1).join(', ')}, and all of Hampton Roads.
		</p>
		<a
			href="/contact"
			class="inline-block rounded-lg bg-primary-500 px-8 py-3 text-base font-bold text-white transition-colors hover:bg-primary-600"
		>
			Get in Touch
		</a>
	</div>
</Section>
