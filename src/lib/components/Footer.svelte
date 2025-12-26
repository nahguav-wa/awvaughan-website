<script lang="ts">
  import { appConfig } from '$lib/../app.config';
  import logoAsset from '$lib/assets/Asset 1@1x.png';

  const currentYear = new Date().getFullYear();
  const { navigation, contact, siteName } = appConfig;
</script>

<footer class="border-t border-border bg-surface-muted">
  <div class="content-container py-12 lg:py-16">
    <!-- Main Footer Content -->
    <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      <!-- Brand Column -->
      <div class="sm:col-span-2 lg:col-span-1">
        <a href="/" class="inline-block">
          <img src={logoAsset} alt="{siteName} Logo" class="h-12 w-auto" />
        </a>
        <p class="mt-4 text-sm italic text-muted-foreground">Jeremiah 29:11</p>
        <div class="mt-4 space-y-2 text-sm text-muted-foreground">
          <a href={contact.phoneHref} class="block hover:text-foreground transition-colors">
            {contact.phone}
          </a>
          <a href="mailto:{contact.email}" class="block hover:text-foreground transition-colors">
            {contact.email}
          </a>
        </div>
      </div>

      <!-- Company Links -->
      <nav aria-label="Company links">
        <h4 class="text-sm font-semibold uppercase tracking-wider text-foreground">Company</h4>
        <ul class="mt-4 space-y-3">
          {#each navigation.footer as link}
            <li>
              <a
                href={link.href}
                class="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </nav>

      <!-- Legal Links -->
      <nav aria-label="Legal links">
        <h4 class="text-sm font-semibold uppercase tracking-wider text-foreground">Legal</h4>
        <ul class="mt-4 space-y-3">
          {#each navigation.legal as link}
            <li>
              <a
                href={link.href}
                class="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </nav>

      <!-- Social Links -->
      <nav aria-label="Social links">
        <h4 class="text-sm font-semibold uppercase tracking-wider text-foreground">Connect</h4>
        <ul class="mt-4 space-y-3">
          {#each navigation.social as link}
            <li>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </nav>
    </div>

    <!-- Copyright -->
    <div class="mt-12 border-t border-border pt-8">
      <p class="text-center text-sm text-muted-foreground">
        © {currentYear} {siteName}, LLC. All rights reserved.
      </p>
    </div>
  </div>
</footer>
