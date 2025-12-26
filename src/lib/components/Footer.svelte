<script lang="ts">
  import logoAsset from '../assets/Asset 1@1x.png';

  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' }
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' }
  ];

  const socialLinks = [
    { label: 'Facebook', href: 'https://facebook.com/awvaughan' },
    { label: 'Instagram', href: 'https://instagram.com/awvaughan' }
  ];
</script>

<footer class="bg-surface-muted py-12">
  <div class="content-container">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      <div class="sm:col-span-2 md:col-span-1">
        <img src={logoAsset} alt="AW Vaughan Company Logo" class="w-32 mb-4" />
        <p class="text-muted-foreground italic">Jeremiah 29:11</p>
      </div>
      <nav>
        <h4 class="font-semibold mb-3">Company</h4>
        <ul class="space-y-2">
          {#each companyLinks as link}
            <li><a href={link.href} class="text-muted-foreground hover:text-foreground transition-colors">{link.label}</a></li>
          {/each}
        </ul>
      </nav>
      <nav>
        <h4 class="font-semibold mb-3">Legal</h4>
        <ul class="space-y-2">
          {#each legalLinks as link}
            <li><a href={link.href} class="text-muted-foreground hover:text-foreground transition-colors">{link.label}</a></li>
          {/each}
        </ul>
      </nav>
      <nav>
        <h4 class="font-semibold mb-3">Social</h4>
        <ul class="space-y-2">
          {#each socialLinks as link}
            <li><a href={link.href} target="_blank" rel="noopener noreferrer" class="text-muted-foreground hover:text-foreground transition-colors">{link.label}</a></li>
          {/each}
        </ul>
      </nav>
    </div>
    <div class="border-t border-border mt-8 pt-8">
      <p class="text-sm text-muted-foreground text-center">© {currentYear} AW Vaughan Company, LLC. All rights reserved.</p>
    </div>
  </div>
</footer>