import { ArrowRight } from "lucide-react";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import { images } from "@/data/images";
import { tours, tourPath } from "@/data/tours";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TourCard } from "@/components/TourCard";
import { SectionHeading } from "@/components/SectionHeading";
import { BookingCTA } from "@/components/BookingCTA";
import { ButtonLink } from "@/components/ButtonLink";
import { JsonLd } from "@/components/JsonLd";

export const metadata = buildMetadata({
  title: "Tours in Barcelona & Montserrat",
  description:
    "Browse our guided history tours: Sagrada Familia, Park Güell, a Barcelona Gothic Quarter walking tour and a Montserrat tour from Barcelona.",
  path: "/tours",
  image: images.sagradaFacade,
});

const steps = [
  {
    title: "Choose your tour",
    text: "Explore each tour page for highlights, the itinerary, meeting point and visitor information.",
  },
  {
    title: "Select “Book Now”",
    text: "Pick your date and number of guests on our secure booking page and see live availability.",
  },
  {
    title: "Receive your confirmation",
    text: "Your confirmation includes everything you need for the day, including where to meet your guide.",
  },
];

export default function ToursPage() {
  return (
    <>
      <PageHero
        image={images.sagradaFacade}
        eyebrow="Our tours"
        title="Guided tours in Barcelona & Montserrat"
        intro="Four carefully crafted experiences, from Gaudí’s masterpieces to the medieval heart of the city and the sacred mountain beyond."
      >
        <div className="mt-5">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tours", href: "/tours" }]} />
        </div>
      </PageHero>

      <section aria-labelledby="all-tours-title" className="section">
        <Container>
          <SectionHeading
            id="all-tours-title"
            eyebrow={`${tours.length} tours`}
            title="Find your story"
            intro="Every tour is led by a professional guide and designed around the history that makes each place extraordinary."
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {tours.map((tour, i) => (
              <TourCard key={tour.slug} tour={tour} detailed priority={i < 2} headingLevel="h3" />
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="how-booking-works" className="section section-alt">
        <Container>
          <SectionHeading id="how-booking-works" eyebrow="Booking" title="How booking works" align="center" />
          <ol className="mt-8 grid gap-4 lg:grid-cols-3">
            {steps.map((step, i) => (
              <li key={step.title} className="panel flex gap-4">
                <span className="font-display text-2xl leading-none text-terracotta">0{i + 1}</span>
                <div>
                  <h3 className="t-h3">{step.title}</h3>
                  <p className="t-small mt-1">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <BookingCTA
        image={images.montserratRidge}
        eyebrow="Need help choosing?"
        title="Not sure which tour is right for you?"
        text="Tell us about your trip and interests, and our team will help you find the perfect fit."
      >
        <ButtonLink href="/contact" variant="light" size="lg">
          Contact us <ArrowRight className="h-4 w-4" aria-hidden />
        </ButtonLink>
      </BookingCTA>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "City History Tours",
          itemListElement: tours.map((t, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: absoluteUrl(tourPath(t.slug)),
            name: t.title,
          })),
        }}
      />
    </>
  );
}
