<script lang="ts">
	import { resolve } from '$app/paths';
	import { PageHero } from '$lib';
	import { inView } from '$lib/actions/in-view';
	import { getLinkKey, getMetaKey } from '$lib/seo';
	import CoastalIcon from '$lib/components/icons/CoastalIcon.svelte';
	import LeadershipIcon from '$lib/components/icons/LeadershipIcon.svelte';
	import ServiceIcon from '$lib/components/icons/ServiceIcon.svelte';
	import type { ComponentType } from 'svelte';
	import {
		Badge,
		Button,
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle,
		Separator
	} from '$lib/components/ui';

	let { data } = $props();
	const seo = $derived(data.seo);

	const values: readonly {
		title: string;
		description: string;
		icon: ComponentType;
	}[] = [
		{
			title: 'Owner-operated',
			description:
				'You do not get handed off to a crew. I show up, run the tractor, and make sure the job is completed the right way.',
			icon: ServiceIcon
		},
		{
			title: 'Local roots',
			description:
				'I grew up in Hampton Roads and understand our soils, drainage challenges, and weather. That experience guides every plan.',
			icon: CoastalIcon
		},
		{
			title: 'Respectful communication',
			description:
				'From the first phone call to the final sweep, I keep you informed and treat your property like my own.',
			icon: LeadershipIcon
		}
	];

	const steps = [
		{
			title: 'Walk the property',
			description:
				'We look over the site together, talk through trouble spots, and discuss access for the tractor and trailer.'
		},
		{
			title: 'Outline the plan',
			description:
				'I follow up with a clear quote covering the work, equipment, timing, and any material deliveries needed.'
		},
		{
			title: 'Do the work right',
			description:
				'I show up when promised, handle the work carefully, and walk the site with you before loading up.'
		}
	] as const;

	const certifications = [
		{ label: 'Fully insured', detail: 'Commercial liability and equipment coverage' },
		{ label: 'Virginia-based', detail: 'Serving Hampton Roads and northeast North Carolina' },
		{ label: 'Reliable equipment', detail: 'Well-maintained tractor, implements, and dump trailer' }
	] as const;

	const serviceArea = [
		'Virginia Beach',
		'Chesapeake',
		'Norfolk',
		'Suffolk',
		'Isle of Wight County',
		'Currituck County, NC'
	] as const;
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
	eyebrow="About"
	align="center"
	heading="A neighbor with the tools to tackle your to-do list"
	description="I am Alex Vaughan—born and raised in Hampton Roads and committed to helping landowners keep their properties looking sharp without hiring a big crew."
	backgroundImage={{
		src: 'https://images.unsplash.com/photo-1596588801060-5d56586eca12?auto=format&fit=crop&w=1600&q=80',
		srcset:
			'https://images.unsplash.com/photo-1596588801060-5d56586eca12?auto=format&fit=crop&w=640&q=70 640w, https://images.unsplash.com/photo-1596588801060-5d56586eca12?auto=format&fit=crop&w=1024&q=75 1024w, https://images.unsplash.com/photo-1596588801060-5d56586eca12?auto=format&fit=crop&w=1600&q=80 1600w',
		sizes: '(min-width: 1024px) 100vw, 100vw',
		alt: 'Owner-operated tractor working across a grassy property.'
	}}
/>

<section class="border-b border-border/60 bg-background py-16">
	<div class="mx-auto max-w-6xl space-y-12 px-6">
		<div class="max-w-3xl space-y-4">
			<Badge variant="secondary" class="w-fit normal-case tracking-[0.3em]">
				What matters most
			</Badge>
			<h2
				class="reveal text-3xl font-semibold text-[hsl(var(--foreground))] sm:text-4xl"
				use:inView
			>
				The promise behind every job I take on
			</h2>
			<p class="text-base text-[hsl(var(--muted-foreground))] sm:text-lg">
				I built this business to help people who need dependable help with larger properties. These
				principles guide every visit.
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-3">
                        {#each values as value (value.title)}
                                {@const Icon = value.icon}
                                <Card class="h-full">
                                        <CardHeader class="space-y-4">
                                                <span
                                                        class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]"
                                                >
                                                        <Icon class="h-6 w-6" />
                                                </span>
						<CardTitle>{value.title}</CardTitle>
						<CardDescription>{value.description}</CardDescription>
					</CardHeader>
				</Card>
			{/each}
		</div>
	</div>
