"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

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
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-40 flex justify-center transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      {/* Centered nav pill */}
      <nav
        className={`flex items-center gap-1 rounded-2xl px-3 py-2 transition-all duration-300 ${
          scrolled ? "glass shadow-lg shadow-black/40" : "glass"
        }`}
      >
        {/* Desktop links, centered */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative rounded-lg px-4 py-2 text-sm font-medium text-white/75 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-1 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-neon-purple/30 transition-transform hover:scale-105"
          >
            Let&apos;s talk
          </a>
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
            className="absolute top-full mt-2 w-[min(92vw,20rem)] overflow-hidden rounded-2xl glass md:hidden"
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
                className="mt-1 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Let&apos;s talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
