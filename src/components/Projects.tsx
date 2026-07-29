"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./ui/SectionHeading";
import ProjectCard from "./ProjectCard";
import Marquee from "./ui/Marquee";
import { projects } from "@/data/projects";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Staggered reveal of the cards as the grid scrolls into view.
      gsap.from(".project-reveal", {
        y: 70,
        opacity: 0,
        scale: 0.96,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 82%",
        },
      });

      // Scroll-driven parallax on each cover image.
      gsap.utils.toArray<HTMLElement>(".project-media-img").forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -9 },
          {
            yPercent: 9,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Selected work"
          title="Projects"
          subtitle="Things I've designed and built end to end — from AI agents and secure networking to e-commerce, 3D digital twins, and medical imaging."
        />

        <div ref={gridRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <div key={p.slug} className="project-reveal">
              <ProjectCard project={p} index={i} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <Marquee />
      </div>
    </section>
  );
}
