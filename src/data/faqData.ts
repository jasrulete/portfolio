// faqData.ts
// Central knowledge base for the portfolio FAQ chatbot.
// Edit this file to keep the chatbot's answers accurate — it never invents anything
// beyond what's written here.

export interface FaqEntry {
  id: string;
  question: string;       // the "canonical" phrasing shown as a suggestion chip
  keywords: string[];     // extra phrasings/synonyms to help fuzzy matching
  answer: string;
}

export const faqData: FaqEntry[] = [
  {
    id: "who-are-you",
    question: "Who are you?",
    keywords: ["introduce yourself", "about you", "background", "tell me about jeric"],
    answer:
      "I'm Jeric, a BS Computer Science graduate of the University of the Philippines Cebu (July 2026), based in Cebu City. I build full-stack web apps with Next.js, TypeScript and PostgreSQL, and I write the unit, component and end-to-end tests for them. Right now I'm doing contract development work, and I'm open to other opportunities.",
  },
  {
    id: "tech-stack",
    question: "What's your tech stack?",
    keywords: ["skills", "technologies", "what do you use", "languages", "frameworks"],
    answer:
      "TypeScript, React and Next.js on the front end; Node.js with Express, or Next.js Server Actions, on the back end; PostgreSQL, SQLite and MongoDB, with Prisma or plain SQL. For testing I use Vitest, Supertest, Testing Library, Jest and Playwright, with GitHub Actions running them on every push, and Docker Compose for local stacks. I also work in Python with pandas, have written a Shopify theme by hand in Liquid, built an Android companion app with React Native and Expo, and built a small Laravel app with login and per-user access control. I use AI coding assistants, and I disclose it where it matters — the Kitchen Line theme's README says so outright.",
  },
  {
    id: "experience",
    question: "What work experience do you have?",
    keywords: ["internship", "jobs", "employment history", "companies worked"],
    answer:
      "Since July 2026 I've been doing remote full-stack contract work on SaaS web applications: a hosting migration and deployment pipelines, Stripe billing fixes, authentication hardening and automated tests. The clients and the details of their systems stay confidential. From June to August 2026 I was also a Software Developer Intern at Mvolo, a remote internship with an international founding team. The product and its internals are covered by an NDA, so that's as much as I can say about it. From June 2025 to January 2026 I was an Asset Management Specialist Intern at Lexmark (now Xerox) in Cebu City, where I built and maintained internal tracking tools for enterprise hardware asset lifecycle management and worked with IT teams to keep asset records consistent across systems. I've also helped run my family's rice trading business since high school: operations, inventory and deliveries.",
  },
  {
    id: "ai-agent-project",
    question: "Tell me about your local AI agent project",
    keywords: ["chatbot project", "ollama", "chromadb", "rag project", "local llm"],
    answer:
      "Hermes is a command-line chatbot that runs entirely on my own machine, with no cloud API keys. Ollama serves the model, ChromaDB stores past exchanges as sentence-transformer embeddings so it can pull relevant history back into context after a restart, and it can search the web through DuckDuckGo and read local files. I didn't use an agent framework for the tools: the model writes tool-call blocks and my own code parses and runs them. For something you can click instead, DocChat is a hosted RAG app — upload a PDF or paste a URL and it answers with page or URL citations. Both are on my GitHub rather than in the Projects section.",
  },
  {
    id: "thesis",
    question: "What was your thesis about?",
    keywords: ["undergraduate thesis", "research", "iot security", "capstone"],
    answer:
      "My thesis, 'Design and Evaluation of a Context-Aware Edge Security Framework for Smart Home IoT Devices,' introduced a Contextual Quadruple (device criticality, battery level, RSSI, and an ML-inferred threat level) to adaptively switch between AES-128 and ChaCha20 encryption. Across 180 simulation runs on the CICIoT2023 dataset, it achieved a 63.40% reduction in mean response time and a 27.39% reduction in energy consumption, both statistically significant at p < 0.001.",
  },
  {
    id: "languages",
    question: "What languages do you speak?",
    keywords: ["multilingual", "spoken languages", "japanese", "visayan"],
    answer:
      "Visayan (my mother tongue), Tagalog, English (C1, largely self-taught through games and online media), Chavacano, plus basic Japanese and Spanish.",
  },
  {
    id: "projects",
    question: "What projects have you built?",
    keywords: ["portfolio projects", "what have you made", "show me your work"],
    answer:
      "The ones I'd show you first: ShelfStock, a store with a row-locked checkout, 262 API tests and an Android companion app; Nexus CRM, which has an AI layer, Playwright tests and a prompt-injection eval; Kitchen Line Supply, a Shopify theme hand-written in Liquid; Pulse, a take-home assessment where I fixed a broken WebRTC app and closed two critical session vulnerabilities; my thesis on adaptive encryption for smart-home IoT; a NetLogo agent-based model of bridge degradation I co-wrote for a course; and AmBot, a backtesting pipeline whose honest result was that none of the strategies worked. They're all in the Projects section, or the Projects app in desktop mode. Smaller experiments are on my GitHub.",
  },
  {
    id: "site-features",
    question: "What can this site do?",
    keywords: [
      "easter eggs",
      "view modes",
      "desktop mode",
      "command palette",
      "ctrl k",
      "design lab",
      "features of this site",
      "hidden features",
    ],
    answer:
      "More than scroll. Press Ctrl+K (or Cmd+K) anywhere for a command palette that jumps to sections and projects, toggles the theme, and switches into the desktop OS mode — draggable windows, a working terminal, playable Snake and Minesweeper, a camera with a thumbs-up photo timer, and a live gesture-recognition app, all over the same content. That mode is also one link away at the bottom of the page. Click any skill chip to see the projects that use it, and open the Design Lab section for the design system this site runs on.",
  },
  {
    id: "how-built",
    question: "How was this site built?",
    keywords: [
      "tech behind this site",
      "portfolio stack",
      "how did you make this",
      "is this chatbot an ai",
      "what powers this website",
    ],
    answer:
      "React 19 + TypeScript + Vite + Tailwind CSS, deployed to GitHub Pages through GitHub Actions. Fun fact: this chatbot is not an LLM — it's Fuse.js fuzzy search over a hand-written FAQ file, so it can only tell you things Jeric actually wrote. Images lazy-load behind skeletons, and every animation respects prefers-reduced-motion.",
  },
  {
    id: "hire-you",
    question: "Are you looking for work?",
    keywords: ["available for hire", "open to opportunities", "job search", "contact"],
    answer:
      "I'm doing contract development work right now, and I'm open to other opportunities — software developer, web developer or QA engineer roles. You can reach me through the contact form, at rulete.jeric@gmail.com, or on GitHub and LinkedIn, both linked in the footer.",
  },
];
