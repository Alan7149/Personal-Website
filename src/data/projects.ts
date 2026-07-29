// ─────────────────────────────────────────────────────────────
//  EDIT ME: your projects. Add/remove entries freely.
//  - `video` (optional): a direct .mp4/.webm URL or YouTube embed URL.
//  - `image` (optional): path under /public (e.g. "/projects/jarvis.png").
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
  accent: string; // tailwind-ish hex used for glow/gradient
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
      "Iron-Man HUD dashboard: chat, alerts, devices, tools, logs",
    ],
    tech: ["FastAPI", "Claude API", "React", "Vite", "PostgreSQL", "Redis", "WebSockets"],
    accent: "#22d3ee",
    year: "2026",
    links: [
      // Add a repo or demo link here when ready:
      // { label: "GitHub", href: "https://github.com/Alan7149/JARVIS" },
    ],
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
      "Zero-dependency X25519 key generation via Node crypto",
      "Live canvas dashboard + Electron desktop shell with installers",
    ],
    tech: ["Node.js", "Express", "WebSockets", "Electron", "WireGuard"],
    accent: "#a855f7",
    year: "2026",
    links: [{ label: "GitHub", href: "https://github.com/Alan7149/ZeoVPN" }],
    featured: true,
  },
  {
    slug: "khoya",
    title: "Khoya — Be the Statement",
    tagline: "A full-featured clothing e-commerce platform",
    description:
      "A production-grade fashion e-commerce site with a bilingual brand identity (खोYA), dual payment gateways, a 13-tab admin control room, loyalty program, and a deep catalog/order/analytics data model.",
    highlights: [
      "React + Django/DRF storefront with JWT auth and role separation",
      "Razorpay (₹) + Stripe ($) with region toggle",
      "Admin control room: analytics, inventory, orders, coupons, reviews, journal",
      "Loyalty tiers, referrals, PWA, SEO, brute-force lockout + 2FA",
    ],
    tech: ["React", "Django", "DRF", "Tailwind", "Razorpay", "Stripe", "SQLite"],
    accent: "#ff2d96",
    year: "2026",
    links: [
      { label: "GitLab", href: "https://gitlab.com/alan.babu7149/khoya-website" },
    ],
    featured: true,
  },
];
