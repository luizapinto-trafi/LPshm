import { useState } from "react";
import { useTranslation } from "next-i18next/pages";
import { handleKeyDown } from "@/shared/utils/KeyEvent";

export const GrunsOlipopFaq = () => {
  const { t } = useTranslation("grunsOlipop");
  const items = t("faq.items", { returnObjects: true }) as Array<{ q: string; a: string }>;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      className="bg-gruns-cream px-4 py-10 pb-10 sm:px-6 sm:py-20 sm:pb-8"
      aria-labelledby="olipop-faq-heading"
    >
      <div className="mx-auto max-w-2xl">
        <h2
          className="mb-8 text-center font-display text-2xl font-bold text-gruns-dark sm:mb-10"
          id="olipop-faq-heading"
        >
          {t("faq.title")}
        </h2>
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div className="border-b border-gruns-primary/20" key={item.q}>
              <button
                className="flex w-full items-center justify-between gap-4 border-none bg-transparent py-4 pl-0 pr-0 text-left text-base font-semibold text-gruns-dark transition hover:text-gruns-primary"
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                onKeyDown={(e) => handleKeyDown(e, () => setOpen(isOpen ? null : i), ["Enter", " "])}
              >
                {item.q}
                <span
                  className="shrink-0 text-lg transition-transform duration-200"
                  style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                  aria-hidden
                >
                  +
                </span>
              </button>
              <div
                className="overflow-hidden text-base leading-relaxed text-gruns-gray transition-all duration-300"
                style={{ maxHeight: isOpen ? 400 : 0 }}
              >
                <p className="m-0 pb-4 pr-1">{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
