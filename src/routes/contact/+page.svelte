<!--
	Contact Page
	Minimal contact page: a direct email link plus other ways to reach me.
-->
<script lang="ts">
	import { SITE, SITE_EMAIL_HREF, SOCIAL_LINKS } from '$lib/config/site';
</script>

<section class="py-8">
	<h1 class="text-2xl font-bold tracking-tight text-stone-900 dark:text-white">Contact</h1>
	<p class="mt-4 max-w-2xl text-lg font-normal text-stone-600 dark:text-stone-300">
		The best way to reach me is by email. I read everything and try to reply to anything thoughtful.
	</p>

	<div class="mt-8">
		<a
			href={SITE_EMAIL_HREF}
			class="inline-block rounded-lg bg-primary-500 px-5 py-2.5 text-base font-bold text-white transition hover:bg-primary-600"
		>
			{SITE.email}
		</a>
	</div>

	<div class="mt-10">
		<h2 class="text-base font-bold text-stone-900 dark:text-white">Elsewhere</h2>
		<ul class="mt-3 space-y-2">
			{#each SOCIAL_LINKS as link (link.href)}
				<li>
					<a href={link.href} class="text-base font-normal text-primary-600 hover:underline">
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>
