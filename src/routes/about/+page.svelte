<!--
	About Page Component
	Company information, history, values, and team
-->
<script lang="ts">
	import { Section, FeatureCard, Picture } from '$lib';
	import { features } from '$lib/data/features';
	import { COMPANY_INFO } from '$lib/config/constants';
</script>

<!--
	Page Hero Section
-->
<Section variant="gray">
	<div class="mx-auto max-w-4xl text-center">
		<h1 class="mb-6 font-bold text-gray-900">About The A.W. Vaughan Company</h1>
		<p class="text-lg font-normal text-gray-600">
			A Williamsburg-based gravel driveway repair, drainage, and small excavation contractor serving
			the Historic Triangle and the Middle Peninsula.
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
				<Picture
					name="about-image"
					alt="The A.W. Vaughan Company grading a gravel driveway on a Williamsburg-area property"
					width={844}
					height={1125}
					sizes="(min-width: 768px) 28rem, 100vw"
					class="h-auto w-full object-cover"
				/>
			</div>

			<!-- Company Story -->
			<div>
				<h2 class="mb-4 font-bold text-gray-900">Our Story</h2>
				<div class="space-y-4 text-base font-normal text-gray-600">
					<p>
						The A.W. Vaughan Company was founded in {COMPANY_INFO.yearEstablished} in {COMPANY_INFO.foundedIn},
						repairing gravel driveways and fixing drainage on coastal properties. We are now based
						in Williamsburg, and we work across the Historic Triangle and the Middle Peninsula —
						from Toano and Yorktown out through New Kent, West Point, Gloucester and Saluda.
					</p>
					<p>
						The move brought us to a different kind of ground, and we build for it. Williamsburg and
						James City County sit on heavy clay that holds water long after a storm; the Toano and
						Norge corridor runs to sand that washes; and the Middle Peninsula is flat, low, and slow
						to drain. A driveway crown that works in one of those places fails in another. We read
						the site before we move any material.
					</p>
					<p>
						We specialize in the work that is too small for large contractors and too specialized
						for a landscaper — gravel driveway grading and crown restoration, washouts, standing
						water, culverts, swales, and shed pads. Clear communication, honest estimates, and fair
						pricing. We are not just about moving dirt; we are about making water go where it
						should.
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
		<h2 class="mb-12 text-center font-bold text-gray-900">Our Values</h2>

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
		<h2 class="mb-8 text-center font-bold text-gray-900">Why Choose Us</h2>

		<div class="grid gap-8 md:grid-cols-2">
			<!-- Reason 1 -->
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="mb-2 font-bold text-gray-900">Local Expertise</h3>
				<p class="text-base font-normal text-gray-600">
					Williamsburg clay, the sandy stretches around Toano and Norge, and the low flat ground of
					Gloucester and Saluda each shed water differently. We grade for the ground you actually
					have, so the fix holds through a wet Tidewater winter.
				</p>
			</div>

			<!-- Reason 2 -->
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="mb-2 font-bold text-gray-900">Right-Sized Service</h3>
				<p class="text-base font-normal text-gray-600">
					Residential driveways, rural access roads, and small commercial sites. A one-day driveway
					regrade is not too small for us — it is exactly the work we are built for.
				</p>
			</div>

			<!-- Reason 3 -->
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="mb-2 font-bold text-gray-900">Quality Workmanship</h3>
				<p class="text-base font-normal text-gray-600">
					Every project is completed with attention to detail and professional standards. From
					proper grading to drainage solutions, we do it right the first time.
				</p>
			</div>

			<!-- Reason 4 -->
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="mb-2 font-bold text-gray-900">Fair & Transparent</h3>
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
		<h2 class="mb-6 font-bold text-gray-900">Where We Work</h2>
		<p class="mb-8 text-lg font-normal text-gray-600">
			Based in {COMPANY_INFO.serviceArea.primary} and serving
			{COMPANY_INFO.serviceArea.regions.slice(1).join(', ')}, and the surrounding Historic Triangle
			and Middle Peninsula. Not sure whether you are in range? Call and ask — if we can get there,
			we will.
		</p>
		<a
			href="/contact"
			class="inline-block rounded-lg bg-primary-500 px-8 py-3 text-base font-bold text-white transition-colors hover:bg-primary-600"
		>
			Contact Us
		</a>
	</div>
</Section>
