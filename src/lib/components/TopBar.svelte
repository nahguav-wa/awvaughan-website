<script lang="ts">
  import { Mail, MapPin, Phone } from 'lucide-svelte';
  import { appConfig } from '$lib/../app.config';

  const { contact } = appConfig;

  let scrolled = $state(false);

  function handleScroll() {
    scrolled = window.scrollY > 50;
  }
</script>

<svelte:window onscroll={handleScroll} />

<div
  class="fixed top-0 left-0 right-0 z-50 hidden transform bg-[var(--brand-orange)] text-sm text-white transition-transform duration-300 md:block {scrolled ? '-translate-y-full' : 'translate-y-0'}"
>
  <div class="content-container flex items-center justify-between py-2">
    <div class="flex items-center gap-6">
      <a href={contact.phoneHref} class="flex items-center gap-2 transition-opacity hover:opacity-80">
        <Phone size={14} />
        <span>{contact.phone}</span>
      </a>
      <a href="mailto:{contact.email}" class="flex items-center gap-2 transition-opacity hover:opacity-80">
        <Mail size={14} />
        <span>{contact.email}</span>
      </a>
    </div>
    <div class="flex items-center gap-2">
      <MapPin size={14} />
      <span>Hampton Roads, VA</span>
    </div>
  </div>
</div>
