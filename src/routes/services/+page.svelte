<!--
	Services Page Component
	Detailed listing of all service offerings

	The "We Provide" list is the company's own summary of the program and names
	all five commitments, including spring and fall clean-up. There are four
	service pages rather than five because spring and fall clean-up is what the
	seasonal clean-up page covers; two pages saying the same thing would split
	their own ranking and read as filler.
-->
<script lang="ts">
	import { Section, ServiceCard } from '$lib';
	import { services } from '$lib/data/services';

	/** The company's own summary of what the program includes. */
	const provided = [
		'Comprehensive maintenance solutions',
		'Full service turf care programs',
		'Tree and shrub care',
		'Seasonal clean-up',
		'Spring and fall clean-up'
	];
</script>

<!--
	Page Hero Section
-->
<Section variant="gray">
	<div class="mx-auto max-w-4xl text-center">
		<h1 class="mb-6 font-bold text-gray-900">Landscape Maintenance and Management</h1>
		<p class="text-lg font-normal text-gray-600">
			Comprehensive maintenance, full service turf care, tree and shrub care, and seasonal clean-up
			for Williamsburg, Toano, Yorktown, New Kent, West Point, Gloucester, Saluda, and the
			surrounding Historic Triangle and Middle Peninsula.
		</p>
	</div>
</Section>

<!--
	Program Overview & "We Provide" Section

	This is the positioning statement for the whole business: the program is
	planned around the property's long term rather than sold as a weekly visit.
-->
<Section variant="white">
	<div class="mx-auto max-w-4xl">
		<div class="grid items-start gap-12 md:grid-cols-2">
			<div class="space-y-4 text-base font-normal text-gray-600">
				<p>
					Your long-term property viability should be at the heart of your landscape program. That
					is why our full range of services starts with horticultural recommendations and a written
					landscape management and maintenance plan made with the life of the property in mind.
				</p>
				<p>
					In addition to the services listed here, we will prepare budgets and estimates detailing
					maintenance costs and recommendations, provide digital photos documenting site
					improvements or potential issues, and conduct quality monthly site inspections performed
					by senior management.
				</p>
			</div>

			<div class="rounded-lg bg-gray-50 p-8">
				<h2 class="mb-6 font-bold text-gray-900">We Provide</h2>
				<ul class="space-y-3 text-base font-normal text-gray-600">
					{#each provided as item (item)}
						<li class="border-l-4 border-primary-500 pl-4">{item}</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</Section>

<!--
	Services Grid Section
-->
<Section variant="gray">
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
<Section variant="white">
	<div class="mx-auto max-w-4xl">
		<h2 class="mb-12 text-center font-bold text-gray-900">What We Do</h2>

		<div class="space-y-12">
			<!-- Comprehensive Maintenance Solutions -->
			<div>
				<div class="flex items-start gap-6">
					<div
						class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-500 text-xl font-bold text-white"
					>
						1
					</div>
					<div class="flex-1">
						<h3 class="mb-3 font-bold text-gray-900">Comprehensive Maintenance Solutions</h3>
						<p class="mb-4 text-base font-normal text-gray-600">
							One program covering the whole property rather than a list of separate jobs. The plan
							is written down, the costs are laid out ahead of the year, the work is photographed,
							and the site is walked every month by someone other than the crew that maintained it.
						</p>
						<ul class="list-inside list-disc space-y-2 text-base font-normal text-gray-600">
							<li>Written landscape management and maintenance plans</li>
							<li>Maintenance budgets, estimates and recommendations</li>
							<li>Digital photo documentation of improvements and issues</li>
							<li>Monthly quality site inspections by senior management</li>
							<li>One point of contact for turf, trees, beds and seasonal work</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Full Service Turf Care Programs -->
			<div>
				<div class="flex items-start gap-6">
					<div
						class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-500 text-xl font-bold text-white"
					>
						2
					</div>
					<div class="flex-1">
						<h3 class="mb-3 font-bold text-gray-900">Full Service Turf Care Programs</h3>
						<p class="mb-4 text-base font-normal text-gray-600">
							Mowing is one line in a turf program, not the whole of it. Feeding built on a soil
							test, weed and disease control timed to the season, and aeration and overseeding are
							what actually change the stand rather than its appearance this week.
						</p>
						<ul class="list-inside list-disc space-y-2 text-base font-normal text-gray-600">
							<li>Mowing at the right height for the species and season</li>
							<li>Trimming and edging around buildings, fences and bed lines</li>
							<li>Fertilization and soil health programs</li>
							<li>Pre-emergent and targeted weed, insect and disease control</li>
							<li>Core aeration, overseeding and turf renovation</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Tree and Shrub Care -->
			<div>
				<div class="flex items-start gap-6">
					<div
						class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-500 text-xl font-bold text-white"
					>
						3
					</div>
					<div class="flex-1">
						<h3 class="mb-3 font-bold text-gray-900">Tree and Shrub Care</h3>
						<p class="mb-4 text-base font-normal text-gray-600">
							Turf recovers in a season; a shrub bed takes years and a specimen tree takes a
							generation. Pruning is a horticultural decision about the plant and its bloom cycle,
							not a shape decision made with a hedge trimmer in February.
						</p>
						<ul class="list-inside list-disc space-y-2 text-base font-normal text-gray-600">
							<li>Structural, thinning and renewal pruning</li>
							<li>Hedges kept dense rather than sheared hollow</li>
							<li>Root-zone fertilization for trees and shrubs</li>
							<li>Scale, bagworm, lace bug, borer and fungal treatment</li>
							<li>Bed edging, weeding and mulching to the correct depth</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Seasonal Clean-Up -->
			<div>
				<div class="flex items-start gap-6">
					<div
						class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-500 text-xl font-bold text-white"
					>
						4
					</div>
					<div class="flex-1">
						<h3 class="mb-3 font-bold text-gray-900">Seasonal, Spring and Fall Clean-Up</h3>
						<p class="mb-4 text-base font-normal text-gray-600">
							The two clean-ups that decide how the rest of the year goes. A fall left on the ground
							mats down over the turf through a wet winter and kills it in patches by March; a
							spring clean-up is what lets everything else in the program work.
						</p>
						<ul class="list-inside list-disc space-y-2 text-base font-normal text-gray-600">
							<li>Spring clean-up, cutbacks and re-edging</li>
							<li>Fall clean-up and leaf removal through the drop</li>
							<li>Fresh mulch laid before the weed seed germinates</li>
							<li>Storm and blow-down debris clearing</li>
							<li>Bed renewal and winter preparation</li>
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
<Section variant="gray">
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
