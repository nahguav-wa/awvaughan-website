# CLAUDE.md - AI Assistant Documentation

**Last Updated**: 2026-09-14
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
- **Custom Design System** - 4 body text sizes, 3 heading steps, 2 weights

### Libraries

- **@lucide/svelte** - Icon library for UI elements
- **MS365 Graph API** - Email sending for contact form
- **sharp** (dev only) - Image derivative pipeline, `npm run images`

### Development Tools

- **ESLint** - Code linting with TypeScript and Svelte plugins
- **Prettier** - Code formatting (tabs, single quotes, 100 char width)
- **TypeScript** - Strict type checking enabled
- **Vitest** - Unit tests
- **Playwright** - End-to-end tests (`npm run test:e2e`)

### Deployment

- **Cloudflare Pages** - Hosting and serverless functions
- **@sveltejs/adapter-cloudflare** - Pinned deliberately; `adapter-auto` produced
  no deployable output locally, so local builds did not match production

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
│   ├── +page.svelte        # Services listing (/services)
│   ├── +page.ts            # Services listing load function
│   └── [slug]/             # One template for all four service pages
│       ├── +page.svelte    # Renders a ServiceDetail record
│       └── +page.ts        # Resolves the slug, builds SEO + Service schema
├── service-area/
│   ├── +page.svelte        # Service area map page (/service-area)
│   └── +page.ts            # SEO + Schema.org areaServed
├── contact/
│   ├── +page.svelte        # Contact page (/contact)
│   └── +page.server.ts     # Server load: SEO + Turnstile site key
├── sitemap.xml/
│   └── +server.ts          # Generated from the route data
└── api/
    ├── contact/
    │   └── +server.ts      # POST /api/contact
    ├── health/
    │   └── +server.ts      # GET /api/health (config check, secret-gated)
    └── meta-emq/
        └── +server.ts      # GET /api/meta-emq (EMQ diagnostics)
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

1. **SEO Metadata**: `+layout.ts` defaults are merged with the current route's
   `page.data.seo` inside `+layout.svelte`, then passed to `SEOHead`. The layout
   must read `page.data`, not its own `data` — reading `data.seo` shipped the
   layout defaults on every route, giving all pages one title and a canonical
   pointing at the homepage.
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
│   │   │   ├── service-area.ts # GENERATED map paths (npm run service-area-map)
│   │   │   └── services.ts     # Service offerings + full service page content
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
│           ├── contact/        # Contact form submission
│           └── meta-emq/       # Meta EMQ diagnostics (admin-gated)
├── scripts/                    # Build-time pipelines (run by hand, output committed)
│   ├── data/
│   │   └── localities.geojson  # Census boundary extract, input to the map
│   ├── build-service-area-map.mjs
│   └── optimize-images.mjs
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

**ServiceAreaMap.svelte** - Interactive map of the counties and cities served

- Inline SVG built from Census boundaries; no mapping library, no tiles, no CSP
  change, and it survives prerendering
- The shapes are a pointer affordance and are hidden from assistive technology;
  the button list beside them carries keyboard access and is the indexed text

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
		title: string; // Required
		description?: string; // Optional
		variant?: 'primary' | 'secondary'; // Union type with default
	}

	let { title, description = '', variant = 'primary' }: Props = $props();
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
--color-primary-500: #ff9e00; /* Main brand color */
--color-primary-600: #ea8800; /* Hover state */

