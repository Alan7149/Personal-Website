"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-4xl px-6 py-28">
      <SectionHeading
        eyebrow="Career"
        title="Work Experience"
        subtitle="Where I've applied my craft."
      />

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-2 h-full w-px bg-gradient-to-b from-neon-pink via-neon-purple to-transparent md:left-1/2" />

        <div className="space-y-10">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`relative pl-12 md:w-1/2 md:pl-0 ${
                i % 2 === 0
                  ? "md:pr-12 md:text-right"
                  : "md:ml-auto md:pl-12"
              }`}
            >
              {/* Dot */}
              <span
                className={`absolute left-2.5 top-6 flex h-4 w-4 items-center justify-center rounded-full bg-neon-purple ring-4 ring-ink md:left-auto ${
                  i % 2 === 0 ? "md:-right-2" : "md:-left-2"
                }`}
              />
              <div className="glass rounded-2xl p-6">
                <div className={`mb-2 flex items-center gap-2 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                  <Briefcase size={16} className="text-neon-cyan" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-neon-cyan">
                    {exp.period}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold">{exp.role}</h3>
                <p className="text-sm font-medium text-neon-pink">
                  {exp.company}
                  {exp.location ? ` · ${exp.location}` : ""}
                </p>
                <p className="mt-3 text-sm text-white/60">{exp.summary}</p>
                <ul className={`mt-3 space-y-1.5 ${i % 2 === 0 ? "md:text-right" : ""}`}>
                  {exp.points.map((pt) => (
                    <li key={pt} className="text-sm text-white/70">
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
