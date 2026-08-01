"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, CheckCircle2, Loader2 } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import { profile } from "@/data/profile";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="relative mx-auto max-w-5xl px-6 py-28">
      <SectionHeading
        title="Get in touch"
        subtitle="Have a project, a role, or a question? Send me a message."
        align="left"
      />

      <div className="grid gap-8 md:grid-cols-5">
        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2"
        >
          <div className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-7">
            <div>
              <h3 className="font-display text-2xl font-bold">
                Reach out directly
              </h3>
              <p className="mt-2 text-sm text-white/60">
                I usually reply within a day.
              </p>
            </div>
            <div className="space-y-4">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 text-white/80 transition-colors hover:text-accent"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                  <Mail size={18} />
                </span>
                <span className="text-sm">{profile.email}</span>
              </a>
              <div className="flex items-center gap-3 text-white/80">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                  <MapPin size={18} />
                </span>
                <span className="text-sm">{profile.location}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={onSubmit}
          className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 md:col-span-3"
        >
          {status === "success" ? (
            <div className="flex h-full min-h-[280px] flex-col items-center justify-center text-center">
              <CheckCircle2 className="text-green-400" size={56} />
              <h3 className="mt-4 font-display text-2xl font-bold">
                Message sent
              </h3>
              <p className="mt-2 text-white/60">
                Thanks for reaching out. I&apos;ll get back to you soon.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold hover:bg-white/10"
              >
                Send another
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" name="name" placeholder="Your name" required />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@email.com"
                  required
                />
              </div>
              <Field label="Subject" name="subject" placeholder="What's this about?" />
              <div>
                <label className="mb-1.5 block text-sm font-medium text-white/70">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about it…"
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors focus:border-accent"
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-red-400">{error}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 font-semibold text-white transition-colors hover:bg-accent-strong disabled:opacity-60"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="animate-spin" size={18} /> Sending…
                  </>
                ) : (
                  <>
                    <Send size={18} /> Send message
                  </>
                )}
              </button>
            </div>
          )}
        </motion.form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-white/70">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}
