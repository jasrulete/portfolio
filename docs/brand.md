# jer2x brand guide

The rules behind Jeric Rulete's portfolio. This document is for Jeric and
anyone building on the site; it is not shown to visitors. When the site and
this guide disagree, fix one of them so they match.

## 1. Purpose

The visitors are mostly recruiters, hiring managers and potential clients
who skim for a minute or two. Within seconds they should learn three things:
Jeric is a full-stack web developer who tests his work, here is the proof,
and here is how to reach him. Every design choice serves that skim.

## 2. Colour

Dark is the default theme; light is available behind the toggle. Tokens are
CSS variables in `src/index.css`, exposed to Tailwind by the `@theme inline`
block in that file, so the classic page and the OS chrome use `bg-surface`,
`text-muted` and so on, never raw grays or blues. Some OS app internals (games, camera, gestures,
chatbot) still use `gray-*` classes; convert them when you next touch them.

On surfaces that stay dark in both themes (the OS wallpaper, the terminal,
camera overlays), use the dark-theme accent `#FFB547`. For a component that
reads `text-accent`, pin the token locally with `[--c-accent:255_181_71]`.

| Token | Role | Dark | Light |
|---|---|---|---|
| `canvas` | page background | `#101113` | `#FAFAF9` |
| `surface` | tiles, inputs, panels | `#17181B` | `#FFFFFF` |
| `line` | hairlines and borders | `#26282C` | `#E4E4E2` |
| `ink` | headings and body | `#ECECEC` | `#151515` |
| `muted` | secondary text | `#9A9DA3` | `#5F6368` |
| `accent` | links, active nav, key numbers, the `_` and `2` | `#FFB547` | `#9A5B00` |
| `accent-fill` | primary button fill | `#FFB547` | `#FFB547` |
| `on-accent` | text on `accent-fill` | `#1E1404` | `#1E1404` |
| `focus` | focus ring | `#FFB547` | `#9A5B00` |

The accent is **mango amber**, a nod to Cebu. `#FFB547` fails contrast as
text on white, which is why light mode uses `#9A5B00` for accent text and
keeps `#FFB547` only as a fill.

Measured contrast (WCAG 2.x):

| Pair | Dark | Light |
|---|---|---|
| ink on canvas | 16.0:1 | 17.5:1 |
| muted on canvas | 6.9:1 | 5.8:1 |
| muted on surface | 6.5:1 | 6.0:1 |
| accent on canvas | 10.8:1 | 5.2:1 |
| accent on surface | 10.1:1 | 5.4:1 |
| on-accent on accent-fill | 10.3:1 | 10.3:1 |

Use the accent sparingly: one primary button per view, links, the active nav
item, the logo marks and the numbers that prove something. Never use it as a
glow, a gradient or a background wash.

## 3. Type

- **IBM Plex Sans** for all text and headings (400, 500, 600, 700).
- **IBM Plex Mono** (500, 600) only for genuinely code-like data: numbers
  with units, dates, stack names, and the `jer2x_` wordmark.
- Never use mono for eyebrows, section labels or decoration.
- Headings use tight tracking (`tracking-tight`), sentence case. No
  ALL-CAPS tracked labels.

Plex was chosen because it is one family with a true mono sibling, so the
data and the prose read as one voice.

## 4. Logo

- **Wordmark:** `jer2x_` set in IBM Plex Mono 600, with the `_` in the accent.
  The underscore is the cursor carried over from the earlier "JR_" mark. It is
  used in the navbar, the footer and the mobile OS home screen
  (`src/components/wordmark.tsx`, `Wordmark`).
- **Icon:** `j²`, a lowercase "j" in ink with a superscript "2" in the
  accent, on a dark rounded square. It is used for the favicon, `logo.png` and
  the OS taskbar (`JSquaredIcon`). The master copy is
  `docs/brand/logo-icon.svg`; it is drawn as paths so no font is needed.
- **Minimum size:** 16 px for the icon, 14 px cap height for the wordmark.
- **Clear space:** one "j" height on every side.
- **Don't:** recolour anything except the `_` and `2` (which take the accent),
  add shadows, glows or gradients, outline it, or set the wordmark in another
  font.

## 5. Spacing and radius

- Content width `max-w-6xl`. Gutters `px-4 sm:px-6 lg:px-8` (16 px on phones).
- Sections `py-16 sm:py-24`, separated by a `border-t border-line` hairline.
- Prose at `max-w-prose`.
- Radius: tiles and panels `rounded-lg`, buttons and inputs `rounded-md`,
  small tags `rounded`. No `rounded-2xl`, no pills except where a shape
  carries meaning.
- No drop shadows on content. Depth comes from `surface` on `canvas` plus a
  `line` border.

## 6. Component patterns

- **Feature tile** (one per page, `FeatureTile`): screenshot on top, title,
  one-sentence summary, then up to three facts as value (mono, `text-lg`)
  over label (`text-xs text-muted`). No separator glyphs between facts.
