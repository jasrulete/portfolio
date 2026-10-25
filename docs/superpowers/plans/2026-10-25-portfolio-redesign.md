# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the classic portfolio into the approved "technical dark, mango amber" design with the jer2x/j² logo, device-aware OS mode, the Design Lab removed, and a brand guide in the repo.

**Architecture:** Semantic colour tokens live as CSS variables in `src/index.css` (one set for light, one under `.dark`), exposed to Tailwind as named colours, so every component writes `bg-surface text-ink` instead of gray/blue literals and the light theme comes free. View mode becomes a three-value type resolved by a small pure module. Content stays in `src/data/profile.ts`, which gains the fields the new layout needs (`tier`, `summary`, `facts`, `compact`).

**Tech Stack:** React 19, TypeScript 5.7, Vite 6, Tailwind CSS 3.4, lucide-react, IBM Plex Sans + Mono from Google Fonts.

**Spec:** `docs/superpowers/specs/2026-10-24-portfolio-redesign-design.md`. Approved mockup: `docs/superpowers/specs/2026-10-24-portfolio-redesign-mockup.html` (open it in a browser before Tasks 6–8).

## Global Constraints

- **Never `git commit` or `git push`.** Jeric commits personally. Every task ends with changes left in the working tree. The "Commit" step in each task is replaced by a working-tree check.
- There is no test runner, so do not add one. Each task's tests are `npm run build`, `npm run lint`, and browser checks against the `dev` preview (`preview_start {name: "dev"}`, http://localhost:5173/portfolio/), using `javascript_tool` and `read_page`. Take screenshots only if the pane is visible.
- Dark tokens: canvas `#101113`, surface `#17181B`, line `#26282C`, ink `#ECECEC`, muted `#9A9DA3`, accent `#FFB547`, accent-fill `#FFB547`, on-accent `#1E1404`, focus ring `#FFB547`.
- Light tokens: canvas `#FAFAF9`, surface `#FFFFFF`, line `#E4E4E2`, ink `#151515`, muted `#5F6368`, accent (text) `#9A5B00`, accent-fill `#FFB547`, on-accent `#1E1404`, focus ring `#9A5B00`.
- Fonts: IBM Plex Sans for all text. IBM Plex Mono only for code-like data (numbers with units, dates, stack names, the wordmark). Never use mono for eyebrows or labels.
- The photo stays in colour.
- Anti-goals:
  - **Visual:** no gradients of any kind, no glow, glass/`backdrop-blur` on content, grid backgrounds, pulsing badges, coloured left borders, emoji icons, ALL-CAPS tracked eyebrows, or decorative `→`/`▹`/`·` separators.
  - **Motion:** no count-up and no scrambled text.
  - **Copy:** no em dashes, "not just X but Y", "craft", "passionate", "elevate", "unlock" or "empower".
- Every visible fact must trace to `profile.ts` or the existing copy.
- Keep: the `/portfolio/` base path via `import.meta.env.BASE_URL`, the CSP meta, WCAG AA contrast in both themes, visible focus rings, 44 px touch targets, the skip link, `prefers-reduced-motion`, and lazy boundaries (no OS code or Fuse.js in the classic bundle).
- Section order is mirrored in `App.tsx`, `navbar.tsx`, `src/hooks/use-active-section.ts` and `command-palette.tsx`. Change all four together.
- Content edits touch both the classic section and its `desktop/apps/*App.tsx` counterpart.

## Review Focus

1. **Returning visitor with `portfolio-theme = "light"` saved by the old site.** Light must still load with no dark flash, because a saved choice beats the new dark default. Test: Task 1, Step 6.
2. **Old `sessionStorage` value, or a junk value, for `portfolio-view-mode`.** `"desktop"` keeps working; `"mobile"` opens the phone OS; anything else falls back to classic and never shows a blank screen. Test: Task 4, Step 5.
3. **`?view=desktop` on a phone-width viewport.** This opens the desktop OS, not the mobile OS (spec call). After entering an OS, resizing across 768 px does not swap OS. Test: Task 4, Step 5.
4. **A skill filter that matches only list projects (e.g. NetLogo), or only tiles.** The empty group disappears, and its heading must not linger. A filter matching nothing shows the existing empty state. Test: Task 7, Step 4.
5. **Phone menu closed state.** The menu's links, Open OS mode and Résumé are not focusable while closed (`inert`), and the OS-mode button inside the menu closes the menu before switching. Test: Task 6, Step 5.

---

### Task 1: Design tokens, fonts, dark default, brand guide

**Files:**
- Modify: `tailwind.config.js`
- Modify: `src/index.css`
- Modify: `index.html` (font link, `theme-color`, pre-paint script, CSP hash)
- Modify: `src/App.tsx` (theme default, `<html>` background)
- Create: `docs/brand.md`

