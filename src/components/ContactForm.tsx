"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { toPayload, validateContact, type ContactErrors, type ContactPayload } from "@/lib/contact";

type TourOption = { slug: string; title: string };
type Status = { type: "idle" } | { type: "sending" } | { type: "success" } | { type: "error"; message: string };

const fieldBase = "field";

export function ContactForm({ tours }: { tours: TourOption[] }) {
  const params = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const uid = useId();
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [tour, setTour] = useState("");

  // Pre-select the tour when arriving from a "Book Now" button (?tour=slug)
  useEffect(() => {
    const slug = params.get("tour");
    if (slug && tours.some((t) => t.slug === slug)) setTour(slug);
  }, [params, tours]);

  const selectedTour = tours.find((t) => t.slug === tour);
  const cameFromBooking = Boolean(params.get("tour") && selectedTour);

  const readForm = (): ContactPayload => {
    const fd = new FormData(formRef.current!);
    return toPayload({ ...Object.fromEntries(fd.entries()), consent: fd.get("consent") === "on" });
  };

  const onBlurValidate = (field: keyof ContactPayload) => {
    if (!errors[field]) return;
    const next = validateContact(readForm());
    setErrors((prev) => ({ ...prev, [field]: next[field] }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = readForm();
    const found = validateContact(payload);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus({ type: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; errors?: ContactErrors };
      if (res.ok && data.ok) {
        setStatus({ type: "success" });
        formRef.current?.reset();
        setTour("");
      } else {
        if (data.errors) setErrors(data.errors);
        setStatus({ type: "error", message: data.message ?? "Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ type: "error", message: "We couldn’t reach the server. Please check your connection and try again." });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  const id = (name: string) => `${uid}-${name}`;
  const errProps = (name: keyof ContactPayload) =>
    errors[name]
      ? { "aria-invalid": true as const, "aria-describedby": id(`${name}-error`) }
      : { "aria-invalid": false as const };
  const border = (name: keyof ContactPayload) => (errors[name] ? "border-terracotta" : "border-line");

  if (status.type === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="panel text-center sm:p-10"
      >
        <CheckCircle2 className="mx-auto h-9 w-9 text-terracotta" aria-hidden />
        <h3 className="t-h2 mt-3">Thank you — message sent</h3>
        <p className="t-body mx-auto mt-2 max-w-md">
          We’ve received your message and will reply to the email address you provided as soon as possible.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ type: "idle" })}
          className="btn btn-md btn-outline mt-6"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-labelledby={id("title")}
      className="panel relative shadow-card sm:p-8"
    >
      <h2 id={id("title")} className="t-h2">
        {cameFromBooking ? `Book or enquire: ${selectedTour!.title}` : "Send us a message"}
      </h2>
      <p className="t-body mt-2">
        {cameFromBooking
          ? "Tell us your preferred date and group size, and our team will reply with availability and how to complete your booking."
          : "Questions about a tour, a private group or anything else? Fill in the form and we’ll get back to you."}
      </p>

      {status.type === "error" && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="mt-5 flex gap-2.5 rounded-lg border border-terracotta/30 bg-terracotta/5 p-4 text-sm text-terracotta-dark"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <p>{status.message}</p>
        </div>
      )}

      <div className="mt-6 grid gap-x-4 gap-y-4 sm:grid-cols-2">
        <Field label="Full name" htmlFor={id("name")} required error={errors.name} errorId={id("name-error")}>
          <input
            id={id("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={100}
            className={`${fieldBase} ${border("name")}`}
            onBlur={() => onBlurValidate("name")}
            {...errProps("name")}
          />
        </Field>

        <Field label="Email address" htmlFor={id("email")} required error={errors.email} errorId={id("email-error")}>
          <input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            className={`${fieldBase} ${border("email")}`}
            onBlur={() => onBlurValidate("email")}
            {...errProps("email")}
          />
        </Field>

        <Field label="Phone" htmlFor={id("phone")} hint="Optional" error={errors.phone} errorId={id("phone-error")}>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            className={`${fieldBase} ${border("phone")}`}
            onBlur={() => onBlurValidate("phone")}
            {...errProps("phone")}
          />
        </Field>

        <Field label="Tour" htmlFor={id("tour")} hint="Optional">
          <select
            id={id("tour")}
            name="tour"
            value={tour}
            onChange={(e) => setTour(e.target.value)}
            className={`${fieldBase} border-line appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%236b645b%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10`}
          >
            <option value="">General enquiry</option>
            {tours.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.title}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Preferred date" htmlFor={id("date")} hint="Optional" error={errors.date} errorId={id("date-error")}>
          <input
            id={id("date")}
            name="date"
            type="date"
            className={`${fieldBase} ${border("date")}`}
            onBlur={() => onBlurValidate("date")}
            {...errProps("date")}
          />
        </Field>

        <Field label="Group size" htmlFor={id("groupSize")} hint="Optional" error={errors.groupSize} errorId={id("groupSize-error")}>
          <input
            id={id("groupSize")}
            name="groupSize"
            type="number"
            min={1}
            max={200}
            inputMode="numeric"
            className={`${fieldBase} ${border("groupSize")}`}
            onBlur={() => onBlurValidate("groupSize")}
            {...errProps("groupSize")}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Message" htmlFor={id("message")} required error={errors.message} errorId={id("message-error")}>
            <textarea
              id={id("message")}
              name="message"
              rows={5}
              required
              maxLength={4000}
              className={`${fieldBase} ${border("message")} h-auto resize-y py-2.5`}
              onBlur={() => onBlurValidate("message")}
              {...errProps("message")}
            />
          </Field>
        </div>

        {/* Honeypot field for bots — hidden from people and assistive tech */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={id("company")}>Company</label>
          <input id={id("company")} name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={id("consent")} className="flex cursor-pointer items-start gap-2.5 text-sm leading-relaxed text-muted">
            <input
              id={id("consent")}
              name="consent"
              type="checkbox"
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-line accent-terracotta"
              {...errProps("consent")}
            />
            <span>
              I agree that City History Tours may use the details I’ve provided to respond to my enquiry.
              <span className="text-terracotta"> *</span>
            </span>
          </label>
          {errors.consent && (
            <p id={id("consent-error")} className="mt-1.5 text-[0.8125rem] text-terracotta-dark">
              {errors.consent}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="t-small">
          Fields marked <span className="text-terracotta">*</span> are required.
        </p>
        <button
          type="submit"
          disabled={status.type === "sending"}
          className="btn btn-lg btn-primary disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status.type === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending…
            </>
          ) : (
            <>
              Send message <Send className="h-4 w-4" aria-hidden />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  hint,
  error,
  errorId,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  error?: string;
  errorId?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="flex items-baseline justify-between text-sm font-semibold text-ink">
        <span>
          {label}
          {required && <span className="text-terracotta"> *</span>}
        </span>
        {hint && <span className="text-[0.72rem] font-normal text-muted">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={errorId} className="mt-1.5 text-[0.8125rem] text-terracotta-dark">
          {error}
        </p>
      )}
    </div>
  );
}
