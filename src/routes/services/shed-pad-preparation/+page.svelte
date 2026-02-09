<!--
	Shed Pad Preparation Service Page
-->
<script lang="ts">
	import Section from '$lib/components/ui/Section.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { COMPANY_INFO } from '$lib/config/constants';
</script>

<Section variant="gray" class="mt-16 md:mt-28">
	<div class="max-w-4xl mx-auto text-center">
		<h1 class="text-xl font-bold text-gray-900 mb-6">Shed Pad & Foundation Preparation</h1>
		<p class="text-lg font-normal text-gray-600">
			Professional site preparation for sheds and small structures in Virginia Beach. We build
			level, stable foundations that drain properly and last for years.
		</p>
	</div>
</Section>

<Section variant="white">
	<div class="max-w-4xl mx-auto">
		<div class="grid md:grid-cols-2 gap-12 items-start">
			<div>
				<h2 class="text-xl font-bold text-gray-900 mb-4">Getting a New Shed or Structure?</h2>
				<div class="space-y-4 text-base font-normal text-gray-600">
					<p>
						A proper foundation is the most important factor in your shed's longevity. Without
						correct site preparation, sheds settle unevenly, doors stop closing, and moisture
						damage sets in quickly.
					</p>
					<p>
						We prepare shed pads with precise leveling, proper drainage grading, and compacted
						gravel bases that provide a stable, long-lasting foundation. Our preparation ensures
						your shed stays level and dry for years to come.
					</p>
				</div>
			</div>
			<div class="rounded-lg overflow-hidden shadow-lg">
				<img
					src="/work-example-4.jpg"
					alt="Prepared shed pad with level gravel base in Virginia Beach"
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
		<h2 class="text-xl font-bold text-gray-900 mb-8 text-center">Our Preparation Process</h2>
		<div class="grid md:grid-cols-2 gap-8">
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="text-xl font-bold text-gray-900 mb-2">Site Clearing & Leveling</h3>
				<p class="text-base font-normal text-gray-600">
					We clear vegetation, remove debris, and level the site to create a clean, even surface
					for your foundation.
				</p>
			</div>
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="text-xl font-bold text-gray-900 mb-2">Drainage Grading</h3>
				<p class="text-base font-normal text-gray-600">
					Proper grading ensures water flows away from your shed, preventing moisture damage and
					extending the life of your structure.
				</p>
			</div>
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="text-xl font-bold text-gray-900 mb-2">Gravel Base Installation</h3>
				<p class="text-base font-normal text-gray-600">
					We install and spread the right type and depth of gravel to create a solid, well-draining
					base for your structure.
				</p>
			</div>
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="text-xl font-bold text-gray-900 mb-2">Compaction & Final Prep</h3>
				<p class="text-base font-normal text-gray-600">
					Professional compaction ensures your base is solid and stable, preventing settling and
					providing a level surface for years to come.
				</p>
			</div>
		</div>
	</div>
</Section>

<Section variant="white">
	<div class="max-w-4xl mx-auto text-center">
		<h2 class="text-xl font-bold text-gray-900 mb-6">Ready to Prepare Your Site?</h2>
		<p class="text-lg font-normal text-gray-600 mb-8">
			Contact us for a free site assessment and quote. We serve {COMPANY_INFO.serviceArea
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
