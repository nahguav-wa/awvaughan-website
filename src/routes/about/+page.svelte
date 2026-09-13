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
			A Williamsburg-based land management contractor — clearing, bush hogging, forestry mulching
			and trail systems across the Historic Triangle and the Middle Peninsula.
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
					alt="Cut field meeting the wood line on a rural property near Williamsburg, Virginia"
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
						doing grading and drainage work on coastal properties. We are now based in Williamsburg
						and work across the Historic Triangle and the Middle Peninsula — from Toano and Yorktown
						out through New Kent, West Point, Gloucester and Saluda.
					</p>
					<p>
						Moving inland changed what people needed from us. Out here the problem is rarely a
						driveway; it is a parcel that has grown up, a field that has not been cut in three
						seasons, woods you cannot walk through, or a back forty you have no way to reach. So
						that is the work we do now: land clearing, bush hogging, forestry mulching, and trail
						systems.
					</p>
					<p>
						What we kept from the earlier work is the part most land clearing outfits skip. Taking
						the cover off a piece of ground changes where the water goes, and a trail cut without
						thinking about grade is a gully by the second storm. We plan for that at layout, not
						after the first hard rain. Clear communication, honest estimates, fair pricing — and we
						will tell you when the job needs a different service than the one you called about.
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
					Virginia pine, sweetgum and hardwood, the invasives that take hold here, and how quickly a
					field reverts on Toano sand versus Middle Peninsula bottomland. We clear for the ground
					you actually have.
				</p>
			</div>

			<!-- Reason 2 -->
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="mb-2 font-bold text-gray-900">Right-Sized Service</h3>
				<p class="text-base font-normal text-gray-600">
					Back lots, single fields, one grown-in fence line. A half-day job is not too small for us
					— it is exactly the work our equipment is sized for.
				</p>
			</div>

			<!-- Reason 3 -->
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="mb-2 font-bold text-gray-900">The Right Method</h3>
				<p class="text-base font-normal text-gray-600">
					Mulching, mowing and full clearing solve different problems and cost different amounts. We
					tell you which one your job actually needs rather than quoting the biggest one.
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
