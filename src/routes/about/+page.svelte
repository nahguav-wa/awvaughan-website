<script lang="ts">
        import { resolve } from '$app/paths';
        import { createSeo, getLinkKey, getMetaKey } from '$lib/seo';
        import CoastalIcon from '$lib/components/icons/CoastalIcon.svelte';
        import LeadershipIcon from '$lib/components/icons/LeadershipIcon.svelte';
        import ServiceIcon from '$lib/components/icons/ServiceIcon.svelte';
        import type { ComponentType } from 'svelte';

        const seo = createSeo({
                title: 'About AW Vaughan Company | Virginia Beach Sitework Contractors',
                description:
                        'Learn how AW Vaughan Company delivers Garney-level civil services with a local, owner-led team serving Virginia Beach and Hampton Roads.',
                path: '/about'
        });

        const values: readonly {
                title: string;
                description: string;
                icon: ComponentType;
        }[] = [
                {
                        title: 'Grounded in service',
                        description:
                                'Clients count on us for steady communication and reliable crews. We show up prepared, keep jobsites tidy, and deliver when we say we will.',
                        icon: ServiceIcon
                },
                {
                        title: 'Coastal expertise',
                        description:
                                'From sandy soils to salt-laden air, Hampton Roads presents unique challenges. We tailor solutions and materials that stand up to local conditions.',
                        icon: CoastalIcon
                },
                {
                        title: 'Hands-on leadership',
                        description:
                                'Owner Alex Vaughan stays engaged from estimate through closeout so every detail reflects our standards and your expectations.',
                        icon: LeadershipIcon
                }
        ];

        const steps = [
                {
                        title: 'Walk the site',
                        description:
                                'We meet with you in person to understand the scope, inspect site conditions, and review scheduling needs or access constraints.'
                },
                {
                        title: 'Plan the work',
                        description:
                                'You receive a clear proposal outlining crew size, equipment, and timeline so you know what to expect before we mobilize.'
                },
                {
                        title: 'Deliver consistently',
                        description:
                                'Our team executes safely and efficiently, communicating updates along the way and leaving the site ready for the next trade.'
                }
        ] as const;

        const certifications = [
                { label: 'Virginia Class A Contractor', detail: 'License #2705181906' },
                { label: 'SWaM-certified small business', detail: 'Commonwealth of Virginia' },
                { label: 'OSHA 30 & CPR trained crews', detail: 'Jobsite safety is our baseline' }
        ] as const;

        const serviceArea = [
                'Virginia Beach',
                'Norfolk',
                'Chesapeake',
                'Portsmouth',
                'Suffolk',
                'Greater Hampton Roads'
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

<section class="border-b border-[var(--border-soft)] bg-[var(--surface-muted)] py-20">
        <div class="mx-auto max-w-5xl space-y-6 px-6">
                <p class="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--brand-blue)]">About us</p>
                <h1 class="text-4xl font-semibold text-[var(--text-dark)] sm:text-5xl">Built on service, grounded in integrity</h1>
                <p class="text-base text-[var(--text-muted)] sm:text-lg">
                        AW Vaughan Company is a Virginia Beach–based sitework and property maintenance contractor. We partner with builders,
                        HOAs, and facility managers to keep projects moving and properties looking their best throughout Hampton Roads.
                </p>
                <p class="text-base text-[var(--text-muted)] sm:text-lg">
                        We bring the Garney-inspired focus on safety, planning, and documentation—paired with the flexibility and direct
                        communication of a small, owner-led crew.
                </p>
        </div>
</section>

<section class="border-b border-[var(--border-soft)] bg-[var(--surface-base)] py-16">
        <div class="mx-auto max-w-6xl px-6">
                <div class="grid gap-8 md:grid-cols-3">
                        {#each values as value (value.title)}
                                <article
                                        class="rounded-3xl border border-[var(--border-soft)] bg-[var(--surface-soft)] p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                                >
                                        <span
                                                class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand-blue-soft)] text-[var(--brand-blue)]"
                                        >
                                                <svelte:component this={value.icon} class="h-6 w-6" />
                                        </span>
                                        <h2 class="mt-6 text-xl font-semibold text-[var(--text-dark)]">{value.title}</h2>
                                        <p class="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{value.description}</p>
                                </article>
                        {/each}
                </div>
        </div>
</section>

