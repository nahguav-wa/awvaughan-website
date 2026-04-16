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
			We make land beautiful. From land clearing and bush hogging to gravel driveways and trail
			systems, we serve Virginia Beach and the 757 area with the full range of land management
			services your property deserves.
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
			<!-- Land Clearing -->
			<div id="land-clearing">
				<div class="flex items-start gap-6">
					<div
						class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-500 text-xl font-bold text-white"
					>
						1
					</div>
					<div class="flex-1">
						<h3 class="mb-3 text-xl font-bold text-gray-900">Land Clearing</h3>
						<p class="mb-4 text-base font-normal text-gray-600">
							Whether you're preparing a home site, opening up a viewshed, or converting overgrown
							land into usable pasture, we have the equipment and experience to get it done. From
							excavators and track loaders to dozers, we bring the right machine for the job.
						</p>
						<ul class="list-inside list-disc space-y-2 text-base font-normal text-gray-600">
							<li>Home site clearing and preparation</li>
							<li>Viewshed and tree line management</li>
							<li>Pasture creation and reclamation</li>
							<li>Overgrown lot and acreage clearing</li>
							<li>Debris removal and site cleanup</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Bush Hogging -->
			<div id="bush-hogging">
				<div class="flex items-start gap-6">
					<div
						class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-500 text-xl font-bold text-white"
					>
						2
					</div>
					<div class="flex-1">
						<h3 class="mb-3 text-xl font-bold text-gray-900">Bush Hogging</h3>
						<p class="mb-4 text-base font-normal text-gray-600">
							When you own open land, maintaining it is a key part of ownership — mother nature will
							take it back if you don't. We run well-maintained equipment suited for everything from
							large-scale field maintenance to small parcels and steep slopes.
						</p>
						<ul class="list-inside list-disc space-y-2 text-base font-normal text-gray-600">
							<li>Large field and acreage mowing</li>
							<li>Small lot and parcel maintenance</li>
							<li>Steep slope and rough terrain cutting</li>
							<li>Seasonal brush and briar management</li>
							<li>Right-of-way and easement clearing</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Gravel Driveway -->
			<div id="gravel-driveway">
				<div class="flex items-start gap-6">
					<div
						class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-500 text-xl font-bold text-white"
					>
						3
					</div>
					<div class="flex-1">
						<h3 class="mb-3 text-xl font-bold text-gray-900">Gravel Driveway Repair & Restoration</h3>
						<p class="mb-4 text-base font-normal text-gray-600">
							Is your gravel driveway showing potholes, washout, or a loss of crown? We restore
							driveways to proper grade and drainage so they hold up through the coastal seasons and
							look good doing it.
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

			<!-- Lawn Care & Landscaping -->
			<div id="lawn-care">
				<div class="flex items-start gap-6">
					<div
						class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-500 text-xl font-bold text-white"
					>
						4
					</div>
					<div class="flex-1">
						<h3 class="mb-3 text-xl font-bold text-gray-900">Lawn Care & Landscaping</h3>
						<p class="mb-4 text-base font-normal text-gray-600">
							We maintain your property to the standards we'd want for our own. Working with you to
							develop a plan that fits your vision and your land, we make seasonal adjustments and
							keep things looking their best year-round.
						</p>
						<ul class="list-inside list-disc space-y-2 text-base font-normal text-gray-600">
							<li>Routine lawn maintenance and mowing</li>
							<li>Landscape design and planning</li>
							<li>Tree and shrub planting</li>
							<li>Seasonal cleanup and prep</li>
							<li>Property beautification projects</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Trail Systems -->
			<div id="trail-systems">
				<div class="flex items-start gap-6">
					<div
						class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-500 text-xl font-bold text-white"
					>
						5
					</div>
					<div class="flex-1">
						<h3 class="mb-3 text-xl font-bold text-gray-900">Trail Systems</h3>
						<p class="mb-4 text-base font-normal text-gray-600">
							If you have a large tract of land, what better way to enjoy it than with a trail
							system? We design and build paths of all kinds — from simple walking loops to
							full-scale systems with signage and mapping.
						</p>
						<ul class="list-inside list-disc space-y-2 text-base font-normal text-gray-600">
							<li>Walking and nature trail design</li>
							<li>ATV and utility vehicle paths</li>
							<li>Equestrian trail systems</li>
							<li>Perimeter and loop trails</li>
							<li>Signage and mapping options</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Project Management -->
			<div id="project-management">
				<div class="flex items-start gap-6">
					<div
						class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-500 text-xl font-bold text-white"
					>
						6
					</div>
					<div class="flex-1">
						<h3 class="mb-3 text-xl font-bold text-gray-900">Project Management</h3>
						<p class="mb-4 text-base font-normal text-gray-600">
							Looking at a full property buildout or a specific improvement like re-routing your
							driveway? We manage the whole process — bringing in vetted partners when needed — so
							you have one point of contact and a project that finishes on time.
						</p>
						<ul class="list-inside list-disc space-y-2 text-base font-normal text-gray-600">
							<li>Full property buildout oversight</li>
							<li>Driveway rerouting and redesign</li>
							<li>Site improvement coordination</li>
							<li>Subcontractor management</li>
							<li>Rural and residential property projects</li>
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
			area — and we look forward to making your dreams for your property become reality.
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
