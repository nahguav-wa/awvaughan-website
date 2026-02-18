<!--
	Contact Page Component
	Contact information, form, and social media links
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { Section, SocialMediaIcons } from '$lib';
	import { COMPANY_INFO } from '$lib/config/constants';
	import { MapPin, Phone, Mail } from '@lucide/svelte';

	// Form state
	let formData = $state({
		firstName: '',
		lastName: '',
		company: '',
		email: '',
		phone: '',
		subject: '',
		message: ''
	});

	let formState = $state<'idle' | 'submitting' | 'success' | 'error'>('idle');
	let errorMessage = $state('');
	let turnstileToken = $state('');
	let turnstileWidgetId = $state<string | null>(null);

	/**
	 * Cloudflare Turnstile site key
	 * Set to '1x00000000000000000000AA' for testing (always passes)
	 * Replace with your real site key from the Cloudflare dashboard
	 */
	const TURNSTILE_SITE_KEY = '0x4AAAAAAA_placeholder_replace_me';

	onMount(() => {
		// Render Turnstile widget after the script loads
		const interval = setInterval(() => {
			if (
				typeof window !== 'undefined' &&
				'turnstile' in window &&
				document.getElementById('turnstile-container')
			) {
				clearInterval(interval);
				const w = window as unknown as {
					turnstile: {
						render: (
							el: string,
							opts: { sitekey: string; callback: (token: string) => void }
						) => string;
						reset: (id: string) => void;
					};
				};
				turnstileWidgetId = w.turnstile.render('#turnstile-container', {
					sitekey: TURNSTILE_SITE_KEY,
					callback: (token: string) => {
						turnstileToken = token;
					}
				});
			}
		}, 100);

		return () => clearInterval(interval);
	});

	/**
	 * Handle form submission
	 */
	async function handleSubmit(event: Event) {
		event.preventDefault();
		formState = 'submitting';
		errorMessage = '';

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					...formData,
					'cf-turnstile-response': turnstileToken
				})
			});

			if (!response.ok) {
				throw new Error('Failed to send message');
			}

			formState = 'success';
			formData = {
				firstName: '',
				lastName: '',
				company: '',
				email: '',
				phone: '',
				subject: '',
				message: ''
			};
			turnstileToken = '';
			// Reset the Turnstile widget
			if (turnstileWidgetId !== null && 'turnstile' in window) {
				const w = window as unknown as {
					turnstile: { reset: (id: string) => void };
				};
				w.turnstile.reset(turnstileWidgetId);
			}
		} catch (err) {
			formState = 'error';
			errorMessage = 'Failed to send message. Please try again or call us directly.';
			console.error('Form submission error:', err);
		}
	}
</script>

<svelte:head>
	<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
</svelte:head>

<!--
	Page Hero Section
-->
<Section variant="gray" class="mt-16 md:mt-28">
	<div class="mx-auto max-w-4xl text-center">
		<h1 class="mb-6 text-xl font-bold text-gray-900">Contact Us</h1>
		<p class="text-lg font-normal text-gray-600">
			Get in touch for a free consultation and quote. We're here to help with all your excavation
			and drainage needs.
		</p>
	</div>
</Section>

<!--
	Contact Information & Form Section
