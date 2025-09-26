<script lang="ts">
	import { dev } from '$app/environment';
	import { resolve } from '$app/paths';
	import { createSeo, getLinkKey, getMetaKey } from '$lib/seo';

	// eslint-disable-next-line svelte/valid-prop-names-in-kit-pages
	export let error: (Error & { message?: string }) | null;
	// eslint-disable-next-line svelte/valid-prop-names-in-kit-pages
	export let status: number;

	const phoneNumber = '(757) 402-1100';
	const phoneHref = 'tel:+17574021100';
	const email = 'alex.vaughan@awvaughan.com';

	const isNotFound = status === 404;
	const title = isNotFound ? "We can't find that page." : 'Something went off course.';
	const description = isNotFound
		? "The link may be out of date or the page has been moved. Let's get you headed in the right direction."
		: "An unexpected error kept this page from loading. Try the options below or reach out and we'll help right away.";

	const detailMessage = typeof error?.message === 'string' ? error.message : null;

	const seo = createSeo({
		title: `${status} — ${title}`,
		description,
		robots: 'noindex'
	});
</script>

<svelte:head>
	<title>{seo.title}</title>
	{#each seo.meta as tag (getMetaKey(tag))}
		<meta {...tag} />
	{/each}
	{#each seo.links as link (getLinkKey(link))}
		<link {...link} />
	{/each}
</svelte:head>

<section class="border-b border-[var(--border-soft)] bg-[var(--surface-base)] py-24">
	<div class="mx-auto max-w-4xl space-y-12 px-6 text-[var(--text-dark)]">
		<div class="space-y-6">
			<span
				class="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-[var(--brand-blue)]"
			>
				<span aria-hidden="true" class="inline-flex h-2 w-2 rounded-full bg-[var(--brand-orange)]"
				></span>
				{status}
			</span>
			<h1 class="text-4xl font-semibold sm:text-5xl">{title}</h1>
			<p class="max-w-2xl text-lg text-[var(--text-muted)]">{description}</p>
		</div>

		<div class="grid gap-6 lg:grid-cols-2">
			<div class="space-y-6 rounded-3xl bg-[var(--surface-soft)] p-8 shadow-sm shadow-slate-400/20">
				<h2 class="text-sm font-semibold uppercase tracking-[0.35em] text-[var(--brand-blue)]">
					Quick options
				</h2>
				<ul class="space-y-4 text-base">
					<li>
						<a
							class="group inline-flex items-center gap-3 rounded-full bg-[var(--surface-base)] px-4 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--text-dark)] shadow-md shadow-slate-400/20 transition hover:-translate-y-0.5 hover:text-[var(--brand-blue)] focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-blue)]"
							href={resolve('/')}
						>
							Home
						</a>
					</li>
					<li>
						<a
							class="group inline-flex items-center gap-3 rounded-full bg-[var(--surface-base)] px-4 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--text-dark)] shadow-md shadow-slate-400/20 transition hover:-translate-y-0.5 hover:text-[var(--brand-blue)] focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-blue)]"
							href={resolve('/services')}
						>
							Services
						</a>
					</li>
					<li>
						<a
							class="group inline-flex items-center gap-3 rounded-full bg-[var(--surface-base)] px-4 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--text-dark)] shadow-md shadow-slate-400/20 transition hover:-translate-y-0.5 hover:text-[var(--brand-blue)] focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-blue)]"
							href={resolve('/contact')}
						>
							Contact
						</a>
					</li>
				</ul>
			</div>

			<div
				class="space-y-6 rounded-3xl border border-[var(--border-soft)] bg-[var(--surface-muted)] p-8"
			>
				<h2 class="text-sm font-semibold uppercase tracking-[0.35em] text-[var(--brand-blue)]">
					Need immediate help?
				</h2>
				<p class="text-base text-[var(--text-muted)]">
					Call or email and the AW Vaughan team will respond promptly.
				</p>
				<!-- eslint-disable svelte/no-navigation-without-resolve -->
				<div class="space-y-4 text-base">
					<a
						class="inline-flex items-center gap-3 text-lg font-semibold text-[var(--text-dark)] transition hover:text-[var(--brand-blue)] focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-blue)]"
						href={phoneHref}
					>
						<span
							aria-hidden="true"
							class="inline-flex h-2 w-2 rounded-full bg-[var(--brand-orange)]"
						></span>
						{phoneNumber}
					</a>
					<a
						class="inline-flex items-center gap-3 text-lg font-semibold text-[var(--text-dark)] transition hover:text-[var(--brand-blue)] focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-blue)]"
						href={`mailto:${email}`}
					>
						<span aria-hidden="true" class="inline-flex h-2 w-2 rounded-full bg-[var(--brand-blue)]"
						></span>
						{email}
					</a>
				</div>
				<!-- eslint-enable svelte/no-navigation-without-resolve -->
			</div>
		</div>

		{#if dev && detailMessage}
			<div
				class="rounded-3xl border border-dashed border-[var(--border-soft)] bg-white/70 p-6 text-sm text-[var(--text-muted)]"
			>
				<h2 class="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[var(--brand-blue)]">
					Debug details
				</h2>
				<pre
					class="overflow-auto whitespace-pre-wrap break-words text-[var(--text-dark)]">{detailMessage}</pre>
			</div>
		{/if}
	</div>
</section>
