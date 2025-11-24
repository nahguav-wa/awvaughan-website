<script lang="ts">
	import { PageHero } from '$lib';
	import { inView } from '$lib/actions/in-view';
	import { getLinkKey, getMetaKey } from '$lib/seo';
	import {
		Badge,
		Button,
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle,
		Input,
		Label,
		Textarea
	} from '$lib/components/ui';

	let { data } = $props();
	const seo = $derived(data.seo);

	const commitments = [
		{
			title: 'Prompt replies',
			description: 'Call, text, or email and I will reply quickly with next steps.'
		},
		{
			title: 'Straightforward pricing',
			description: 'You see the scope, equipment, and material costs before the tractor unloads.'
		},
		{
			title: 'Careful cleanup',
			description: 'I leave the site tidy and remove debris unless you request otherwise.'
		}
	] as const;

	let submissionMessage = $state('');

	const handleSubmit = (event: SubmitEvent) => {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		const data = new FormData(form);
		const name = (data.get('name') ?? 'Prospective client').toString();
		const emailAddress = (data.get('email') ?? '').toString();
		const phone = (data.get('phone') ?? '').toString();
		const service = (data.get('service') ?? 'General inquiry').toString();
		const message = (data.get('message') ?? '').toString();

		const subject = encodeURIComponent(`Project inquiry from ${name}`);
		const bodyLines = [
			`Name: ${name}`,
			emailAddress ? `Email: ${emailAddress}` : '',
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
	align="center"
	heading="Tell me what you need and when you need it"
	description={[
		'Share the areas to address and your timeline. I will respond quickly with a simple plan.'
	]}
/>

<section class="border-border/60 section-spacing border-b bg-background">
	<div class="content-container">
		<div class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
			<div class="stack-spacing">
				<Card>
					<CardHeader class="space-y-3">
						<CardTitle class="reveal text-2xl font-semibold text-[hsl(var(--foreground))]">
							<span use:inView class="block">Talk directly with Alex</span>
						</CardTitle>
						<CardDescription>
							Reach out with the location, timing, and a few photos. I will outline the next steps.
						</CardDescription>
					</CardHeader>
					<CardContent class="space-y-6">
						<address class="space-y-4 text-sm text-[hsl(var(--muted-foreground))] not-italic">
							<div class="space-y-1">
								<Label class="text-[0.65rem] text-[hsl(var(--accent))]">Phone</Label>
								<a
									class="inline-flex items-center gap-2 text-base text-[hsl(var(--foreground))] transition hover:text-[hsl(var(--primary))]"
									href="tel:+17574021100"
								>
									<span class="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" aria-hidden="true"
									></span>
									(757) 402-1100
								</a>
							</div>
							<div class="space-y-1">
								<Label class="text-[0.65rem] text-[hsl(var(--accent))]">Email</Label>
								<a
									class="inline-flex items-center gap-2 text-base text-[hsl(var(--foreground))] transition hover:text-[hsl(var(--primary))]"
									href="mailto:alex.vaughan@awvaughan.com"
								>
									<span class="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" aria-hidden="true"
									></span>
									alex.vaughan@awvaughan.com
								</a>
							</div>
							<div class="space-y-1">
								<Label class="text-[0.65rem] text-[hsl(var(--accent))]">Service area</Label>
								<p class="text-base text-[hsl(var(--foreground))]">
									Virginia Beach, Chesapeake, Norfolk, Suffolk, Isle of Wight, and nearby Northeast
									NC
								</p>
							</div>
						</address>
						<Card
							class="border-dashed border-[hsl(var(--accent))]/40 bg-white/70 text-sm text-[hsl(var(--muted-foreground))]"
						>
							<CardContent class="space-y-2">
								<p class="font-semibold text-[hsl(var(--foreground))]">Prefer email?</p>
								<p>
									Send project details and attachments to
									<a
										class="font-semibold text-[hsl(var(--primary))] transition hover:text-[hsl(var(--accent))]"
										href="mailto:alex.vaughan@awvaughan.com"
									>
										alex.vaughan@awvaughan.com
									</a>
									and we’ll schedule a follow-up call.
								</p>
							</CardContent>
						</Card>
					</CardContent>
				</Card>

				<div class="space-y-6">
					<div class="space-y-2">
						<CardTitle
							class="reveal text-2xl font-semibold text-[hsl(var(--foreground))] sm:text-3xl"
						>
							<span use:inView class="block">What you can expect</span>
						</CardTitle>
						<CardDescription
							>Clear updates, tidy sites, and reliable follow-through.</CardDescription
						>
					</div>
					{#each commitments as commitment (commitment.title)}
						<Card>
							<CardHeader>
								<CardTitle class="reveal text-xl font-semibold text-[hsl(var(--foreground))]">
									<span use:inView class="block">{commitment.title}</span>
								</CardTitle>
								<CardDescription>{commitment.description}</CardDescription>
							</CardHeader>
						</Card>
					{/each}
					<Card class="bg-[hsl(var(--secondary))]/50 text-center text-[hsl(var(--foreground))]">
						<CardHeader class="space-y-3">
							<Badge variant="secondary" class="w-fit self-center text-xs font-semibold"
								>Need help soon?</Badge
							>
							<CardDescription class="text-base text-[hsl(var(--muted-foreground))]">
								Call or text
								<a
									class="font-semibold text-[hsl(var(--primary))] transition hover:text-[hsl(var(--accent))]"
									href="tel:+17574021100"
								>
									(757) 402-1100
								</a>
								for urgent storm response or safety repairs.
							</CardDescription>
						</CardHeader>
					</Card>
				</div>
			</div>

			<Card>
				<CardHeader class="space-y-2">
					<CardTitle class="text-2xl font-semibold text-[hsl(var(--foreground))]">
						Send a quick overview
					</CardTitle>
					<CardDescription>
						Share your contact information and a short note about the work. I will reply with next
						steps.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form class="space-y-5" onsubmit={handleSubmit}>
						<div class="space-y-2">
							<Label for="name">Name</Label>
							<Input id="name" name="name" placeholder="Your name" />
						</div>
						<div class="grid gap-4 sm:grid-cols-2">
							<div class="space-y-2">
								<Label for="email">Email</Label>
								<Input id="email" name="email" type="email" placeholder="you@example.com" />
							</div>
							<div class="space-y-2">
								<Label for="phone">Phone</Label>
								<Input id="phone" name="phone" type="tel" placeholder="(757) 402-1100" />
							</div>
						</div>
						<div class="space-y-2">
							<Label for="service">Service area</Label>
							<Input id="service" name="service" placeholder="City or county" />
						</div>
						<div class="space-y-2">
							<Label for="message">Project details</Label>
							<Textarea id="message" name="message" placeholder="Tell me what you need help with" />
						</div>
						{#if submissionMessage}
							<p class="text-sm text-[hsl(var(--muted-foreground))]">{submissionMessage}</p>
						{/if}
						<CardFooter class="justify-end gap-3 pt-0">
							<Button type="submit" variant="default" class="rounded-full">Draft an email</Button>
							<Button
								type="button"
								variant="ghost"
								class="rounded-full"
								href="mailto:alex.vaughan@awvaughan.com"
							>
								Email Alex directly
							</Button>
						</CardFooter>
					</form>
				</CardContent>
			</Card>
		</div>
	</div>
</section>
