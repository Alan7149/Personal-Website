"use client";

/**
 * Restrained backdrop: a subtle masked grid plus two very soft, slow-drifting
 * ambient glows. Kept deliberately quiet so it never competes with content.
 */
export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-accent/10 blur-[130px]" />
      <div className="absolute -bottom-40 right-[-10%] h-[460px] w-[460px] rounded-full bg-indigo-500/10 blur-[130px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/30 to-ink" />
    </div>
  );
}