/* Custom dark gray (company color) */
--color-dark-gray: #27251f;
```

**Usage in Components**:

```svelte
<button class="bg-primary-500 text-white hover:bg-primary-600"> Click me </button>
```

### Typography System

**Body text: 4 sizes. Headings: their own 3-step scale. 2 weights.**

**Body sizes**:

- `text-sm` - 14px (small text, captions)
- `text-base` - 16px (body text, default)
- `text-lg` - 18px (large body text)
- `text-xl` - 20px (lead-in text, callout numerals)

**Heading scale** (defined in `@theme` in `src/app.css`, applied as element
defaults in the base layer):

- `h1` - `clamp(2rem, 4vw + 1rem, 3.5rem)` — 32px to 56px, fluid
- `h2` - `clamp(1.5rem, 1.5vw + 1rem, 2rem)` — 24px to 32px, fluid
- `h3` - 20px

**Weights**:

- `font-normal` - 400 (regular text)
- `font-bold` - 700 (headings, emphasis)

**DO NOT USE**:

- `font-light`, `font-medium`, `font-semibold`, etc.
- A size utility on a heading. Headings get their size from the element rule, so
  `<h2 class="mb-4 text-gray-900">` is complete — adding `text-xl` overrides the
  scale and breaks hierarchy.

**Rationale**: headings previously shared the body scale at `text-xl`, so `h1`,
`h2` and `h3` all rendered at an identical 20px and pages had no visual
hierarchy at all. The homepage worked around it with a one-off `.hero-heading`
clamp, which meant the homepage `h1` was 60px while every other page's `h1` was
20px — the exact inconsistency the single scale was meant to prevent. Body text
is still deliberately restricted; headings now have one scale used everywhere.

An e2e test asserts `h1 > h2 > h3` in computed pixels.

### Design Tokens

**Import from constants**:

```typescript
import { DESIGN_TOKENS } from '$lib/config/constants';

// Spacing
DESIGN_TOKENS.spacing.section; // 'py-20'
DESIGN_TOKENS.spacing.container; // 'container mx-auto px-4'
DESIGN_TOKENS.spacing.cardGap; // 'gap-8'

// Colors
DESIGN_TOKENS.colors.primary; // 'primary-500'
DESIGN_TOKENS.colors.darkGray; // '#27251f'
```

### Component Styling Patterns

**Section Layout**:

```svelte
<section class="bg-white py-20 dark:bg-stone-900">
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
<body class="bg-white dark:bg-stone-900"></body>
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

**Full list**: See `docs/keyword-strategy.md`. Keywords are a content planning
document, not markup: the `<meta name="keywords">` tag is not emitted, because
search engines ignore it and publishing the list hands competitors the strategy.
Work the terms into headings, body copy, alt text, and titles instead.

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
			canonical: absoluteUrl('/about')
		}
	};
};
```

**Always build URLs with `absoluteUrl()`** (from `$lib/config/constants`), never
by writing the origin out by hand. `SITE_URL` is the single canonical origin;
hardcoded copies are how the apex and www spellings drift apart.

**Every page needs its own `canonical`.** A page that omits it inherits the
layout default, which points at the homepage — that asks search engines to drop
the page from the index. An e2e test asserts each route's canonical matches its
own path and that no two pages share a title.

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

- `/og-image.jpg` is generated at exactly 1200x630 by `npm run images`, cropped
  from the hero photograph. It was previously a byte-identical copy of the
  portrait hero image at 710x1125, so every social share rendered a cropped
  sliver — while the metadata declared 1200x630, which made the crop worse.
- `SEOHead` resolves image paths to absolute URLs via `absoluteUrl()`. Crawlers
  do not reliably resolve a relative `og:image`.

### Sitemap & Robots

- `/sitemap.xml` is **generated** by `src/routes/sitemap.xml/+server.ts` from
  `ROUTES` and `serviceDetails`, so it cannot fall behind the routes. There is
  nothing to update by hand. `changefreq` and `priority` are omitted (Google
  ignores both) and so is `lastmod`, because an inaccurate value is ignored too
  and nothing in the build knows when a page's copy last changed.
- `static/robots.txt` - Crawler directives.

**www vs apex**: `SITE_URL` is the apex (`https://awvaughan.com`) and every
canonical points there. Redirecting www to the apex **cannot** be done from this
repository — Cloudflare Pages `_redirects` matches on path only, and prerendered
pages never reach the Worker. Add a Redirect Rule in the Cloudflare dashboard if
a www record exists.

