// ─────────────────────────────────────────────────────────────
//  Work experience + the websites you've built.
//  Experience is sourced from Alan's resume (TEKNOSys, CISCO).
// ─────────────────────────────────────────────────────────────

export type Experience = {
  role: string;
  company: string;
  period: string;
  location?: string;
  summary: string;
  points: string[];
};

export const experiences: Experience[] = [
  {
    role: "Independent Developer",
    company: "Personal Projects",
    period: "2024 — Present",
    location: "Remote",
    summary:
      "Designing and shipping ambitious full-stack products end to end: AI tools, secure networking apps, and e-commerce platforms.",
    points: [
      "Built JARVIS, an AI assistant with a Claude-powered agent and 30+ tools.",
      "Built ZeoVPN, a WireGuard control plane with a live dashboard and desktop app.",
      "Built Khoya, a production-grade e-commerce platform with dual payment gateways.",
    ],
  },
  {
    role: "SDE Intern",
    company: "TEKNOSys",
    period: "Nov 2023 — Apr 2024",
    location: "Remote",
    summary:
      "Developed and optimized scalable web applications across the full stack in an Agile environment.",
    points: [
      "Designed efficient backend logic and RESTful APIs with Python, Django and PostgreSQL for reliability and performance.",
      "Built responsive, intuitive user interfaces in React.js following modern UI/UX principles.",
      "Ran rigorous testing, debugging and code reviews to ship critical milestones on time.",
    ],
  },
  {
    role: "Cloud Developer (Intern)",
    company: "CISCO",
    period: "May 2023 — Jun 2023",
    location: "Remote",
    summary:
      "Engineered scalable, secure cloud architectures and automation on AWS.",
    points: [
      "Designed scalable, secure cloud-based architectures on AWS, greatly increasing system efficiency.",
      "Built a Python-driven automation solution to engage traffic violators, improving offense-resolution efficiency.",
    ],
  },
];

// Websites you've built / launched. Set `image` (path under /public) to show
// a cover, otherwise a gradient card is used. Add `url` to make a card clickable.
export type Site = {
  name: string;
  url?: string;
  blurb: string;
  tags: string[];
  image?: string;
};

export const sites: Site[] = [
  {
    name: "Khoya — Be the Statement",
    url: "https://gitlab.com/alan.babu7149/khoya-website",
    blurb: "Full clothing e-commerce storefront + 13-tab admin control room.",
    tags: ["E-commerce", "React", "Django"],
    image: "/projects/khoya.svg",
  },
  {
    name: "ZeoVPN Dashboard",
    url: "https://github.com/Alan7149/ZeoVPN",
    blurb: "Real-time VPN control-plane dashboard and desktop app.",
    tags: ["Dashboard", "Node.js", "Electron"],
    image: "/projects/zeovpn.svg",
  },
  {
    name: "CRCS Portal Dashboard — AICTE",
    blurb: "Analytics dashboard for AICTE with real-time tracking and SEO.",
    tags: ["Dashboard", "Django", "JavaScript"],
    image: "/projects/crcs-dashboard.svg",
  },
  {
    name: "Digital Twins — Supply Chain",
    blurb: "3D supply-chain visualization with React + Three.js and Django.",
    tags: ["Three.js", "React", "Django"],
    image: "/projects/digital-twins.svg",
  },
];
