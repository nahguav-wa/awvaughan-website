import { appConfig } from '../app.config';

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
	title?: string;
	/** Concise description used for meta, Open Graph, and Twitter tags. */
	description?: string;
	/**
	 * Absolute or relative URL used to generate canonical, Open Graph, and Twitter URLs.
	 * Accepts either a {@link URL} instance, leading-slash path, or a fully qualified URL string.
	 */
	url?: string | URL;
	/**
	 * Optional route path used to derive canonical links when {@link url} is not provided.
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

const toAbsoluteUrl = (value: string) => new URL(value, appConfig.siteUrl).toString();

const toCanonicalUrl = (value: string | URL) => {
	const resolved =
		value instanceof URL
			? value
			: value.startsWith('http://') || value.startsWith('https://')
				? new URL(value)
				: new URL(normalisePath(value), appConfig.siteUrl);

	const pathname =
		resolved.pathname.endsWith('/') && resolved.pathname !== '/'
			? resolved.pathname.slice(0, -1)
			: resolved.pathname;
	return `${resolved.origin}${pathname}`;
};

const normalisePath = (path: string) =>
	path.startsWith('http://') || path.startsWith('https://')
		? path
		: path.startsWith('/')
			? path
			: `/${path}`;

export const getMetaKey = (tag: SeoMetaTag) => ('name' in tag ? tag.name : tag.property);

export const getLinkKey = (link: SeoLinkTag) => `${link.rel}:${link.href}`;

export const createSeo = ({
	title,
	description,
	url,
	path,
	robots,
	image
}: CreateSeoInput): SeoHead => {
	const resolvedTitle = title ?? appConfig.seo.title;
	const resolvedDescription = description ?? appConfig.seo.description;

	const canonicalUrl = (() => {
		if (url) {
			return toCanonicalUrl(url);
		}

		if (path) {
			return toAbsoluteUrl(normalisePath(path));
		}

		return toCanonicalUrl(appConfig.siteUrl);
	})();

	const meta: SeoMetaTag[] = [
		{ name: 'description', content: resolvedDescription },
		{ property: 'og:site_name', content: appConfig.siteName },
		{ property: 'og:type', content: 'website' },
		{ property: 'og:title', content: resolvedTitle },
		{ property: 'og:description', content: resolvedDescription },
		{ name: 'twitter:title', content: resolvedTitle },
		{ name: 'twitter:description', content: resolvedDescription },
		{ name: 'twitter:card', content: image ? 'summary_large_image' : 'summary' }
	];

	if (robots) {
		meta.push({ name: 'robots', content: robots });
	}

	meta.push({ property: 'og:url', content: canonicalUrl });
	meta.push({ name: 'twitter:url', content: canonicalUrl });

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

	const links: SeoLinkTag[] = [{ rel: 'canonical', href: canonicalUrl }];

	return {
		title: resolvedTitle,
		meta,
		links
	};
};
