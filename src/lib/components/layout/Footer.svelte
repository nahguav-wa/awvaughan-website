<!--
	Footer Component
	Site footer with company information, navigation, and social links
-->
<script lang="ts">
	import { MapPin, Phone, Mail } from '@lucide/svelte';
	import { SocialMediaIcons } from '$lib';
	import { COMPANY_INFO, ROUTES } from '$lib/config/constants';

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
<footer class="bg-dark-gray py-12 text-white">
	<div class="container mx-auto px-4">
		<div class="grid gap-8 md:grid-cols-4">
			<!-- Company Information -->
			<div>
				<h3 class="mb-4 text-lg font-bold">{COMPANY_INFO.name}</h3>
				<img src="/American Logo.svg" alt="{COMPANY_INFO.name} Logo" class="mb-4 h-16 w-auto" />
				<p class="text-base font-normal text-gray-400">
					{COMPANY_INFO.tagline}
				</p>
			</div>

			<!-- Quick Links -->
			<div>
				<h4 class="mb-4 text-lg font-bold">Quick Links</h4>
				<nav aria-label="Footer navigation">
					<ul class="space-y-2">
						{#each quickLinks as link (link.href)}
							<li>
								<a
									href={link.href}
									class="text-base font-normal text-gray-400 transition-colors hover:text-white"
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
				<h4 class="mb-4 text-lg font-bold">Contact Info</h4>
				<address class="space-y-2 text-base font-normal text-gray-400 not-italic">
					<p class="flex items-center gap-2">
						<MapPin class="h-4 w-4" aria-hidden="true" />
						<span>{COMPANY_INFO.location}</span>
					</p>
					<p class="flex items-center gap-2">
						<Phone class="h-4 w-4" aria-hidden="true" />
						<a
							href={COMPANY_INFO.phoneHref}
							class="transition-colors hover:text-white"
							aria-label="Call us at {COMPANY_INFO.phone}"
						>
							{COMPANY_INFO.phone}
						</a>
					</p>
					<p class="flex items-center gap-2">
						<Mail class="h-4 w-4" aria-hidden="true" />
						<a
							href={COMPANY_INFO.emailHref}
							class="transition-colors hover:text-white"
							aria-label="Email us at {COMPANY_INFO.email}"
						>
							{COMPANY_INFO.email}
						</a>
					</p>
				</address>
			</div>

			<!-- Social Media Links -->
			<div>
				<h4 class="mb-4 text-lg font-bold">Follow Us</h4>
				<SocialMediaIcons
					iconSize="w-6 h-6"
					containerClass="flex gap-4 flex-wrap"
					iconClass="text-gray-400 hover:text-white transition-colors"
				/>
			</div>
		</div>

		<!-- Copyright Notice -->
		<div class="mt-8 border-t border-primary-500 pt-8 text-center">
			<p class="text-base font-normal text-gray-400">
				&copy; {currentYear}
				{COMPANY_INFO.name}. All rights reserved.
			</p>
		</div>
	</div>
</footer>