**Interfaces:**
- Produces Tailwind colours that every later task uses:
  - `canvas`, `surface`, `line`, `ink`, `muted`
  - `accent` (readable accent for text, links, borders and icons)
  - `accent-fill` (button fill)
  - `on-accent` (text on the fill)
  - `focus` (ring colour)

  All are defined as `rgb(var(--c-<name>) / <alpha-value>)`.
- Produces `fontFamily.sans` = `["IBM Plex Sans", ...defaultTheme.fontFamily.sans]` and `fontFamily.mono` = `["IBM Plex Mono", ...defaultTheme.fontFamily.mono]`. Keep the `display` key temporarily, pointing at the sans stack, so OS files compile until Task 10 removes the remaining `font-display` uses.

- [ ] **Step 1: Define the variables in `src/index.css`.** Use space-separated RGB channels, e.g. `--c-canvas: 250 250 249;`. Put the light values on `:root` and the dark values on `.dark`, using the hex values from Global Constraints. Set `body` to `font-family: theme(fontFamily.sans)`. Delete the `.dark { @apply bg-gray-900 text-white; }` rule and replace it with `.dark { background-color: rgb(var(--c-canvas)); color: rgb(var(--c-ink)); }`. Set `::selection` to `background: #FFB547; color: #1E1404;` in both themes. Keep `.card-enter`, `.prose-flow`, the details-marker rule and `dark-preload` handling.
- [ ] **Step 2: Wire the colours and fonts in `tailwind.config.js`** as described under Interfaces. Remove the custom `bounce`/`pulse` animation and keyframe overrides only if `grep -rn "animate-bounce\|animate-pulse" src` finds no use outside files deleted in Task 3. Otherwise leave them for now.
- [ ] **Step 3: Update `index.html`.**
  - Replace the Google Fonts link with `https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap`.
  - Set `<meta name="theme-color" content="#101113" />`.
  - Replace the pre-paint script with exactly this text, on one line between the tags:

  ```
  (function(){try{var t=localStorage.getItem("portfolio-theme");var d=t?t==="dark":true;if(d){document.documentElement.style.backgroundColor="#101113";document.documentElement.style.colorScheme="dark";document.documentElement.classList.add("dark-preload")}}catch(e){}})()
  ```

  - Recompute its hash and replace the `sha256-…` entry in the CSP. Update the comment above the script so it no longer mentions `design/index.html`.

  ```bash
  printf '%s' '<exact script text>' | openssl dgst -sha256 -binary | base64
  ```

- [ ] **Step 4: Update `src/App.tsx`.** The initial `darkMode` becomes `stored ? stored === "dark" : true`; delete the `matchMedia` fallback. The `<html>` background in the effect becomes `"#101113"`. Swap the wrapper classes `bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white` for `bg-canvas text-ink`.
- [ ] **Step 5: Write `docs/brand.md`.** Sections, in order:
  1. Purpose: who the site is for, from the spec Intent.
  2. Colour tokens: a table with both themes, each token's role, and the measured contrast for ink/muted/accent on canvas and surface.
  3. Type: the Plex rules and when mono is allowed.
  4. Logo: `jer2x_` wordmark and `j²` icon, minimum size 16 px, clear space of one "j" height, and don'ts (no recolouring the `_`/`2` beyond the accent, no effects).
  5. Spacing and radius: the values Task 6 settles on.
  6. Component patterns: feature tile, tile, list row, buttons, links, focus ring.
  7. Motion: the one `.card-enter` entrance, reduced motion.
  8. Voice and copy rules.
  9. The AI-slop "don't" list with the source URLs and caveat copied from the spec's Anti-goals section.

  Fill in sections 5 and 6 at the end of Task 7, once the values exist.
- [ ] **Step 6: Verify.** Run `npm run build`, then `npm run lint`. Expected: both pass, with only the pre-existing `window-manager.tsx` fast-refresh warning. Then, in the dev preview:
  - `localStorage.clear(); location.reload()`, then evaluate `getComputedStyle(document.body).fontFamily.includes("IBM Plex Sans")`. Expected `true`. The wrapper's `.dark` class should be present, so dark is the default.
  - `localStorage.setItem("portfolio-theme","light"); location.reload()`. Expected: no `.dark` class on the wrapper, and `document.documentElement.style.backgroundColor === ""`. `read_console_messages {onlyErrors:true}` should show no CSP error.
- [ ] **Step 7: Working-tree check.** `git status` lists the files above as modified or new. Do not commit.

### Task 2: Logo, wordmark component, favicon and PNG fallback

**Files:**
- Create: `src/components/wordmark.tsx`
- Modify: `public/favicon.svg`
- Replace: `public/logo.png` (512×512 render of the icon)
- Create: `docs/brand/logo-icon.svg` (master copy, same as the favicon)

