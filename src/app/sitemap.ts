import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { tours, tourPath } from "@/data/tours";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/tours"), lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/about"), lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/contact"), lastModified, changeFrequency: "monthly", priority: 0.6 },
  ];
  const tourPages: MetadataRoute.Sitemap = tours.map((t) => ({
    url: absoluteUrl(tourPath(t.slug)),
    lastModified,
    changeFrequency: "weekly",
    priority: 0.9,
    images: [absoluteUrl(t.heroImage.src)],
  }));
  return [...staticPages, ...tourPages];
}
