<!--
	Contact Page Component
	Contact information, form, and social media links
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { Section, SocialMediaIcons } from '$lib';
	import { COMPANY_INFO } from '$lib/config/constants';
	import { MapPin, Phone, Mail } from '@lucide/svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	/** Minimal shape of the Turnstile global we rely on. */
	interface TurnstileApi {
		render: (
			el: string,
			opts: {
				sitekey: string;
				callback: (token: string) => void;
				'expired-callback'?: () => void;
				'timeout-callback'?: () => void;
				'error-callback'?: () => void;
			}
		) => string;
		reset: (id: string) => void;
	}

	const EMPTY_FORM = {
		firstName: '',
		lastName: '',
		company: '',
		email: '',
		phone: '',
		subject: '',
		message: '',
		/** Honeypot. Hidden from real users; bots fill it and are silently dropped. */
		website: ''
	};

	// Form state
	let formData = $state({ ...EMPTY_FORM });

	let formState = $state<'idle' | 'submitting' | 'success' | 'error'>('idle');
	let errorMessage = $state('');
	/** Set when the submission was captured but the notification email did not go out. */
	let deliveryDelayed = $state(false);
	let turnstileToken = $state('');
	let turnstileWidgetId = $state<string | null>(null);
	let turnstileNotice = $state('');

	const turnstileEnabled = $derived(Boolean(data.turnstileSiteKey));

	/** A verification is needed but not yet solved. */
	const awaitingVerification = $derived(turnstileEnabled && !turnstileToken);

	const submitDisabled = $derived(
		formState === 'submitting' || data.turnstileMisconfigured || awaitingVerification
	);

	function getTurnstile(): TurnstileApi | null {
		if (typeof window === 'undefined' || !('turnstile' in window)) return null;
		return (window as unknown as { turnstile: TurnstileApi }).turnstile;
	}

	/**
	 * Load the Turnstile script and render the widget.
	 *
	 * The script element's own `onload` is used rather than polling every 100ms
	 * for a global: the previous interval never cleared when the script failed to
	 * load, leaving a timer running for the life of the page.
	 */
	onMount(() => {
		const siteKey = data.turnstileSiteKey;
		if (!siteKey) return;

		const script = document.createElement('script');
		script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
		script.async = true;

		script.onload = () => {
			const turnstile = getTurnstile();
			if (!turnstile) return;

			turnstileWidgetId = turnstile.render('#turnstile-container', {
				sitekey: siteKey,
				callback: (token: string) => {
					turnstileToken = token;
					turnstileNotice = '';
				},
				// Tokens are single-use and expire after about five minutes, which is
				// easily reached while writing a message. Clear the stale token so the
				// widget can reissue one instead of submitting something the server
				// will reject.
				'expired-callback': () => {
					turnstileToken = '';
					turnstileNotice = 'Verification expired. Please complete it again.';
				},
				'timeout-callback': () => {
					turnstileToken = '';
					turnstileNotice = 'Verification timed out. Please complete it again.';
				},
				'error-callback': () => {
					turnstileToken = '';
					turnstileNotice = `Verification could not load. Please reload the page, or call us at ${COMPANY_INFO.phone}.`;
				}
			});
		};

		script.onerror = () => {
			turnstileNotice = `Verification could not load. Please reload the page, or call us at ${COMPANY_INFO.phone}.`;
		};

		document.head.appendChild(script);

		return () => {
			script.remove();
		};
	});

	/**
	 * Discard the current token and ask Turnstile for a fresh one.
	 *
	 * Required after any failed submission: the server has already redeemed the
	 * token with Cloudflare, so resubmitting the same one always fails as a
	 * duplicate. Previously the widget was only reset on success, so one failure
	 * left the form permanently unsubmittable until a full page reload.
	 */
	function resetTurnstile() {
		turnstileToken = '';
		const turnstile = getTurnstile();
		if (turnstileWidgetId !== null && turnstile) {
			turnstile.reset(turnstileWidgetId);
		}
	}

	/**
	 * Read the server's explanation out of a failed response.
	 *
	 * The API returns specific, actionable messages (expired CAPTCHA, invalid
	 * email, a delivery failure with the phone number). Discarding them for a
	 * generic string left both the visitor and the logs with no idea what went
	 * wrong.
	 */
	async function readErrorMessage(response: Response): Promise<string> {
		try {
			const payload = await response.json();
			if (typeof payload?.message === 'string' && payload.message) return payload.message;
		} catch {
			// Non-JSON body; fall through to the generic message.
		}
		return `Failed to send message. Please try again or call us at ${COMPANY_INFO.phone}.`;
	}

	/**
	 * Handle form submission
	 */
	async function handleSubmit(event: Event) {
		event.preventDefault();
		formState = 'submitting';
		errorMessage = '';
		deliveryDelayed = false;

		// Generate a unique event ID shared with the server for Meta CAPI deduplication
		const eventId = crypto.randomUUID();

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					...formData,
					'cf-turnstile-response': turnstileToken,
					event_id: eventId,
					event_source_url: window.location.href
				})
			});

			if (!response.ok) {
				errorMessage = await readErrorMessage(response);
				formState = 'error';
				resetTurnstile();
				return;
			}

			const payload = await response.json().catch(() => null);
			deliveryDelayed = payload?.delivered === false;
			if (deliveryDelayed && typeof payload?.message === 'string') {
				errorMessage = payload.message;
			}

			formState = 'success';

			const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
			if (fbq) {
				fbq('track', 'Lead', {}, { eventID: eventId });
			}

			formData = { ...EMPTY_FORM };
			resetTurnstile();
		} catch (err) {
			formState = 'error';
			errorMessage = `Failed to send message. Please try again or call us at ${COMPANY_INFO.phone}.`;
			resetTurnstile();
			console.error('Form submission error:', err);
		}
	}
