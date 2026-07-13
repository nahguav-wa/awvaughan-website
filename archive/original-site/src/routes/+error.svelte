<!--
	Error Page Component
	Custom error page for 404 and other errors
-->
<script lang="ts">
	import { page } from '$app/stores';
	import { Section, Button } from '$lib';
	import { COMPANY_INFO } from '$lib/config/constants';
</script>

<svelte:head>
	<title>Page Not Found | {COMPANY_INFO.name}</title>
</svelte:head>

<Section variant="gray" class="mt-16 md:mt-28">
	<div class="mx-auto max-w-2xl text-center">
		<p class="mb-4 text-xl font-bold text-primary-500">{$page.status}</p>
		<h1 class="mb-6 text-xl font-bold text-gray-900">
			{#if $page.status === 404}
				Page Not Found
			{:else}
				Something Went Wrong
			{/if}
		</h1>
		<p class="mb-8 text-lg font-normal text-gray-600">
			{#if $page.status === 404}
				The page you're looking for doesn't exist or has been moved. Let us help you find what you
				need.
			{:else}
				We encountered an unexpected error. Please try again or contact us directly.
			{/if}
		</p>
		<div class="flex flex-col justify-center gap-4 sm:flex-row">
			<Button variant="primary" href="/" size="md">Back to Home</Button>
			<Button variant="secondary" href="/contact" size="md">Contact Us</Button>
		</div>
		<p class="mt-8 text-base font-normal text-gray-500">
			Or call us directly at
			<a href={COMPANY_INFO.phoneHref} class="font-bold text-primary-500 hover:text-primary-600">
				{COMPANY_INFO.phone}
			</a>
		</p>
	</div>
</Section>