**Interfaces:**
- Consumes: Task 1 tokens.
- Produces:
  - `export function Wordmark({ className }: { className?: string }): JSX.Element`. It renders `jer2x` plus `_` in `font-mono font-semibold`, with the `_` in `text-accent`, `aria-hidden` on the visual text, and an `sr-only` "Jeric Rulete".
  - `export function JSquaredIcon({ size = 32, className }: { size?: number; className?: string }): JSX.Element`. It renders the favicon artwork as inline SVG with `aria-hidden`.

- [ ] **Step 1: Draw `public/favicon.svg`.** Use a 32×32 viewBox, an opaque `#17181B` rounded square (rx 7) with a 1 px `#26282C` stroke, a stroked-path lowercase "j" in `#ECECEC`, and a smaller stroked-path "2" in `#FFB547` at the superscript position. Paths only, no `<text>`. Keep the explanatory comment style of the old file. Copy it to `docs/brand/logo-icon.svg`.
- [ ] **Step 2: Render `public/logo.png` at 512×512 with headless Edge.** If Edge is missing, use Chrome at `C:\Program Files\Google\Chrome\Application\chrome.exe`.

  ```bash
  "/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless=new --disable-gpu --screenshot="C:/@JERIC/Coding/portfolio/public/logo.png" --window-size=512,512 --default-background-color=00000000 "file:///C:/@JERIC/Coding/portfolio/docs/brand/logo-icon-512.html"
  ```

  `docs/brand/logo-icon-512.html` is a minimal page with `html,body{margin:0}` and an `<img src="logo-icon.svg" width="512" height="512">`. Keep it next to the master so the PNG can be regenerated.
- [ ] **Step 3: Implement `wordmark.tsx`** with the two exports above. `JSquaredIcon` reuses the same path data as the favicon, as a single source string constant in that file.
- [ ] **Step 4: Verify.**
  - `npm run build` passes.
  - Open `http://localhost:5173/portfolio/favicon.svg` in the preview. Expected: it renders, and `read_page` shows an svg.
  - Read `public/logo.png` with the Read tool. Expected: a 512 px j² on a dark square.
  - Check the 16 px legibility by zooming a screenshot of the browser tab if the pane is visible. Otherwise check by rendering the SVG at 16 px in a scratch page.
- [ ] **Step 5: Working-tree check.** Do not commit.

### Task 3: Remove the Design Lab and the AI-tell effects

**Files:**
- Delete:
  - `design/index.html` (and the `design/` folder)
  - `src/design-main.tsx`
  - `src/components/design-lab-page.tsx`
  - `src/components/design-lab-section.tsx`
  - `src/components/design-lab-3d.tsx`
  - `src/components/desktop/apps/DesignLabApp.tsx`
  - `src/components/count-up.tsx`
  - `src/components/decrypted-text.tsx`
  - `src/components/hero/` (swarm files, which nothing outside the folder imports)
- Modify:
  - `vite.config.ts` (single entry)
  - `src/data/os-apps.tsx` (remove the DesignLab lazy import, its `OS_APPS` entry and the `Palette` icon import)
  - `src/components/section-heading.tsx` (plain heading)
  - `src/components/projects-section.tsx` and `src/components/footer.tsx` (remove the design-system links)
  - `src/data/faqData.ts` (remove the "design lab" keyword entry and the sentence about the design-system page at line 77)
  - `tailwind.config.js` (remove the Design Lab comment in `future`)

**Interfaces:**
- Produces `SectionHeading({ title, className? })`. It renders a plain `<h2>` in `text-2xl sm:text-3xl font-semibold tracking-tight text-ink`, with no accent rule and no `DecryptedText`. `className` keeps today's meaning: it defaults to `mb-8 sm:mb-10` and replaces that margin entirely when passed.

- [ ] **Step 1: Delete the files listed** and make the modifications above. In `vite.config.ts`, drop `build.rollupOptions.input` and its comment.
- [ ] **Step 2: Rewrite `SectionHeading`** to the interface above.
- [ ] **Step 3: Verify.**
  - `npm run build`. Expected: passes, and the output lists no `design/index.html` (`ls dist` has no `design` folder).
  - `npm run lint` passes.
  - Run the grep below. Expected: no matches in `src/`, `index.html`, `vite.config.ts` or `tailwind.config.js`. CLAUDE.md and README are handled in Task 12.

  ```bash
  grep -rn "design-lab\|DesignLab\|design-main\|DecryptedText\|CountUp\|decrypted-text\|count-up\|swarm" src index.html vite.config.ts tailwind.config.js
  ```

  - In the dev preview, the page renders section headings as plain text, and the console shows no errors.
- [ ] **Step 4: Working-tree check.** Do not commit.

### Task 4: Three-way view mode and OS-mode entry points

**Files:**
- Create: `src/view-mode.ts`
- Modify: `src/App.tsx`
- Modify: `src/components/command-palette.tsx`
- Modify: `src/components/navbar.tsx` (add the button; Task 6 styles it)
- Modify: `src/components/footer.tsx` (rename the prop and reword the link)
- Modify: `src/components/mobile/MobileOS.tsx` (remove the "Intentionally unlinked" comment)

