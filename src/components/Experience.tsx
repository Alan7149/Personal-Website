"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import { experiences } from "@/data/experience";

export default function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);

  // The timeline line "draws" itself as this block scrolls through view.
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
    <section id="experience" className="relative mx-auto max-w-4xl px-6 py-28">
      <SectionHeading
        eyebrow="Career"
        title="Work Experience"
        subtitle="Where I've applied my craft."
      />

      <div className="relative" ref={lineRef}>
        {/* Track + animated draw line */}
        <div className="absolute left-4 top-2 h-full w-px bg-white/10 md:left-1/2" />
        <motion.div
          style={{ scaleY }}
          className="absolute left-4 top-2 h-full w-px origin-top bg-gradient-to-b from-neon-cyan via-neon-purple to-neon-blue md:left-1/2"
        />

        <div className="space-y-10">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className={`relative pl-12 md:w-1/2 md:pl-0 ${
                i % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
              }`}
            >
              {/* Dot pops in */}
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.15 }}
                className={`absolute left-2.5 top-6 flex h-4 w-4 items-center justify-center rounded-full bg-neon-cyan shadow-[0_0_14px_2px] shadow-neon-cyan/50 ring-4 ring-ink md:left-auto ${
                  i % 2 === 0 ? "md:-right-2" : "md:-left-2"
                }`}
              />
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="glass rounded-2xl p-6"
              >
                <div className={`mb-2 flex items-center gap-2 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                  <Briefcase size={16} className="text-neon-cyan" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-neon-cyan">
                    {exp.period}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold">{exp.role}</h3>
                <p className="text-sm font-medium text-neon-blue">
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
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
