<script lang="ts">
  import { inView } from '$lib/actions/in-view';
  import { Badge, Button } from '$lib/components/ui';
  import heroImage from '$lib/assets/hero-image-01.jpeg';

  type HeroProps = {
    heading?: string;
    subheading?: string;
    description?: string[];
  };

  let {
    heading = 'Welcome to AW Vaughan Company',
    subheading = 'Site Construction Experts in Virginia Beach',
    description = []
  }: HeroProps = $props();
</script>

<section class="relative isolate overflow-hidden text-white">
  <picture aria-hidden="true">
    <img
      class="absolute inset-0 h-full w-full object-cover object-center"
      src={heroImage}
      alt="AW Vaughan construction site"
    />
  </picture>

  <div class="absolute inset-0 bg-[var(--text-dark)]/55 mix-blend-multiply"></div>
  <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-[var(--brand-blue)]/35 to-[var(--text-dark)]/75"></div>

  <div class="relative z-10 mx-auto flex min-h-[80vh] w-full max-w-4xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 sm:py-24">
    {#if subheading}
      <Badge
        variant="accent"
        class="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white"
      >
        <span aria-hidden="true" class="inline-flex h-2 w-2 rounded-full bg-white/80"></span>
        {subheading}
      </Badge>
    {/if}

    <h1 class="reveal mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl" use:inView>
      {heading}
    </h1>

    {#if description.length}
      <div class="mt-4 space-y-2 text-lg leading-relaxed text-white/90 sm:text-xl">
        {#each description as paragraph}
          <p>{paragraph}</p>
        {/each}
      </div>
    {/if}

    <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-6">
      <Button href="/contact" variant="default" size="lg" class="rounded-full px-8">
        Plan a project
      </Button>
      <Button href="tel:7574021100" variant="outline" size="lg" class="rounded-full border-white/30 px-8 text-white hover:bg-white/10">
        Call (757) 402-1100
      </Button>
    </div>
  </div>
</section>