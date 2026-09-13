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
		title: 'Right-Sized Equipment',
		description:
			'Machines that fit through a farm gate and down a narrow lane without tearing up the ground you are keeping.',
		icon: Zap
	},
	{
		title: 'We Think About Water',
		description:
			'We came up doing grading and drainage. Cleared ground and new trails change where water goes, and we build for that instead of finding out next spring.',
		icon: CheckCircle
	},
	{
		title: 'Local Expertise',
		description:
			'Virginia pine and hardwood, the invasives that take over here, and how fast a field reverts on Toano sand or Middle Peninsula bottomland.',
		icon: Users
	}
];
