import type { PageLoad } from './$types';
import { createSeo } from '$lib/seo';

export const load: PageLoad = ({ url }) => ({
        seo: createSeo({
                title: 'Privacy Policy — AW Vaughan Company',
                description:
                        'Review AW Vaughan Company’s privacy policy to understand how we handle inquiries and safeguard information shared through our Virginia Beach website.',
                url
        })
});
