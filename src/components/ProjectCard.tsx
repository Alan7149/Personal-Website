"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Github, Play, Sparkles } from "lucide-react";
import type { Project } from "@/data/projects";

function LinkIcon({ label }: { label: string }) {
  if (/git(hub|lab)/i.test(label)) return <Github size={16} />;
  if (/video|demo|watch|play/i.test(label)) return <Play size={16} />;
  return <ArrowUpRight size={16} />;
}

export default function ProjectCard({
  project,
}: {
  project: Project;
  index?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  // Pointer-driven 3D tilt.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), {
    stiffness: 200,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), {
    stiffness: 200,
    damping: 18,
  });
  // Glare position follows the cursor.
  const glareX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(py, [0, 1], ["0%", "100%"]);

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }
  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        ["--accent" as string]: project.accent,
        rotateX,
        rotateY,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
      }}
      className="glow-border group relative flex h-full flex-col overflow-hidden rounded-3xl glass p-6 transition-shadow duration-300 hover:shadow-2xl hover:shadow-black/40"
    >
      {/* Cursor glare */}
      <motion.div
        aria-hidden
        style={{
          background: useTransform(
            [glareX, glareY],
            ([gx, gy]) =>
              `radial-gradient(220px circle at ${gx} ${gy}, ${project.accent}22, transparent 65%)`
          ),
        }}
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Accent glow */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-70"
        style={{ background: project.accent, opacity: 0.35 }}
      />

      {/* Media */}
      <div className="relative mb-5 aspect-video overflow-hidden rounded-2xl border border-white/10">
        {project.video ? (
          project.video.includes("youtube") || project.video.includes("youtu.be") ? (
            <iframe
              src={project.video}
              title={project.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              src={project.video}
              className="h-full w-full object-cover"
              muted
              loop
              playsInline
              autoPlay
            />
          )
        ) : project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={project.title}
            className="project-media-img h-[118%] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${project.accent}22, transparent 60%), radial-gradient(circle at 70% 30%, ${project.accent}33, transparent 55%)`,
            }}
          >
            <span className="font-display text-5xl font-bold text-white/15">
              {project.title.split(" ")[0]}
            </span>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
          {project.year}
        </span>
        {project.featured && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-neon-amber backdrop-blur">
            <Sparkles size={12} /> Featured
          </span>
        )}
      </div>

      {/* Body */}
      <h3 className="font-display text-2xl font-bold">{project.title}</h3>
      <p
        className="mt-1 text-sm font-medium"
        style={{ color: project.accent }}
      >
        {project.tagline}
      </p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">
        {project.description}
      </p>

      {/* Highlights */}
      <ul className="mt-4 space-y-1.5">
        {project.highlights.slice(0, 3).map((h) => (
          <li key={h} className="flex gap-2 text-sm text-white/70">
            <span
              className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
              style={{ background: project.accent }}
            />
            {h}
          </li>
        ))}
      </ul>

      {/* Tech */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/60"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Links */}
      {project.links.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {project.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white/90 transition-all hover:scale-105 hover:border-white/25"
            >
              <LinkIcon label={l.label} />
              {l.label}
            </a>
          ))}
        </div>
      )}
    </motion.article>
  );
}
