// ─────────────────────────────────────────────────────────────
//  EDIT ME: your personal details, bio, and social links.
//  Everything here flows into the hero, about, and contact sections.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Alan Babu",
  // Short tagline shown under your name in the hero.
  roles: [
    "Full-Stack Developer",
    "AI Engineer",
    "Product Builder",
    "Security Tinkerer",
  ],
  // One-liner that types out in the hero.
  headline: "I build ambitious full-stack products — from AI assistants to VPNs to e-commerce.",
  // Longer intro for the About section.
  about: [
    "I'm a full-stack developer who likes building things that feel like they came from the future. My work spans AI assistants, secure networking tools, and polished e-commerce experiences — usually end to end, from database to pixel.",
    "I care about products that are both powerful and beautiful: fast backends, thoughtful security, and interfaces that make people smile. When I'm not shipping, I'm experimenting with new stacks and tearing apart how things work.",
  ],
  location: "India",
  email: "alan.babu7149@gmail.com",
  // Social / professional links. Leave a value empty ("") to hide that icon.
  socials: {
    github: "https://github.com/Alan7149",
    linkedin: "https://www.linkedin.com/in/alanbabu7149/",
    twitter: "https://x.com/pvt_alan7149",
    email: "mailto:alan.babu7149@gmail.com",
  },
  // Quick stats strip in the hero. Tweak to taste.
  stats: [
    { label: "Projects Shipped", value: "3+" },
    { label: "Full-Stack", value: "End-to-End" },
    { label: "Focus", value: "AI · Web · Security" },
  ],
  // Skills shown in the About section, grouped.
  skills: {
    Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    Backend: ["Python", "FastAPI", "Django / DRF", "Node.js", "Express", "PostgreSQL", "Redis"],
    "AI & Tooling": ["Claude API", "WebSockets", "Docker", "Git", "REST APIs"],
  },
};

export type Profile = typeof profile;
