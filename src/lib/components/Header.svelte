<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	const navigation = [
		{ href: '/about', label: 'About' },
		{ href: '/services', label: 'Services' }
	] as const;

	const contactPath = '/contact' as const;

	// Normalize paths to avoid false negatives due to trailing slashes
	const normalize = (path: string) =>
		path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
	$: currentPath = normalize($page.url.pathname);
	const isActive = (href: Parameters<typeof resolve>[0]) =>
		normalize(resolve(href)) === currentPath;

	let menuOpen = false;
	let previousPath: string | null = null;
	const navId = 'primary-navigation';

	const toggleMenu = () => {
		menuOpen = !menuOpen;
	};

	const closeMenu = () => {
		menuOpen = false;
	};

	const handleEscape = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			closeMenu();
		}
	};

	onMount(() => {
		window.addEventListener('keydown', handleEscape);
		return () => {
			window.removeEventListener('keydown', handleEscape);
		};
	});

	$: if (previousPath !== currentPath) {
		previousPath = currentPath;
		menuOpen = false;
	}

	const handleLinkActivate = () => {
		closeMenu();
	};
</script>

<header
	class="sticky top-0 z-50 border-b border-white/10 bg-[var(--brand-navy-900)]/90 backdrop-blur"
>
	<div class="mx-auto flex w-full max-w-6xl items-center gap-x-4 px-6 py-4">
		<a
			href={resolve('/')}
			class="flex items-center gap-3 rounded-full bg-white/5 px-4 py-2 text-left text-white transition hover:bg-white/10"
		>
			<span
				class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-orange)] text-sm font-semibold text-[var(--brand-navy-900)]"
				aria-hidden="true"
			>
				AW
			</span>
			<span class="text-sm leading-tight font-semibold tracking-[0.25em] text-slate-100 uppercase">
				AW Vaughan Company
			</span>
		</a>

		<button
			type="button"
			class="ml-auto inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold tracking-[0.3em] text-slate-100 uppercase transition hover:border-white/30 hover:text-[var(--brand-orange)] focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-orange)] sm:hidden"
			aria-expanded={menuOpen}
			aria-controls={navId}
			on:click={toggleMenu}
		>
			<svg
				aria-hidden="true"
				class="h-4 w-4"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				{#if menuOpen}
					<path d="M6 6l12 12M6 18L18 6" />
				{:else}
					<path d="M4 7h16M4 12h16M4 17h16" />
				{/if}
			</svg>
			<span class="text-[0.6rem]">Menu</span>
		</button>

		<div class="ml-auto hidden items-center gap-x-6 sm:flex">
			<nav
				aria-label="Primary navigation"
				class="flex items-center gap-x-6 text-[0.7rem] font-semibold tracking-[0.32em] text-slate-200 uppercase lg:text-xs"
			>
				{#each navigation as item (item.href)}
					<a
						href={resolve(item.href)}
						class={`relative px-1 py-1 transition hover:text-[var(--brand-orange)] ${
							isActive(item.href) ? 'text-[var(--brand-orange)]' : ''
						}`}
						aria-current={isActive(item.href) ? 'page' : undefined}
					>
						<span>{item.label}</span>
						{#if isActive(item.href)}
							<span
								class="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-[var(--brand-orange)]"
								aria-hidden="true"
							></span>
						{/if}
					</a>
				{/each}
			</nav>

			<a
				class={`inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-orange)] px-5 py-2 text-xs font-semibold tracking-[0.25em] text-[var(--brand-navy-900)] uppercase shadow-[var(--brand-orange)]/30 shadow-lg transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-cream)] md:text-sm ${
					isActive(contactPath)
						? 'ring-2 ring-white/60 ring-offset-2 ring-offset-[var(--brand-navy-900)]'
						: ''
				}`}
				href={resolve(contactPath)}
				aria-current={isActive(contactPath) ? 'page' : undefined}
			>
				Contact Us
			</a>
		</div>
	</div>

	{#if menuOpen}
		<div class="border-t border-white/10 bg-[var(--brand-navy-800)]/95 px-6 py-4 sm:hidden">
			<nav
				id={navId}
				aria-label="Primary navigation"
				class="flex flex-col gap-4 text-sm tracking-[0.3em]"
			>
				{#each navigation as item (item.href)}
					<a
						href={resolve(item.href)}
						class={`rounded-xl bg-white/5 px-4 py-3 text-slate-100 transition hover:bg-white/10 ${
							isActive(item.href) ? 'bg-white/15 text-white' : ''
						}`}
						on:click={handleLinkActivate}
						aria-current={isActive(item.href) ? 'page' : undefined}
					>
						{item.label}
					</a>
				{/each}
			</nav>
			<a
				class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--brand-orange)] px-5 py-3 text-xs font-semibold tracking-[0.25em] text-[var(--brand-navy-900)] uppercase shadow-[var(--brand-orange)]/30 shadow-lg transition hover:-translate-y-0.5"
				href={resolve(contactPath)}
				on:click={handleLinkActivate}
				aria-current={isActive(contactPath) ? 'page' : undefined}
			>
				Contact Us
			</a>
		</div>
	{/if}
</header>
