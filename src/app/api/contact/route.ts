import { NextResponse } from "next/server";
import { toPayload, validateContact } from "@/lib/contact";
import { getTour } from "@/data/tours";

export const dynamic = "force-dynamic";

/**
 * Receives contact-form submissions, validates them and forwards them as JSON to
 * CONTACT_FORM_WEBHOOK_URL (Formspree, Make, Zapier, your CRM, etc.).
 * Nothing is stored on this server.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const payload = toPayload(body);

  // Honeypot: silently accept bots without forwarding anything
  if (payload.company) return NextResponse.json({ ok: true });

  const errors = validateContact(payload);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors, message: "Please check the highlighted fields." }, { status: 422 });
  }

  const webhook = process.env.CONTACT_FORM_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Our online contact form is not connected yet. Please try again later — we’re sorry for the inconvenience.",
      },
      { status: 503 },
    );
  }

  const tour = payload.tour ? getTour(payload.tour) : undefined;
  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: payload.name.trim(),
        email: payload.email.trim(),
        phone: payload.phone.trim(),
        tour: tour?.title ?? "General enquiry",
        preferredDate: payload.date,
        groupSize: payload.groupSize,
        message: payload.message.trim(),
        submittedAt: new Date().toISOString(),
        source: "City History Tours website",
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (err) {
    console.error("[contact] forwarding failed:", err);
    return NextResponse.json(
      { ok: false, message: "We couldn’t send your message just now. Please try again in a few minutes." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
