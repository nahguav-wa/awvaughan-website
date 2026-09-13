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
 * The company previously offered gravel driveway repair, drainage solutions,
 * shed pads and small excavation. Those services were retired in favour of land
 * management; their URLs are 301'd in `_redirects` at the project root, and a
 * test asserts every redirect still points at a route that exists.
 */

import type { Service, ServiceDetail } from '$lib/types';

/**
 * Full content for each service page.
 */
export const serviceDetails: ServiceDetail[] = [
	{
		slug: 'land-clearing',
		title: 'Land Clearing',
		description:
			'Land clearing in Williamsburg, VA and across the Historic Triangle. Brush, saplings, trees and stumps taken off building lots, pasture, and overgrown parcels, then graded back to usable ground.',
		heading: 'Land Clearing in Williamsburg, VA',
		intro:
			'Building lots, reclaimed pasture, fence lines, and parcels that have grown up — cleared and left as ground you can actually use.',
		problem: {
			heading: 'Reclaiming Ground That Has Grown Up',
			paragraphs: [
				'Land goes back to woods quickly in this part of Virginia. A field that misses a couple of seasons fills with sweetgum, pine and cedar whips; give it ten years and it is a thicket you cannot walk through, let alone build on. The same thing creeps in from the edges of a yard, swallowing a few feet of lawn a year until the wood line is at the back door.',
				'There are two honest ways to take it back, and they suit different jobs. Full mechanical clearing pulls the stumps and roots and leaves you bare, gradeable dirt — that is what you want before building, running a driveway, seeding pasture, or putting in a septic field. Forestry mulching grinds everything down in place and leaves the root mat intact, which is faster and gentler on the ground but is not a building surface. We will tell you which one your project actually needs rather than selling you the more expensive one.'
			]
		},
		image: {
			name: 'about-image',
			alt: 'Cleared field meeting the wood line on a rural property near Williamsburg, Virginia',
			width: 844,
			height: 1125
		},
		offeringsHeading: 'Our Land Clearing Services',
		offerings: [
			{
				title: 'Lot & Building Site Clearing',
				description:
					'Full clearing for a house site, shop, barn, driveway route, or septic field — trees down, stumps out, and the site left gradeable.'
			},
			{
				title: 'Pasture & Field Reclamation',
				description:
					'Taking a field back from the saplings and briars that have claimed it, so it can be mowed, fenced, and grazed again.'
			},
			{
				title: 'Stump Removal & Grubbing',
				description:
					'Stumps and root balls pulled rather than ground flush, for sites where anything left in the ground will cause problems later.'
			},
			{
				title: 'Debris Handling & Final Grade',
				description:
					'Material chipped, piled, burned where permitted, or hauled — then the site graded so water leaves it. Clearing changes how a parcel drains, and that is not an afterthought for us.'
			}
		],
		cta: {
			heading: 'Ready to Clear Your Property?',
			body: 'Free walk-through and quote across Williamsburg, the Historic Triangle, and the Middle Peninsula.'
		},
		schemaDescription:
			'Land clearing including building site clearing, pasture reclamation, stump removal and grubbing, and final grading in Williamsburg, Toano, Yorktown, West Point, Gloucester and Saluda, Virginia.',
		seo: {
			title: 'Land Clearing Williamsburg VA | The A.W. Vaughan Company',
			description:
				'Land clearing in Williamsburg, VA. Building site clearing, pasture reclamation, stump removal, and grading in Toano, Yorktown, New Kent, West Point, Gloucester and Saluda. Call 757-402-1100.',
			ogTitle: 'Land Clearing in Williamsburg, VA | The A.W. Vaughan Company',
			ogDescription:
				'Building lots, pasture reclamation, and overgrown parcels cleared across the Historic Triangle and Middle Peninsula.',
			ogImageAlt: 'Land clearing in Williamsburg, VA - The A.W. Vaughan Company'
		}
	},
	{
		slug: 'bush-hogging',
		title: 'Bush Hogging',
		description:
			'Bush hogging and field mowing in Williamsburg, VA and the Middle Peninsula. Overgrown fields, pasture, vacant lots, hunting land and right-of-way cut back in a single pass.',
		heading: 'Bush Hogging in Williamsburg & the Middle Peninsula',
		intro:
			'Overgrown fields, pasture, vacant lots and hunting land cut back — once to reclaim it, or on a schedule so it never gets away from you again.',
		problem: {
			heading: 'Field Gone to Seed?',
			paragraphs: [
				'A rotary cutter is the right tool for grass, weeds, briars and saplings up to roughly two inches through. That covers most fields that have sat a season or two, most vacant lots, and most hunting land between seasons. Past about two inches the cutter starts fighting the material instead of cutting it, and the job becomes forestry mulching — we will say so up front rather than beating up your property and our equipment to avoid quoting the other service.',
				'What bush hogging really buys you is that the field stays a field. Cut once or twice a season and the woody stuff never gets established; skip three years and you are paying for clearing instead of mowing. It also pushes back the ticks and snakes that thrive in waist-high cover, and it keeps you clear of county nuisance and vegetation ordinances on a lot you are holding.'
			]
		},
		image: {
			name: 'work-example-4',
			alt: 'Field cut back around a utility pedestal, with the uncut brush line still standing behind it',
			width: 675,
			height: 844
		},
		offeringsHeading: 'Our Bush Hogging Services',
		offerings: [
			{
				title: 'Overgrown Field & Pasture Mowing',
				description:
					'First-cut work on fields that have gone up, and routine cutting to keep pasture and hay ground clean.'
			},
			{
				title: 'Vacant Lot & Right-of-Way Cutting',
				description:
					'Lots being held, road frontage, easements and utility corridors kept cut and presentable.'
			},
			{
				title: 'Hunting Land & Food Plot Maintenance',
				description:
					'Shooting lanes, plot edges, and access lanes cut back ahead of the season on properties out toward New Kent, West Point and King and Queen.'
			},
			{
				title: 'Scheduled Seasonal Cutting',
				description:
					'Put the property on a schedule and we come when it needs it, which costs less over a year than reclaiming it every third spring.'
			}
		],
		cta: {
			heading: 'Get Your Field Cut',
			body: 'Free quote on one-time or seasonal cutting anywhere from Williamsburg to the Middle Peninsula.'
		},
		schemaDescription:
			'Bush hogging and rotary mowing for overgrown fields, pasture, vacant lots, right-of-way and hunting land in Williamsburg, Toano, Yorktown, West Point, Gloucester and Saluda, Virginia.',
		seo: {
			title: 'Bush Hogging Williamsburg VA | Field & Pasture Mowing',
			description:
				'Bush hogging in Williamsburg, VA. Overgrown fields, pasture, vacant lots, right-of-way and hunting land cut back in Toano, Yorktown, New Kent, West Point, Gloucester and Saluda. Call 757-402-1100.',
			ogTitle: 'Bush Hogging & Field Mowing | The A.W. Vaughan Company',
			ogDescription:
				'Overgrown fields, pasture and hunting land cut back across the Historic Triangle and Middle Peninsula.',
			ogImageAlt: 'Bush hogging and field mowing in Williamsburg, VA - The A.W. Vaughan Company'
		}
	},
	{
		slug: 'forestry-mulching',
		title: 'Forestry Mulching',
		description:
			'Forestry mulching in Williamsburg, VA and the Middle Peninsula. Standing brush and small trees ground in place into a mulch mat — no burn piles, no hauling, no torn-up ground.',
		heading: 'Forestry Mulching in Williamsburg, VA',
		intro:
			'Underbrush, invasives, fence lines and view corridors cleared in a single pass, with the material left on the ground instead of in a burn pile.',
		problem: {
			heading: 'Clearing Without the Cleanup',
			paragraphs: [
				'A mulching head grinds standing brush and small trees where they stand and lays the material down as a mulch mat. That removes the three worst parts of conventional clearing in one go: no burn piles and no permit to sit with, no trucking debris off the property, and no field of stump holes to fill afterwards. Because the machine works off the surface rather than digging, the ground comes through largely undisturbed.',
				'The mat that gets left behind is doing real work, not just sitting there. It holds soil on slopes through a hard rain, suppresses the seed bank that would otherwise come straight back, and breaks down into the ground over a couple of seasons. On the sandy ground around Toano and Norge, where bare cleared soil washes badly, that mat is often worth more than the clearing itself. Honest limits: this is sized for stems up to roughly eight inches, anything bigger comes out another way, and since the roots stay in the ground it is not a substitute for grubbing a building site.'
			]
		},
		offeringsHeading: 'Our Forestry Mulching Services',
		offerings: [
			{
				title: 'Underbrush & Understory Clearing',
				description:
					'Clearing the tangle beneath mature hardwoods while leaving the trees you want — the fastest way to make woods walkable again.'
			},
			{
				title: 'Invasive Species Knockdown',
				description:
					'Privet, autumn olive, wisteria, tree-of-heaven and Bradford pear taken down hard. Mulching alone will not kill the roots, so we will be straight with you about follow-up treatment.'
			},
			{
				title: 'Fence & Property Line Clearing',
				description:
					'Grown-in fence lines, survey lines and easements opened back up so a fence can be run, repaired, or simply seen.'
			},
			{
				title: 'Selective Clearing & View Lines',
				description:
					'Opening a view to the water or the field, thinning without clear-cutting, and cutting light into ground you want to plant.'
			}
		],
		cta: {
			heading: 'Clear It Without the Burn Pile',
			body: 'Free assessment across Williamsburg, the Historic Triangle, and the Middle Peninsula.'
		},
		schemaDescription:
			'Forestry mulching including underbrush clearing, invasive species removal, fence line clearing and selective view-line clearing in Williamsburg, Toano, Yorktown, West Point, Gloucester and Saluda, Virginia.',
		seo: {
			title: 'Forestry Mulching Williamsburg VA | The A.W. Vaughan Company',
			description:
				'Forestry mulching in Williamsburg, VA. Underbrush, invasives, fence lines and view corridors cleared in place with no burn piles, in Toano, Yorktown, West Point, Gloucester and Saluda. Call 757-402-1100.',
			ogTitle: 'Forestry Mulching in Williamsburg, VA | The A.W. Vaughan Company',
			ogDescription:
				'Brush and small trees ground in place — no burn piles, no hauling, no stump holes. Across the Historic Triangle and Middle Peninsula.',
			ogImageAlt: 'Forestry mulching in Williamsburg, VA - The A.W. Vaughan Company'
		}
	},
	{
		slug: 'trail-systems',
		title: 'Trail Systems',
		description:
			'Trail cutting and maintenance in Williamsburg, VA and the Middle Peninsula. ATV, walking and hunting trails laid out to shed water, cut, and kept open — plus crossings at the wet spots.',
		heading: 'Trail Systems & Recreational Access',
		intro:
			'ATV and UTV trails, walking and riding trails, hunting access and firebreaks — routed to drain, cut clean, and maintained so they stay open.',
		problem: {
			heading: 'A Trail Is Only as Good as Its Drainage',
			paragraphs: [
				'Almost every failed trail we are called out to fix failed the same way. It was cut straight up the slope, so the first hard rain used it as a channel, and by the third it was a rutted gully that is harder to walk than the woods beside it. A trail is a small piece of earthwork, and the route has to be chosen for where water will go long before anyone thinks about where the view is.',
				'This is the part of the old business we brought with us. We came up doing driveway grading and drainage, and the same rules apply at trail scale: cross the slope rather than run down it, outslope the tread so water sheds off instead of collecting, break long runs with water bars, and put a real crossing at the wet spot rather than hoping it dries out. Get that right at layout and the trail needs a cut once a year instead of a rebuild every spring.'
			]
		},
		offeringsHeading: 'Our Trail Services',
		offerings: [
			{
				title: 'Trail Layout & Routing',
				description:
					'We walk the property with you and lay the route to the ground — grade, drainage, and the places worth getting to.'
			},
			{
				title: 'Trail Cutting & Mulching',
				description:
					'The corridor cleared and mulched to the width you want, from a foot trail to something a side-by-side or a tractor can use.'
			},
			{
				title: 'Crossings, Culverts & Water Bars',
				description:
					'Wet crossings, ditch lines and low spots built properly, so the trail survives the weather instead of being defined by it.'
			},
			{
				title: 'Trail Maintenance & Reopening',
				description:
					'Existing trails brushed back, re-cut, and repaired — including ones that have been closed in for years.'
			}
		],
		cta: {
			heading: 'Open Up Your Property',
			body: 'Free walk-through and quote on new trails or reopening old ones, anywhere across the Historic Triangle and Middle Peninsula.'
		},
		schemaDescription:
			'Trail system layout, cutting, drainage crossings and maintenance for ATV, walking, riding and hunting trails in Williamsburg, Toano, Yorktown, West Point, Gloucester and Saluda, Virginia.',
		seo: {
			title: 'Trail Systems Williamsburg VA | ATV & Hunting Trail Cutting',
			description:
				'Trail cutting and maintenance in Williamsburg, VA. ATV, walking and hunting trails routed to drain properly, with crossings and water bars, in New Kent, West Point, Gloucester and Saluda. Call 757-402-1100.',
			ogTitle: 'Trail Systems & Recreational Access | The A.W. Vaughan Company',
			ogDescription:
				'ATV, walking and hunting trails laid out to shed water, cut clean, and kept open across the Historic Triangle and Middle Peninsula.',
			ogImageAlt:
				'Trail cutting and recreational access in Williamsburg, VA - The A.W. Vaughan Company'
		}
	},
	{
		slug: 'property-maintenance',
		title: 'Property Maintenance',
		description:
			'Grass cutting, lawn maintenance and general property upkeep in Williamsburg, VA. Larger residential lots, rural property and acreage kept mown, trimmed and presentable year round.',
		heading: 'Property Maintenance in Williamsburg, VA',
		intro:
			'Grass cutting, lawn maintenance and the general upkeep that keeps a larger lot or a rural property looking like somebody is on top of it.',
		problem: {
			heading: 'Keeping a Property Looking Kept',
			paragraphs: [
				'This is the finish side of what we do, and it is a different job from bush hogging. A rotary cutter is for ground that has got away from you — a field, a lot gone to briars. This is mown grass, trimmed edges, and a property that looks maintained week to week. Both are mowing; they are not the same work and they do not take the same equipment.',
				'Bigger lots out here fall through a gap. They are too much ground and too far out for a lawn company working a tight suburban route, and too fine for the rough-cutting crowd. So the grass gets cut and everything else gets left: around the shed and the well head, along the fence, at the culvert ends, behind the propane tank, and the wood line quietly taking a foot of yard a year. We already have the equipment out on these properties for the heavier work, which is what makes the acre-to-five-acre places worth doing properly.'
			]
		},
		image: {
			name: 'work-example-2',
			alt: 'Mown grounds around an outbuilding on a property near Williamsburg, Virginia',
			width: 900,
			height: 1125
		},
		offeringsHeading: 'Our Property Maintenance Services',
		offerings: [
			{
				title: 'Grass Cutting & Lawn Maintenance',
				description:
					'Regular mowing on larger residential lots, rural property and acreage, on a schedule that matches how fast it actually grows rather than a fixed suburban route.'
			},
			{
				title: 'Trimming & Edging',
				description:
					'The places a mower cannot reach and most crews skip — around outbuildings, fence lines and posts, well heads, culvert ends, propane tanks and utility pedestals.'
			},
			{
				title: 'Wood Line & Yard Edge Upkeep',
				description:
					'Keeping the tree line where it is. Left alone it takes a foot or two of yard a year, and reclaiming it later costs far more than holding it does.'
			},
			{
				title: 'Seasonal & Absentee Property Care',
				description:
					'Rental, hunting, weekend and inherited property kept presentable for owners who are not there to see it — including one-time cleanups before a visit or a sale.'
			}
		],
		cta: {
			heading: 'Keep It Looking Kept',
			body: 'Free quote on a one-time cleanup or regular maintenance, across Williamsburg, the Historic Triangle, and the Middle Peninsula.'
		},
		schemaDescription:
			'Property maintenance including grass cutting, lawn maintenance, trimming and edging, wood line upkeep and seasonal property care in Williamsburg, Toano, Yorktown, West Point, Gloucester and Saluda, Virginia.',
		seo: {
			title: 'Property Maintenance Williamsburg VA | Lawn & Grass Cutting',
			description:
				'Grass cutting, lawn maintenance and property upkeep in Williamsburg, VA. Larger residential lots, rural property and acreage in Toano, Yorktown, New Kent, West Point, Gloucester and Saluda. Call 757-402-1100.',
			ogTitle: 'Property Maintenance & Lawn Care | The A.W. Vaughan Company',
			ogDescription:
				'Grass cutting, trimming and general upkeep for larger lots and rural property across the Historic Triangle and Middle Peninsula.',
			ogImageAlt:
				'Property maintenance and lawn care in Williamsburg, VA - The A.W. Vaughan Company'
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
