<!--
	Error Page Component
	Custom error page for 404 and other errors
-->
<script lang="ts">
	import { page } from '$app/stores';
	import Section from '$lib/components/ui/Section.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { COMPANY_INFO } from '$lib/config/constants';
</script>

<svelte:head>
	<title>Page Not Found | {COMPANY_INFO.name}</title>
</svelte:head>

<Section variant="gray" class="mt-16 md:mt-28">
	<div class="max-w-2xl mx-auto text-center">
		<p class="text-xl font-bold text-primary-500 mb-4">{$page.status}</p>
		<h1 class="text-xl font-bold text-gray-900 mb-6">
			{#if $page.status === 404}
				Page Not Found
			{:else}
				Something Went Wrong
			{/if}
		</h1>
		<p class="text-lg font-normal text-gray-600 mb-8">
			{#if $page.status === 404}
				The page you're looking for doesn't exist or has been moved. Let us help you find what
				you need.
			{:else}
				We encountered an unexpected error. Please try again or contact us directly.
			{/if}
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<Button variant="primary" href="/" size="md">Back to Home</Button>
			<Button variant="secondary" href="/contact" size="md">Contact Us</Button>
		</div>
		<p class="text-base font-normal text-gray-500 mt-8">
			Or call us directly at
			<a href={COMPANY_INFO.phoneHref} class="text-primary-500 hover:text-primary-600 font-bold">
				{COMPANY_INFO.phone}
			</a>
		</p>
	</div>
</Section>
