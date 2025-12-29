<!--
	Services Page Component
	Detailed listing of all service offerings
-->
<script lang="ts">
	import Section from '$lib/components/ui/Section.svelte';
	import ServiceCard from '$lib/components/ServiceCard.svelte';
	import { services } from '$lib/data/services';
</script>

<!--
	Page Hero Section
-->
<Section variant="gray" class="pt-32 md:pt-36">
	<div class="max-w-4xl mx-auto text-center">
		<h1 class="text-xl font-bold text-gray-900 mb-6">Our Services</h1>
		<p class="text-lg font-normal text-gray-600">
			Professional excavation, gravel driveway repair, and drainage solutions serving Virginia
			Beach and the 757 area. We specialize in residential and small commercial projects.
		</p>
	</div>
</Section>

<!--
	Services Grid Section
-->
<Section variant="white">
	<div class="max-w-4xl mx-auto">
		<div class="grid md:grid-cols-2 gap-8">
			{#each services as service}
				<ServiceCard {service} />
			{/each}
		</div>
	</div>
</Section>

<!--
	Service Details Section
-->
<Section variant="gray">
	<div class="max-w-4xl mx-auto">
		<h2 class="text-xl font-bold text-gray-900 mb-12 text-center">What We Do</h2>

		<div class="space-y-12">
			<!-- Gravel Driveway Repair -->
			<div>
				<div class="flex items-start gap-6">
					<div class="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-lg flex items-center justify-center text-xl font-bold">
						1
					</div>
					<div class="flex-1">
						<h3 class="text-xl font-bold text-gray-900 mb-3">
							Gravel Driveway Repair & Restoration
						</h3>
						<p class="text-base font-normal text-gray-600 mb-4">
							Is your gravel driveway showing potholes, washout, or loss of crown? We specialize in
							restoring gravel driveways to proper grade and crown, ensuring water drains correctly
							and your driveway lasts for years to come.
						</p>
						<ul class="list-disc list-inside space-y-2 text-base font-normal text-gray-600">
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
					<div class="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-lg flex items-center justify-center text-xl font-bold">
						2
					</div>
					<div class="flex-1">
						<h3 class="text-xl font-bold text-gray-900 mb-3">Drainage Solutions & Grading</h3>
						<p class="text-base font-normal text-gray-600 mb-4">
							Standing water damaging your driveway or yard? We design and implement effective
							drainage solutions customized for Virginia Beach soil and weather conditions.
						</p>
						<ul class="list-disc list-inside space-y-2 text-base font-normal text-gray-600">
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
					<div class="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-lg flex items-center justify-center text-xl font-bold">
						3
					</div>
					<div class="flex-1">
						<h3 class="text-xl font-bold text-gray-900 mb-3">Shed Pad & Foundation Preparation</h3>
						<p class="text-base font-normal text-gray-600 mb-4">
							Getting a new shed or outdoor structure? Proper site preparation is critical for a
							stable, level foundation. We prepare shed pads that stay level and drain properly.
						</p>
						<ul class="list-disc list-inside space-y-2 text-base font-normal text-gray-600">
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
					<div class="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-lg flex items-center justify-center text-xl font-bold">
						4
					</div>
					<div class="flex-1">
						<h3 class="text-xl font-bold text-gray-900 mb-3">Small Excavation & Site Work</h3>
						<p class="text-base font-normal text-gray-600 mb-4">
							We handle the small excavation projects that larger contractors won't take on. From
							rural property maintenance to specialized site work, we're your local solution.
						</p>
						<ul class="list-disc list-inside space-y-2 text-base font-normal text-gray-600">
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
	<div class="max-w-4xl mx-auto text-center">
		<h2 class="text-xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
		<p class="text-lg font-normal text-gray-600 mb-8">
			Contact us today for a free consultation and quote. We serve Virginia Beach and all of the
			757 area.
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<a
				href="/contact"
				class="inline-block bg-primary-500 text-white px-8 py-3 text-base font-bold rounded-lg hover:bg-primary-600 transition-colors"
			>
				Get a Free Quote
			</a>
			<a
				href="tel:+17574021100"
				class="inline-block bg-gray-800 text-white px-8 py-3 text-base font-bold rounded-lg hover:bg-gray-900 transition-colors"
			>
				Call (757) 402-1100
			</a>
		</div>
	</div>
</Section>
