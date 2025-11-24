<script lang="ts">
	import { resolve } from '$app/paths';
	import { PageHero } from '$lib';
	import { inView } from '$lib/actions/in-view';
	import { getLinkKey, getMetaKey } from '$lib/seo';
	import EmergencyIcon from '$lib/components/icons/EmergencyIcon.svelte';
	import ExcavatorIcon from '$lib/components/icons/ExcavatorIcon.svelte';
	import MaintenanceIcon from '$lib/components/icons/MaintenanceIcon.svelte';
	import WaterIcon from '$lib/components/icons/WaterIcon.svelte';
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

	const offerings: readonly {
		title: string;
		description: string;
		icon: ComponentType;
		image: string;
		alt: string;
		items: readonly string[];
	}[] = [
		{
			title: 'Field & pasture mowing',
			description:
				'Bush hogging for large yards, pastures, roadside frontage, and easements to keep growth down.',
			icon: ExcavatorIcon,
			image:
				'https://images.unsplash.com/photo-1597106658448-9f62510953f8?auto=format&fit=crop&w=1600&q=80',
			alt: 'Compact tractor mowing tall grass beside a fence line.',
			items: [
				'One-time knockdowns or seasonal passes for larger properties',
				'Fence line trimming and clean edge passes',
				'Pasture clipping for healthier regrowth'
			]
		},
		{
			title: 'Brush, limb & debris cleanup',
			description:
				'Cutting, loading, and hauling brush, small trees, and debris after storms or projects.',
			icon: MaintenanceIcon,
			image:
				'https://images.unsplash.com/photo-1520854221050-0f4caff449fb?auto=format&fit=crop&w=1600&q=80',
			alt: 'Utility trailer filled with limbs ready for disposal.',
			items: [
				'Storm and hurricane debris clearing',
				'Brush pile removal and disposal',
				'Trail and fenceline reopening'
			]
		},
		{
			title: 'Driveway & light grading',
			description:
				'Refreshing gravel drives, smoothing low spots, and shaping drainage with compact equipment.',
			icon: WaterIcon,
			image:
				'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=1600&q=80',
			alt: 'Tractor grading a gravel driveway.',
			items: [
				'Driveway regrading and pothole repair',
				'Shaping ditches and shallow swales',
				'Light dirt work and final grading for sheds or patios'
			]
		},
		{
			title: 'Hauling & odd jobs',
			description:
				'Material delivery, small demolition, and custom tractor projects paired with the right trailer.',
			icon: EmergencyIcon,
			image:
				'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
			alt: 'Truck and trailer hauling materials down a rural road.',
			items: [
				'Material delivery paired with installation',
				'Small demolition and cleanup',
				'Custom tractor projects—let’s talk through your idea'
			]
		}
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
	eyebrow="Services"
	align="center"
	heading="Practical tractor work for homes and small farms"
	description="Owner-operator service for mowing, cleanup, and light grading around Hampton Roads."
/>

<section class="border-border/60 section-spacing border-b bg-background">
	<div class="content-container stack-spacing">
		<div class="max-w-3xl space-y-5 sm:space-y-4">
			<Badge variant="secondary" class="w-fit text-xs font-semibold">What I can help with</Badge>
			<h2
				class="reveal text-3xl font-semibold text-[hsl(var(--foreground))] sm:text-4xl"
				use:inView
			>
				Services built to keep land simple to maintain
			</h2>
			<p class="text-base text-[hsl(var(--muted-foreground))] sm:text-lg">
				We will walk the property, agree on a plan, and keep the work list short and clear.
			</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2 md:gap-8">
			{#each offerings as offering (offering.title)}
				{@const Icon = offering.icon}
				<Card class="group flex h-full flex-col overflow-hidden">
					<div class="relative h-48 overflow-hidden">
						<img
							src={offering.image}
							alt={offering.alt}
							class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
						/>
						<div
							class="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/35"
						></div>
					</div>
					<CardHeader class="flex flex-1 flex-col gap-4">
						<span
							class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]"
						>
							<Icon class="h-6 w-6" />
						</span>
						<CardTitle class="reveal text-2xl">
							<span use:inView class="block">{offering.title}</span>
						</CardTitle>
						<CardDescription>{offering.description}</CardDescription>
					</CardHeader>
					<CardContent class="pt-0">
						<ul class="space-y-3 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
							{#each offering.items as item (item)}
								<li class="flex items-start gap-2">
									<span
										aria-hidden="true"
										class="mt-1 inline-flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[hsl(var(--accent))]"
									></span>
									<span>{item}</span>
								</li>
							{/each}
						</ul>
					</CardContent>
					<CardFooter class="pt-0">
						<Button
							href={resolve('/contact')}
							variant="link"
							class="gap-2 text-[hsl(var(--primary))]"
						>
							Request a quote
							<svg
								class="h-3 w-3"
								viewBox="0 0 16 16"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
							>
								<path d="M3 8h10" />
								<path d="M9 4l4 4-4 4" />
							</svg>
						</Button>
					</CardFooter>
				</Card>
			{/each}
		</div>

		<Separator />

		<Card class="bg-muted/60">
			<CardHeader class="space-y-3 text-center">
				<CardTitle class="text-2xl text-[hsl(var(--foreground))]">
					Not seeing what you need?
				</CardTitle>
				<CardDescription>
					I can quote custom tractor work, hauling, or seasonal maintenance. If it needs a compact
					tractor, let’s talk.
				</CardDescription>
			</CardHeader>
			<CardFooter class="justify-center gap-4 pt-0">
				<Button href={resolve('/contact')} variant="default" size="sm" class="rounded-full">
					Start a conversation
				</Button>
				<Button href={resolve('/about')} variant="ghost" size="sm" class="rounded-full">
					Learn about the company
				</Button>
			</CardFooter>
		</Card>
	</div>
</section>
