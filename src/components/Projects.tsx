"use client";

import SectionHeading from "./ui/SectionHeading";
import ProjectCard from "./ProjectCard";
import Marquee from "./ui/Marquee";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Selected work"
          title="Projects"
          subtitle="A few things I've designed and built end to end — from AI agents to secure networking to commerce."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>

      <div className="mt-20">
        <Marquee />
      </div>
    </section>
  );
}
