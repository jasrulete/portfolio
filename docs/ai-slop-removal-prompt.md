# Prompt: remove the "made by AI" look from a website

A reusable prompt, plus the reasoning and results behind it. It is the process
used on this portfolio (October 2026), written so it can be pasted into Claude
Code on any React/Tailwind site. The first section is the prompt itself. The
rest is the reference material the prompt points to, and what it produced here.

How to use it: open Claude Code at the repo root, paste everything inside the
fenced block in section 1, and fill the three bracketed lines at the top.

---

## 1. The prompt (copy this block)

````text
You are redesigning [SITE NAME / URL] so it no longer reads as AI-generated,
templated or "vibe-coded". Visitors are [WHO: e.g. recruiters and hiring
managers who skim for a minute]. Within seconds they should learn [WHAT: e.g.
what I specialise in, the proof, how to reach me].

Do not start building until step 1 is done. Do not commit or push anything
unless I explicitly ask. Never invent facts: every claim and number on the
page must already exist in the site's data files or copy. Rewording is fine;
new claims are not.

STEP 1. UNDERSTAND (no code yet)
- Read the repo: CLAUDE.md, the data/content files, the section components,
  index.html, the Tailwind/CSS setup. Run the build and lint to get a baseline.
- Ask me ONE open question at a time about audience and goals until you can
  play back what I want. Ask which technical choices I want to make and which
  I hand to you.

STEP 2. RESEARCH (use a subagent, web search, several queries, 2025-2026 sources)
Find what makes a developer portfolio or landing page look AI-generated.
Cover: visual tells (colour, gradients, glass, glow, fonts, card styles,
icons), layout and structure tells, copywriting tells, code-level tells a
reviewer can see, and a verdict on each of MY planned design choices (keep /
modify / drop). Cite URLs for the main claims. Note which sources are vendor
blogs with an interest in the problem. Key lesson to keep: if you ban the
first wave of defaults (purple, Inter), models fall back to a SECOND wave
(near-black plus one acid accent, cream plus serif plus terracotta, monospace
data labels). Judge my planned palette against that second wave too.

STEP 3. AUDIT THE EXISTING SITE
Make a written list, with file paths, of every tell actually present. Use the
catalogue in section 2 of docs/ai-slop-removal-prompt.md and these searches:
  grep -rnE "—|→|▹|not just|\bcraft|passionate|elevate|unlock|empower" src index.html
  grep -rnE "backdrop-blur|bg-gradient|from-|via-|to-(indigo|purple|violet|blue)|drop-shadow|rounded-(2xl|3xl)|uppercase|tracking-(wide|wider|widest)" src
  grep -rnE "animate-|count-?up|decrypt|typewriter|marquee|particles|swarm|parallax" src
Also look at the rendered page at 1440, 768 and 375 px, in both themes.

STEP 4. CHOOSE A DIRECTION WITH ME, VISUALLY
Do not decide the look alone. Build 2-3 real HTML mockups using my real
content and images (hero plus work section, desktop and phone) and let me pick.
Rules for the options:
- Derive the palette from the subject (my name, a place, a project), not from
  a mood. One accent colour, used sparingly: one primary button, links, the
  active nav item, key numbers. Never as glow or gradient.
- One type family with a real mono sibling. Mono ONLY for genuinely code-like
  data (numbers with units, dates, stack names, a wordmark), never for
  eyebrows, labels or decoration.
- No grid or dot backgrounds, no glow, no glass, no pulsing availability badge.
- Size work by substance: one large feature tile for the project with a demo,
  screenshots and numbers; medium tiles; a plain list for the rest. No wall of
  equal cards.
- Be honest in the mockups about which choices are still close to a known tell.

STEP 5. WRITE THE DESIGN, THEN A PLAN
Write a short design doc (intent, goals, non-goals, anti-goals, the decisions
I made, what is left to you, a "done when" list). Have a fresh subagent read it
as a builder and list only the questions that would change the build. Settle
the minor ones yourself and mark them as your calls; bring me only the ones
that are mine. After I approve, write a task-by-task plan with exact
interfaces, and a Review Focus list of edge cases the tests do not cover.

STEP 6. IMPLEMENT
- Put the design in semantic tokens (canvas, surface, line, ink, muted,
  accent, accent-fill, on-accent, focus) as CSS variables, light and dark.
  Components use tokens, never raw gray/blue/indigo classes.
- Replace the tells with the "do instead" from section 2. In particular:
  remove count-up numbers, scrambled/typewriter text, hover-glow, gradient
  text, decorative arrows on links, tracked ALL-CAPS eyebrows, "A · B · C"
  meta strings, 01/02/03 markers on non-sequences, accent rules under every
  heading, coloured left borders, emoji icons, pill-badge-above-headline, and
  the same fade-up on every section. Keep ONE deliberate motion moment, gated
  by prefers-reduced-motion, and nothing that moves without user action.
