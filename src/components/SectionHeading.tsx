import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
  className?: string;
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  as: Tag = "h2",
  className = "",
  id,
}: SectionHeadingProps) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      {eyebrow && (
        <p className={`eyebrow ${tone === "light" ? "eyebrow-light" : ""} ${center ? "justify-center" : ""}`}>
          {eyebrow}
        </p>
      )}
      <Tag id={id} className={`t-h2 ${eyebrow ? "mt-2.5" : ""} ${tone === "light" ? "!text-white" : ""}`}>
        {title}
      </Tag>
      {intro && <p className={`t-lead mt-3 ${tone === "light" ? "!text-white/75" : ""}`}>{intro}</p>}
    </div>
  );
}
