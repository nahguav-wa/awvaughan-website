<!--
	Contact Page Component
	Contact information, form, and social media links
-->
<script lang="ts">
	import Section from '$lib/components/ui/Section.svelte';
	import SocialMediaIcons from '$lib/components/SocialMediaIcons.svelte';
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

	/**
	 * Handle form submission
	 */
	async function handleSubmit(event: Event) {
		event.preventDefault();
		formState = 'submitting';
		errorMessage = '';

		try {
			// Submit to Cloudflare Worker endpoint
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			if (!response.ok) {
				throw new Error('Failed to send message');
			}

			formState = 'success';
			// Reset form
			formData = {
				firstName: '',
				lastName: '',
				company: '',
				email: '',
				phone: '',
				subject: '',
				message: ''
			};
		} catch (error) {
			formState = 'error';
			errorMessage = 'Failed to send message. Please try again or call us directly.';
			console.error('Form submission error:', error);
		}
	}
</script>

<!--
	Page Hero Section
-->
<Section variant="gray" class="mt-16 md:mt-28">
	<div class="max-w-4xl mx-auto text-center">
		<h1 class="text-xl font-bold text-gray-900 mb-6">Contact Us</h1>
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
	<div class="max-w-6xl mx-auto">
		<div class="grid md:grid-cols-2 gap-12">
			<!-- Contact Information -->
			<div class="space-y-8">
				<div>
					<h2 class="text-xl font-bold text-gray-900 mb-6">Get In Touch</h2>
					<p class="text-base font-normal text-gray-600 mb-6">
						Have a question about our services? Need a quote for your project? We'd love to hear
						from you. Reach out using the form or contact us directly.
					</p>
				</div>

				<!-- Contact Details -->
				<div class="space-y-4">
					<!-- Phone -->
					<div class="flex items-center gap-4">
						<div class="flex-shrink-0 w-10 h-10 bg-primary-500 text-white rounded-lg flex items-center justify-center">
							<Phone class="w-5 h-5" />
						</div>
						<div>
							<h3 class="text-xl font-bold text-gray-900 mb-1">Phone</h3>
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
						<div class="flex-shrink-0 w-10 h-10 bg-primary-500 text-white rounded-lg flex items-center justify-center">
							<Mail class="w-5 h-5" />
						</div>
						<div>
							<h3 class="text-xl font-bold text-gray-900 mb-1">Email</h3>
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
						<div class="flex-shrink-0 w-10 h-10 bg-primary-500 text-white rounded-lg flex items-center justify-center">
							<MapPin class="w-5 h-5" />
						</div>
						<div>
							<h3 class="text-xl font-bold text-gray-900 mb-1">Service Area</h3>
							<p class="text-base font-normal text-gray-600">
								{COMPANY_INFO.location} and the 757 area
							</p>
						</div>
					</div>
				</div>

				<!-- Social Media Links -->
				<div>
					<h3 class="text-xl font-bold text-gray-900 mb-4">Follow Us</h3>
					<SocialMediaIcons />
				</div>
			</div>

			<!-- Contact Form -->
			<div>
				<h2 class="text-xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

				{#if formState === 'success'}
					<div class="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg mb-6">
						<h3 class="text-xl font-bold mb-2">Message Sent!</h3>
						<p class="text-base font-normal">
							Thank you for contacting us. We'll get back to you as soon as possible.
						</p>
					</div>
				{/if}

				{#if formState === 'error'}
					<div class="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg mb-6">
						<h3 class="text-xl font-bold mb-2">Error</h3>
						<p class="text-base font-normal">{errorMessage}</p>
					</div>
				{/if}

				<form onsubmit={handleSubmit} class="space-y-6">
					<!-- First Name and Last Name -->
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<!-- First Name -->
						<div>
							<label for="firstName" class="block text-base font-bold text-gray-900 mb-2">
								First Name <span class="text-red-600">*</span>
							</label>
							<input
								type="text"
								id="firstName"
								bind:value={formData.firstName}
								required
								class="w-full px-4 py-3 text-base font-normal border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
								placeholder="John"
								disabled={formState === 'submitting'}
							/>
						</div>

						<!-- Last Name -->
						<div>
							<label for="lastName" class="block text-base font-bold text-gray-900 mb-2">
								Last Name <span class="text-red-600">*</span>
							</label>
							<input
								type="text"
								id="lastName"
								bind:value={formData.lastName}
								required
								class="w-full px-4 py-3 text-base font-normal border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
								placeholder="Doe"
								disabled={formState === 'submitting'}
							/>
						</div>
					</div>

					<!-- Company Name -->
					<div>
						<label for="company" class="block text-base font-bold text-gray-900 mb-2">
							Company Name
						</label>
						<input
							type="text"
							id="company"
							bind:value={formData.company}
							class="w-full px-4 py-3 text-base font-normal border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
							placeholder="Your company (optional)"
							disabled={formState === 'submitting'}
						/>
					</div>

					<!-- Email -->
					<div>
						<label for="email" class="block text-base font-bold text-gray-900 mb-2">
							Email <span class="text-red-600">*</span>
						</label>
						<input
							type="email"
							id="email"
							bind:value={formData.email}
							required
							class="w-full px-4 py-3 text-base font-normal border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
							placeholder="your.email@example.com"
							disabled={formState === 'submitting'}
						/>
					</div>

					<!-- Phone -->
					<div>
						<label for="phone" class="block text-base font-bold text-gray-900 mb-2">
							Phone
						</label>
						<input
							type="tel"
							id="phone"
							bind:value={formData.phone}
							class="w-full px-4 py-3 text-base font-normal border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
							placeholder="(757) 555-1234"
							disabled={formState === 'submitting'}
						/>
					</div>

					<!-- Subject -->
					<div>
						<label for="subject" class="block text-base font-bold text-gray-900 mb-2">
							Subject
						</label>
						<input
							type="text"
							id="subject"
							bind:value={formData.subject}
							class="w-full px-4 py-3 text-base font-normal border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
							placeholder="What can we help you with?"
							disabled={formState === 'submitting'}
						/>
					</div>

					<!-- Message -->
					<div>
						<label for="message" class="block text-base font-bold text-gray-900 mb-2">
							Message <span class="text-red-600">*</span>
						</label>
						<textarea
							id="message"
							bind:value={formData.message}
							required
							rows="6"
							class="w-full px-4 py-3 text-base font-normal border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-y"
							placeholder="Tell us about your project..."
							disabled={formState === 'submitting'}
						></textarea>
					</div>

					<!-- Submit Button -->
					<div>
						<button
							type="submit"
							disabled={formState === 'submitting'}
							class="w-full bg-primary-500 text-white px-8 py-3 text-base font-bold rounded-lg hover:bg-primary-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
						>
							{formState === 'submitting' ? 'Sending...' : 'Send Message'}
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</Section>
