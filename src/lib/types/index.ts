/**
 * Type Definitions
 * Shared TypeScript interfaces and types for the application
 */

import type { Component } from 'svelte';

/**
 * Article frontmatter as authored in each Markdown file.
 * `slug` is optional in the file (defaults to the filename).
 */
export interface ArticleFrontmatter {
	title: string;
	description: string;
	/** ISO date string, e.g. "2026-02-14" */
	date: string;
	/** Optional explicit slug; defaults to the file name */
	slug?: string;
	/** Hide from listings/feed and mark noindex when true */
	draft?: boolean;
	/** Path or URL to a per-article Open Graph image */
	ogImage?: string;
	/** Optional topic tags */
	tags?: string[];
}

/**
 * Fully-resolved article metadata used throughout the app.
 */
export interface ArticleMeta extends ArticleFrontmatter {
	slug: string;
}

/**
 * An article's resolved metadata paired with its rendered component.
 */
export interface Article {
	meta: ArticleMeta;
	component: Component;
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
	/** ISO published time for article-type pages */
	publishedTime?: string;
}

/**
 * SEO Metadata Configuration
 */
export interface SEOMetadata {
	title: string;
	description: string;
	keywords?: string | string[];
	ogImage?: string;
	canonical?: string;
	type?: 'website' | 'article' | 'profile';
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
 * Button Component Props
 */
export interface ButtonProps {
	variant?: 'primary' | 'secondary' | 'outline';
	size?: 'sm' | 'md' | 'lg';
	href?: string;
	type?: 'button' | 'submit' | 'reset';
	class?: string;
}
