import { NextResponse } from "next/server";

// ─────────────────────────────────────────────────────────────
//  Contact form endpoint (runs on Vercel as a serverless function).
//
//  By default it just validates + logs the message so the form
//  works out of the box. To actually receive emails, plug in a
//  provider below (Resend is the easiest on Vercel):
//
//    1. npm i resend
//    2. Add RESEND_API_KEY + CONTACT_TO_EMAIL in Vercel env vars
//    3. Uncomment the Resend block.
// ─────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
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

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
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

  // Fallback: log to the server so the form works without a provider.
  console.log("📬 New contact message:", { name, email, subject, message });

  return NextResponse.json({ ok: true });
}
