import { Suspense } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { hasContactDetails, siteConfig } from "@/config/site";
import { images } from "@/data/images";
import { tours } from "@/data/tours";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { ButtonLink } from "@/components/ButtonLink";

export const metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Contact City History Tours with questions about our Barcelona and Montserrat tours, private groups or bookings.",
  path: "/contact",
  image: images.placaReial,
});

export default function ContactPage() {
  const { contact } = siteConfig;
  const tourOptions = tours.map((t) => ({ slug: t.slug, title: t.title }));
  const showDetails = hasContactDetails();

  return (
    <>
      <PageHero
        image={images.placaReial}
        eyebrow="Contact"
        title="We’d love to hear from you"
        intro="Questions about a tour, planning a private group or need help with a booking? Send us a message and our team will get back to you."
      >
        <div className="mt-5">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact", href: "/contact" }]} />
        </div>
      </PageHero>

      <section id="enquiry" aria-label="Contact form and details" className="section">
        <Container className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <Suspense fallback={<div className="h-[40rem] animate-pulse rounded-xl bg-white/60" />}>
              <ContactForm tours={tourOptions} />
            </Suspense>
          </div>

          <aside className="space-y-4 lg:col-span-4">
            {showDetails && (
              <div className="rounded-xl bg-ink p-5 text-[0.9375rem] text-white/80 sm:p-6">
                <h2 className="t-h3 !text-white">Contact details</h2>
                <ul className="mt-4 space-y-3.5">
                  {contact.email && (
                    <li className="flex gap-3">
                      <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                      <div>
                        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold-light">Email</p>
                        <a href={`mailto:${contact.email}`} className="break-all text-white hover:underline">
                          {contact.email}
                        </a>
                      </div>
                    </li>
                  )}
                  {contact.phone && (
                    <li className="flex gap-3">
                      <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                      <div>
                        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold-light">Phone</p>
                        <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className="text-white hover:underline">
                          {contact.phone}
                        </a>
                      </div>
                    </li>
                  )}
                  {contact.whatsapp && (
                    <li className="flex gap-3">
                      <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                      <div>
                        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold-light">WhatsApp</p>
                        <a
                          href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:underline"
                        >
                          Message us on WhatsApp
                        </a>
                      </div>
                    </li>
                  )}
                  {contact.address.length > 0 && (
                    <li className="flex gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                      <div>
                        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold-light">Address</p>
                        <address className="not-italic text-white">
                          {contact.address.map((l) => (
                            <span key={l} className="block">
                              {l}
                            </span>
                          ))}
                        </address>
                      </div>
                    </li>
                  )}
                  {contact.hours.length > 0 && (
                    <li className="flex gap-3">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                      <div>
                        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold-light">Hours</p>
                        {contact.hours.map((l) => (
                          <span key={l} className="block text-white">
                            {l}
                          </span>
                        ))}
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            )}

            <div className="panel">
              <h2 className="t-h3">Ready to book?</h2>
              <p className="t-small mt-1.5">
                Each tour page has a Book Now button where you can choose your date and reserve your place.
              </p>
              <ButtonLink href="/tours" variant="dark" size="sm" className="mt-4">
                Browse tours
              </ButtonLink>
            </div>

            <div className="panel-muted">
              <h2 className="t-h3">Private & group tours</h2>
              <p className="t-small mt-1.5">
                Travelling with family, friends, a school or a company? Use the form to tell us your group size and
                dates and we’ll be in touch.
              </p>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
