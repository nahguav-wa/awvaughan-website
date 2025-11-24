<script lang="ts">
	import { resolve } from '$app/paths';
	import { getLinkKey, getMetaKey } from '$lib/seo';
	import { Hero } from '$lib';
	import { inView } from '$lib/actions/in-view';
	import { featuredProjects } from '$lib/data/projects';
	import CoastalIcon from '$lib/components/icons/CoastalIcon.svelte';
	import ExcavatorIcon from '$lib/components/icons/ExcavatorIcon.svelte';
	import LeadershipIcon from '$lib/components/icons/LeadershipIcon.svelte';
	import MaintenanceIcon from '$lib/components/icons/MaintenanceIcon.svelte';
	import ServiceIcon from '$lib/components/icons/ServiceIcon.svelte';
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

	const email = 'alex.vaughan@awvaughan.com';
	const phoneLabel = '(757) 402-1100';

	const proofPoints = [
		{
			value: 'Owner-operated',
			title: 'Hands-on service',
			description:
				'You work directly with me—Alex Vaughan—from the first walk-through to the final cleanup.'
		},
		{
			value: 'Compact tractor',
			title: 'Right-sized equipment',
			description:
				'A nimble setup that fits through gates, works around trees, and leaves a tidy finish.'
		},
		{
			value: 'Flexible scheduling',
			title: 'Quick turnaround',
			description:
				'Most mowing, cleanup, and driveway touchups are completed within days of your call.'
		}
	] as const;

	type IconComponent = ComponentType;

	const services: readonly {
		title: string;
		description: string;
		icon: IconComponent;
		image: string;
		alt: string;
	}[] = [
		{
			title: 'Field & pasture mowing',
			description:
				'Bush hogging for large yards, pastures, and roadside frontage so tall grass and weeds stay under control.',
			icon: ExcavatorIcon,
			image:
				'https://images.unsplash.com/photo-1596588801060-5d56586eca12?auto=format&fit=crop&w=1200&q=80',
			alt: 'Compact tractor cutting tall grass in an open field.'
		},
		{
			title: 'Brush & limb cleanup',
			description:
				'Storm cleanups, fallen limbs, and brush piles hauled off to give your property a fresh start.',
			icon: MaintenanceIcon,
			image:
				'https://images.unsplash.com/photo-1520854221050-0f4caff449fb?auto=format&fit=crop&w=1200&q=80',
			alt: 'Trailer loaded with trimmed limbs ready for hauling.'
		},
		{
			title: 'Driveway & dirt work',
			description:
				'Light grading, driveway touchups, and drainage improvements that keep rural properties accessible.',
			icon: WaterIcon,
			image:
				'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=1200&q=80',
			alt: 'Gravel driveway being leveled with tractor attachments.'
		}
	];

	const testimonial = {
		quote:
			'Every job gets the same care I would give my own place. I walk the site with you, explain the plan, and stay until you are happy with the finish.',
		name: 'Alex Vaughan',
		role: 'Owner & operator, AW Vaughan Company'
	} as const;

	const serviceArea = [
		'Virginia Beach',
		'Chesapeake',
		'Norfolk',
		'Suffolk',
		'Isle of Wight',
		'Currituck County, NC'
	] as const;

	const valueHighlights: readonly {
		title: string;
		description: string;
		icon: IconComponent;
	}[] = [
		{
			title: 'Respect for your property',
			description:
				'I treat every acre like my own—mindful of septic fields, fences, landscaping, and neighbors.',
			icon: ServiceIcon
		},
		{
			title: 'Local know-how',
			description:
				'Coastal soils, soggy ditches, sandy drives—I live here too and know how to keep them in shape.',
			icon: CoastalIcon
		},
		{
			title: 'Clear communication',
			description:
				'Text me pictures, call with questions, and expect honest updates before, during, and after the job.',
			icon: LeadershipIcon
		}
	];
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

<Hero />

