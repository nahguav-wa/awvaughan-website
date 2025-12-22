<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { resolve } from 'svelte-spa-router';
  import { writable } from 'svelte/store';
  import { Menu, X } from 'lucide-svelte';

  const navOpen = writable(false);

  const links = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' }
  ];

  onMount(() => {
    // Close on escape
    const handleKey = (e: KeyboardEvent) => if (e.key === 'Escape') $navOpen = false;
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });
</script>

<header class="sticky top-0 bg-surface-base shadow-md z-50">
  <div class="content-container flex justify-between items-center py-4">
    <a href="/">AW Vaughan</a>
    <nav class="hidden md:block">
      <ul class="flex space-x-6">
        {#each links as link}
          <li><a href={resolve(link.href)}>{link.label}</a></li>
        {/each}
      </ul>
    </nav>
    <button class="md:hidden" on:click={() => $navOpen = !$navOpen}>
      {#if $navOpen}
        <X />
      {:else}
        <Menu />
      {/if}
    </button>
  </div>
  {#if $navOpen}
    <nav transition:fly={{ y: -200, duration: 300 }} class="md:hidden bg-surface-muted">
      <ul class="space-y-4 p-4">
        {#each links as link}
          <li><a href={resolve(link.href)} on:click={() => $navOpen = false}>{link.label}</a></li>
        {/each}
      </ul>
    </nav>
  {/if}
</header>