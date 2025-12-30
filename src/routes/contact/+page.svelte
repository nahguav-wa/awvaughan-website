<!--
	Contact Page Component
	Contact information, form, and social media links
-->
<script lang="ts">
	import Section from '$lib/components/ui/Section.svelte';
	import { COMPANY_INFO, SOCIAL_LINKS } from '$lib/config/constants';
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
						<div class="text-center">
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
						<div class="text-center">
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
						<div class="text-center">
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
					<div class="flex gap-4">
						<!-- Instagram -->
						<a
							href={SOCIAL_LINKS.instagram}
							class="w-10 h-10 bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors"
							aria-label="Follow us on Instagram"
							target="_blank"
							rel="noopener noreferrer"
						>
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path
									d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
								/>
							</svg>
						</a>

						<!-- Facebook -->
						<a
							href={SOCIAL_LINKS.facebook}
							class="w-10 h-10 bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors"
							aria-label="Follow us on Facebook"
							target="_blank"
							rel="noopener noreferrer"
						>
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path
									d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
								/>
							</svg>
						</a>

						<!-- YouTube -->
						<a
							href={SOCIAL_LINKS.youtube}
							class="w-10 h-10 bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors"
							aria-label="Follow us on YouTube"
							target="_blank"
							rel="noopener noreferrer"
						>
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path
									d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
								/>
							</svg>
						</a>

						<!-- Nextdoor -->
						<a
							href={SOCIAL_LINKS.nextdoor}
							class="w-10 h-10 bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors"
							aria-label="Follow us on Nextdoor"
							target="_blank"
							rel="noopener noreferrer"
						>
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path
									d="M12.198 23.997c-6.617 0-12-5.382-12-12 0-6.617 5.383-12 12-12s12 5.383 12 12c0 6.618-5.383 12-12 12zm6.777-18.285c-1.668 0-3.07.83-4.369 2.456-1.3-1.626-2.701-2.456-4.368-2.456-2.257 0-4.223 1.83-4.223 4.16 0 3.21 3.242 5.633 7.018 8.997.473.42.946.84 1.573 1.439.626-.598 1.1-1.018 1.572-1.439 3.777-3.364 7.019-5.787 7.019-8.998 0-2.33-1.967-4.159-4.222-4.159z"
								/>
							</svg>
						</a>
					</div>
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
