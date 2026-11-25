"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Fixed booking bar for small screens. Appears once the visitor scrolls past the
 * hero and hides again when the footer comes into view so it never covers it.
 */
export function MobileBookingBar({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  const [pastHero, setPastHero] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const footer = document.querySelector("footer");
    let observer: IntersectionObserver | undefined;
    if (footer && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting));
      observer.observe(footer);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  const visible = pastHero && !footerVisible;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ivory/95 px-4 py-2.5 backdrop-blur-md transition-transform duration-300 lg:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className="mx-auto flex max-w-xl items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate font-display text-base leading-tight text-ink">{title}</p>
          <p className="truncate text-xs text-muted">{subtitle}</p>
        </div>
        <div className="shrink-0">{children}</div>
      </div>
    </div>
  );
}
