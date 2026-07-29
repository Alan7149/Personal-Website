"use client";

const words = [
  "React",
  "Next.js",
  "TypeScript",
  "Python",
  "FastAPI",
  "Django",
  "Node.js",
  "Claude AI",
  "PostgreSQL",
  "WebSockets",
  "Tailwind",
  "Electron",
];

export default function Marquee() {
  const row = [...words, ...words];
  return (
    <div className="relative flex overflow-hidden border-y border-white/10 bg-white/[0.02] py-5">
      <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
        {row.map((w, i) => (
          <span
            key={i}
            className="font-display text-2xl font-bold text-white/25 transition-colors hover:text-gradient sm:text-3xl"
          >
            {w}
            <span className="ml-10 text-neon-purple/40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
