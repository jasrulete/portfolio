# Copy review: portfolio redesign

Every visible string the redesign changed, so Jeric can check the wording
before it ships. Facts are unchanged; only phrasing moved. Strings listed as
"new" did not exist before.

## Classic page

**Navbar**
- Wordmark: "Jeric Rulete_" → "jer2x_" (screen readers still hear "Jeric Rulete").
- Nav label: "Projects" → "Work".
- New buttons: "Open OS mode", "Résumé" (was "Resume").

**Hero**
- h1: "Jeric Rulete_" → "I build full-stack web apps, and I write the tests that keep them working."
- Availability (new): "Available now for contract work and full-time developer roles. Based in Cebu City."
- Lede: the old title/location line and tagline paragraph → "Mostly Next.js, TypeScript and PostgreSQL. I like finding the bug that only shows up when two people click at the same moment, fixing it, and writing down why." (Phones show only the first sentence.)
- Buttons: "View projects" → "See projects"; "Resume (PDF)" → "Download résumé (PDF)".
- Removed: the "Work with me · GitHub · email" link row.

**Selected work**
- Heading: "Projects" → "Selected work".
- Removed: "The design system behind this site →".
- New project summaries (from `profile.ts` `summary`):
  - ShelfStock: "An online store whose checkout locks the stock row, so two buyers can't both take the last unit. Comes with an Android app for packing orders."
  - Nexus CRM: "A CRM with AI lead scoring that still works with no API key, tested against prompt injection."
  - Kitchen Line Supply: "A Shopify theme written from an empty folder. Cart and filters work with JavaScript off."
  - Pulse: "Take-home assessment: fixed a broken WebRTC map app and closed 7 security issues."
  - Thesis: "Thesis: smart-home encryption that adapts to context. 63% faster responses and 27% less energy than static encryption."
  - Bridge ABM: "A NetLogo model of how a bridge deck wears out. Coastal exposure degraded it 3× faster than inland."
  - AmBot: "Tested seven trading strategies over 36 years of market data. None of them beat buy-and-hold."
- ShelfStock facts (new): "262 / API tests", "8.9 ms / search on 40k rows", "Live / on Vercel".
- Case-study labels: "THE CHALLENGE" / "ARCHITECTURE & EXECUTION" / "Outcome:" → "The challenge" / "How it's built" / "Outcome".
- OS tile (new): "This site also runs as an operating system. Draggable windows, a terminal, Minesweeper and a camera app that takes a photo when you give it a thumbs-up. On a phone it opens as a home screen instead." Phones: "This site also runs as a phone OS. Home screen, apps, a terminal and games." Button: "Open OS mode".
- New list heading: "Research and smaller projects".

**Experience**
- New sub-heading "Also" for volunteering and the family business.
- CV link: "Full CV (PDF) — longer academic version" → "Full CV (PDF), the longer academic version".

**About**
- Bio rewritten to three paragraphs without repeating the project numbers:
  1. "I'm a full-stack web developer in Cebu City. I graduated with a BS in Computer Science from the University of the Philippines Cebu in July 2026, and I'm doing contract development work now. I'm open to software developer, web developer and QA engineer roles."
  2. "Most of my work is Next.js and TypeScript over PostgreSQL or SQLite, plus Shopify themes in Liquid. I care about the part after it works: the tests, the edge cases and the write-up. The bit I enjoy most is finding what breaks quietly, fixing it, and writing down why."
  3. "My thesis was a smart-home IoT security framework that picks between AES-128 and ChaCha20 for each device based on its context. I also co-wrote an agent-based model of bridge degradation in NetLogo for a modelling course. I still write my technical reports in LaTeX, by choice."

**Work with me**
- "What I build — and what there is a demo and source for on this page:" → "What I build, with a demo and source for each on this page:"
- "once we both know what it is — smaller open-ended work can run hourly instead." → "once we both know what it is. Smaller open-ended work can run hourly instead."
- Link: "Tell me what you're building →" → "Tell me what you're building".

