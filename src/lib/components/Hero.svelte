<script lang="ts">
  import { inView } from '../actions/in-view.ts';
  import heroImage from '../assets/hero-image-01.jpeg';

  export let showVideo = false;
  export let heading = 'Welcome to AW Vaughan Company';
  export let subheading = 'Site Construction Experts in Virginia Beach';
  export let description = ['Paragraph 1', 'Paragraph 2'];
</script>

<section class="relative">
  {#if showVideo}
    <video autoplay loop muted playsinline src="video.mp4"></video>
  {:else}
    <img src={heroImage} alt="AW Vaughan construction site in action" class="w-full h-64 object-cover" />
  {/if}
  <div class="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
    <h1 use:inView>{heading}</h1>
    <h2>{subheading}</h2>
    {#each description as paragraph}
      <p>{paragraph}</p>
    {/each}
    <a href="/contact" class="button">Plan a project</a>
    <a href="tel:7574021100">Call (757) 402-1100</a>
  </div>
</section>