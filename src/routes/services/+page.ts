import type { PageLoad } from './$types';
import { createSeo } from '$lib/seo';

export const load: PageLoad = ({ url }) => ({
        seo: createSeo({
                title: 'Services | AW Vaughan Company',
                description:
                        "Explore AW Vaughan Company's sitework, drainage, maintenance, and emergency response services for Virginia Beach and Hampton Roads properties.",
                url
        })
});
