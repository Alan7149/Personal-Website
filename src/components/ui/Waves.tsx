"use client";

/**
 * Layered flowing SVG waves. Each layer is a seamless wave tiled twice inside a
 * 200%-wide track and translated by -50% on loop, so it scrolls forever with no
 * seam. Purely decorative; sits behind content.
 */

const WAVE_PATH =
  "M0,160 C180,220 360,100 540,140 C720,180 900,280 1080,240 C1260,200 1350,120 1440,150 L1440,320 L0,320 Z";

function WaveLayer({
  className,
  color,
  opacity,
  animation,
}: {
  className?: string;
  color: string;
  opacity: number;
  animation: string;
}) {
  return (
    <div className={`absolute inset-x-0 bottom-0 flex w-[200%] ${animation} ${className ?? ""}`}>
      {[0, 1].map((i) => (
        <svg
          key={i}
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="h-full w-1/2"
          aria-hidden
        >
          <path d={WAVE_PATH} fill={color} fillOpacity={opacity} />
        </svg>
      ))}
    </div>
  );
}

export default function Waves({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-64 overflow-hidden ${className ?? ""}`}
    >
      <WaveLayer color="#1d4ed8" opacity={0.18} animation="animate-waveSlow" className="h-56" />
      <WaveLayer color="#6366f1" opacity={0.16} animation="animate-waveMed" className="h-44" />
      <WaveLayer color="#38bdf8" opacity={0.14} animation="animate-waveFast" className="h-32" />
    </div>
  );
}
