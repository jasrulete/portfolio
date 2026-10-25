# Portfolio redesign: design

Date: 2026-10-24. Owner: Jeric Rulete. Status: awaiting Jeric's approval.

## Intent

The portfolio's visitors are mostly recruiters, hiring managers and potential
clients who skim for a minute or two. Within seconds they should learn three
things: Jeric is a full-stack web developer who tests his work, here is the
proof, and here is how to reach him.

The current site has strong, honest content and good engineering hygiene
(accessibility, reduced motion, CSP, small bundles). What it lacks:

- a first screen that states the specialty (today the headline is just the name)
- a visual identity (it reads as stock Tailwind: gray-50, blue-600, mono headings)
- hierarchy in the work (seven equal cards, three of them imageless dark boxes)
- restraint (the same ShelfStock facts appear three times)

This is a **redesign, not a rebuild**. The React 19 + TypeScript + Vite +
Tailwind 3 stack, `src/data/profile.ts` as the single content source, and the
GitHub Pages deploy all stay.

## Goals

1. A dark, technical identity that is specific to Jeric and does not read as
   AI-generated or templated.
2. A hero that states the specialty and availability, with his photo in colour.
3. Work shown by weight: a large feature tile, two medium tiles, the rest as a
   list.
4. Both OS modes made easy to find, with each device getting the right one.
5. A new logo built around his handle **jer2x**.
6. A written brand guide in the repo that future work follows.

## Non-goals

- No framework, router or styling-system change (no Next.js, no Tailwind 4
  migration, no component library).
- No new content claims. Wording can change; facts come only from
  `profile.ts` and the existing copy.
- No redesign of the OS-mode apps' internals (games, camera, terminal,
  chatbot logic).
- No backend. The chatbot stays Fuse.js over `faqData.ts`.

## Anti-goals (failure even if it works)

The site must not show the 2025–2026 "AI slop" tells. The research summary
is below; the brand guide must carry the full list with these sources:

- Anthropic `frontend-design` skill (the strongest source; it names
  near-black + acid accent, tinted near-black, mono data labels and the
  typographic-chrome tells):
  https://raw.githubusercontent.com/anthropics/skills/main/skills/frontend-design/SKILL.md
- Capital & Compute, "fix AI slop design" (second-wave defaults, the card kit,
  count-up and motion tells): https://capitalandcompute.net/blog/fix-ai-slop-design/
- 925studios on design tells (indigo gradients, uniform sizing, copy):
  https://www.925studios.co/blog/ai-slop-design-tells and
  https://www.925studios.co/blog/ai-slop-web-design-guide
- codemyspec on vibe-coded sites (glass, glow, pill badges, stock page order,
  class fingerprints): https://codemyspec.com/blog/vibe-coded-websites-look-the-same
- Robots on Payroll (coloured left borders, emoji icons):
  https://robotsonpayroll.substack.com/p/how-to-avoid-that-vibe-coded-look
- TechCrunch on "not just X, but Y" frequency:
  https://techcrunch.com/2026/04/20/ai-writing-its-not-just-this-its-that-barrons/
- shadcn + Lucide as a default look:
  https://shadcnstudio.com/blog/shadcn-ui-and-lucide-icons

Caveat: most of these are 2026 agency or vendor blogs. Mark that in the guide.

The tells:

- near-black with an acid-green or lime accent; cream, serif and terracotta
- indigo/purple-to-blue gradients, gradient text, glow, glassmorphism,
  coloured shadows
- faint grid backgrounds, pill badges with pulsing dots, cursor-following glow
- the same rounded card and shadow everywhere, cards inside cards, coloured
  left borders, emoji as icons
- tracked ALL-CAPS eyebrows, "A · B · C" meta strings, "→" appended to links,
  one accented word in the headline, 01/02/03 on non-sequences
- count-up numbers, scrambled or "decrypting" text, the same fade-up on every
  section
- copy tells: em dashes, "not just X but Y", "I craft", "passionate", stock
  verbs (elevate, unlock, empower), weightless tricolons, unsourced numbers

## Decisions made with Jeric

### Visual direction: "technical dark", reworked

- **Default theme: dark.** Base `#101113`, surface `#17181B`, hairline
  `#26282C`, ink `#ECECEC`, muted ink `#9A9DA3`.
- **Accent: mango amber `#FFB547`**, a nod to Cebu. Text on an accent fill is
  `#1E1404`. The accent is used sparingly: primary button, the logo's `_` and
  `2x`, links, the active nav state, and key numbers. Never as glow or
  gradient.
- **Type: IBM Plex Sans** for all text and headings, and **IBM Plex Mono only
  for genuinely code-like data**: numbers with units, dates, stack names and
  the wordmark. Never for eyebrows or section labels. This replaces JetBrains
  Mono `font-display`.
- **Photo in colour**, never greyscale.
- No grid background, no glow, no pulsing badge.

### Logo: option 2

- **Wordmark `jer2x_`** in IBM Plex Mono 600. The `_` is in the accent and
  carries over the cursor from the current "JR_" brand. It appears in the
  navbar and footer.
