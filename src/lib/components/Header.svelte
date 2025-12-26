<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { Menu, X } from 'lucide-svelte';

  let navOpen = $state(false);

  const links = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' }
  ];

  onMount(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') navOpen = false;
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });
</script>

<header class="sticky top-0 bg-surface-base shadow-md z-50">
  <div class="content-container flex justify-between items-center py-4">
    <a href="/" class="font-semibold text-lg">AW Vaughan</a>
    <nav class="hidden md:block">
      <ul class="flex space-x-6">
        {#each links as link}
          <li><a href={link.href} class="hover:text-primary transition-colors">{link.label}</a></li>
        {/each}
      </ul>
    </nav>
    <button
      class="md:hidden p-2"
      onclick={() => navOpen = !navOpen}
      aria-label={navOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={navOpen}
    >
      {#if navOpen}
        <X size={24} />
      {:else}
        <Menu size={24} />
      {/if}
    </button>
  </div>
  {#if navOpen}
    <nav transition:fly={{ y: -200, duration: 300 }} class="md:hidden bg-surface-muted">
      <ul class="space-y-4 p-4">
        {#each links as link}
          <li><a href={link.href} onclick={() => navOpen = false} class="block py-2">{link.label}</a></li>
        {/each}
      </ul>
    </nav>
  {/if}
</header>