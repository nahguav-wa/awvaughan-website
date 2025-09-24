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
                                'Bush hogging for large yards, horse pastures, roadside frontage, and utility easements. I keep growth knocked down and sight lines clear.',
                        icon: ExcavatorIcon,
                        image:
                                'https://images.unsplash.com/photo-1597106658448-9f62510953f8?auto=format&fit=crop&w=1600&q=80',
                        alt: 'Compact tractor mowing tall grass beside a fence line.',
                        items: [
                                'One-time knockdowns or seasonal maintenance for 1+ acre properties',
                                'Fence line trimming and edge pass cleanups',
                                'Pasture clipping to promote healthy regrowth'
                        ]
                },
                {
                        title: 'Brush, limb & debris cleanup',
                        description:
                                'Storms and projects leave piles behind. I can cut, load, and haul brush, small trees, and yard debris so you can enjoy your land again.',
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
                                'Refresh gravel drives, correct low spots, and restore drainage. My box blade, land plane, and rake attachments leave a smooth finish.',
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
                                'Need a load of gravel delivered with the work, or have an awkward project that requires a tractor and trailer? I can help.',
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
        heading="Small tractor work that keeps your property in shape"
        description="From bush hogging to driveway touchups, each job is handled start to finish by owner-operator Alex Vaughan. Serving Virginia Beach, Chesapeake, Norfolk, Suffolk, and nearby communities."
        backgroundImage={{
                src: 'https://images.unsplash.com/photo-1596588801060-5d56586eca12?auto=format&fit=crop&w=1600&q=80',
                srcset:
                        'https://images.unsplash.com/photo-1596588801060-5d56586eca12?auto=format&fit=crop&w=640&q=70 640w, https://images.unsplash.com/photo-1596588801060-5d56586eca12?auto=format&fit=crop&w=1024&q=75 1024w, https://images.unsplash.com/photo-1596588801060-5d56586eca12?auto=format&fit=crop&w=1600&q=80 1600w',
                sizes: '(min-width: 1024px) 100vw, 100vw',
                alt: 'Compact tractor mowing a large grassy property at sunset.'
        }}
/>

<section class="border-b border-[var(--border-soft)] bg-[var(--surface-base)] py-16">
	<div class="mx-auto max-w-6xl px-6">
		<div class="max-w-3xl space-y-4">
                        <p class="text-xs font-semibold tracking-[0.35em] text-[var(--brand-blue)] uppercase">
                                What I can help with
                        </p>
                        <h2 class="reveal text-3xl font-semibold text-[var(--text-dark)] sm:text-4xl" use:inView>
                                Practical services for acreage homes and small farms
                        </h2>
                        <p class="text-base text-[var(--text-muted)] sm:text-lg">
                                Mix and match the support you need. I am happy to walk the property, explain the plan, and put
                                together a clear quote before getting to work.
                        </p>
		</div>

		<div class="mt-12 grid gap-8 md:grid-cols-2">
			{#each offerings as offering (offering.title)}
				<article
					class="group flex h-full flex-col overflow-hidden rounded-4xl border border-[var(--border-soft)] bg-[var(--surface-base)] shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
				>
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
					<div class="flex flex-1 flex-col gap-4 p-6">
						<span
							class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand-blue-soft)] text-[var(--brand-blue)]"
						>
							<svelte:component this={offering.icon} class="h-6 w-6" />
						</span>
						<h3 class="text-2xl font-semibold text-[var(--text-dark)]">{offering.title}</h3>
						<p class="text-sm leading-relaxed text-[var(--text-muted)]">{offering.description}</p>
						<ul class="mt-4 space-y-3 text-sm leading-relaxed text-[var(--text-muted)]">
							{#each offering.items as item (item)}
								<li class="flex items-start gap-2">
									<span
										aria-hidden="true"
										class="mt-1 inline-flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--brand-orange)]"
									></span>
									<span>{item}</span>
								</li>
							{/each}
						</ul>
						<div class="mt-auto pt-4">
							<a
								href={resolve('/contact')}
								class="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[var(--brand-blue)] uppercase transition hover:text-[var(--brand-orange)]"
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
							</a>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<section class="bg-[var(--brand-blue)] py-20 text-white">
	<div class="mx-auto max-w-5xl px-6">
		<div
			class="rounded-4xl border border-white/20 bg-white/5 p-10 text-center shadow-[var(--brand-blue)]/30 shadow-2xl"
		>
                        <h2 class="reveal text-3xl font-semibold sm:text-4xl" use:inView>
                                Need an extra set of hands and a tractor?
                        </h2>
                        <p class="mt-4 text-base text-white/80 sm:text-lg">
                                Call, text, or email what you are facing. I will share honest feedback, photos from similar
                                jobs, and a plan that fits your property and budget.
                        </p>
			<div
				class="mt-8 flex flex-col items-center justify-center gap-4 text-sm text-white/80 sm:flex-row sm:text-base"
			>
				<div class="inline-flex items-center gap-2">
					<span class="h-2 w-2 rounded-full bg-[var(--brand-orange)]" aria-hidden="true"></span>
					Virginia Beach, Virginia
				</div>
				<span class="hidden h-4 w-px bg-white/30 sm:inline" aria-hidden="true"></span>
				<a
					class="inline-flex items-center gap-2 transition hover:text-white"
					href="mailto:alex.vaughan@awvaughan.com"
				>
					<span class="h-2 w-2 rounded-full bg-[var(--brand-orange)]" aria-hidden="true"></span>
					alex.vaughan@awvaughan.com
				</a>
				<span class="hidden h-4 w-px bg-white/30 sm:inline" aria-hidden="true"></span>
				<a
					class="inline-flex items-center gap-2 transition hover:text-white"
					href="tel:+17574021100"
				>
					<span class="h-2 w-2 rounded-full bg-[var(--brand-orange)]" aria-hidden="true"></span>
					(757) 402-1100
				</a>
			</div>
			<div class="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
				<a
					href={resolve('/contact')}
					class="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-orange)] px-6 py-3 text-sm font-semibold tracking-[0.28em] text-[var(--text-dark)] uppercase shadow-[var(--brand-orange)]/30 shadow-lg transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-white sm:text-base"
				>
					Start a conversation
				</a>
				<a
					href="tel:+17574021100"
					class="inline-flex items-center justify-center gap-2 rounded-full border border-white/60 bg-white/10 px-6 py-3 text-sm font-semibold tracking-[0.28em] text-white uppercase transition hover:border-white hover:bg-white/20 sm:text-base"
				>
					Call (757) 402-1100
				</a>
			</div>
		</div>
	</div>
</section>