</script>

<!--
	Page Hero Section
-->
<Section variant="gray">
	<div class="mx-auto max-w-4xl text-center">
		<h1 class="mb-6 text-gray-900">Contact Us</h1>
		<p class="text-lg font-normal text-gray-600">
			Free quotes on land clearing, bush hogging, forestry mulching, trail systems and property
			maintenance in Williamsburg and across the Historic Triangle and Middle Peninsula.
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
					<h2 class="mb-6 text-gray-900">Get In Touch</h2>
					<p class="mb-6 text-base font-normal text-gray-600">
						Tell us about the property — roughly how many acres, how long since it was last cut, and
						how thick it has got. Photos help more than anything. The more you give us, the more
						useful the first answer will be. Use the form, or call and talk it through.
					</p>
				</div>

				<!-- Contact Details -->
				<div class="space-y-4">
					<!-- Phone -->
					<div class="flex items-center gap-4">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-500 text-white"
						>
							<Phone class="h-5 w-5" aria-hidden="true" />
						</div>
						<div>
							<h3 class="mb-1 text-gray-900">Phone</h3>
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
							<Mail class="h-5 w-5" aria-hidden="true" />
						</div>
						<div>
							<h3 class="mb-1 text-gray-900">Email</h3>
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
							<MapPin class="h-5 w-5" aria-hidden="true" />
						</div>
						<div>
							<h3 class="mb-1 text-gray-900">Service Area</h3>
							<p class="text-base font-normal text-gray-600">
								Based in {COMPANY_INFO.location}, serving {COMPANY_INFO.serviceArea.region}
							</p>
						</div>
					</div>
				</div>

				<!-- Social Media Links -->
				<div>
					<h3 class="mb-4 text-gray-900">Follow Us</h3>
					<SocialMediaIcons />
				</div>
			</div>

			<!-- Contact Form -->
			<div>
				<h2 class="mb-6 text-gray-900">Send Us a Message</h2>

				<!-- Status messages, announced to assistive technology -->
				<div aria-live="polite">
					{#if formState === 'success' && !deliveryDelayed}
						<div
							class="mb-6 rounded-lg border border-green-200 bg-green-50 px-6 py-4 text-green-800"
						>
							<h3 class="mb-2">Message Sent!</h3>
							<p class="text-base font-normal">
								Thank you for contacting us. We'll get back to you as soon as possible.
							</p>
						</div>
					{/if}

					{#if formState === 'success' && deliveryDelayed}
						<div
							class="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-6 py-4 text-amber-900"
						>
							<h3 class="mb-2">Message Received</h3>
							<p class="text-base font-normal">{errorMessage}</p>
						</div>
					{/if}

					{#if formState === 'error'}
						<div class="mb-6 rounded-lg border border-red-200 bg-red-50 px-6 py-4 text-red-800">
							<h3 class="mb-2">Error</h3>
							<p class="text-base font-normal">{errorMessage}</p>
						</div>
					{/if}

					{#if data.turnstileMisconfigured}
						<div class="mb-6 rounded-lg border border-red-200 bg-red-50 px-6 py-4 text-red-800">
							<h3 class="mb-2">Form Unavailable</h3>
							<p class="text-base font-normal">
								Our contact form is temporarily unavailable. Please call us at
								<a class="font-bold underline" href={COMPANY_INFO.phoneHref}>{COMPANY_INFO.phone}</a
								>
								or email
								<a class="font-bold underline" href={COMPANY_INFO.emailHref}>{COMPANY_INFO.email}</a
								>.
							</p>
						</div>
					{/if}
				</div>

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
								name="firstName"
								autocomplete="given-name"
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
								name="lastName"
								autocomplete="family-name"
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
							name="company"
							autocomplete="organization"
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
							name="email"
							autocomplete="email"
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
							name="phone"
							autocomplete="tel"
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
							name="subject"
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
							name="message"
							bind:value={formData.message}
							required
							rows="6"
							class="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-base font-normal focus:border-transparent focus:ring-2 focus:ring-primary-500"
							placeholder="Tell us about your project..."
							disabled={formState === 'submitting'}
						></textarea>
					</div>

					<!--
						Honeypot. Hidden from sighted users and removed from the tab order and
						the accessibility tree, so only automated submissions fill it in.
					-->
					<div class="hidden" aria-hidden="true">
						<label for="website">Leave this field empty</label>
						<input
							type="text"
							id="website"
							name="website"
							tabindex="-1"
							autocomplete="off"
							bind:value={formData.website}
						/>
					</div>

					<!-- Cloudflare Turnstile CAPTCHA -->
					{#if turnstileEnabled}
						<div>
							<div id="turnstile-container"></div>
							{#if turnstileNotice}
								<p class="mt-2 text-sm font-normal text-red-700">{turnstileNotice}</p>
							{/if}
						</div>
					{/if}

					<!-- Submit Button -->
					<div>
						<button
							type="submit"
							disabled={submitDisabled}
							class="w-full rounded-lg bg-primary-500 px-8 py-3 text-base font-bold text-white transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:bg-gray-400"
						>
							{formState === 'submitting' ? 'Sending...' : 'Send Message'}
						</button>
						{#if awaitingVerification && !turnstileNotice}
							<p class="mt-2 text-sm font-normal text-gray-600">
								Complete the verification above to send your message.
							</p>
						{/if}
					</div>
				</form>
			</div>
		</div>
	</div>
</Section>
