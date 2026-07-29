// ─────────────────────────────────────────────────────────────
//  EDIT ME: your projects. Add/remove entries freely.
//  - `video` (optional): a direct .mp4/.webm URL or YouTube embed URL.
//  - `image` (optional): path under /public (e.g. "/projects/jarvis.svg").
//                        Swap the generated SVG covers for real screenshots
//                        any time — just drop a file in /public/projects.
//  - `links`: any number of labelled buttons (live site, repo, demo…).
// ─────────────────────────────────────────────────────────────

export type ProjectLink = { label: string; href: string };

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  tech: string[];
  accent: string; // hex used for glow/gradient
  year: string;
  image?: string;
  video?: string;
  links: ProjectLink[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "jarvis",
    title: "JARVIS",
    tagline: "An Iron-Man-style personal AI assistant",
    description:
      "A full-stack, voice-driven AI assistant that controls your machine, monitors your system, indexes documents, and helps you code — powered by Claude with streaming tool use and a movie-grade HUD interface.",
    highlights: [
      "Claude-powered agent with 30+ tools and a 4-level permission system",
      "Voice pipeline: faster-whisper (STT) + ElevenLabs/Piper (TTS)",
      "Live system monitoring with WebSocket + Telegram + ntfy alerts",
    ],
    tech: ["FastAPI", "Claude API", "React", "Vite", "PostgreSQL", "Redis", "WebSockets"],
    accent: "#38bdf8",
    year: "2026",
    image: "/projects/jarvis.svg",
    links: [],
    featured: true,
  },
  {
    slug: "zeovpn",
    title: "ZeoVPN",
    tagline: "WireGuard VPN control plane with a live dashboard",
    description:
      "A WireGuard-based VPN control plane featuring rotating egress, multi-hop routing, Tor-over-VPN, and a kill switch — wrapped in a premium real-time dashboard and shipped as an Electron desktop app.",
    highlights: [
      "Rotating egress + multi-hop routing state machine",
      "Tor-over-VPN controller and network kill switch",
      "Live canvas dashboard + Electron desktop shell with installers",
    ],
    tech: ["Node.js", "Express", "WebSockets", "Electron", "WireGuard"],
    accent: "#6366f1",
    year: "2026",
    image: "/projects/zeovpn.svg",
    links: [{ label: "GitHub", href: "https://github.com/Alan7149/ZeoVPN" }],
    featured: true,
  },
  {
    slug: "khoya",
    title: "Khoya — Be the Statement",
    tagline: "A full-featured clothing e-commerce platform",
    description:
      "A production-grade fashion e-commerce site with a bilingual brand identity, dual payment gateways, a 13-tab admin control room, loyalty program, and a deep catalog/order/analytics data model.",
    highlights: [
      "React + Django/DRF storefront with JWT auth and role separation",
      "Razorpay (₹) + Stripe ($) with region toggle",
      "Loyalty tiers, referrals, PWA, SEO, brute-force lockout + 2FA",
    ],
    tech: ["React", "Django", "DRF", "Tailwind", "Razorpay", "Stripe"],
    accent: "#818cf8",
    year: "2026",
    image: "/projects/khoya.svg",
    links: [{ label: "GitLab", href: "https://gitlab.com/alan.babu7149/khoya-website" }],
    featured: true,
  },
  {
    slug: "digital-twins",
    title: "Digital Twins for Supply Chains",
    tagline: "Predicting & mitigating supply chain disruptions",
    description:
      "A comprehensive Digital Twin framework that predicts and mitigates supply chain disruptions — tackling material shortages, rising costs, and lead-time inefficiencies with real-time data and 3D visualization.",
    highlights: [
      "Django + PostgreSQL backend managing real-time supply chain data",
      "React + Three.js frontend for intuitive 3D network visualization",
      "Predictive modelling to flag disruptions before they cascade",
    ],
    tech: ["Python", "Django", "PostgreSQL", "React", "Three.js"],
    accent: "#22d3ee",
    year: "2025",
    image: "/projects/digital-twins.svg",
    links: [],
  },
  {
    slug: "brain-tumor",
    title: "Brain Tumor Detection",
    tagline: "Medical image processing with deep learning",
    description:
      "A machine-learning and deep-learning pipeline that detects and analyzes brain tumors from medical imaging, combining data visualization with modern CV models to speed up and sharpen diagnostics.",
    highlights: [
      "Improved diagnostic accuracy by ~20% on brain tumor detection",
      "Reduced analysis time by ~30% via an optimized ML/DL pipeline",
      "Data-visualization layer for interpretable results",
    ],
    tech: ["Machine Learning", "Deep Learning", "OpenCV", "TensorFlow", "Python"],
    accent: "#60a5fa",
    year: "2024",
    image: "/projects/brain-tumor.svg",
    links: [],
  },
  {
    slug: "crcs-dashboard",
    title: "CRCS Portal Dashboard — AICTE",
    tagline: "Analytics dashboard for educational excellence",
    description:
      "A comprehensive dashboard built for AICTE's CRCS portal to promote educational excellence and productivity — a clean, user-friendly interface with real-time tracking, data visualization, and optimized SEO.",
    highlights: [
      "Real-time tracking + data visualization for decision-making",
      "User-friendly UX design with optimized SEO performance",
      "Django-powered backend serving the analytics views",
    ],
    tech: ["HTML", "CSS", "JavaScript", "Django"],
    accent: "#3b82f6",
    year: "2023",
    image: "/projects/crcs-dashboard.svg",
    links: [],
  },
];
