export type SeoImage = {
        src: string;
        alt?: string;
        width?: number;
        height?: number;
};

export type AppConfig = {
        siteName: string;
        siteUrl: string;
        seo: {
                title: string;
                description: string;
                image?: SeoImage;
        };
};

export const appConfig: AppConfig = {
        siteName: 'AW Vaughan Company',
        siteUrl: 'https://www.awvaughan.com',
        seo: {
                title: 'AW Vaughan Company — Sitework & Property Maintenance in Virginia Beach, VA',
                description:
                        'AW Vaughan Company delivers sitework, drainage, emergency response, and property maintenance services for builders, HOAs, and facility managers across Hampton Roads.'
        }
};
