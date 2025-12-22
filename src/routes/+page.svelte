<script lang="ts">
  import Hero from '$lib/Hero.svelte';
  import { inView } from '$lib/actions/in-view.ts';

  const description = ['Reliable site work in 757/252', 'Owner-operated for quality'];
</script>

<Hero heading="AW Vaughan Company" subheading="Site Construction Specialists" {description} />
<section use:inView>
  <!-- Content -->
</section>