import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { images } from "@/data/images";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { BookingCTA } from "@/components/BookingCTA";
import { ButtonLink } from "@/components/ButtonLink";

export const metadata = buildMetadata({
  title: "About Us",
  description:
    "City History Tours creates guided history tours in Barcelona and Montserrat. Discover our story, our mission and our approach to guided touring.",
  path: "/about",
  image: images.placaSantJaume,
});

const principles = [
  {
    title: "Stories before statistics",
    text: "Dates and dimensions matter, but people and ideas are what make history memorable. We build every tour around the human stories behind each place.",
  },
  {
    title: "Context is everything",
    text: "A façade, a square or a statue makes sense when you understand the world that created it. We connect what you see to the bigger picture of Barcelona and Catalonia.",
  },
  {
    title: "Room to wonder",
    text: "Good guiding leaves space for you to look, listen and ask. We pace our tours so you can take in each place rather than rush past it.",
  },
  {
    title: "Respect for places and people",
    text: "Many of the sites we visit are places of worship or living neighbourhoods. We visit thoughtfully and encourage our guests to do the same.",
  },
  {
    title: "Clarity from the start",
    text: "Clear information before you book, a straightforward booking process and practical guidance for the day — so you can simply enjoy the experience.",
  },
  {
    title: "Always curious",
    text: "History is never finished. We keep researching, refining and learning, so every tour continues to grow richer over time.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        image={images.placaSantJaume}
        eyebrow="About us"
        title={<>Every place has a story. <em className="italic text-gold-light">We tell it.</em></>}
        intro="City History Tours exists to help travellers understand Barcelona and Montserrat — not just see them."
      >
        <div className="mt-5">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }]} />
        </div>
      </PageHero>

      {/* Story */}
      <section aria-labelledby="story-title" className="section">
        <Container className="grid gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading id="story-title" eyebrow="Our story" title="Why we started City History Tours" />
          </div>
          <div className="t-body space-y-3.5 lg:col-span-7">
            <p className="font-display text-lg leading-relaxed text-ink-soft sm:text-lg">
              Barcelona is one of the most visited cities in the world — yet so much of its story goes unnoticed by
              the people who walk its streets.
            </p>
            <p>
              Visitors queue for the Sagrada Familia without knowing why Gaudí filled it with tortoises and
              cryptograms. They cross Plaça de Sant Jaume unaware that it has been a seat of power since Roman
              times. They ride up to Montserrat and admire the view, but miss the thousand years of faith, legend and
              Catalan identity woven into the mountain.
            </p>
            <p>
              City History Tours was created to change that. We believe the most rewarding way to experience a place
              is to understand it: who built it, what they hoped for, what changed and what endured. Our tours bring
              together Barcelona’s most remarkable sights and the stories that give them meaning.
            </p>
          </div>
        </Container>
      </section>

      {/* Mission */}
      <section aria-labelledby="mission-title" className="section relative isolate overflow-hidden bg-ink text-white">
        <Image src={images.montserratMisty.src} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-30" />
        <div className="absolute inset-0 -z-10 bg-ink/50" />
        <Container className="text-center">
          <p className="eyebrow eyebrow-light justify-center">Our mission</p>
          <h2 id="mission-title" className="t-h2 mx-auto mt-3 max-w-2xl !text-white">
            To make history <em className="italic text-gold-light">vivid, accessible and meaningful</em> for every
            traveller who joins us.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70">
            Whether it’s your first morning in Barcelona or your fifth visit, we want you to leave each tour seeing the
            city with new eyes — and with a deeper appreciation of the cultures and people who shaped it.
          </p>
        </Container>
      </section>

      {/* Philosophy */}
      <section aria-labelledby="philosophy-title" className="section">
        <Container>
          <div className="grid items-end gap-8 lg:grid-cols-2">
            <SectionHeading
              id="philosophy-title"
              eyebrow="Our guided-tour philosophy"
              title="How we approach every tour"
              intro="Six principles guide the way we design our tours and welcome our guests."
            />
            <div className="relative hidden aspect-[16/7] overflow-hidden rounded-xl lg:block">
              <Image src={images.parkGuellColonnade.src} alt={images.parkGuellColonnade.alt} fill sizes="50vw" className="object-cover" />
            </div>
          </div>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <li key={p.title} className="panel">
                <span className="text-[0.8125rem] font-semibold text-terracotta">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-h3 mt-1.5">{p.title}</h3>
                <p className="t-small mt-1.5">{p.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Where we go */}
      <section aria-labelledby="where-title" className="section section-alt">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="grid grid-cols-2 gap-3">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <Image src={images.sagradaNight.src} alt={images.sagradaNight.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
            </div>
            <div className="relative mt-8 aspect-[4/5] overflow-hidden rounded-xl">
              <Image src={images.montserratCliffs.src} alt={images.montserratCliffs.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
            </div>
          </div>
          <div>
            <SectionHeading
              id="where-title"
              eyebrow="Where we go"
              title="From Gaudí’s Barcelona to the sacred mountain"
              intro="Our tours explore the Sagrada Familia, Park Güell and the Gothic Quarter in Barcelona, and the Benedictine monastery of Montserrat in the mountains beyond the city."
            />
            <ButtonLink href="/tours" className="mt-6">
              Explore our tours <ArrowRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
          </div>
        </Container>
      </section>

      <BookingCTA
        image={images.barcelonaCoast}
        eyebrow="Join us"
        title="Discover the stories behind Barcelona"
        text="Browse our tours and book your place, or contact us with any questions."
      >
        <ButtonLink href="/tours" variant="light" size="lg">
          Browse tours <ArrowRight className="h-4 w-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href="/contact" variant="outline-light" size="lg">
          Contact us
        </ButtonLink>
      </BookingCTA>
    </>
  );
}
