import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Compass, Footprints, Landmark, MessageCircle, Mountain } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { images } from "@/data/images";
import { tours, tourPath } from "@/data/tours";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/ButtonLink";
import { SectionHeading } from "@/components/SectionHeading";
import { TourCard } from "@/components/TourCard";
import { Testimonials } from "@/components/Testimonials";
import { BookingCTA } from "@/components/BookingCTA";

export const metadata = {
  ...buildMetadata({
    title: "Guided History Tours in Barcelona & Montserrat",
    description: siteConfig.description,
    path: "/",
    image: images.barcelonaSkyline,
  }),
  title: { absolute: `${siteConfig.name} | Guided History Tours in Barcelona & Montserrat` },
};

const reasons = [
  {
    icon: BookOpen,
    title: "History at the heart",
    text: "Every tour is built around storytelling — the people, ideas and events that shaped each place, not just dates and names.",
  },
  {
    icon: Compass,
    title: "Local expertise",
    text: "Our guides know Barcelona and Montserrat intimately and love sharing the details most visitors walk straight past.",
  },
  {
    icon: Footprints,
    title: "Thoughtfully paced",
    text: "Time to look, listen and ask questions. Our tours are designed to be enriching, never rushed.",
  },
  {
    icon: Landmark,
    title: "Iconic places, deeper meaning",
    text: "From Gaudí’s masterpieces to Roman walls and a mountain monastery, we bring context to the city’s greatest sights.",
  },
  {
    icon: Mountain,
    title: "Barcelona and beyond",
    text: "Explore the city’s Modernista icons and medieval lanes, then venture out to the extraordinary peaks of Montserrat.",
  },
  {
    icon: MessageCircle,
    title: "Simple, clear booking",
    text: "Choose a tour, select Book Now and you’re on your way. Questions before you book? Our team is happy to help.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative isolate flex h-[100svh] min-h-[600px] overflow-hidden bg-ink">
        <Image
          src={images.barcelonaSkyline.src}
          alt={images.barcelonaSkyline.alt}
          fill
          priority
          quality={85}
          sizes="100vw"
          className="-z-10 object-cover object-[60%_70%]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/40 to-black/45" />
        <Container className="flex flex-col pb-8 pt-20 sm:pb-10">
          {/* Text block centred vertically in the space between the navbar and the tour links */}
          <div className="flex flex-1 items-center py-10">
          <div className="max-w-3xl animate-fade-up">
            <p className="eyebrow eyebrow-light">Barcelona · Montserrat</p>
            <h1 className="t-display mt-3 !text-white">
              Walk through <em className="italic text-gold-light">two thousand years</em> of Barcelona.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-base">
              Guided history tours of Gaudí’s masterpieces, the Gothic Quarter and the sacred mountain of
              Montserrat — told by people who love these places.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <ButtonLink href="/tours" size="lg">
                Explore Tours <ArrowRight className="h-4 w-4" aria-hidden />
              </ButtonLink>
              <ButtonLink href="#why-us" variant="outline-light" size="lg">
                Why travel with us
              </ButtonLink>
            </div>
          </div>
          </div>

          <nav aria-label="Featured tours" className="hidden shrink-0 border-t border-white/15 pt-5 md:block">
            <ul className="grid grid-cols-4 gap-6">
              {tours.map((t, i) => (
                <li key={t.slug}>
                  <Link href={tourPath(t.slug)} className="group flex items-baseline gap-2 text-white/70 transition-colors hover:text-white">
                    <span className="font-display text-xs text-gold-light">0{i + 1}</span>
                    <span className="text-sm font-medium">
                      {t.title}
                      <span className="mt-0.5 block h-px w-0 bg-gold-light transition-all duration-500 group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>

      {/* ── Introduction ─────────────────────────────────────── */}
      <section className="section">
        <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <p className="eyebrow">Welcome to Barcelona</p>
            <h2 className="t-h2 mt-2.5">
              A city best understood <em className="italic text-terracotta">on foot</em>, with a story at every corner.
            </h2>
            <div className="t-body mt-4 space-y-3.5">
              <p>
                Roman colony, medieval sea power, cradle of Modernisme — Barcelona wears its history in layers. A
                Gothic chapel stands on Roman foundations; a quiet square still bears the marks of war; a basilica
                begun in 1882 is still rising over the skyline.
              </p>
              <p>
                City History Tours brings those layers to life. Whether you’re standing beneath the forest of
                columns in the Sagrada Familia or watching the light change over Montserrat’s peaks, our guides help
                you see not only what is in front of you, but why it matters.
              </p>
            </div>
            <ButtonLink href="/about" variant="outline" className="mt-6">
              Our story
            </ButtonLink>
          </div>
          <div className="lg:col-span-6">
            <div className="grid grid-cols-5 gap-3">
              <div className="relative col-span-3 aspect-[4/5] overflow-hidden rounded-xl">
                <Image src={images.gothicStreet.src} alt={images.gothicStreet.alt} fill sizes="(min-width: 1024px) 320px, 60vw" className="object-cover" />
              </div>
              <div className="col-span-2 flex flex-col gap-3 pt-8">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                  <Image src={images.parkGuellBench.src} alt={images.parkGuellBench.alt} fill sizes="(min-width: 1024px) 210px, 40vw" className="object-cover" />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <Image src={images.sagradaDetail.src} alt={images.sagradaDetail.alt} fill sizes="(min-width: 1024px) 210px, 40vw" className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Featured tours ───────────────────────────────────── */}
      <section id="tours" aria-labelledby="featured-tours-title" className="section section-alt">
        <Container>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              id="featured-tours-title"
              eyebrow="Our tours"
              title="Four journeys through Catalan history"
              intro="From Gaudí’s visionary architecture to Roman streets and a mountain monastery — choose your story."
            />
            <ButtonLink href="/tours" variant="outline" className="self-start md:self-auto">
              View all tours <ArrowRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tours.map((tour) => (
              <TourCard key={tour.slug} tour={tour} />
            ))}
          </div>
        </Container>
      </section>

      {/* ── Company introduction ─────────────────────────────── */}
      <section aria-labelledby="about-intro-title" className="section">
        <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Layered photo composition */}
          <div className="relative order-2 pb-10 pr-10 sm:pb-14 sm:pr-16 lg:order-1 lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lift">
              <Image
                src={images.montserratAbove.src}
                alt={images.montserratAbove.alt}
                fill
                sizes="(min-width: 1024px) 520px, 90vw"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-[42%] overflow-hidden rounded-xl border-[6px] border-white shadow-lift">
              <div className="relative aspect-[4/5]">
                <Image
                  src={images.sagradaNight.src}
                  alt={images.sagradaNight.alt}
                  fill
                  sizes="(min-width: 1024px) 240px, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-1.5 text-[0.8125rem] font-semibold text-ink shadow-card backdrop-blur-sm">
              Barcelona <span className="text-terracotta">·</span> Montserrat
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2 lg:col-span-6">
            <p className="eyebrow">About City History Tours</p>
            <h2 id="about-intro-title" className="t-h2 mt-2.5">
              History, told with <em className="italic text-terracotta">care and curiosity</em>.
            </h2>
            <p className="t-lead mt-4">
              Places become unforgettable when you understand their stories. Our tours are made for curious
              travellers who want more than a checklist of sights — who built them, why, and what they meant to the
              people who lived here.
            </p>

            <dl className="mt-7 grid grid-cols-3 divide-x divide-line overflow-hidden rounded-xl border border-line bg-sand">
              {[
                ["4", "Signature tours"],
                ["2", "Destinations"],
                ["2,000+", "Years of history"],
              ].map(([value, label]) => (
                <div key={label} className="flex flex-col px-4 py-4 sm:px-5">
                  <dt className="t-small mt-1">{label}</dt>
                  <dd className="order-first font-display text-[1.75rem] leading-none text-terracotta sm:text-[2rem]">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <ButtonLink href="/about" variant="dark" size="lg">
                Learn more about us
              </ButtonLink>
              <Link href="/tours" className="link-arrow">
                Explore our tours <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Why choose us ────────────────────────────────────── */}
      <section id="why-us" aria-labelledby="why-us-title" className="section relative isolate overflow-hidden bg-ink">
        <Image src={images.sagradaInterior.src} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-25" />
        <div className="absolute inset-0 -z-10 bg-ink/60" />
        <Container>
          <SectionHeading
            id="why-us-title"
            eyebrow="Why choose us"
            title="Tours that stay with you long after you’ve gone home"
            tone="light"
            align="center"
          />
          <ul className="mt-8 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map(({ icon: Icon, title, text }) => (
              <li key={title} className="bg-ink/80 p-5 sm:p-6">
                <Icon className="h-5 w-5 text-gold" strokeWidth={1.6} aria-hidden />
                <h3 className="t-h3 mt-3 !text-white">{title}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-white/65">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Testimonials />

      <BookingCTA
        image={images.barcelonaPanorama}
        title={<>Your Barcelona story <em className="italic text-gold-light">starts here</em></>}
        text="Choose from four guided tours across Barcelona and Montserrat and book your place in a few simple steps."
      >
        <ButtonLink href="/tours" variant="light" size="lg">
          Browse all tours <ArrowRight className="h-4 w-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href="/contact" variant="outline-light" size="lg">
          Ask a question
        </ButtonLink>
      </BookingCTA>
    </>
  );
}
