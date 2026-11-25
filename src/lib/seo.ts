import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: { src: string; alt: string; width?: number; height?: number };
  keywords?: string[];
  type?: "website" | "article";
};

/** Builds consistent metadata (canonical, Open Graph, Twitter) for every page. */
export function buildMetadata({
  title,
  description,
  path,
  image,
  keywords,
  type = "website",
}: PageMetaInput): Metadata {
  const ogImage = image ?? { src: siteConfig.ogImage, alt: siteConfig.name };
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: siteConfig.name,
      title: `${title} | ${siteConfig.name}`,
      description,
      locale: siteConfig.locale,
      images: [
        {
          url: ogImage.src,
          alt: ogImage.alt,
          width: ogImage.width,
          height: ogImage.height,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [ogImage.src],
    },
  };
}
