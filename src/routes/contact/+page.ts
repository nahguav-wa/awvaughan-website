import type { PageLoad } from './$types';
import { appConfig } from '../../app.config';
import type { SeoData } from '$lib/seo';

export const load: PageLoad = ({ url }) => {
        const { seo: defaults } = appConfig;

        const seo: SeoData = {
                ...defaults,
                title: 'Contact AW Vaughan Company | Sitework & Property Maintenance in Virginia Beach',
                description:
                        'Contact AW Vaughan Company at (757) 402-1100 or alex.vaughan@awvaughan.com for sitework, drainage, and property maintenance services in Virginia Beach and Hampton Roads.',
                canonical: url.href
        };

        return { seo };
};