**Interfaces:**
- Produces, in `src/view-mode.ts`:
  - `export type ViewMode = "classic" | "desktop" | "mobile";`
  - `export const OS_BREAKPOINT = 768;`
  - `export function osModeForWidth(width: number): "desktop" | "mobile"`, which returns `"desktop"` when `width >= OS_BREAKPOINT`.
  - `export function initialViewMode(search: string, stored: string | null): ViewMode`. A `?view=` value of `desktop` or `mobile` wins. Otherwise it returns `stored` if it is a valid `ViewMode`, else `"classic"`.
- Produces an `onOpenOs: () => void` prop, defined in `App.tsx` as `() => setMode(osModeForWidth(window.innerWidth))`. It is passed to:
  - `Navbar` (new prop `onOpenOs?`)
  - `ProjectsSection` (new prop `onOpenOs?`, used in Task 7)
  - `Footer` (prop renamed from `onDesktopMode` to `onOpenOs`)
- `CommandPalette` imports `ViewMode` and `osModeForWidth` from `../view-mode`. Its `VIEW_MODES` list is replaced by two commands:
  - in classic: **"Open OS mode"**, keywords `os desktop mobile phone windows`, icon `MonitorSmartphone`, which calls `setViewMode(osModeForWidth(window.innerWidth))`;
  - in either OS: **"Back to classic view"**, icon `LayoutTemplate`.

- [ ] **Step 1: Write `src/view-mode.ts`** to the interface above.
- [ ] **Step 2: Wire `App.tsx`.**
  - Replace the inline `ViewMode` type and initial-state logic with `initialViewMode(location.search, sessionStorage.getItem(MODE_KEY))`.
  - Add `const MobileOS = lazy(() => import("./components/mobile/MobileOS"));`.
  - Render it when `mode === "mobile"`, with `onExit={() => setMode("classic")}` and `onOpenPalette`, in the same `Suspense`/`ModeLoadingFallback` shell as `DesktopOS`.
  - Keep the `?view` stripping effect unchanged.
- [ ] **Step 3: Add the OS entry points.**
  - **Command palette:** add the two commands above.
  - **Navbar:** add a plain `<button type="button" onClick={onOpenOs}>Open OS mode</button>` in both the desktop row and the mobile menu. The mobile one also calls `setIsMenuOpen(false)` first.
  - **Footer:** the link text becomes "This site also runs as an operating system". Drop the trailing `→`.
- [ ] **Step 4: Verify the build.** `npm run build` and `npm run lint` pass. Then `grep -rn "MobileOS" src` shows the `App.tsx` lazy import.
- [ ] **Step 5: Verify in the browser (Review Focus 2 and 3).** In the dev preview, run each case from a fresh tab state (`sessionStorage.clear()` first):
  1. `resize_window {width: 1280, height: 800}`. Click the navbar "Open OS mode". Expected: `document.querySelector('[class*="fixed inset-0"]')` exists, the taskbar text is present, and `sessionStorage.getItem("portfolio-view-mode") === "desktop"`.
  2. `resize_window {preset: "mobile"}`, reload in classic, and click the menu's "Open OS mode". Expected: the mobile OS renders (`read_page` finds "Back to home screen" or the clock) and the stored value is `"mobile"`.
  3. Still at mobile width, navigate to `?view=desktop`. Expected: the desktop OS renders and the URL has no `view` param afterwards.
  4. While in the desktop OS, `resize_window {width: 500, height: 800}`. Expected: the desktop OS is still shown (no swap).
  5. `sessionStorage.setItem("portfolio-view-mode","banana"); location.reload()`. Expected: the classic page renders.
  6. In each OS, Ctrl+K then "Back to classic view". Expected: the classic page.

  Reset with `resize_window {preset: "desktop"}`.
- [ ] **Step 6: Working-tree check.** Do not commit.

### Task 5: Content data for the new layout

**Files:**
- Modify: `src/data/profile.ts`

**Interfaces:**
- Produces, on every `projects[]` entry:
  - `tier: "feature" | "tile" | "list"`
  - `summary: string`
- Produces, on ShelfStock only: `facts: readonly { value: string; label: string }[]`. Consumers check `"facts" in project`.
- Produces `compact: true` on the "Volunteer Work" and "Manager & Operations Support" experience entries. Consumers check `"compact" in item`.