**Contact**
- "Contact Information" → "Contact information".
- CAPTCHA error: "could not load — it may be blocked" → "could not load. It may be blocked".

**Footer**
- Name → `jer2x_` wordmark; title line now "Full-stack web developer, Cebu City, Philippines".
- "I also built this site as a desktop OS →" → "This site also runs as an operating system".
- Removed: "Design system →".
- "© 2026 Jeric Rulete. All rights reserved." → "© 2026 Jeric Rulete".

**Command palette**
- "Switch to desktop OS view" / "Switch to classic view" → "Open OS mode" / "Back to classic view".
- "X — view code" / "X — live demo" → "X: view code" / "X: live demo".

**Chatbot FAQ (site features answer)**
- Rewritten to describe OS mode on computers and phones and its three entry points; the design-system page mention is gone.

## Data and OS-mode strings (copy pass)

- `src/data/profile.ts`
  - before: title: "Full-stack web developer · BS Computer Science, UP Cebu (2026)",
  - after: title: "Full-stack web developer",
- `src/data/profile.ts`
  - before: an admin analytics dashboard — plus an Android companion app
  - after: an admin analytics dashboard, plus an Android companion app
- `src/data/profile.ts`
  - before: whatever they pick — and the cart, variant picker
  - after: whatever they pick, and the cart, variant picker
- `src/data/profile.ts`
  - before: Performance 69–75 — most of the main-thread time
  - after: Performance 69–75. Most of the main-thread time
- `src/data/profile.ts`
  - before: WebRTC app — an anonymous live map where every online user is a dot you can tap for chat or a video call — then fixed
  - after: WebRTC app (an anonymous live map where every online user is a dot you can tap for chat or a video call), then fixed
