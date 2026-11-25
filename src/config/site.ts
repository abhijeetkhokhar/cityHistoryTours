/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION
 *  Everything business-specific lives here. Empty values are hidden on the site,
 *  so nothing is shown until you add real, confirmed information.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type Testimonial = {
  quote: string;
  name: string;
  /** e.g. "Sagrada Familia Tour" or "London, UK" */
  context?: string;
};

export type ContactDetails = {
  email: string;
  phone: string;
  /** Full international number for WhatsApp, digits only, e.g. "34600000000" */
  whatsapp: string;
  /** Office or postal address, one line per array item */
  address: string[];
  /** e.g. ["Mon–Fri: 9:00–18:00"] */
  hours: string[];
};

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");

export const siteConfig = {
  name: "City History Tours",
  shortName: "City History Tours",
  tagline: "Guided history tours in Barcelona & Montserrat",
  description:
    "Discover Barcelona and Montserrat with guided history tours: Sagrada Familia, Park Güell, the Gothic Quarter and the mountain monastery of Montserrat.",
  url: siteUrl,
  locale: "en_GB",
  /** Default social share image (relative to /public) */
  ogImage: "/images/barcelona-skyline-sunset.jpg",

  /** Contact details — leave a field empty ("" or []) to hide it everywhere. */
  contact: {
    email: "",
    phone: "",
    whatsapp: "",
    address: [],
    hours: [],
  } satisfies ContactDetails as ContactDetails,

  /** Social profile URLs — empty entries are hidden. */
  social: {
    instagram: "",
    facebook: "",
    tripadvisor: "",
  },

  /**
   * Real guest testimonials only. Add verified reviews here (with permission).
   * While the list is empty, the homepage shows an honest "reviews coming soon" note.
   */
  testimonials: [] as Testimonial[],

  /** Optional link to an external review profile (e.g. Tripadvisor, Google). */
  reviewsUrl: "",
} as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Tours", href: "/tours" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export function hasContactDetails(c: ContactDetails = siteConfig.contact) {
  return Boolean(c.email || c.phone || c.whatsapp || c.address.length || c.hours.length);
}