---

## API Routes

### Contact Form Endpoint

**Location**: `src/routes/api/contact/+server.ts`

**Method**: POST

**Request Body**:

```typescript
interface ContactFormData {
	firstName: string; // Required
	lastName: string; // Required
	company?: string; // Optional
	email: string; // Required, validated
	phone?: string; // Optional
	subject?: string; // Optional
	message: string; // Required
}
```

**Response** (delivered):

```json
{
	"success": true,
	"delivered": true,
	"message": "Thank you for your message. We will get back to you soon!"
}
```

**Response** (captured, but the email did not go out — stored in KV):

```json
HTTP 200 OK
{
	"success": true,
	"delivered": false,
	"message": "We have received your message, but our email system is currently delayed..."
}
```

**Response** (not captured at all):

```json
HTTP 502 Bad Gateway
{ "message": "We could not submit your message. Please call us at 757-402-1100..." }
```

Other errors: `400` (validation, or a failed/expired CAPTCHA), `413` (body over
64KB). All carry a `message` the client displays verbatim.

**The endpoint must never report success for a submission it did not capture.**
It previously caught every email failure and returned `{ success: true }`, so a
customer was thanked while the lead vanished — and a Meta Lead conversion was
reported for a lead nobody received, training the ad platform to buy more of
that traffic. The Meta event now fires only on a captured submission.

**Delivery outcomes** (`DeliveryOutcome` in the handler):

| Outcome   | Meaning                                                      | Response                |
| --------- | ------------------------------------------------------------ | ----------------------- |
| `sent`    | Email accepted by Graph                                      | 200, `delivered: true`  |
| `stored`  | Email failed, submission written to the `LEADS` KV namespace | 200, `delivered: false` |
| `skipped` | No mailer configured **and** `dev` is true                   | 200, `delivered: true`  |
| `failed`  | Nothing captured it                                          | 502                     |

The dev/production distinction keys off SvelteKit's `dev` flag, **not** the
presence of `platform`: both `vite dev` and `vite preview` supply a platform
object with an empty env, so keying off it would make every local submission
look like a production misconfiguration.

**Spam controls**: a hidden honeypot field (`website`) is accepted silently and
discarded; Turnstile is verified whenever `TURNSTILE_SECRET_KEY` is set. Rate
limiting is still a Cloudflare WAF rule — a Worker cannot hold reliable counters
across isolates.

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

### Meta Pixel & Conversions API

Lead tracking runs in two halves that Meta deduplicates against each other via a
shared `event_id`:

1. **Browser pixel** (`src/app.html`) - fires `PageView` on every page and `Lead`
   on successful contact form submission. Pixel ID is public.
2. **Conversions API** (`src/routes/api/contact/+server.ts`) - fires a server-side
   `Lead` after the form is accepted, so ad blockers do not lose the conversion.

**Helpers**: `src/lib/utils/meta.ts` - normalization, SHA-256 hashing, and the
CAPI request. All PII (email, name, phone) is normalized then hashed before it
leaves the server. `fbp`, `fbc`, IP, and user agent are sent unhashed because
Meta requires them in the clear.

**Rules when touching this code**:

- Never hardcode the access token. Env vars only, no fallback literal.
- Hash the submitted values, not the sanitized ones - sanitizing rewrites
  characters and breaks the match.
- An unusable phone number is dropped, not guessed at - malformed digits lower
  Event Match Quality rather than raising it.
- CAPI failures are logged and swallowed; they must never fail the form.

### EMQ Diagnostics Endpoint

**Location**: `src/routes/api/meta-emq/+server.ts`
**Method**: GET, gated by the `x-admin-secret` header

Read-only proxy for Meta's Dataset Quality API so monitoring can poll Event Match
Quality without holding the CAPI token. Returns 503 when unconfigured, 401 on a
bad secret.

