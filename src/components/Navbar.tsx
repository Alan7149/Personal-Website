"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Magnetic from "./ui/Magnetic";

const links = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 flex justify-center transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      {/* Centered nav pill — solid enough that content never bleeds through */}
      <nav className="flex items-center gap-1 rounded-2xl border border-white/10 bg-[rgba(9,13,26,0.82)] px-3 py-2 shadow-lg shadow-black/40 backdrop-blur-xl backdrop-saturate-150">

        {/* Desktop links, centered */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative rounded-lg px-4 py-2 text-sm font-medium text-white/75 transition-colors hover:text-white"
            >
              {l.label}
              <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 rounded-full bg-accent transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
          <Magnetic strength={0.2} className="ml-1">
            <a
              href="#contact"
              className="block rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
            >
              Let&apos;s talk
            </a>
          </Magnetic>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-white/80 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
          Menu
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-[min(92vw,20rem)] overflow-hidden rounded-2xl border border-white/10 bg-[rgba(9,13,26,0.92)] shadow-lg shadow-black/40 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col p-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-center text-sm font-medium text-white/80 hover:bg-white/5"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-1 rounded-lg bg-accent px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Let&apos;s talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
