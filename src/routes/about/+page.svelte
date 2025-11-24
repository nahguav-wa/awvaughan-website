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
			description: 'I show up, run the tractor, and stay until the work is finished.',
			icon: ServiceIcon
		},
		{
			title: 'Local roots',
			description: 'Hampton Roads soils and weather shape every plan I share with you.',
			icon: CoastalIcon
		},
		{
			title: 'Respectful communication',
			description:
				'I keep you updated, answer questions quickly, and treat your property with care.',
			icon: LeadershipIcon
		}
	];

	const steps = [
		{
			title: 'Walk the property',
			description: 'We review the site together and note access points for the tractor and trailer.'
		},
		{
			title: 'Outline the plan',
			description: 'I follow up with a simple quote that lists the work, equipment, and timing.'
		},
		{
			title: 'Do the work right',
			description: 'I arrive on time, complete the work, and walk the site with you before leaving.'
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
	heading="A neighbor with a tractor and a clear plan"
	description="I am Alex Vaughan. I grew up in Hampton Roads and keep the work personal, simple, and tidy."
/>

<section class="border-border/60 section-spacing border-b bg-background">
	<div class="content-container stack-spacing">
		<div class="max-w-3xl space-y-5 sm:space-y-4">
			<Badge variant="secondary" class="w-fit text-xs font-semibold">What matters</Badge>
			<h2
				class="reveal text-3xl font-semibold text-[hsl(var(--foreground))] sm:text-4xl"
				use:inView
			>
				How I approach every job
			</h2>
			<p class="text-base text-[hsl(var(--muted-foreground))] sm:text-lg">
				Clear quotes, careful work, and direct communication keep each visit easy to follow.
			</p>
		</div>

		<div class="grid gap-6 md:grid-cols-3 md:gap-8">
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

<section class="border-border/60 section-spacing border-b bg-muted/40">
	<div class="content-container grid gap-10 lg:grid-cols-[1fr_340px]">
		<div class="stack-spacing">
			<div class="space-y-5 sm:space-y-4">
				<Badge variant="secondary" class="w-fit text-xs font-semibold">How it works</Badge>
				<h2
					class="reveal text-3xl font-semibold text-[hsl(var(--foreground))] sm:text-4xl"
					use:inView
				>
					Straightforward steps from call to cleanup
				</h2>
				<p class="text-base text-[hsl(var(--muted-foreground))] sm:text-lg">
					We walk the site, agree on a plan, and I handle the work without surprises.
				</p>
			</div>

			<div class="grid gap-4 md:grid-cols-3 md:gap-6">
				{#each steps as step, index (step.title)}
					<Card class="h-full">
						<CardHeader class="space-y-3">
							<Badge
								variant="accent"
								class="w-fit rounded-full px-3 py-1 text-[0.7rem] font-semibold"
							>
								Step {index + 1}
							</Badge>
							<CardTitle class="text-lg font-semibold">{step.title}</CardTitle>
							<CardDescription>{step.description}</CardDescription>
						</CardHeader>
					</Card>
				{/each}
			</div>
		</div>

		<Card class="h-full">
			<CardHeader class="space-y-3">
				<Badge variant="secondary" class="w-fit text-xs font-semibold">What you can count on</Badge>
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

<section class="border-border/60 section-spacing border-b bg-background">
	<div class="content-container flex flex-col gap-10 lg:flex-row">
		<div class="flex-1 space-y-5 sm:space-y-4">
			<Badge variant="secondary" class="w-fit text-xs font-semibold">Service area</Badge>
			<h2
				class="reveal text-3xl font-semibold text-[hsl(var(--foreground))] sm:text-4xl"
				use:inView
			>
				Helping landowners across Hampton Roads
			</h2>
			<p class="text-base text-[hsl(var(--muted-foreground))] sm:text-lg">
				I travel across coastal Virginia and into northeast North Carolina. If you are close by, I
				can help.
			</p>
			<div
				class="mt-6 grid grid-cols-1 gap-3 text-sm text-[hsl(var(--muted-foreground))] sm:grid-cols-2"
			>
				{#each serviceArea as area (area)}
					<Badge variant="outline" class="gap-2 rounded-full px-3 py-1 text-xs font-semibold">
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
					Running the tractor myself keeps scheduling simple, quality consistent, and communication
					clear.
				</CardDescription>
			</CardHeader>
			<CardContent class="space-y-4 text-sm text-[hsl(var(--muted-foreground))]">
				<p>You get one point of contact, straightforward pricing, and work delivered with care.</p>
				<p>
					I walk the site with you before packing up so we can make any quick touch-ups together.
				</p>
			</CardContent>
			<CardFooter class="pt-0">
				<Separator />
				<p class="pt-4 text-xs text-[hsl(var(--muted-foreground))]">
					Curious how I can help? <Button
						href={resolve('/services')}
						variant="link"
						class="text-[hsl(var(--accent))]">Explore available services.</Button
					>
				</p>
			</CardFooter>
		</Card>
	</div>
</section>
