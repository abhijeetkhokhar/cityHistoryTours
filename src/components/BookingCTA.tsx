import Image from "next/image";
import type { ReactNode } from "react";
import type { SiteImage } from "@/data/images";
import { Container } from "./Container";

type BookingCTAProps = {
  image: SiteImage;
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  children: ReactNode;
  className?: string;
};

/** Compact image banner with booking actions. */
export function BookingCTA({ image, eyebrow = "Ready when you are", title, text, children, className = "" }: BookingCTAProps) {
  return (
    <section className={`section ${className}`}>
      <Container>
        <div className="relative isolate overflow-hidden rounded-2xl bg-ink px-6 py-12 sm:px-12 sm:py-14 lg:px-16">
          <Image src={image.src} alt="" fill sizes="(min-width: 1280px) 1200px, 100vw" className="-z-10 object-cover opacity-60" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/30" />
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow eyebrow-light">{eyebrow}</p>
              <h2 className="t-h2 mt-2.5 !text-white">{title}</h2>
              {text && <p className="mt-2.5 text-base leading-relaxed text-white/75">{text}</p>}
            </div>
            <div className="flex shrink-0 flex-wrap gap-2.5">{children}</div>
          </div>
        </div>
      </Container>
    </section>
  );
}
