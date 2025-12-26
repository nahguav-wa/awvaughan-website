export const appConfig = {
	siteName: 'AW Vaughan Company',
	siteUrl: 'https://www.awvaughan.com',
	seo: {
		title: 'AW Vaughan Company — Sitework & Property Maintenance in Virginia Beach, VA',
		description:
			'AW Vaughan Company delivers sitework, drainage, emergency response, and property maintenance services for builders, HOAs, and facility managers across Hampton Roads.'
	},
	contact: {
		phone: '(757) 402-1100',
		phoneHref: 'tel:+17574021100',
		email: 'alex.vaughan@awvaughan.com'
	},
	navigation: {
		main: [
			{ label: 'Home', href: '/' },
			{ label: 'About', href: '/about' },
			{ label: 'Services', href: '/services' },
			{ label: 'Contact', href: '/contact' }
		],
		footer: [
			{ label: 'About', href: '/about' },
			{ label: 'Services', href: '/services' },
			{ label: 'Careers', href: '/careers' },
			{ label: 'Contact', href: '/contact' }
		],
		legal: [
			{ label: 'Privacy Policy', href: '/privacy-policy' },
			{ label: 'Terms of Service', href: '/terms-of-service' }
		],
		social: [
			{ label: 'Facebook', href: 'https://facebook.com/awvaughan' },
			{ label: 'Instagram', href: 'https://instagram.com/awvaughan' }
		]
	}
} as const;

export type AppConfig = typeof appConfig;
export type NavLink = { label: string; href: string };
