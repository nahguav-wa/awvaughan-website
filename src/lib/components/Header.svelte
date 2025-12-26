<script lang="ts">
  import { page } from '$app/stores';
  import { afterNavigate } from '$app/navigation';
  import { fly } from 'svelte/transition';
  import { Menu, X } from 'lucide-svelte';
  import { appConfig } from '$lib/../app.config';
  import logoAsset from '$lib/assets/Asset 1@1x.png';

  let navOpen = $state(false);
  let scrolled = $state(false);
  const links = appConfig.navigation.main;

  // Track scroll position for header background
  function handleScroll() {
    scrolled = window.scrollY > 50;
  }

  // Close mobile menu on navigation
  afterNavigate(() => {
    navOpen = false;
  });

  // Close on escape key
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') navOpen = false;
  }

  // Check if link is active
  function isActive(href: string, currentPath: string): boolean {
    if (href === '/') return currentPath === '/';
    return currentPath.startsWith(href);
  }

  // Dynamic classes based on scroll state
  const headerBg = $derived(
    scrolled
      ? 'bg-surface-base/95 backdrop-blur-sm shadow-md'
      : 'bg-transparent'
  );

  const textColor = $derived(
    scrolled ? 'text-foreground' : 'text-white'
  );

  const linkColor = $derived(
    scrolled
      ? 'text-muted-foreground hover:bg-muted hover:text-foreground'
      : 'text-white/80 hover:bg-white/10 hover:text-white'
  );

  const activeLinkColor = $derived(
    scrolled
      ? 'bg-primary/10 text-primary'
      : 'bg-white/20 text-white'
  );

  const mobileMenuBg = $derived(
    scrolled ? 'bg-surface-base' : 'bg-surface-base/95 backdrop-blur-sm'
  );
</script>

<svelte:window onscroll={handleScroll} onkeydown={handleKeydown} />

<header class="fixed left-0 right-0 z-40 transition-all duration-300 {scrolled ? 'top-0' : 'top-0 md:top-9'} {headerBg}">
  <div class="content-container flex items-center justify-between py-3">
    <a href="/" class="flex items-center gap-3">
      <img src={logoAsset} alt="AW Vaughan Company" class="h-10 w-auto" />
      <span class="hidden font-semibold transition-colors sm:inline {textColor}">AW Vaughan</span>
    </a>

    <!-- Desktop Navigation -->
    <nav class="hidden md:block">
      <ul class="flex items-center gap-1">
        {#each links as link}
          {@const active = isActive(link.href, $page.url.pathname)}
          <li>
            <a
              href={link.href}
              class="rounded-lg px-4 py-2 text-sm font-medium transition-colors {active
                ? activeLinkColor
                : linkColor}"
              aria-current={active ? 'page' : undefined}
            >
              {link.label}
            </a>
          </li>
        {/each}
      </ul>
    </nav>

    <!-- Mobile Menu Button -->
    <button
      class="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-white/10 md:hidden {textColor}"
      onclick={() => (navOpen = !navOpen)}
      aria-label={navOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={navOpen}
      aria-controls="mobile-menu"
    >
      {#if navOpen}
        <X size={24} />
      {:else}
        <Menu size={24} />
      {/if}
    </button>
  </div>

  <!-- Mobile Navigation -->
  {#if navOpen}
    <nav
      id="mobile-menu"
      transition:fly={{ y: -10, duration: 200 }}
      class="border-t border-border/50 md:hidden {mobileMenuBg}"
    >
      <ul class="content-container flex flex-col gap-1 py-4">
        {#each links as link}
          {@const active = isActive(link.href, $page.url.pathname)}
          <li>
            <a
              href={link.href}
              class="block rounded-lg px-4 py-3 text-base font-medium transition-colors {active
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'}"
              aria-current={active ? 'page' : undefined}
            >
              {link.label}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  {/if}
</header>
