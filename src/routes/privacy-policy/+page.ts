import type { PageLoad } from './$types';
import { appConfig } from '../../app.config';
import type { SeoData } from '$lib/seo';

export const load: PageLoad = ({ url }) => {
        const { seo: defaults } = appConfig;

        const seo: SeoData = {
                ...defaults,
                title: 'Privacy Policy — AW Vaughan Company',
                description:
                        'Review AW Vaughan Company’s privacy policy to understand how we handle inquiries and safeguard information shared through our Virginia Beach website.',
                canonical: url.href
        };

        return { seo };
};
