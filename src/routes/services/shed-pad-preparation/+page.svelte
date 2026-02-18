<!--
	Shed Pad Preparation Service Page
-->
<script lang="ts">
	import { Section, Button } from '$lib';
	import { COMPANY_INFO } from '$lib/config/constants';
</script>

<Section variant="gray" class="mt-16 md:mt-28">
	<div class="mx-auto max-w-4xl text-center">
		<h1 class="mb-6 text-xl font-bold text-gray-900">Shed Pad & Foundation Preparation</h1>
		<p class="text-lg font-normal text-gray-600">
			Professional site preparation for sheds and small structures in Virginia Beach. We build
			level, stable foundations that drain properly and last for years.
		</p>
	</div>
</Section>

<Section variant="white">
	<div class="mx-auto max-w-4xl">
		<div class="grid items-start gap-12 md:grid-cols-2">
			<div>
				<h2 class="mb-4 text-xl font-bold text-gray-900">Getting a New Shed or Structure?</h2>
				<div class="space-y-4 text-base font-normal text-gray-600">
					<p>
						A proper foundation is the most important factor in your shed's longevity. Without
						correct site preparation, sheds settle unevenly, doors stop closing, and moisture damage
						sets in quickly.
					</p>
					<p>
						We prepare shed pads with precise leveling, proper drainage grading, and compacted
						gravel bases that provide a stable, long-lasting foundation. Our preparation ensures
						your shed stays level and dry for years to come.
					</p>
				</div>
			</div>
			<div class="overflow-hidden rounded-lg shadow-lg">
				<img
					src="/work-example-4.jpg"
					alt="Prepared shed pad with level gravel base in Virginia Beach"
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
		<h2 class="mb-8 text-center text-xl font-bold text-gray-900">Our Preparation Process</h2>
		<div class="grid gap-8 md:grid-cols-2">
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="mb-2 text-xl font-bold text-gray-900">Site Clearing & Leveling</h3>
				<p class="text-base font-normal text-gray-600">
					We clear vegetation, remove debris, and level the site to create a clean, even surface for
					your foundation.
				</p>
			</div>
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="mb-2 text-xl font-bold text-gray-900">Drainage Grading</h3>
				<p class="text-base font-normal text-gray-600">
					Proper grading ensures water flows away from your shed, preventing moisture damage and
					extending the life of your structure.
				</p>
			</div>
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="mb-2 text-xl font-bold text-gray-900">Gravel Base Installation</h3>
				<p class="text-base font-normal text-gray-600">
					We install and spread the right type and depth of gravel to create a solid, well-draining
					base for your structure.
				</p>
			</div>
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="mb-2 text-xl font-bold text-gray-900">Compaction & Final Prep</h3>
				<p class="text-base font-normal text-gray-600">
					Professional compaction ensures your base is solid and stable, preventing settling and
					providing a level surface for years to come.
				</p>
			</div>
		</div>
	</div>
</Section>

<Section variant="white">
	<div class="mx-auto max-w-4xl text-center">
		<h2 class="mb-6 text-xl font-bold text-gray-900">Ready to Prepare Your Site?</h2>
		<p class="mb-8 text-lg font-normal text-gray-600">
			Contact us for a free site assessment and quote. We serve {COMPANY_INFO.serviceArea.primary} and
			the entire 757 area.
		</p>
		<div class="flex flex-col justify-center gap-4 sm:flex-row">
			<Button variant="primary" href="/contact" size="md">Get a Free Quote</Button>
			<Button variant="secondary" href={COMPANY_INFO.phoneHref} size="md">
				Call {COMPANY_INFO.phone}
			</Button>
		</div>
	</div>
</Section>
