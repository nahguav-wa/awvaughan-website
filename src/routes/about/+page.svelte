<!--
	About Page Component
	Company information, history, values, and team
-->
<script lang="ts">
	import Section from '$lib/components/ui/Section.svelte';
	import FeatureCard from '$lib/components/FeatureCard.svelte';
	import { features } from '$lib/data/features';
	import { COMPANY_INFO } from '$lib/config/constants';
</script>

<!--
	Page Hero Section
-->
<Section variant="gray" class="mt-16 md:mt-28">
	<div class="max-w-4xl mx-auto text-center">
		<h1 class="text-xl font-bold text-gray-900 mb-6">About The A.W. Vaughan Company</h1>
		<p class="text-lg font-normal text-gray-600">
			Your trusted partner for professional gravel driveway repair, drainage solutions, and
			excavation services in Virginia Beach and the 757 area.
		</p>
	</div>
</Section>

<!--
	Company Story Section
-->
<Section variant="white">
	<div class="max-w-4xl mx-auto">
		<div class="grid md:grid-cols-2 gap-12 items-center">
			<!-- Company Image -->
			<div class="rounded-lg overflow-hidden shadow-lg">
				<img
					src="/about-image.jpg"
					alt="The A.W. Vaughan Company team working on excavation project in Virginia Beach"
					class="w-full h-auto object-cover"
				/>
			</div>

			<!-- Company Story -->
			<div>
				<h2 class="text-xl font-bold text-gray-900 mb-4">Our Story</h2>
				<div class="space-y-4 text-base font-normal text-gray-600">
					<p>
						Founded in {COMPANY_INFO.yearEstablished}, The A.W. Vaughan Company has been serving
						Virginia Beach and the 757 area with professional excavation, gravel driveway repair,
						and drainage solutions. We specialize in the projects that are too small for large
						contractors but require professional expertise and quality workmanship.
					</p>
					<p>
						What sets us apart is our deep understanding of local soil conditions, drainage
						patterns, and climate challenges unique to the Virginia Beach area. Whether you're
						dealing with a washed-out gravel driveway, standing water issues, or need a properly
						prepared shed pad, we bring the right expertise and equipment to get the job done
						right.
					</p>
					<p>
						Our commitment is simple: deliver professional results on time, with clear
						communication, and fair pricing. We're not just about moving dirt—we're about solving
						problems and creating lasting solutions for your property.
					</p>
				</div>
			</div>
		</div>
	</div>
</Section>

<!--
	Our Values Section
-->
<Section variant="gray">
	<div class="max-w-4xl mx-auto">
		<h2 class="text-xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>

		<!-- Value Propositions Grid -->
		<div class="grid md:grid-cols-3 gap-8">
			{#each features as feature}
				<FeatureCard {feature} />
			{/each}
		</div>
	</div>
</Section>

<!--
	Why Choose Us Section
-->
<Section variant="white">
	<div class="max-w-4xl mx-auto">
		<h2 class="text-xl font-bold text-gray-900 mb-8 text-center">Why Choose Us</h2>

		<div class="grid md:grid-cols-2 gap-8">
			<!-- Reason 1 -->
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="text-xl font-bold text-gray-900 mb-2">Local Expertise</h3>
				<p class="text-base font-normal text-gray-600">
					We understand Virginia Beach soil, drainage challenges, and weather patterns. Our
					solutions are designed specifically for our local environment and built to last through
					our coastal weather conditions.
				</p>
			</div>

			<!-- Reason 2 -->
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="text-xl font-bold text-gray-900 mb-2">Right-Sized Service</h3>
				<p class="text-base font-normal text-gray-600">
					We specialize in residential and small commercial projects. You won't be too small for
					us—these are exactly the projects we excel at and enjoy doing.
				</p>
			</div>

			<!-- Reason 3 -->
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="text-xl font-bold text-gray-900 mb-2">Quality Workmanship</h3>
				<p class="text-base font-normal text-gray-600">
					Every project is completed with attention to detail and professional standards. From
					proper grading to drainage solutions, we do it right the first time.
				</p>
			</div>

			<!-- Reason 4 -->
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="text-xl font-bold text-gray-900 mb-2">Fair & Transparent</h3>
				<p class="text-base font-normal text-gray-600">
					Clear communication, honest estimates, and fair pricing. No surprises, no hidden fees—just
					professional service you can count on.
				</p>
			</div>
		</div>
	</div>
</Section>

<!--
	Service Area Section
-->
<Section variant="gray">
	<div class="max-w-4xl mx-auto text-center">
		<h2 class="text-xl font-bold text-gray-900 mb-6">Serving the 757 Area</h2>
		<p class="text-lg font-normal text-gray-600 mb-8">
			Proudly serving {COMPANY_INFO.serviceArea.primary} and surrounding communities including
			{COMPANY_INFO.serviceArea.regions.slice(1).join(', ')}, and all of Hampton Roads.
		</p>
		<a
			href="/contact"
			class="inline-block bg-primary-500 text-white px-8 py-3 text-base font-bold rounded-lg hover:bg-primary-600 transition-colors"
		>
			Contact Us
		</a>
	</div>
</Section>
