# The A.W. Vaughan Company Website

Professional business website for The A.W. Vaughan Company — a gravel driveway repair and drainage solutions contractor serving Virginia Beach and the 757 area.

Built with SvelteKit 2, Svelte 5, TypeScript, and Tailwind CSS v4. Deployed on Cloudflare Pages.

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

## Environment Variables

Copy `.env.example` and fill in values for email sending and CAPTCHA. See `CLOUDFLARE_EMAIL_SETUP.md` for full details.

## Architecture

See `CLAUDE.md` for comprehensive documentation on architecture, conventions, and workflows.
