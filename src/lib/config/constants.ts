/**
 * Company Information Constants
 * Centralized configuration for company contact details and branding
 */
export const COMPANY_INFO = {
	name: 'The A.W. Vaughan Company',
	tagline: 'Jeremiah 29:11',
	location: 'Virginia Beach, Virginia',
	locationFull: 'Virginia Beach, VA',
	phone: '757-402-1100',
	phoneHref: 'tel:+17574021100',
	email: 'contact@awvaughan.com',
	emailHref: 'mailto:contact@awvaughan.com',

	// Service area
	serviceArea: {
		primary: 'Virginia Beach',
		areaCode: '757',
		regions: ['Virginia Beach', 'Norfolk', 'Chesapeake', 'Hampton Roads']
	},

	// Business details for SEO
	businessType: 'Excavation and Grading Contractor',
	yearEstablished: 2025,
	description: 'Professional gravel driveway repair, drainage solutions, and excavation services in the Virginia Beach 757 area. Specializing in driveway grading, shed pad preparation, and rural property maintenance.'
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
 * Social Media Links
 * Company social media profile URLs
 */
export const SOCIAL_LINKS = {
	instagram: 'https://www.instagram.com/awvaughanco',
	facebook: 'https://www.facebook.com/awvaughanco',
	nextdoor: 'https://nextdoor.com/page/aw-vaughan-company-virginia-beach-va/',
	youtube: 'https://www.youtube.com/@AWVaughanCo',
	website: 'https://www.awvaughan.com'
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
