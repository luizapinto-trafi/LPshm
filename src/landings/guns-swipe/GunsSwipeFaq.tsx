import { useTranslation } from "next-i18next/pages";

type FaqItem = { q: string; a: string };

export function GunsSwipeFaq() {
  const { t } = useTranslation("gunsSwipe");
  const items = t("faq.items", { returnObjects: true }) as FaqItem[];

  return (
    <section className="bg-white px-5 py-12 min-[992px]:py-16" data-behavior="faq">
      <div className="mx-auto max-w-[720px]">
        <h2 className="m-0 mb-6 text-center font-display text-2xl font-bold text-ink-900">
          {t("faq.title")}
        </h2>
        <div className="border-t border-ink-200">
          {items.map((item) => (
            <details key={item.q} className="border-b border-ink-200 py-1">
              <summary className="cursor-pointer list-none py-4 font-display text-base font-semibold text-ink-900 marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  {item.q}
                  <span className="text-ink-500" aria-hidden>
                    +
                  </span>
                </span>
              </summary>
              <p className="m-0 pb-4 text-sm leading-relaxed text-ink-700">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
