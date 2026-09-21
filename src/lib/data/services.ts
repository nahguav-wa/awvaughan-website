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
 *
 * The company has offered two earlier sets of services. Gravel driveway repair,
 * drainage solutions, shed pads and small excavation were retired 2026-09-13;
 * land clearing, bush hogging, forestry mulching, trail systems and property
 * maintenance were retired 2026-09-21, when the business moved to landscape
 * maintenance and management. Every one of those URLs is 301'd in `_redirects`
 * at the project root, and a test asserts each redirect still points at a route
 * that exists.
 *
 * The five commitments in the "We Provide" list — comprehensive maintenance,
 * turf care, tree and shrub care, seasonal clean-up, and spring and fall
 * clean-up — are covered by four pages: spring and fall clean-up is the
 * seasonal clean-up page rather than a near-duplicate of it. Two pages saying
 * the same thing split their own ranking and read as filler.
 */

import type { Service, ServiceDetail } from '$lib/types';

/**
 * Full content for each service page.
 */
export const serviceDetails: ServiceDetail[] = [
	{
		slug: 'maintenance-solutions',
		title: 'Comprehensive Maintenance Solutions',
		description:
			'A single landscape maintenance program covering the whole property in Williamsburg, VA — turf, trees and shrubs, beds and seasonal work — built around a written plan, documented budgets, and monthly site inspections.',
		heading: 'Comprehensive Landscape Maintenance in Williamsburg, VA',
		intro:
			'One program covering the whole property, planned around the long-term viability of the site rather than a fixed weekly route.',
		problem: {
			heading: 'A Program, Not a Route',
			paragraphs: [
				'Your long-term property viability should be at the heart of your landscape program. That is why our full range of services starts with horticultural recommendations and a written landscape management and maintenance plan made with the life of the property in mind — what the turf, the trees and the beds will need over years, not what fits neatly into one visit.',
				'In addition to the services listed below, we prepare budgets and estimates detailing maintenance costs and recommendations, provide digital photos documenting site improvements and potential issues, and conduct quality monthly site inspections performed by senior management. That is the difference between a crew that mows and a program that is actually being managed: you can see what was done, what it cost, and what is coming.'
			]
		},
		image: {
			name: 'work-example-2',
			alt: 'Mown grounds around an outbuilding on a property near Williamsburg, Virginia',
			width: 900,
			height: 1125
		},
		offeringsHeading: 'What the Program Covers',
		offerings: [
			{
				title: 'Landscape Management Plans',
				description:
					'A written plan for the property: what gets maintained, on what schedule, and what we recommend changing — turf, trees, shrubs, beds and the seasonal work, in one document rather than five separate quotes.'
			},
			{
				title: 'Budgets, Estimates & Recommendations',
				description:
					'Maintenance costs laid out ahead of the year, with recommendations priced separately from routine work, so you can approve improvements on their own merits instead of finding them on an invoice.'
			},
			{
				title: 'Photo Documentation',
				description:
					'Digital photos recording site improvements and potential issues as we find them. An absentee owner, a board, or a manager covering several sites should not have to take our word for the condition of the grounds.'
			},
			{
				title: 'Monthly Site Inspections',
				description:
					'A quality inspection every month, walked by senior management rather than the crew that did the work. Problems get caught while they are still small — drainage, thinning turf, a declining shrub, a wood line creeping in.'
			}
		],
		cta: {
			heading: 'Ready for a Managed Landscape?',
			body: 'Free walk-through and a written maintenance plan across Williamsburg, the Historic Triangle, and the Middle Peninsula.'
		},
		schemaDescription:
			'Comprehensive landscape maintenance programs including written management plans, maintenance budgets and estimates, photo documentation, and monthly site inspections in Williamsburg, Toano, Yorktown, West Point, Gloucester and Saluda, Virginia.',
		seo: {
			title: 'Landscape Maintenance Williamsburg VA | The A.W. Vaughan Company',
			description:
				'Comprehensive landscape maintenance and management in Williamsburg, VA. Written maintenance plans, budgets, photo documentation and monthly site inspections in Toano, Yorktown, New Kent, West Point, Gloucester and Saluda. Call 757-402-1100.',
			ogTitle: 'Comprehensive Landscape Maintenance | The A.W. Vaughan Company',
			ogDescription:
				'One managed program for the whole property — planned, budgeted, documented and inspected monthly, across the Historic Triangle and Middle Peninsula.',
			ogImageAlt: 'Landscape maintenance in Williamsburg, VA - The A.W. Vaughan Company'
		}
	},
	{
		slug: 'turf-care',
		title: 'Full Service Turf Care Programs',
		description:
			'Full service turf care in Williamsburg, VA. Mowing, trimming and edging on a proper schedule, plus fertilization, weed and disease control, aeration and overseeding — managed as a season-long program.',
		heading: 'Full Service Turf Care Programs in Williamsburg, VA',
		intro:
			'Mowing, feeding, weed and disease control, aeration and overseeding — run as one season-long program instead of a cut and a bag of fertilizer.',
		problem: {
			heading: 'Cutting Grass Is Not Turf Care',
			paragraphs: [
				'Most lawns in this part of Virginia are not failing because nobody mows them. They fail because the soil has never been tested, the fertility program is a guess, the mowing height is wrong for the species, and the weeds are being pulled instead of being crowded out. Cutting is maintenance of the symptom. Turf care is management of the stand.',
				'Tidewater turf also lives a hard life. Tall fescue thins out through a humid August and has to be carried into fall; warm-season turf wants the opposite calendar. Compacted ground sheds water instead of taking it in, and thin turf is what lets crabgrass and nutsedge in during the first hot spell. A program sequenced to the season — feed, control, aerate, overseed, at the right times — is the only thing that actually changes the stand rather than the appearance of it.'
			]
		},
		image: {
			name: 'work-example-4',
			alt: 'Grass cut and trimmed close around a utility pedestal and meter post at the edge of a property near Williamsburg, Virginia',
			width: 675,
			height: 844
		},
		offeringsHeading: 'Our Turf Care Services',
		offerings: [
			{
				title: 'Mowing, Trimming & Edging',
				description:
					'Cut at the right height for the species and the season, with the edges actually done — around buildings, fence lines, well heads, culvert ends, utility pedestals and bed lines.'
			},
			{
				title: 'Fertilization & Soil Health',
				description:
					'A fertility program built on what the soil test says the ground is short of, applied on a calendar that matches the turf you have rather than a generic four-step bag program.'
			},
			{
				title: 'Weed, Insect & Disease Control',
				description:
					'Pre-emergent and targeted post-emergent control for crabgrass, nutsedge and broadleaf weeds, plus treatment for the grubs and fungal issues that show up in a Tidewater summer.'
			},
			{
				title: 'Aeration, Overseeding & Renovation',
				description:
					'Core aeration to open compacted ground, fall overseeding to thicken a stand that thinned through the heat, and full renovation where a lawn is past feeding back.'
			}
		],
		cta: {
			heading: 'Get a Turf Program Built for Your Lawn',
			body: 'Free assessment and a season-long turf plan across Williamsburg, the Historic Triangle, and the Middle Peninsula.'
		},
		schemaDescription:
			'Full service turf care programs including mowing, trimming and edging, fertilization, weed, insect and disease control, core aeration and overseeding in Williamsburg, Toano, Yorktown, West Point, Gloucester and Saluda, Virginia.',
		seo: {
			title: 'Turf Care Programs Williamsburg VA | Lawn Fertilization & Weed Control',
			description:
				'Full service turf care in Williamsburg, VA. Mowing, fertilization, weed and disease control, aeration and overseeding in Toano, Yorktown, New Kent, West Point, Gloucester and Saluda. Call 757-402-1100.',
			ogTitle: 'Full Service Turf Care Programs | The A.W. Vaughan Company',
			ogDescription:
				'Mowing, feeding, weed and disease control, aeration and overseeding — one season-long program across the Historic Triangle and Middle Peninsula.',
			ogImageAlt: 'Turf care and lawn maintenance in Williamsburg, VA - The A.W. Vaughan Company'
		}
	},
	{
		slug: 'tree-and-shrub-care',
		title: 'Tree and Shrub Care',
		description:
			'Tree and shrub care in Williamsburg, VA. Pruning done to the plant rather than to a shape, plus root-zone feeding, insect and disease management, and bed and mulch care that keeps plantings healthy.',
		heading: 'Tree and Shrub Care in Williamsburg, VA',
		intro:
			'Pruning, feeding, and pest and disease management for the plantings that take the longest to replace and the longest to recover.',
		problem: {
			heading: 'The Slowest Thing on the Property to Replace',
			paragraphs: [
				'Turf recovers in a season. A shrub bed takes years, and a specimen tree takes a generation — which is exactly why the trees and shrubs are usually the part of a property that gets the least attention until something is visibly wrong. By then the options are narrower and more expensive than they were two seasons earlier.',
				'Most of the damage we are called out to look at is not storm damage. It is a crape myrtle topped back to stubs every spring, hollies sheared into boxes until the interior is dead wood, mulch piled against trunks, and beds that have never been fed below the surface. Pruning is a horticultural decision — what the plant is, when it sets its buds, and what it is being asked to do in that spot — not a shape decision made with a hedge trimmer in February.'
			]
		},
		offeringsHeading: 'Our Tree & Shrub Services',
		offerings: [
			{
				title: 'Pruning & Structural Shaping',
				description:
					'Cut to the plant and its bloom cycle: thinning and structural work on ornamental trees, renewal pruning on overgrown shrubs, and hedges kept dense rather than sheared hollow.'
			},
			{
				title: 'Fertilization & Root Health',
				description:
					'Root-zone feeding for trees and shrubs, which are competing with turf for the same ground and rarely get anything a lawn program applies to the surface.'
			},
			{
				title: 'Insect & Disease Management',
				description:
					'Monitoring and treatment for what actually turns up here — scale, bagworms, lace bugs, borers, and the fungal problems a humid Tidewater summer brings on.'
			},
			{
				title: 'Mulching & Bed Care',
				description:
					'Beds edged, weeded and mulched to the right depth and pulled back off the trunks. Mulch volcanoes rot bark and girdle roots, and they are the most common thing we undo.'
			}
		],
		cta: {
			heading: 'Protect the Plantings You Cannot Replace Quickly',
			body: 'Free assessment of your trees, shrubs and beds across Williamsburg, the Historic Triangle, and the Middle Peninsula.'
		},
		schemaDescription:
			'Tree and shrub care including structural and renewal pruning, root-zone fertilization, insect and disease management, and bed edging and mulching in Williamsburg, Toano, Yorktown, West Point, Gloucester and Saluda, Virginia.',
		seo: {
			title: 'Tree & Shrub Care Williamsburg VA | Pruning, Feeding & Bed Care',
			description:
				'Tree and shrub care in Williamsburg, VA. Structural and renewal pruning, root-zone fertilization, insect and disease treatment, and bed mulching in Toano, Yorktown, New Kent, West Point, Gloucester and Saluda. Call 757-402-1100.',
			ogTitle: 'Tree and Shrub Care | The A.W. Vaughan Company',
			ogDescription:
				'Pruning done to the plant, root-zone feeding, pest and disease management and proper bed care across the Historic Triangle and Middle Peninsula.',
			ogImageAlt: 'Tree and shrub care in Williamsburg, VA - The A.W. Vaughan Company'
		}
	},
	{
		slug: 'seasonal-cleanup',
		title: 'Seasonal Clean-Up',
		description:
			'Spring and fall clean-up in Williamsburg, VA. Leaf removal, bed renewal, cutbacks, storm debris and winter preparation — the two clean-ups that set up the rest of the maintenance year.',
		heading: 'Spring and Fall Clean-Up in Williamsburg, VA',
		intro:
			'The two clean-ups that decide how the rest of the year goes, plus the storm and seasonal work in between.',
		problem: {
			heading: 'Two Weeks That Set Up Twelve Months',
			paragraphs: [
				'Spring and fall clean-ups are not tidying. They are the two points in the year where the property is reset, and skipping either one costs more than the clean-up would have. A fall left on the ground mats down over the turf through a wet winter and kills it in patches by March. Perennials left standing and beds left unmulched come out of winter with weeds already established and nothing holding moisture.',
				'The spring clean-up is what lets the rest of the program work: the ground is cleared, beds are cut back and re-edged, mulch goes down before the weed seed germinates, and the first fertilizer application lands on turf that can actually use it. Get these two right and the weekly visits through the season are maintenance. Skip them and every visit is catching up.'
			]
		},
		offeringsHeading: 'Our Seasonal Clean-Up Services',
		offerings: [
			{
				title: 'Spring Clean-Up',
				description:
					'Winter debris cleared, beds cut back and re-edged, perennials and ornamental grasses taken down, fresh mulch laid, and the property set up before the growing season starts on it.'
			},
			{
				title: 'Fall Clean-Up & Leaf Removal',
				description:
					'Leaves off the turf and out of the beds through the drop rather than in one pass at the end, plus cutbacks and winter bed preparation. Under a wet Tidewater winter, matted leaves kill turf outright.'
			},
			{
				title: 'Storm & Debris Clean-Up',
				description:
					'Limbs, branches and blow-down cleared after a storm, and the grounds put back in order. Coastal Virginia gets the tail of enough tropical systems that this is a routine part of the year, not an emergency.'
			},
			{
				title: 'Bed Renewal & Winter Preparation',
				description:
					'Beds re-cut and re-mulched, drainage and washouts addressed before the wet months, and plantings protected where the site exposes them.'
			}
		],
		cta: {
			heading: 'Book Your Spring or Fall Clean-Up',
			body: 'Free quote on a one-time clean-up or a full seasonal program across Williamsburg, the Historic Triangle, and the Middle Peninsula.'
		},
		schemaDescription:
			'Seasonal clean-up including spring clean-up, fall clean-up and leaf removal, storm debris clearing, bed renewal and winter preparation in Williamsburg, Toano, Yorktown, West Point, Gloucester and Saluda, Virginia.',
		seo: {
			title: 'Spring & Fall Clean-Up Williamsburg VA | Leaf Removal & Bed Renewal',
			description:
				'Spring and fall clean-up in Williamsburg, VA. Leaf removal, bed cutbacks and mulching, storm debris and winter preparation in Toano, Yorktown, New Kent, West Point, Gloucester and Saluda. Call 757-402-1100.',
			ogTitle: 'Spring & Fall Clean-Up | The A.W. Vaughan Company',
			ogDescription:
				'Leaf removal, bed renewal, cutbacks and winter preparation across the Historic Triangle and Middle Peninsula.',
			ogImageAlt:
				'Seasonal clean-up and leaf removal in Williamsburg, VA - The A.W. Vaughan Company'
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
