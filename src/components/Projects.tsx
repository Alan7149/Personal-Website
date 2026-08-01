"use client";

import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        title="Projects"
        subtitle="A selection of things I've designed and built end to end."
        align="left"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
          >
            <ProjectCard project={p} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
