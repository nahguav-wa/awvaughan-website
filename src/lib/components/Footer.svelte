<script lang="ts">
  import { resolve } from 'svelte-spa-router';
  import logoAsset from '../assets/Asset 1@1x.png'; // Assume logo
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

<footer class="bg-surface-muted py-8">
  <div class="content-container grid grid-cols-1 md:grid-cols-4 gap-8">
    <img src={logoAsset} alt="AW Vaughan Company Logo" class="w-32" />
    <p>Jeremiah 29:11</p>
    <nav>
      <h4>Company</h4>
      <ul>
        {#each companyLinks as link}
          <li><a href={resolve(link.href)}>{link.label}</a></li>
        {/each}
      </ul>
    </nav>
    <nav>
      <h4>Legal</h4>
      <ul>
        {#each legalLinks as link}
          <li><a href={resolve(link.href)}>{link.label}</a></li>
        {/each}
      </ul>
    </nav>
    <nav>
      <h4>Social</h4>
      <ul>
        {#each socialLinks as link}
          <li><a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a></li>
        {/each}
      </ul>
    </nav>
    <p>© {currentYear} AW Vaughan Company, LLC. All rights reserved.</p>
  </div>
</footer>