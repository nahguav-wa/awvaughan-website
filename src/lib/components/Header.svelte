<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { onDestroy, onMount } from 'svelte';
	import type { ComponentType } from 'svelte';
	import { Mail, MapPin, Menu, Phone, X } from 'lucide-svelte';
	import { Badge, Button, Separator } from '$lib/components/ui';

	type RouteHref =
		| '/about'
		| '/services'
		| '/projects'
		| '/contact'
		| '/careers'
		| '/privacy-policy'
		| '/terms-of-service';

	type NavItem = {
		href: RouteHref;
		label: string;
	};

	type ContactDetail = {
		icon: ComponentType;
		label: string;
		href?: string;
	};

	const navigation: readonly NavItem[] = [
		{ href: '/about', label: 'About' },
		{ href: '/services', label: 'Services' },
		{ href: '/projects', label: 'Projects' }
	];

	const contactPath = '/contact' as const;

	const contactDetails: readonly ContactDetail[] = [
		{ icon: MapPin, label: 'Virginia Beach, VA' },
		{
			icon: Mail,
			label: 'alex.vaughan@awvaughan.com',
			href: 'mailto:alex.vaughan@awvaughan.com'
		},
		{ icon: Phone, label: '757-402-1100', href: 'tel:+17574021100' }
	];

	const normalize = (path: string) =>
		path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;

	$: currentPath = normalize($page.url.pathname);

	const isActive = (item: NavItem) => normalize(resolve(item.href)) === currentPath;

	const isContactActive = () => normalize(resolve(contactPath)) === currentPath;

	let menuOpen = false;
	let previousPath: string | null = null;
	let isAtTop = true;
	$: showSolidBackground = !isAtTop || menuOpen;

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

	const updateScrollPosition = () => {
		if (!browser) {
			return;
		}

		isAtTop = window.scrollY < 10;
	};

	onMount(() => {
		if (!browser) {
			return;
		}

		updateScrollPosition();
		window.addEventListener('keydown', handleEscape);
		window.addEventListener('scroll', updateScrollPosition, { passive: true });
	});

	onDestroy(() => {
		if (!browser) {
			return;
		}

		window.removeEventListener('keydown', handleEscape);
		window.removeEventListener('scroll', updateScrollPosition);
	});

	$: if (previousPath !== currentPath) {
		previousPath = currentPath;
		menuOpen = false;
	}

	const handleLinkActivate = () => {
		closeMenu();
	};
</script>

