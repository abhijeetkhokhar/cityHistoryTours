import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces/index.css";
import "@fontsource-variable/fraunces/wght-italic.css";
import "@fontsource-variable/inter/index.css";
import "@fontsource-variable/plus-jakarta-sans/wght.css";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    url: "/",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, alt: "Barcelona skyline at sunset" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#1b1917",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { contact, social } = siteConfig;
  const sameAs = Object.values(social).filter(Boolean);
  return (
    <html lang="en">
      <body className="flex min-h-dvh flex-col">
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            name: siteConfig.name,
            url: siteConfig.url,
            description: siteConfig.description,
            image: `${siteConfig.url}${siteConfig.ogImage}`,
            areaServed: ["Barcelona", "Montserrat"],
            ...(contact.email && { email: contact.email }),
            ...(contact.phone && { telephone: contact.phone }),
            ...(sameAs.length > 0 && { sameAs }),
          }}
        />
      </body>
    </html>
  );
}
