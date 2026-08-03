"use client";

import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import { profile } from "@/data/profile";

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-5xl px-6 py-24">
      <SectionHeading title="About" align="left" />

      <div className="grid gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-lg leading-relaxed text-white/70"
        >
          {profile.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white/50">
            Tech stack
          </h3>
          <div className="space-y-5">
            {Object.entries(profile.skills).map(([group, items]) => (
              <div key={group}>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-accent-soft">
                  {group}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-white/75"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
