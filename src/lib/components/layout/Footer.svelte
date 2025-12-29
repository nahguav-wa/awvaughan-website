<!--
	Footer Component
	Site footer with company information, navigation, and social links
-->
<script lang="ts">
	import { COMPANY_INFO, ROUTES, SOCIAL_LINKS } from '$lib/config/constants';

	/**
	 * Quick links navigation
	 */
	const quickLinks = [
		{ label: 'About', href: ROUTES.about },
		{ label: 'Services', href: ROUTES.services },
		{ label: 'Contact', href: ROUTES.contact }
	];

	/**
	 * Current year for copyright notice
	 */
	const currentYear = new Date().getFullYear();
</script>

<!--
	Footer Section
-->
<footer class="text-white py-12" style="background-color: #27251f;">
	<div class="container mx-auto px-4">
		<div class="grid md:grid-cols-4 gap-8">
			<!-- Company Information -->
			<div>
				<h3 class="text-lg font-bold mb-4">{COMPANY_INFO.name}</h3>
				<p class="text-base font-normal text-gray-400">
					{COMPANY_INFO.tagline}
				</p>
			</div>

			<!-- Quick Links -->
			<div>
				<h4 class="text-lg font-bold mb-4">Quick Links</h4>
				<nav aria-label="Footer navigation">
					<ul class="space-y-2">
						{#each quickLinks as link}
							<li>
								<a
									href={link.href}
									class="text-base font-normal text-gray-400 hover:text-white transition-colors"
								>
									{link.label}
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			</div>

			<!-- Contact Information -->
			<div>
				<h4 class="text-lg font-bold mb-4">Contact Info</h4>
				<address class="space-y-2 text-base font-normal text-gray-400 not-italic">
					<p>{COMPANY_INFO.location}</p>
					<p>
						<a
							href={COMPANY_INFO.phoneHref}
							class="hover:text-white transition-colors"
							aria-label="Call us at {COMPANY_INFO.phone}"
						>
							{COMPANY_INFO.phone}
						</a>
					</p>
					<p>
						<a
							href={COMPANY_INFO.emailHref}
							class="hover:text-white transition-colors"
							aria-label="Email us at {COMPANY_INFO.email}"
						>
							{COMPANY_INFO.email}
						</a>
					</p>
				</address>
			</div>

			<!-- Social Media Links -->
			<div>
				<h4 class="text-lg font-bold mb-4">Follow Us</h4>
				<div class="flex gap-4 flex-wrap">
					<!-- Instagram -->
					<a
						href={SOCIAL_LINKS.instagram}
						class="text-gray-400 hover:text-white transition-colors"
						aria-label="Follow us on Instagram"
						target="_blank"
						rel="noopener noreferrer"
					>
						<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path
								d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
							/>
						</svg>
					</a>

					<!-- Facebook -->
					<a
						href={SOCIAL_LINKS.facebook}
						class="text-gray-400 hover:text-white transition-colors"
						aria-label="Follow us on Facebook"
						target="_blank"
						rel="noopener noreferrer"
					>
						<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path
								d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
							/>
						</svg>
					</a>

					<!-- YouTube -->
					<a
						href={SOCIAL_LINKS.youtube}
						class="text-gray-400 hover:text-white transition-colors"
						aria-label="Follow us on YouTube"
						target="_blank"
						rel="noopener noreferrer"
					>
						<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path
								d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
							/>
						</svg>
					</a>

					<!-- Nextdoor -->
					<a
						href={SOCIAL_LINKS.nextdoor}
						class="text-gray-400 hover:text-white transition-colors"
						aria-label="Follow us on Nextdoor"
						target="_blank"
						rel="noopener noreferrer"
					>
						<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path
								d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm1-16h-2v7h2V6zm-1 9c-.828 0-1.5.672-1.5 1.5S11.172 18 12 18s1.5-.672 1.5-1.5S12.828 15 12 15z"
							/>
						</svg>
					</a>
				</div>
			</div>
		</div>

		<!-- Copyright Notice -->
		<div class="border-t border-gray-800 mt-8 pt-8 text-center">
			<p class="text-base font-normal text-gray-400">&copy; {currentYear} {COMPANY_INFO.name}. All rights reserved.</p>
		</div>
	</div>
</footer>
