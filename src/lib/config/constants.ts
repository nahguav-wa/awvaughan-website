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
	email: 'alex.vaughan@awvaughan.com',
	emailHref: 'mailto:alex.vaughan@awvaughan.com',

	// Service area
	serviceArea: {
		primary: 'Virginia Beach',
		areaCode: '757',
		regions: ['Virginia Beach', 'Norfolk', 'Chesapeake', 'Hampton Roads']
	},

	// Business details for SEO
	businessType: 'Excavation and Grading Contractor',
	yearEstablished: 2020,
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
	facebook: 'https://facebook.com/awvaughan',
	twitter: 'https://twitter.com/awvaughan',
	linkedin: 'https://linkedin.com/company/awvaughan'
} as const;

/**
 * Design Tokens
 * Consistent spacing and styling values
 */
export const DESIGN_TOKENS = {
	spacing: {
		section: 'py-20',
		container: 'container mx-auto px-4',
		cardGap: 'gap-8'
	},
	colors: {
		primary: 'blue-600',
		primaryHover: 'blue-700',
		textDark: 'gray-900',
		textLight: 'gray-600'
	}
} as const;
