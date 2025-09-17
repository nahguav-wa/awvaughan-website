import type { PageLoad } from './$types';
import { appConfig } from '../../app.config';
import type { SeoData } from '$lib/seo';

export const load: PageLoad = ({ url }) => {
        const { seo: defaults } = appConfig;

        const seo: SeoData = {
                ...defaults,
                title: 'Careers — AW Vaughan Company',
                description:
                        'Explore career opportunities with AW Vaughan Company. Share your resume to join our Virginia Beach sitework and property maintenance team.',
                canonical: url.href
        };

        return { seo };
};
