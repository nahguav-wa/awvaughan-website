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
		<h1 class="mb-6 font-bold text-gray-900">Land Management Services in Williamsburg, VA</h1>
		<p class="text-lg font-normal text-gray-600">
			Land clearing, bush hogging, forestry mulching, trail systems and property maintenance for
			Williamsburg, Toano, Yorktown, New Kent, West Point, Gloucester, Saluda, and the surrounding
			Historic Triangle and Middle Peninsula.
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
			<!-- Land Clearing -->
			<div>
				<div class="flex items-start gap-6">
					<div
						class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-500 text-xl font-bold text-white"
					>
						1
					</div>
					<div class="flex-1">
						<h3 class="mb-3 font-bold text-gray-900">Land Clearing</h3>
						<p class="mb-4 text-base font-normal text-gray-600">
							Building lots, reclaimed pasture, and parcels that have grown up. Trees and brush
							down, stumps out where the job calls for it, and the ground graded back to something
							you can build on, fence, or seed.
						</p>
						<ul class="list-inside list-disc space-y-2 text-base font-normal text-gray-600">
							<li>House, shop, barn and driveway site clearing</li>
							<li>Pasture and field reclamation</li>
							<li>Stump removal and grubbing</li>
							<li>Debris chipped, burned where permitted, or hauled</li>
							<li>Final grading so the cleared ground drains</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Bush Hogging -->
			<div>
				<div class="flex items-start gap-6">
					<div
						class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-500 text-xl font-bold text-white"
					>
						2
					</div>
					<div class="flex-1">
						<h3 class="mb-3 font-bold text-gray-900">Bush Hogging</h3>
						<p class="mb-4 text-base font-normal text-gray-600">
							Rotary cutting for fields, pasture, vacant lots and hunting land — grass, briars and
							saplings up to about two inches. One pass to reclaim it, or a seasonal schedule so it
							never gets away from you again.
						</p>
						<ul class="list-inside list-disc space-y-2 text-base font-normal text-gray-600">
							<li>Overgrown field and pasture mowing</li>
							<li>Vacant lot, road frontage and right-of-way cutting</li>
							<li>Hunting land, shooting lanes and food plot edges</li>
							<li>Easement and utility corridor maintenance</li>
							<li>Scheduled seasonal cutting</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Forestry Mulching -->
			<div>
				<div class="flex items-start gap-6">
					<div
						class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-500 text-xl font-bold text-white"
					>
						3
					</div>
					<div class="flex-1">
						<h3 class="mb-3 font-bold text-gray-900">Forestry Mulching</h3>
						<p class="mb-4 text-base font-normal text-gray-600">
							Standing brush and small trees ground in place and left as a mulch mat. No burn piles,
							no hauling, no stump holes, and the mat holds the soil while it breaks down — which
							matters on the sandy ground that washes.
						</p>
						<ul class="list-inside list-disc space-y-2 text-base font-normal text-gray-600">
							<li>Underbrush and understory clearing</li>
							<li>Invasive species knockdown</li>
							<li>Fence line and property line clearing</li>
							<li>Selective clearing and view lines</li>
							<li>Trail corridors</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Trail Systems -->
			<div>
				<div class="flex items-start gap-6">
					<div
						class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-500 text-xl font-bold text-white"
					>
						4
					</div>
					<div class="flex-1">
						<h3 class="mb-3 font-bold text-gray-900">Trail Systems</h3>
						<p class="mb-4 text-base font-normal text-gray-600">
							ATV and UTV trails, walking and riding trails, hunting access and firebreaks. Routed
							to shed water rather than channel it, because a trail cut straight up a slope is a
							gully by the second storm.
						</p>
						<ul class="list-inside list-disc space-y-2 text-base font-normal text-gray-600">
							<li>Trail layout and routing</li>
							<li>Corridor cutting and mulching</li>
							<li>Crossings, culverts and water bars</li>
							<li>Firebreaks and equipment access lanes</li>
							<li>Maintenance and reopening closed-in trails</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Property Maintenance -->
			<div>
				<div class="flex items-start gap-6">
					<div
						class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-500 text-xl font-bold text-white"
					>
						5
					</div>
					<div class="flex-1">
						<h3 class="mb-3 font-bold text-gray-900">Property Maintenance</h3>
						<p class="mb-4 text-base font-normal text-gray-600">
							The finish side, and a different job from bush hogging: mown grass, trimmed edges and
							a property that looks maintained week to week. For the larger lots that are too much
							ground for a suburban lawn route and too fine for a rotary cutter.
						</p>
						<ul class="list-inside list-disc space-y-2 text-base font-normal text-gray-600">
							<li>Grass cutting and lawn maintenance</li>
							<li>Trimming and edging around buildings, fences and well heads</li>
							<li>Wood line and yard edge upkeep</li>
							<li>Seasonal and absentee property care</li>
							<li>One-time cleanups before a visit or a sale</li>
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
