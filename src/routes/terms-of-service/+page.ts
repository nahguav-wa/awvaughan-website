import type { PageLoad } from './$types';
import { appConfig } from '../../app.config';
import type { SeoData } from '$lib/seo';

export const load: PageLoad = ({ url }) => {
        const { seo: defaults } = appConfig;

        const seo: SeoData = {
                ...defaults,
                title: 'Terms of Service — AW Vaughan Company',
                description:
                        'Understand the terms that govern AW Vaughan Company’s website, proposals, and client communication for projects across Hampton Roads.',
                canonical: url.href
        };

        return { seo };
};
