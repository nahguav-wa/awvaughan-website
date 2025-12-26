<script lang="ts">
  import { TopBar, Header, Footer } from '$lib';
  import '../app.css';

  let { children } = $props();
</script>

<TopBar />
<Header />
<main>
  {@render children()}
</main>
<Footer />