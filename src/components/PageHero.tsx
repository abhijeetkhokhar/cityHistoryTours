import Image from "next/image";
import type { ReactNode } from "react";
import type { SiteImage } from "@/data/images";
import { Container } from "./Container";

type PageHeroProps = {
  image: SiteImage;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  objectPosition?: string;
};

/** Compact image hero used on Tours, About, Contact and 404. */
export function PageHero({ image, eyebrow, title, intro, children, objectPosition = "center" }: PageHeroProps) {
  return (
    <section className="relative isolate flex min-h-[380px] items-end overflow-hidden bg-ink sm:min-h-[440px] lg:min-h-[500px]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        quality={85}
        className="-z-10 object-cover"
        style={{ objectPosition }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/40 to-black/35" />
      <Container className="pb-12 pt-28 sm:pb-14">
        <div className="max-w-3xl animate-fade-up">
          {eyebrow && <p className="eyebrow eyebrow-light">{eyebrow}</p>}
          <h1 className="t-h1 mt-3 !text-white">{title}</h1>
          {intro && <p className="mt-3 max-w-xl text-base leading-relaxed text-white/80 sm:text-base">{intro}</p>}
          {children}
        </div>
      </Container>
    </section>
  );
}
