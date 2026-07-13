<!--
	Gravel Driveway Repair Service Page
-->
<script lang="ts">
	import { Section, Button } from '$lib';
	import { COMPANY_INFO } from '$lib/config/constants';
</script>

<Section variant="gray" class="mt-16 md:mt-28">
	<div class="mx-auto max-w-4xl text-center">
		<h1 class="mb-6 text-xl font-bold text-gray-900">Gravel Driveway Repair & Restoration</h1>
		<p class="text-lg font-normal text-gray-600">
			Professional gravel driveway repair services in Virginia Beach and the 757 area. We restore
			your driveway to proper grade and crown for long-lasting results.
		</p>
	</div>
</Section>

<Section variant="white">
	<div class="mx-auto max-w-4xl">
		<div class="grid items-start gap-12 md:grid-cols-2">
			<div>
				<h2 class="mb-4 text-xl font-bold text-gray-900">
					Is Your Gravel Driveway Showing Its Age?
				</h2>
				<div class="space-y-4 text-base font-normal text-gray-600">
					<p>
						Over time, gravel driveways develop potholes, lose their crown, and suffer from washout.
						These problems don't just look bad—they cause poor drainage, vehicle damage, and can
						worsen rapidly if left unaddressed.
					</p>
					<p>
						At The A.W. Vaughan Company, we specialize in restoring gravel driveways to their proper
						condition. Our approach focuses on correct grading and crown restoration, ensuring water
						flows off your driveway instead of pooling and causing damage.
					</p>
				</div>
			</div>
			<div class="overflow-hidden rounded-lg shadow-lg">
				<img
					src="/work-example-2.jpg"
					alt="Gravel driveway repair project in Virginia Beach showing restored crown and proper drainage"
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
		<h2 class="mb-8 text-center text-xl font-bold text-gray-900">Our Driveway Repair Services</h2>
		<div class="grid gap-8 md:grid-cols-2">
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="mb-2 text-xl font-bold text-gray-900">Crown Restoration</h3>
				<p class="text-base font-normal text-gray-600">
					We restore the proper crown (center-high profile) to your driveway, ensuring water
					naturally flows to the edges rather than pooling in the middle.
				</p>
			</div>
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="mb-2 text-xl font-bold text-gray-900">Pothole Filling & Grading</h3>
				<p class="text-base font-normal text-gray-600">
					We fill potholes with properly graded gravel and regrade your driveway surface for a
					smooth, even driving surface that resists future damage.
				</p>
			</div>
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="mb-2 text-xl font-bold text-gray-900">Washout Repair & Prevention</h3>
				<p class="text-base font-normal text-gray-600">
					We repair washout damage and address the underlying drainage issues that caused it,
					preventing recurring problems and protecting your investment.
				</p>
			</div>
			<div class="border-l-4 border-primary-500 pl-6">
				<h3 class="mb-2 text-xl font-bold text-gray-900">New Gravel & Edge Definition</h3>
				<p class="text-base font-normal text-gray-600">
					We add fresh gravel where needed and define clean driveway edges, giving your property a
					well-maintained, professional appearance.
				</p>
			</div>
		</div>
	</div>
</Section>

<Section variant="white">
	<div class="mx-auto max-w-4xl text-center">
		<h2 class="mb-6 text-xl font-bold text-gray-900">Get Your Driveway Fixed Right</h2>
		<p class="mb-8 text-lg font-normal text-gray-600">
			Contact us today for a free assessment of your gravel driveway. We serve {COMPANY_INFO
				.serviceArea.primary} and the entire 757 area.
		</p>
		<div class="flex flex-col justify-center gap-4 sm:flex-row">
			<Button variant="primary" href="/contact" size="md">Get a Free Quote</Button>
			<Button variant="secondary" href={COMPANY_INFO.phoneHref} size="md">
				Call {COMPANY_INFO.phone}
			</Button>
		</div>
	</div>
</Section>
