"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/data/profile";

/**
 * Full-screen intro: a count-up to 100 while the name reveals, then the
 * panel splits and wipes away. Shows once per browser session.
 */
export default function Preloader() {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("ab_intro_seen")) return;

    setShow(true);
    document.body.style.overflow = "hidden";

    const start = performance.now();
    const dur = 1900;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      // easeOutExpo for a snappy count
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          sessionStorage.setItem("ab_intro_seen", "1");
          document.body.style.overflow = "";
          setShow(false);
        }, 550);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Split curtains */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-ink"
            initial={{ y: 0 }}
            animate={{ y: count >= 100 ? "-100%" : 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-ink"
            initial={{ y: 0 }}
            animate={{ y: count >= 100 ? "100%" : 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          />

          {/* Center content */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            animate={{ opacity: count >= 100 ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-4xl font-bold tracking-tight sm:text-6xl"
              >
                <span className="text-gradient">{profile.name}</span>
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-3 text-sm uppercase tracking-[0.35em] text-white/40"
            >
              Portfolio
            </motion.p>
          </motion.div>

          {/* Counter */}
          <div className="absolute bottom-8 right-8 font-display text-6xl font-bold tabular-nums text-white/90 sm:text-8xl">
            {count}
            <span className="text-neon-pink">%</span>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 h-1 w-full bg-white/5">
            <div
              className="h-full bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan transition-[width] duration-100 ease-out"
              style={{ width: `${count}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
