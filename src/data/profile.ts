export const profile = {
  name: "Jeric Ashley S. Rulete",
  shortName: "Jeric Rulete",
  title: "BS Computer Science · University of the Philippines Cebu",
  tagline:
    "Full-stack developer and CS student building scalable web apps, AI-powered tools, and interactive experiences with React, Next.js, TypeScript, and Python.",
  roles: [
    "Full-Stack Developer",
    "Web Developer",
    "ML Enthusiast",
    "CS Student",
    "Software Engineer",
    
  ] as const,
  projectFilters: ["All", "Web", "Python", "ML", "Desktop"] as const,
  email: "jsrulete@up.edu.ph",
  personalEmail: "rulete.jeric@gmail.com",
  /** Inbox for the Get In Touch form (Web3Forms delivers to the email tied to your access key). */
  formEmail: "rulete.jeric@gmail.com",
  phone: "+63 927 763 7156",
  location: "Cebu City, Philippines",
  expectedGraduation: "July 2026",
  github: "https://github.com/jasrulete",
  portfolio: "https://jasrulete.github.io/portfolio/",
  cvUrl: `${import.meta.env.BASE_URL}Jeric-Rulete_CV.pdf`,
  resumeUrl: `${import.meta.env.BASE_URL}Jeric-Rulete_Resume.pdf`,
  education: {
    school: "University of the Philippines",
    campus: "Gorordo Ave., Cebu City",
    degree: "Bachelor of Science in Computer Science",
    expected: "July 2026",
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
      items: ["Python", "JavaScript", "TypeScript", "C++"],
    },
    {
      title: "Frontend",
      items: ["React", "Next.js", "HTML5", "CSS3", "Tailwind CSS"],
    },
    {
      title: "Backend",
      items: ["Django", "Node.js (basic)", "REST APIs"],
    },
    {
      title: "Databases",
      items: ["MongoDB", "Prisma", "Supabase"],
    },
    {
      title: "Tools & Platforms",
      items: ["Git", "GitHub", "Vercel", "Cloudinary", "Figma", "VS Code"],
    },
    {
      title: "Concepts",
      items: [
        "Machine Learning",
        "NLP",
        "Authentication Systems",
        "Database Design",
        "Responsive Web Design",
      ],
    },
  ],
  projects: [
    {
      title: "Context-Aware Edge Security Framework",
      subtitle: "Special Project · In Progress",
      period: "June 2026",
      description:
        "Designing a context-aware edge security framework for smart home IoT using lightweight ML, adaptive AES/ChaCha20 switching, and M/M/4 queueing models—evaluated via MRT, detection accuracy, energy use, and APJ.",
      tags: [
        "Python",
        "Machine Learning",
        "IoT Security",
        "Edge Computing",
      ],
      category: "ML",
      inProgress: true,
    },
    {
      title: "Sportal",
      subtitle: "Academic Project",
      period: "June 2025",
      description:
        "Next.js tournament platform with MongoDB/Prisma, NextAuth, organizer dashboards, automated brackets (round-robin & single-elimination), Cloudinary uploads, and Leaflet venue maps.",
      tags: [
        "Next.js",
        "TypeScript",
        "Prisma",
        "MongoDB",
        "NextAuth",
        "Tailwind CSS",
      ],
      github: "https://github.com/jasrulete/sportal",
      demo: "https://sportal-10.vercel.app",
      category: "Web",
    },
    {
      title: "Chedula",
      subtitle: "Academic Project · Frontend",
      period: "June 2025",
      description:
        "Next.js 14 app with Supabase auth, multi-step business onboarding, WebSocket AI chat for appointments, and dashboard modules for calendar, CRM, services, and public booking links.",
      tags: [
        "Next.js",
        "TypeScript",
        "Supabase",
        "WebSockets",
        "Zustand",
        "shadcn/ui",
      ],
      category: "Web",
    },
    {
      title: "Toxic Comment Detector",
      subtitle: "Academic Project",
      period: "February 2025",
      description:
        "Binary classifiers on the Jigsaw Toxic Comment dataset with NLTK preprocessing, TF-IDF features, and Streamlit deployment with confidence scores.",
      tags: ["Python", "scikit-learn", "NLTK", "Streamlit", "NLP"],
      github: "https://github.com/jasrulete/toxic-comment-detector",
      category: "ML",
    },
    {
      title: "Minna no Nihongo",
      subtitle: "Academic Project",
      period: "May 2025",
      description:
        "React/Vite PWA with 8 textbook chapters, ~440 vocabulary entries, quiz modes, hiragana practice, streak tracking, and Web Speech API pronunciation—deployed on Netlify.",
      tags: ["React", "Vite", "Tailwind CSS", "PWA", "Zustand"],
      demo: "https://minna-no-nihongo.netlify.app/",
      category: "Web",
    },
    {
      title: "Portfolio Website",
      subtitle: "Academic Project",
      period: "April 2025 – Present",
      description:
        "Responsive React portfolio with dark/light mode, interactive project grid, GitHub links, and live demos—built with Tailwind CSS and optimized for mobile.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      github: "https://github.com/jasrulete/portfolio",
      demo: "https://jasrulete.github.io/portfolio/",
      category: "Web",
    },
    {
      title: "Dungeon Descent",
      subtitle: "Academic Project",
      period: "April 2024",
      description:
        "Turn-based RPG in Python with strategic combat, character progression, and dungeon floors of increasing difficulty.",
      tags: ["Python"],
      github: "https://github.com/jasrulete/dungeon-descend",
      category: "Python",
    },
    {
      title: "BudgetWise",
      subtitle: "Academic Project",
      period: "April 2025",
      description:
        "Personal finance app for expense tracking, income management, and budget visualization with an intuitive dashboard.",
      tags: ["HTML", "CSS", "JavaScript", "Python"],
      github: "https://github.com/jasrulete/finance-app",
      demo: "https://finance-app-three-virid.vercel.app",
      category: "Web",
    },
    {
      title: "HoneyOS",
      subtitle: "Academic Project",
      period: "May 2025",
      description:
        "Web-based OS interface with hexagonal UI, text editor, file explorer, camera, music player, and window management via Neutralino.js.",
      tags: ["HTML", "CSS", "JavaScript", "Neutralino"],
      github: "https://github.com/jasrulete/CMSC-125-HoneyOS",
      category: "Desktop",
    },
  ],
  experience: [
    {
      title: "Asset Management Specialist Intern",
      org: "Lexmark · Samar Loop, Cebu City",
      period: "June 2025 – January 2026",
      highlights: [
        "Assisted in asset inventory tracking and documentation for enterprise hardware and IT resources",
        "Coordinated with internal teams to maintain accurate asset records and lifecycle updates",
        "Supported operational workflows and reporting within the asset management department",
      ],
    },
    {
      title: "Volunteer Work",
      org: "Various Events & Organizations",
      period: "2022 – Present",
      highlights: [
        "Runner, MSG 2023; registration team, MSG 2022 & MSG 2024; manpower volunteer, MSG 2024 & MSG 2026",
        "Volunteer, Geeks on a Beach 2024; technical volunteer, Mx. Komsai 2023–2025",
        "Lighting technician, school events 2024–2025; security & sanitation volunteer, Otakufest 2025",
        "Talents volunteer, Otakufest 2026",
      ],
    },
    {
      title: "Manager & Operations Support",
      org: "Family Business – Rice Trading",
      period: "High School – Present",
      highlights: [
        "Managed daily operations, inventory tracking, and customer relations",
        "Coordinated warehouse work and deliveries; continues to assist during academic breaks",
      ],
    },
  ],
  social: {
    github: "https://github.com/jasrulete",
    facebook: "https://www.facebook.com/hiii.hellooooo/",
    instagram: "https://www.instagram.com/rulete.exe/",
  },
} as const;
