<script lang="ts">
	import { resolve } from '$app/paths';

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/services', label: 'Services' },
		{ href: '/about', label: 'About' },
		{ href: '/careers', label: 'Careers' },
		{ href: '/contact', label: 'Contact' }
	] as const;
</script>

<svelte:head>
	<title>Page not found | AW Vaughan Company</title>
	<meta
		name="description"
		content="The page you requested could not be found. Explore AW Vaughan Company's main pages to learn about our services."
	/>
</svelte:head>

<section class="flex min-h-[70vh] items-center bg-[var(--surface-base)] py-24">
	<div class="mx-auto flex max-w-3xl flex-col gap-10 px-6 text-[var(--text-dark)]">
		<div class="space-y-4">
			<p class="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--brand-blue)]">
				404 error
			</p>
			<h1 class="text-4xl font-semibold sm:text-5xl">We couldn't find that page.</h1>
			<p class="text-base text-[var(--text-muted)] sm:text-lg">
				The link you followed may be broken or the page might have been removed. Try one of the
				helpful links below to jump back into the site.
			</p>
		</div>

		<div
			class="flex flex-col gap-6 rounded-3xl border border-[var(--border-soft)] bg-[var(--surface-soft)] p-8 shadow-sm"
		>
			<h2 class="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--brand-blue)]">
				Popular destinations
			</h2>
			<ul class="grid gap-4 sm:grid-cols-2">
				{#each links as link (link.href)}
					<li>
						<a
							class="shadow-xs flex items-center justify-between rounded-2xl border border-transparent bg-white px-5 py-4 text-base font-medium text-[var(--text-dark)] transition hover:border-[var(--border-soft)] hover:text-[var(--brand-blue)] hover:shadow-sm"
							href={resolve(link.href)}
						>
							<span>{link.label}</span>
							<span aria-hidden="true">→</span>
						</a>
					</li>
				{/each}
			</ul>
			<div class="text-sm text-[var(--text-muted)]">
				Need something specific? <a
					class="text-[var(--brand-blue)] underline"
					href={resolve('/contact')}
				>
					Contact our team
				</a>
				and we'll point you in the right direction.
			</div>
		</div>
	</div>
</section>