**Rate limiting** is not implemented in code - a Worker cannot hold reliable
counters across isolates. Apply a Cloudflare WAF rate limiting rule on the path
instead.

**Environment Variables**:

- `META_PIXEL_TOKEN` - CAPI access token (sensitive; also used by the EMQ endpoint)
- `META_TEST_EVENT_CODE` - optional, routes events to Meta's Test Events view
- `META_AGENT_NAME` - partner agent name, required by the Dataset Quality API
- `META_EMQ_ADMIN_SECRET` - shared secret for the EMQ endpoint

---

## Development Workflows

### Getting Started

Requires Node 22+ (see `.node-version`).

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

### Testing

```bash
npm run test        # Vitest unit tests
npm run test:e2e    # Playwright end-to-end tests (builds and previews first)
```

**Unit tests** cover pure logic and the contact endpoint's handler directly:
validation, normalization, Turnstile outcomes, delivery outcomes, the KV
fallback, and the Meta CAPI payload.

**End-to-end tests** (`e2e/site.spec.ts`) run against the **production build**,
because the bugs worth catching there only exist in built output — the CSP is
generated at build time and most pages are prerendered. They cover: no CSP
violations on any route, per-page titles and canonicals, an absolute `og:image`,
the contact form submitting and surfacing the server's message, the form never
claiming success when the submission was not captured, all four service pages
rendering from the shared template, the service area map rendering every
locality as both a shape and a keyboard-reachable button, heading hierarchy in
computed pixels, and the mobile menu's `aria-expanded`/`aria-current`/Escape
behaviour.

`src/lib/data/service-area.test.ts` guards the generated map: that the paths
parse and reconstruct inside the declared viewBox, that the independent cities
are typed as cities, that the enclaves are present, and that every route in
`ROUTES` reaches the sitemap.

**Drift guards** (`src/lib/config/deployment.test.ts`) assert the things that
live in two places stay in step: `_headers` against `security-headers.ts`, the
pixel ID in `static/meta-pixel.js` against `constants.ts`, the CSP against the
hosts the pixel needs, and that no placeholder key reappears in source. Most of
the bugs this codebase had were two copies of one fact in files nobody edited
together — if you duplicate a value, add a guard here.

`PLAYWRIGHT_CHROMIUM_EXECUTABLE` overrides the browser binary for environments
that ship a pre-provisioned Chromium; leave it unset in CI.

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
	email: 'contact@awvaughan.com'
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

**Edit one file**: `src/lib/data/services.ts`. Append a `ServiceDetail` record
(see `src/lib/types/index.ts` for the shape) and everything follows from it:

- its page at `/services/<slug>`, rendered by `src/routes/services/[slug]/`
- its card on the homepage grid and the services listing
- its `<title>`, description, canonical, Open Graph tags and Schema.org `Service`
- its entry in `/sitemap.xml`
- its prerendered HTML (the `entries()` export in `[slug]/+page.ts` tells the
  prerenderer which slugs exist)

Then add its target terms to `docs/keyword-strategy.md`.

The four service pages used to be four near-identical `.svelte` files differing
only in strings, so every layout change meant four edits and the copies drifted.
Do not reintroduce a bespoke page for a service unless it genuinely needs a
different layout.

### Changing the Service Area

**Edit one list**: `SERVED` in `scripts/build-service-area-map.mjs`, then run:

```bash
npm run service-area-map
```

That regenerates `src/lib/data/service-area.ts`, and the map, the locality list,
the page copy's county and city counts, and the Schema.org `areaServed` all
follow from it. Boundaries come from `scripts/data/localities.geojson`, an
extract of the US Census cartographic boundary file for county-equivalents; add
a locality outside that extract and the script fails loudly rather than dropping
it silently.

Two things to know before editing the list:

