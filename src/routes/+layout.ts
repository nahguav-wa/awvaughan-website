/**
 * Root Layout Load Function
 * Provides global SEO metadata and configuration for all pages
 */

import { getDefaultSEO } from '$lib/utils/seo';
import type { LayoutLoad } from './$types';

/**
 * Load function for root layout
 * Runs on both server and client
 */
export const load: LayoutLoad = () => {
	return {
		// Global SEO defaults (can be overridden by individual pages)
		seo: getDefaultSEO()
	};
};

/**
 * Prerender Configuration
 * Static pages are prerendered for faster load times
 */
export const prerender = true;
