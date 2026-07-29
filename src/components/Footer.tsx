"use client";

import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";
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
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <a href="#top" className="font-display text-xl font-bold text-gradient">
            {profile.name}
          </a>
          <p className="mt-1 text-sm text-white/40">
            Building the future, one project at a time.
          </p>
        </div>

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
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition-all hover:scale-110 hover:text-neon-cyan"
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-6xl border-t border-white/5 pt-6 text-center text-sm text-white/35">
        <p className="flex items-center justify-center gap-1.5">
          © {new Date().getFullYear()} {profile.name}. Built with
          <Heart size={13} className="text-neon-pink" fill="currentColor" />
          using Next.js.
        </p>
      </div>
    </footer>
  );
}