<section class="border-b border-[var(--border-soft)] bg-[var(--surface-muted)] py-20">
        <div class="mx-auto max-w-6xl px-6">
                <div class="flex flex-col gap-10 lg:flex-row lg:items-center">
                        <div class="flex-1 space-y-4">
                                <p class="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--brand-blue)]">
                                        Our process
                                </p>
                                <h2 class="text-3xl font-semibold text-[var(--text-dark)] sm:text-4xl">What to expect when you call us</h2>
                                <p class="text-base text-[var(--text-muted)] sm:text-lg">
                                        Every project starts with a conversation. We listen first, align on expectations, and communicate throughout the job so
                                        there are no surprises along the way.
                                </p>
                        </div>
                        <div class="rounded-3xl border border-[var(--border-soft)] bg-[var(--surface-base)] p-6 shadow-sm lg:w-80">
                                <p class="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--brand-orange)]">Credentials</p>
                                <ul class="mt-4 space-y-3 text-sm text-[var(--text-muted)]">
                                        {#each certifications as item (item.label)}
                                                <li>
                                                        <p class="font-semibold text-[var(--text-dark)]">{item.label}</p>
                                                        <p>{item.detail}</p>
                                                </li>
                                        {/each}
                                </ul>
                        </div>
                </div>

                <div class="mt-12 grid gap-8 md:grid-cols-3">
                        {#each steps as step, index (step.title)}
                                <article
                                        class="rounded-3xl border border-[var(--border-soft)] bg-[var(--surface-base)] p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                                >
                                        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-orange)]/15 text-sm font-semibold text-[var(--brand-orange)]">
                                                {index + 1}
                                        </div>
                                        <h3 class="mt-4 text-lg font-semibold text-[var(--text-dark)]">{step.title}</h3>
                                        <p class="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{step.description}</p>
                                </article>
                        {/each}
                </div>
        </div>
</section>

<section class="border-b border-[var(--border-soft)] bg-[var(--surface-base)] py-20">
        <div class="mx-auto flex max-w-6xl flex-col gap-10 px-6 lg:flex-row">
                <div class="flex-1 space-y-4">
                        <p class="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--brand-blue)]">Service area</p>
                        <h2 class="text-3xl font-semibold text-[var(--text-dark)] sm:text-4xl">Proud to serve Hampton Roads</h2>
                        <p class="text-base text-[var(--text-muted)] sm:text-lg">
                                From the Oceanfront to inland logistics hubs, we support properties across the region with responsive maintenance and civil
                                crews.
                        </p>
                        <ul class="mt-6 grid grid-cols-1 gap-3 text-sm text-[var(--text-muted)] sm:grid-cols-2">
                                {#each serviceArea as area (area)}
                                        <li class="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] px-4 py-2">
                                                <span aria-hidden="true" class="inline-flex h-1.5 w-1.5 rounded-full bg-[var(--brand-orange)]"></span>
                                                {area}
                                        </li>
                                {/each}
                        </ul>
                </div>
                <div class="flex-1 rounded-3xl border border-[var(--border-soft)] bg-[var(--surface-soft)] p-6 shadow-sm">
                        <svg viewBox="0 0 320 200" class="h-full w-full" role="img" aria-labelledby="mapTitle mapDesc">
                                <title id="mapTitle">Stylized service map of Hampton Roads</title>
                                <desc id="mapDesc">Illustrative map highlighting the Hampton Roads region where AW Vaughan Company works.</desc>
                                <defs>
                                        <linearGradient id="gradient" x1="0" x2="1" y1="1" y2="0">
                                                <stop offset="0" stop-color="var(--brand-blue)" />
                                                <stop offset="1" stop-color="var(--brand-orange)" />
                                        </linearGradient>
                                </defs>
                                <path
                                        d="M40 140 C80 60, 160 40, 240 70 C280 90, 300 120, 260 150 C220 180, 140 190, 80 170 Z"
                                        fill="url(#gradient)"
                                        stroke="rgba(39,37,31,0.15)"
                                        stroke-width="3"
                                />
                                <g fill="var(--brand-orange)">
                                        <circle cx="120" cy="120" r="6" />
                                        <circle cx="200" cy="110" r="6" />
                                        <circle cx="170" cy="150" r="6" />
                                </g>
                                <g fill="white" font-size="12" font-weight="600">
                                        <text x="110" y="115">VB</text>
                                        <text x="192" y="105">NOR</text>
                                        <text x="160" y="145">CHS</text>
                                </g>
                        </svg>
                </div>
        </div>
</section>

<section class="bg-[var(--brand-blue)] py-20 text-white">
        <div class="mx-auto max-w-4xl rounded-4xl border border-white/20 bg-white/5 px-6 py-12 text-center shadow-[var(--brand-blue)]/30 shadow-2xl">
                <p class="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">Ready when you are</p>
                <h2 class="mt-4 text-3xl font-semibold sm:text-4xl">Let’s plan your next project</h2>
                <p class="mt-3 text-base text-white/80 sm:text-lg">
                        Share your scope, maintenance needs, or emergency request. We’ll respond quickly with the information you need to move forward.
                </p>
                <div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <a
                                href={resolve('/services')}
                                class="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-orange)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--text-dark)] shadow-[var(--brand-orange)]/30 shadow-lg transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-white"
                        >
                                Explore our services
                        </a>
                        <a
                                href={resolve('/contact')}
                                class="inline-flex items-center justify-center gap-2 rounded-full border border-white/60 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-white transition hover:border-white hover:bg-white/20"
                        >
                                Contact our team
                        </a>
                </div>
        </div>
</section>
