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
		title: 'Land Clearing',
		description:
			'From house sites to pasture creation and viewshed development, we have the equipment and experience to make your vision a reality. Excavators, track loaders, and dozers — we get it done right.',
		href: '/services#land-clearing',
		keywords: [
			'land clearing Virginia Beach',
			'land clearing 757',
			'lot clearing Hampton Roads',
			'site clearing contractor Virginia Beach'
		]
	},
	{
		title: 'Bush Hogging',
		description:
			"When you own open land, maintaining it is essential — mother nature will take it over if you don't. We have multiple setups to handle large fields, small parcels, and steep slopes throughout the 757 area.",
		href: '/services#bush-hogging',
		keywords: [
			'bush hogging Virginia Beach',
			'bush hogging 757',
			'field mowing Hampton Roads',
			'brush cutting contractor Virginia Beach'
		]
	},
	{
		title: 'Gravel Driveway Repair & Restoration',
		description:
			'Expert gravel driveway repair throughout the Virginia Beach 757 area. We restore proper crown, fill potholes, eliminate washouts, and ensure lasting drainage — so your driveway holds up season after season.',
		href: '/services#gravel-driveway',
		keywords: [
			'gravel driveway repair Virginia Beach',
			'gravel driveway repair 757',
			'driveway crown restoration',
			'gravel driveway grading Hampton Roads'
		]
	},
	{
		title: 'Lawn Care & Landscaping',
		description:
			"We maintain your property to the standards we'd want for our own. From seasonal care to strategic landscape planning, we work with you to develop a vision and bring it to life.",
		href: '/services#lawn-care',
		keywords: [
			'lawn care Virginia Beach',
			'landscaping 757',
			'lawn maintenance Hampton Roads',
			'landscape design Virginia Beach'
		]
	},
	{
		title: 'Trail Systems',
		description:
			'If you have a large tract of land, what better way to enjoy it than with a trail system? We design and build paths for walking, ATVs, horses, and more — including signage and mapping options.',
		href: '/services#trail-systems',
		keywords: [
			'trail systems Virginia Beach',
			'property trails 757',
			'ATV trail building Hampton Roads',
			'walking trail contractor Virginia Beach'
		]
	},
	{
		title: 'Project Management',
		description:
			"Whether you're planning a full property buildout or simply re-routing your driveway, we oversee the whole process. We bring in vetted partners when needed and see your project through from start to finish.",
		href: '/services#project-management',
		keywords: [
			'property project management Virginia Beach',
			'land development 757',
			'property buildout Hampton Roads',
			'excavation project management Virginia Beach'
		]
	}
];
