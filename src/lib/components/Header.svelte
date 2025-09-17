<script lang="ts">
        import { resolve } from '$app/paths';
        import { page } from '$app/stores';
        import { browser } from '$app/environment';
        import { onDestroy, onMount } from 'svelte';
        import type { ComponentType } from 'svelte';
        import { Mail, MapPin, Menu, Phone, X } from 'lucide-svelte';

        type NavItem = {
                href: string;
                label: string;
                isAnchor?: boolean;
        };

        type ContactDetail = {
                icon: ComponentType;
                label: string;
                href?: string;
        };

        const navigation: readonly NavItem[] = [
                { href: '/about', label: 'About' },
                { href: '/services', label: 'Services' },
                { href: '/#projects', label: 'Projects', isAnchor: true }
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

        const getHref = (item: NavItem) =>
                item.isAnchor ? item.href : resolve(item.href as Parameters<typeof resolve>[0]);

        const isActive = (item: NavItem) =>
                !item.isAnchor && normalize(resolve(item.href as Parameters<typeof resolve>[0])) === currentPath;

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

<header class="sticky top-0 z-50">
        <div
                class={`overflow-hidden border-b border-[var(--brand-orange)] bg-[var(--brand-orange)] transition-all duration-300 ease-out ${
                        isAtTop
                                ? 'max-h-16 opacity-100 pointer-events-auto'
                                : 'max-h-0 opacity-0 pointer-events-none'
                }`}
                aria-hidden={!isAtTop}
        >
                <div
                        class="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-3 px-6 py-2 text-xs font-medium text-white"
                >
                        {#each contactDetails as detail (detail.label)}
                                {#if detail.href}
                                        <a
                                                class="group flex items-center gap-2 text-white transition hover:text-[var(--brand-blue)]"
                                                href={detail.href}
                                        >
                                                <svelte:component
                                                        this={detail.icon}
                                                        class="h-4 w-4 text-white transition group-hover:text-[var(--brand-blue)]"
                                                />
                                                <span>{detail.label}</span>
                                        </a>
                                {:else}
                                        <span class="flex items-center gap-2 text-white">
                                                <svelte:component this={detail.icon} class="h-4 w-4 text-white" />
                                                <span>{detail.label}</span>
                                        </span>
                                {/if}
                        {/each}
                </div>
        </div>

        <div
                class={`transition-[background-color,box-shadow,border-color] duration-300 ${
                        showSolidBackground
                                ? 'border-b border-[var(--border-soft)]/80 bg-[var(--surface-base)]/95 text-[var(--text-dark)] shadow-sm backdrop-blur'
                                : 'border-b border-transparent bg-transparent text-white'
                }`}
        >
                <div class="mx-auto flex max-w-6xl items-center gap-6 px-6 py-4">
                        <a
                                href={resolve('/')}
                                class={`text-lg font-semibold tracking-tight ${
                                        showSolidBackground ? 'text-[var(--text-dark)]' : 'text-white'
                                }`}
                        >
                                A.W. Vaughan Company
                        </a>

                        <button
                                type="button"
                                class={`ml-auto inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] transition focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-blue)] sm:hidden ${
                                        showSolidBackground
                                                ? 'border-[var(--border-soft)]/80 bg-[var(--surface-base)] text-[var(--text-dark)] hover:bg-[var(--surface-soft)]'
                                                : 'border-white/60 bg-white/10 text-white hover:bg-white/20'
                                }`}
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
                        </button>

                        <div class="ml-auto hidden items-center gap-6 md:flex">
                                <nav
                                        aria-label="Primary navigation"
                                        class={`flex items-center gap-x-8 text-xs font-semibold uppercase tracking-[0.28em] ${
                                                showSolidBackground
                                                        ? 'text-[var(--text-muted)]'
                                                        : 'text-white/90'
                                        }`}
                                >
                                        {#each navigation as item (item.href)}
                                                <a
                                                        href={getHref(item)}
                                                        class={`relative px-1 py-1 transition ${
                                                                showSolidBackground
                                                                        ? 'hover:text-[var(--brand-blue)]'
                                                                        : 'hover:text-[var(--brand-orange)]'
                                                        } ${
                                                                isActive(item)
                                                                        ? showSolidBackground
                                                                                ? 'text-[var(--brand-blue)]'
                                                                                : 'text-[var(--brand-orange)]'
                                                                        : ''
                                                        }`}
                                                        aria-current={isActive(item) ? 'page' : undefined}
                                                >
                                                        <span>{item.label}</span>
                                                        {#if isActive(item)}
                                                                <span
                                                                        class={`absolute inset-x-0 -bottom-1 h-0.5 rounded-full ${
                                                                                showSolidBackground
                                                                                        ? 'bg-[var(--brand-blue)]'
                                                                                        : 'bg-[var(--brand-orange)]'
                                                                        }`}
                                                                        aria-hidden="true"
                                                                ></span>
                                                        {/if}
                                                </a>
                                        {/each}
                                </nav>

                                <a
                                        class={`inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-orange)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--text-dark)] shadow-[var(--brand-orange)]/30 shadow-lg transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-blue)] md:text-sm ${
                                                isContactActive()
                                                        ? 'ring-2 ring-[var(--brand-blue)]/30 ring-offset-2 ring-offset-[var(--surface-base)]'
                                                        : ''
                                        }`}
                                        href={resolve(contactPath)}
                                        aria-current={isContactActive() ? 'page' : undefined}
                                >
                                        Contact Us
                                </a>
                        </div>
                </div>
        </div>

        {#if menuOpen}
                <div class="border-b border-[var(--border-soft)] bg-[var(--surface-base)] px-6 py-4 shadow-lg sm:hidden">
                        <nav
                                id={navId}
                                aria-label="Primary navigation"
                                class="flex flex-col gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--text-dark)]"
                        >
                                {#each navigation as item (item.href)}
                                        <a
                                                href={getHref(item)}
                                                class="rounded-xl bg-[var(--surface-soft)] px-4 py-3 transition hover:bg-[var(--brand-blue-soft)] hover:text-[var(--brand-blue)]"
                                                on:click={handleLinkActivate}
                                                aria-current={isActive(item) ? 'page' : undefined}
                                        >
                                                {item.label}
                                        </a>
                                {/each}
                        </nav>
                        <a
                                class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--brand-orange)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--text-dark)] shadow-[var(--brand-orange)]/30 shadow-lg transition hover:-translate-y-0.5"
                                href={resolve(contactPath)}
                                on:click={handleLinkActivate}
                                aria-current={isContactActive() ? 'page' : undefined}
                        >
                                Contact Us
                        </a>
                </div>
        {/if}
</header>