<header class="fixed inset-x-0 top-0 z-50">
	<div
		class={`overflow-hidden border-b border-[hsl(var(--accent))] bg-[hsl(var(--accent))] transition-all duration-300 ease-out ${
			isAtTop ? 'pointer-events-auto max-h-16 opacity-100' : 'pointer-events-none max-h-0 opacity-0'
		}`}
		aria-hidden={!isAtTop}
	>
		<div
			class="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-3 px-6 py-2 text-xs font-medium"
		>
			<!-- eslint-disable svelte/no-navigation-without-resolve -->
			{#each contactDetails as detail, index (detail.label)}
				{#if detail.href}
					<a class="transition hover:opacity-90" href={detail.href}>
						<Badge
							variant="accent"
							class="gap-2 rounded-full bg-white/10 text-[0.6rem] normal-case text-white shadow-none"
						>
							<svelte:component this={detail.icon} class="h-3.5 w-3.5" />
							<span>{detail.label}</span>
						</Badge>
					</a>
				{:else}
					<Badge
						variant="accent"
						class="gap-2 rounded-full bg-white/10 text-[0.6rem] normal-case text-white shadow-none"
					>
						<svelte:component this={detail.icon} class="h-3.5 w-3.5" />
						<span>{detail.label}</span>
					</Badge>
				{/if}
				{#if index < contactDetails.length - 1}
					<Separator
						orientation="vertical"
						class="hidden h-6 bg-white/30 sm:inline-flex"
						decorative
					/>
				{/if}
			{/each}
			<!-- eslint-enable svelte/no-navigation-without-resolve -->
		</div>
	</div>

	<div
		class={`transition-[background-color,box-shadow,border-color] duration-300 ${
			showSolidBackground
				? 'border-b border-border/60 bg-background/95 text-[hsl(var(--foreground))] shadow-sm backdrop-blur'
				: 'border-b border-transparent bg-transparent text-white'
		}`}
	>
		<div class="mx-auto flex max-w-6xl items-center gap-4 px-6 py-4">
			<a
				href={resolve('/')}
				class={`text-lg font-semibold tracking-tight transition-colors ${
					showSolidBackground ? 'text-[hsl(var(--foreground))]' : 'text-white'
				}`}
			>
				A.W. Vaughan Company
			</a>

			<Button
				type="button"
				class={`ml-auto gap-2 sm:hidden ${
					showSolidBackground ? 'text-[hsl(var(--foreground))]' : 'text-white'
				}`}
				variant={showSolidBackground ? 'secondary' : 'ghost'}
				size="sm"
				aria-expanded={menuOpen}
				aria-controls={navId}
				on:click={toggleMenu}
			>
				{#if menuOpen}
					<X class="h-4 w-4" aria-hidden="true" />
				{:else}
					<Menu class="h-4 w-4" aria-hidden="true" />
				{/if}
				<span class="text-[0.6rem] tracking-[0.3em]">Menu</span>
			</Button>

			<div class="ml-auto hidden items-center gap-4 md:flex">
				<nav aria-label="Primary navigation" class="flex items-center gap-3">
					<!-- eslint-disable svelte/no-navigation-without-resolve -->
					{#each navigation as item (item.href)}
						<Button
							href={resolve(item.href)}
							variant="ghost"
							size="sm"
							class={`rounded-full px-4 text-[0.65rem] tracking-[0.28em] ${
								showSolidBackground
									? 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
									: 'text-white/80 hover:text-white'
							} ${
								isActive(item)
									? showSolidBackground
										? 'bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]'
										: 'bg-white/10 text-white'
									: ''
							}`}
							aria-current={isActive(item) ? 'page' : undefined}
						>
							{item.label}
						</Button>
					{/each}
					<!-- eslint-enable svelte/no-navigation-without-resolve -->
				</nav>

				<Button
					href={resolve(contactPath)}
					variant="default"
					size="sm"
					class={`gap-2 rounded-full px-5 text-[0.7rem] tracking-[0.28em] text-[hsl(var(--primary-foreground))] md:text-sm ${
						isContactActive()
							? 'ring-2 ring-[hsl(var(--ring))]/60 ring-offset-2 ring-offset-[hsl(var(--background))]'
							: ''
					}`}
					aria-current={isContactActive() ? 'page' : undefined}
				>
					Contact Us
				</Button>
			</div>
		</div>
	</div>

	{#if menuOpen}
		<div class="border-b border-border/60 bg-background/95 px-6 py-4 shadow-lg sm:hidden">
			<nav
				id={navId}
				aria-label="Primary navigation"
				class="flex flex-col gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-[hsl(var(--foreground))]"
			>
				<!-- eslint-disable svelte/no-navigation-without-resolve -->
				{#each navigation as item (item.href)}
					<Button
						href={resolve(item.href)}
						variant="secondary"
						size="sm"
						class={`w-full justify-start rounded-2xl normal-case ${
							isActive(item) ? 'ring-1 ring-[hsl(var(--ring))]/30' : ''
						}`}
						on:click={handleLinkActivate}
						aria-current={isActive(item) ? 'page' : undefined}
					>
						{item.label}
					</Button>
				{/each}
				<!-- eslint-enable svelte/no-navigation-without-resolve -->
			</nav>
			<Button
				class="mt-4 w-full justify-center rounded-full"
				href={resolve(contactPath)}
				variant="default"
				size="sm"
				on:click={handleLinkActivate}
				aria-current={isContactActive() ? 'page' : undefined}
			>
				Contact Us
			</Button>
		</div>
	{/if}
</header>