- **Virginia's independent cities are not in any county.** Suffolk, Chesapeake,
  Virginia Beach, Williamsburg and Poquoson are city-equivalents, and the
  generator derives `kind` from the Census legal name so the page and the
  structured data cannot disagree about which is which. Counties emit
  `AdministrativeArea` (Schema.org has no county type); independent cities emit
  `City`.
- **Enclaves have to be included or explained.** Williamsburg and Poquoson are
  entirely surrounded by James City and York. Leaving an enclave out punches a
  visible hole through the middle of the shaded area, which reads as a rendering
  fault rather than a boundary.

Localities that are _not_ served but border the area are drawn once as a grey
backdrop. That is what makes the gap left by Norfolk, Portsmouth, Hampton and
Newport News read as four cities outside the service area rather than a hole.

Paths are emitted as integer relative deltas rather than absolute coordinates.
The viewBox is 1000 units wide and the map never renders wider, so a unit is
always under a pixel — and the data is inlined into the prerendered HTML _and_
bundled into the client chunk that hydrates the map, so every byte is paid for
twice. The encoding roughly halves it at no visible cost.

### Updating Images

Source photographs live in `static/` and are never served directly. Web-ready
derivatives are generated into `static/images/`:

```bash
npm run images   # scripts/optimize-images.mjs
```

The script emits, per photograph, an AVIF and a mozjpeg fallback at the source
width and at 480px, plus the 1200x630 `static/og-image.jpg` card. Measured on
these photographs: mozjpeg 172KB, WebP 205KB, AVIF 126KB — so WebP is not
generated, as it is larger than the fallback it would replace.

**To add or replace a photograph**:

1. Drop the source JPEG in `static/`.
2. Add its basename to `PHOTOS` in `scripts/optimize-images.mjs`.
3. Run `npm run images`.
4. Reference it with the `Picture` component, passing the **real** source
   dimensions — they set the aspect ratio the browser reserves, so a wrong value
   causes layout shift:

```svelte
<Picture
	name="about-image"
	alt="Descriptive alt text"
	width={844}
	height={1125}
	sizes="(min-width: 768px) 28rem, 100vw"
/>
```

Pass `priority` for the largest above-the-fold image on a page (the LCP
element); everything else lazy-loads.

**Alt text**: descriptive for content images. Empty (`alt=""`) for decorative
ones — the hero photograph is decorative because the headline beside it carries
the meaning, and a keyword-stuffed alt there just makes screen readers read
marketing copy before the content.

**Caching**: derivatives are named by width, not by content hash, and the
script rewrites them in place — so `/images/*` is **not** served as `immutable`.
`_headers` gives it a day of hard caching plus a week of
`stale-while-revalidate`, so repeat visitors get an instant image and a replaced
photograph still propagates within about a day. If instant propagation is ever
needed, fingerprint the output filenames and restore `immutable`; a test fails
if `immutable` reappears without that.

**Note**: the source JPEGs in `static/` are still deployed but nothing
references them. They can be removed once you are happy with the derivatives.

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

**Adapter**: `@sveltejs/adapter-cloudflare` (pinned; see Technology Stack)

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
- `CONTACT_RECIPIENT_EMAIL` - optional submission recipient override
- `TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` - set both or neither
- `META_PIXEL_TOKEN` - Meta Conversions API access token
- `META_LEAD_VALUE` - optional; estimated value of one lead, in USD. When unset
  the Lead event carries no value at all, which is deliberate: a hardcoded 0.0
  gives value-based bidding nothing to optimize toward while looking like a real
  measurement. Set it to enable value-based bidding.
- `META_AGENT_NAME` - Meta partner agent name (EMQ endpoint). This filters the
  Dataset Quality API to one partner agent's events; if it still names the
  retired Stape agent, the EMQ numbers are not about this site's own
  integration. See "The retired Stape gateway".
- `META_EMQ_ADMIN_SECRET` - shared secret for `/api/meta-emq`
- `META_TEST_EVENT_CODE` - optional, Meta Test Events only
- `HEALTH_CHECK_SECRET` - shared secret for `/api/health`

