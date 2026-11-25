import { Quote } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";

/**
 * Shows real testimonials from src/config/site.ts. While none have been added,
 * it shows an honest note instead of invented reviews.
 */
export function Testimonials() {
  const { testimonials, reviewsUrl } = siteConfig;
  return (
    <section aria-labelledby="testimonials-title" className="section section-alt">
      <Container>
        <SectionHeading
          id="testimonials-title"
          eyebrow="Guest stories"
          title="What our guests say"
          align="center"
        />
        {testimonials.length > 0 ? (
          <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <li key={`${t.name}-${t.quote.slice(0, 20)}`}>
                <figure className="panel flex h-full flex-col">
                  <Quote className="h-5 w-5 text-gold" aria-hidden />
                  <blockquote className="mt-3 flex-1 font-display text-base leading-relaxed text-ink">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-4 border-t border-line pt-3 text-sm">
                    <span className="font-semibold text-ink">{t.name}</span>
                    {t.context && <span className="block text-muted">{t.context}</span>}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mx-auto mt-8 max-w-xl rounded-xl border border-dashed border-gold/60 bg-white/70 px-6 py-7 text-center">
            <Quote className="mx-auto h-6 w-6 text-gold" aria-hidden />
            <p className="t-h3 mt-3">
              We only publish reviews from real guests.
            </p>
            <p className="t-small mt-2">
              Verified guest reviews will appear here soon. Joined one of our tours? We’d love to hear about your
              experience.
            </p>
          </div>
        )}
        {reviewsUrl && (
          <p className="mt-6 text-center text-sm">
            <a
              href={reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-terracotta underline underline-offset-4 hover:text-terracotta-dark"
            >
              Read more reviews
            </a>
          </p>
        )}
      </Container>
    </section>
  );
}
