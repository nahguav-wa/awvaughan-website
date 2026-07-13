/**
 * Type Definitions
 * Shared TypeScript interfaces and types for the application
 */

import type { Component } from 'svelte';

/**
 * Service Card Data
 */
export interface Service {
	title: string;
	description: string;
	href: string;
	icon?: string;
	keywords?: string[];
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
	keywords?: string | string[];
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
