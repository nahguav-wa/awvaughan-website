/**
 * Features/Value Propositions Data
 * Core company value propositions and differentiators
 */

import type { Feature } from '$lib/types';
import { Leaf, MessageCircle, Star } from '@lucide/svelte';

/**
 * Company value propositions and features
 * Icons from Lucide Svelte library
 */
export const features: Feature[] = [
	{
		title: 'A Passion for Land',
		description:
			'We believe that managing land sustainably is a true craft. Every project reflects our genuine care for the property and the people who own it.',
		icon: Leaf
	},
	{
		title: 'Communication & Transparency',
		description:
			'We pride ourselves on clear, honest communication throughout every project. No surprises — just professional service you can count on.',
		icon: MessageCircle
	},
	{
		title: 'Local Expertise',
		description:
			'We know Virginia Beach and the 757 area — the soil, the seasons, and what it takes to make land look its best and function properly for the long haul.',
		icon: Star
	}
];
