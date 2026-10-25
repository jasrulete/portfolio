# Portfolio

Jeric Rulete's personal portfolio: a single-page React app with no backend. The same
content is presented as a classic scrolling page and as "OS mode", a simulated operating
system that opens as a desktop with draggable windows on wide screens and as a phone home
screen below 768px. A Ctrl/Cmd+K command palette works everywhere. OS mode carries a few
extras that never load on the homepage, including a Fuse.js search over a hand-written FAQ.

Built with React 19, TypeScript, Vite and Tailwind CSS 4. The visual rules (colours, type,
the jer2x logo, voice, and what to avoid) live in [`docs/brand.md`](docs/brand.md).

Live: https://jasrulete.github.io/portfolio/

## Getting started

Requires Node.js 22 (the version in `.nvmrc`; older releases are end of life).

```bash
git clone https://github.com/jasrulete/portfolio.git
cd portfolio
npm install
cp .env.example .env   # then fill in VITE_WEB3FORMS_ACCESS_KEY
npm run dev            # http://localhost:5173
```

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check (`tsc -b`), then build to `dist/` |
| `npm run lint` | Run ESLint over the repo |
| `npm run preview` | Serve the production build locally |
| `npm run deploy` | Manual `gh-pages -d dist` publish (fallback only) |

There is **no test runner configured**: `npm run test` does not exist.

## Environment

`VITE_WEB3FORMS_ACCESS_KEY` powers the contact form (Web3Forms). Copy `.env.example` to
`.env` for local development. In CI it comes from the repo secret of the same name and is
injected at build time; without it, the contact form renders but is disabled.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs `npm ci && npm run
build` and publishes `dist/` to GitHub Pages.

The site is served from the `/portfolio/` base path (`base: "/portfolio/"` in
`vite.config.ts`), so any absolute asset path must go through `import.meta.env.BASE_URL`
or it will 404 in production.

## Security

`SECURITY.md` says how to report a problem. Dependencies are kept current by
Dependabot (weekly, with a one-week delay on brand-new releases), and the
`Dependency audit` workflow runs `npm audit` and checks registry signatures when
the lockfile changes and every Monday. CI installs with `npm ci --ignore-scripts`
and pins each GitHub Action to a commit hash; Dependabot keeps those pins fresh.

## Project structure

```
index.html          Entry document, meta tags, CSP
docs/brand.md       Brand guide; docs/brand/ holds the logo and OG image sources
.github/            CI deploy, dependency audit and Dependabot config
public/             Static files copied as-is (PDFs, favicons, og-image)
src/components/     Classic sections, plus desktop/ and mobile/ OS chrome
src/view-mode.ts    Classic / desktop OS / mobile OS selection
src/data/           profile.ts (all portfolio content), faqData.ts, skill-match.ts
src/hooks/          Portfolio hooks; root lib/ and hooks/ hold shadcn-style utilities
```
