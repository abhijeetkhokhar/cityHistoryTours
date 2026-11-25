import type { Metadata } from "next";
import { images } from "@/data/images";
import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/ButtonLink";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <PageHero
      image={images.gothicStreet}
      eyebrow="404"
      title="This path leads nowhere — yet."
      intro="The page you’re looking for doesn’t exist or has moved. Let’s get you back on the trail."
    >
      <div className="mt-6 flex flex-wrap gap-2.5">
        <ButtonLink href="/" variant="light" size="lg">
          Back to home
        </ButtonLink>
        <ButtonLink href="/tours" variant="outline-light" size="lg">
          View all tours
        </ButtonLink>
      </div>
    </PageHero>
  );
}