- `src/data/profile.ts`
  - before: Audited 7 security issues — 2 critical (session impersonation, and reading or deleting another user's signaling queue), 2 high, 2 medium, 1 low — and shipped fixes:
  - after: Audited 7 security issues: 2 critical (session impersonation, and reading or deleting another user's signaling queue), 2 high, 2 medium and 1 low. Shipped fixes:
- `src/data/profile.ts`
  - before: (0.000827 vs 0.000599) — with detection accuracy
  - after: (0.000827 vs 0.000599), with detection accuracy
- `src/data/profile.ts`
  - before: makes collapse sudden — one failed segment
  - after: makes collapse sudden: one failed segment
- `src/data/profile.ts`
  - before: real Cebu spans — Sergio Osmeña, Marcelo Fernan and CCLEX — and BehaviorSpace
  - after: real Cebu spans (Sergio Osmeña, Marcelo Fernan and CCLEX), and BehaviorSpace
- `src/data/profile.ts`
  - before: Maintenance was non-linear — at zero
  - after: Maintenance was non-linear: at zero
- `src/data/profile.ts`
  - before: pnpm monorepo — mobile and desktop apps over shared core and ui-shared packages — and kept
  - after: pnpm monorepo (mobile and desktop apps over shared core and ui-shared packages) and kept
- `src/data/profile.ts`
  - before: subtitle: "Course project · co-authored with Chriz Ian Mesa",
  - after: subtitle: "Course project, co-authored with Chriz Ian Mesa",
- `src/data/profile.ts`
  - before: org: "Confidential SaaS clients · Remote",
  - after: org: "Confidential SaaS clients, remote",
- `src/data/profile.ts`
  - before: org: "Mvolo · Remote (Netherlands)",
  - after: org: "Mvolo, remote (Netherlands)",
- `src/data/profile.ts`
  - before: org: "Lexmark (now Xerox) · Cebu City",
  - after: org: "Lexmark (now Xerox), Cebu City",
- `src/data/profile.ts`
  - before: org: "Family Business – Rice Trading · Zamboanga City",
  - after: org: "Family business (rice trading), Zamboanga City",
- `src/data/faqData.ts`
  - before: where it matters — the Kitchen Line theme's README says so outright.
  - after: where it matters: the Kitchen Line theme's README says so outright.
- `src/data/faqData.ts`
  - before: a hosted RAG app — upload a PDF
  - after: a hosted RAG app: upload a PDF
- `src/data/faqData.ts`
  - before: (63.22% vs 63.05%, p = 0.126) — the adaptive switching cost no accuracy.
  - after: (63.22% vs 63.05%, p = 0.126), so the adaptive switching cost no accuracy.
- `src/data/faqData.ts`
  - before: is not an LLM — it's Fuse.js
  - after: is not an LLM. It's Fuse.js
- `src/data/faqData.ts`
  - before: client projects — web apps,
  - after: client projects: web apps,
- `src/components/desktop/apps/CameraApp.tsx`
  - before: Everything runs in your browser — video never leaves your device.
  - after: Everything runs in your browser. Video never leaves your device.
- `src/components/desktop/apps/CameraApp.tsx`
  - before: detected · thumbs-up starts a
  - after: detected. Thumbs-up starts a
- `src/components/desktop/apps/ChatbotApp.tsx`
  - before: for that one yet — try rephrasing
  - after: for that one yet. Try rephrasing
- `src/components/desktop/apps/GestureApp.tsx`
  - before: with MediaPipe — fully in your browser,
  - after: with MediaPipe, fully in your browser,
- `src/components/desktop/apps/MinesweeperApp.tsx`
  - before: `Cleared in ${seconds}s — nice.`
  - after: `Cleared in ${seconds}s. Nice.`
- `src/components/desktop/apps/MinesweeperApp.tsx`
  - before: Right-click (or Flag mode) to flag · first click is always safe
  - after: Right-click (or Flag mode) to flag. The first click is always safe.
- `src/components/desktop/apps/SnakeApp.tsx`
  - before: `Game over — ${score} point
  - after: `Game over: ${score} point
- `src/components/desktop/apps/SnakeApp.tsx`
  - before: "Arrows / WASD to move · Space to pause"
  - after: "Arrows or WASD to move, Space to pause"
- `src/components/desktop/apps/TerminalApp.tsx`
  - before: `${i + 1}. ${p.title} (${p.period}) — ${p.description}`
  - after: `${i + 1}. ${p.title} (${p.period}): ${p.description}`
- `src/components/desktop/apps/TerminalApp.tsx`
  - before: `${e.title} · ${e.org} (${e.period})`
  - after: `${e.title}, ${e.org} (${e.period})`
- `src/hooks/use-faq-chat.ts`
  - before: Pick a question or type keywords — answers come from a short FAQ.
  - after: Pick a question or type keywords. Answers come from a short FAQ.

## index.html (no-JavaScript fallback)

- h1: "Jeric Rulete" → "Jeric Rulete (jer2x)"
- "Full-stack web developer · BS Computer Science, UP Cebu (2026) · Cebu City, Philippines" → "Full-stack web developer in Cebu City, Philippines. BS Computer Science, UP Cebu (2026)."
- The meta description, OG and Twitter text are unchanged; they already follow the voice rules.

## Flagged items, resolved

- **Repetition:** About paragraph 2 no longer ends with "The bit I enjoy most is finding what breaks quietly, fixing it, and writing down why." The idea stays in the hero lede only.
- **Section name:** the command palette's "Go to Projects" is now "Go to Selected work". In the FAQ, "the Projects section" is now "Selected work", and "the Projects app in desktop mode" is now "the Projects app in OS mode" (the OS app keeps its "Projects" name).
- **Pulse claim:** the summary "fixed a broken WebRTC map app and closed 7 security issues" is now "fixed a broken WebRTC map app and audited its API, finding 7 security issues", which matches the outcome text.
