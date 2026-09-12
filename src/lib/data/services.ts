/**
 * Services Data
 * Service offerings for The A.W. Vaughan Company
 *
 * Single source of truth for the service pages, the services listing, the
 * homepage grid and the sitemap. Adding a service here creates its page at
 * /services/<slug> and adds it everywhere it should appear.
 *
 * Target keywords per service are documented in docs/keyword-strategy.md rather
 * than held here: they inform the copy, but nothing in the app renders them.
 */

import type { Service, ServiceDetail } from '$lib/types';

/**
 * Full content for each service page.
 */
export const serviceDetails: ServiceDetail[] = [
	{
		slug: 'gravel-driveway-repair',
		title: 'Gravel Driveway Repair & Restoration',
		description:
			'Gravel driveway repair in Williamsburg, VA and across the Historic Triangle. We restore proper crown, fill potholes, stop washout, and get water running off the driveway instead of standing in it.',
		heading: 'Gravel Driveway Repair in Williamsburg, VA',
		intro:
			'Crown restoration, pothole repair, and regrading for gravel driveways in Williamsburg, Toano, Yorktown, and out through New Kent, West Point, Gloucester and Saluda.',
		problem: {
			heading: 'Is Your Gravel Driveway Holding Water?',
			paragraphs: [
				'Gravel driveways fail in a predictable order. The crown flattens, water stops running to the edges and starts standing in the wheel tracks, the base softens, and then every vehicle that drives over it pushes a rut deeper. Once the ruts are established a hard rain will wash the stone straight down the slope.',
				'Adding a load of gravel on top does not fix it — it just gives the next storm more to move. We regrade the driveway to a proper center-high crown first, so the surface sheds water, and then place stone where it will actually stay. On long rural drives around New Kent and West Point that usually means addressing the ditch line at the same time, because a driveway can only drain as well as the ground beside it.'
			]
		},
		image: {
			name: 'work-example-2',
			alt: 'Gravel driveway regraded to a proper crown on a Williamsburg-area property',
			width: 900,
			height: 1125
		},
		offeringsHeading: 'Our Driveway Repair Services',
		offerings: [
			{
				title: 'Crown Restoration',
				description:
					'We rebuild the center-high profile that makes a gravel driveway work, so rain runs to the shoulders within minutes instead of sitting in the middle for days.'
			},
			{
				title: 'Pothole Filling & Grading',
				description:
					'Potholes get cut out and filled with properly graded stone, then the whole surface is regraded — patching alone leaves the low spot that made the hole in the first place.'
			},
			{
				title: 'Washout Repair & Prevention',
				description:
					'We repair washed-out sections and fix the drainage that caused them, which on sloped drives around Toano and Norge usually means restoring the shoulder and the ditch alongside it.'
			},
			{
				title: 'New Gravel & Edge Definition',
				description:
					'Fresh stone where the base needs it and clean, defined edges that keep gravel on the driveway and out of the lawn.'
			}
		],
		cta: {
			heading: 'Get Your Driveway Fixed Right',
			body: 'Free assessment of your gravel driveway, anywhere from Williamsburg to the Middle Peninsula.'
		},
		schemaDescription:
			'Gravel driveway repair including crown restoration, pothole filling, washout repair, and regrading in Williamsburg, Toano, Yorktown, West Point, Gloucester and Saluda, Virginia.',
		seo: {
			title: 'Gravel Driveway Repair Williamsburg VA | The A.W. Vaughan Company',
			description:
				'Gravel driveway repair in Williamsburg, VA. Crown restoration, pothole filling, washout repair, and driveway grading in Toano, Yorktown, West Point, Gloucester and Saluda. Call 757-402-1100.',
			ogTitle: 'Gravel Driveway Repair in Williamsburg, VA | The A.W. Vaughan Company',
			ogDescription:
				'Crown restoration, pothole repair, and regrading for gravel driveways across the Historic Triangle and Middle Peninsula.',
			ogImageAlt: 'Gravel driveway repair in Williamsburg, VA - The A.W. Vaughan Company'
		}
	},
	{
		slug: 'drainage-solutions',
		title: 'Drainage Solutions & Grading',
		description:
			'Drainage solutions for Williamsburg, Yorktown, Gloucester and the Middle Peninsula. We fix standing water, cut swales and ditches, install French drains and culverts, and grade sites so water leaves.',
		heading: 'Drainage Solutions in Williamsburg & the Middle Peninsula',
		intro:
			'Standing water, soggy yards, and washed-out driveways solved with drainage built for the ground it sits in — clay, sand, or flat low-lying lot.',
		problem: {
			heading: 'Standing Water Damaging Your Property?',
			paragraphs: [
				'Drainage problems in this part of Virginia are mostly a soil problem. Williamsburg, Yorktown and much of James City County sit on heavy clay that holds water for days after a storm. The Toano and Norge corridor runs to sand, which drains fast but washes badly. Gloucester, West Point and Saluda are flat and low, so there is often nowhere obvious for the water to go. Each of those needs a different answer.',
				'We walk the property, find where the water is actually coming from and where it can legally and practically be sent, and then build the system that fits — a graded swale, a French drain, a culvert under the drive, or simply regrading so the ground falls away from the house instead of toward it.'
			]
		},
		image: {
			name: 'work-example-3',
			alt: 'Drainage swale cut to carry water away from a driveway on a Middle Peninsula property',
			width: 710,
			height: 1125
		},
		offeringsHeading: 'Our Drainage Services',
		offerings: [
			{
				title: 'Swale & Ditch Repair',
				description:
					'We cut and restore swales and roadside ditches to carry water away from your driveway and buildings — the single most effective fix on most rural properties here.'
			},
			{
				title: 'French Drain Systems',
				description:
					'Subsurface French drains collect groundwater and move it out, which is what persistent wet spots in Williamsburg-area clay usually need.'
			},
			{
				title: 'Culvert Installation & Repair',
				description:
					'New culverts and repairs to crushed or silted-in existing ones, so water keeps moving under driveways and farm access roads instead of backing up behind them.'
			},
			{
				title: 'Site Grading & Erosion Control',
				description:
					'Regrading that pushes water away from foundations, outbuildings, and driveways, and stabilizes the slopes that keep eroding after every storm.'
			}
		],
		cta: {
			heading: 'Solve Your Drainage Problems',
			body: 'Free drainage assessment across Williamsburg, the Historic Triangle, and the Middle Peninsula.'
		},
		schemaDescription:
			'Drainage solutions including French drains, swale and ditch repair, culvert installation, and site grading in Williamsburg, Yorktown, West Point, Gloucester and Saluda, Virginia.',
		seo: {
			title: 'Drainage Solutions Williamsburg VA | Yard & Driveway Drainage',
			description:
				'Drainage contractor in Williamsburg, VA. French drains, swale and ditch repair, culvert installation, and grading to stop standing water in Yorktown, Gloucester, West Point and Saluda. Call 757-402-1100.',
			ogTitle: 'Drainage Solutions & Grading | The A.W. Vaughan Company',
			ogDescription:
				'Stop standing water. Drainage built for Williamsburg clay, Toano sand, and low-lying Middle Peninsula ground.',
			ogImageAlt: 'Drainage solutions in Williamsburg, VA - The A.W. Vaughan Company'
		}
	},
	{
		slug: 'shed-pad-preparation',
		title: 'Shed Pad & Foundation Preparation',
		description:
			'Shed pad preparation in Williamsburg, VA and the surrounding Historic Triangle. Level, compacted, well-draining gravel pads ready for delivery day, for sheds, garages, and small outbuildings.',
		heading: 'Shed Pad Preparation in Williamsburg, VA',
		intro:
			'Level, compacted gravel pads built and ready before your shed arrives — in Williamsburg, Toano, Yorktown, New Kent, West Point, Gloucester and Saluda.',
		problem: {
			heading: 'Getting a Shed Delivered?',
			paragraphs: [
				'Most shed problems are pad problems. A shed set on ground that is not level will rack within a season — doors bind, windows stop closing square, and the floor frame twists. A shed set on ground that holds water rots from the bottom up, which happens fast on Williamsburg clay where water sits against the skids after every rain.',
				'We build the pad before delivery day: cleared, cut to level, graded so water runs away from the structure, and topped with compacted stone that will not settle under the load. Tell us the footprint and the delivery date and we will have it ready.'
			]
		},
		image: {
			name: 'work-example-4',
			alt: 'Level compacted gravel shed pad prepared on a Williamsburg-area property',
			width: 675,
			height: 844
		},
		offeringsHeading: 'Our Preparation Process',
		offerings: [
			{
				title: 'Site Clearing & Leveling',
				description:
					'Vegetation, stumps, and debris cleared, then the site cut to level — including the sloped back-lot corners where sheds usually end up.'
			},
			{
				title: 'Drainage Grading',
				description:
					'The pad is graded so water sheds away from the structure rather than pooling against the skids, which is what rots a shed floor from below.'
			},
			{
				title: 'Gravel Base Installation',
				description:
					'The right stone at the right depth for the load, with a defined edge so the pad holds its shape instead of spreading out over time.'
			},
			{
				title: 'Compaction & Final Prep',
				description:
					'Mechanically compacted in lifts so the pad is solid on delivery day and stays level once the building is loaded.'
			}
		],
		cta: {
			heading: 'Ready to Prepare Your Site?',
			body: 'Free site assessment and quote across Williamsburg, the Historic Triangle, and the Middle Peninsula. Give us your delivery date and we will work to it.'
		},
		schemaDescription:
			'Shed pad preparation including site clearing, leveling, gravel base installation, and compaction in Williamsburg, Toano, Yorktown, West Point, Gloucester and Saluda, Virginia.',
		seo: {
			title: 'Shed Pad Preparation Williamsburg VA | The A.W. Vaughan Company',
			description:
				'Shed pad and foundation preparation in Williamsburg, VA. Level, compacted, well-draining gravel pads for sheds and outbuildings in Toano, Yorktown, West Point, Gloucester and Saluda. Call 757-402-1100.',
			ogTitle: 'Shed Pad & Foundation Preparation | The A.W. Vaughan Company',
			ogDescription:
				'Level, compacted, well-draining shed pads built before delivery day across the Historic Triangle and Middle Peninsula.',
			ogImageAlt: 'Shed pad preparation in Williamsburg, VA - The A.W. Vaughan Company'
		}
	},
	{
		slug: 'excavation',
		title: 'Small Excavation & Site Work',
		description:
			'Small excavation contractor serving Williamsburg, New Kent, West Point, Gloucester and Saluda. Culverts, trenching, lot clearing, and rural access road work — the jobs big contractors turn down.',
		heading: 'Small Excavation & Site Work in Williamsburg, VA',
		intro:
			'Culverts, trenching, lot clearing, and rural property maintenance across the Historic Triangle and the Middle Peninsula. No job too small.',
		problem: {
			heading: 'The Right-Sized Excavation Contractor',
			paragraphs: [
				'Most excavation outfits are set up for subdivisions and commercial pads. A half-day culvert replacement or a few hundred feet of trench does not fit their schedule, so rural property owners around New Kent, West Point and Gloucester often cannot get anyone to return the call.',
				'That is the work we are built for. We bring equipment sized for residential lots and wooded rural parcels — the kind that can get down a narrow farm lane without tearing up what is already there — and we show up for the small jobs.'
			]
		},
		image: {
			name: 'work-example-2',
			alt: 'Small excavation and site work on a rural property near West Point, Virginia',
			width: 900,
			height: 1125
		},
		offeringsHeading: 'Our Excavation Services',
		offerings: [
			{
				title: 'Small Lot Clearing & Grading',
				description:
					'Clearing and grading residential lots and wooded parcels for building, fencing, pasture, or simply getting a property usable again.'
			},
			{
				title: 'Trenching for Utilities',
				description:
					'Trenching for water lines, electrical conduit, drainage pipe, and irrigation, backfilled and restored properly.'
			},
			{
				title: 'Culvert Repair & Installation',
				description:
					'Crushed, silted, or undersized culverts replaced so the driveway entrance stops flooding — common on the older rural drives out toward Saluda and Urbanna.'
			},
			{
				title: 'Rural Property Maintenance',
				description:
					'Access road grading, ditch clearing, and general site work that keeps a rural property passable year round, including through mud season.'
			}
		],
		cta: {
			heading: 'Need Excavation Work Done?',
			body: 'Free consultation and quote from Williamsburg out through West Point, Gloucester and Saluda. If it is small and nobody else will take it, call us.'
		},
		schemaDescription:
			'Small excavation services including lot clearing, trenching, culvert repair, and rural property maintenance in Williamsburg, New Kent, West Point, Gloucester and Saluda, Virginia.',
		seo: {
			title: 'Small Excavation Contractor Williamsburg VA | Site Work & Culverts',
			description:
				'Small excavation contractor in Williamsburg, VA. Lot clearing, trenching, culvert repair, and rural property maintenance in New Kent, West Point, Gloucester and Saluda. Call 757-402-1100.',
			ogTitle: 'Small Excavation & Site Work | The A.W. Vaughan Company',
			ogDescription:
				'Lot clearing, trenching, culverts, and rural access road work across the Historic Triangle and Middle Peninsula.',
			ogImageAlt: 'Small excavation and site work in Williamsburg, VA - The A.W. Vaughan Company'
		}
	}
];

/**
 * Look up one service page by its URL slug.
 */
export function getServiceBySlug(slug: string): ServiceDetail | undefined {
	return serviceDetails.find((service) => service.slug === slug);
}

/**
 * Card view of the services, for the homepage grid and the services listing.
 */
export const services: Service[] = serviceDetails.map(({ title, description, slug }) => ({
	title,
	description,
	href: `/services/${slug}`
}));
