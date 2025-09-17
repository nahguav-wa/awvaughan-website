import type { PageLoad } from './$types';
import { appConfig } from '../../app.config';
import type { SeoData } from '$lib/seo';

export const load: PageLoad = ({ url }) => {
        const { seo: defaults } = appConfig;

        const seo: SeoData = {
                ...defaults,
                title: 'About AW Vaughan Company | Virginia Beach Sitework Contractors',
                description:
                        'Learn how AW Vaughan Company delivers Garney-level civil services with a local, owner-led team serving Virginia Beach and Hampton Roads.',
                canonical: url.href
        };

        return { seo };
};
