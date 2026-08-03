"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const primary = project.links[0]; // whole card links here when present
  const ref = useRef<HTMLElement>(null);

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04]"
    >
      {/* Cursor-following highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(260px circle at var(--mx) var(--my), rgba(59,130,246,0.10), transparent 70%)",
        }}
      />
      {/* Whole card is clickable when there's a link (stretched link — a sibling
          of the content, never nested inside another anchor). */}
      {primary && (
        <a
          href={primary.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title}`}
          className="absolute inset-0 z-0"
        />
      )}

      {/* Cover */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10">
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
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-white/[0.02]">
            <span className="font-display text-4xl font-bold text-white/10">
              {project.title.split(" ")[0]}
            </span>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-md bg-black/40 px-2 py-0.5 text-xs font-medium text-white/70 backdrop-blur">
          {project.year}
        </span>
      </div>

      {/* Body — clear rhythm: title, one-line positioning, summary, proof, tech */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-bold">{project.title}</h3>
        <p className="mt-1 text-sm font-medium text-accent">{project.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-white/55">
          {project.description}
        </p>

        {project.highlights.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {project.highlights.slice(0, 2).map((h) => (
              <li key={h} className="flex gap-2 text-sm text-white/70">
                <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-5">
          <div className="mb-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-white/40">
            {project.tech.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          {primary && (
            <span className="inline-flex items-center gap-1 text-sm font-medium text-white/70 transition-colors group-hover:text-accent">
              {primary.label}
              <ArrowUpRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
