"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navigation } from "@/config/site";
import { Logo } from "./Logo";
import { ButtonLink } from "./ButtonLink";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll and allow Escape while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-ivory/95 shadow-[0_1px_0_rgb(27_25_23/0.08)] backdrop-blur-md"
          : "bg-gradient-to-b from-black/45 to-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-[4.25rem] w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Logo tone={solid ? "dark" : "light"} />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-10">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`relative text-[1.0625rem] font-medium tracking-[0.01em] transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-current after:transition-all after:duration-300 ${
                    isActive(item.href) ? "after:w-full" : "after:w-0 hover:after:w-full"
                  } ${solid ? "text-ink hover:text-terracotta" : "text-white/90 hover:text-white"}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink
            href="/tours"
            variant={solid ? "primary" : "light"}
            size="md"
            className="hidden sm:inline-flex"
          >
            Book a Tour
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors md:hidden ${
              solid ? "text-ink hover:bg-sand" : "text-white hover:bg-white/10"
            }`}
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4.25rem)] overflow-y-auto border-t border-line bg-ivory md:hidden"
      >
        <nav aria-label="Mobile" className="px-5 pb-8 pt-4 sm:px-6">
          <ul className="divide-y divide-line">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block py-4 font-display text-2xl ${isActive(item.href) ? "text-terracotta" : "text-ink"}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ButtonLink href="/tours" size="lg" className="mt-6 w-full">
            Book a Tour
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
