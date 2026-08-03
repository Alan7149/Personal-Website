"use client";

import {
  Fragment,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

// Runs before paint on the client, no-ops on the server (avoids SSR warning).
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Word-by-word "mask reveal": each word rises from behind a clipping edge,
 * staggered, when it scrolls into view. The signature award-site heading reveal.
 *
 * Fail-safe by design: the default (SSR / no-JS / reduced-motion) state is
 * fully VISIBLE, so the text can never get stuck hidden behind the mask. The
 * "armed hidden" state is set before paint (layout effect) so above-the-fold
 * reveals don't flash.
 */
export default function MaskText({
  text,
  className,
  delay = 0,
  stagger = 0.055,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // "visible" is the safe default; client arms "hidden" then reveals to "shown".
  const [phase, setPhase] = useState<"visible" | "hidden" | "shown">("visible");

  useIsoLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPhase("hidden");
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPhase("shown");
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(" ");
  return (
    <span ref={ref} className={className}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden pb-[0.14em] align-bottom">
            <span
              className="inline-block will-change-transform"
              style={{
                transform:
                  phase === "hidden" ? "translateY(115%)" : "translateY(0)",
                transition:
                  phase === "shown"
                    ? `transform 0.75s cubic-bezier(0.22,1,0.36,1) ${(
                        delay +
                        i * stagger
                      ).toFixed(3)}s`
                    : "none",
              }}
            >
              {w}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
