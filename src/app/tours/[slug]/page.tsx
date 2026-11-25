import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Clock, Globe, MapPin, Ticket, X } from "lucide-react";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { getRelatedTours, getTour, TO_BE_CONFIRMED, tourPath, tours } from "@/data/tours";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BookNowButton } from "@/components/BookNowButton";
import { ButtonLink } from "@/components/ButtonLink";
import { SectionHeading } from "@/components/SectionHeading";
import { Gallery } from "@/components/Gallery";
import { FaqList } from "@/components/FaqList";
import { TourCard } from "@/components/TourCard";
import { BookingCTA } from "@/components/BookingCTA";
import { JsonLd } from "@/components/JsonLd";
import { MobileBookingBar } from "@/components/MobileBookingBar";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) return {};
  return buildMetadata({
    title: tour.seo.title,
    description: tour.seo.description,
    keywords: tour.seo.keywords,
    path: tourPath(tour.slug),
    image: tour.heroImage,
  });
}

const sections = [
  { id: "overview", label: "Overview" },
  { id: "highlights", label: "Highlights" },
  { id: "included", label: "What’s included" },
  { id: "itinerary", label: "Itinerary" },
  { id: "visitor-info", label: "Visitor info" },
  { id: "gallery", label: "Gallery" },
  { id: "faqs", label: "FAQs" },
];

