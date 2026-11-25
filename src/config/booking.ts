/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  BOOKING LINKS
 *  Paste the live booking URL for each tour (e.g. your Rezdy, FareHarbor,
 *  Bókun, GetYourGuide or Viator product page).
 *
 *  While a URL is empty, every "Book Now" button for that tour sends visitors
 *  to the contact form with the tour pre-selected, so no booking request is lost
 *  and nothing fake is ever shown.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const bookingUrls: Record<string, string> = {
  "sagrada-familia-tour": "",
  "park-guell-tour": "",
  "barcelona-walking-tour": "",
  "montserrat-tour-from-barcelona": "",
};

export type BookingTarget = {
  href: string;
  external: boolean;
};

export function getBookingTarget(slug: string): BookingTarget {
  const url = bookingUrls[slug]?.trim();
  if (url && /^https?:\/\//i.test(url)) {
    return { href: url, external: true };
  }
  return { href: `/contact?tour=${encodeURIComponent(slug)}#enquiry`, external: false };
}
