import type { PageLoad } from './$types';
import { createSeo } from '$lib/seo';

export const load: PageLoad = ({ url }) => ({
        seo: createSeo({
                title: 'AW Vaughan Company — Sitework & Property Maintenance in Virginia Beach, VA',
                description:
                        'AW Vaughan Company delivers sitework, drainage, emergency response, and property maintenance services for builders, HOAs, and facility managers across Hampton Roads.',
                url
        })
});
