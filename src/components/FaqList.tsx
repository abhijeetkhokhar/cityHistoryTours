import { ChevronDown } from "lucide-react";
import type { FAQ } from "@/data/tours";

export function FaqList({ faqs }: { faqs: FAQ[] }) {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-xl border border-line/80 bg-white">
      {faqs.map((faq) => (
        <details key={faq.question} className="group [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-3.5 text-left text-base font-medium text-ink transition-colors hover:text-terracotta">
            {faq.question}
            <ChevronDown
              className="h-4 w-4 shrink-0 text-terracotta transition-transform duration-300 group-open:rotate-180"
              aria-hidden
            />
          </summary>
          <p className="t-body px-5 pb-4 pr-10">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