</section>

<section class="border-b border-border/60 bg-muted/40 py-20">
	<div class="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1fr_340px]">
		<div class="space-y-6">
			<div class="space-y-4">
				<Badge variant="secondary" class="w-fit normal-case tracking-[0.3em]">How it works</Badge>
				<h2
					class="reveal text-3xl font-semibold text-[hsl(var(--foreground))] sm:text-4xl"
					use:inView
				>
					Clear steps from first call to final pass
				</h2>
				<p class="text-base text-[hsl(var(--muted-foreground))] sm:text-lg">
					Working with me is straightforward. We talk through your goals, agree on a plan, and I
					handle the work with the same care I would on my own land.
				</p>
			</div>

			<div class="grid gap-6 md:grid-cols-3">
				{#each steps as step, index (step.title)}
					<Card class="h-full">
						<CardHeader class="space-y-3">
							<Badge variant="accent" class="w-fit rounded-full text-[0.65rem]">
								Step {index + 1}
							</Badge>
							<CardTitle class="text-lg">{step.title}</CardTitle>
							<CardDescription>{step.description}</CardDescription>
						</CardHeader>
					</Card>
				{/each}
			</div>
		</div>

		<Card class="h-full">
			<CardHeader class="space-y-3">
				<Badge variant="secondary" class="w-fit normal-case tracking-[0.3em]">
					What you can count on
				</Badge>
			</CardHeader>
			<CardContent class="space-y-4">
				{#each certifications as item (item.label)}
					<div>
						<CardTitle class="text-base">{item.label}</CardTitle>
						<CardDescription>{item.detail}</CardDescription>
					</div>
				{/each}
			</CardContent>
		</Card>
	</div>
</section>

<section class="border-b border-border/60 bg-background py-20">
	<div class="mx-auto flex max-w-6xl flex-col gap-10 px-6 lg:flex-row">
		<div class="flex-1 space-y-4">
			<Badge variant="secondary" class="w-fit normal-case tracking-[0.3em]">Service area</Badge>
			<h2
				class="reveal text-3xl font-semibold text-[hsl(var(--foreground))] sm:text-4xl"
				use:inView
			>
				Helping landowners across Hampton Roads
			</h2>
			<p class="text-base text-[hsl(var(--muted-foreground))] sm:text-lg">
				I routinely travel across coastal Virginia and up into northeast North Carolina. If you are
				nearby and need tractor help, let’s talk.
			</p>
			<div
				class="mt-6 grid grid-cols-1 gap-3 text-sm text-[hsl(var(--muted-foreground))] sm:grid-cols-2"
			>
				{#each serviceArea as area (area)}
					<Badge variant="outline" class="gap-2 rounded-full normal-case tracking-[0.2em]">
						<span
							aria-hidden="true"
							class="inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]"
						></span>
						{area}
					</Badge>
				{/each}
			</div>
			<Button
				href={resolve('/contact')}
				variant="default"
				size="sm"
				class="mt-6 w-fit rounded-full"
			>
				Plan a visit
			</Button>
		</div>

		<Card class="flex-1 self-stretch">
			<CardHeader class="space-y-4">
				<CardTitle class="text-2xl font-semibold text-[hsl(var(--foreground))]">
					Why I keep it small
				</CardTitle>
				<CardDescription>
					Running the tractor myself means I know every pass that is made on your property. It keeps
					scheduling simple, quality high, and communication clear.
				</CardDescription>
			</CardHeader>
			<CardContent class="space-y-4 text-sm text-[hsl(var(--muted-foreground))]">
				<p>
					I pair modern equipment with a neighborly approach. You get a single point of contact,
					transparent pricing, and work delivered with care.
				</p>
				<p>
					When the job wraps up, I walk the site with you to confirm the results. If something needs
					a touch-up, I take care of it right then.
				</p>
			</CardContent>
			<CardFooter class="pt-0">
				<Separator />
				<p class="pt-4 text-xs text-[hsl(var(--muted-foreground))]">
					Curious how I can help? <Button
						href={resolve('/projects')}
						variant="link"
						class="text-[hsl(var(--accent))]">See recent projects.</Button
					>
				</p>
			</CardFooter>
		</Card>
	</div>
</section>
