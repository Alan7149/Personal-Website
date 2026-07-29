"use client";

import { motion } from "framer-motion";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-14 text-center">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        className="mb-3 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-neon-cyan"
      >
        {eyebrow}
      </motion.p>

      {/* Title rises up from behind a mask, word by word */}
      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        className="flex flex-wrap justify-center gap-x-[0.3em] font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
      >
        {title.split(" ").map((word, i) => (
          <span key={i} className="inline-block overflow-hidden py-1">
            <motion.span
              variants={{
                hidden: { y: "110%" },
                show: { y: 0 },
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.h2>

      {/* Animated accent bar */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-4 h-1 w-24 origin-center rounded-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-cyan"
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-5 max-w-2xl text-base text-white/60 sm:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
