// ─────────────────────────────────────────────────────────────
//  EDIT ME: your personal details, bio, and social links.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Alan Babu",
  // The 1–2 roles you most want recruiters/clients to remember.
  roles: ["Full-Stack Developer", "AI Engineer"],
  // One-line positioning shown under the name.
  headline:
    "I design and build full-stack products across AI, security, and e-commerce.",
  // Longer intro for the About section.
  about: [
    "I'm a full-stack developer who ships complete products, from database to interface. My work spans AI assistants, secure networking tools, and production e-commerce.",
    "I care about products that are fast, secure, and genuinely useful. I like owning a build end to end and sweating the details that make software feel considered.",
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
  // Skills shown in the About section, grouped.
  skills: {
    Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite"],
    Backend: ["Python", "FastAPI", "Django", "Node.js", "PostgreSQL", "Redis"],
    "AI & Tooling": ["Claude API", "WebSockets", "Docker", "Git"],
  },
};

export type Profile = typeof profile;
