# City History Tours

The website for **City History Tours**: guided history tours in Barcelona and Montserrat.

Built with **Next.js 16 (App Router)**, **TypeScript** and **Tailwind CSS 4**.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Production:

```bash
npm run build
npm run start
```

`npm run typecheck` runs the TypeScript compiler on its own.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/tours` | All tours |
| `/tours/sagrada-familia-tour` | Sagrada Familia Tour |
| `/tours/park-guell-tour` | Park Güell Tour |
| `/tours/barcelona-walking-tour` | Barcelona Walking Tour |
| `/tours/montserrat-tour-from-barcelona` | Montserrat Tour from Barcelona |
| `/about` | About |
| `/contact` | Contact |
| `/sitemap.xml`, `/robots.txt` | Generated automatically |

## Before going live: your checklist

Nothing below has been made up. Every empty value is hidden on the site (or shows "To be confirmed") until you fill it in.

### 1. Site URL (`.env.local`)
Copy `.env.example` to `.env.local` (or set the variables in your host's dashboard):

```
NEXT_PUBLIC_SITE_URL=https://www.your-domain.com
```

Canonical URLs, Open Graph tags, the sitemap and robots.txt all use this value.

### 2. Booking links: `src/config/booking.ts`
Paste the live booking URL for each tour, for example a Rezdy, FareHarbor, Bókun, GetYourGuide or Viator product page.

- With a URL set, every **Book Now** button for that tour opens the booking page in a new tab.
- While a URL is empty, **Book Now** opens the contact form with that tour already selected. This way no booking request is lost and nothing fake is shown.

### 3. Tour details: `src/data/tours.ts`
For each tour, confirm and fill in:

- `duration`, e.g. `"1 hour 30 minutes"`. If left `null`, the site shows "To be confirmed".
- `meetingPoint` with `name`, `address`, `notes` and `mapUrl`. If left `null`, the site shows "To be confirmed".
- `price` (optional), e.g. `"from €45 per adult"`. If left `null`, no price is shown.
- `languages` (optional), e.g. `["English", "Spanish"]`.

**Please review** `included`, `excluded`, `itinerary`, `visitorInfo` and `faqs` against how you actually run each tour. They are written as sensible drafts and should be checked before launch. For example, the Montserrat tour currently lists transport from Barcelona as included.

### 4. Company details: `src/config/site.ts`
- `contact`: email, phone, WhatsApp, address and opening hours. Each one appears in the footer and on the contact page once it is filled in.
- `social`: Instagram, Facebook and Tripadvisor URLs.
- `testimonials`: add **real** guest reviews only. Until you add some, the homepage shows a short "reviews coming soon" note.
- `reviewsUrl`: optional link to your external review profile.

### 5. Contact form (`CONTACT_FORM_WEBHOOK_URL`)
The form validates input in the browser and again on the server (`/api/contact`). The server then forwards each message as JSON to the URL in `CONTACT_FORM_WEBHOOK_URL`, so you can connect Formspree, Make, Zapier, n8n or your own CRM. Nothing is stored on the web server.

Until that URL is set, visitors see a clear message that the form is not connected yet.

## Project structure

```
src/
  app/                 Routes (App Router), sitemap.ts, robots.ts, api/contact
  components/          Reusable UI (Header, Footer, TourCard, BookNowButton, Gallery, …)
  config/site.ts       Company name, contact details, socials, testimonials
  config/booking.ts    Booking URL per tour
  data/tours.ts        All tour content (single source of truth)
  data/images.ts       Photo library with alt text and photographer credits
  lib/                 SEO helpers and shared form validation
public/images/         Optimised photography
```

To add a tour, add an entry to `src/data/tours.ts` and a booking URL in `src/config/booking.ts`. The card, the detail page, the related-tour links and the sitemap entry are all generated from that.

## Photography
All photos are from [Unsplash](https://unsplash.com) and free to use under the [Unsplash License](https://unsplash.com/license). Photographer credits are stored in `src/data/images.ts` and shown in each tour's gallery lightbox. You can replace them at any time with your own photos.

## SEO and accessibility
- Every page has its own title, description and canonical URL, plus Open Graph and Twitter tags.
- Structured data (JSON-LD) is included for the TravelAgency, each TouristTrip, FAQs, breadcrumbs and the tour list.
- `sitemap.xml` and `robots.txt` are generated automatically.
- Images are served in AVIF/WebP at responsive sizes through `next/image`.
- The HTML is semantic, with a skip link, labelled navigation, keyboard-accessible menus, gallery and FAQs, visible focus styles and support for reduced motion.
# cityHistoryTours
