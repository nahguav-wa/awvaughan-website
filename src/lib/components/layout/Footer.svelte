<!--
	Footer Component
	Minimal footer: name, nav, social/contact links, and copyright.
-->
<script lang="ts">
	import { SITE, NAV_LINKS, SOCIAL_LINKS } from '$lib/config/site';

	const currentYear = new Date().getFullYear();
</script>

<footer class="mt-24 border-t border-stone-200 dark:border-stone-800">
	<div
		class="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-10 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between dark:text-stone-400"
	>
		<div class="flex flex-wrap gap-x-6 gap-y-2">
			{#each NAV_LINKS as link (link.href)}
				<a href={link.href} class="transition-colors hover:text-primary-600">{link.label}</a>
			{/each}
			{#each SOCIAL_LINKS as link (link.href)}
				<a href={link.href} class="transition-colors hover:text-primary-600">{link.label}</a>
			{/each}
		</div>
		<p>&copy; {currentYear} {SITE.name}</p>
	</div>
</footer>
