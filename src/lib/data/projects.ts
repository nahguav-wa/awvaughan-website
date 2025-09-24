export type FeaturedProject = {
	title: string;
	sector: string;
	summary: string;
	image: string;
	alt: string;
};

export const featuredProjects: readonly FeaturedProject[] = [
	{
		title: 'Five-acre bush hogging & driveway pass',
		sector: 'Pungo, Virginia Beach',
		summary:
			'Cleared waist-high growth, trimmed fencelines, and refreshed the gravel lane so the owners could show the property to buyers.',
		image:
			'https://images.unsplash.com/photo-1611224885990-d1d73c5a19fb?auto=format&fit=crop&w=1600&q=80',
		alt: 'Freshly mowed acreage with a compact tractor in the distance.'
	},
	{
		title: 'Storm brush cleanup & haul off',
		sector: 'Chesapeake, VA',
		summary:
			'Cut and chipped fallen limbs across a wooded lot, then hauled debris away so the homeowners could reopen their trails.',
		image:
			'https://images.unsplash.com/photo-1613326104654-eef70f6d07fa?auto=format&fit=crop&w=1600&q=80',
		alt: 'Pile of storm debris being loaded for hauling.'
	},
	{
		title: 'Driveway reshaping & drainage swale',
		sector: 'Moyock, NC',
		summary:
			'Pulled the crown back into a long gravel drive, installed a shallow swale, and packed new stone to stop washouts after heavy rain.',
		image:
			'https://images.unsplash.com/photo-1523419409543-0c1df022bdd7?auto=format&fit=crop&w=1600&q=80',
		alt: 'Gravel driveway after grading with proper drainage.'
	}
] as const;
