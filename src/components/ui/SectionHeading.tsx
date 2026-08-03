"use client";

import { motion } from "framer-motion";
import MaskText from "./MaskText";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const alignment =
    align === "left" ? "text-left items-start" : "text-center items-center";
  return (
    <div className={`mb-12 flex flex-col ${alignment}`}>
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-2 text-sm font-medium uppercase tracking-wider text-accent"
        >
          {eyebrow}
        </motion.p>
      )}

      <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
        <MaskText text={title} />
      </h2>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className={`mt-4 h-0.5 w-12 origin-left rounded-full bg-accent ${
          align === "left" ? "" : "mx-auto"
        }`}
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`mt-4 max-w-2xl text-base text-white/55 ${
            align === "left" ? "" : "mx-auto"
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
