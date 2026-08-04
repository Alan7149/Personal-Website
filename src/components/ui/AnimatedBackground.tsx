"use client";

import { useEffect, useRef } from "react";

/**
 * Page-wide ambient backdrop: a cursor-reactive particle constellation over
 * slow flowing waves, plus two soft color glows — fixed behind all content so
 * it spans the entire page. Pure canvas, self-contained, decorative only
 * (pauses in background tabs). Renders a single static frame for reduced-motion.
 */
type P = { x: number; y: number; vx: number; vy: number };

export default function AnimatedBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };
    let w = 0;
    let h = 0;
    let particles: P[] = [];
    let raf = 0;
    let t = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(36, Math.min(120, Math.floor((w * h) / 16000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
      }));
    };

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      // Flowing waves (lower half of the viewport)
      for (let l = 0; l < 3; l++) {
        const amp = 26 + l * 14;
        const yBase = h * 0.68 + l * 50;
        const k = 0.005 + l * 0.001;
        const speed = t * (1 + l * 0.45);
        ctx.beginPath();
        for (let x = 0; x <= w; x += 8) {
          const y =
            yBase +
            Math.sin(x * k + speed) * amp +
            Math.sin(x * k * 0.5 - speed * 0.7) * amp * 0.4;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(59,130,246,${0.07 - l * 0.018})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // Particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const near = Math.hypot(p.x - mouse.x, p.y - mouse.y) < 150;
        ctx.beginPath();
        ctx.arc(p.x, p.y, near ? 1.9 : 1.2, 0, Math.PI * 2);
        ctx.fillStyle = near ? "rgba(96,165,250,0.9)" : "rgba(130,160,210,0.32)";
        ctx.fill();
      }

      // Links between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) {
            ctx.strokeStyle = `rgba(59,130,246,${0.11 * (1 - d / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Links reaching toward the cursor
      for (const p of particles) {
        const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (d < 150) {
          ctx.strokeStyle = `rgba(96,165,250,${0.26 * (1 - d / 150)})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    };

    const loop = () => {
      t += 0.005;
      render();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      // Canvas is fixed to the viewport, so client coords map directly.
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    if (reduced) {
      render();
    } else {
      loop();
      window.addEventListener("pointermove", onMove, { passive: true });
    }
    window.addEventListener("resize", resize);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />
      <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-accent/10 blur-[130px]" />
      <div className="absolute right-[-10%] top-1/3 h-[460px] w-[460px] rounded-full bg-indigo-500/10 blur-[130px]" />
    </div>
  );
}
