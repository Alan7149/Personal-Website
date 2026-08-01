"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import { experiences } from "@/data/experience";

export default function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 75%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <section id="experience" className="relative mx-auto max-w-3xl px-6 py-24">
      <SectionHeading title="Experience" align="left" />

      <div className="relative pl-8" ref={lineRef}>
        {/* Track + subtle draw line */}
        <div className="absolute left-0 top-1 h-full w-px bg-white/10" />
        <motion.div
          style={{ scaleY }}
          className="absolute left-0 top-1 h-full w-px origin-top bg-accent/70"
        />

        <div className="space-y-10">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <span className="absolute -left-[35px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-ink" />
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                {exp.period}
              </p>
              <h3 className="mt-1 font-display text-lg font-bold">{exp.role}</h3>
              <p className="text-sm font-medium text-white/60">
                {exp.company}
                {exp.location ? ` · ${exp.location}` : ""}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                {exp.summary}
              </p>
              <ul className="mt-3 space-y-1.5">
                {exp.points.map((pt) => (
                  <li key={pt} className="flex gap-2 text-sm text-white/70">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-white/30" />
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