Bindings: a KV namespace named `LEADS` for the contact form fallback store.

**Verify configuration after deploying**:

```bash
curl -H "x-health-secret: $HEALTH_CHECK_SECRET" https://awvaughan.com/api/health
```

It reports which integrations are wired up (presence only, never values), so a
mistyped variable is visible immediately rather than weeks later from an absence
of leads.

**Preview/Development**:

- In `vite dev`, submissions are logged rather than sent, and CAPI is skipped.
- A **deployed** environment with missing mail credentials is treated as a
  failure, not as development.

### Build Settings

**Cloudflare Pages Configuration**:

- **Build command**: `npm run build`
- **Build output directory**: `.svelte-kit/cloudflare`
- **Node version**: 22+, taken from `.node-version` in the repository root.
  `@sveltejs/adapter-cloudflare` depends on `@cloudflare/kv-asset-handler`,
  which requires Node >= 22; on Node 20 `npm ci` fails with EBADENGINE before
  the build starts. Cloudflare Pages and `actions/setup-node` both read
  `.node-version`, so that file is the single source of truth — do not pin a
  Node version in the workflow or the Pages dashboard.
- **Root directory**: `/`

### Package manager: npm, and only one lockfile

**This project uses npm.** `package-lock.json` is the only lockfile, and
`npm ci` is what CI runs.

This matters more than it looks. Cloudflare Pages chooses its package manager by
**detecting whichever lockfile is in the repository** — it does not read a
`packageManager` field or any dashboard setting. The repository previously
carried `pnpm-lock.yaml` as well, so:

- CI installed from `package-lock.json` with npm
- the production deploy installed from `pnpm-lock.yaml` with pnpm

Two lockfiles, two dependency trees, and nothing keeping them in step. Any
dependency change updated one and not the other, so a branch could pass CI
while every Pages build failed with `ERR_PNPM_OUTDATED_LOCKFILE`, reporting the
_old_ dependency specifiers and looking for all the world like a stale cache.

`pnpm-lock.yaml` has been removed, and a test asserts exactly one lockfile
exists. **Never add a second one.** If you deliberately switch to pnpm, delete
`package-lock.json`, change `npm ci` in `.github/workflows/ci.yml`, and update
that test — all three together.

Note also that `.npmrc` sets `engine-strict=true`, so a Node version outside
`engines` is a hard `npm ci` failure rather than a warning. That is why the Node
20 mismatch stopped the install dead instead of printing a warning and
continuing.

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
2. **Don't use `$app/stores`** - use `$app/state`'s reactive `page`
3. **Don't break the typography system** - body text uses the 4 body sizes;
   headings get their size from the element scale, never a utility class
4. **Don't skip type checking** - Run `npm run check` before committing
5. **Don't commit without formatting** - Run `npm run format`
6. **Don't modify auto-generated files** - `.svelte-kit/` directory
7. **Don't use different design tokens** - Use values from `constants.ts`
8. **Don't add unnecessary dependencies** - Justify all new packages
9. **Don't set CSP outside `kit.csp`** - see Security Headers and CSP
10. **Don't hardcode `https://awvaughan.com`** - use `absoluteUrl()`/`SITE_URL`
11. **Don't return success for work that failed** - the contact endpoint reports
    what actually happened; a reassuring lie loses the lead and corrupts ad data
12. **Don't hash an empty normalized value** for Meta - omit the field instead

### Things to ALWAYS Do

1. **Always use TypeScript interfaces** - No `any` types
2. **Always add SEO metadata** - Every page needs a title, description and its
   own `canonical`
