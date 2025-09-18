export const appConfig = {
	siteName: 'AW Vaughan Company',
	siteUrl: 'https://www.awvaughan.com',
	seo: {
		title: 'AW Vaughan Company — Sitework & Property Maintenance in Virginia Beach, VA',
		description:
			'AW Vaughan Company delivers sitework, drainage, emergency response, and property maintenance services for builders, HOAs, and facility managers across Hampton Roads.'
	}
} as const;

export type AppConfig = typeof appConfig;
