<!--
	Services Page Component
	Detailed listing of all service offerings
-->
<script lang="ts">
	import { Section, ServiceCard } from '$lib';
	import { services } from '$lib/data/services';
</script>

<!--
	Page Hero Section
-->
<Section variant="gray" class="mt-16 md:mt-28">
	<div class="mx-auto max-w-4xl text-center">
		<h1 class="mb-6 text-xl font-bold text-gray-900">Our Services</h1>
		<p class="text-lg font-normal text-gray-600">
			Professional excavation, gravel driveway repair, and drainage solutions serving Virginia Beach
			and the 757 area. We specialize in residential and small commercial projects.
		</p>
	</div>
</Section>

<!--
	Services Grid Section
-->
<Section variant="white">
	<div class="mx-auto max-w-4xl">
		<div class="grid gap-8 md:grid-cols-2">
			{#each services as service (service.title)}
				<ServiceCard {service} />
			{/each}
		</div>
	</div>
</Section>

<!--
	Service Details Section
-->
<Section variant="gray">
	<div class="mx-auto max-w-4xl">
		<h2 class="mb-12 text-center text-xl font-bold text-gray-900">What We Do</h2>

		<div class="space-y-12">
			<!-- Gravel Driveway Repair -->
			<div>
				<div class="flex items-start gap-6">
					<div
						class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-500 text-xl font-bold text-white"
					>
						1
					</div>
					<div class="flex-1">
						<h3 class="mb-3 text-xl font-bold text-gray-900">
							Gravel Driveway Repair & Restoration
						</h3>
						<p class="mb-4 text-base font-normal text-gray-600">
							Is your gravel driveway showing potholes, washout, or loss of crown? We specialize in
							restoring gravel driveways to proper grade and crown, ensuring water drains correctly
							and your driveway lasts for years to come.
						</p>
						<ul class="list-inside list-disc space-y-2 text-base font-normal text-gray-600">
							<li>Crown restoration for proper water runoff</li>
							<li>Pothole filling and grading</li>
							<li>Washout repair and prevention</li>
							<li>New gravel installation and spreading</li>
							<li>Edge definition and maintenance</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Drainage Solutions -->
			<div>
				<div class="flex items-start gap-6">
					<div
						class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-500 text-xl font-bold text-white"
					>
						2
					</div>
					<div class="flex-1">
						<h3 class="mb-3 text-xl font-bold text-gray-900">Drainage Solutions & Grading</h3>
						<p class="mb-4 text-base font-normal text-gray-600">
							Standing water damaging your driveway or yard? We design and implement effective
							drainage solutions customized for Virginia Beach soil and weather conditions.
						</p>
						<ul class="list-inside list-disc space-y-2 text-base font-normal text-gray-600">
							<li>Swale and ditch installation/repair</li>
							<li>French drain systems</li>
							<li>Culvert installation and repair</li>
							<li>Site grading for water management</li>
							<li>Erosion control solutions</li>
							<li>Yard drainage systems</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Shed Pad Preparation -->
			<div>
				<div class="flex items-start gap-6">
					<div
						class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-500 text-xl font-bold text-white"
					>
						3
					</div>
					<div class="flex-1">
						<h3 class="mb-3 text-xl font-bold text-gray-900">Shed Pad & Foundation Preparation</h3>
						<p class="mb-4 text-base font-normal text-gray-600">
							Getting a new shed or outdoor structure? Proper site preparation is critical for a
							stable, level foundation. We prepare shed pads that stay level and drain properly.
						</p>
						<ul class="list-inside list-disc space-y-2 text-base font-normal text-gray-600">
							<li>Site clearing and leveling</li>
							<li>Precise grading for proper drainage</li>
							<li>Gravel base installation</li>
							<li>Compaction for stability</li>
							<li>Site preparation for small buildings</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Small Excavation -->
			<div>
				<div class="flex items-start gap-6">
					<div
						class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-500 text-xl font-bold text-white"
					>
						4
					</div>
					<div class="flex-1">
						<h3 class="mb-3 text-xl font-bold text-gray-900">Small Excavation & Site Work</h3>
						<p class="mb-4 text-base font-normal text-gray-600">
							We handle the small excavation projects that larger contractors won't take on. From
							rural property maintenance to specialized site work, we're your local solution.
						</p>
						<ul class="list-inside list-disc space-y-2 text-base font-normal text-gray-600">
							<li>Small lot clearing and grading</li>
							<li>Trenching for utilities</li>
							<li>Property access improvements</li>
							<li>Rural property maintenance</li>
							<li>Post hole augering</li>
							<li>Custom excavation projects</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</Section>

<!--
	Service Area & CTA Section
-->
<Section variant="white">
	<div class="mx-auto max-w-4xl text-center">
		<h2 class="mb-6 text-xl font-bold text-gray-900">Ready to Get Started?</h2>
		<p class="mb-8 text-lg font-normal text-gray-600">
			Contact us today for a free consultation and quote. We serve Virginia Beach and all of the 757
			area.
		</p>
		<div class="flex flex-col justify-center gap-4 sm:flex-row">
			<a
				href="/contact"
				class="inline-block rounded-lg bg-primary-500 px-8 py-3 text-base font-bold text-white transition-colors hover:bg-primary-600"
			>
				Contact Us
			</a>
			<a
				href="tel:+17574021100"
				class="inline-block rounded-lg bg-gray-800 px-8 py-3 text-base font-bold text-white transition-colors hover:bg-gray-900"
			>
				Call (757) 402-1100
			</a>
		</div>
	</div>
</Section>
