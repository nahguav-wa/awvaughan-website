<script lang="ts">
	import { PageHero } from '$lib';
	import { inView } from '$lib/actions/in-view';
	import { getLinkKey, getMetaKey } from '$lib/seo';

	let { data } = $props();
	const seo = $derived(data.seo);

        const commitments = [
                {
                        title: 'Prompt replies',
                        description:
                                'Call, text, or email and I will get back to you quickly—usually the same day—to talk through what you need.'
                },
                {
                        title: 'Straightforward pricing',
                        description:
                                'You will know the cost before the tractor unloads. I outline the work, equipment, and any material charges up front.'
                },
                {
                        title: 'Careful cleanup',
                        description:
                                'I leave the site tidy, safe, and ready for you to enjoy. Brush and debris leave with me unless you prefer otherwise.'
                }
        ] as const;

	let submissionMessage = '';

	const handleSubmit = (event: SubmitEvent) => {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		const data = new FormData(form);
		const name = (data.get('name') ?? 'Prospective client').toString();
		const email = (data.get('email') ?? '').toString();
		const phone = (data.get('phone') ?? '').toString();
		const service = (data.get('service') ?? 'General inquiry').toString();
		const message = (data.get('message') ?? '').toString();

		const subject = encodeURIComponent(`Project inquiry from ${name}`);
		const bodyLines = [
			`Name: ${name}`,
			email ? `Email: ${email}` : '',
			phone ? `Phone: ${phone}` : '',
			`Service area: ${service}`,
			'',
			message ? message : 'Project details:'
		].filter(Boolean);

		if (typeof window !== 'undefined') {
			const mailto = `mailto:alex.vaughan@awvaughan.com?subject=${subject}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
			window.location.href = mailto;
			submissionMessage =
				'We opened your email client so you can complete the request. If it did not open, email us at alex.vaughan@awvaughan.com.';
			form.reset();
		}
	};
</script>

<svelte:head>
	<title>{seo.title}</title>
	{#each seo.meta as tag (getMetaKey(tag))}
		<meta {...tag} />
	{/each}
	{#each seo.links as link (getLinkKey(link))}
		<link {...link} />
	{/each}
</svelte:head>

<PageHero
        eyebrow="Contact"
        heading="Let’s get your property back in shape"
        description={[
                'Tell me about your acreage, the problem areas, and any deadlines. I will respond quickly with next steps and available dates.',
                'Call or text (757) 402-1100 or email alex.vaughan@awvaughan.com for fast help.'
        ]}
        backgroundImage={{
                src: 'https://images.unsplash.com/photo-1596588801060-5d56586eca12?auto=format&fit=crop&w=1600&q=80',
                srcset:
                        'https://images.unsplash.com/photo-1596588801060-5d56586eca12?auto=format&fit=crop&w=640&q=70 640w, https://images.unsplash.com/photo-1596588801060-5d56586eca12?auto=format&fit=crop&w=1024&q=75 1024w, https://images.unsplash.com/photo-1596588801060-5d56586eca12?auto=format&fit=crop&w=1600&q=80 1600w',
                sizes: '(min-width: 1024px) 100vw, 100vw',
                alt: 'Compact tractor parked on a rural driveway ready for work.'
        }}
/>

<section class="border-b border-[var(--border-soft)] bg-[var(--surface-base)] py-16">
	<div class="mx-auto max-w-6xl px-6">
		<div class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
			<div class="space-y-8">
				<div
					class="rounded-3xl border border-[var(--border-soft)] bg-[var(--surface-soft)] p-8 shadow-sm"
				>
                                        <h2 class="reveal text-2xl font-semibold text-[var(--text-dark)]" use:inView>
                                                Talk directly with Alex
					</h2>
					<p class="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">
                                                Reach out using the details provided and let me know how I can help. Include the
                                                location, timing, and any photos that show what you are dealing with.
					</p>
					<address class="mt-6 space-y-4 text-sm text-[var(--text-muted)] not-italic">
						<div>
							<p class="text-xs font-semibold tracking-[0.35em] text-[var(--brand-blue)] uppercase">
								Phone
							</p>
							<a
								class="mt-1 inline-flex items-center gap-2 text-base text-[var(--text-dark)] transition hover:text-[var(--brand-blue)]"
								href="tel:+17574021100"
							>
								<span class="h-1.5 w-1.5 rounded-full bg-[var(--brand-orange)]" aria-hidden="true"
								></span>
								(757) 402-1100
							</a>
						</div>
						<div>
							<p class="text-xs font-semibold tracking-[0.35em] text-[var(--brand-blue)] uppercase">
								Email
							</p>
							<a
								class="mt-1 inline-flex items-center gap-2 text-base text-[var(--text-dark)] transition hover:text-[var(--brand-blue)]"
								href="mailto:alex.vaughan@awvaughan.com"
							>
								<span class="h-1.5 w-1.5 rounded-full bg-[var(--brand-orange)]" aria-hidden="true"
								></span>
								alex.vaughan@awvaughan.com
							</a>
						</div>
						<div>
							<p class="text-xs font-semibold tracking-[0.35em] text-[var(--brand-blue)] uppercase">
								Service area
							</p>
                                                        <p class="mt-1 text-base text-[var(--text-dark)]">
                                                                Virginia Beach, Chesapeake, Norfolk, Suffolk, Isle of Wight, and nearby Northeast NC
							</p>
						</div>
					</address>
					<div
						class="mt-8 rounded-2xl border border-[var(--border-soft)] bg-white/70 p-6 text-sm text-[var(--text-muted)]"
					>
						<p class="font-semibold text-[var(--text-dark)]">Prefer email?</p>
						<p class="mt-2">
							Send project details and attachments to
							<a
								class="font-semibold text-[var(--brand-blue)] transition hover:text-[var(--brand-orange)]"
								href="mailto:alex.vaughan@awvaughan.com"
							>
								alex.vaughan@awvaughan.com
							</a>
							and we’ll schedule a follow-up call.
						</p>
					</div>
				</div>

				<div class="space-y-6">
					<div class="space-y-2">
                                                <h2 class="text-2xl font-semibold text-[var(--text-dark)] sm:text-3xl">
                                                        What you can expect
						</h2>
						<p class="text-sm text-[var(--text-muted)]">
							Expect clear communication, tidy sites, and reliable follow-through from our crew.
						</p>
					</div>
					{#each commitments as commitment (commitment.title)}
						<article
							class="rounded-3xl border border-[var(--border-soft)] bg-[var(--surface-soft)] p-8 shadow-sm"
						>
							<h3 class="text-xl font-semibold text-[var(--text-dark)]">{commitment.title}</h3>
							<p class="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
								{commitment.description}
							</p>
						</article>
					{/each}
					<div
						class="rounded-3xl border border-[var(--border-soft)] bg-[var(--brand-blue)]/10 p-8 text-center text-[var(--text-dark)]"
					>
                                                <h3 class="text-sm font-semibold tracking-[0.35em] text-[var(--brand-blue)] uppercase">
                                                        Need help soon?
						</h3>
						<p class="mt-3 text-base text-[var(--text-muted)]">
                                                        Call or text
							<a
								class="font-semibold text-[var(--brand-blue)] transition hover:text-[var(--brand-orange)]"
								href="tel:+17574021100"
							>
								(757) 402-1100
							</a>
							for urgent storm response or safety repairs.
						</p>
					</div>
				</div>
			</div>

			<div
				class="rounded-3xl border border-[var(--border-soft)] bg-[var(--surface-soft)] p-8 shadow-sm"
			>
				<div class="space-y-3">
					<h2
						id="contact-form-heading"
						class="reveal text-2xl font-semibold text-[var(--text-dark)] sm:text-3xl"
						use:inView
					>
						Start your request
					</h2>
					<p class="text-sm text-[var(--text-muted)]">
						Share your project details and we will follow up with next steps.
					</p>
				</div>
				<form
					class="mt-6 space-y-6"
					on:submit={handleSubmit}
					aria-labelledby="contact-form-heading"
					aria-describedby="form-helper"
					novalidate
				>
					<div>
						<label
							class="text-sm font-semibold tracking-[0.25em] text-[var(--text-dark)] uppercase"
							for="name">Name</label
						>
						<input
							id="name"
							name="name"
							type="text"
							required
							autocomplete="name"
							class="mt-2 w-full rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-base)] px-4 py-3 text-sm text-[var(--text-dark)] placeholder:text-[var(--text-muted)] focus:border-[var(--brand-blue)] focus:ring-0"
							placeholder="Your name"
						/>
					</div>
					<div class="grid gap-6 sm:grid-cols-2">
						<div>
							<label
								class="text-sm font-semibold tracking-[0.25em] text-[var(--text-dark)] uppercase"
								for="email">Email</label
							>
							<input
								id="email"
								name="email"
								type="email"
								required
								autocomplete="email"
								class="mt-2 w-full rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-base)] px-4 py-3 text-sm text-[var(--text-dark)] placeholder:text-[var(--text-muted)] focus:border-[var(--brand-blue)] focus:ring-0"
								placeholder="name@example.com"
							/>
						</div>
						<div>
							<label
								class="text-sm font-semibold tracking-[0.25em] text-[var(--text-dark)] uppercase"
								for="phone">Phone</label
							>
							<input
								id="phone"
								name="phone"
								type="tel"
								autocomplete="tel"
								class="mt-2 w-full rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-base)] px-4 py-3 text-sm text-[var(--text-dark)] placeholder:text-[var(--text-muted)] focus:border-[var(--brand-blue)] focus:ring-0"
								placeholder="(757) 555-0123"
							/>
						</div>
					</div>
					<div>
						<label
							class="text-sm font-semibold tracking-[0.25em] text-[var(--text-dark)] uppercase"
							for="service">Service area</label
						>
						<select
							id="service"
							name="service"
							class="mt-2 w-full rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-base)] px-4 py-3 text-sm text-[var(--text-dark)] focus:border-[var(--brand-blue)] focus:ring-0"
						>
							<option value="Virginia Beach">Virginia Beach</option>
							<option value="Norfolk">Norfolk</option>
							<option value="Chesapeake">Chesapeake</option>
							<option value="Portsmouth">Portsmouth</option>
							<option value="Suffolk">Suffolk</option>
							<option value="Other Hampton Roads community">Other Hampton Roads community</option>
						</select>
					</div>
					<div>
						<label
							class="text-sm font-semibold tracking-[0.25em] text-[var(--text-dark)] uppercase"
							for="message">Project details</label
						>
						<textarea
							id="message"
							name="message"
							rows={4}
							class="mt-2 w-full rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-base)] px-4 py-3 text-sm text-[var(--text-dark)] placeholder:text-[var(--text-muted)] focus:border-[var(--brand-blue)] focus:ring-0"
							placeholder="Tell us about your scope, timeline, or emergency request."
						></textarea>
					</div>
					<p id="form-helper" class="text-xs text-[var(--text-muted)]">
						Submitting this form will open your email client with a draft message to our team.
					</p>
					{#if submissionMessage}
						<p class="text-sm font-semibold text-[var(--brand-blue)]" aria-live="polite">
							{submissionMessage}
						</p>
					{/if}
					<button
						type="submit"
						class="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--brand-orange)] px-6 py-3 text-sm font-semibold tracking-[0.28em] text-[var(--text-dark)] uppercase shadow-[var(--brand-orange)]/30 shadow-lg transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-blue)]"
					>
						Open email to send
					</button>
				</form>
			</div>
		</div>
	</div>
</section>

<section class="bg-[var(--brand-blue)] py-20 text-white">
	<div class="mx-auto max-w-4xl px-6 text-center">
		<h2 class="reveal text-3xl font-semibold sm:text-4xl" use:inView>
			We look forward to working with you
		</h2>
		<p class="mt-4 text-base text-white/80 sm:text-lg">
			Tell us about your project, community, or maintenance program. We’ll follow up with next steps
			and a plan tailored to your goals.
		</p>
		<div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
			<a
				href="tel:+17574021100"
				class="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-orange)] px-6 py-3 text-sm font-semibold tracking-[0.28em] text-[var(--text-dark)] uppercase shadow-[var(--brand-orange)]/30 shadow-lg transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-white sm:text-base"
			>
				Call (757) 402-1100
			</a>
			<a
				href="mailto:alex.vaughan@awvaughan.com"
				class="inline-flex items-center justify-center gap-2 rounded-full border border-white/60 bg-white/10 px-6 py-3 text-sm font-semibold tracking-[0.28em] text-white uppercase transition hover:border-white hover:bg-white/20 sm:text-base"
			>
				Email us directly
			</a>
		</div>
	</div>
</section>
