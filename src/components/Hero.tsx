"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowDown, Github, Linkedin, Twitter, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import Magnetic from "./ui/Magnetic";
import Waves from "./ui/Waves";

// The 3D blob is WebGL/heavy — load it client-only so it never touches SSR.
const HeroBlob = dynamic(() => import("./ui/HeroBlob"), { ssr: false });

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
} as const;

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // Scroll-driven parallax: content drifts up + fades as you scroll away.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const ySub = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Mouse-follow parallax on the hero.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const tiltX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const tiltY = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const glowX = useTransform(sx, [-0.5, 0.5], [-40, 40]);
  const glowY = useTransform(sy, [-0.5, 0.5], [-40, 40]);

  useEffect(() => {
    setMounted(true);
    // Only mount the WebGL blob for non-reduced-motion users.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setShow3D(!reduced);
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % profile.roles.length),
      2200
    );
    return () => clearInterval(id);
  }, []);

  // Scroll-driven styles are only applied after mount to avoid an SSR
  // hydration mismatch (server renders opacity:1, client computes from scroll).
  const scrollStyle = (s: Record<string, unknown>) => (mounted ? s : undefined);

  function onMouseMove(e: React.MouseEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMouseMove}
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center"
    >
      {/* Mouse-reactive glow orb behind the name */}
      <motion.div
        aria-hidden
        style={scrollStyle({ x: glowX, y: glowY })}
        className="pointer-events-none absolute top-1/3 h-[420px] w-[420px] rounded-full bg-neon-purple/20 blur-[120px]"
      />

      {/* 3D wavy blob (WebGL), behind the content */}
      <div className="pointer-events-none absolute left-1/2 top-[25%] z-0 h-[min(50vw,380px)] w-[min(50vw,380px)] -translate-x-1/2 -translate-y-1/2 opacity-75">
        {mounted && show3D && <HeroBlob />}
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex w-full flex-col items-center">
        <motion.div
          style={scrollStyle({ y: yTitle, opacity, rotateX: tiltX, rotateY: tiltY })}
          className="flex flex-col items-center [transform-style:preserve-3d] [perspective:1000px]"
        >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-lime opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-lime" />
          </span>
          Available for work · {profile.location}
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="show"
          variants={{
            show: { transition: { staggerChildren: 0.045, delayChildren: 0.15 } },
          }}
          className="font-display text-5xl font-bold leading-[1.05] tracking-tight [text-shadow:0_2px_30px_rgba(5,9,20,0.75)] sm:text-7xl md:text-8xl"
        >
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            className="text-white/90"
          >
            Hi, I&apos;m{" "}
          </motion.span>
          <span className="text-gradient">
            {profile.name.split("").map((ch, i) =>
              ch === " " ? (
                <span key={i}>&nbsp;</span>
              ) : (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 40, rotateX: -80 },
                    show: { opacity: 1, y: 0, rotateX: 0 },
                  }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block [transform-style:preserve-3d]"
                >
                  {ch}
                </motion.span>
              )
            )}
          </span>
        </motion.h1>

        <div className="mt-5 h-9 overflow-hidden font-display text-2xl font-semibold text-white/80 [text-shadow:0_2px_20px_rgba(5,9,20,0.85)] sm:text-3xl">
          <motion.div
            key={roleIndex}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {profile.roles[roleIndex]}
          </motion.div>
        </div>
      </motion.div>

      <motion.p
        style={scrollStyle({ y: ySub, opacity })}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="mx-auto mt-6 max-w-2xl text-base text-white/60 sm:text-lg"
      >
        {profile.headline}
      </motion.p>

      <motion.div
        style={scrollStyle({ opacity })}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="mt-9 flex flex-wrap items-center justify-center gap-3"
      >
        <Magnetic>
          <a
            href="#projects"
            className="block rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple px-6 py-3 font-semibold text-white shadow-lg shadow-neon-purple/40"
          >
            View my work
          </a>
        </Magnetic>
        <Magnetic>
          <a
            href="#contact"
            className="block rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white/90 transition-colors hover:bg-white/10"
          >
            Get in touch
          </a>
        </Magnetic>
      </motion.div>

      <motion.div
        style={scrollStyle({ opacity })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-8 flex items-center gap-4"
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
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-all hover:scale-110 hover:border-neon-cyan/50 hover:text-neon-cyan"
            >
              <Icon size={20} />
            </a>
          );
        })}
      </motion.div>

      {/* Stats strip */}
      <motion.div
        style={scrollStyle({ opacity })}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-14 grid w-full max-w-2xl grid-cols-3 gap-4"
      >
        {profile.stats.map((s) => (
          <div key={s.label} className="glass rounded-2xl px-4 py-5">
            <div className="font-display text-2xl font-bold text-gradient sm:text-3xl">
              {s.value}
            </div>
            <div className="mt-1 text-xs text-white/50 sm:text-sm">{s.label}</div>
          </div>
        ))}
      </motion.div>

      <motion.a
        href="#about"
        style={scrollStyle({ opacity })}
        animate={{ y: [0, 10, 0] }}
        transition={{ y: { duration: 1.8, repeat: Infinity } }}
        className="mt-16 text-white/40 hover:text-white"
        aria-label="Scroll down"
      >
        <ArrowDown />
      </motion.a>
      </div>

      {/* Flowing waves at the base of the hero */}
      <Waves className="z-0" />
    </section>
  );
}