- Remove repetition: each fact appears once (hero or work, not hero, about and
  services). Cut any number you cannot source.
- Keep accessibility at or above where it was: AA contrast in both themes,
  visible focus rings, 44px touch targets, skip link, semantic headings,
  reduced motion. Form-control borders need 3:1, so do not reuse the
  decorative hairline colour for them.

STEP 7. COPY PASS
Rewrite visible copy in my voice: first person, plain sentences, lead with the
specific thing built and what it handles. Banned: em dashes, "not just X but
Y", "craft", "passionate", "elevate", "unlock", "empower", "seamless",
"best-in-class", weightless tricolons, decorative arrows, "·" separators in UI
labels. Buttons say exactly what they do. Real notation (state transitions,
metrics like 0.60 -> 0.58) may keep its arrows. Write EVERY visible string you
changed, before and after, to a copy-review file so I can approve the wording.
Flag anything that repeats or claims more than the evidence behind it.

STEP 8. VERIFY WITH MEASUREMENTS, NOT EYEBALLS
- Build and lint pass; browser console clean on the PRODUCTION build in a
  fresh tab (a pre-paint theme script under a CSP needs its hash recomputed).
- Layout at 1440, 768, 375 in dark and light: no horizontal overflow.
- Contrast computed from the actual token values, both themes; text pairs 4.5:1,
  control borders 3:1.
- Every link/button/summary at least 44px tall; every interactive element has a
  focus ring; closed menus are inert.
- Before any large tooling change (for example a framework upgrade), record
  computed styles and sizes for every element in several states, then diff
  after. Explain each difference as equivalent or intended.
- Re-run the greps from step 3. The only hits allowed are code comments and
  real notation, each justified.
- Take screenshots at desktop and phone and show them to me.

STEP 9. INDEPENDENT REVIEW
Dispatch ONE fresh reviewer on the most capable model with the full diff, the
spec, the plan's Review Focus and your list of judgment calls. Re-grade its
findings by what a visitor would experience, fix Critical and Important ones
with a before/after measurement, and list the minors for me.

STEP 10. LOCK IT IN SO IT STAYS FIXED
Write docs/brand.md: colour tokens with measured contrast, type rules, logo
rules, spacing and radius, component patterns, motion rules, voice and copy
rules, and the full list of tells with source URLs. Point CLAUDE.md at it.
Do NOT put a design-system showcase page on the public site.

At the end report: what changed, every judgment call you made, what you
verified and how, what you could not verify, and anything still close to a
known tell. Leave all changes uncommitted.
````

---

## 2. Catalogue of tells, with what to do instead

Research summary, October 2026. Most sources are agency or vendor blogs with an
interest in the problem. The strongest single source is Anthropic's own
`frontend-design` skill, which names several of these as model defaults.

