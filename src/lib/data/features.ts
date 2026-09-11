/**
 * Features/Value Propositions Data
 * Core company value propositions and differentiators
 */

import type { Feature } from '$lib/types';
import { Zap, CheckCircle, Users } from '@lucide/svelte';

/**
 * Company value propositions and features
 * Icons from Lucide Svelte library
 */
export const features: Feature[] = [
	{
		title: 'Fast & Efficient',
		description:
			'Quick turnaround times without compromising quality. We understand your driveway and drainage issues need prompt attention.',
		icon: Zap
	},
	{
		title: 'Quality Assured',
		description:
			'Rigorous standards ensuring the best outcomes. Every gravel driveway repair and drainage solution is built to last.',
		icon: CheckCircle
	},
	{
		title: 'Local Expertise',
		description:
			'We know how water moves across Williamsburg clay, Toano sand, and low-lying Middle Peninsula ground — and we build for it.',
		icon: Users
	}
];