- [ ] **Step 1: Add the fields with these exact values**, keeping the existing project order:

  | Project | tier | summary |
  |---|---|---|
  | ShelfStock | feature | An online store whose checkout locks the stock row, so two buyers can't both take the last unit. Comes with an Android app for packing orders. |
  | Nexus CRM | tile | A CRM with AI lead scoring that still works with no API key, tested against prompt injection. |
  | Kitchen Line Supply (Shopify Theme) | tile | A Shopify theme written from an empty folder. Cart and filters work with JavaScript off. |
  | Pulse | list | Take-home assessment: fixed a broken WebRTC map app and closed 7 security issues. |
  | Context-Aware Edge Security Framework | list | Thesis: smart-home encryption that adapts to context. 63% faster responses and 27% less energy than static encryption. |
  | Bridge Degradation Agent-Based Model | list | A NetLogo model of how a bridge deck wears out. Coastal exposure degraded it 3× faster than inland. |
  | AmBot (Trading Strategy Research) | list | Tested seven trading strategies over 36 years of market data. None of them beat buy-and-hold. |

  ShelfStock `facts`: `[{ value: "262", label: "API tests" }, { value: "8.9 ms", label: "search on 40k rows" }, { value: "Live", label: "on Vercel" }]`.
- [ ] **Step 2: Remove `projectFilters`.** Nothing reads it; confirm with grep first.
- [ ] **Step 3: Verify.** `npm run build` passes, which proves the `as const` typing still satisfies the consumers. Then `grep -c "tier:" src/data/profile.ts` returns `7`.
- [ ] **Step 4: Working-tree check.** Do not commit.

### Task 6: Navbar and hero

**Files:**
- Modify: `src/components/navbar.tsx`
- Modify: `src/components/hero-section.tsx`
- Modify: `src/hooks/use-active-section.ts` (no change to ids; check only)

**Interfaces:**
- Consumes:
  - `Wordmark` (Task 2)
  - `onOpenOs` (Task 4)
  - tokens (Task 1)

- [ ] **Step 1: Restyle the navbar to the mockup.**
  - Use `bg-canvas/95 border-b border-line`, with no `shadow-md` and no `backdrop-blur`.
  - Put the `Wordmark` on the left, linking to `#home`.
  - Desktop row: Work (`#projects`), Experience, About, Contact, then "Open OS mode" (bordered `border-line`), the Résumé text link, the palette button and the theme toggle.
  - Active link: `text-accent` with the existing 2 px underline in `bg-accent`.
  - Phone bar: Wordmark, theme toggle and menu button. The menu holds the four links, Open OS mode and Résumé. Keep `inert={!isMenuOpen}` and `aria-expanded`.
  - All focus rings use `focus-visible:ring-focus` with an offset matching `ring-offset-canvas`.
- [ ] **Step 2: Rebuild the hero to the mockup.**
  - Two-column grid (`lg:grid-cols-[1fr_auto]`) with the photo (`src/assets/profile.webp`, in colour, about 190×230, `rounded-md`, `loading="eager"`) on the right. On phones the photo sits above the text at about 96×110.
  - Copy, exactly:
    - Availability line: `<strong className="text-ink font-medium">Available now</strong> for contract work and full-time developer roles. Based in Cebu City.` in `text-muted text-sm`.
    - h1: `I build full-stack web apps, and I write the tests that keep them working.` in `text-4xl sm:text-5xl font-bold tracking-tight`.
    - Lede: `Mostly Next.js, TypeScript and PostgreSQL. I like finding the bug that only shows up when two people click at the same moment, fixing it, and writing down why.` On phones only the first sentence shows (wrap the second in `hidden sm:inline`).
  - Buttons: "See projects" (`#projects`, `bg-accent-fill text-on-accent`) and "Download résumé (PDF)" (`download="Jeric-Rulete_Resume.pdf"`, `border border-line`).
  - Delete the old text-link row, the name h1 and `CTA_FOCUS` if it becomes unused.
- [ ] **Step 3: Settle spacing and radius values.** Use them from here on, and record them for `docs/brand.md`. Page gutter `px-4 sm:px-6 lg:px-8`, `max-w-6xl`; section padding `py-16 sm:py-24`; card radius `rounded-lg` (10 px is close enough); button radius `rounded-md`.
- [ ] **Step 4: Verify the build and layout.**
  - `npm run build` and `npm run lint` pass.
  - At 1440, 768 and 375 widths, in both themes: `document.documentElement.scrollWidth <= innerWidth` is true.
  - The h1 text equals the copy above.
  - `getComputedStyle(document.querySelector('#home img')).filter === "none"`, so the photo is not greyscale.
- [ ] **Step 5: Verify the phone menu (Review Focus 5).** At the `mobile` preset, with the menu closed, `document.querySelector('nav [inert]')` exists and its links are not reachable by Tab. Open the menu, press "Open OS mode", and confirm the mobile OS opens with no leftover open menu after "Back to classic view".
- [ ] **Step 6: Check contrast** with the Task 1 token pairs: accent text on canvas in light measures at least 4.5:1, using `#9A5B00` on `#FAFAF9`.
- [ ] **Step 7: Working-tree check.** Do not commit.

### Task 7: Selected work: feature tile, tiles, OS-mode tile, list rows, filter

