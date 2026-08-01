"use client";

import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-12 flex flex-col ${alignment}`}
    >
      {eyebrow && (
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <div
        className={`mt-4 h-0.5 w-12 rounded-full bg-accent ${
          align === "left" ? "" : "mx-auto"
        }`}
      />
      {subtitle && (
        <p
          className={`mt-4 max-w-2xl text-base text-white/55 ${
            align === "left" ? "" : "mx-auto"
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
