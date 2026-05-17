export const profile = {
  name: "Jeric Ashley S. Rulete",
  shortName: "Jeric Rulete",
  title: "BS Computer Science · University of the Philippines Cebu",
  tagline:
    "Computer science student building responsive web apps, games, and tools with Python and React.",
  roles: [
    "Web Developer",
    "Python Developer",
    "CS Student",
    "Problem Solver",
  ] as const,
  projectFilters: ["All", "Web", "Python", "Desktop"] as const,
  email: "jsrulete@up.edu.ph",
  personalEmail: "rulete.jeric@gmail.com",
  /** Inbox for the Get In Touch form (Web3Forms delivers to the email tied to your access key). */
  formEmail: "rulete.jeric@gmail.com",
  phone: "+63 927 763 7156",
  location: "Cebu City, Philippines",
  expectedGraduation: "May 2026",
  github: "https://github.com/jasrulete",
  portfolio: "https://jasrulete.github.io/portfolio/",
  cvUrl: `${import.meta.env.BASE_URL}Jeric-Rulete-CV.pdf`,
  education: {
    school: "University of the Philippines",
    campus: "Gorordo Ave., Cebu City",
    degree: "Bachelor of Science in Computer Science",
    expected: "Expected May 2026",
    honors: "College Scholar (2nd Semester A.Y. 2023–2024)",
    coursework: [
      "Fundamentals of Programming",
      "Software Engineering",
      "Web Engineering",
      "Data Structures",
      "File Processing and Database Systems",
      "Design and Analysis of Algorithms",
      "Operating Systems",
    ],
  },
  skillGroups: [
    {
      title: "Languages",
      items: ["Python", "C++", "JavaScript"],
    },
    {
      title: "Frontend",
      items: ["HTML", "CSS", "React"],
    },
    {
      title: "Backend",
      items: ["Django (basic)"],
    },
    {
      title: "Tools",
      items: ["Git & GitHub", "Visual Studio Code", "Figma"],
    },
    {
      title: "Soft Skills",
      items: [
        "Team Collaboration",
        "Communication",
        "Problem Solving",
        "Project Management",
      ],
    },
  ],
  projects: [
    {
      title: "Portfolio Website",
      period: "April 2025 – Present",
      description:
        "Responsive portfolio built with React and Tailwind CSS, featuring dark/light mode and an interactive project grid with GitHub links.",
      tags: ["React", "HTML", "CSS", "Tailwind CSS"],
      github: "https://github.com/jasrulete/portfolio",
      demo: "https://jasrulete.github.io/portfolio/",
      category: "Web",
    },
    {
      title: "Dungeon Descent",
      period: "April 2024",
      description:
        "Turn-based RPG in Python with strategic combat, character progression, and dungeon floors of increasing difficulty.",
      tags: ["Python"],
      github: "https://github.com/jasrulete/dungeon-descend",
      category: "Python",
    },
    {
      title: "BudgetWise",
      period: "April 2025",
      description:
        "Personal finance app for tracking income and expenses with budget visualization and an intuitive dashboard.",
      tags: ["HTML", "CSS", "JavaScript", "Python"],
      github: "https://github.com/jasrulete/finance-app",
      category: "Web",
    },
    {
      title: "HoneyOS",
      period: "March 2025 – Present",
      description:
        "Web-based OS interface with a hexagonal UI, text editor, file explorer, camera, music player, and window management via Neutralino.js.",
      tags: ["HTML", "CSS", "JavaScript", "Neutralino"],
      github: "https://github.com/jasrulete/CMSC-125-HoneyOS",
      category: "Desktop",
    },
  ],
  experience: [
    {
      title: "Volunteer Work",
      org: "Various Events & Organizations",
      period: "2022 – 2024",
      highlights: [
        "Runner and registration team for MSG 2022–2024; manpower volunteer for MSG 2024",
        "Technical volunteer for Mx. Komsai 2023–2024 and Geeks on a Beach 2024",
        "Lighting technician for school events; security & sanitation volunteer at Otakufest 2025",
      ],
    },
    {
      title: "Manager & Operations Support",
      org: "Family Rice Trading Business",
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