**Files:**
- Modify: `src/components/project-card.tsx`. Replace `ProjectCard` with `FeatureTile`, `ProjectTile` and `ProjectRow`. Keep `ProjectLinks`, `CaseStudy`, `TagList` and the image map, restyled.
- Create: `src/components/os-mode-tile.tsx`
- Modify: `src/components/projects-section.tsx`
- Modify: `src/components/desktop/apps/ProjectsApp.tsx` (only if it imports `ProjectCard` directly)

**Interfaces:**
- Consumes:
  - `tier`, `summary` and `facts` (Task 5)
  - `onOpenOs?` (Task 4)
  - `SectionHeading` (Task 3)
- Produces:
  - `FeatureTile({ project, priority })`
  - `ProjectTile({ project })`
  - `ProjectRow({ project })`, all taking `project: Project`
  - `OsModeTile({ onOpen }: { onOpen: () => void })`
  - `ProjectsSection` renders `OsModeTile` only when `onOpenOs` is given, so the desktop OS's Projects app shows no tile.

- [ ] **Step 1: Build the tiles.**
  - **`FeatureTile`:** spans two rows in a `md:grid-cols-[1.55fr_1fr]` grid. Screenshot on top (`aspect-video`, `object-top`, no gradient overlay), then title, `summary`, and the facts as a `<dl>` of three items. Each item is a `dd` value in `font-mono text-lg text-ink` above a `dt` label in `text-muted text-xs`, with no separator glyphs. Then `ProjectLinks`, the `<details>` "How it was built" with `CaseStudy`, and `TagList`.
  - **`ProjectTile`:** screenshot (`h-28 object-cover object-top`), title, `summary`, `ProjectLinks`, and the same `<details>`.
  - **`ProjectRow`:** a `grid-cols-[1fr_2fr_auto]` row (stacked on phones) with the title, `summary`, and the year in `font-mono text-muted`. The year is the last 4-digit year matched in `period`. A `<details>` below holds `CaseStudy`, `ProjectLinks` and `TagList`. Rows are separated by `border-b border-line`.
  - Tiles use `bg-surface border border-line rounded-lg`, with no shadow. The hover/focus-within border is `border-accent/60`. Keep `.card-enter` on tiles only.
- [ ] **Step 2: Build `OsModeTile`.**
  - Heading: "This site also runs as an operating system". On phones (`sm:hidden` swap) it reads "This site also runs as a phone OS".
  - Body: "Draggable windows, a terminal, Minesweeper and a camera app that takes a photo when you give it a thumbs-up. On a phone it opens as a home screen instead." On phones the body is "Home screen, apps, a terminal and games."
  - A `<button>` "Open OS mode" in `text-accent font-semibold` calls `onOpen`.
  - Right side, hidden on phones: a CSS-drawn preview of two window rectangles and a taskbar over the new wallpaper colour, with `aria-hidden`.
- [ ] **Step 3: Compose `ProjectsSection`.**
  - Heading "Selected work" (the `id="projects"` stays on the section). Filter the projects with the existing tag logic.
  - Grid group: the feature tile plus the tiles, then `OsModeTile`.
  - Then an h3 "Research and smaller projects" and the list rows.
  - Hide a group, including its heading, when its filtered list is empty. Show the OS tile only when no filter is active.
  - Keep the "Showing projects using X" chip (drop the `→`-style decoration if any) and the empty state.
- [ ] **Step 4: Verify the filter (Review Focus 4).** `npm run build` and `npm run lint` pass. Then, in the dev preview:
  - Click the NetLogo stack chip. Expected: no tile grid in `#projects`, only the bridge row visible, and no "Selected work" grid or OS tile.
  - Click Shopify. Expected: only the Kitchen Line tile, and the "Research and smaller projects" heading absent.
  - The zero-match empty state can't be reached from the UI, because chips with no projects are inert spans. Keep its code path and confirm only that it still compiles.
  - Clear the filter. Expected: all seven projects appear (1 feature, 2 tiles, 4 rows) and the OS tile is back.
- [ ] **Step 5: Verify layout.** At 1440 and 375 px in both themes, there is no horizontal overflow. The OS tile button switches mode. The `<details>` open and close with the keyboard.
- [ ] **Step 6: Fill in sections 5 and 6 of `docs/brand.md`** with the patterns as built.
- [ ] **Step 7: Working-tree check.** Do not commit.

### Task 8: Experience, About, Work with me

**Files:**
- Modify: `src/components/experience-section.tsx`
- Modify: `src/components/about-section.tsx`
- Modify: `src/components/skills-section.tsx` (restyle the chips)
- Modify: `src/components/work-with-me-section.tsx`
- Modify the desktop counterparts if they hold their own copy: `src/components/desktop/apps/AboutApp.tsx` and `ExperienceApp.tsx`

**Interfaces:**
- Consumes `compact` (Task 5), `SectionHeading` (Task 3) and the tokens.

