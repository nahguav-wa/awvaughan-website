import type { PageLoad } from './$types';
import { appConfig } from '../../app.config';
import type { SeoData } from '$lib/seo';

export const load: PageLoad = ({ url }) => {
        const { seo: defaults } = appConfig;

        const seo: SeoData = {
                ...defaults,
                title: 'Services | AW Vaughan Company',
                description:
                        "Explore AW Vaughan Company's sitework, drainage, maintenance, and emergency response services for Virginia Beach and Hampton Roads properties.",
                canonical: url.href
        };

        return { seo };
};
