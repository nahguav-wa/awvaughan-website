/**
 * Site Configuration
 * Central configuration for the personal site: identity, URLs, and navigation.
 * Update the placeholder bio/social values below with your own copy.
 */
export const SITE = {
	/** Site owner's name */
	name: 'Alex Vaughan',
	/** Short role/positioning line shown under the name */
	title: 'Writer',
	/** One-sentence description used for the homepage and default SEO */
	description:
		'Alex Vaughan writes about construction technology, marketing, and the people building both.',
	/** A slightly longer intro used on the landing page (placeholder — edit me) */
	intro:
		'I write essays and field notes about construction technology and marketing. This is where I collect the pieces worth keeping.',
	/** Canonical production URL, no trailing slash */
	url: 'https://awvaughan.com',
	/** Contact email */
	email: 'alex.vaughan@awvaughan.com',
	/** Language for RSS / html */
	language: 'en-us',
	/** Default Open Graph image for pages that don't specify one (optional) */
	ogImage: '' as string
} as const;

export const SITE_EMAIL_HREF = `mailto:${SITE.email}`;

/**
 * Primary navigation links.
 */
export const NAV_LINKS = [
	{ label: 'Home', href: '/' },
	{ label: 'Writing', href: '/writing' },
	{ label: 'Contact', href: '/contact' }
] as const;

/**
 * Social / external profile links shown in the footer.
 * Remove entries you don't use, or add your own.
 */
export const SOCIAL_LINKS = [
	{ label: 'Email', href: SITE_EMAIL_HREF },
	{ label: 'RSS', href: '/rss.xml' }
] as const;
