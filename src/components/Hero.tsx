"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Twitter, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import MaskText from "./ui/MaskText";
import Magnetic from "./ui/Magnetic";

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
} as const;

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    // Slow, calm rotation so each role is actually read.
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % profile.roles.length),
      4200
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] flex-col items-center justify-center px-6 pt-24 text-center"
    >
      <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
        <MaskText text="Hi, I'm" className="text-white" delay={0.15} />{" "}
        <MaskText text={profile.name} className="text-accent" delay={0.32} />
      </h1>

      <div className="mt-4 flex h-9 items-center justify-center font-display text-xl font-medium text-white/70 sm:text-2xl">
        <span key={roleIndex} className="role-rotate">
          {profile.roles[roleIndex]}
        </span>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg"
      >
        {profile.headline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-9 flex flex-wrap items-center justify-center gap-3"
      >
        <Magnetic strength={0.25}>
          <a
            href="#projects"
            className="block rounded-lg bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-strong"
          >
            View my work
          </a>
        </Magnetic>
        <a
          href="#contact"
          className="rounded-lg border border-white/15 px-6 py-3 font-semibold text-white/90 transition-colors hover:bg-white/5"
        >
          Get in touch
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-8 flex items-center gap-3"
      >
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
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/60 transition-colors hover:border-white/25 hover:text-white"
            >
              <Icon size={18} />
            </a>
          );
        })}
      </motion.div>

      <a
        href="#about"
        className="absolute bottom-8 text-white/30 transition-colors hover:text-white/60"
        aria-label="Scroll down"
      >
        <ArrowDown size={22} />
      </a>
    </section>
  );
}