<section class="border-b border-border/60 bg-background py-20">
	<div class="mx-auto max-w-6xl space-y-14 px-6">
		<div class="max-w-3xl space-y-4">
			<Badge variant="secondary" class="w-fit normal-case tracking-[0.3em]">
				Why neighbors call me
			</Badge>
			<h2
				class="reveal text-3xl font-semibold text-[hsl(var(--foreground))] sm:text-4xl"
				use:inView
			>
				Small-business care with professional results
			</h2>
			<p class="text-base text-[hsl(var(--muted-foreground))] sm:text-lg">
				Here is what you can expect when you invite me onto your property. No large crews—just
				dependable service from the person who owns the equipment.
			</p>
		</div>

		<div class="grid gap-6 md:grid-cols-3">
			{#each proofPoints as point (point.title)}
				<Card class="h-full">
					<CardHeader class="space-y-2">
						<Badge variant="secondary" class="w-fit rounded-full normal-case tracking-[0.2em]">
							{point.title}
						</Badge>
						<CardTitle class="text-2xl font-bold">{point.value}</CardTitle>
						<CardDescription>{point.description}</CardDescription>
					</CardHeader>
				</Card>
			{/each}
		</div>

		<Separator class="hidden md:block" />

		<div class="grid gap-6 md:grid-cols-3">
			{#each valueHighlights as highlight (highlight.title)}
				<Card class="h-full">
					<CardHeader class="space-y-4">
						<span
							class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]"
						>
                                                <svelte:component this={highlight.icon} class="h-6 w-6" />
						</span>
						<CardTitle>{highlight.title}</CardTitle>
						<CardDescription>{highlight.description}</CardDescription>
					</CardHeader>
				</Card>
			{/each}
		</div>
	</div>
</section>

<section id="services" class="border-b border-border/60 bg-muted/40 py-20">
	<div class="mx-auto max-w-6xl space-y-12 px-6">
		<div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
			<div class="max-w-3xl space-y-4">
				<Badge variant="secondary" class="w-fit normal-case tracking-[0.3em]">
					Tractor services
				</Badge>
				<h2
					class="reveal text-3xl font-semibold text-[hsl(var(--foreground))] sm:text-4xl"
					use:inView
				>
					Practical help for large residential properties
				</h2>
				<p class="text-base text-[hsl(var(--muted-foreground))] sm:text-lg">
					Whether you just bought land or need a seasonal tune-up, I bring dependable equipment and
					a careful approach to every visit.
				</p>
			</div>
			<Button
				href={resolve('/services')}
				variant="outline"
				size="sm"
				class="self-start rounded-full"
			>
				See everything I offer
			</Button>
		</div>

		<div class="grid gap-8 md:grid-cols-3">
			{#each services as service (service.title)}
				<Card class="group flex h-full flex-col overflow-hidden">
					<div class="relative h-48 overflow-hidden">
						<img
							src={service.image}
							alt={service.alt}
							class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
						/>
						<div
							class="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40"
						></div>
					</div>
					<CardHeader class="flex flex-1 flex-col gap-4">
						<span
							class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]"
						>
                                                <svelte:component this={service.icon} class="h-6 w-6" />
						</span>
						<CardTitle>{service.title}</CardTitle>
						<CardDescription>{service.description}</CardDescription>
					</CardHeader>
					<CardFooter class="pt-0">
						<Button
							href={resolve('/services')}
							variant="link"
							class="gap-2 text-[hsl(var(--primary))]"
						>
							Explore more
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
	</div>
</section>

<section id="projects" class="border-b border-border/60 bg-background py-20">
	<div class="mx-auto max-w-6xl space-y-12 px-6">
		<div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
			<div class="max-w-3xl space-y-4">
				<Badge variant="secondary" class="w-fit normal-case tracking-[0.3em]">Recent jobs</Badge>
				<h2
					class="reveal text-3xl font-semibold text-[hsl(var(--foreground))] sm:text-4xl"
					use:inView
				>
					A look at the kind of work I handle
				</h2>
				<p class="text-base text-[hsl(var(--muted-foreground))] sm:text-lg">
					Every property is different, but these jobs show the type of mowing, cleanup, and dirt
					work I am called for most often.
				</p>
			</div>
			<Button
				href={resolve('/projects')}
				variant="default"
				size="sm"
				class="self-start rounded-full"
			>
				View more projects
			</Button>
		</div>

		<div class="grid gap-8 md:grid-cols-3">
			{#each featuredProjects as project (project.title)}
				<Card class="flex h-full flex-col overflow-hidden">
					<div class="relative h-48 overflow-hidden">
						<img
							src={project.image.src}
							alt={project.image.alt}
							class="h-full w-full object-cover transition duration-500 hover:scale-105"
						/>
						<div
							class="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40"
						></div>
					</div>
					<CardHeader class="flex flex-1 flex-col gap-4">
						<Badge variant="secondary" class="w-fit normal-case tracking-[0.3em]">
							{project.sector}
						</Badge>
						<CardTitle>{project.title}</CardTitle>
						<CardDescription>{project.summary}</CardDescription>
					</CardHeader>
					<CardFooter class="pt-0">
						<Button
							href={resolve('/contact')}
							variant="link"
							class="gap-2 text-[hsl(var(--accent))]"
						>
							Start a project
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
	</div>
</section>

<section class="border-b border-border/60 bg-muted/40 py-20">
	<div class="mx-auto max-w-5xl px-6">
		<Card>
			<CardHeader class="space-y-3">
				<Badge variant="secondary" class="w-fit normal-case tracking-[0.3em]">
					From the operator
				</Badge>
				<CardTitle class="text-2xl font-semibold sm:text-3xl">
					“{testimonial.quote}”
				</CardTitle>
				<CardDescription
					class="text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(var(--accent))]"
				>
					{testimonial.name}
				</CardDescription>
				<p class="text-sm text-[hsl(var(--muted-foreground))]">{testimonial.role}</p>
			</CardHeader>
			<CardContent class="pt-0">
				<div
					class="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]"
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
			</CardContent>
		</Card>
	</div>
</section>

<section id="contact" class="bg-[hsl(var(--primary))] py-20 text-white">
	<div class="mx-auto max-w-4xl px-6">
		<Card class="border-white/20 bg-white/5 text-white shadow-2xl shadow-[rgba(27,77,138,0.35)]">
			<CardHeader class="items-center space-y-4 text-center">
				<Badge variant="accent" class="bg-white/10 normal-case tracking-[0.3em] text-white">
					Let’s talk through your property
				</Badge>
				<CardTitle class="text-3xl sm:text-4xl">
					Ready when your land needs a little extra muscle
				</CardTitle>
				<CardDescription class="text-base text-white/80 sm:text-lg">
					Tell me what you are dealing with—overgrown fields, storm debris, rough driveways, or
					something similar. I will recommend a straightforward plan and schedule.
				</CardDescription>
			</CardHeader>
			<CardContent class="space-y-4 text-sm text-white/80 sm:text-base">
				<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
					<div class="inline-flex items-center gap-2">
						<span class="h-2 w-2 rounded-full bg-white/80" aria-hidden="true"></span>
						Virginia Beach, Virginia
					</div>
					<Separator orientation="vertical" class="hidden h-4 bg-white/30 sm:inline" />
					<a
						class="inline-flex items-center gap-2 transition hover:text-white"
						href={`mailto:${email}`}
					>
						<span class="h-2 w-2 rounded-full bg-white/80" aria-hidden="true"></span>
						{email}
					</a>
					<Separator orientation="vertical" class="hidden h-4 bg-white/30 sm:inline" />
					<a
						class="inline-flex items-center gap-2 transition hover:text-white"
						href="tel:+17574021100"
					>
						<span class="h-2 w-2 rounded-full bg-white/80" aria-hidden="true"></span>
						{phoneLabel}
					</a>
				</div>
			</CardContent>
			<CardFooter class="flex flex-col justify-center gap-4 pt-0 sm:flex-row">
				<Button
					href={resolve('/contact')}
					variant="default"
					size="lg"
					class="rounded-full bg-white text-[hsl(var(--primary))] hover:bg-white/90"
				>
					Visit the contact page
				</Button>
				<Button
					href="tel:+17574021100"
					variant="ghost"
					size="lg"
					class="rounded-full border border-white/60 bg-white/10 text-white hover:bg-white/20"
				>
					Call now
				</Button>
			</CardFooter>
		</Card>
	</div>
</section>
