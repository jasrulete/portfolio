# Portfolio

Jeric Rulete's personal portfolio: a single-page React app with no backend. The same
content is presented three ways — a classic scrolling page, a simulated desktop OS with
draggable windows, and a phone-style launcher — plus a Ctrl/Cmd+K command palette and a
Fuse.js FAQ chatbot.

Built with React 19, TypeScript, Vite and Tailwind CSS.

Live: https://jasrulete.github.io/portfolio/

## Getting started

Requires Node.js 18 or newer (Vite 6).

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

There is **no test runner configured** — `npm run test` does not exist.

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

## Project structure

```
index.html          Entry document, meta tags, CSP
public/             Static files copied as-is (PDFs, favicon, og-image)
src/components/     Classic sections, plus desktop/ and mobile/ OS chrome
src/data/           profile.ts (all portfolio content), faqData.ts, skill-match.ts
src/hooks/          Portfolio hooks; root lib/ and hooks/ hold shadcn-style utilities
```
