import type { PageLoad } from './$types';
import { createSeo } from '$lib/seo';

export const load: PageLoad = ({ url }) => ({
        seo: createSeo({
                title: 'About AW Vaughan Company | Virginia Beach Sitework Contractors',
                description:
                        'Learn how AW Vaughan Company delivers Garney-level civil services with a local, owner-led team serving Virginia Beach and Hampton Roads.',
                url
        })
});