- **Tile** (`ProjectTile`): shorter screenshot, title, summary, links.
- **List row** (`ProjectRow`): title, summary, year in mono, separated by
  hairlines. Used for research and smaller work.
- **Tile size follows substance.** Only a project with a demo, screenshots and
  numbers earns the feature tile.
- **Case studies** sit behind a native `<details>` "How it was built" in
  every form, so nothing is hidden from crawlers or screen readers.
- **Buttons:** one filled `accent-fill` button per view (the hero's "See
  projects"). Secondary actions are `border-line` outlined buttons. Project
  links are text links ("Live demo" in accent, "Source" in muted).
- **Links:** `text-accent`, underline on hover.
- **Focus ring:** `FOCUS_RING` in `src/components/focus-ring.ts`, a 2 px
  `focus` ring offset by the canvas colour, on every interactive element.
- **Tags and stack names:** mono `text-xs text-muted` in a `border-line` box.
- **Form controls** use `border-muted`, not `border-line`: a control's edge
  must clear 3:1 against both canvas and surface (`line` is decorative and
  measures about 1.2:1).
- **Touch targets** are at least 44 px tall (`min-h-11` on text links,
  summaries and text buttons).

## 7. Motion

- One deliberate entrance: the work tiles fade up as they scroll in
  (`.card-enter`, CSS scroll-driven, gated by `@supports` and
  `prefers-reduced-motion`). Nothing else animates on scroll.
- Hover and focus feedback is a colour or border change, 150 ms.
- Native `<details>` may grow open (Chromium) and opens instantly elsewhere.
- No count-up numbers, no scrambled or typed text, no parallax, no custom
  cursor, no loading screen.
- Everything respects `prefers-reduced-motion`.

## 8. Voice and copy

- First person, plain sentences, the way Jeric would say it to a person.
- Lead with the specific thing: what was built, for whom, and what it
  handles. "A store whose checkout can't oversell the last unit" beats "a
  robust e-commerce solution".
- Every number must trace to `src/data/profile.ts`. If it can't be sourced,
  cut it.
- Buttons say exactly what they do ("Download résumé (PDF)", "Open OS mode").
- Say what didn't work when it matters (the AmBot result, the corrected
  Lighthouse score). Honesty is part of the brand.
- Banned in visible copy:
  - em dashes
  - "not just X, but Y"
  - "craft", "passionate", "elevate", "unlock", "empower", "seamless",
    "best-in-class"
  - weightless tricolons ("Build faster. Ship smarter. Scale further.")
  - decorative `→`, `▹` or `·` separators in UI labels

## 9. What makes a site look AI-generated (don't)

Research from October 2026. Most sources are agency or vendor blogs with an
interest in the problem; the strongest single source is Anthropic's own
design guidance for models.

**Colour and surface**
- Indigo or purple-to-blue gradients, gradient text.
- Near-black with one acid-green or lime accent. Cream, serif and terracotta.
  These are the "second wave" defaults models reach for once the first are
  banned.
- Glassmorphism (`backdrop-blur`), glow behind cards, coloured shadows.
- Faint grid or dot-pattern backgrounds.

**Components**
- The card kit: the same `rounded-2xl` and soft shadow everywhere, cards
  inside cards, equal-sized tiles regardless of content.
- Coloured left borders on cards; emoji used as icons.
- A pill badge with a pulsing dot above the headline.
- Cursor-following glow, shader backgrounds, copy-paste hero sections.

**Typography chrome**
- Tracked ALL-CAPS eyebrows over every heading.
- "A · B · C" meta strings; "WORD — fragment" labels.
- "→" appended to links; one accented word in the headline.
- 01/02/03 markers on things that aren't sequences.
- Monospace used for small labels as decoration.

**Motion**
- The same fade-and-slide-up on every section; bounce easing.
- Count-up stats; scrambled "decrypting" text.

**Structure**
- The stock page order: centred hero, pill badge, two buttons, logo row,
  three equal feature cards, testimonials, CTA.

**Copy**
- See the banned list in section 8.

**Sources**
- Anthropic, `frontend-design` skill:
  https://raw.githubusercontent.com/anthropics/skills/main/skills/frontend-design/SKILL.md
- Capital & Compute, "Fix AI slop design" (September 2026):
  https://capitalandcompute.net/blog/fix-ai-slop-design/
- 925studios: https://www.925studios.co/blog/ai-slop-design-tells and
  https://www.925studios.co/blog/ai-slop-web-design-guide
- codemyspec, "Vibe-coded websites look the same":
  https://codemyspec.com/blog/vibe-coded-websites-look-the-same
- Robots on Payroll, "How to avoid that vibe-coded look":
  https://robotsonpayroll.substack.com/p/how-to-avoid-that-vibe-coded-look
- TechCrunch on "it's not just this, it's that":
  https://techcrunch.com/2026/04/20/ai-writing-its-not-just-this-its-that-barrons/
- shadcn/ui and Lucide as a default look:
  https://shadcnstudio.com/blog/shadcn-ui-and-lucide-icons