- [ ] **Step 1: Experience becomes a timeline.**
  - Non-compact entries are a two-column row (`md:grid-cols-[10rem_1fr]`). The period is on the left in `font-mono text-sm text-muted`; the title (`text-lg font-semibold`), org (`text-muted`) and highlights (plain `list-disc` in `text-muted`, no `▹`) are on the right.
  - Compact entries render as one line each under an h3 "Also": title, org, and the period on the right, with highlights in a `<details>`.
  - Education follows as a non-compact row, with the coursework chips styled as inert chips and the CV link.
  - No card boxes. Rows are separated by `border-t border-line`.
- [ ] **Step 2: About.**
  - Remove the photo and its decorative offset frame.
  - Bio at `max-w-prose`, rewritten to three short paragraphs that don't repeat the ShelfStock/Nexus/Kitchen Line specifics or numbers: who he is and where, what he works in and likes, and the thesis/research and LaTeX line.
  - Keep "Stack" (`id="stack"`) and `StackBlock`.
  - Chips: linked chips are `border-accent/50 text-accent` with the count as `font-mono`; the `·` before the count is removed, so the count is plain. Inert chips are `bg-surface text-muted border-line`.
- [ ] **Step 3: Work with me.** Keep the three-paragraph structure under the 180-word cap in its header comment. Remove the em dash in paragraph 1, and the link's `→`. The link text becomes "Tell me what you're building".
- [ ] **Step 4: Verify.**
  - `npm run build` and `npm run lint` pass.
  - `document.querySelectorAll('#about img').length === 0`.
  - Count the words in `#work-with-me` and confirm the result is under 180:

  ```js
  document.querySelector('#work-with-me').innerText.split(/\s+/).length
  ```

  - Experience shows five entries, two of them compact.
  - There is no horizontal overflow at 375 px.
- [ ] **Step 5: Working-tree check.** Do not commit.

### Task 9: Contact, footer, command palette and shared chrome restyle

**Files:**
- Modify:
  - `src/components/contact-section.tsx` (classes only, no behaviour change)
  - `src/components/footer.tsx`
  - `src/components/command-palette.tsx` (classes)
  - `src/components/mode-loading-fallback.tsx`
- Modify any remaining classic-page file that `grep` finds with `blue-` or `gray-` classes.

**Interfaces:**
- Consumes `Wordmark` and the tokens.

- [ ] **Step 1: Restyle `contact-section.tsx`.** Map the colours to tokens: inputs `bg-surface border-line`, focus `ring-focus`, the submit button as an accent fill. Error and success colours stay red/green but must meet AA in both themes. Do not touch the Web3Forms or hCaptcha logic.
- [ ] **Step 2: Restyle the footer.**
  - Use `bg-canvas border-t border-line`, with no forced `bg-gray-900`.
  - Content: the `Wordmark` plus the existing title and location line, the GitHub and LinkedIn icons, and the OS-mode link from Task 4.
  - Copyright line: "© {year} Jeric Rulete".
- [ ] **Step 3: Restyle the command palette** with tokens: `bg-surface border-line` panel, selected row `bg-accent/10 text-ink`. Leave the overlay backdrop as a plain `bg-black/60` with no blur.
- [ ] **Step 4: Verify.**
  - `npm run build` and `npm run lint` pass.
  - The grep below returns nothing, apart from the intentional red/green status colours in `contact-section.tsx`.

  ```bash
  grep -rnE "(bg|text|border|ring|from|to|via)-(blue|gray|slate|indigo|sky)-[0-9]" src/components/*.tsx src/App.tsx
  ```

  - In the preview, Ctrl+K opens the palette and arrow keys move the selection. Submitting the empty contact form shows the existing validation. Do not send a real submission.
- [ ] **Step 5: Working-tree check.** Do not commit.

### Task 10: OS modes light restyle

**Files:**
- Modify:
  - `src/components/desktop/DesktopOS.tsx` (wallpaper)
  - `src/components/desktop/Taskbar.tsx`
  - `src/components/desktop/Window.tsx`
  - `src/components/mobile/MobileOS.tsx`
- Modify: `src/components/desktop/apps/*.tsx` and `src/components/chat-window.tsx` (accent and font sweep only)

**Interfaces:**
- Consumes `JSquaredIcon` and `Wordmark` (Task 2), and the tokens.

