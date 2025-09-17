import type { PageLoad } from './$types';
import { appConfig } from '../app.config';
import type { SeoData } from '$lib/seo';

export const load: PageLoad = ({ url }) => {
        const { seo: defaults } = appConfig;

        const seo: SeoData = {
                ...defaults,
                title: 'AW Vaughan Company — Sitework & Property Maintenance in Virginia Beach, VA',
                description:
                        'AW Vaughan Company delivers sitework, drainage, emergency response, and property maintenance services for builders, HOAs, and facility managers across Hampton Roads.',
                canonical: url.href
        };

        return { seo };
};
