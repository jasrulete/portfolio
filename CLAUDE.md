# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server (http://localhost:5173)
- `npm run build` — type-check (`tsc -b`) then produce the production build in `dist/`
- `npm run lint` — run ESLint over the repo
- `npm run preview` — serve the production build locally
- `npm run deploy` — manual `gh-pages -d dist` publish (rarely needed; see Deployment)

There is no test runner configured, despite the README's "Testing" section. Do not assume `npm run test` exists.

## Deployment

Deployment is automatic via GitHub Actions (`.github/workflows/deploy.yml`) on every push to `main` — it runs `npm ci && npm run build` and publishes `dist/` to GitHub Pages. The `npm run deploy` script is a fallback, not the primary path.

The site is served from the `/portfolio/` base path (`vite.config.ts` `base: "/portfolio/"`). Any absolute asset path must go through `import.meta.env.BASE_URL` (see `src/data/profile.ts`), or it will 404 on GitHub Pages.

## Environment

- `VITE_WEB3FORMS_ACCESS_KEY` powers the contact form (Web3Forms, zero-backend email delivery). Copy `.env.example` → `.env` for local dev; in CI it comes from the `VITE_WEB3FORMS_ACCESS_KEY` repo secret and is injected at build time.

## Architecture

React 19 + TypeScript + Vite + Tailwind CSS. Single-page app, no backend — all dynamic behavior is client-side.

### Dual view modes
`src/App.tsx` renders one of two entirely separate UIs, chosen by a `ViewMode` (`"classic" | "desktop"`) persisted to `localStorage` under `portfolio-view-mode`:

- **Classic** — a conventional scrolling portfolio: `hero-section` → `about-section` → `skills-section` → `projects-section` → `experience-section` → `contact-section` → `footer`, plus a fixed `FaqChatbot` and `ScrollProgress`.
- **Desktop** — a simulated OS in `src/components/desktop/`. `DesktopOS` wraps everything in `WindowManagerProvider`, renders draggable desktop icons, a `WindowLayer`, and a `Taskbar`. Each icon opens an app from `desktop/apps/` (About, Projects, Skills, Experience, Contact, Terminal, Chatbot) inside a `Window`; "Resume.pdf" is an external link instead of a window.

The two modes largely re-present the same content through different chrome. When editing portfolio *content*, expect to touch both a classic `*-section.tsx` and its `desktop/apps/*App.tsx` counterpart.

### Window manager
`src/components/desktop/window-manager.tsx` is a React Context (`useWindowManager`) holding an array of `WindowState`. It owns open/close/focus/minimize/maximize/bounds, a monotonically increasing z-index ref for stacking, and a cascade offset so new windows don't perfectly overlap. `Window.tsx` consumes this context for drag/resize. There is no external state library — this context is the only global store.

### Content lives in data files
`src/data/profile.ts` is the single source of truth for identity, contact info, roles, project filters, and asset URLs — components read from it rather than hardcoding. `src/data/faqData.ts` backs the chatbot.

### Zero-backend "AI"
`FaqChatbot.tsx` (and `desktop/apps/ChatbotApp.tsx`) is **not** an LLM — it uses Fuse.js fuzzy search over `faqData.ts` for client-side retrieval. It can only surface pre-written answers, never generates text. Do not wire it to an API.

### Live GitHub stats
`lib/use-github-stats.ts` fetches stars/forks/language/last-push from the public GitHub API for each project with a `github` URL, cached in `sessionStorage` for 1 hour (unauthenticated, 60 req/hr/IP). Surfaced via `github-stats-badge.tsx`.

## Conventions

- **No path aliases.** Imports are relative. Note the two hook locations: `src/hooks/` (portfolio hooks) and root-level `hooks/` + `lib/` (shadcn-style utilities like `lib/utils.ts`'s `cn()`); `tsconfig.app.json` only `include`s `src`, so root `lib/`/`hooks/` are pulled in transitively via relative imports.
- Component files are kebab-case (`hero-section.tsx`); desktop app components are PascalCase (`AboutApp.tsx`).
- Dark mode is a `dark` class toggled on a wrapper div in `App.tsx` (Tailwind `dark:` variants), seeded from `prefers-color-scheme`.
- UI variants use `class-variance-authority` + `tailwind-merge` via `cn()`.
