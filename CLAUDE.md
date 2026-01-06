# CLAUDE.md - AI Assistant Documentation

**Last Updated**: 2026-01-05
**Project**: The A.W. Vaughan Company Website
**Repository**: awvaughan-website

This document provides comprehensive guidance for AI assistants working on this codebase. It covers architecture, conventions, workflows, and important context needed to make effective changes.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture](#architecture)
4. [Directory Structure](#directory-structure)
5. [Code Conventions](#code-conventions)
6. [Component System](#component-system)
7. [Styling System](#styling-system)
8. [SEO Strategy](#seo-strategy)
9. [API Routes](#api-routes)
10. [Development Workflows](#development-workflows)
11. [Common Tasks](#common-tasks)
12. [Business Context](#business-context)
13. [Deployment](#deployment)
14. [Important Notes](#important-notes)

---

## Project Overview

This is a professional business website for The A.W. Vaughan Company, a gravel driveway repair and drainage solutions contractor serving the Virginia Beach 757 area. The site is built with modern web technologies and optimized for SEO and conversions.

**Primary Goals**:
- Generate leads through contact form submissions
- Rank highly for local service keywords
- Provide clear information about services
- Build trust and credibility
- Mobile-first responsive design

**Target Audience**: Homeowners and property managers in Virginia Beach, Norfolk, Chesapeake, and the Hampton Roads area needing gravel driveway repair, drainage solutions, and excavation services.

---

## Technology Stack

### Core Framework
- **SvelteKit 2.x** - Full-stack framework (file-based routing, SSR/SSG)
- **Svelte 5** - Component framework with Runes syntax (`$props()`, `$state()`, etc.)
- **TypeScript** - Type-safe development with strict mode enabled
- **Vite 7** - Build tool and dev server

### Styling
- **Tailwind CSS v4** - Utility-first CSS framework
- **Flowbite Svelte** - Component library (limited usage)
- **Custom Design System** - 4 font sizes, 2 weights, standardized spacing

### Libraries
- **@lucide/svelte** - Icon library for UI elements
- **MS365 Graph API** - Email sending for contact form

### Development Tools
- **ESLint** - Code linting with TypeScript and Svelte plugins
- **Prettier** - Code formatting (tabs, single quotes, 100 char width)
- **TypeScript** - Strict type checking enabled

### Deployment
- **Cloudflare Pages** - Hosting and serverless functions
- **@sveltejs/adapter-auto** - Auto-detects deployment environment

---

## Architecture

### SvelteKit Routing Model

This project uses SvelteKit's file-based routing system:

```
src/routes/
├── +layout.svelte          # Root layout (wraps all pages)
├── +layout.ts              # Global load function (SEO defaults)
├── +page.svelte            # Homepage (/)
├── +page.ts                # Homepage load function
├── about/
│   ├── +page.svelte        # About page (/about)
│   └── +page.ts            # About page load function
├── services/
│   ├── +page.svelte        # Services page (/services)
│   └── +page.ts            # Services page load function
├── contact/
│   ├── +page.svelte        # Contact page (/contact)
│   └── +page.ts            # Contact page load function
└── api/
    └── contact/
        └── +server.ts      # API endpoint (POST /api/contact)
```

**Key Patterns**:
- `+page.svelte` = Page component (UI)
- `+page.ts` = Load function (data fetching, SEO metadata)
- `+layout.svelte` = Layout wrapper (shared UI like header/footer)
- `+layout.ts` = Layout load function (global data)
- `+server.ts` = API endpoint (server-side only)

### Component Architecture

**Hierarchical Component Structure**:

```
1. Layout Components (top-level)
   └── Header, Footer

2. Section Components (page sections)
   └── Hero, AboutSection, ServicesSection, CTASection

3. Feature Components (composite)
   └── ServiceCard, FeatureCard, SEOHead

4. UI Components (primitives)
   └── Button, Card, Section
```

**Component Export Pattern**:
- All components exported from `src/lib/index.ts`
- Import using `$lib` alias: `import { Button } from '$lib'`
- Never import directly from component files in pages

### Data Flow

1. **SEO Metadata**: `+layout.ts` → `+layout.svelte` → `SEOHead` component
2. **Static Data**: `src/lib/data/*.ts` → Components
3. **Configuration**: `src/lib/config/constants.ts` → Used throughout app
4. **Types**: `src/lib/types/index.ts` → Shared across all files
5. **Form Submission**: Contact form → `/api/contact` → MS365 Graph API → Email

---

## Directory Structure

```
awvaughan-website/
├── src/
│   ├── app.css                 # Global styles, Tailwind config, theme
│   ├── app.d.ts                # TypeScript ambient declarations
│   ├── app.html                # HTML template (meta tags, body)
│   ├── lib/                    # Shared library code
│   │   ├── index.ts            # Central component exports
│   │   ├── assets/             # Images, icons (imported in code)
│   │   ├── components/         # Reusable components
│   │   │   ├── layout/         # Header, Footer
│   │   │   ├── sections/       # Hero, AboutSection, etc.
│   │   │   ├── seo/            # SEOHead component
│   │   │   └── ui/             # Button, Card, Section (primitives)
│   │   ├── config/             # Application configuration
│   │   │   ├── constants.ts    # Company info, routes, social links
│   │   │   └── typography.ts   # Typography system config
│   │   ├── data/               # Static data files
│   │   │   ├── features.ts     # Feature/value propositions
│   │   │   └── services.ts     # Service offerings
│   │   ├── types/              # TypeScript type definitions
│   │   │   └── index.ts        # Shared interfaces
│   │   └── utils/              # Utility functions
│   │       ├── seo.ts          # SEO helpers, schema generation
│   │       └── scroll.ts       # Scroll utilities
│   └── routes/                 # File-based routing (pages & API)
│       ├── +layout.svelte      # Root layout
│       ├── +layout.ts          # Global load function
│       ├── +page.svelte        # Homepage
│       ├── about/              # About page
│       ├── services/           # Services page
│       ├── contact/            # Contact page
│       └── api/                # API endpoints
│           └── contact/        # Contact form submission
├── static/                     # Static assets (images, logos, etc.)
│   ├── hero-image.jpg          # Main hero background
│   ├── about-image.jpg         # About section image
│   ├── og-image.jpg            # Open Graph social share image
│   ├── Favicon.svg             # Site favicon
│   ├── robots.txt              # Search engine crawling rules
│   └── sitemap.xml             # SEO sitemap
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── eslint.config.js            # ESLint rules
├── .prettierrc                 # Prettier formatting rules
├── svelte.config.js            # SvelteKit configuration
├── vite.config.ts              # Vite build configuration
├── README.md                   # Project README
├── CLOUDFLARE_EMAIL_SETUP.md   # Email configuration guide
└── CLAUDE.md                   # This file (AI assistant guide)
```

---

## Code Conventions

### General Principles

1. **Over-engineering is forbidden** - Only build what's explicitly needed
2. **No premature abstractions** - Don't create helpers for one-time operations
3. **Delete unused code** - No backwards-compatibility hacks, `_vars`, or `// removed` comments
4. **Trust the framework** - Don't add error handling for scenarios that can't happen
5. **Be explicit** - Prefer clear, verbose code over clever abstractions

### TypeScript

**Type Safety**:
```typescript
// ✅ Good - Use interface from types/index.ts
import type { Service } from '$lib/types';
const service: Service = { title: '...', description: '...', href: '...' };

// ❌ Bad - Inline types or `any`
const service: any = { ... };
```

**Strict Mode**: All code must pass TypeScript strict mode checks
- No implicit `any`
- Strict null checks enabled
- Unused locals/parameters caught

### Svelte 5 Runes Syntax

**Component Props** (use `$props()`):
```svelte
<script lang="ts">
	interface Props {
		title: string;
		description?: string;
	}

	let { title, description = 'Default value' }: Props = $props();
</script>
```

**Reactive State** (use `$state()` and `$derived()`):
```svelte
<script lang="ts">
	let count = $state(0);
	let doubled = $derived(count * 2);
</script>
```

**Children Rendering** (use `@render`):
```svelte
<script lang="ts">
	interface Props {
		children: any;
	}

	let { children }: Props = $props();
</script>

<div>
	{@render children()}
</div>
```

### File Naming

**SvelteKit Conventions**:
- Components: `PascalCase.svelte` (e.g., `Button.svelte`, `ServiceCard.svelte`)
- Route files: Use `+` prefix (e.g., `+page.svelte`, `+layout.ts`, `+server.ts`)
- Type files: `kebab-case.ts` or `index.ts`
- Utility files: `kebab-case.ts` (e.g., `seo.ts`, `scroll.ts`)

### Import Order

```typescript
// 1. External dependencies
import { onMount } from 'svelte';
import { page } from '$app/stores';

// 2. Internal components/utilities
import { Button, Card } from '$lib';
import { COMPANY_INFO } from '$lib/config/constants';
import type { Service } from '$lib/types';

// 3. Relative imports (avoid when possible)
import './styles.css';
```

### Comments

**When to Comment**:
- Complex business logic that isn't self-evident
- SEO-critical sections (structured data, meta tags)
- Security-sensitive code (sanitization, validation)
- API integrations with external services

**When NOT to Comment**:
- Self-explanatory code (e.g., `// Set the title`)
- Type definitions (types are self-documenting)
- Obvious UI components

**Comment Style**:
```typescript
/**
 * Multi-line JSDoc for functions/interfaces
 * @param name - Parameter description
 * @returns Return value description
 */
export function formatPageTitle(name: string): string {
	return `${name} | ${COMPANY_INFO.name}`;
}

// Single-line comment for inline explanations
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation
```

---

## Component System

### Component Categories

#### 1. Layout Components (`src/lib/components/layout/`)

**Header.svelte** - Main navigation
- Sticky header with logo and navigation links
- Mobile-responsive hamburger menu
- Links to: Home, About, Services, Contact

**Footer.svelte** - Site footer
- Company info, social media links
- Copyright notice
- Contact information

#### 2. Section Components (`src/lib/components/sections/`)

**Hero.svelte** - Hero section with background image
- Props: `imageSrc`, `imageAlt`, `title`, `subtitle`, `primaryCTA`, `secondaryCTA`
- Full-screen background with overlay
- Dual CTAs (primary + secondary)

**AboutSection.svelte** - Company introduction
- Features grid with icons
- Value propositions
- Trust indicators

**ServicesSection.svelte** - Service offerings grid
- Displays services from `src/lib/data/services.ts`
- ServiceCard components in grid layout

**CTASection.svelte** - Call-to-action section
- Conversion-focused messaging
- Primary CTA button to contact page

#### 3. Feature Components (`src/lib/components/`)

**ServiceCard.svelte** - Individual service card
- Props: `title`, `description`, `href`, `icon`
- Used in services grid

**FeatureCard.svelte** - Feature/value proposition card
- Props: `title`, `description`, `icon`
- Used in about section

**SEOHead.svelte** - SEO meta tags and structured data
- Props: `metadata`, `structuredData`
- Generates Open Graph, Twitter Cards, Schema.org JSON-LD

#### 4. UI Components (`src/lib/components/ui/`)

**Button.svelte** - Reusable button component
- Variants: `primary`, `secondary`, `outline`
- Sizes: `sm`, `md`, `lg`
- Can be link (`href`) or button (`type`)

**Card.svelte** - Generic card container
- Consistent padding, borders, shadows

**Section.svelte** - Page section wrapper
- Consistent vertical spacing
- Container with max-width

### Component Props Pattern

Always use TypeScript interfaces for props:

```svelte
<script lang="ts">
	interface Props {
		title: string;              // Required
		description?: string;       // Optional
		variant?: 'primary' | 'secondary';  // Union type with default
	}

	let {
		title,
		description = '',
		variant = 'primary'
	}: Props = $props();
</script>
```

### Legacy Components

**DO NOT USE** - These are deprecated and will be removed:
- `Header1.svelte`, `Header2.svelte` - Use `layout/Header.svelte`
- `HeroImage.svelte` - Use `sections/Hero.svelte`

If you see these imported, replace with modern equivalents.

---

## Styling System

### Tailwind CSS v4

**Configuration**: All styling is in `src/app.css`

**Custom Theme** (`@theme` block):
```css
/* Primary color palette (Orange) */
--color-primary-500: #ff9e00;  /* Main brand color */
--color-primary-600: #ea8800;  /* Hover state */

/* Custom dark gray (company color) */
--color-dark-gray: #27251f;
```

**Usage in Components**:
```svelte
<button class="bg-primary-500 hover:bg-primary-600 text-white">
	Click me
</button>
```

### Typography System

**Standardized to 4 sizes and 2 weights**:

**Sizes**:
- `text-sm` - 14px (small text, captions)
- `text-base` - 16px (body text, default)
- `text-lg` - 18px (large body text)
- `text-xl` - 20px (headings)

**Weights**:
- `font-normal` - 400 (regular text)
- `font-bold` - 700 (headings, emphasis)

**DO NOT USE**:
- `text-2xl`, `text-3xl`, `text-4xl`, etc.
- `font-light`, `font-medium`, `font-semibold`, etc.

**Rationale**: Consistency and simplicity. These 4 sizes + 2 weights cover all use cases.

### Design Tokens

**Import from constants**:
```typescript
import { DESIGN_TOKENS } from '$lib/config/constants';

// Spacing
DESIGN_TOKENS.spacing.section;      // 'py-20'
DESIGN_TOKENS.spacing.container;    // 'container mx-auto px-4'
DESIGN_TOKENS.spacing.cardGap;      // 'gap-8'

// Colors
DESIGN_TOKENS.colors.primary;       // 'primary-500'
DESIGN_TOKENS.colors.darkGray;      // '#27251f'
```

### Component Styling Patterns

**Section Layout**:
```svelte
<section class="py-20 bg-white dark:bg-stone-900">
	<div class="container mx-auto px-4">
		<!-- Content -->
	</div>
</section>
```

**Grid Pattern** (services, features):
```svelte
<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
	<!-- Cards -->
</div>
```

**Button Styling**:
```svelte
<!-- Primary -->
<button class="rounded-lg bg-primary-500 px-6 py-3 text-base font-bold text-white transition hover:bg-primary-600">

<!-- Secondary -->
<button class="rounded-lg border-2 border-white px-6 py-3 text-base font-bold text-white transition hover:bg-white hover:text-gray-900">
```

### Dark Mode

Uses custom variant (not automatic):
```css
@custom-variant dark (&:where(.dark, .dark *));
```

Applied at `<body>` level in `app.html`:
```html
<body class="bg-white dark:bg-stone-900">
```

---

## SEO Strategy

### Primary Keywords (Target Rankings)

**Geographic + Core Services**:
- gravel driveway repair Virginia Beach
- gravel driveway repair 757
- drainage solutions Norfolk VA
- shed pad preparation Virginia Beach
- driveway grading 757
- ditch and swale repair Virginia Beach

**Service-Specific**:
- gravel driveway crown restoration
- driveway drainage repair near me
- small excavation contractor 757
- culvert repair Virginia Beach

**Full list**: See `src/lib/utils/seo.ts` → `PRIMARY_KEYWORDS`, `SECONDARY_KEYWORDS`

### SEO Implementation Pattern

**Page-Level SEO** (in `+page.ts`):
```typescript
import { formatPageTitle } from '$lib/utils/seo';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		seo: {
			title: formatPageTitle('About Us'),
			description: 'Learn about The A.W. Vaughan Company...',
			keywords: 'gravel driveway repair, Virginia Beach contractor...',
			canonical: 'https://awvaughan.com/about'
		}
	};
};
```

**Structured Data**:
```typescript
import { getLocalBusinessSchema } from '$lib/utils/seo';

const structuredData = getLocalBusinessSchema();
// Passed to SEOHead component
```

### Meta Tags (SEOHead Component)

Automatically generates:
- Standard meta tags (title, description, keywords)
- Open Graph tags (Facebook, LinkedIn)
- Twitter Cards
- Canonical URLs
- Robots directives (noindex, nofollow if specified)
- Schema.org JSON-LD structured data

### Image SEO

**Always include descriptive alt text**:
```svelte
<Hero
	imageSrc="/hero-image.jpg"
	imageAlt="Professional gravel driveway repair and drainage solutions in Virginia Beach - The A.W. Vaughan Company"
/>
```

**Open Graph Images**:
- Use `/og-image.jpg` (1200x630px recommended)
- Specified in SEO metadata: `ogImage: '/og-image.jpg'`

### Sitemap & Robots

**Static files**:
- `static/sitemap.xml` - List of all pages
- `static/robots.txt` - Crawler directives

**Update these when adding new pages**!

---

## API Routes

### Contact Form Endpoint

**Location**: `src/routes/api/contact/+server.ts`

**Method**: POST

**Request Body**:
```typescript
interface ContactFormData {
	firstName: string;      // Required
	lastName: string;       // Required
	company?: string;       // Optional
	email: string;          // Required, validated
	phone?: string;         // Optional
	subject?: string;       // Optional
	message: string;        // Required
}
```

**Response** (Success):
```json
{
	"success": true,
	"message": "Thank you for your message. We will get back to you soon!"
}
```

**Response** (Error):
```json
HTTP 400 Bad Request
{
	"error": "Missing required fields"
}

HTTP 500 Internal Server Error
{
	"error": "Failed to process contact form submission"
}
```

### Email Sending (MS365 Graph API)

**Environment Variables** (Cloudflare Pages):
- `MS365_TENANT_ID` - Azure AD tenant ID
- `MS365_CLIENT_ID` - App registration client ID
- `MS365_CLIENT_SECRET` - App registration client secret
- `MS365_EMAIL` - Email address to send from (e.g., contact@awvaughan.com)

**Flow**:
1. Client submits form → `/api/contact`
2. Server validates and sanitizes input
3. Server gets OAuth token from Azure AD
4. Server sends email via MS365 Graph API
5. Email delivered to `alex.vaughan@awvaughan.com`
6. Reply-To set to customer's email

**Development Mode**:
- If env vars not set, logs to console instead of sending email
- Still returns success to prevent exposing internal errors

**See**: `CLOUDFLARE_EMAIL_SETUP.md` for detailed email configuration

---

## Development Workflows

### Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Type checking
npm run check

# Linting
npm run lint

# Format code
npm run format
```

### Development Server

```bash
npm run dev
# or with auto-open browser
npm run dev -- --open
```

**Hot Module Replacement (HMR)**: Changes to `.svelte` and `.ts` files auto-reload

### Type Checking

```bash
# One-time check
npm run check

# Watch mode
npm run check:watch
```

**Run before committing!** Catches type errors early.

### Linting & Formatting

```bash
# Check for linting issues
npm run lint

# Auto-format all files
npm run format
```

**Prettier Config** (`.prettierrc`):
- Tabs (not spaces)
- Single quotes
- No trailing commas
- 100 character line width
- Tailwind class sorting enabled

### Building for Production

```bash
npm run build
```

**Output**: `.svelte-kit/cloudflare/` (Cloudflare Pages compatible)

**Preview Production Build**:
```bash
npm run preview
```

---

## Common Tasks

### Adding a New Page

1. **Create route directory**:
   ```bash
   mkdir src/routes/new-page
   ```

2. **Create page component** (`src/routes/new-page/+page.svelte`):
   ```svelte
   <script lang="ts">
   	import { Section } from '$lib';
   </script>

   <Section>
   	<h1>New Page</h1>
   	<p>Content goes here</p>
   </Section>
   ```

3. **Create load function** (`src/routes/new-page/+page.ts`):
   ```typescript
   import { formatPageTitle } from '$lib/utils/seo';
   import type { PageLoad } from './$types';

   export const load: PageLoad = () => {
   	return {
   		seo: {
   			title: formatPageTitle('New Page'),
   			description: 'Description for SEO and social sharing',
   			keywords: 'relevant, keywords, here',
   			canonical: 'https://awvaughan.com/new-page'
   		}
   	};
   };
   ```

4. **Add to navigation** (edit `src/lib/components/layout/Header.svelte`):
   ```svelte
   <a href="/new-page">New Page</a>
   ```

5. **Update sitemap** (`static/sitemap.xml`):
   ```xml
   <url>
   	<loc>https://awvaughan.com/new-page</loc>
   	<changefreq>monthly</changefreq>
   	<priority>0.8</priority>
   </url>
   ```

### Adding a New Component

1. **Create component file** (`src/lib/components/MyComponent.svelte`):
   ```svelte
   <script lang="ts">
   	interface Props {
   		title: string;
   		description?: string;
   	}

   	let { title, description = '' }: Props = $props();
   </script>

   <div>
   	<h2>{title}</h2>
   	{#if description}
   		<p>{description}</p>
   	{/if}
   </div>
   ```

2. **Export from index** (`src/lib/index.ts`):
   ```typescript
   export { default as MyComponent } from './components/MyComponent.svelte';
   ```

3. **Use in pages**:
   ```svelte
   <script>
   	import { MyComponent } from '$lib';
   </script>

   <MyComponent title="Hello" description="World" />
   ```

### Updating Company Information

**Edit**: `src/lib/config/constants.ts`

```typescript
export const COMPANY_INFO = {
	name: 'The A.W. Vaughan Company',
	phone: '757-402-1100',
	email: 'contact@awvaughan.com',
	// ... etc
};
```

**Automatically updates**:
- Header contact info
- Footer contact info
- SEO metadata
- Schema.org structured data
- All references throughout the site

### Adding a New Service

1. **Edit**: `src/lib/data/services.ts`

```typescript
export const services: Service[] = [
	// ... existing services
	{
		title: 'New Service',
		description: 'Description of the new service offering',
		href: '/services#new-service',
		keywords: ['keyword1', 'keyword2']
	}
];
```

2. **Automatically appears** in services section on homepage and services page

### Updating Images

**Replace files** in `static/` directory:
- `hero-image.jpg` - Hero background (1920x1080+ recommended)
- `about-image.jpg` - About section image
- `og-image.jpg` - Social share image (1200x630px)

**Images are referenced** in components by path:
```svelte
<Hero imageSrc="/hero-image.jpg" imageAlt="Description" />
```

**Important**: Update `imageAlt` text for SEO!

---

## Business Context

### Company Information

**Name**: The A.W. Vaughan Company
**Location**: Virginia Beach, Virginia
**Service Area**: Virginia Beach, Norfolk, Chesapeake, Hampton Roads (757 area)
**Business Type**: Excavation and Grading Contractor
**Established**: 2025

### Core Services

1. **Gravel Driveway Repair**
   - Crown restoration
   - Pothole filling
   - Grading and leveling

2. **Drainage Solutions**
   - Ditch and swale repair
   - Culvert installation
   - French drains
   - Standing water remediation

3. **Shed Pad Preparation**
   - Site prep and leveling
   - Gravel base installation

4. **Small Excavation**
   - Residential site work
   - Rural property maintenance

### Target Customers

**Primary**:
- Homeowners with gravel driveways experiencing drainage issues
- Property owners needing driveway grading/repair
- Customers preparing sites for sheds or small structures

**Pain Points Addressed**:
- Standing water in driveways
- Potholes and washouts
- Muddy/uneven driveways
- Poor drainage causing property damage

### Competitive Advantages

- Small, owner-operated (personalized service)
- Quick response times
- Specialized in small-to-medium projects
- Local expertise in 757 area
- Faith-based values (Jeremiah 29:11)

### Contact Information

**Phone**: 757-402-1100
**Email**: contact@awvaughan.com
**Website**: https://awvaughan.com

**Social Media**:
- Instagram: @awvaughanco
- Facebook: /awvaughanco
- Nextdoor: /awvaughanco
- YouTube: @AWVaughanCo

---

## Deployment

### Hosting Platform

**Cloudflare Pages** - Serverless deployment with edge functions

**Adapter**: `@sveltejs/adapter-auto` (auto-detects Cloudflare)

### Deployment Process

**Automatic Deployment** (Git Push):
1. Push to `main` branch → Triggers production deployment
2. Push to other branches → Triggers preview deployment

**Manual Deployment**:
```bash
# Build locally
npm run build

# Output in .svelte-kit/cloudflare/
# Upload to Cloudflare Pages dashboard
```

### Environment Variables

**Set in Cloudflare Pages Dashboard** (Settings → Environment Variables):

**Production**:
- `MS365_TENANT_ID` - Azure AD tenant ID
- `MS365_CLIENT_ID` - App registration client ID
- `MS365_CLIENT_SECRET` - App registration client secret
- `MS365_EMAIL` - contact@awvaughan.com

**Preview/Development**:
- Can be left unset (will log instead of sending email)

### Build Settings

**Cloudflare Pages Configuration**:
- **Build command**: `npm run build`
- **Build output directory**: `.svelte-kit/cloudflare`
- **Node version**: 18+
- **Root directory**: `/`

### DNS Configuration

**Provider**: Cloudflare

**Records**:
- `A` / `AAAA` records → Cloudflare Pages
- `MX` records → MS365 mail servers
- `TXT` records → SPF, DMARC, domain verification

**See**: `CLOUDFLARE_EMAIL_SETUP.md` for email DNS details

---

## Important Notes

### Things to NEVER Do

1. **Don't over-engineer** - Only build what's explicitly requested
2. **Don't use deprecated components** - Header1, Header2, HeroImage are legacy
3. **Don't break the typography system** - Stick to 4 sizes + 2 weights
4. **Don't skip type checking** - Run `npm run check` before committing
5. **Don't commit without formatting** - Run `npm run format`
6. **Don't modify auto-generated files** - `.svelte-kit/` directory
7. **Don't use different design tokens** - Use values from `constants.ts`
8. **Don't add unnecessary dependencies** - Justify all new packages

### Things to ALWAYS Do

1. **Always use TypeScript interfaces** - No `any` types
2. **Always add SEO metadata** - Every page needs title, description, keywords
3. **Always include alt text** - All images need descriptive alt text
4. **Always sanitize user input** - Contact form and any user data
5. **Always update sitemap** - When adding new pages
6. **Always test locally** - Run dev server before pushing
7. **Always use $lib imports** - Don't use relative paths for shared code
8. **Always follow Prettier rules** - Tabs, single quotes, 100 char width

### Security Considerations

**Contact Form**:
- Input sanitization (remove `<>` characters)
- Email validation (regex check)
- No sensitive data in error messages
- Rate limiting (consider adding Cloudflare Turnstile)

**Environment Variables**:
- Never commit secrets to repository
- Use Cloudflare Pages environment variables
- Keep `MS365_CLIENT_SECRET` secure

**Dependencies**:
- Regular updates for security patches
- Review dependency changes before updating

### Performance Optimization

**Current Optimizations**:
- Server-side rendering (SSR) for SEO
- Image optimization (use WebP where supported)
- Tailwind CSS purging (automatic)
- Minimal JavaScript (Svelte's reactive system)
- Edge deployment (Cloudflare's global network)

**Future Considerations**:
- Prerendering static pages (`export const prerender = true`)
- Image lazy loading for below-fold images
- Font subsetting for Inter font

### Accessibility

**Current Practices**:
- Semantic HTML (`<nav>`, `<main>`, `<section>`, etc.)
- Alt text on all images
- Proper heading hierarchy
- Focus states on interactive elements

**Improvements to Consider**:
- ARIA labels where needed
- Keyboard navigation testing
- Screen reader testing
- Color contrast validation

### Browser Support

**Target Browsers**:
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Last 2 versions of each

**Not Supported**:
- Internet Explorer (EOL)
- Legacy browsers without ES6 support

---

## Changelog

**2026-01-05** - Initial CLAUDE.md creation
- Comprehensive documentation of codebase structure
- Development workflows and conventions
- SEO strategy and business context
- Deployment and configuration details

---

## Questions or Issues?

**For AI Assistants**:
- Consult this document first before making changes
- Ask clarifying questions if business requirements are unclear
- Propose changes that align with documented conventions

**For Humans**:
- Update this document when architecture changes
- Keep business context section current
- Document new patterns and conventions as they emerge

**Repository**: https://github.com/nahguav-wa/awvaughan-website
