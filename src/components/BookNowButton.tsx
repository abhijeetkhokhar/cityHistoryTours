import { ArrowUpRight, ArrowRight } from "lucide-react";
import { getBookingTarget } from "@/config/booking";
import { ButtonLink, type ButtonSize, type ButtonVariant } from "./ButtonLink";

type BookNowButtonProps = {
  slug: string;
  tourTitle: string;
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

/**
 * The single "Book Now" button used everywhere. It reads the booking URL for the
 * tour from src/config/booking.ts. If no URL is configured yet, it opens the
 * contact form with the tour pre-selected.
 */
export function BookNowButton({
  slug,
  tourTitle,
  label = "Book Now",
  variant = "primary",
  size = "md",
  className = "",
}: BookNowButtonProps) {
  const target = getBookingTarget(slug);
  const Icon = target.external ? ArrowUpRight : ArrowRight;
  return (
    <ButtonLink
      href={target.href}
      external={target.external}
      variant={variant}
      size={size}
      className={className}
      aria-label={`${label}: ${tourTitle}${target.external ? " (opens booking page in a new tab)" : ""}`}
    >
      {label}
      <Icon aria-hidden className="h-4 w-4" />
    </ButtonLink>
  );
}
