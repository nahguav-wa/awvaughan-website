/**
 * Contact Page Data Loader
 * Provides SEO metadata and the public Turnstile site key for the Contact page.
 *
 * This is a server load because the Turnstile site key is deployment
 * configuration. It used to be a hardcoded placeholder value compiled into the
 * page, which meant the widget could never issue a valid token: with
 * TURNSTILE_SECRET_KEY set, every submission was rejected and the form was
 * unusable.
 */

import type { PageServerLoad } from './$types';
import type { SEOMetadata } from '$lib/types';
import { absoluteUrl, COMPANY_INFO } from '$lib/config/constants';

/** Contact page has a form and reads per-deployment config, so it is not prerendered. */
export const prerender = false;

export const load: PageServerLoad = ({ platform }) => {
	const seo: SEOMetadata = {
		title: `Contact Us - Get a Free Quote | ${COMPANY_INFO.name} Virginia Beach`,
		description: `Contact ${COMPANY_INFO.name} for a free quote on gravel driveway repair, drainage solutions, and excavation services in Virginia Beach and the 757 area. Call ${COMPANY_INFO.phone}.`,
		canonical: absoluteUrl('/contact'),
		openGraph: {
			type: 'website',
			title: `Contact ${COMPANY_INFO.name} | Free Quotes`,
			description: `Get a free quote for professional gravel driveway repair, drainage solutions, and excavation services in Virginia Beach. Call ${COMPANY_INFO.phone} or fill out our contact form.`,
			url: absoluteUrl('/contact'),
			siteName: COMPANY_INFO.name,
			image: {
				url: absoluteUrl('/og-image.jpg'),
				width: 1200,
				height: 630,
				alt: `Contact ${COMPANY_INFO.name}`
			}
		}
	};

	const turnstileSiteKey = platform?.env?.TURNSTILE_SITE_KEY ?? null;
	const turnstileRequired = Boolean(platform?.env?.TURNSTILE_SECRET_KEY);

	// The API verifies a token whenever the secret is present. Without a site key
	// the widget cannot produce one, so every submission would be rejected.
	// Surface it rather than letting visitors fill in a form that cannot succeed.
	if (turnstileRequired && !turnstileSiteKey) {
		console.error(
			'TURNSTILE_SECRET_KEY is set but TURNSTILE_SITE_KEY is not: the contact form cannot accept submissions.'
		);
	}

	return {
		seo,
		turnstileSiteKey,
		turnstileMisconfigured: turnstileRequired && !turnstileSiteKey
	};
};
