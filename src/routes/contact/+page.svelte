<script lang="ts">
	const commitments = [
		{
			title: 'Quick response',
			description:
				'We return calls and emails promptly so you can move forward with confidence. Share your timeline and we will align crew availability.'
		},
		{
			title: 'Transparent proposals',
			description:
				'Expect clear scopes with equipment, materials, and scheduling outlined up front. No surprises—just honest pricing and reliable work.'
		},
		{
			title: 'Safety & stewardship',
			description:
				'We maintain safe, tidy sites and respect the neighborhoods we serve. Our team leaves each property ready for residents, guests, or the next trade.'
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
	<title>Contact AW Vaughan Company | Sitework & Maintenance in Virginia Beach</title>
	<meta
		name="description"
		content="Contact AW Vaughan Company at (757) 402-1100 or alex.vaughan@awvaughan.com for sitework, drainage, and property maintenance services in Virginia Beach and Hampton Roads."
	/>
</svelte:head>

<section
	class="border-b border-white/10 bg-gradient-to-b from-[var(--brand-navy-900)] to-[var(--brand-navy-800)] py-20"
>
	<div class="mx-auto max-w-5xl px-6">
		<p class="text-sm font-semibold tracking-[0.35em] text-[var(--brand-teal)] uppercase">
			Contact
		</p>
		<h1 class="mt-4 text-4xl font-bold text-white sm:text-5xl">Let’s plan your next project</h1>
		<p class="mt-6 text-lg leading-relaxed text-slate-200">
			Share your scope, maintenance needs, or emergency request below. We’ll respond quickly with
			the information you need to move forward.
		</p>
	</div>
</section>

<section class="border-b border-white/10 bg-[var(--brand-navy-900)] py-16">
	<div class="mx-auto max-w-6xl px-6">
		<div class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
			<div class="space-y-8">
				<div class="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/35">
					<h2 class="text-2xl font-semibold text-white">Talk with our team</h2>
					<p class="mt-4 text-sm leading-relaxed text-slate-200">
						Reach out using the details provided and let us know how we can help. Include site
						location, target schedule, and any drawings or photos that will help us prepare.
					</p>
					<address class="mt-6 space-y-4 text-sm text-slate-200 not-italic">
						<div>
							<p class="text-xs font-semibold tracking-[0.35em] text-[var(--brand-teal)] uppercase">
								Phone
							</p>
							<a
								class="mt-1 inline-flex items-center gap-2 text-base text-white transition hover:text-[var(--brand-orange)]"
								href="tel:+17574021100"
							>
								<span class="h-1.5 w-1.5 rounded-full bg-[var(--brand-orange)]" aria-hidden="true"
								></span>
								(757) 402-1100
							</a>
						</div>
						<div>
							<p class="text-xs font-semibold tracking-[0.35em] text-[var(--brand-teal)] uppercase">
								Email
							</p>
							<a
								class="mt-1 inline-flex items-center gap-2 text-base text-white transition hover:text-[var(--brand-orange)]"
								href="mailto:alex.vaughan@awvaughan.com"
							>
								<span class="h-1.5 w-1.5 rounded-full bg-[var(--brand-orange)]" aria-hidden="true"
								></span>
								alex.vaughan@awvaughan.com
							</a>
						</div>
						<div>
							<p class="text-xs font-semibold tracking-[0.35em] text-[var(--brand-teal)] uppercase">
								Service area
							</p>
							<p class="mt-1 text-base text-white">
								Virginia Beach, Norfolk, Chesapeake, and the greater Hampton Roads region
							</p>
						</div>
					</address>
					<div
						class="mt-8 rounded-2xl border border-[var(--brand-teal)]/40 bg-[var(--brand-teal)]/10 p-6 text-sm text-slate-100"
					>
						<p class="font-semibold text-white">Prefer email?</p>
						<p class="mt-2">
							Send project details and attachments to
							<a
								class="font-semibold text-[var(--brand-orange)] transition hover:text-[var(--brand-teal)]"
								href="mailto:alex.vaughan@awvaughan.com"
							>
								alex.vaughan@awvaughan.com
							</a>
							and we’ll schedule a follow-up call.
						</p>
					</div>
				</div>

				<div class="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/35">
					<form
						class="space-y-6"
						on:submit={handleSubmit}
						aria-describedby="form-helper"
						novalidate
					>
						<div>
							<label class="text-sm font-semibold tracking-[0.25em] text-white uppercase" for="name"
								>Name</label
							>
							<input
								id="name"
								name="name"
								type="text"
								required
								autocomplete="name"
								class="mt-2 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-[var(--brand-orange)] focus:ring-0"
								placeholder="Your name"
							/>
						</div>
						<div class="grid gap-6 sm:grid-cols-2">
							<div>
								<label
									class="text-sm font-semibold tracking-[0.25em] text-white uppercase"
									for="email">Email</label
								>
								<input
									id="email"
									name="email"
									type="email"
									required
									autocomplete="email"
									class="mt-2 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-[var(--brand-orange)] focus:ring-0"
									placeholder="name@example.com"
								/>
							</div>
							<div>
								<label
									class="text-sm font-semibold tracking-[0.25em] text-white uppercase"
									for="phone">Phone</label
								>
								<input
									id="phone"
									name="phone"
									type="tel"
									autocomplete="tel"
									class="mt-2 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-[var(--brand-orange)] focus:ring-0"
									placeholder="(757) 555-0123"
								/>
							</div>
						</div>
						<div>
							<label
								class="text-sm font-semibold tracking-[0.25em] text-white uppercase"
								for="service">Service area</label
							>
							<select
								id="service"
								name="service"
								class="mt-2 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white focus:border-[var(--brand-orange)] focus:ring-0"
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
								class="text-sm font-semibold tracking-[0.25em] text-white uppercase"
								for="message">Project details</label
							>
							<textarea
								id="message"
								name="message"
								rows={4}
								class="mt-2 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-[var(--brand-orange)] focus:ring-0"
								placeholder="Tell us about your scope, timeline, or emergency request."
							></textarea>
						</div>
						<p id="form-helper" class="text-xs text-slate-300">
							Submitting this form will open your email client with a draft message to our team.
						</p>
						{#if submissionMessage}
							<p class="text-sm font-semibold text-[var(--brand-teal)]" aria-live="polite">
								{submissionMessage}
							</p>
						{/if}
						<button
							type="submit"
							class="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--brand-orange)] px-6 py-3 text-sm font-semibold tracking-[0.28em] text-[var(--brand-navy-900)] uppercase shadow-[var(--brand-orange)]/35 shadow-lg transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-cream)]"
						>
							Open email to send
						</button>
					</form>
				</div>
			</div>

			<div class="space-y-6">
				{#each commitments as commitment (commitment.title)}
					<article
						class="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/30"
					>
						<h3 class="text-xl font-semibold text-white">{commitment.title}</h3>
						<p class="mt-3 text-sm leading-relaxed text-slate-200">{commitment.description}</p>
					</article>
				{/each}
				<div
					class="rounded-3xl border border-white/10 bg-[var(--brand-navy-900)]/80 p-8 text-center"
				>
					<p class="text-sm font-semibold tracking-[0.35em] text-[var(--brand-teal)] uppercase">
						Need fast help?
					</p>
					<p class="mt-3 text-base text-slate-200">
						Call us at
						<a
							class="font-semibold text-white transition hover:text-[var(--brand-orange)]"
							href="tel:+17574021100"
						>
							(757) 402-1100
						</a>
						for urgent storm response or safety repairs.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="bg-gradient-to-b from-[var(--brand-navy-900)] to-[var(--brand-navy-800)] py-20">
	<div class="mx-auto max-w-4xl px-6 text-center">
		<h2 class="text-3xl font-bold text-white sm:text-4xl">We look forward to working with you</h2>
		<p class="mt-4 text-base text-slate-200 sm:text-lg">
			Tell us about your project, community, or maintenance program. We’ll follow up with next steps
			and a plan tailored to your goals.
		</p>
		<div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
			<a
				href="tel:+17574021100"
				class="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-orange)] px-6 py-3 text-sm font-semibold tracking-[0.28em] text-[var(--brand-navy-900)] uppercase shadow-[var(--brand-orange)]/35 shadow-lg transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-cream)] sm:text-base"
			>
				Call (757) 402-1100
			</a>
			<a
				href="mailto:alex.vaughan@awvaughan.com"
				class="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold tracking-[0.28em] text-white uppercase transition hover:border-white/60 hover:bg-white/20 sm:text-base"
			>
				Email us directly
			</a>
		</div>
	</div>
</section>
