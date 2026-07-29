"use client";

import { motion } from "framer-motion";
import { Globe, ArrowUpRight } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import { sites } from "@/data/experience";

export default function Websites() {
  return (
    <section id="websites" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        eyebrow="Live & shipped"
        title="Websites I've Built"
        subtitle="Sites and web apps I've designed, developed, and launched."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sites.map((site, i) => {
          const Wrapper = site.url ? "a" : "div";
          return (
            <motion.div
              key={site.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Wrapper
                {...(site.url
                  ? { href: site.url, target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group block overflow-hidden rounded-3xl glass transition-transform hover:-translate-y-1.5"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10">
                  {site.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={site.image}
                      alt={site.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neon-purple/20 via-transparent to-neon-pink/20">
                      <Globe className="text-white/25" size={48} />
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-lg font-bold">{site.name}</h3>
                    {site.url && (
                      <ArrowUpRight
                        size={18}
                        className="mt-1 flex-shrink-0 text-white/40 transition-all group-hover:text-neon-cyan"
                      />
                    )}
                  </div>
                  <p className="mt-1 text-sm text-white/55">{site.blurb}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {site.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Wrapper>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