3. **Always include alt text** - All images need descriptive alt text
4. **Always sanitize user input** - Contact form and any user data
5. **Always add new routes to the generated sitemap source** - `_paths` in
   `src/routes/sitemap.xml/+server.ts` (service pages are automatic). A test
   asserts every route in `ROUTES` appears there, so a page added to the nav and
   not the sitemap fails rather than quietly going unindexed. The underscore is
   required: a `+server.ts` may only export handlers and its own config, so any
   other export has to be prefixed to be allowed through.
6. **Always test locally** - Run dev server before pushing
7. **Always use $lib imports** - Don't use relative paths for shared code
8. **Always follow Prettier rules** - Tabs, single quotes, 100 char width

### Security Headers and CSP — read this before touching either

Most pages are **prerendered** (`export const prerender = true` in
`+layout.ts`). Cloudflare Pages serves those straight off its asset handler, so
they **never enter the Worker** and `src/hooks.server.ts` cannot reach them —
`_routes.json` in the build output lists exactly which paths are excluded.
Anything set only in the hook protects `/contact` and `/api/*` and nothing else.

The split is therefore:

| Concern                 | Where it lives                                                                           | Covers                                                              |
| ----------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Content-Security-Policy | `kit.csp` in `svelte.config.js`                                                          | Everything: header on SSR routes, `<meta>` tag on prerendered pages |
| Other security headers  | `src/lib/config/security-headers.ts` (used by the hook) + `_headers` at the project root | SSR routes and static routes respectively                           |

**Rules**:

1. **Never set `Content-Security-Policy` in `hooks.server.ts` or `_headers`.**
   SvelteKit generates a per-page policy that allows its own inline hydration
   script by nonce or hash. A second policy intersects with it and blocks that
   script, breaking hydration with no visible error.
2. **`_headers` lives in the project root**, not `static/` — adapter-cloudflare
   requires it there and copies it into the build.
3. **Add a header to both places.** A test asserts `_headers` repeats every entry
   in `security-headers.ts`.
4. **`frame-ancestors` is not usable here** — it is ignored when a policy arrives
   via `<meta>`, which is how prerendered pages receive theirs. Clickjacking
   protection is carried by `X-Frame-Options` instead.
5. **Third-party hosts must be in the CSP.** `script-src` once omitted
   `connect.facebook.net`, which silently blocked `fbevents.js` on `/contact` —
   the only page that fires the `Lead` event. The inline stub still defined
   `window.fbq`, so events queued forever and `_fbp`/`_fbc` were never set,
   losing the highest-weighted Meta match keys on exactly the traffic that
   matters most (an ad click landing on `/contact`). Tests assert the hosts are
   present; an e2e test asserts no CSP violations on any route.
6. **The pixel bootstrap is a file** (`static/meta-pixel.js`), not an inline
   script, so `script-src` does not need `'unsafe-inline'`.

#### The retired Stape gateway

This site uses the **pure Meta implementation**: the browser pixel posts to
Facebook, and Conversions API events are sent server-side straight to
`graph.facebook.com` from `/api/contact`. Stape is no longer used.

A Stape **Conversions API Gateway** is nevertheless still configured in Meta
Events Manager, so with a real network `fbevents.js` reads it at runtime and
tries to post visitor events to:

- `https://capig.stape.st/events` — Stape
- `https://g3a3d23a843935-hgy3ps6pca-uc.a.run.app/events` — the Cloud Run
  service Stape hosts a per-customer gateway on

`connect-src` does not allow either, so the attempts are blocked. That is the
intended outcome and no change should be made to allow them. Nothing in this
repository references Stape.

**Remaining cleanup, in Meta Events Manager** (not in this repository):

1. Remove the Conversions API Gateway: Events Manager → the dataset for
   `META_PIXEL_ID` → Settings → Conversions API Gateway. Until this is done the
   pixel keeps making two blocked requests on every page view — harmless, but
   wasted, and the data would flow again if the CSP were ever relaxed.
