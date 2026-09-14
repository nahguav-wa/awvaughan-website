<!--
	Service Page
	One template for every service; content comes from src/lib/data/services.ts.
-->
<script lang="ts">
	import { Section, Button, Picture } from '$lib';
	import { COMPANY_INFO } from '$lib/config/constants';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const service = $derived(data.service);
</script>

<Section variant="gray">
	<div class="mx-auto max-w-4xl text-center">
		<h1 class="mb-6 text-gray-900">{service.heading}</h1>
		<p class="text-lg font-normal text-gray-600">{service.intro}</p>
	</div>
</Section>

<Section variant="white">
	<div class="mx-auto max-w-4xl">
		<div class="grid items-start gap-12 {service.image ? 'md:grid-cols-2' : ''}">
			<div>
				<h2 class="mb-4 text-gray-900">{service.problem.heading}</h2>
				<div class="space-y-4 text-base font-normal text-gray-600">
					{#each service.problem.paragraphs as paragraph (paragraph)}
						<p>{paragraph}</p>
					{/each}
				</div>
			</div>
			{#if service.image}
				<div class="overflow-hidden rounded-lg shadow-lg">
					<Picture
						name={service.image.name}
						alt={service.image.alt}
						width={service.image.width}
						height={service.image.height}
						sizes="(min-width: 768px) 28rem, 100vw"
						class="h-auto w-full object-cover"
					/>
				</div>
			{/if}
		</div>
	</div>
</Section>

<Section variant="gray">
	<div class="mx-auto max-w-4xl">
		<h2 class="mb-8 text-center text-gray-900">{service.offeringsHeading}</h2>
		<div class="grid gap-8 md:grid-cols-2">
			{#each service.offerings as offering (offering.title)}
				<div class="border-l-4 border-primary-500 pl-6">
					<h3 class="mb-2 text-gray-900">{offering.title}</h3>
					<p class="text-base font-normal text-gray-600">{offering.description}</p>
				</div>
			{/each}
		</div>
	</div>
</Section>

<Section variant="white">
	<div class="mx-auto max-w-4xl text-center">
		<h2 class="mb-6 text-gray-900">{service.cta.heading}</h2>
		<p class="mb-8 text-lg font-normal text-gray-600">{service.cta.body}</p>
		<div class="flex flex-col justify-center gap-4 sm:flex-row">
			<Button variant="primary" href="/contact" size="md">Get a Free Quote</Button>
			<Button variant="secondary" href={COMPANY_INFO.phoneHref} size="md">
				Call {COMPANY_INFO.phone}
			</Button>
		</div>
	</div>
</Section>
