<!--
	Drainage Solutions Service Page
-->
<script lang="ts">
	import Section from '$lib/components/ui/Section.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { COMPANY_INFO } from '$lib/config/constants';
</script>

<Section variant="gray" class="mt-16 md:mt-28">
	<div class="max-w-4xl mx-auto text-center">
		<h1 class="text-xl font-bold text-gray-900 mb-6">Drainage Solutions & Grading</h1>
		<p class="text-lg font-normal text-gray-600">
			Eliminate standing water and protect your property with professional drainage solutions
			designed for Virginia Beach soil and weather conditions.
		</p>
	</div>
</Section>

<Section variant="white">
	<div class="max-w-4xl mx-auto">
		<div class="grid md:grid-cols-2 gap-12 items-start">
			<div>
				<h2 class="text-xl font-bold text-gray-900 mb-4">Standing Water Damaging Your Property?</h2>
				<div class="space-y-4 text-base font-normal text-gray-600">
					<p>
						Poor drainage is one of the most common and destructive problems for properties in the
						Virginia Beach area. Standing water erodes driveways, damages foundations, creates
						breeding grounds for mosquitoes, and turns yards into muddy messes.
					</p>
					<p>
						We design and implement drainage solutions customized for your property's specific
						needs. Our understanding of local soil conditions and coastal weather patterns means
						we build systems that work effectively year-round.
					</p>
				</div>
			</div>
			<div class="rounded-lg overflow-hidden shadow-lg">
				<img
					src="/work-example-3.jpg"
					alt="Professional drainage solution installation in Virginia Beach property"
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
		<h2 class="text-xl font-bold text-gray-900 mb-8 text-center">Our Drainage Services</h2>
		<div class="grid md:grid-cols-2 gap-8">
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="text-xl font-bold text-gray-900 mb-2">Swale & Ditch Repair</h3>
				<p class="text-base font-normal text-gray-600">
					We install and repair swales and ditches to channel water away from your driveway,
					buildings, and sensitive areas of your property.
				</p>
			</div>
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="text-xl font-bold text-gray-900 mb-2">French Drain Systems</h3>
				<p class="text-base font-normal text-gray-600">
					Subsurface French drains collect and redirect groundwater, solving persistent wet spots
					and protecting your property's foundation.
				</p>
			</div>
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="text-xl font-bold text-gray-900 mb-2">Culvert Installation & Repair</h3>
				<p class="text-base font-normal text-gray-600">
					We install new culverts and repair existing ones to ensure proper water flow under
					driveways and access roads.
				</p>
			</div>
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="text-xl font-bold text-gray-900 mb-2">Site Grading & Erosion Control</h3>
				<p class="text-base font-normal text-gray-600">
					Professional grading directs water flow away from structures and prevents erosion,
					protecting your property's long-term value.
				</p>
			</div>
		</div>
	</div>
</Section>

<Section variant="white">
	<div class="max-w-4xl mx-auto text-center">
		<h2 class="text-xl font-bold text-gray-900 mb-6">Solve Your Drainage Problems</h2>
		<p class="text-lg font-normal text-gray-600 mb-8">
			Contact us today for a free drainage assessment. We serve {COMPANY_INFO.serviceArea
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