### Colour and surface
| Tell | Do instead |
|---|---|
| Indigo/purple-to-blue gradients, gradient text (it traces to Tailwind's indigo-500 default) | 4 to 6 named colours, each with a role. No gradient text. |
| Near-black plus one acid accent (lime, green, vermilion), or cream plus serif plus terracotta. These are the "second wave" defaults | Take the palette from the subject. Say why the dark value was chosen. |
| Glass (`backdrop-blur`), glow behind cards, coloured shadows | Remove them. Depth comes from a surface colour plus a hairline border. |
| Faint grid or dot-pattern backgrounds | Drop, unless it does a real job such as aligning to the layout grid. |
| Stock Tailwind palette (gray-50, blue-600) with nothing specific to the person | A signature accent with a reason behind it. |

### Components
| Tell | Do instead |
|---|---|
| The card kit: `rounded-2xl` and the same soft shadow everywhere, cards inside cards, equal-size tiles | Vary radius and elevation by importance. Use rows or a table for list-like content. |
| Coloured left borders on cards, emoji as icons | One consistent icon style, no accent borders. |
| Pill badge with a pulsing dot above the headline | Availability as a plain sentence. |
| Cursor-following glow, shader backgrounds, copy-paste hero parts from component sites | Lead with a real screenshot or demo. |
| Uncustomised shadcn look plus Lucide for everything | Keep the library, change the tokens, radius and density. |

### Typographic chrome
| Tell | Do instead |
|---|---|
| Tracked ALL-CAPS eyebrows over every heading | Sentence-case headings, no eyebrows. |
| "A · B · C" meta strings, "WORD: fragment" labels | Separate items (value over label) or a short list. |
| "→" appended to links, one accented word in the headline | Plain link text. Decorate only where content calls for it. |
| 01/02/03 markers on things that are not a sequence | Remove. |
| Monospace used as decoration on small labels | Mono only for code-like data. |
| An accent rule under every section heading | Plain heading. |

### Motion
| Tell | Do instead |
|---|---|
| Same fade-and-slide-up on every section, bounce easing | One deliberate moment, reduced-motion safe. |
| Count-up stats, scrambled or "decrypting" text | Static numbers, plain text. |

### Structure
| Tell | Do instead |
|---|---|
| Centred hero, pill badge, two buttons, logo row, three equal feature cards, testimonials, CTA | Choose the structure after the content. Lead with the most specific thing you have. |
| Uniform padding, radius and card height everywhere | Sizing that follows how much substance each item has. |
| The same fact repeated in hero, about and services | Say each fact once. |

### Copy
| Tell | Do instead |
|---|---|
| "Not just X, but Y" (Barron's counted about 50 uses in 2023 and over 200 in 2025) | State the thing directly. |
| Em dashes, "craft", "passionate", "elevate", "unlock", "empower", "seamless" | Plain verbs. |
| Weightless headlines ("Build faster. Ship smarter.") | A sentence only you could write: what you built, for whom, what it handles. |
| Invented or unsourced metrics | Cut any number you cannot trace. |

### Code a reviewer can see
Class fingerprints (`indigo-600`, `slate-900`, `rounded-2xl`, `shadow-lg`, `p-6`
everywhere), an uncustomised shadcn look, copy-pasted hero components. Keep
tokens in one file that every component reads. A real commit history on real
projects is the one thing AI cannot fake.

---

## 3. What this produced on the portfolio

| Before | After |
|---|---|
| Stock blue-600 on gray-50, JetBrains Mono headings everywhere | Mango amber accent, IBM Plex Sans for text, Plex Mono only for numbers, dates, stack names and the wordmark |
| Scrambled "decrypting" section headings, count-up numbers | Plain headings, static numbers (components deleted) |
| Accent rule under every heading, `▹` bullets, `→` on links | Removed |
| ALL-CAPS tracked case-study and palette labels | Sentence-case labels |
| "A · B" meta strings (title lines, org names, honours) | Commas, separate rows, a list |
| Em dashes throughout the copy, data and FAQ | Colons, commas and periods (32 strings changed, listed for review) |
| Gradient overlay on project images, drop-shadow text | Plain image with title below |
| Blue-to-indigo gradient OS wallpapers, blurred glass taskbar and palette overlay | Flat `#1B1C1F` wallpaper, solid taskbar, plain overlay |
| Seven equal cards, three of them flat dark boxes with no image | One feature tile, two tiles, a plain list for research |
| Same ShelfStock facts in the card, About and Work with me | Said once, in the feature tile |
| A "Design Lab" page showcasing the design system, with 3D demos | Removed; the rules moved to `docs/brand.md` |
| Hero was the name only, specialty in grey paragraph text | Headline states the specialty, availability as a plain sentence |

Verification actually run: contrast computed from the tokens (for example
accent on canvas 10.8:1 dark and 5.2:1 light); a reviewer found form-field
borders at 1.2:1 and touch targets at 36px, both fixed and re-measured; a
per-element before/after comparison across five states when moving to
Tailwind 4; a clean production console and a clean copy grep.

### Still close to a known tell (be honest about these)
- A near-black base with a single bright accent is the pattern the research
  warns about. It is deliberate here (the owner chose the dark direction) and
  the accent is amber rather than lime, but it is not free of the risk, and
  `docs/brand.md` records the colour values without arguing for them. If you
  want to reduce the risk further, derive the dark base and accent from
  something specific to you and write the reason down.
- Mono for data labels and a tile-based project section are the other two
  patterns the research flags; both are constrained by rules (mono only for
  real data, tile size follows substance).
- The strongest protection is substance a template cannot supply: real
  screenshots, real numbers, honest limits, working demos and source.

---

## 4. Sources

- Anthropic `frontend-design` skill: https://raw.githubusercontent.com/anthropics/skills/main/skills/frontend-design/SKILL.md
- Capital & Compute, "Fix AI slop design": https://capitalandcompute.net/blog/fix-ai-slop-design/
- 925studios: https://www.925studios.co/blog/ai-slop-design-tells and https://www.925studios.co/blog/ai-slop-web-design-guide
- codemyspec: https://codemyspec.com/blog/vibe-coded-websites-look-the-same
- Robots on Payroll: https://robotsonpayroll.substack.com/p/how-to-avoid-that-vibe-coded-look
- TechCrunch on "not just X, but Y": https://techcrunch.com/2026/04/20/ai-writing-its-not-just-this-its-that-barrons/
- shadcn/ui and Lucide as a default look: https://shadcnstudio.com/blog/shadcn-ui-and-lucide-icons

The brand rules that keep the result fixed live in `docs/brand.md`, sections 8
and 9.
