import Link from "next/link";
import { siteConfig } from "@/config/site";

type LogoProps = {
  tone?: "dark" | "light";
  className?: string;
};

/** Logo: bold lowercase wordmark (no icon). */
export function Logo({ tone = "dark", className = "" }: LogoProps) {
  const main = tone === "light" ? "text-white" : "text-ink";
  const accent = tone === "light" ? "text-gold-light" : "text-terracotta";
  return (
    <Link href="/" aria-label={`${siteConfig.name} — home`} className={`inline-flex items-center ${className}`}>
      <span
        className={`font-logo text-[1.45rem] font-extrabold lowercase leading-none tracking-[-0.045em] sm:text-[1.6rem] ${main}`}
      >
        cityhistory<span className={accent}>tours</span>
      </span>
    </Link>
  );
}
