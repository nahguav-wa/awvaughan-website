---
name: 'SvelteKit Small Business Website Guide'
description: 'Complete development guide for the A.W. Vaughan Company, LLC website using SvelteKit, TailwindCSS, TypeScript, and Cloudflare Pages.'
category: 'Web Development'
author: 'Alex Vaughan'
authorUrl: 'https://awvaughan.com'
tags:
  - 'sveltekit'
  - 'tailwind'
  - 'typescript'
  - 'pnpm'
  - 'cloudflare'
  - 'git'
  - 'eslint'
  - 'prettier'
  - 'shadcn'
  - 'seo'
lastUpdated: '2024-05-27'
---

# A.W. Vaughan Company, LLC Website Development Guide

## Project Overview

This project delivers a **simple, elegant, SEO-optimized website** for **A.W. Vaughan Company, LLC**, focused on responsiveness, performance, and maintainability.

Key principles:

- **Fast**: Minimal dependencies, Cloudflare Pages hosting
- **SEO-first**: Metadata, structured data, sitemap/robots
- **Maintainable**: Clean, modular SvelteKit components
- **Branded**: Consistent colors, typography, icons

This is **not** a complex web app — keep it **lean** and **easy to maintain**.

## Tech Stack

- **Framework**: SvelteKit
- **Language**: TypeScript
- **Styling**: TailwindCSS + ShadCN
- **Package Manager**: PNPM
- **Hosting**: Cloudflare Pages / Workers
- **Version Control**: Git + GitHub
- **Lint/Format**: ESLint + Prettier

## Goals

1. **Improve SEO** with semantic HTML, metadata, sitemap, and OpenGraph tags.
2. **Brand Consistency** across pages and components.
3. **Reusable Components** for future SvelteKit projects.
4. **Simple, Readable, and Optimized** code with minimal complexity.

## Development Workflow

1. **Create a task** in your AI assistant or project board.
2. **AI assistant** generates code changes in a PR branch.
3. **Review & merge** PR into `main`.
4. **Cloudflare Pages** automatically deploys on merge.

## Project Directory Structure

    awvaughan-website/
    ├─ .gitignore
    ├─ .npmrc
    ├─ .prettierignore
    ├─ .prettierrc
    ├─ .vscode/
    │  └─ settings.json
    ├─ README.md
    ├─ _headers
    ├─ _redirects
    ├─ eslint/
    │  └─ rules/
    │     └─ require-img-alt.js
    ├─ eslint.config.js
    ├─ node_modules/                  # installed dependencies
    ├─ package.json
    ├─ pnpm-lock.yaml
    ├─ wrangler.jsonc
    ├─ src/
    │  ├─ app.config.ts
    │  ├─ app.css
    │  ├─ app.d.ts
    │  ├─ app.html
    │  ├─ lib/
    │  │  ├─ actions/
    │  │  │  └─ in-view.ts
    │  │  ├─ assets/
    │  │  │  └─ favicon.svg
    │  │  ├─ components/
    │  │  │  ├─ Footer.svelte
    │  │  │  ├─ Header.svelte
    │  │  │  ├─ Hero.svelte
    │  │  │  ├─ PageHero.svelte
    │  │  │  └─ icons/
    │  │  │     ├─ CoastalIcon.svelte
    │  │  │     ├─ EmergencyIcon.svelte
    │  │  │     ├─ ExcavatorIcon.svelte
    │  │  │     ├─ LeadershipIcon.svelte
    │  │  │     ├─ MaintenanceIcon.svelte
    │  │  │     ├─ ServiceIcon.svelte
    │  │  │     └─ WaterIcon.svelte
    │  │  ├─ data/
    │  │  │  ├─ content.ts
    │  │  │  └─ projects.ts
    │  │  ├─ index.ts
    │  │  └─ seo.ts
    │  ├─ routes/
    │  │  ├─ +error.svelte
    │  │  ├─ +layout.svelte
    │  │  ├─ +page.svelte
    │  │  ├─ +page.ts
    │  │  ├─ [...missing]/
    │  │  │  └─ +page.svelte
    │  │  ├─ [slug]/
    │  │  │  ├─ +page.server.ts
    │  │  │  └─ +page.svelte
    │  │  ├─ about/
    │  │  │  ├─ +page.svelte
    │  │  │  └─ +page.ts
    │  │  ├─ careers/
    │  │  │  ├─ +page.svelte
    │  │  │  └─ +page.ts
    │  │  ├─ contact/
    │  │  │  ├─ +page.svelte
    │  │  │  └─ +page.ts
    │  │  ├─ privacy-policy/
    │  │  │  ├─ +page.svelte
    │  │  │  └─ +page.ts
    │  │  ├─ projects/
    │  │  │  ├─ +page.svelte
    │  │  │  └─ +page.ts
    │  │  ├─ services/
    │  │  │  ├─ +page.svelte
    │  │  │  └─ +page.ts
    │  │  ├─ sitemap.xml/
    │  │  │  └─ +server.ts
    │  │  ├─ terms-of-service/
    │  │  │  ├─ +page.svelte
    │  │  │  └─ +page.ts
    │  │  └─ robots.txt/
    │  │     └─ +server.ts
    │  ├─ types/
    │  │  └─ lucide-svelte.d.ts
    │  └─ worker-configuration.d.ts
    ├─ static/
    │  └─ robots.txt
    ├─ svelte.config.js
    ├─ tsconfig.json
    └─ vite.config.ts

## Installation & Setup

    # prerequisites
    npm i -g pnpm
    pnpm install

    # dev server
    pnpm dev

    # lint & format
    pnpm lint
    pnpm format
    pnpm check

    # production build
    pnpm build

## Deployment (Cloudflare Pages)

    - Adapter: @sveltejs/adapter-cloudflare
    - Build command: pnpm build
    - Output: Auto-detected by Pages
    - Workers: Optional for forms, APIs, or dynamic routes

## SEO Checklist

    - <svelte:head> title, description, canonical URL per page
    - OpenGraph/Twitter meta tags
    - Sitemap (sitemap.xml) + robots (robots.txt)
    - Alt text for all images
    - Fast LCP: compressed hero images, preloaded fonts

## Component Guidelines

    - Small, reusable components
    - Tailwind utilities first; extract classes only if reused
    - ShadCN primitives for consistency
    - Props: variant, size, ariaLabel, etc.

## Future Enhancements

    - Structured data (schema.org) for rich results
    - Image optimization via Cloudflare Workers
    - Analytics integration (Plausible, Google Analytics)
    - Blog/news section for SEO growth

## Notes

    - This is a website, not a complex app
    - Avoid unnecessary complexity
    - Use static content whenever possible
    - Keep everything optimized for speed and SEO
