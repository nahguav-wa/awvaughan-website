<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/stores';

	const navigation = [
		{ href: '/about', label: 'About' },
		{ href: '/services', label: 'Services' }
	] as const;

	const contactPath = '/contact' as const;

	// Normalize paths to avoid false negatives due to trailing slashes
	const normalize = (path: string) => (path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path);
	$: currentPath = normalize($page.url.pathname);
	const isActive = (href: string) => normalize(resolve(href)) === currentPath;
</script>

<header class="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur">
	<div class="mx-auto flex w-full max-w-6xl items-center gap-x-6 px-6 py-4">
		<a href={resolve('/')} class="text-lg font-semibold tracking-wide text-white"
			>AW Vaughan Company</a
		>

		<div
			class="ml-auto flex w-full flex-wrap items-center justify-end gap-x-6 gap-y-3 text-right sm:flex-nowrap"
		>
			<nav
				class="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-[0.7rem] font-medium tracking-[0.2em] text-slate-200 uppercase sm:text-xs sm:tracking-[0.25em] md:text-sm md:tracking-[0.3em]"
			>
				{#each navigation as item (item.href)}
					<a
						href={resolve(item.href)}
						class="transition hover:text-cyan-300"
						class:text-cyan-300={isActive(item.href)}
						aria-current={isActive(item.href) ? 'page' : undefined}
					>
						{item.label}
					</a>
				{/each}
			</nav>

			<a
				class="rounded-full border border-cyan-400/70 px-5 py-2 text-xs font-semibold tracking-[0.2em] text-cyan-300 uppercase transition hover:-translate-y-0.5 hover:border-cyan-300 hover:text-white sm:text-sm sm:tracking-[0.25em]"
				href={resolve(contactPath)}
				class:text-white={isActive(contactPath)}
				aria-current={isActive(contactPath) ? 'page' : undefined}
			>
				Contact Us
			</a>
		</div>
	</div>
</header>