- **Icon `j²`** (a "j" with a superscript "2" in the accent) on a rounded
  dark square. It is used for the favicon, `logo.png` and the OS-mode
  launcher.
- The favicon is drawn as SVG paths with no font dependency, keeping the
  existing favicon's rule. It must stay legible at 16 px on light and dark tab
  strips.

### Page layout (approved from mockup)

The approved mockup is
[`2026-10-24-portfolio-redesign-mockup.html`](2026-10-24-portfolio-redesign-mockup.html)
in this folder. Open it in a browser. It shows desktop and phone in dark with
mango amber. Its navbar still uses a placeholder wordmark; the logo section
below is the real one.

Order: **Hero → Selected work → Experience → About (+ Stack) → Work with me →
Contact → Footer.**

- **Navbar:**
  - `jer2x_` wordmark, then the links Work, Experience, About, Contact.
  - Then the **Open OS mode** button, the Résumé link, the command-palette
    button and the theme toggle.
  - The nav label "Projects" becomes "Work". The section id stays `projects`
    so deep links keep working.
- **Hero:**
  - Availability as a plain sentence: "Available now for contract work and
    full-time developer roles. Based in Cebu City."
  - Headline: "I build full-stack web apps, and I write the tests that keep
    them working."
  - A short lede in his voice, two buttons (See projects, Download résumé
    (PDF)), and his photo to the right. On a phone the photo sits above the
    text at a smaller size.
- **Selected work:**
  - ShelfStock is the large feature tile with its screenshot, a short
    description and a mono fact row (262 API tests · 8.9 ms search on 40k rows
    · Live on Vercel).
  - Nexus CRM and Kitchen Line Supply get medium tiles.
  - Then the **OS-mode tile** (see below).
  - Then "Research and smaller projects" as a plain list: title, one-line
    summary, year. The list holds the thesis, Pulse, the bridge ABM and AmBot.
  - Every project keeps its full case study (challenge / architecture /
    outcome) behind a native `<details>` "How it was built", and keeps its demo
    and source links.
- **Experience:**
  - A tighter timeline. The two developer roles (contract full-stack, Mvolo
    intern) and the Lexmark internship get full entries.
  - Volunteer work and the family business become compact rows.
  - Education follows.
- **About:**
  - Bio plus the Stack chips. Remove the ShelfStock and Nexus specifics that
    repeat the work tiles.
  - The skill chips still filter the work.
- **Work with me:** keep it, under its existing word cap, with repeated
  project facts removed.
- **Contact:** unchanged in behaviour (Web3Forms + hCaptcha). Restyle only.

### OS modes

- **One entry point, device-aware.** "Open OS mode" opens `DesktopOS` at
  viewport widths ≥ 768 px and `MobileOS` below 768 px, decided when the mode
  is entered.
  - Jeric approved reconnecting `MobileOS`. This overrides the "intentionally
    unlinked" note in CLAUDE.md, so update that note.
  - The `?view=desktop` deep link keeps working.
- **Entry points:**
  - the navbar button
  - the OS-mode tile in Selected work
  - the command palette (existing)
  - the footer link (keep, reworded)
- **OS-mode tile copy** (desktop): "This site also runs as an operating system.
  Draggable windows, a terminal, Minesweeper and a camera app that takes a
  photo when you give it a thumbs-up. On a phone it opens as a home screen
  instead." On a phone the tile reads "This site also runs as a phone OS".
  - The tile includes a small static preview of the desktop: a CSS drawing or
    an image of real windows, not a stock illustration.
- **Light restyle only:**
  - new accent, fonts and the `j²` icon
  - Replace the blue-to-indigo wallpaper gradients (`DesktopOS.tsx` and
    `MobileOS.tsx`), which are on the anti-goal list, with a wallpaper in the
    new palette.
  - App internals are untouched.

### Design Lab: removed

The in-site design system page goes away entirely. Remove:

- the `design` Vite entry and `design/index.html`
- `design-main.tsx`, `design-lab-page.tsx`, `design-lab-section.tsx` and
  `design-lab-3d.tsx`
- `DesignLabApp.tsx` and its `OS_APPS` entry
- the links to it in Projects, the footer and the command palette, and its
  `faqData.ts` entry and mention

The design rules move to a **brand guide** in the repo instead.

### Brand guide: `docs/brand.md`

A Markdown document for Jeric and future builders, not shown on the site. It
covers:

- colour tokens (dark and light) with roles and contrast ratios
- type scale and font rules (when mono is allowed)
- logo usage (wordmark vs `j²` icon, minimum sizes, clear space, don'ts)
- spacing and radius rules
- component patterns (feature tile, medium tile, list row, buttons, links,
  focus ring)
- motion rules
- voice and copy rules
- the full AI-slop "don't" list with its source links

It replaces the role the Design Lab page played. CLAUDE.md's "Design system"
section should point to it.

### Effects removed

Delete `count-up.tsx` and `decrypted-text.tsx`; `section-heading.tsx` imports
the latter. Remove decorative `→` from link text and the `▹` bullets in
Experience. The project cards' CSS scroll-driven entrance (`.card-enter`) may
stay as the single deliberate motion moment. Hover feedback stays subtle, and
everything respects `prefers-reduced-motion`.

### Copy pass

Rewrite all visible copy to the voice rules:

- plain sentences, no em dashes, no stock phrases
- buttons say exactly what they do
- every number traceable to `profile.ts`

This also covers `index.html` meta and the `<noscript>` text, `faqData.ts`
where it describes the site, and the OS-mode apps' visible strings that
mention the old design.

Jeric reviews the rewritten copy before it ships.

## Calls I made (Jeric can overrule)

These were played back to Jeric before writing this document; he raised no
objection.

- **About loses its photo.** The one photo moves to the hero; About becomes
  bio + Stack at prose width.
- **Phone navbar:**
  - The bar shows `jer2x_`, the theme toggle and the menu button.
  - The menu holds the four links, Open OS mode and Résumé.
  - The command-palette button is hidden on phones, as today.
- **Light theme layout is identical to dark;** only the tokens change.
- **The ShelfStock fact row is not a "·" meta string.** Render it as three
  separate stat items (value above label, as in the mockup) with no separator
  glyphs. The same applies anywhere else the spec writes "A · B".
- **OS-mode state model:**
  - `ViewMode` becomes `"classic" | "desktop" | "mobile"`.
  - "Open OS mode" resolves to `desktop` or `mobile` from the viewport width at
    that moment and stores that value in `sessionStorage`, so a reload keeps
    the same OS.
  - `?view=desktop` forces the desktop OS on any device, as the literal link
    says; `?view=mobile` is added for the phone OS.
  - The command palette gets one device-aware "Open OS mode" command, plus
    "Back to classic view" while in either OS.
  - Leaving either OS returns to classic.

- **A light theme is kept** behind the existing toggle, with dark as the
  default for first-time visitors. Some recruiters prefer light.
  - Light base `#FAFAF9`, surface `#FFFFFF`, ink `#151515`.
  - `#FFB547` fails contrast on white, so links and other accent *text* in
    light mode use a darker amber `#9A5B00`. Accent *fills* (buttons) stay
    `#FFB547` with `#1E1404` text in both themes.
  - Verify every pair to WCAG AA.
- **Theme persistence changes:** the default becomes dark, not
  `prefers-color-scheme`. A saved `portfolio-theme` choice still wins.
  - The pre-paint script in `index.html` changes, so its CSP sha256 hash must
    be recomputed, as the comment there explains.
  - With the Design Lab removed, `design/index.html` and its copy of the
    script go away.
- **The skill filter with the new layout:** an active skill filter applies to
  both the tiles and the list rows, and an empty group is hidden. The existing
  "Showing projects using X" chip and empty state stay.
- **Featured vs list is data-driven:** add a field to each project in
  `profile.ts` rather than hardcoding titles in components.
- **Desktop-mode apps keep their content** and just inherit the new tokens.
- **The OG image** (`public/og-image.jpg`) is regenerated in the new brand.
- **Contact section:** restyled only, no behaviour change.

## Constraints

- Keep the GitHub Pages `/portfolio/` base path. Asset URLs go through
  `import.meta.env.BASE_URL`.
- Keep the CSP. Google Fonts is already allowed; update the font URL to IBM
  Plex Sans and Plex Mono with only the weights used.
- Accessibility must not regress:
  - WCAG AA contrast in both themes
  - visible focus rings
  - 44 px touch targets
  - the skip link
  - `prefers-reduced-motion`
  - semantic headings
- Performance must not regress: the classic page must not pull in OS-mode
  code (keep the lazy boundaries), and Fuse.js stays out of the homepage
  bundle.
- Section order is mirrored in `App.tsx`, `navbar.tsx`,
  `use-active-section.ts` and `command-palette.tsx`. Change all four together.
- Content edits touch both the classic section and its `desktop/apps/*App.tsx`
  counterpart.
- **Do not git commit or push.** Jeric commits personally. Leave changes in
  the working tree.
- There is no test runner. Verification is `npm run build`, `npm run lint`
  and a visual check in the browser.

## Left to the builder

- exact type scale, spacing values, radii and breakpoint tuning, within the
  brand rules
- how the j² favicon paths are drawn
- the OS wallpaper treatment (flat colour, subtle noise, or a photo)
- how the OS-mode tile's preview is made
- component file structure, and whether to delete or rewrite `hero/`
  swarm-canvas files if they are unused (check usage first)

## Done when

- The classic page matches the approved mockup on desktop (1440 px), tablet
  (768 px) and phone (375 px), in dark and light.
- "Open OS mode" opens the desktop OS on a wide viewport and the mobile OS on
  a narrow one. Both show the new accent, fonts and `j²` icon, with no
  blue-indigo gradient.
- Nothing references the Design Lab, and `npm run build` emits a single entry.
- `docs/brand.md` exists, and CLAUDE.md and README are updated to match
  (design system, multi-page build, MobileOS status, fonts).
- A grep for em dashes, "→" and the stock phrases in the visible copy comes
  back clean, or only with justified exceptions.
- `npm run build` and `npm run lint` pass, and the browser console is clean.
