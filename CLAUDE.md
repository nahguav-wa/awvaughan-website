# CLAUDE.md - AI Assistant Documentation

**Project**: Alex Vaughan — Personal Site
**Repository**: awvaughan-website

This document guides AI assistants working on this codebase. The site is a
personal landing page and Markdown-driven writing archive.

> **History**: This repo was originally the business website for The A.W. Vaughan
> Company (a gravel driveway / drainage contractor). It was refactored into a
> personal site. The complete original code is preserved under
> `archive/original-site/` (and in git history at commit
> `127a7b3a20a9ba5c97203948c9a631e015d047ed`).

---

## Technology Stack

- **SvelteKit 2** + **Svelte 5** (Runes: `$props`, `$state`, `$derived`)
- **TypeScript** (strict)
- **Tailwind CSS v4** with `@tailwindcss/typography` for article prose
- **mdsvex** — compiles Markdown articles to Svelte components
- **Vite 7**, **Vitest** for tests
- **Cloudflare Pages** deployment via `@sveltejs/adapter-auto`

---

## Site Structure

| Route             | File                                 | Purpose                       |
| ----------------- | ------------------------------------ | ----------------------------- |
| `/`               | `routes/+page.svelte`                | Landing page (intro + latest) |
| `/writing`        | `routes/writing/+page.svelte`        | Article index                 |
| `/writing/[slug]` | `routes/writing/[slug]/+page.svelte` | Single article (prose)        |
| `/contact`        | `routes/contact/+page.svelte`        | Contact page                  |
| `/rss.xml`        | `routes/rss.xml/+server.ts`          | RSS feed                      |
| `/sitemap.xml`    | `routes/sitemap.xml/+server.ts`      | Sitemap                       |

The whole site is prerendered (`export const prerender = true` in `+layout.ts`).

---

## Articles (Content System)

Articles are Markdown files in **`src/lib/content/articles/*.md`** with YAML
frontmatter. mdsvex compiles them; the loader in **`src/lib/content/index.ts`**
eagerly imports them via `import.meta.glob` and exposes:

- `getPublishedArticles()` — non-draft metadata, newest first
- `getArticle(slug)` — `{ meta, component }` (drafts included, for preview)
- `formatDate(iso)` — human-readable date

### Frontmatter

```yaml
---
title: Article Title # required
description: One-line summary for listings + share cards # required
date: '2026-03-01' # required, ISO
slug: custom-slug # optional (defaults to filename)
tags: [marketing] # optional
ogImage: /images/x.jpg # optional per-article OG image
draft: true # optional; hides from listings/feed, sets noindex
---
```

### Adding an article

Drop a `.md` file into `src/lib/content/articles/` and push. It automatically
appears in the index, homepage latest list, RSS feed, and sitemap, and gets its
own SEO/OG tags. **No route or config edits needed.**

Article resolution note: the `[slug]` route's `load` returns only serializable
data (meta + SEO). The mdsvex **component** is resolved in `+page.svelte` via
`getArticle(data.slug)`, keeping `load` output serializable.

---

## SEO

`src/lib/utils/seo.ts` centralizes SEO:

- `getDefaultSEO(overrides?)` — base metadata for regular pages
- `getArticleSEO(meta)` — article title/description/canonical + Open Graph
  (`og:type=article`, `article:published_time`)
- `getArticleSchema` / `getPersonSchema` / `getWebsiteSchema` — JSON-LD

Each page's `load` returns a `seo` object (and optionally `structuredData`).
`+layout.svelte` reads `$page.data.seo` / `$page.data.structuredData` and renders
the `SEOHead` component, so page-level metadata overrides the site defaults.

**Every article must have a `title` and `description`** — they drive the
`<title>`, meta description, and the Open Graph/Twitter share card.

---

## Configuration

`src/lib/config/site.ts` holds site identity — `SITE` (name, title, description,
intro, url, email), `NAV_LINKS`, and `SOCIAL_LINKS`. Update copy there; it
propagates to the header, footer, SEO, and structured data. The `intro`/bio
values are placeholders meant to be edited.

---

## Components

- `components/layout/` — `Header`, `Footer` (minimal, driven by `NAV_LINKS`)
- `components/ui/` — `Button`, `Card`, `Section` primitives
- `components/ArticleCard.svelte` — one entry in a listing
- `components/seo/SEOHead.svelte` — meta tags + JSON-LD

All are re-exported from `src/lib/index.ts`; import via `import { X } from '$lib'`.

---

## Styling

`src/app.css` imports Tailwind v4, the typography plugin, defines a dark-mode
variant, and a warm accent palette under the `primary-*` name. Article bodies use
the `prose` classes (`prose prose-stone dark:prose-invert`). Outside article
prose, keep type restrained (roughly `text-sm`–`text-2xl`, `font-normal`/`bold`).

---

## Conventions

- Svelte 5 Runes only (`$props`, `$state`, `$derived`).
- Use TypeScript interfaces from `src/lib/types/index.ts`; no `any`.
- Import shared code via `$lib`.
- Prettier: tabs, single quotes, no trailing commas, 100-char width.
- **Before committing:** `npm run check`, `npm run lint`, `npm run test`,
  `npm run build` (this is exactly what CI runs).

## Archive

`archive/` is excluded from lint, type-check, and the build. Do not edit it; it
exists only to restore the old business site if ever needed.
