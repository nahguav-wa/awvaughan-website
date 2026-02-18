<!--
	Small Excavation Service Page
-->
<script lang="ts">
	import { Section, Button } from '$lib';
	import { COMPANY_INFO } from '$lib/config/constants';
</script>

<Section variant="gray" class="mt-16 md:mt-28">
	<div class="mx-auto max-w-4xl text-center">
		<h1 class="mb-6 text-xl font-bold text-gray-900">Small Excavation & Site Work</h1>
		<p class="text-lg font-normal text-gray-600">
			Specialized small excavation services for residential and rural properties in Virginia Beach
			and the 757 area. We handle the projects larger contractors won't.
		</p>
	</div>
</Section>

<Section variant="white">
	<div class="mx-auto max-w-4xl">
		<div class="grid items-start gap-12 md:grid-cols-2">
			<div>
				<h2 class="mb-4 text-xl font-bold text-gray-900">The Right-Sized Excavation Contractor</h2>
				<div class="space-y-4 text-base font-normal text-gray-600">
					<p>
						Many excavation contractors focus on large commercial projects and won't take on smaller
						residential or rural jobs. That's where we come in. The A.W. Vaughan Company specializes
						in exactly these projects.
					</p>
					<p>
						From clearing a small lot to trenching for utilities, repairing culverts, or maintaining
						rural property access roads, we bring professional expertise and the right equipment to
						every job, no matter the size.
					</p>
				</div>
			</div>
			<div class="overflow-hidden rounded-lg shadow-lg">
				<img
					src="/work-example-2.jpg"
					alt="Small excavation and site work project in Virginia Beach"
					class="h-auto w-full object-cover"
					width="844"
					height="1125"
					loading="lazy"
				/>
			</div>
		</div>
	</div>
</Section>

<Section variant="gray">
	<div class="mx-auto max-w-4xl">
		<h2 class="mb-8 text-center text-xl font-bold text-gray-900">Our Excavation Services</h2>
		<div class="grid gap-8 md:grid-cols-2">
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="mb-2 text-xl font-bold text-gray-900">Small Lot Clearing & Grading</h3>
				<p class="text-base font-normal text-gray-600">
					We clear and grade small lots for construction, landscaping, or property improvement
					projects with precision equipment.
				</p>
			</div>
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="mb-2 text-xl font-bold text-gray-900">Trenching for Utilities</h3>
				<p class="text-base font-normal text-gray-600">
					Professional trenching services for water lines, electrical conduit, drainage pipes, and
					other utility installations.
				</p>
			</div>
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="mb-2 text-xl font-bold text-gray-900">Culvert Repair & Installation</h3>
				<p class="text-base font-normal text-gray-600">
					We repair damaged culverts and install new ones to maintain proper water flow under
					driveways and access roads.
				</p>
			</div>
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="mb-2 text-xl font-bold text-gray-900">Rural Property Maintenance</h3>
				<p class="text-base font-normal text-gray-600">
					Access road grading, drainage maintenance, and general site work to keep rural properties
					functional and well-maintained.
				</p>
			</div>
		</div>
	</div>
</Section>

<Section variant="white">
	<div class="mx-auto max-w-4xl text-center">
		<h2 class="mb-6 text-xl font-bold text-gray-900">Need Excavation Work Done?</h2>
		<p class="mb-8 text-lg font-normal text-gray-600">
			Contact us for a free consultation and quote. We serve {COMPANY_INFO.serviceArea.primary} and the
			entire 757 area.
		</p>
		<div class="flex flex-col justify-center gap-4 sm:flex-row">
			<Button variant="primary" href="/contact" size="md">Get a Free Quote</Button>
			<Button variant="secondary" href={COMPANY_INFO.phoneHref} size="md">
				Call {COMPANY_INFO.phone}
			</Button>
		</div>
	</div>
</Section>