- [ ] **Step 1: Replace the wallpapers.** Swap `bg-gradient-to-br from-sky-700 to-blue-900` (DesktopOS) and `from-sky-600 via-blue-700 to-indigo-900` (MobileOS) for a flat wallpaper in the new palette, e.g. `bg-[#1B1C1F]`. A subtle CSS noise texture is optional (builder's call). Recheck the desktop icon label contrast: the `bg-black/40` scrim stays.
- [ ] **Step 2: Restyle the chrome.**
  - **Taskbar:** solid `bg-surface border-t border-line`, no `backdrop-blur`. The active window is `bg-accent/10 text-accent`. Put a `JSquaredIcon size={20}` at the left as the start mark.
  - **Window:** title bar on tokens.
  - **MobileOS:** status bar on solid `bg-black/30`. The home clock is in `font-mono`, and the subtitle becomes the `Wordmark`. App tiles are `bg-white/10`, `rounded-xl`, with no `drop-shadow`.
- [ ] **Step 3: Sweep the app files.**
  - `blue-*` accent classes become `accent` / `accent-fill` / `on-accent`.
  - `font-display` becomes `font-mono` where it shows data (scores, clock, counts) and is removed elsewhere.
  - Then remove the temporary `display` key from `tailwind.config.js`.
  - Don't change app logic.
- [ ] **Step 4: Verify.**
  - `npm run build` and `npm run lint` pass.
  - The grep below returns nothing:

  ```bash
  grep -rn "font-display\|from-sky\|to-indigo\|to-blue" src
  ```

  - In the preview:
    - Desktop OS at 1280 px: open About, Terminal and Minesweeper; windows drag and the taskbar shows them.
    - Mobile OS at the mobile preset: open About and come back.
    - The console shows no errors in either.
    - Check the camera app only if a camera is available. It must still release its tracks, and the logic is unchanged.
- [ ] **Step 5: Working-tree check.** Do not commit.

### Task 11: Copy pass, meta and OG image

**Files:**
- Modify:
  - `index.html` (description, OG and Twitter text, `<noscript>` block, JSON-LD unchanged unless facts changed)
  - `src/data/faqData.ts` (answers that describe the site, the OS mode or the design system)
  - any visible strings found by the grep below
- Create: `docs/brand/og-image.html` (1200×630 source)
- Replace: `public/og-image.jpg`

- [ ] **Step 1: Find the remaining copy tells.** Expected: nothing in visible strings. Code comments may keep em dashes; this is a visible-copy rule.

  ```bash
  grep -rnE "—|→|▹|not just|\bcraft|passionate|elevate|unlock|empower" src index.html
  ```

  Fix each visible hit to plain sentences.
- [ ] **Step 2: Update `faqData.ts`.** The site-features answer (line 77) now describes Ctrl+K, the device-aware "Open OS mode" (navbar, the Selected work tile, the footer) and skill-chip filtering, with no design-system page.
- [ ] **Step 3: Rebuild the OG image.**
  - Build `docs/brand/og-image.html`: canvas `#101113`, `jer2x_` wordmark, the h1 text from the hero, and "Jeric Rulete · Full-stack web developer · Cebu City" in muted text. That single meta line may keep `·`; it is a byline, not a UI label.
  - Render it with the Task 2 Edge command at `--window-size=1200,630` to a PNG in the scratchpad.
  - Convert it to JPEG at `public/og-image.jpg`. Use PowerShell `System.Drawing` if needed, or keep a PNG and update the two `og:image`/`twitter:image` URLs to `og-image.png`.
- [ ] **Step 4: Verify.** `npm run build` passes. The Step 1 grep is clean for visible copy. Read the new OG image with the Read tool and confirm it shows the brand.
- [ ] **Step 5: Copy review list for Jeric.** Write every changed visible string (before → after) to `docs/superpowers/plans/2026-10-25-copy-review.md` so he can review it before shipping, as the spec requires.
- [ ] **Step 6: Working-tree check.** Do not commit.

### Task 12: Docs and full verification

**Files:**
- Modify: `CLAUDE.md`
- Modify: `README.md`

- [ ] **Step 1: Update `CLAUDE.md`.**
  - View modes: three-value `ViewMode`, `src/view-mode.ts`, MobileOS live below 768 px, and `?view=mobile`.
  - Remove the "Multi-page build" section, so there is a single entry.
  - Design system: point to `docs/brand.md` with a token summary, IBM Plex, and dark default.
  - Drop the mentions of `ScrollProgress`, `decrypted-text.tsx`, `count-up.tsx` and `design-lab-section.tsx`.
  - Classic section list: the Selected work structure.
- [ ] **Step 2: Update `README.md`** the same way, wherever it mentions any of these.
- [ ] **Step 3: Run the full verification.**
  - `npm run build` and `npm run lint` pass.
  - At 1440, 768 and 375 px, in dark and light, for the classic page, the desktop OS and the mobile OS:
    - no horizontal overflow
    - no console errors
    - every "Done when" item in the spec checked off one by one
  - Reduced motion: emulate it (or check that `.card-enter` is gated). There is no animation on the cards.
  - Keyboard pass: Tab through the navbar, hero, tiles, details, chips, form and footer. Focus is always visible.
  - Take screenshots of the hero and work at 1440 and 375 in dark if the pane is visible, and send them to Jeric.
- [ ] **Step 4: Final working-tree summary.** List `git status` for Jeric, grouped by task, and note again that nothing is committed.
