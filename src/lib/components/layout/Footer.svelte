<!--
	Footer Component
	Site footer with company wordmark, contact info, navigation,
	CTA, and Sandbridge topographic overlay
-->
<script lang="ts">
	import { SocialMediaIcons, Button } from '$lib';
	import { COMPANY_INFO, ROUTES } from '$lib/config/constants';

	const navLinks = [
		{ label: 'About', href: ROUTES.about },
		{ label: 'Services', href: ROUTES.services },
		{ label: 'Contact', href: ROUTES.contact }
	];

	const currentYear = new Date().getFullYear();
</script>

<footer class="bg-dark-gray relative overflow-hidden text-white">
	<!-- Sandbridge topographic overlay -->
	<div
		class="pointer-events-none absolute inset-0 bg-[url('/topo-sandbridge.svg')] bg-cover bg-center opacity-10"
		aria-hidden="true"
	></div>

	<div class="relative container mx-auto px-4">
		<!-- Company Wordmark -->
		<div class="border-b border-white/10 py-12 text-center">
			<h2 class="text-xl font-bold tracking-widest uppercase">
				{COMPANY_INFO.name}
			</h2>
		</div>

		<!-- Main Footer Content -->
		<div class="grid gap-12 py-12 md:grid-cols-3">
			<!-- Contact -->
			<div>
				<h3 class="mb-6 text-sm font-bold tracking-widest text-primary-500 uppercase">
					Contact
				</h3>
				<div class="space-y-4 text-base font-normal">
					<div>
						<p class="text-sm tracking-wider text-gray-400 uppercase">Phone</p>
						<a href={COMPANY_INFO.phoneHref} class="transition-colors hover:text-primary-500">
							{COMPANY_INFO.phone}
						</a>
					</div>
					<div>
						<p class="text-sm tracking-wider text-gray-400 uppercase">Email</p>
						<a href={COMPANY_INFO.emailHref} class="transition-colors hover:text-primary-500">
							{COMPANY_INFO.email}
						</a>
					</div>
					<div>
						<p class="text-sm tracking-wider text-gray-400 uppercase">Location</p>
						<p>{COMPANY_INFO.location}</p>
					</div>
				</div>
			</div>

			<!-- Navigate -->
			<div>
				<h3 class="mb-6 text-sm font-bold tracking-widest text-primary-500 uppercase">
					Navigate
				</h3>
				<nav aria-label="Footer navigation">
					<ul class="mb-8 space-y-3 text-base font-normal">
						{#each navLinks as link (link.href)}
							<li>
								<a href={link.href} class="transition-colors hover:text-primary-500">
									{link.label}
								</a>
							</li>
						{/each}
					</ul>
				</nav>
				<SocialMediaIcons
					iconSize="w-5 h-5"
					containerClass="flex gap-3"
					iconClass="w-10 h-10 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
				/>
			</div>

			<!-- Let's Get Started CTA -->
			<div>
				<h3 class="mb-6 text-sm font-bold tracking-widest text-primary-500 uppercase">
					Let's Get Started
				</h3>
				<p class="mb-6 text-base font-normal text-gray-300">
					Whether you have a question about our services, pricing, or scheduling, our team is ready
					to answer all of your questions.
				</p>
				<Button href={ROUTES.contact} variant="primary" size="md">Contact Us</Button>
			</div>
		</div>

		<!-- Bottom Bar -->
		<div
			class="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-sm font-normal text-gray-400 md:flex-row"
		>
			<p>
				&copy; {currentYear}
				{COMPANY_INFO.name}. All rights reserved.
			</p>
			<p class="italic">{COMPANY_INFO.tagline}</p>
		</div>
	</div>
</footer>
