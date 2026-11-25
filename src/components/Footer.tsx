import Link from "next/link";
import { Mail, MapPin, Phone, MessageCircle, Clock } from "lucide-react";
import { navigation, siteConfig } from "@/config/site";
import { tours, tourPath } from "@/data/tours";
import { Container } from "./Container";
import { Logo } from "./Logo";

export function Footer() {
  const { contact, social } = siteConfig;
  const socials = Object.entries(social).filter(([, url]) => url) as [string, string][];
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-[0.9375rem] text-white/65">
      <Container className="pb-8 pt-12 sm:pt-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-4 max-w-xs leading-relaxed">
              Guided history tours in Barcelona and Montserrat — from Gaudí’s masterpieces to the lanes of the
              Gothic Quarter and Catalonia’s sacred mountain.
            </p>
            {socials.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {socials.map(([name, url]) => (
                  <li key={name}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white/20 px-3 py-1 text-xs capitalize transition-colors hover:border-gold-light hover:text-gold-light"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Tours" className="lg:col-span-3">
            <h2 className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-gold-light">Our tours</h2>
            <ul className="mt-4 space-y-2">
              {tours.map((t) => (
                <li key={t.slug}>
                  <Link href={tourPath(t.slug)} className="transition-colors hover:text-white">
                    {t.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="lg:col-span-2">
            <h2 className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-gold-light">Company</h2>
            <ul className="mt-4 space-y-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-gold-light">Get in touch</h2>
            <ul className="mt-4 space-y-2.5">
              {contact.email && (
                <li className="flex gap-3">
                  <Mail className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden />
                  <a href={`mailto:${contact.email}`} className="break-all transition-colors hover:text-white">
                    {contact.email}
                  </a>
                </li>
              )}
              {contact.phone && (
                <li className="flex gap-3">
                  <Phone className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden />
                  <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className="transition-colors hover:text-white">
                    {contact.phone}
                  </a>
                </li>
              )}
              {contact.whatsapp && (
                <li className="flex gap-3">
                  <MessageCircle className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden />
                  <a
                    href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    WhatsApp
                  </a>
                </li>
              )}
              {contact.address.length > 0 && (
                <li className="flex gap-3">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden />
                  <address className="not-italic">
                    {contact.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </li>
              )}
              {contact.hours.length > 0 && (
                <li className="flex gap-3">
                  <Clock className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden />
                  <span>
                    {contact.hours.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </li>
              )}
              <li>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 font-medium text-white underline decoration-gold/60 underline-offset-4 transition-colors hover:decoration-gold"
                >
                  Send us a message
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>
            Photography via{" "}
            <a
              href="https://unsplash.com/license"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-white"
            >
              Unsplash
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
