import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Clock, MapPin } from "lucide-react";
import { TO_BE_CONFIRMED, tourPath, type Tour } from "@/data/tours";
import { BookNowButton } from "./BookNowButton";

type TourCardProps = {
  tour: Tour;
  /** Also show the top highlights (Tours page). */
  detailed?: boolean;
  priority?: boolean;
  headingLevel?: "h2" | "h3";
};

export function TourCard({ tour, detailed = false, priority = false, headingLevel: H = "h3" }: TourCardProps) {
  const href = tourPath(tour.slug);
  return (
    <article
      className={`card group flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lift ${
        detailed ? "sm:flex-row" : ""
      }`}
    >
      <Link
        href={href}
        className={`relative block shrink-0 overflow-hidden bg-sand ${
          detailed ? "aspect-[3/2] sm:aspect-auto sm:w-[42%]" : "aspect-[3/2]"
        }`}
        tabIndex={-1}
        aria-hidden
      >
        <Image
          src={tour.cardImage.src}
          alt=""
          fill
          priority={priority}
          sizes={detailed ? "(min-width: 1280px) 260px, (min-width: 640px) 40vw, 100vw" : "(min-width: 1280px) 400px, (min-width: 640px) 45vw, 100vw"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        <span className="absolute bottom-2.5 left-3 inline-flex items-center gap-1 text-[0.8125rem] font-medium text-white">
          <MapPin className="h-4 w-4" aria-hidden /> {tour.location}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="t-label truncate !text-terracotta">{tour.category}</p>
        <H className="t-h3 mt-1.5">
          <Link href={href} className="transition-colors hover:text-terracotta">
            {tour.title}
          </Link>
        </H>
        <p className="t-small mt-2 line-clamp-3">{tour.summary}</p>

        {detailed && (
          <ul className="mt-3 space-y-1.5" aria-label={`${tour.title} highlights`}>
            {tour.cardHighlights.map((h) => (
              <li key={h} className="flex gap-2 text-sm text-ink-soft">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" aria-hidden />
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-4">
          <dl className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line pt-3 text-[0.8125rem]">
            <div className="flex items-center gap-1.5">
              <dt className="sr-only">Duration</dt>
              <Clock className="h-4 w-4 text-terracotta" aria-hidden />
              <dd className={tour.duration ? "text-ink" : "text-muted"}>
                {tour.duration ?? `Duration: ${TO_BE_CONFIRMED.toLowerCase()}`}
              </dd>
            </div>
            {tour.price && (
              <div className="flex items-center gap-1.5">
                <dt className="sr-only">Price</dt>
                <dd className="font-semibold text-ink">{tour.price}</dd>
              </div>
            )}
          </dl>
          <div className="mt-3 flex items-center justify-between gap-2">
            <BookNowButton slug={tour.slug} tourTitle={tour.title} size="sm" />
            <Link href={href} className="link-arrow">
              Details <span className="sr-only">: {tour.title}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
