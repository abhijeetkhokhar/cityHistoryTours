/** Shared contact-form validation used by both the browser and the API route. */

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  tour: string;
  date: string;
  groupSize: string;
  message: string;
  consent: boolean;
  /** Honeypot — must stay empty */
  company: string;
};

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(p: ContactPayload): ContactErrors {
  const errors: ContactErrors = {};
  if (!p.name.trim() || p.name.trim().length < 2) errors.name = "Please enter your full name.";
  else if (p.name.length > 100) errors.name = "Please keep your name under 100 characters.";

  if (!p.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(p.email.trim())) errors.email = "Please enter a valid email address, e.g. name@example.com.";

  if (p.phone && !/^[+()\d\s.-]{6,24}$/.test(p.phone.trim()))
    errors.phone = "Please enter a valid phone number, including country code if possible.";

  if (p.groupSize) {
    const n = Number(p.groupSize);
    if (!Number.isInteger(n) || n < 1 || n > 200) errors.groupSize = "Please enter a group size between 1 and 200.";
  }

  if (p.date) {
    const d = new Date(`${p.date}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(d.getTime())) errors.date = "Please choose a valid date.";
    else if (d < today) errors.date = "Please choose a date in the future.";
  }

  if (!p.message.trim() || p.message.trim().length < 10)
    errors.message = "Please tell us a little more (at least 10 characters).";
  else if (p.message.length > 4000) errors.message = "Please keep your message under 4,000 characters.";

  if (!p.consent) errors.consent = "Please confirm we may use your details to reply to you.";
  return errors;
}

export function toPayload(input: Record<string, unknown>): ContactPayload {
  const s = (v: unknown) => (typeof v === "string" ? v : "");
  return {
    name: s(input.name),
    email: s(input.email),
    phone: s(input.phone),
    tour: s(input.tour),
    date: s(input.date),
    groupSize: s(input.groupSize),
    message: s(input.message),
    consent: input.consent === true || input.consent === "on" || input.consent === "true",
    company: s(input.company),
  };
}
