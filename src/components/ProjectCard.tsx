"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Play, Sparkles } from "lucide-react";
import type { Project } from "@/data/projects";

function LinkIcon({ label }: { label: string }) {
  if (/git(hub|lab)/i.test(label)) return <Github size={16} />;
  if (/video|demo|watch|play/i.test(label)) return <Play size={16} />;
  return <ArrowUpRight size={16} />;
}

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      whileHover={{ y: -8 }}
      className="glow-border group relative flex flex-col overflow-hidden rounded-3xl glass p-6"
      style={{ ["--accent" as string]: project.accent }}
    >
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
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
