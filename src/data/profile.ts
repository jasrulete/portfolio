export const profile = {
  name: "Jeric Ashley S. Rulete",
  shortName: "Jeric Rulete",
  title: "Full-stack web developer · BS Computer Science, UP Cebu (2026)",
  tagline:
    "I build full-stack web apps with Next.js, TypeScript and PostgreSQL, and write the unit, component and end-to-end tests for them.",
  projectFilters: ["All", "Web", "Research"] as const,
  personalEmail: "rulete.jeric@gmail.com",
  /** Inbox for the Get In Touch form (Web3Forms delivers to the email tied to your access key). */
  formEmail: "rulete.jeric@gmail.com",
  phone: "+63 927 763 7156",
  location: "Cebu City, Philippines",
  github: "https://github.com/jasrulete",
  portfolio: "https://jasrulete.github.io/portfolio/",
  cvUrl: `${import.meta.env.BASE_URL}Jeric-Rulete_CV.pdf`,
  resumeUrl: `${import.meta.env.BASE_URL}Jeric-Rulete_Resume.pdf`,
  education: {
    school: "University of the Philippines",
    campus: "Gorordo Ave., Cebu City",
    degree: "Bachelor of Science in Computer Science",
    graduated: "July 2026",
    honors:
      "College Scholar (2nd Semester A.Y. 2023–2024) · College Scholar (2nd Semester A.Y. 2024–2025)",
    coursework: [
      "Fundamentals of Programming",
      "Software Engineering",
      "Web Engineering",
      "Data Structures",
      "File Processing and Database Systems",
      "Design and Analysis of Algorithms",
      "Operating Systems",
      "Introduction to Artificial Intelligence",
      "Data Communication and Networking",
      "Machine Learning",
      "Project Management",
      "Image Processing",
      "Introduction to Computer Security",
      "Technopreneurship",
      "Agent Based Modeling",
    ],
  },
  skillGroups: [
    {
      title: "Languages",
      items: ["TypeScript", "JavaScript", "Python", "PHP", "Liquid", "C++"],
    },
    {
      title: "Frontend",
      items: [
        "React",
        "Next.js",
        "React Native (Expo)",
        "Tailwind CSS",
        "HTML5",
        "CSS3",
      ],
    },
    {
      title: "Backend",
      items: [
        "Node.js",
        "Express",
        "REST APIs",
        "WebRTC",
        "WebSockets",
        "Laravel",
        "Blade",
        "NextAuth",
      ],
    },
    {
      title: "Databases",
      items: ["PostgreSQL", "SQLite", "Prisma", "MongoDB", "Supabase (basic)", "SQL"],
    },
    {
      title: "Testing & CI",
      items: [
        "Vitest",
        "Supertest",
        "Testing Library",
        "Jest",
        "Playwright",
        "GitHub Actions",
      ],
    },
    {
      title: "Tools & Platforms",
      items: [
        "Git",
        "GitHub",
        "Docker",
        "Vercel",
        "Netlify",
        "Shopify",
        "Cloudinary",
        "Figma",
      ],
    },
    {
      title: "Data & Modelling",
      items: ["pandas", "NetLogo", "Agent-Based Modeling", "Machine Learning"],
    },
    {
      title: "Methodologies",
      items: ["Agile", "Scrum", "Project Management"],
    },
  ],
  projects: [
    {
      title: "ShelfStock",
      subtitle: "Personal project",
      period: "July – August 2026",
      description:
        "A Next.js, Express and PostgreSQL store with server-side search and pagination, multi-currency price display, a row-locked Cash-on-Delivery checkout and an admin analytics dashboard — plus an Android companion app for order fulfilment.",
      challenge:
        "Checkout has to stay correct when two people buy the last unit at the same moment, an old order has to keep the price the customer actually paid after the product's price changes, and substring search has to stay fast as the product table grows.",
      architecture:
        "A Next.js 15 App Router storefront over an Express and TypeScript API on PostgreSQL, deployed as one unit: the API runs as a serverless function inside the Next.js deployment. Checkout runs in a single transaction with SELECT … FOR UPDATE on the product row; order items store price_at_purchase; handlers check that the caller owns the order, not just that the token is valid; an explicit transition matrix governs pending → shipped → completed and cancellation. Search runs on trigram and full-text indexes. The Expo companion app gives admins barcode-scan product lookup, scan-to-verify packing, an offline product cache and a write queue that replays on reconnect.",
      outcome:
        "262 API tests (Vitest and Supertest), 59 component tests (Testing Library) and Docker-based end-to-end smoke tests run in GitHub Actions on every pull request and every push to main; the companion app runs type-checking, lint and Jest in CI. On 40k rows, indexed search measured 8.9 ms against 1,039 ms for a sequential scan. Live on Vercel.",
      tags: [
        "Next.js",
        "React",
        "TypeScript",
        "Express",
        "Node.js",
        "PostgreSQL",
        "Vitest",
        "Supertest",
        "Testing Library",
        "Jest",
        "Docker",
        "GitHub Actions",
        "React Native",
      ],
      github: "https://github.com/jasrulete/Shelfstock",
      demo: "https://shelfstock-jer2x.vercel.app",
      category: "Web",
    },
    {
      title: "Nexus CRM",
      subtitle: "Personal project",
      period: "August 2026",
      description:
        "A Next.js 16 CRM with a drag-and-drop deal pipeline, contacts and companies, an activity timeline and tasks, plus AI lead scoring, relationship summaries and follow-up drafts that fall back to rule-based heuristics when no API key is set.",
      challenge:
        "Sending CRM records to a language model means a contact's notes can carry instructions aimed at the model, and the app had to keep working on free AI tiers or with no key at all. The AI layer needed to resist prompt injection, stay rate-limited, and degrade into something still useful.",
      architecture:
        "Next.js 16 App Router with Server Actions; every mutation is validated with zod and authorised on the server. Prisma 7 over SQLite locally and Turso in production. Auth is hand-built: bcrypt passwords, sessions stored as SHA-256 hashes in httpOnly cookies, timing-safe login with rate limiting, admin and member roles, and a full audit log. AI calls go through one provider module that tries Gemini first and fails over to Groq, with record data wrapped in tags and per-user rate limits.",
      outcome:
        "Vitest unit tests for scoring, validation and rate limiting; Playwright end-to-end tests for auth and CRM flows; and an eval harness that runs fixture contacts through the real actions with three prompt-injection payloads. CI on GitHub Actions, live on Vercel with a seeded demo workspace.",
      tags: [
        "Next.js",
        "React",
        "TypeScript",
        "Prisma",
        "SQLite",
        "Tailwind CSS",
        "Vitest",
        "Playwright",
        "GitHub Actions",
      ],
      github: "https://github.com/jasrulete/Nexus-CRM",
      demo: "https://nexus-crm-jer2x.vercel.app",
      category: "Web",
    },
    {
      title: "Kitchen Line Supply (Shopify Theme)",
      subtitle: "Personal project",
      period: "August 2026",
      description:
        "A Shopify Online Store 2.0 theme for a fictional pickleball brand, written from an empty folder in Liquid, CSS and vanilla JavaScript: no Dawn fork, no purchased template, no page builder, no build step.",
      challenge:
        "Merchants can change a theme's settings, so the theme had to stay accessible whatever they pick — and the cart, variant picker, filters and mobile menu all had to work with JavaScript switched off.",
      architecture:
        "Schema-driven sections with merchant-editable blocks, 38 specs product metafields and a badge metaobject limited to pre-checked tones. Without JavaScript the cart is a form POST to /cart, variants are a noscript select, filters are GET parameters on Shopify's native filter system and the mobile menu is a details element; with JavaScript those upgrade to an AJAX cart through the Section Rendering API, radio groups with section re-rendering, and pushState filtering. One base.css, one deferred theme.js, zero dependencies. Products, metafield definitions, metaobjects and collections are all created by Admin GraphQL API scripts, so the store rebuilds from scratch. Visual design adapted from SHOP.CO by Hamza Naeem (CC BY 4.0).",
      outcome:
        "Lighthouse on the live store under real mobile throttling (4× CPU slowdown, slow 4G), median of 5 runs per page: Accessibility 100 and SEO 100 on every run, CLS 0 on every run, Performance 69–75 — most of the main-thread time belongs to Shopify's own scripts. An earlier version of the README claimed 100 across the board; those runs used desktop throttling, and I documented the mistake rather than keep the better number. The storefront is password-gated: jer2x-kls.",
      tags: ["Shopify", "Liquid", "JavaScript", "CSS"],
      github: "https://github.com/jasrulete/shopify-kitchen-line-theme",
      demo: "https://kitchen-line-supply.myshopify.com",
      category: "Web",
    },
    {
      title: "Pulse",
      subtitle: "Take-home technical assessment",
      period: "June 2026",
      description:
        "A take-home assessment: I inherited a broken Next.js and WebRTC app — an anonymous live map where every online user is a dot you can tap for chat or a video call — then fixed its core bugs, audited and hardened its API, redesigned the UI and added mobile support.",
      challenge:
        "The app I was handed didn't work. Dots stayed on the map after people left, chat only appeared for the sender, users got stuck as busy after a call, and video often connected with no remote stream. Its API also trusted any session ID it was given.",
      architecture:
        "Next.js and TypeScript with PostgreSQL via Prisma for presence and signaling over HTTP polling, and WebRTC data channels and media for chat and video. The root causes: a heartbeat updateMany with an empty where clause, a message-type mismatch between sender and receiver, a busy flag cleared on decline but not on end, and ICE candidates flushed before the remote description was set.",
      outcome:
        "Audited 7 security issues — 2 critical (session impersonation, and reading or deleting another user's signaling queue), 2 high, 2 medium, 1 low — and shipped fixes: a server-issued secret checked on every protected endpoint, create-only joins with UUID validation, payload-size and ownership checks, per-IP rate limits returning 429 with Retry-After, and baseline security headers. Also fixed 4 functional bugs and one regression my own security changes introduced. Every phase is written up in NOTES.md, including the limits I didn't solve: no TURN server, and per-IP rate limiting only.",
      tags: ["Next.js", "React", "TypeScript", "WebRTC", "Prisma", "PostgreSQL"],
      github: "https://github.com/jasrulete/Idea-Venture-Application",
      demo: "https://idea-venture-application.vercel.app",
      category: "Web",
    },
    {
      title: "Context-Aware Edge Security Framework",
      subtitle: "Undergraduate thesis",
      period: "June 2026",
      description:
        "My thesis: a smart-home IoT security framework that switches each device between AES-128 and ChaCha20 based on its context and a decision-tree threat estimate. Across 180 simulation runs it cut mean response time by 63.40% and energy use by 27.39% against static encryption.",
      challenge:
        "Smart-home IoT devices are resource-constrained, yet static encryption either wastes energy on low-risk traffic or under-protects high-risk traffic. The framework needed to adapt security strength to context without overwhelming edge hardware.",
      architecture:
        "A Decision Tree classifier infers threat level at the edge. Together with device criticality, battery level and RSSI it forms a Contextual Quadruple that chooses between AES-128 and ChaCha20, while an M/M/4 queueing model handles concurrent requests. Evaluated on the CICIoT2023 dataset.",
      outcome:
        "Against a static-encryption baseline over 180 simulation runs: 63.40% lower mean response time and 27.39% lower energy consumption, both significant at p < 0.001.",
      tags: ["Python", "Machine Learning", "IoT Security", "Edge Computing"],
      category: "Research",
    },
    {
      title: "Bridge Degradation Agent-Based Model",
      subtitle: "Course project · co-authored with Chriz Ian Mesa",
      period: "June 2026",
      description:
        "A NetLogo agent-based model of how a bridge deck wears out, written with a classmate for CMSC 176. Deck segments are patches with health, load capacity and status; cars and trucks are agents that load them; failed segments push their load onto their neighbours.",
      challenge:
        "Bridge inspections happen on a schedule, but damage doesn't: corrosion and fatigue accumulate continuously, and a span can go from a warning condition to failure between two inspections. Aggregate models also hide the thing that makes collapse sudden — one failed segment redistributing its load onto its neighbours.",
      architecture:
        "Each simulated day runs as 48 half-hour substeps: vehicles spawn from a daily traffic target and a heavy-truck ratio, patches accumulate load, then lose health to environmental decay plus traffic wear, with an overload penalty when load exceeds capacity. Failed patches redistribute their share to their Moore neighbours, which is what makes cascading collapse emergent rather than scripted. Three structural profiles are inspired by real Cebu spans — Sergio Osmeña, Marcelo Fernan and CCLEX — and BehaviorSpace sweeps environment, traffic volume, truck ratio and maintenance policy.",
      outcome:
        "Coastal exposure degraded the deck exactly 3× faster than inland (0.006590 vs 0.002197 HP/day, ANOVA p < 1e-16). Fleet composition mattered more than vehicle count: shifting from 0% to 100% heavy trucks added 27% to the wear rate, while a near-5× increase in daily traffic added 16%. Maintenance was non-linear — at zero repair quality, inspection frequency changed nothing at all, while yearly maintenance at 0.25 effectiveness cut degradation 79.6%. Under a 100-year run, all 16 traffic-and-truck configurations eventually collapsed, the earliest at about 7.91 years.",
      tags: ["NetLogo", "Agent-Based Modeling", "BehaviorSpace"],
      category: "Research",
    },
    {
      title: "AmBot (Trading Strategy Research)",
      subtitle: "Personal project",
      period: "July 2026",
      description:
        "A Python backtesting pipeline that tested seven trading strategies across two asset classes and 36 years of market data, with train/test separation and Monte Carlo controls. The honest headline: none of them worked.",
      challenge:
        "Backtests flatter strategies. One look-ahead bug, a lucky period or the wrong benchmark makes almost anything look profitable, so the pipeline had to be strict enough to catch its own mistakes.",
      architecture:
        "Vectorized backtests in pandas over Yahoo Finance equities (S&P 500, Nasdaq, Nikkei, 1990–2026) and ccxt crypto data (BTC, ETH, SOL, 2019–2026). Parameters are fitted on the early window and evaluated once on data that played no part in choosing them, replicated across assets and against the Nikkei's 1990–2009 bear market as the adversarial case, then compared with random-selection control groups. Paper-trading only: there is no order-placement code path.",
      outcome:
        "The pipeline's most useful output was catching its own errors: a feed latency of 409 ms that was really 37 ms once 372 ms of clock skew was removed, and a −0.69 BTC correlation that didn't replicate: the same test gave +0.35 on ETH and +0.58 on SOL. Out of sample, moving-average crossover beat buy-and-hold in 0 of 114 parameter sets; cross-sectional momentum was the only strategy whose own performance stayed stable across regimes (Sharpe 0.60 → 0.58), and it still didn't beat buy-and-hold.",
      tags: ["Python", "pandas", "ccxt"],
      github: "https://github.com/jasrulete/trading-research",
      category: "Research",
    },
  ],
  experience: [
    {
      title: "Full-Stack Developer",
      org: "Confidential SaaS clients · Remote",
      period: "July 2026 – Present",
      highlights: [
        "Contract development on production SaaS web applications; client names and system details stay confidential",
        "Hosting migration and deployment pipelines, Stripe billing fixes, authentication hardening, code review and automated tests",
      ],
    },
    {
      title: "Software Developer Intern",
      org: "Mvolo · Remote (Netherlands)",
      period: "June 2026 – August 2026",
      highlights: [
        "Remote internship with an international founding team; the product and its internals are covered by an NDA",
      ],
    },
    {
      title: "Asset Management Specialist Intern",
      org: "Lexmark (now Xerox) · Cebu City",
      period: "June 2025 – January 2026",
      highlights: [
        "Built and maintained internal tracking tools for enterprise hardware asset lifecycle management",
        "Worked with cross-functional IT teams to keep asset records consistent across systems",
        "Supported process documentation and operational reporting for the asset management department",
      ],
    },
    {
      title: "Volunteer Work",
      org: "Various Events & Organizations",
      period: "2022 – Present",
      highlights: [
        "Technical Volunteer, MSG 2026; runner, registration team and manpower volunteer at MSG 2022–2024",
        "Volunteer, Geeks on a Beach 2024 tech conference; lighting technician for school events, 2024–2025",
        "Technical volunteer, Mx. Komsai 2023–2025; talents volunteer, Otakufest 2026; security and sanitation volunteer, Otakufest 2025",
      ],
    },
    {
      title: "Manager & Operations Support",
      org: "Family Business – Rice Trading · Zamboanga City",
      period: "High School – Present",
      highlights: [
        "Ran day-to-day operations, inventory tracking and customer relations",
        "Coordinated warehouse work and deliveries; still help during breaks",
      ],
    },
  ],
  social: {
    github: "https://github.com/jasrulete",
    linkedin: "https://www.linkedin.com/in/jeric-ashley-rulete-002b23364/",
  },
} as const;
