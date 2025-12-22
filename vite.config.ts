import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  optimizeDeps: {
    exclude: ['fsevents'] // For consistency
  },
  ssr: {
    noExternal: ['lucide-svelte'] // For reactivity in SSR
  }
});