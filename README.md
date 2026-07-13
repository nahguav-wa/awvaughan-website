# Alex Vaughan — Personal Site

A personal landing page and writing archive for Alex Vaughan, with essays and
field notes on construction technology and marketing.

Built with SvelteKit 2, Svelte 5, TypeScript, and Tailwind CSS v4. Articles are
authored in Markdown (via [mdsvex](https://mdsvex.pngwn.io/)). Deployed on
Cloudflare Pages.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command            | Description                         |
| ------------------ | ----------------------------------- |
| `npm run dev`      | Start development server            |
| `npm run build`    | Production build                    |
| `npm run preview`  | Preview production build            |
| `npm run check`    | TypeScript and Svelte type checking |
| `npm run lint`     | ESLint + Prettier checks            |
| `npm run format`   | Auto-format all files               |
| `npm run test`     | Run tests                           |
| `npm run coverage` | Run tests with coverage report      |

## Publishing an Article

Add a Markdown file to `src/lib/content/articles/`:

```markdown
---
title: My New Article
description: A one-line summary used for the listing and the social share card.
date: '2026-03-01'
tags:
  - marketing
# ogImage: /images/my-article.jpg   # optional per-article share image
# draft: true                        # optional; hides from listings + feed
---

Your article content in **Markdown**.
```

The slug comes from the filename (`my-new-article.md` → `/writing/my-new-article`).
The article automatically appears in the writing index, the homepage's latest
list, `/rss.xml`, and `/sitemap.xml`, and gets its own title/description/Open
Graph tags.

## Structure

- `/` — landing page (intro + latest writing)
- `/writing` — chronological article index
- `/writing/[slug]` — individual article, rendered with prose styling
- `/contact` — contact page
- `/rss.xml` — RSS feed
- `/sitemap.xml` — sitemap

## Archived Business Site

The previous A.W. Vaughan Company business website is preserved under
`archive/original-site/`. See that directory's `README.md` for how to restore it.

## Architecture

See `CLAUDE.md` for documentation on architecture, conventions, and workflows.
