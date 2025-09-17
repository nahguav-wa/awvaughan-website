const SITE_NAME = 'AW Vaughan Company' as const;
const SITE_URL = 'https://www.awvaughan.com/' as const;

export type SeoImage = {
        /**
         * Absolute or relative path to the social share image. Relative paths are resolved against SITE_URL.
         */
        src: string;
        /** Text alternative for the social share image. */
        alt?: string;
        /** Width of the social share image in pixels. */
        width?: number;
        /** Height of the social share image in pixels. */
        height?: number;
};

export type CreateSeoInput = {
        /** Page-specific title that will also be used for Open Graph and Twitter cards. */
        title: string;
        /** Concise description used for meta, Open Graph, and Twitter tags. */
        description: string;
        /**
         * Route path or absolute URL for the page. When provided, canonical, Open Graph, and Twitter URLs will be generated.
         * Accepts either a leading-slash path (e.g., `/about`) or a full URL.
         */
        path?: string;
        /** Optional robots directive for the page. */
        robots?: string;
        /** Social image configuration used for Open Graph and Twitter cards. */
        image?: SeoImage;
};

export type SeoMetaTag =
        | {
                      name: string;
                      content: string;
              }
        | {
                      property: string;
                      content: string;
              };

export type SeoLinkTag = {
        rel: string;
        href: string;
};

export type SeoHead = {
        title: string;
        meta: readonly SeoMetaTag[];
        links: readonly SeoLinkTag[];
};

const toAbsoluteUrl = (value: string) => new URL(value, SITE_URL).toString();

const normalisePath = (path: string) => (path.startsWith('http://') || path.startsWith('https://') ? path : path.startsWith('/') ? path : `/${path}`);

export const getMetaKey = (tag: SeoMetaTag) => ('name' in tag ? tag.name : tag.property);

export const getLinkKey = (link: SeoLinkTag) => `${link.rel}:${link.href}`;

export const createSeo = ({ title, description, path, robots, image }: CreateSeoInput): SeoHead => {
        const canonicalUrl = path ? toAbsoluteUrl(normalisePath(path)) : undefined;

        const meta: SeoMetaTag[] = [
                { name: 'description', content: description },
                { property: 'og:site_name', content: SITE_NAME },
                { property: 'og:type', content: 'website' },
                { property: 'og:title', content: title },
                { property: 'og:description', content: description },
                { name: 'twitter:title', content: title },
                { name: 'twitter:description', content: description },
                { name: 'twitter:card', content: image ? 'summary_large_image' : 'summary' }
        ];

        if (robots) {
                meta.push({ name: 'robots', content: robots });
        }

        if (canonicalUrl) {
                meta.push({ property: 'og:url', content: canonicalUrl });
                meta.push({ name: 'twitter:url', content: canonicalUrl });
        }

        if (image) {
                const imageUrl = toAbsoluteUrl(image.src);
                meta.push({ property: 'og:image', content: imageUrl });
                if (image.width) {
                        meta.push({ property: 'og:image:width', content: image.width.toString() });
                }
                if (image.height) {
                        meta.push({ property: 'og:image:height', content: image.height.toString() });
                }
                if (image.alt) {
                        meta.push({ property: 'og:image:alt', content: image.alt });
                }
                meta.push({ name: 'twitter:image', content: imageUrl });
                if (image.alt) {
                        meta.push({ name: 'twitter:image:alt', content: image.alt });
                }
        }

        const links: SeoLinkTag[] = canonicalUrl ? [{ rel: 'canonical', href: canonicalUrl }] : [];

        return {
                title,
                meta,
                links
        };
};
