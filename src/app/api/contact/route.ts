import { NextResponse } from "next/server";

// ─────────────────────────────────────────────────────────────
//  Contact form endpoint (runs on Vercel as a serverless function).
//
//  To actually receive emails, plug in a provider below (Resend is
//  easiest on Vercel): npm i resend, add RESEND_API_KEY +
//  CONTACT_TO_EMAIL env vars, and uncomment the Resend block.
//
//  Spam defenses here: honeypot field, field length caps, and a
//  best-effort in-memory rate limit. For a hard, distributed limit
//  use Upstash Redis (@upstash/ratelimit) — noted below.
// ─────────────────────────────────────────────────────────────

// Best-effort in-memory sliding window (per serverless instance).
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function rateLimit(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    const retryAfter = Math.ceil((WINDOW_MS - (now - recent[0])) / 1000);
    return { ok: false, retryAfter };
  }
  recent.push(now);
  hits.set(ip, recent);
  return { ok: true, retryAfter: 0 };
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";

  const { ok, retryAfter } = rateLimit(ip);
  if (!ok) {
    return NextResponse.json(
      { error: "Too many messages. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — real users never fill this hidden field.
  if ((body.website || "").trim()) {
    return NextResponse.json({ ok: true }); // silently drop bots
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();
  const subject = (body.subject || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and message are required." },
      { status: 400 }
    );
  }

  // Explicit length caps.
  if (
    name.length > 100 ||
    email.length > 254 ||
    subject.length > 200 ||
    message.length > 5000
  ) {
    return NextResponse.json({ error: "One of the fields is too long." }, {
      status: 400,
    });
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json({ error: "Please enter a valid email." }, {
      status: 400,
    });
  }

  // ── Optional: send a real email via Resend ──────────────────
  // import { Resend } from "resend";
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: "Portfolio <onboarding@resend.dev>",
  //   to: process.env.CONTACT_TO_EMAIL!,
  //   replyTo: email,
  //   subject: `[Portfolio] ${subject || "New message"} — ${name}`,
  //   text: `From: ${name} <${email}>\n\n${message}`,
  // });

  console.log("📬 New contact message:", { name, email, subject, message });

  return NextResponse.json({ ok: true });
}
