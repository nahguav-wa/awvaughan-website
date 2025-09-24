import type { PageLoad } from './$types';
import { createSeo } from '$lib/seo';

export const load: PageLoad = ({ url }) => ({
        seo: createSeo({
                title: 'Tractor Services | AW Vaughan Company',
                description:
                        'Bush hogging, brush cleanup, driveway grading, and hauling for properties one acre and larger. Owner-operated service across Virginia Beach, Chesapeake, Norfolk, Suffolk, and nearby areas.',
                url
        })
});
