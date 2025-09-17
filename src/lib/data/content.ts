import type { SeoImage } from '$lib/seo';

export type ContentType = 'blog' | 'project';

export type ContentEntry = {
        slug: string;
        type: ContentType;
        title: string;
        description: string;
        summary: string;
        published: string;
        body: readonly string[];
        image?: SeoImage;
};

const projects = [
        {
                slug: 'coastal-resort-stormwater-rehab',
                type: 'project',
                title: 'Coastal resort stormwater rehab',
                description:
                        'Stabilized dunes, regraded parking courts, and reset drainage in 72 hours so the resort could reopen ahead of the weekend.',
                summary:
                        'When a nor’easter flooded the oceanfront resort, our crew mobilized overnight to rebuild protective dunes, regrade parking courts, and reset drainage structures before guests returned.',
                published: '2024-03-18',
                body: [
                        'A late-winter storm pushed sand and seawater across the resort’s access drives and plaza. Within hours we mobilized operators, loaders, and trucking support to remove debris, import clean sand, and rebuild protective dunes with geotextile reinforcement.',
                        'We then laser-graded the parking courts and plaza hardscapes, adjusting slopes to direct runoff toward existing structures. Our team reset catch basins, jet-cleaned laterals, and added riprap energy dissipation where wave action was scouring pavements.',
                        'The site reopened to guests in three days with fresh striping, stabilized dune plantings, and documentation packets for the resort’s facilities manager and insurance partners.'
                ],
                image: {
                        src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80',
                        alt: 'Stormwater crew restoring a beachfront property.',
                        width: 1600,
                        height: 1067
                }
        },
        {
                slug: 'logistics-yard-expansion',
                type: 'project',
                title: 'Logistics yard expansion',
                description:
                        'Cut/fill balancing, aggregate surfacing, and lighting trenching completed under an accelerated schedule for a regional carrier.',
                summary:
                        'A transportation client needed additional laydown space before peak season. We balanced material onsite, improved drainage, and coordinated electrical trenching so light poles and security systems were online at turnover.',
                published: '2024-06-07',
                body: [
                        'Working within an active distribution hub required split shifts and tight coordination. Our grading plan minimized haul-off by blending onsite soils and structural fill while maintaining positive drainage toward existing swales.',
                        'We trenched and backfilled conduit for lighting upgrades, coordinated inspections, and installed aggregate surfacing compacted to spec. The crew also added guardrail and signage to separate truck circulation from employee parking.',
                        'The expanded yard delivered two weeks ahead of schedule, giving the carrier breathing room for incoming fleet purchases and seasonal inventory surges.'
                ],
                image: {
                        src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
                        alt: 'Industrial site graded and compacted for expansion.',
                        width: 1600,
                        height: 1067
                }
        }
] satisfies readonly ContentEntry[];

const blogPosts = [
        {
                slug: 'storm-response-checklist-for-coastal-hoas',
                type: 'blog',
                title: 'Storm response checklist for coastal HOAs',
                description:
                        'A practical checklist Hampton Roads community managers can use to document damage, stage repairs, and communicate with residents after severe weather.',
                summary:
                        'When heavy rain or tidal flooding hits, community managers need a reliable plan. This guide outlines the first 48 hours of response so boards and residents stay informed.',
                published: '2024-04-29',
                body: [
                        'Start with safety—mark washouts, downed lines, and slippery walkways so residents and maintenance crews avoid hazards. Photograph affected areas before moving debris to support insurance claims and reserve studies.',
                        'Notify residents with clear timelines and expectations. Share when crews will arrive, what areas are temporarily closed, and who to contact with urgent needs. Consistent updates build confidence even when repairs take time.',
                        'Coordinate with trusted contractors ahead of storm season so you have standby pricing and scopes. Having a partner who already understands your community layout accelerates mobilization when minutes matter.'
                ],
                image: {
                        src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80',
                        alt: 'Maintenance team clearing storm debris from a neighborhood street.',
                        width: 1600,
                        height: 1067
                }
        },
        {
                slug: 'planning-utility-repairs-with-minimal-downtime',
                type: 'blog',
                title: 'Planning utility repairs with minimal downtime',
                description:
                        'Tips for facility managers coordinating drainage or utility repairs while keeping tenants, guests, or production schedules on track.',
                summary:
                        'Utility outages can disrupt entire campuses. We share how staging materials, sequencing crews, and communicating with stakeholders reduces disruption.',
                published: '2024-08-15',
                body: [
                        'Walk the site with your contractor to map access, staging, and tie-in locations. Identifying conflict points early allows you to shift parking, deliveries, or pedestrian routes before crews arrive.',
                        'Request a phasing plan that spells out night and weekend work options. Even small schedule adjustments—like starting trenching after closing hours—can eliminate the need for temporary shutdowns.',
                        'Plan for restoration the moment excavation begins. Stockpile matching soils or surface materials and capture punch list photos so final conditions meet tenant expectations.'
                ],
                image: {
                        src: 'https://images.unsplash.com/photo-1556760544-74068565f05c?auto=format&fit=crop&w=1600&q=80',
                        alt: 'Crew installing new drainage infrastructure beside an active facility.',
                        width: 1600,
                        height: 1067
                }
        }
] satisfies readonly ContentEntry[];

export const contentEntries = [...projects, ...blogPosts] satisfies readonly ContentEntry[];

export const findContentBySlug = (slug: string) => contentEntries.find((entry) => entry.slug === slug);
