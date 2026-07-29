"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * A two-part cursor: a small precise dot (blends against any background) and a
 * larger ring that lags behind with spring physics and grows over interactive
 * elements. Plus a soft spotlight glow that trails the pointer. Fine-pointer
 * devices only; disabled for touch and reduced-motion users.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 350, damping: 28, mass: 0.5 });
  const ringY = useSpring(dotY, { stiffness: 350, damping: 28, mass: 0.5 });
  const glowX = useSpring(dotX, { stiffness: 80, damping: 20, mass: 0.6 });
  const glowY = useSpring(dotY, { stiffness: 80, damping: 20, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    const move = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      const el = e.target as HTMLElement;
      setHovering(
        !!el.closest("a, button, [data-cursor], input, textarea, [role='button']")
      );
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [dotX, dotY]);

  if (!enabled) return null;

  return (
    <>
      {/* Spotlight glow */}
      <motion.div
        aria-hidden
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none fixed left-0 top-0 z-[60] -ml-[250px] -mt-[250px] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.16),transparent_60%)]"
      />
      {/* Lagging ring */}
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[70]"
      >
        <motion.span
          animate={{
            width: hovering ? 56 : 34,
            height: hovering ? 56 : 34,
            opacity: hovering ? 1 : 0.6,
            borderColor: hovering ? "#22d3ee" : "#ffffff",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="block rounded-full border-2"
          style={{ transform: "translate(-50%,-50%)" }}
        />
      </motion.div>
      {/* Precise dot */}
      <motion.div
        aria-hidden
        style={{ x: dotX, y: dotY }}
        className="pointer-events-none fixed left-0 top-0 z-[71]"
      >
        <span
          className="block h-2 w-2 rounded-full bg-white mix-blend-difference"
          style={{ transform: "translate(-50%,-50%)" }}
        />
      </motion.div>
    </>
  );
}
