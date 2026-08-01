"use client";

import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { profile } from "@/data/profile";

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
} as const;

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-white/40">
          © {new Date().getFullYear()} {profile.name}
        </p>

        <div className="flex items-center gap-3">
          {Object.entries(profile.socials).map(([key, href]) => {
            if (!href) return null;
            const Icon = socialIcons[key as keyof typeof socialIcons];
            if (!Icon) return null;
            return (
              <a
                key={key}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={key}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/50 transition-colors hover:border-white/25 hover:text-white"
              >
                <Icon size={16} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
