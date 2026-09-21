<!--
	About Page Component
	Company information, history, values, and team
-->
<script lang="ts">
	import { Section, FeatureCard, Picture } from '$lib';
	import { features } from '$lib/data/features';
	import { COMPANY_INFO, ROUTES } from '$lib/config/constants';
</script>

<!--
	Page Hero Section
-->
<Section variant="gray">
	<div class="mx-auto max-w-4xl text-center">
		<h1 class="mb-6 font-bold text-gray-900">About The A.W. Vaughan Company</h1>
		<p class="text-lg font-normal text-gray-600">
			A Williamsburg-based landscape maintenance contractor — comprehensive maintenance programs,
			full service turf care, tree and shrub care, and seasonal clean-up across the Historic
			Triangle and the Middle Peninsula.
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
						What we do now is landscape maintenance and management. Your long-term property
						viability should be at the heart of your landscape program, so ours starts with
						horticultural recommendations and a written maintenance plan made with the life of the
						property in mind — comprehensive maintenance, full service turf care, tree and shrub
						care, and the spring and fall clean-ups that set up the rest of the year.
					</p>
					<p>
						We also prepare budgets and estimates detailing maintenance costs and recommendations,
						provide digital photos documenting site improvements or potential issues, and conduct
						quality monthly site inspections. That is the difference between a crew that turns up
						and a program somebody is actually managing.
					</p>
					<p>
						What we kept from the earlier work is the part most maintenance outfits skip: where the
						water goes. Compacted ground sheds a summer storm instead of taking it in, beds wash
						out, and turf drowns in the low corner every wet winter. We came up doing grading and
						drainage, so we read a site that way first. Clear communication, honest estimates, fair
						pricing — and we will tell you when what the property needs is not what you called
						about.
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
				<h3 class="mb-2 font-bold text-gray-900">Local Horticultural Knowledge</h3>
				<p class="text-base font-normal text-gray-600">
					Tall fescue that thins through a humid August, warm-season turf on the opposite calendar,
					and the scale, lace bugs and fungal problems a Tidewater summer brings on. We maintain for
					the ground and the climate you actually have.
				</p>
			</div>

			<!-- Reason 2 -->
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="mb-2 font-bold text-gray-900">Planned, Not Reactive</h3>
				<p class="text-base font-normal text-gray-600">
					A written management plan and a budget ahead of the year, so improvements are decisions
					you approve rather than line items you discover on an invoice.
				</p>
			</div>

			<!-- Reason 3 -->
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="mb-2 font-bold text-gray-900">Right-Sized Attention</h3>
				<p class="text-base font-normal text-gray-600">
					Larger residential lots, rural property and small commercial grounds — too much ground for
					a tight suburban route and too fine to be treated as rough cutting. That is exactly the
					work we are set up for.
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
			and Middle Peninsula. Not sure whether you are in range?
			<a
				href={ROUTES.serviceArea}
				class="font-bold text-primary-500 underline transition-colors hover:text-primary-600"
			>
				See the full service area map
			</a>, or call and ask — if we can get there, we will.
		</p>
		<a
			href="/contact"
			class="inline-block rounded-lg bg-primary-500 px-8 py-3 text-base font-bold text-white transition-colors hover:bg-primary-600"
		>
			Contact Us
		</a>
	</div>
</Section>
