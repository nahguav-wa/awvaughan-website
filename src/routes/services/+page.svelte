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
<Section variant="gray">
	<div class="mx-auto max-w-4xl text-center">
		<h1 class="mb-6 font-bold text-gray-900">Excavation & Driveway Services in Williamsburg, VA</h1>
		<p class="text-lg font-normal text-gray-600">
			Gravel driveway repair, drainage solutions, shed pads, and small excavation for Williamsburg,
			Toano, Yorktown, New Kent, West Point, Gloucester, Saluda, and the surrounding Historic
			Triangle and Middle Peninsula.
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
		<h2 class="mb-12 text-center font-bold text-gray-900">What We Do</h2>

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
						<h3 class="mb-3 font-bold text-gray-900">Gravel Driveway Repair & Restoration</h3>
						<p class="mb-4 text-base font-normal text-gray-600">
							Potholes, ruts, washout, or a driveway that has gone flat and holds water? We regrade
							gravel driveways across Williamsburg and James City County back to a proper crown, so
							water runs to the edges instead of standing in the wheel tracks.
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
						<h3 class="mb-3 font-bold text-gray-900">Drainage Solutions & Grading</h3>
						<p class="mb-4 text-base font-normal text-gray-600">
							Standing water in the driveway or yard? We design drainage that suits the ground it is
							built in — heavy clay around Williamsburg and Yorktown, sand near Toano, and the flat,
							low-lying lots common in Gloucester and Saluda.
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
						<h3 class="mb-3 font-bold text-gray-900">Shed Pad & Foundation Preparation</h3>
						<p class="mb-4 text-base font-normal text-gray-600">
							Having a shed or outbuilding delivered? The pad has to be level, compacted, and
							draining before it arrives. We prepare shed pads across the Historic Triangle and
							Middle Peninsula that stay level and stay dry.
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
						<h3 class="mb-3 font-bold text-gray-900">Small Excavation & Site Work</h3>
						<p class="mb-4 text-base font-normal text-gray-600">
							We take the small excavation jobs larger contractors turn down. Culverts, trenching,
							lot clearing, and keeping rural access roads passable on properties out toward New
							Kent, West Point, Gloucester, and Saluda.
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
		<h2 class="mb-6 font-bold text-gray-900">Ready to Get Started?</h2>
		<p class="mb-8 text-lg font-normal text-gray-600">
			Free quotes, no pressure. Based in Williamsburg and working throughout the Historic Triangle
			and the Middle Peninsula.
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
