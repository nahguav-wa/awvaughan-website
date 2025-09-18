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
			'Stabilizing dunes, regrading parking courts, and resetting drainage to reopen a Virginia Beach resort after severe washouts.',
		summary:
			'When a nor’easter eroded beachfront infrastructure, we mobilized within 24 hours to restore drainage, regrade parking courts, and reinforce dunes ahead of the weekend rush.',
		body: [
			'A nor’easter pushed tidal water across a coastal resort, eroding dunes and threatening critical access roads ahead of a sold-out weekend.',
			'Our crews mobilized overnight, importing stabilized fill, rebuilding compacted parking courts, and installing temporary erosion control blankets to protect refreshed dunes.',
			'Within 72 hours the resort reopened with restored drainage paths, refreshed access lanes, and a plan for long-term stormwater resilience.'
		]
	},
	{
		slug: 'hoa-amenity-refresh',
		type: 'project',
		title: 'HOA amenity refresh & drainage',
		description:
			'Phased drainage corrections and amenity upgrades that helped an HOA reopen trails and clubhouse spaces ahead of summer.',
		summary:
			'This Hampton Roads community needed refreshed walking trails, improved clubhouse drainage, and careful scheduling to keep residents safe during upgrades.',
		body: [
			'Residents had avoided amenities because seasonal flooding and aging surfaces made the clubhouse grounds difficult to enjoy.',
			'We scheduled phased work around community events, rebuilding walking trails, correcting grading around the clubhouse, and installing new drainage structures to redirect runoff.',
			'By summer the HOA reopened refreshed amenities with stabilized slopes, new landscaping, and better stormwater performance.'
		]
	},
	{
		slug: 'logistics-yard-expansion',
		type: 'project',
		title: 'Logistics yard expansion',
		description:
			'Earthwork, aggregate surfacing, and lighting trenching that delivered a logistics yard expansion for a regional carrier on a compressed schedule.',
		summary:
			'A regional carrier needed additional laydown space before peak shipping season. We balanced cut/fill, installed drainage, and coordinated lighting trenching to keep the project on schedule.',
		body: [
			'The client secured adjacent land but needed it ready for heavy equipment in weeks, not months.',
			'Our grading crews balanced onsite materials, imported aggregate for surfacing, and coordinated lighting trenching with electrical partners to avoid downtime.',
			'The expanded yard came online ahead of peak season with clean traffic patterns, improved drainage, and clear lighting corridors.'
		]
	},
	{
		slug: 'storm-ready-maintenance-checklist',
		type: 'blog',
		title: 'Storm-ready maintenance checklist for coastal properties',
		description:
			'Proactive drainage, debris, and documentation steps facility managers can take to keep Virginia Beach properties storm-ready.',
		summary:
			'Facility managers across Hampton Roads ask how to prepare for severe weather. This checklist highlights the maintenance steps that protect accessibility and budgets.',
		body: [
			'Schedule regular inspections of gutters, downspouts, and storm drains—especially before hurricane season.',
			'Document site conditions with photos and simple notes so you have a baseline when storms push debris across the property.',
			'Keep emergency contacts updated and confirm vendor availability for rapid response when conditions change quickly.'
		]
	},
	{
		slug: 'sitework-preconstruction-questions',
		type: 'blog',
		title: 'Preconstruction questions that keep sitework on schedule',
		description:
			'Key conversations builders should have with sitework partners before mobilization to avoid delays and scope gaps.',
		summary:
			'Builders who align on access, soils, utilities, and documentation before breaking ground see fewer surprises once equipment rolls onsite.',
		body: [
			'Clarify access routes for haul trucks and equipment staging—especially in tight infill locations.',
			'Review existing utility records and confirm who is responsible for locating, protection, and tie-ins.',
			'Align on communication cadence so everyone understands how updates and change orders will be handled.'
		]
	}
] as const;

export const findContentEntry = (slug: string) =>
	contentEntries.find((entry) => entry.slug === slug);
