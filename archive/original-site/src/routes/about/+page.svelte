<!--
	About Page Component
	Company information, history, values, and team
-->
<script lang="ts">
	import { Section, FeatureCard } from '$lib';
	import { features } from '$lib/data/features';
	import { COMPANY_INFO } from '$lib/config/constants';
</script>

<!--
	Page Hero Section
-->
<Section variant="gray" class="mt-16 md:mt-28">
	<div class="mx-auto max-w-4xl text-center">
		<h1 class="mb-6 text-xl font-bold text-gray-900">About The A.W. Vaughan Company</h1>
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
	<div class="mx-auto max-w-4xl">
		<div class="grid items-center gap-12 md:grid-cols-2">
			<!-- Company Image -->
			<div class="overflow-hidden rounded-lg shadow-lg">
				<img
					src="/about-image.jpg"
					alt="The A.W. Vaughan Company team working on excavation project in Virginia Beach"
					class="h-auto w-full object-cover"
					width="844"
					height="1125"
					loading="lazy"
				/>
			</div>

			<!-- Company Story -->
			<div>
				<h2 class="mb-4 text-xl font-bold text-gray-900">Our Story</h2>
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
						prepared shed pad, we bring the right expertise and equipment to get the job done right.
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
	<div class="mx-auto max-w-4xl">
		<h2 class="mb-12 text-center text-xl font-bold text-gray-900">Our Values</h2>

		<!-- Value Propositions Grid -->
		<div class="grid gap-8 md:grid-cols-3">
			{#each features as feature (feature.title)}
				<FeatureCard {feature} />
			{/each}
		</div>
	</div>
</Section>

<!--
	Why Choose Us Section
-->
<Section variant="white">
	<div class="mx-auto max-w-4xl">
		<h2 class="mb-8 text-center text-xl font-bold text-gray-900">Why Choose Us</h2>

		<div class="grid gap-8 md:grid-cols-2">
			<!-- Reason 1 -->
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="mb-2 text-xl font-bold text-gray-900">Local Expertise</h3>
				<p class="text-base font-normal text-gray-600">
					We understand Virginia Beach soil, drainage challenges, and weather patterns. Our
					solutions are designed specifically for our local environment and built to last through
					our coastal weather conditions.
				</p>
			</div>

			<!-- Reason 2 -->
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="mb-2 text-xl font-bold text-gray-900">Right-Sized Service</h3>
				<p class="text-base font-normal text-gray-600">
					We specialize in residential and small commercial projects. You won't be too small for
					us—these are exactly the projects we excel at and enjoy doing.
				</p>
			</div>

			<!-- Reason 3 -->
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="mb-2 text-xl font-bold text-gray-900">Quality Workmanship</h3>
				<p class="text-base font-normal text-gray-600">
					Every project is completed with attention to detail and professional standards. From
					proper grading to drainage solutions, we do it right the first time.
				</p>
			</div>

			<!-- Reason 4 -->
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="mb-2 text-xl font-bold text-gray-900">Fair & Transparent</h3>
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
	<div class="mx-auto max-w-4xl text-center">
		<h2 class="mb-6 text-xl font-bold text-gray-900">Serving the 757 Area</h2>
		<p class="mb-8 text-lg font-normal text-gray-600">
			Proudly serving {COMPANY_INFO.serviceArea.primary} and surrounding communities including
			{COMPANY_INFO.serviceArea.regions.slice(1).join(', ')}, and all of Hampton Roads.
		</p>
		<a
			href="/contact"
			class="inline-block rounded-lg bg-primary-500 px-8 py-3 text-base font-bold text-white transition-colors hover:bg-primary-600"
		>
			Contact Us
		</a>
	</div>
</Section>
