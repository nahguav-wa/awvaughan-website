<!--
	Small Excavation Service Page
-->
<script lang="ts">
	import Section from '$lib/components/ui/Section.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { COMPANY_INFO } from '$lib/config/constants';
</script>

<Section variant="gray" class="mt-16 md:mt-28">
	<div class="max-w-4xl mx-auto text-center">
		<h1 class="text-xl font-bold text-gray-900 mb-6">Small Excavation & Site Work</h1>
		<p class="text-lg font-normal text-gray-600">
			Specialized small excavation services for residential and rural properties in Virginia Beach
			and the 757 area. We handle the projects larger contractors won't.
		</p>
	</div>
</Section>

<Section variant="white">
	<div class="max-w-4xl mx-auto">
		<div class="grid md:grid-cols-2 gap-12 items-start">
			<div>
				<h2 class="text-xl font-bold text-gray-900 mb-4">The Right-Sized Excavation Contractor</h2>
				<div class="space-y-4 text-base font-normal text-gray-600">
					<p>
						Many excavation contractors focus on large commercial projects and won't take on smaller
						residential or rural jobs. That's where we come in. The A.W. Vaughan Company
						specializes in exactly these projects.
					</p>
					<p>
						From clearing a small lot to trenching for utilities, repairing culverts, or maintaining
						rural property access roads, we bring professional expertise and the right equipment to
						every job, no matter the size.
					</p>
				</div>
			</div>
			<div class="rounded-lg overflow-hidden shadow-lg">
				<img
					src="/work-example-2.jpg"
					alt="Small excavation and site work project in Virginia Beach"
					class="w-full h-auto object-cover"
					width="844"
					height="1125"
					loading="lazy"
				/>
			</div>
		</div>
	</div>
</Section>

<Section variant="gray">
	<div class="max-w-4xl mx-auto">
		<h2 class="text-xl font-bold text-gray-900 mb-8 text-center">Our Excavation Services</h2>
		<div class="grid md:grid-cols-2 gap-8">
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="text-xl font-bold text-gray-900 mb-2">Small Lot Clearing & Grading</h3>
				<p class="text-base font-normal text-gray-600">
					We clear and grade small lots for construction, landscaping, or property improvement
					projects with precision equipment.
				</p>
			</div>
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="text-xl font-bold text-gray-900 mb-2">Trenching for Utilities</h3>
				<p class="text-base font-normal text-gray-600">
					Professional trenching services for water lines, electrical conduit, drainage pipes, and
					other utility installations.
				</p>
			</div>
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="text-xl font-bold text-gray-900 mb-2">Culvert Repair & Installation</h3>
				<p class="text-base font-normal text-gray-600">
					We repair damaged culverts and install new ones to maintain proper water flow under
					driveways and access roads.
				</p>
			</div>
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="text-xl font-bold text-gray-900 mb-2">Rural Property Maintenance</h3>
				<p class="text-base font-normal text-gray-600">
					Access road grading, drainage maintenance, and general site work to keep rural properties
					functional and well-maintained.
				</p>
			</div>
		</div>
	</div>
</Section>

<Section variant="white">
	<div class="max-w-4xl mx-auto text-center">
		<h2 class="text-xl font-bold text-gray-900 mb-6">Need Excavation Work Done?</h2>
		<p class="text-lg font-normal text-gray-600 mb-8">
			Contact us for a free consultation and quote. We serve {COMPANY_INFO.serviceArea
				.primary} and the entire 757 area.
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<Button variant="primary" href="/contact" size="md">Get a Free Quote</Button>
			<Button variant="secondary" href={COMPANY_INFO.phoneHref} size="md">
				Call {COMPANY_INFO.phone}
			</Button>
		</div>
	</div>
</Section>
