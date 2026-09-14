/**
 * Type Definitions
 * Shared TypeScript interfaces and types for the application
 */

import type { Component } from 'svelte';

/**
 * Service Card Data
 * Shape consumed by listing pages and ServiceCard.
 */
export interface Service {
	title: string;
	description: string;
	href: string;
	icon?: string;
}

/**
 * One bullet on a service page: what we do under that heading.
 */
export interface ServiceOffering {
	title: string;
	description: string;
}

/**
 * A photograph and its intrinsic dimensions.
 *
 * `name` is the basename produced by scripts/optimize-images.mjs, and width and
 * height are the real pixel dimensions of the source — they set the aspect
 * ratio the browser reserves, so a wrong value causes layout shift.
 */
export interface ServiceImage {
	name: string;
	alt: string;
	width: number;
	height: number;
}

/**
 * Everything a service page renders.
 *
 * The four service pages were previously four near-identical .svelte files that
 * differed only in their strings, so any layout change meant four edits and the
 * copies drifted. They are now one `[slug]` route driven by this data.
 */
export interface ServiceDetail {
	slug: string;
	/** Card title on listing pages. */
	title: string;
	/** Card body and meta description source. */
	description: string;
	/** Page h1. */
	heading: string;
	/** Lede paragraph under the h1. */
	intro: string;
	/** Opening narrative block. */
	problem: { heading: string; paragraphs: string[] };
	/**
	 * Optional: a photograph of this service being performed.
	 *
	 * Omitted when no honest photograph of the work exists yet. A service page
	 * must not illustrate itself with a picture of different work — that is
	 * false content for search engines and a lie to a screen reader. The
	 * template renders a single column when this is absent.
	 */
	image?: ServiceImage;
	offeringsHeading: string;
	offerings: ServiceOffering[];
	cta: { heading: string; body: string };
	/** Description used for the Schema.org Service entity. */
	schemaDescription: string;
	seo: {
		title: string;
		description: string;
		ogTitle: string;
		ogDescription: string;
		ogImageAlt: string;
	};
}

/**
 * One locality in the service area map.
 *
 * `kind` is not decoration. Virginia's independent cities sit outside any
 * county, so Suffolk, Chesapeake, Virginia Beach, Williamsburg and Poquoson are
 * city-equivalents rather than counties — calling them counties is wrong to
 * every local reader, and it changes the Schema.org type the page emits.
 *
 * Generated into src/lib/data/service-area.ts; see scripts/build-service-area-map.mjs.
 */
export interface ServiceAreaLocality {
	/** US Census GEOID, the stable key that joins a name to its boundary. */
	geoid: string;
	/** Locality name without its "County" or "city" suffix. */
	name: string;
	kind: 'county' | 'city';
	/** SVG path data in the SERVICE_AREA_VIEWBOX coordinate space. */
	path: string;
}

/**
 * Feature/Value Proposition Card Data
 */
export interface Feature {
	title: string;
	description: string;
	icon: Component;
}

/**
 * Open Graph image metadata
 */
export interface OGImage {
	url: string;
	width?: number;
	height?: number;
	alt?: string;
}

/**
 * Open Graph metadata for social sharing
 */
export interface OpenGraphMetadata {
	type?: string;
	title?: string;
	description?: string;
	url?: string;
	siteName?: string;
	image?: OGImage;
}

/**
 * SEO Metadata Configuration
 */
export interface SEOMetadata {
	title: string;
	description: string;
	ogImage?: string;
	canonical?: string;
	type?: 'website' | 'article' | 'business.business';
	noindex?: boolean;
	nofollow?: boolean;
	openGraph?: OpenGraphMetadata;
}

/**
 * Navigation Link Item
 */
export interface NavLink {
	label: string;
	href: string;
	external?: boolean;
}

/**
 * Contact Information
 */
export interface ContactInfo {
	location: string;
	phone: string;
	phoneHref: string;
	email: string;
	emailHref: string;
}

/**
 * Button Component Props
 */
export interface ButtonProps {
	variant?: 'primary' | 'secondary' | 'outline';
	size?: 'sm' | 'md' | 'lg';
	href?: string;
	type?: 'button' | 'submit' | 'reset';
	class?: string;
}
