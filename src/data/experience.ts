// ─────────────────────────────────────────────────────────────
//  EDIT ME: your work experience + the websites you've built.
//  These are PLACEHOLDERS — replace with your real roles/sites.
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
    role: "Full-Stack Developer",
    company: "Freelance / Independent",
    period: "2024 — Present",
    location: "Remote",
    summary:
      "Designing and shipping full-stack products end to end — AI tools, secure networking apps, and e-commerce platforms.",
    points: [
      "Built JARVIS, an AI assistant with a Claude-powered agent and 30+ tools.",
      "Built ZeoVPN, a WireGuard control plane with a live dashboard and desktop app.",
      "Built Khoya, a production-grade e-commerce platform with dual payment gateways.",
    ],
  },
  {
    role: "— Add your role —",
    company: "— Company / Client —",
    period: "20XX — 20XX",
    location: "City, Country",
    summary: "Replace this placeholder with a real position, internship, or major client project.",
    points: [
      "Key achievement or responsibility #1.",
      "Key achievement or responsibility #2.",
    ],
  },
];

// Websites you've built / launched. Add a screenshot under /public/sites
// and set `image` to show it, otherwise a gradient card is used.
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
    blurb: "Full clothing e-commerce storefront + admin control room.",
    tags: ["E-commerce", "React", "Django"],
  },
  {
    name: "ZeoVPN Dashboard",
    url: "https://github.com/Alan7149/ZeoVPN",
    blurb: "Real-time VPN control-plane dashboard and desktop app.",
    tags: ["Dashboard", "Node.js", "Electron"],
  },
  {
    name: "— Add a website —",
    blurb: "Replace with another site you've built and link it live.",
    tags: ["Web"],
  },
];
