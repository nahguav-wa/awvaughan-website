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
 * Disabled for now until all routes are implemented
 * Enable this after creating all route pages
 */
export const prerender = false;
