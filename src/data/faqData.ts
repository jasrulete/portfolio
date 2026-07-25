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
      "I'm Jeric, a BS Computer Science graduate from the University of the Philippines Cebu (July 2026). I'm based in Cebu City, Philippines, and I build full-stack web apps, AI/automation tools, and the occasional NetLogo simulation when a thesis demands it.",
  },
  {
    id: "tech-stack",
    question: "What's your tech stack?",
    keywords: ["skills", "technologies", "what do you use", "languages", "frameworks"],
    answer:
      "Core stack: React, Next.js, TypeScript, Node.js, Python, MongoDB, Supabase, Prisma, REST APIs, WebSockets, Zustand, shadcn/ui, React Hook Form, Zod, and Tailwind CSS — plus recent hands-on work with PHP/Laravel/Blade. For AI-assisted dev I mainly use Cursor, with GitHub Copilot and ChatGPT in the mix.",
  },
  {
    id: "experience",
    question: "What work experience do you have?",
    keywords: ["internship", "jobs", "employment history", "companies worked"],
    answer:
      "I interned at Lexmark (now Xerox) in IT operations and asset management. I'm currently onboarding into a remote internship with Mvolo / MGR Products B.V., a Dutch e-commerce company.",
  },
  {
    id: "ai-agent-project",
    question: "Tell me about your local AI agent project",
    keywords: ["chatbot project", "ollama", "chromadb", "rag project", "local llm"],
    answer:
      "I built a persistent CLI chatbot completely from scratch and running fully locally on a Windows 11 laptop with an RTX 3060 (6GB VRAM). It uses Ollama for the LLM, ChromaDB for vector storage, sentence-transformers for embeddings, and manual Hermes-style tool calling I wrote myself rather than relying on a framework's built-in agent loop. This FAQ chatbot on my site actually borrows the same retrieval philosophy, just simplified for the browser.",
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
      "A few highlights: the IoT edge security thesis project, Sportal, a Toxic Comment Detector, a Bridge Structural Degradation Simulation in NetLogo (modeled on the Mandaue–Mactan Bridge), and Pulse. Check the Projects section above for details on each.",
  },
  {
    id: "site-features",
    question: "What can this site do?",
    keywords: [
      "easter eggs",
      "view modes",
      "desktop mode",
      "mobile mode",
      "command palette",
      "ctrl k",
      "design lab",
      "features of this site",
      "hidden features",
    ],
    answer:
      "More than scroll! Use the buttons in the bottom-left to switch into a desktop OS mode (draggable windows, taskbar, a working terminal) or a phone-launcher mobile mode — all three views share the same content. Press Ctrl+K (or Cmd+K) anywhere for a command palette, click any skill chip to see the projects that use it, and check the Design Lab section for the design system this site runs on.",
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
      "React 19 + TypeScript + Vite + Tailwind CSS, deployed to GitHub Pages through GitHub Actions. Fun fact: this chatbot is not an LLM — it's Fuse.js fuzzy search over a hand-written FAQ file, so it can only tell you things Jeric actually wrote. Project cards pull live GitHub stats (cached in sessionStorage for an hour), images lazy-load behind skeletons, and every animation respects prefers-reduced-motion.",
  },
  {
    id: "hire-you",
    question: "Are you looking for work?",
    keywords: ["available for hire", "open to opportunities", "job search", "contact"],
    answer:
      "Yes — I'm actively looking for junior developer, QA, and AI-automation roles. Feel free to reach out through the contact section, GitHub, or LinkedIn linked on this site.",
  },
];
