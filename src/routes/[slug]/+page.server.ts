import { error } from '@sveltejs/kit';
import { appConfig } from '../../app.config';
import { findContentBySlug } from '$lib/data/content';
import type { PageServerLoad } from './$types';
import type { SeoData } from '$lib/seo';

export const load: PageServerLoad = ({ params, url }) => {
        const entry = findContentBySlug(params.slug);

        if (!entry) {
                throw error(404, 'Not found');
        }

        const { seo: defaults, siteName } = appConfig;
        const baseTitle = entry.type === 'project' ? `${entry.title} — Project Profile` : entry.title;
        const seo: SeoData = {
                ...defaults,
                title: `${baseTitle} | ${siteName}`,
                description: entry.description,
                canonical: url.href,
                image: entry.image ?? defaults.image
        };

        return { entry, seo };
};
