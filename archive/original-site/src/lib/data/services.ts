/**
 * Services Data
 * Service offerings for The A.W. Vaughan Company
 */

import type { Service } from '$lib/types';

/**
 * Core service offerings
 * Each service includes title, description, target route, and SEO keywords
 */
export const services: Service[] = [
	{
		title: 'Gravel Driveway Repair & Restoration',
		description:
			'Expert gravel driveway repair services in the Virginia Beach 757 area. We restore proper crown, fix potholes, eliminate washout problems, and ensure proper drainage for long-lasting results.',
		href: '/services/gravel-driveway-repair',
		keywords: [
			'gravel driveway repair Virginia Beach',
			'gravel driveway repair 757',
			'driveway crown restoration',
			'gravel driveway potholes repair'
		]
	},
	{
		title: 'Drainage Solutions & Grading',
		description:
			'Professional drainage solutions for Norfolk VA and Hampton Roads. We fix standing water issues, install swales and ditches, repair culverts, and provide expert driveway grading to prevent water damage.',
		href: '/services/drainage-solutions',
		keywords: [
			'drainage solutions Norfolk VA',
			'driveway grading 757',
			'ditch and swale repair Virginia Beach',
			'standing water driveway fix'
		]
	},
	{
		title: 'Shed Pad & Foundation Preparation',
		description:
			'Quality shed pad preparation and foundation work in Virginia Beach. We provide precise site preparation, proper grading, and solid base construction for sheds, small buildings, and structures.',
		href: '/services/shed-pad-preparation',
		keywords: [
			'shed pad preparation Virginia Beach',
			'shed foundation prep',
			'small site prep contractor',
			'shed base preparation 757'
		]
	},
	{
		title: 'Small Excavation & Site Work',
		description:
			'Specialized small excavation contractor serving the 757 area. From culvert repair to rural property maintenance, we handle projects too small for large contractors but requiring professional expertise.',
		href: '/services/excavation',
		keywords: [
			'small excavation contractor 757',
			'culvert repair Virginia Beach',
			'rural property drainage',
			'small site work contractor'
		]
	}
];