2. Check `META_AGENT_NAME`. `/api/meta-emq` passes it to Meta's Dataset Quality
   API as `agent_name`, which filters Event Match Quality to events delivered by
   that partner agent. If it still names the Stape agent, the EMQ figures
   describe the retired gateway's traffic rather than this site's direct
   integration, and will read as empty or stale once the gateway is gone.
3. Then empty `RETIRED_GATEWAY_HOSTS` in `e2e/site.spec.ts`, so that any
   reappearance of a third-party endpoint fails the test.

The e2e test already fails on any blocked host that is not on that list, so a
new third-party endpoint added to the pixel configuration surfaces as a decision
rather than passing unnoticed.

### Security Considerations

**Contact Form**:

- Normalization strips control characters, folds CRLF, collapses blank lines, and
  trims. It deliberately **does not strip HTML tags**: the notification email is
  sent as `contentType: 'Text'`, so there is nothing to inject into, and the old
  tag regex ate real content — "I need a pad `<10 ft >` wide" arrived as "I need
  a pad wide", deleting the dimensions of the job. Anything that renders this
  text as HTML later must escape it at the point of rendering.
- Validation runs on the **normalized** values, so an input that is empty by the
  time it reaches the email is rejected rather than producing a nameless lead.
- Field length limits, plus a 64KB body ceiling checked before parsing.
- Email validation (regex check).
- No sensitive data in error messages; the `/api/meta-emq` endpoint logs
  upstream failures rather than reflecting Meta's status and message.
- Honeypot field plus Turnstile. Rate limiting remains a Cloudflare WAF rule.
- Every outbound fetch has an `AbortSignal.timeout`; the MS365 access token is
  cached per isolate instead of re-fetched on every submission; the Meta CAPI
  call is handed to `waitUntil` so the visitor does not wait on it.

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

**2026-09-14** - Service area map

- Added `/service-area`: an interactive map of the 10 counties and 5 independent
  cities served, drawn as inline SVG from US Census cartographic boundaries. No
  mapping library, no tile provider, no CSP change, and it prerenders, so the
  locality names are in the HTML a crawler sees rather than painted into tiles
- Boundaries are generated by `npm run service-area-map` from one `SERVED` list,
  which also drives the page copy's counts and the Schema.org `areaServed`
- `ROUTES` is now held against the sitemap by a test, so a page added to the nav
  cannot go unlisted

**2026-09-11** - Code review remediation

- Removed `pnpm-lock.yaml`. Cloudflare Pages detects its package manager from
  whichever lockfile is present, so the deploy had been installing with pnpm
  from a lockfile that CI never updated, while CI installed with npm from
  `package-lock.json`. A test now asserts exactly one lockfile exists.
- Node 22 is now required and declared once in `.node-version`; the pinned
  Cloudflare adapter's dependency tree does not install on Node 20

- Contact form: Turnstile site key moved to env (was a hardcoded placeholder that
  made the form unsubmittable); expired/duplicate tokens now recoverable; server
  error messages surfaced to the visitor; honeypot added
- Contact endpoint no longer reports success for submissions it failed to
  deliver; added a KV fallback store, request timeouts, token caching, a body
  size limit, and `waitUntil` for the Meta call
- CSP moved from `hooks.server.ts` to `kit.csp` so it covers prerendered pages,
  and widened to the hosts the Meta pixel actually uses (it was silently
  blocking the pixel on `/contact`); pixel bootstrap moved out of line
- Fixed per-page SEO: the layout read its own `data` instead of `page.data`, so
  every route shipped the homepage's title and canonical
- Meta CAPI: non-Latin names and accents normalized correctly, empty values
  omitted rather than hashed, NANP phone validation, client `event_id`
  validated, conversion value no longer hardcoded to zero
- Four duplicated service pages consolidated into `services/[slug]`
- Heading scale added; generated sitemap; image pipeline with AVIF derivatives
  and a correctly sized OG card; accessibility fixes in the header and hero
- Added `/api/health`, drift-guard tests, and a Playwright e2e suite

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
