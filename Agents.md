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
lastUpdated: '2025-12-22'
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
2. **AI assistant** generates code changes in a PR branch (e.g., using xAI tools at https://x.ai/api).
3. **Review & merge** PR into `main`.
4. **Cloudflare Pages** automatically deploys on merge.

## Project Directory Structure

(Omitted for brevity—use GitHub tree view for latest.)

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

- Semantic headings and alt text on all images.
- Meta tags in layout.svelte.
- Sitemap and robots generated dynamically.
- Mobile-first responsive design for Google rankings.