export default async function TourPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) notFound();

  const related = getRelatedTours(tour);
  const mp = tour.meetingPoint;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative isolate flex min-h-[480px] items-end overflow-hidden bg-ink sm:min-h-[540px] lg:h-[min(74vh,660px)]">
        <Image
          src={tour.heroImage.src}
          alt={tour.heroImage.alt}
          fill
          priority
          quality={85}
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/40 to-black/35" />
        <Container className="pb-12 pt-28 sm:pb-14">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Tours", href: "/tours" },
              { label: tour.shortTitle, href: tourPath(tour.slug) },
            ]}
          />
          <div className="mt-5 max-w-2xl animate-fade-up">
            <p className="eyebrow eyebrow-light">
              {tour.location} · {tour.category}
            </p>
            <h1 className="t-h1 mt-3 !text-white">{tour.title}</h1>
            <p className="mt-3 font-display text-base italic leading-snug text-white/85 sm:text-lg">{tour.tagline}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              <li className="chip">
                <Clock className="h-4 w-4 text-gold-light" aria-hidden />
                <span>
                  <span className="sr-only">Duration: </span>
                  {tour.duration ?? `Duration ${TO_BE_CONFIRMED.toLowerCase()}`}
                </span>
              </li>
              <li className="chip">
                <MapPin className="h-4 w-4 text-gold-light" aria-hidden />
                {tour.location}
              </li>
              {tour.price && (
                <li className="chip">
                  <Ticket className="h-4 w-4 text-gold-light" aria-hidden />
                  {tour.price}
                </li>
              )}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <BookNowButton slug={tour.slug} tourTitle={tour.title} size="lg" />
              <ButtonLink href="#itinerary" variant="outline-light" size="lg">
                View itinerary
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* ── In-page navigation ───────────────────────────────── */}
      <nav aria-label="On this page" className="sticky top-[4.25rem] z-30 border-b border-line bg-ivory/95 backdrop-blur-md">
        <Container>
          <ul className="-mx-2 flex gap-0.5 overflow-x-auto py-2 text-sm [scrollbar-width:none]">
            {sections.map((s) => (
              <li key={s.id} className="shrink-0">
                <a href={`#${s.id}`} className="block rounded-full px-3 py-1 text-muted transition-colors hover:bg-sand hover:text-ink">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      {/* ── Main content + booking card ──────────────────────── */}
      <Container className="grid gap-10 py-14 sm:py-16 lg:grid-cols-12 lg:gap-14">
        <div className="space-y-14 lg:col-span-8">
          {/* Introduction & overview */}
          <section id="overview" aria-labelledby="overview-title">
            <p className="eyebrow">Overview</p>
            <h2 id="overview-title" className="t-h2 mt-2.5">
              About this tour
            </h2>
            <p className="mt-4 font-display text-lg leading-relaxed text-ink-soft sm:text-lg">{tour.intro}</p>
            <div className="prose-tour t-body mt-4">
              {tour.overview.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          </section>

          {/* Highlights */}
          <section id="highlights" aria-labelledby="highlights-title">
            <p className="eyebrow">Highlights</p>
            <h2 id="highlights-title" className="t-h2 mt-2.5">
              What you’ll experience
            </h2>
            <ul className="mt-5 grid gap-x-6 gap-y-2.5 rounded-xl border border-line/80 bg-white p-5 sm:grid-cols-2 sm:p-6">
              {tour.highlights.map((h) => (
                <li key={h} className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-terracotta" aria-hidden />
                  {h}
                </li>
              ))}
            </ul>
          </section>

          {/* Inclusions / exclusions */}
          <section id="included" aria-labelledby="included-title">
            <p className="eyebrow">Good to know</p>
            <h2 id="included-title" className="t-h2 mt-2.5">
              What’s included
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="panel">
                <h3 className="t-label !text-terracotta">Included</h3>
                <ul className="mt-3 space-y-2">
                  {tour.included.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-terracotta" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="panel-muted">
                <h3 className="t-label">Not included</h3>
                <ul className="mt-3 space-y-2">
                  {tour.excluded.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-muted">
                      <X className="mt-1 h-4 w-4 shrink-0" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Duration & meeting point */}
            <dl aria-label="Duration and meeting point" className="mt-4 grid gap-5 rounded-xl bg-ink p-5 text-white sm:grid-cols-2 sm:p-6">
              <div>
                <dt className="flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold-light">
                  <Clock className="h-4 w-4" aria-hidden /> Duration
                </dt>
                <dd className="mt-1.5 font-display text-lg">{tour.duration ?? TO_BE_CONFIRMED}</dd>
              </div>
              <div>
                <dt className="flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold-light">
                  <MapPin className="h-4 w-4" aria-hidden /> Meeting point
                </dt>
                <dd className="mt-1.5">
                  {mp ? (
                    <>
                      <span className="block font-display text-lg">{mp.name}</span>
                      {mp.address && <span className="mt-1 block text-[0.9375rem] text-white/75">{mp.address}</span>}
                      {mp.notes && <span className="mt-1 block text-sm text-white/60">{mp.notes}</span>}
                      {mp.mapUrl && (
                        <a
                          href={mp.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-gold-light underline underline-offset-4"
                        >
                          Open in maps <span className="sr-only">(opens in a new tab)</span>
                        </a>
                      )}
                    </>
                  ) : (
                    <>
                      <span className="block font-display text-lg">{TO_BE_CONFIRMED}</span>
                      <span className="mt-1 block text-sm text-white/60">
                        The exact meeting point is included in your booking confirmation.
                      </span>
                    </>
                  )}
                </dd>
              </div>
            </dl>
          </section>

          {/* Itinerary */}
          <section id="itinerary" aria-labelledby="itinerary-title">
            <p className="eyebrow">Itinerary</p>
            <h2 id="itinerary-title" className="t-h2 mt-2.5">
              Your tour, step by step
            </h2>
            <ol className="relative mt-6 space-y-5 border-l border-line pl-7">
              {tour.itinerary.map((stop, i) => (
                <li key={stop.title} className="relative">
                  <span className="absolute -left-[2.45rem] flex h-6 w-6 items-center justify-center rounded-full border border-terracotta bg-ivory text-[0.72rem] font-semibold text-terracotta">
                    {i + 1}
                  </span>
                  <h3 className="t-h4">{stop.title}</h3>
                  <p className="t-small mt-0.5">{stop.description}</p>
                </li>
              ))}
            </ol>
            <p className="t-small mt-5 italic">
              The order of stops may vary on the day to accommodate opening hours, services and crowds.
            </p>
          </section>

          {/* Visitor information */}
          <section id="visitor-info" aria-labelledby="visitor-info-title">
            <p className="eyebrow">Before you go</p>
            <h2 id="visitor-info-title" className="t-h2 mt-2.5">
              Visitor information
            </h2>
            <dl className="mt-5 grid gap-px overflow-hidden rounded-xl border border-line/80 bg-line/80 sm:grid-cols-2">
              {tour.visitorInfo.map((info) => (
                <div key={info.title} className="bg-white p-4 sm:p-5">
                  <dt className="t-h4">{info.title}</dt>
                  <dd className="t-small mt-1">{info.description}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        {/* Sticky booking card */}
        <aside aria-label={`Book the ${tour.title}`} className="lg:col-span-4">
          <div className="card p-6 lg:sticky lg:top-36">
            <p className="eyebrow">Book this tour</p>
            <h2 className="t-h3 mt-2">{tour.title}</h2>
            {tour.price && <p className="mt-1.5 text-base font-semibold text-ink">{tour.price}</p>}
            <dl className="mt-4 space-y-3 border-y border-line py-4 text-sm">
              <div className="flex gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" aria-hidden />
                <div>
                  <dt className="font-semibold text-ink">Duration</dt>
                  <dd className="text-muted">{tour.duration ?? TO_BE_CONFIRMED}</dd>
                </div>
              </div>
              <div className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" aria-hidden />
                <div>
                  <dt className="font-semibold text-ink">Meeting point</dt>
                  <dd className="text-muted">{mp?.name ?? TO_BE_CONFIRMED}</dd>
                </div>
              </div>
              {tour.languages.length > 0 && (
                <div className="flex gap-2.5">
                  <Globe className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" aria-hidden />
                  <div>
                    <dt className="font-semibold text-ink">Languages</dt>
                    <dd className="text-muted">{tour.languages.join(", ")}</dd>
                  </div>
                </div>
              )}
            </dl>
            <BookNowButton slug={tour.slug} tourTitle={tour.title} size="lg" className="mt-4 w-full" />
            <p className="t-small mt-3 text-center">
              Questions first?{" "}
              <Link href="/contact" className="font-semibold text-ink underline underline-offset-4 hover:text-terracotta">
                Contact our team
              </Link>
            </p>
          </div>
        </aside>
      </Container>

      {/* ── Gallery ──────────────────────────────────────────── */}
      <section id="gallery" aria-labelledby="gallery-title" className="section section-alt">
        <Container>
          <SectionHeading id="gallery-title" eyebrow="Gallery" title={`${tour.shortTitle} in pictures`} />
          <div className="mt-6">
            <Gallery images={tour.gallery} title={tour.title} />
          </div>
        </Container>
      </section>

      {/* ── FAQs ─────────────────────────────────────────────── */}
      <section id="faqs" aria-labelledby="faqs-title" className="section">
        <Container className="grid gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeading id="faqs-title" eyebrow="FAQs" title="Frequently asked questions" />
            <p className="t-small mt-3">
              Can’t find your answer?{" "}
              <Link href="/contact" className="font-semibold text-ink underline underline-offset-4 hover:text-terracotta">
                Get in touch
              </Link>
              .
            </p>
          </div>
          <div className="lg:col-span-8">
            <FaqList faqs={tour.faqs} />
          </div>
        </Container>
      </section>

      {/* ── Booking CTA ──────────────────────────────────────── */}
      <BookingCTA
          className="!pt-0"
          image={tour.gallery[0]}
          eyebrow="Reserve your place"
          title={<>Ready for the {tour.title}?</>}
          text="Select Book Now to choose your date and secure your place on the tour."
        >
          <BookNowButton slug={tour.slug} tourTitle={tour.title} variant="light" size="lg" />
          <ButtonLink href="/tours" variant="outline-light" size="lg">
            Compare all tours
          </ButtonLink>
        </BookingCTA>

      {/* ── Related tours ────────────────────────────────────── */}
      <section aria-labelledby="related-title" className="section section-alt">
        <Container>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading id="related-title" eyebrow="Continue exploring" title="You might also enjoy" />
            <ButtonLink href="/tours" variant="outline" className="self-start md:self-auto">
              All tours <ArrowRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((t) => (
              <TourCard key={t.slug} tour={t} />
            ))}
          </div>
        </Container>
      </section>

      {/* ── Mobile booking bar ───────────────────────────────── */}
      <MobileBookingBar title={tour.title} subtitle={tour.price ?? tour.duration ?? tour.location}>
        <BookNowButton slug={tour.slug} tourTitle={tour.title} size="sm" />
      </MobileBookingBar>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          name: tour.title,
          description: tour.seo.description,
          url: absoluteUrl(tourPath(tour.slug)),
          image: absoluteUrl(tour.heroImage.src),
          touristType: "Cultural tourism",
          itinerary: {
            "@type": "ItemList",
            itemListElement: tour.itinerary.map((stop, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: stop.title,
              description: stop.description,
            })),
          },
          provider: { "@type": "TravelAgency", name: "City History Tours", url: absoluteUrl("/") },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: tour.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />
    </>
  );
}
