"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { ArrowDown, Github, Linkedin, Twitter, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import Magnetic from "./ui/Magnetic";
import HeroCanvas from "./ui/HeroCanvas";

// Runs before paint on the client, no-ops on the server.
const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
} as const;

const nameWords = [
  { w: "Hi,", c: "text-white" },
  { w: "I'm", c: "text-white" },
  ...profile.name.split(" ").map((w) => ({ w, c: "text-accent" })),
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  // Entrance only plays once the tab is actually visible; otherwise everything
  // stays at its final visible state (fixes the "invisible in a background tab"
  // bug that rAF-driven reveals suffer from).
  const [heroIn, setHeroIn] = useState(false);

  useIso(() => {
    if (document.visibilityState === "visible") {
      setHeroIn(true);
      return;
    }
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        setHeroIn(true);
        document.removeEventListener("visibilitychange", onVisible);
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % profile.roles.length),
      4200
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="top"
      className={`relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center ${
        heroIn ? "hero-in" : ""
      }`}
    >
      {/* Ambient interactive backdrop */}
      <HeroCanvas />
      {/* Legibility vignette between the canvas and the content */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_55%_45%_at_50%_45%,rgba(7,11,22,0.55),transparent_75%)]"
      />

      <div className="relative z-10 flex w-full flex-col items-center">
      <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
        {nameWords.map((n, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden pb-[0.14em] align-bottom"
          >
            <span
              className={`r-word inline-block ${n.c}`}
              style={{ animationDelay: `${(0.1 + i * 0.05).toFixed(2)}s` }}
            >
              {n.w}
            </span>
            {i < nameWords.length - 1 ? " " : null}
          </span>
        ))}
      </h1>

      <div className="mt-4 flex h-9 items-center justify-center font-display text-xl font-medium text-white/70 sm:text-2xl">
        <span key={roleIndex} className="role-rotate">
          {profile.roles[roleIndex]}
        </span>
      </div>

      <p
        className="r-fade mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
        style={{ animationDelay: "0.4s" }}
      >
        {profile.headline}
      </p>

      <div
        className="r-fade mt-9 flex flex-wrap items-center justify-center gap-3"
        style={{ animationDelay: "0.5s" }}
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
      </div>

      <div
        className="r-fade mt-8 flex items-center gap-3"
        style={{ animationDelay: "0.6s" }}
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
      </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 z-10 text-white/30 transition-colors hover:text-white/60"
        aria-label="Scroll down"
      >
        <ArrowDown size={22} />
      </a>
    </section>
  );
}
