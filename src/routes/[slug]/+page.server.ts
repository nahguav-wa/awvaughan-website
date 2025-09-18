import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { appConfig } from '../../app.config';
import { findContentEntry } from '$lib/data/content';
import { createSeo } from '$lib/seo';

export const load: PageServerLoad = async ({ params, url }) => {
        const entry = findContentEntry(params.slug);

        if (!entry) {
                throw error(404, 'Not found');
        }

        const contextLabel = entry.type === 'project' ? 'Project' : 'Insights';

        return {
                entry,
                seo: createSeo({
                        title: `${entry.title} | ${contextLabel} | ${appConfig.siteName}`,
                        description: entry.description,
                        url
                })
        };
};
