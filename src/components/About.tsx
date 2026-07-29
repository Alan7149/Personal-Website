"use client";

import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import { profile } from "@/data/profile";

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading eyebrow="Who I am" title="About Me" />

      <div className="grid gap-10 md:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="md:col-span-3"
        >
          <div className="space-y-5 text-lg leading-relaxed text-white/70">
            {profile.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="md:col-span-2"
        >
          <div className="glass rounded-3xl p-6">
            <h3 className="mb-5 font-display text-lg font-semibold">
              Tech I work with
            </h3>
            <div className="space-y-5">
              {Object.entries(profile.skills).map(([group, items]) => (
                <div key={group}>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-neon-cyan">
                    {group}
                  </p>
                  <motion.div
                    className="flex flex-wrap gap-2"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                    variants={{ show: { transition: { staggerChildren: 0.04 } } }}
                  >
                    {items.map((s) => (
                      <motion.span
                        key={s}
                        variants={{
                          hidden: { opacity: 0, y: 12, scale: 0.9 },
                          show: { opacity: 1, y: 0, scale: 1 },
                        }}
                        whileHover={{ y: -3, scale: 1.05 }}
                        className="cursor-default rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80 transition-colors hover:border-neon-purple/50 hover:text-white"
                      >
                        {s}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