-->
<Section variant="white">
	<div class="mx-auto max-w-6xl">
		<div class="grid gap-12 md:grid-cols-2">
			<!-- Contact Information -->
			<div class="space-y-8">
				<div>
					<h2 class="mb-6 text-xl font-bold text-gray-900">Get In Touch</h2>
					<p class="mb-6 text-base font-normal text-gray-600">
						Have a question about our services? Need a quote for your project? We'd love to hear
						from you. Reach out using the form or contact us directly.
					</p>
				</div>

				<!-- Contact Details -->
				<div class="space-y-4">
					<!-- Phone -->
					<div class="flex items-center gap-4">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-500 text-white"
						>
							<Phone class="h-5 w-5" />
						</div>
						<div>
							<h3 class="mb-1 text-xl font-bold text-gray-900">Phone</h3>
							<a
								href={COMPANY_INFO.phoneHref}
								class="text-base font-normal text-primary-500 hover:text-primary-600"
							>
								{COMPANY_INFO.phone}
							</a>
						</div>
					</div>

					<!-- Email -->
					<div class="flex items-center gap-4">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-500 text-white"
						>
							<Mail class="h-5 w-5" />
						</div>
						<div>
							<h3 class="mb-1 text-xl font-bold text-gray-900">Email</h3>
							<a
								href={COMPANY_INFO.emailHref}
								class="text-base font-normal text-primary-500 hover:text-primary-600"
							>
								{COMPANY_INFO.email}
							</a>
						</div>
					</div>

					<!-- Location -->
					<div class="flex items-center gap-4">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-500 text-white"
						>
							<MapPin class="h-5 w-5" />
						</div>
						<div>
							<h3 class="mb-1 text-xl font-bold text-gray-900">Service Area</h3>
							<p class="text-base font-normal text-gray-600">
								{COMPANY_INFO.location} and the 757 area
							</p>
						</div>
					</div>
				</div>

				<!-- Social Media Links -->
				<div>
					<h3 class="mb-4 text-xl font-bold text-gray-900">Follow Us</h3>
					<SocialMediaIcons />
				</div>
			</div>

			<!-- Contact Form -->
			<div>
				<h2 class="mb-6 text-xl font-bold text-gray-900">Send Us a Message</h2>

				{#if formState === 'success'}
					<div class="mb-6 rounded-lg border border-green-200 bg-green-50 px-6 py-4 text-green-800">
						<h3 class="mb-2 text-xl font-bold">Message Sent!</h3>
						<p class="text-base font-normal">
							Thank you for contacting us. We'll get back to you as soon as possible.
						</p>
					</div>
				{/if}

				{#if formState === 'error'}
					<div class="mb-6 rounded-lg border border-red-200 bg-red-50 px-6 py-4 text-red-800">
						<h3 class="mb-2 text-xl font-bold">Error</h3>
						<p class="text-base font-normal">{errorMessage}</p>
					</div>
				{/if}

				<form onsubmit={handleSubmit} class="space-y-6">
					<!-- First Name and Last Name -->
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<!-- First Name -->
						<div>
							<label for="firstName" class="mb-2 block text-base font-bold text-gray-900">
								First Name <span class="text-red-600">*</span>
							</label>
							<input
								type="text"
								id="firstName"
								bind:value={formData.firstName}
								required
								class="w-full rounded-lg border border-gray-300 px-4 py-3 text-base font-normal focus:border-transparent focus:ring-2 focus:ring-primary-500"
								placeholder="John"
								disabled={formState === 'submitting'}
							/>
						</div>

						<!-- Last Name -->
						<div>
							<label for="lastName" class="mb-2 block text-base font-bold text-gray-900">
								Last Name <span class="text-red-600">*</span>
							</label>
							<input
								type="text"
								id="lastName"
								bind:value={formData.lastName}
								required
								class="w-full rounded-lg border border-gray-300 px-4 py-3 text-base font-normal focus:border-transparent focus:ring-2 focus:ring-primary-500"
								placeholder="Doe"
								disabled={formState === 'submitting'}
							/>
						</div>
					</div>

					<!-- Company Name -->
					<div>
						<label for="company" class="mb-2 block text-base font-bold text-gray-900">
							Company Name
						</label>
						<input
							type="text"
							id="company"
							bind:value={formData.company}
							class="w-full rounded-lg border border-gray-300 px-4 py-3 text-base font-normal focus:border-transparent focus:ring-2 focus:ring-primary-500"
							placeholder="Your company (optional)"
							disabled={formState === 'submitting'}
						/>
					</div>

					<!-- Email -->
					<div>
						<label for="email" class="mb-2 block text-base font-bold text-gray-900">
							Email <span class="text-red-600">*</span>
						</label>
						<input
							type="email"
							id="email"
							bind:value={formData.email}
							required
							class="w-full rounded-lg border border-gray-300 px-4 py-3 text-base font-normal focus:border-transparent focus:ring-2 focus:ring-primary-500"
							placeholder="your.email@example.com"
							disabled={formState === 'submitting'}
						/>
					</div>

					<!-- Phone -->
					<div>
						<label for="phone" class="mb-2 block text-base font-bold text-gray-900"> Phone </label>
						<input
							type="tel"
							id="phone"
							bind:value={formData.phone}
							class="w-full rounded-lg border border-gray-300 px-4 py-3 text-base font-normal focus:border-transparent focus:ring-2 focus:ring-primary-500"
							placeholder="(757) 555-1234"
							disabled={formState === 'submitting'}
						/>
					</div>

					<!-- Subject -->
					<div>
						<label for="subject" class="mb-2 block text-base font-bold text-gray-900">
							Subject
						</label>
						<input
							type="text"
							id="subject"
							bind:value={formData.subject}
							class="w-full rounded-lg border border-gray-300 px-4 py-3 text-base font-normal focus:border-transparent focus:ring-2 focus:ring-primary-500"
							placeholder="What can we help you with?"
							disabled={formState === 'submitting'}
						/>
					</div>

					<!-- Message -->
					<div>
						<label for="message" class="mb-2 block text-base font-bold text-gray-900">
							Message <span class="text-red-600">*</span>
						</label>
						<textarea
							id="message"
							bind:value={formData.message}
							required
							rows="6"
							class="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-base font-normal focus:border-transparent focus:ring-2 focus:ring-blue-600"
							placeholder="Tell us about your project..."
							disabled={formState === 'submitting'}
						></textarea>
					</div>

					<!-- Cloudflare Turnstile CAPTCHA -->
					<div id="turnstile-container"></div>

					<!-- Submit Button -->
					<div>
						<button
							type="submit"
							disabled={formState === 'submitting'}
							class="w-full rounded-lg bg-primary-500 px-8 py-3 text-base font-bold text-white transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:bg-gray-400"
						>
							{formState === 'submitting' ? 'Sending...' : 'Send Message'}
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</Section>
