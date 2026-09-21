/**
 * Features/Value Propositions Data
 * Core company value propositions and differentiators
 *
 * Rendered twice: the homepage About section and the "Our Values" grid on
 * /about. They are deliberately kept distinct from the "Why Choose Us" reasons
 * further down /about, so the page is not the same three claims twice.
 */

import type { Feature } from '$lib/types';
import { Droplets, Users, Camera } from '@lucide/svelte';

/**
 * Company value propositions and features
 * Icons from Lucide Svelte library
 */
export const features: Feature[] = [
	{
		title: 'We Think About Water',
		description:
			'We came up doing grading and drainage. Compacted ground sheds a summer storm instead of taking it in, and turf drowns in the low corner every wet winter — so we read a site that way first.',
		icon: Droplets
	},
	{
		title: 'One Program, One Contact',
		description:
			'Turf, trees, shrubs, beds and the seasonal clean-ups under a single written plan, instead of three contractors who each blame the other two.',
		icon: Users
	},
	{
		title: 'You Can See the Work',
		description:
			'Digital photos documenting improvements and problems as we find them, and a quality site inspection every month. You should not have to take our word for the condition of the grounds.',
		icon: Camera
	}
];
