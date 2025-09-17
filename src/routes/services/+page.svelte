<script lang="ts">
        import { resolve } from '$app/paths';
        import { seoHead } from '$lib/seo';
        import EmergencyIcon from '$lib/components/icons/EmergencyIcon.svelte';
        import ExcavatorIcon from '$lib/components/icons/ExcavatorIcon.svelte';
        import MaintenanceIcon from '$lib/components/icons/MaintenanceIcon.svelte';
        import WaterIcon from '$lib/components/icons/WaterIcon.svelte';
        import type { ComponentType } from 'svelte';

        let { data } = $props();
        const head = $derived(seoHead(data?.seo));

        const offerings: readonly {
                title: string;
                description: string;
                icon: ComponentType;
                image: string;
                alt: string;
                items: readonly string[];
        }[] = [
                {
                        title: 'Sitework & earthwork',
                        description:
                                'Grading, excavation, and structural prep that set the foundation for residential and commercial improvements across Hampton Roads.',
                        icon: ExcavatorIcon,
                        image:
                                'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80',
                        alt: 'Excavator grading soil at dusk.',
                        items: [
                                'Cut/fill balancing for new builds, additions, and amenities',
                                'Fine grading for slabs, driveways, and hardscape crews',
                                'Structural fill placement, compaction, and haul off'
                        ]
                },
                {
                        title: 'Drainage & utilities',
                        description:
                                'Coastal-ready drainage, erosion control, and light utility tie-ins that keep properties dry and accessible.',
                        icon: WaterIcon,
                        image:
                                'https://images.unsplash.com/photo-1514474959185-1472dbf27c9d?auto=format&fit=crop&w=1600&q=80',
                        alt: 'Crew installing underground drainage pipe.',
                        items: [
                                'French drains, swales, and erosion control installations',
                                'Downspout tie-ins, stormwater repairs, and culvert resets',
                                'Trenching and backfill for light utility upgrades'
                        ]
                },
                {
                        title: 'Property maintenance',
                        description:
                                'Recurring care for neighborhoods, campuses, and commercial spaces tailored to Virginia Beach’s climate.',
                        icon: MaintenanceIcon,
                        image:
                                'https://images.unsplash.com/photo-1523419409543-0c1df022bdd7?auto=format&fit=crop&w=1600&q=80',
                        alt: 'Grounds team caring for community landscaping.',
                        items: [
                                'Seasonal mowing, edging, and landscape cleanups',
                                'Parking lot sweeping, debris removal, and disposal',
                                'Light carpentry, fencing, and amenity upkeep'
                        ]
                },
                {
                        title: 'Responsive support',
                        description:
                                'On-call crews ready when storms or surprises threaten schedules, safety, or accessibility.',
                        icon: EmergencyIcon,
                        image:
                                'https://images.unsplash.com/photo-1521208914987-0a2f4e1f3d9e?auto=format&fit=crop&w=1600&q=80',
                        alt: 'Team clearing debris after a storm.',
                        items: [
                                'Storm cleanup and washout mitigation',
                                'Emergency board-ups and site safety repairs',
                                'Weekend and after-hours mobilization when needed'
                        ]
                }
        ] as const;
</script>

{@render head()}

<section class="border-b border-[var(--border-soft)] bg-[var(--surface-muted)] py-20">
        <div class="mx-auto max-w-5xl space-y-6 px-6">
                <p class="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--brand-blue)]">Services</p>
                <h1 class="text-4xl font-semibold text-[var(--text-dark)] sm:text-5xl">
                        Comprehensive care for your job sites and communities
                </h1>
                <p class="text-base text-[var(--text-muted)] sm:text-lg">
                        AW Vaughan Company delivers sitework, drainage, and property maintenance services for clients throughout Virginia Beach, Norfolk,
                        Chesapeake, and the surrounding Hampton Roads region. We tailor each scope to your timeline and budget while maintaining the
                        level of detail you expect from an owner-led crew.
                </p>
        </div>
</section>

<section class="border-b border-[var(--border-soft)] bg-[var(--surface-base)] py-16">
        <div class="mx-auto max-w-6xl px-6">
                <div class="grid gap-8 md:grid-cols-2">
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
                                                <div class="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/35"></div>
                                        </div>
                                        <div class="flex flex-1 flex-col gap-4 p-6">
                                                <span
                                                        class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand-blue-soft)] text-[var(--brand-blue)]"
                                                >
                                                        <svelte:component this={offering.icon} class="h-6 w-6" />
                                                </span>
                                                <h2 class="text-2xl font-semibold text-[var(--text-dark)]">{offering.title}</h2>
                                                <p class="text-sm leading-relaxed text-[var(--text-muted)]">{offering.description}</p>
                                                <ul class="mt-4 space-y-3 text-sm leading-relaxed text-[var(--text-muted)]">
                                                        {#each offering.items as item (item)}
                                                                <li class="flex items-start gap-2">
                                                                        <span aria-hidden="true" class="mt-1 inline-flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--brand-orange)]"></span>
                                                                        <span>{item}</span>
                                                                </li>
                                                        {/each}
                                                </ul>
                                                <div class="mt-auto pt-4">
                                                        <a
                                                                href={resolve('/contact')}
                                                                class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--brand-blue)] transition hover:text-[var(--brand-orange)]"
                                                        >
                                                                Request a proposal
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
                <div class="rounded-4xl border border-white/20 bg-white/5 p-10 text-center shadow-[var(--brand-blue)]/30 shadow-2xl">
                        <h2 class="text-3xl font-semibold sm:text-4xl">Ready for your next project?</h2>
                        <p class="mt-4 text-base text-white/80 sm:text-lg">
                                Let us know what you need—whether it’s breaking ground on a new build or keeping established properties looking their best. We’ll
                                put together a plan that respects your schedule and budget.
                        </p>
                        <div class="mt-8 flex flex-col items-center justify-center gap-4 text-sm text-white/80 sm:flex-row sm:text-base">
                                <div class="inline-flex items-center gap-2">
                                        <span class="h-2 w-2 rounded-full bg-[var(--brand-orange)]" aria-hidden="true"></span>
                                        Virginia Beach, Virginia
                                </div>
                                <span class="hidden h-4 w-px bg-white/30 sm:inline" aria-hidden="true"></span>
                                <a class="inline-flex items-center gap-2 transition hover:text-white" href="mailto:alex.vaughan@awvaughan.com">
                                        <span class="h-2 w-2 rounded-full bg-[var(--brand-orange)]" aria-hidden="true"></span>
                                        alex.vaughan@awvaughan.com
                                </a>
                                <span class="hidden h-4 w-px bg-white/30 sm:inline" aria-hidden="true"></span>
                                <a class="inline-flex items-center gap-2 transition hover:text-white" href="tel:+17574021100">
                                        <span class="h-2 w-2 rounded-full bg-[var(--brand-orange)]" aria-hidden="true"></span>
                                        (757) 402-1100
                                </a>
                        </div>
                        <div class="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                                <a
                                        href={resolve('/contact')}
                                        class="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-orange)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--text-dark)] shadow-[var(--brand-orange)]/30 shadow-lg transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-white sm:text-base"
                                >
                                        Start a conversation
                                </a>
                                <a
                                        href="tel:+17574021100"
                                        class="inline-flex items-center justify-center gap-2 rounded-full border border-white/60 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-white transition hover:border-white hover:bg-white/20 sm:text-base"
                                >
                                        Call (757) 402-1100
                                </a>
                        </div>
                </div>
        </div>
</section>
