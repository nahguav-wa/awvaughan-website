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
			'Expert gravel driveway repair services in the Virginia Beach 757 area. We restore proper crown, fix potholes, eliminate washout problems, and ensure proper drainage for long-lasting results.',
		heading: 'Gravel Driveway Repair & Restoration',
		intro:
			'Professional gravel driveway repair services in Virginia Beach and the 757 area. We restore your driveway to proper grade and crown for long-lasting results.',
		problem: {
			heading: 'Is Your Gravel Driveway Showing Its Age?',
			paragraphs: [
				"Over time, gravel driveways develop potholes, lose their crown, and suffer from washout. These problems don't just look bad—they cause poor drainage, vehicle damage, and can worsen rapidly if left unaddressed.",
				'At The A.W. Vaughan Company, we specialize in restoring gravel driveways to their proper condition. Our approach focuses on correct grading and crown restoration, ensuring water flows off your driveway instead of pooling and causing damage.'
			]
		},
		image: {
			name: 'work-example-2',
			alt: 'Gravel driveway repair project in Virginia Beach showing restored crown and proper drainage',
			width: 900,
			height: 1125
		},
		offeringsHeading: 'Our Driveway Repair Services',
		offerings: [
			{
				title: 'Crown Restoration',
				description:
					'We restore the proper crown (center-high profile) to your driveway, ensuring water naturally flows to the edges rather than pooling in the middle.'
			},
			{
				title: 'Pothole Filling & Grading',
				description:
					'We fill potholes with properly graded gravel and regrade your driveway surface for a smooth, even driving surface that resists future damage.'
			},
			{
				title: 'Washout Repair & Prevention',
				description:
					'We repair washout damage and address the underlying drainage issues that caused it, preventing recurring problems and protecting your investment.'
			},
			{
				title: 'New Gravel & Edge Definition',
				description:
					'We add fresh gravel where needed and define clean driveway edges, giving your property a well-maintained, professional appearance.'
			}
		],
		cta: {
			heading: 'Get Your Driveway Fixed Right',
			body: 'Contact us today for a free assessment of your gravel driveway.'
		},
		schemaDescription:
			'Expert gravel driveway repair services including crown restoration, pothole filling, washout repair, and professional grading in Virginia Beach and the 757 area.',
		seo: {
			title: 'Gravel Driveway Repair & Restoration | Virginia Beach 757 | The A.W. Vaughan Company',
			description:
				'Expert gravel driveway repair in Virginia Beach and the 757 area. Crown restoration, pothole filling, washout repair, and professional driveway grading. Call 757-402-1100 for a free quote.',
			ogTitle: 'Gravel Driveway Repair & Restoration | The A.W. Vaughan Company',
			ogDescription:
				'Professional gravel driveway repair services in Virginia Beach. Crown restoration, pothole filling, and washout repair.',
			ogImageAlt: 'Gravel Driveway Repair Services - The A.W. Vaughan Company'
		}
	},
	{
		slug: 'drainage-solutions',
		title: 'Drainage Solutions & Grading',
		description:
			'Professional drainage solutions for Norfolk VA and Hampton Roads. We fix standing water issues, install swales and ditches, repair culverts, and provide expert driveway grading to prevent water damage.',
		heading: 'Drainage Solutions & Grading',
		intro:
			'Eliminate standing water and protect your property with professional drainage solutions designed for Virginia Beach soil and weather conditions.',
		problem: {
			heading: 'Standing Water Damaging Your Property?',
			paragraphs: [
				'Poor drainage is one of the most common and destructive problems for properties in the Virginia Beach area. Standing water erodes driveways, damages foundations, creates breeding grounds for mosquitoes, and turns yards into muddy messes.',
				"We design and implement drainage solutions customized for your property's specific needs. Our understanding of local soil conditions and coastal weather patterns means we build systems that work effectively year-round."
			]
		},
		image: {
			name: 'work-example-3',
			alt: 'Professional drainage solution installation in Virginia Beach property',
			width: 710,
			height: 1125
		},
		offeringsHeading: 'Our Drainage Services',
		offerings: [
			{
				title: 'Swale & Ditch Repair',
				description:
					'We install and repair swales and ditches to channel water away from your driveway, buildings, and sensitive areas of your property.'
			},
			{
				title: 'French Drain Systems',
				description:
					"Subsurface French drains collect and redirect groundwater, solving persistent wet spots and protecting your property's foundation."
			},
			{
				title: 'Culvert Installation & Repair',
				description:
					'We install new culverts and repair existing ones to ensure proper water flow under driveways and access roads.'
			},
			{
				title: 'Site Grading & Erosion Control',
				description:
					"Professional grading directs water flow away from structures and prevents erosion, protecting your property's long-term value."
			}
		],
		cta: {
			heading: 'Solve Your Drainage Problems',
			body: 'Contact us today for a free drainage assessment.'
		},
		schemaDescription:
			'Professional drainage solutions including French drains, swale repair, culvert installation, and site grading in Virginia Beach and the 757 area.',
		seo: {
			title: 'Drainage Solutions & Grading | Virginia Beach 757 | The A.W. Vaughan Company',
			description:
				'Professional drainage solutions in Virginia Beach and the 757 area. French drains, swale repair, culvert installation, and site grading to eliminate standing water. Call 757-402-1100.',
			ogTitle: 'Drainage Solutions & Grading | The A.W. Vaughan Company',
			ogDescription:
				'Professional drainage solutions and grading services in Virginia Beach. Eliminate standing water and protect your property.',
			ogImageAlt: 'Drainage Solutions - The A.W. Vaughan Company'
		}
	},
	{
		slug: 'shed-pad-preparation',
		title: 'Shed Pad & Foundation Preparation',
		description:
			'Quality shed pad preparation and foundation work in Virginia Beach. We provide precise site preparation, proper grading, and solid base construction for sheds, small buildings, and structures.',
		heading: 'Shed Pad & Foundation Preparation',
		intro:
			'Professional site preparation for sheds and small structures in Virginia Beach. We build level, stable foundations that drain properly and last for years.',
		problem: {
			heading: 'Getting a New Shed or Structure?',
			paragraphs: [
				"A proper foundation is the most important factor in your shed's longevity. Without correct site preparation, sheds settle unevenly, doors stop closing, and moisture damage sets in quickly.",
				'We prepare shed pads with precise leveling, proper drainage grading, and compacted gravel bases that provide a stable, long-lasting foundation. Our preparation ensures your shed stays level and dry for years to come.'
			]
		},
		image: {
			name: 'work-example-4',
			alt: 'Prepared shed pad with level gravel base in Virginia Beach',
			width: 675,
			height: 844
		},
		offeringsHeading: 'Our Preparation Process',
		offerings: [
			{
				title: 'Site Clearing & Leveling',
				description:
					'We clear vegetation, remove debris, and level the site to create a clean, even surface for your foundation.'
			},
			{
				title: 'Drainage Grading',
				description:
					'Proper grading ensures water flows away from your shed, preventing moisture damage and extending the life of your structure.'
			},
			{
				title: 'Gravel Base Installation',
				description:
					'We install and spread the right type and depth of gravel to create a solid, well-draining base for your structure.'
			},
			{
				title: 'Compaction & Final Prep',
				description:
					'Professional compaction ensures your base is solid and stable, preventing settling and providing a level surface for years to come.'
			}
		],
		cta: {
			heading: 'Ready to Prepare Your Site?',
			body: 'Contact us for a free site assessment and quote.'
		},
		schemaDescription:
			'Professional shed pad preparation including site clearing, leveling, gravel base installation, and compaction in Virginia Beach and the 757 area.',
		seo: {
			title: 'Shed Pad & Foundation Preparation | Virginia Beach 757 | The A.W. Vaughan Company',
			description:
				'Professional shed pad preparation and foundation work in Virginia Beach. Precise site leveling, gravel base installation, and proper drainage for sheds and small structures. Call 757-402-1100.',
			ogTitle: 'Shed Pad & Foundation Preparation | The A.W. Vaughan Company',
			ogDescription:
				'Professional shed pad preparation in Virginia Beach. Site leveling, gravel base installation, and proper drainage.',
			ogImageAlt: 'Shed Pad Preparation - The A.W. Vaughan Company'
		}
	},
	{
		slug: 'excavation',
		title: 'Small Excavation & Site Work',
		description:
			'Specialized small excavation contractor serving the 757 area. From culvert repair to rural property maintenance, we handle projects too small for large contractors but requiring professional expertise.',
		heading: 'Small Excavation & Site Work',
		intro:
			"Specialized small excavation services for residential and rural properties in Virginia Beach and the 757 area. We handle the projects larger contractors won't.",
		problem: {
			heading: 'The Right-Sized Excavation Contractor',
			paragraphs: [
				"Many excavation contractors focus on large commercial projects and won't take on smaller residential or rural jobs. That's where we come in. The A.W. Vaughan Company specializes in exactly these projects.",
				'From clearing a small lot to trenching for utilities, repairing culverts, or maintaining rural property access roads, we bring professional expertise and the right equipment to every job, no matter the size.'
			]
		},
		image: {
			name: 'work-example-2',
			alt: 'Small excavation and site work project in Virginia Beach',
			width: 900,
			height: 1125
		},
		offeringsHeading: 'Our Excavation Services',
		offerings: [
			{
				title: 'Small Lot Clearing & Grading',
				description:
					'We clear and grade small lots for construction, landscaping, or property improvement projects with precision equipment.'
			},
			{
				title: 'Trenching for Utilities',
				description:
					'Professional trenching services for water lines, electrical conduit, drainage pipes, and other utility installations.'
			},
			{
				title: 'Culvert Repair & Installation',
				description:
					'We repair damaged culverts and install new ones to maintain proper water flow under driveways and access roads.'
			},
			{
				title: 'Rural Property Maintenance',
				description:
					'Access road grading, drainage maintenance, and general site work to keep rural properties functional and well-maintained.'
			}
		],
		cta: {
			heading: 'Need Excavation Work Done?',
			body: 'Contact us for a free consultation and quote.'
		},
		schemaDescription:
			'Specialized small excavation services including lot clearing, trenching, culvert repair, and rural property maintenance in Virginia Beach and the 757 area.',
		seo: {
			title: 'Small Excavation & Site Work | Virginia Beach 757 | The A.W. Vaughan Company',
			description:
				'Specialized small excavation contractor in Virginia Beach and the 757 area. Lot clearing, trenching, culvert repair, and rural property maintenance. Call 757-402-1100 for a free quote.',
			ogTitle: 'Small Excavation & Site Work | The A.W. Vaughan Company',
			ogDescription:
				'Specialized small excavation services in Virginia Beach. Lot clearing, trenching, and rural property maintenance.',
			ogImageAlt: 'Small Excavation Services - The A.W. Vaughan Company'
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
