export type ContentType = 'project' | 'blog';

export type ContentEntry = {
	slug: string;
	type: ContentType;
	title: string;
	description: string;
	summary: string;
	body: readonly string[];
};

export const contentEntries: readonly ContentEntry[] = [
	{
		slug: 'coastal-resort-stormwater-rehab',
		type: 'project',
		title: 'Coastal resort stormwater rehab',
		description:
			'Stabilizing dunes, regrading parking courts, and resetting drainage to reopen a Virginia Beach resort.',
		summary:
			'A nor’easter washed out access roads. We restored drainage, rebuilt parking courts, and reinforced dunes before guests arrived.',
		body: [
			'A nor’easter eroded dunes and blocked access roads before a busy weekend.',
			'We imported fill, rebuilt compacted parking courts, and installed temporary erosion control blankets.',
			'The resort reopened within 72 hours with restored drainage paths and protected dunes.'
		]
	},
	{
		slug: 'hoa-amenity-refresh',
		type: 'project',
		title: 'HOA amenity refresh & drainage',
		description:
			'Drainage corrections and amenity upgrades that helped an HOA reopen trails and clubhouse spaces before summer.',
		summary:
			'We refreshed walking trails, improved clubhouse drainage, and scheduled work around community events.',
		body: [
			'Seasonal flooding and aging surfaces kept residents away from the clubhouse.',
			'We phased work around events, rebuilt trails, corrected grading, and added drainage structures.',
			'The HOA reopened trails and gathering areas with better stormwater performance.'
		]
	},
	{
		slug: 'logistics-yard-expansion',
		type: 'project',
		title: 'Logistics yard expansion',
		description:
			'Earthwork, aggregate surfacing, and lighting trenching for a logistics yard expansion on a tight schedule.',
		summary:
			'We balanced cut/fill, installed drainage, and coordinated lighting trenching so the yard opened before peak season.',
		body: [
			'The client needed added laydown space in weeks, not months.',
			'We balanced onsite materials, imported aggregate, and coordinated lighting trenching to avoid downtime.',
			'The yard opened before peak season with clear traffic patterns and improved drainage.'
		]
	},
	{
		slug: 'storm-ready-maintenance-checklist',
		type: 'blog',
		title: 'Storm-ready maintenance checklist for coastal properties',
		description:
			'Simple drainage, debris, and documentation steps to keep coastal properties storm-ready.',
		summary:
			'A quick checklist for facility managers in Hampton Roads to prepare for severe weather.',
		body: [
			'Inspect gutters, downspouts, and storm drains before hurricane season.',
			'Document site conditions with photos so you have a baseline after storms.',
			'Keep emergency contacts updated and confirm vendor availability for fast response.'
		]
	},
	{
		slug: 'sitework-preconstruction-questions',
		type: 'blog',
		title: 'Preconstruction questions that keep sitework on schedule',
		description:
			'Key conversations to have with sitework partners before mobilization to avoid delays.',
		summary:
			'Aligning on access, soils, utilities, and updates keeps projects moving once equipment arrives.',
		body: [
			'Clarify access routes for haul trucks and equipment staging.',
			'Confirm responsibilities for locating, protecting, and tying into utilities.',
			'Set a simple communication cadence for updates and change orders.'
		]
	}
] as const;

export const findContentEntry = (slug: string) =>
	contentEntries.find((entry) => entry.slug === slug);
