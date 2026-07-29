"use client";

import { motion } from "framer-motion";

/**
 * Full-page animated backdrop: drifting colorful blobs + a masked grid.
 * Purely decorative, sits behind everything (pointer-events: none).
 */
export default function AnimatedBackground() {
  const blobs = [
    { color: "#3b82f6", size: 520, x: "-10%", y: "-8%", delay: 0 },
    { color: "#6366f1", size: 460, x: "70%", y: "10%", delay: 2 },
    { color: "#38bdf8", size: 420, x: "20%", y: "60%", delay: 4 },
    { color: "#22d3ee", size: 380, x: "85%", y: "70%", delay: 1 },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[90px]"
          style={{
            width: b.size,
            height: b.size,
            left: b.x,
            top: b.y,
            background: b.color,
            opacity: 0.28,
          }}
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -30, 25, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 18 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: b.delay,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/40 to-ink" />
    </div>
  );
}
