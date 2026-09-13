/**
 * Canonical origin for the site.
 *
 * Every absolute URL the app emits (canonical tags, Open Graph, Schema.org,
 * sitemap, Meta event source URLs) is built from this one value, so the apex
 * and www spellings can never drift apart again.
 *
 * Note: redirecting www to the apex cannot be done from this repository —
 * Cloudflare Pages `_redirects` matches on path only. See CLAUDE.md.
 */
export const SITE_URL = 'https://awvaughan.com';

/**
 * Build an absolute URL on the canonical origin.
 * @param path - Root-relative path, e.g. `/contact`
 */
export function absoluteUrl(path: string): string {
	return new URL(path, SITE_URL).toString();
}

/**
 * Company Information Constants
 * Centralized configuration for company contact details and branding
 */
export const COMPANY_INFO = {
	name: 'The A.W. Vaughan Company',
	tagline: 'Jeremiah 29:11',
	location: 'Williamsburg, Virginia',
	locationFull: 'Williamsburg, VA',
	phone: '757-402-1100',
	/** E.164 form, required by Schema.org and preferred by Google. */
	phoneE164: '+1-757-402-1100',
	phoneHref: 'tel:+17574021100',
	email: 'contact@awvaughan.com',
	emailHref: 'mailto:contact@awvaughan.com',

	// Service area
	serviceArea: {
		primary: 'Williamsburg',
		/**
		 * Umbrella phrase for the whole footprint, used wherever copy needs to
		 * name the region rather than list towns.
		 *
		 * There is deliberately no `areaCode` here to reach for instead. One
		 * existed, and the service page template rendered "we serve Williamsburg
		 * and the entire 757 area" on all four pages — which told every
		 * prospect in West Point, Gloucester and Saluda they were out of area,
		 * since those are 804. The footprint straddles both area codes, so no
		 * single one describes it. The phone number stays a 757 number and is
		 * written out in `phone`.
		 */
		region: 'the Historic Triangle and Middle Peninsula',
		/**
		 * Towns served, primary first. Rendered as the service-area list on
		 * /about and as the Schema.org `areaServed` entries.
		 */
		regions: [
			'Williamsburg',
			'Toano',
			'Norge',
			'Lightfoot',
			'Yorktown',
			'New Kent',
			'Providence Forge',
			'West Point',
			'Gloucester',
			'Gloucester Point',
			'Saluda',
			'Urbanna'
		]
	},

	// Business details for SEO
	businessType: 'Land Management Contractor',
	yearEstablished: 2025,
	/** Where the company started. It is now based in Williamsburg. */
	foundedIn: 'Virginia Beach, Virginia',
	description:
		'Land management and property maintenance in Williamsburg, VA: land clearing, bush hogging, forestry mulching, trail systems, and grass cutting. Serving Toano, Yorktown, New Kent, West Point, Saluda, Gloucester and the surrounding Historic Triangle and Middle Peninsula.'
} as const;

/**
 * Navigation Routes
 * Application route definitions
 */
export const ROUTES = {
	home: '/',
	about: '/about',
	services: '/services',
	contact: '/contact'
} as const;

/**
 * Meta (Facebook) Pixel configuration
 * Pixel ID is public (embedded in the browser pixel script) and safe to commit.
 * The CAPI access token is sensitive and must come from platform env vars only.
 */
export const META_PIXEL_ID = '2682287902136321';
export const META_GRAPH_API_VERSION = 'v21.0';
export const META_DATASET_QUALITY_API_VERSION = 'v25.0';

/**
 * Currency for the Lead conversion value.
 *
 * The value itself is read from the `META_LEAD_VALUE` env var. When it is
 * unset the value is omitted from the event entirely rather than sent as 0 —
 * a hardcoded zero gives Meta's value-based bidding nothing to optimize
 * toward while looking like a real measurement.
 */
export const META_LEAD_CURRENCY = 'USD';

/**
 * Social Media Links
 * Company social media profile URLs
 */
export const SOCIAL_LINKS = {
	instagram: 'https://www.instagram.com/awvaughanco',
	facebook: 'https://www.facebook.com/awvaughanco',
	nextdoor: 'https://nextdoor.com/page/aw-vaughan-company-virginia-beach-va/',
	youtube: 'https://www.youtube.com/@AWVaughanCo',
	website: SITE_URL
} as const;

/**
 * Design Tokens
 * Consistent spacing, styling, and typography values
 */
export const DESIGN_TOKENS = {
	spacing: {
		section: 'py-20',
		container: 'container mx-auto px-4',
		cardGap: 'gap-8'
	},
	colors: {
		primary: 'primary-500', // #ff9e00
		primaryHover: 'primary-600', // #ea8800
		darkGray: '#27251f',
		textDark: 'gray-900',
		textLight: 'gray-600'
	},
	/**
	 * Typography Scale
	 * 4 font sizes: sm (14px), base (16px), lg (18px), xl (20px)
	 * 2 font weights: regular (400), bold (700)
	 */
	typography: {
		sizes: {
			sm: 'text-sm',
			base: 'text-base',
			lg: 'text-lg',
			xl: 'text-xl'
		},
		weights: {
			regular: 'font-normal',
			bold: 'font-bold'
		}
	}
} as const;
