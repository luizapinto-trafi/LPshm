import { useTranslation } from "next-i18next/pages";

type TrustItem = { title: string; body: string };

export function GunsSwipeTrust() {
  const { t } = useTranslation("gunsSwipe");
  const items = t("trust.items", { returnObjects: true }) as TrustItem[];

  return (
    <section className="bg-coral-50 px-5 py-12 min-[992px]:py-16" data-behavior="trust">
      <div className="mx-auto max-w-[960px]">
        <h2 className="m-0 mb-8 text-center font-display text-2xl font-bold text-ink-900 min-[992px]:text-3xl">
          {t("trust.title")}
        </h2>
        <div className="grid gap-6 min-[992px]:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="rounded-xl bg-white p-5">
              <h3 className="m-0 font-display text-base font-bold text-ink-900">
                {item.title}
              </h3>
              <p className="mt-2 m-0 text-sm leading-relaxed text-ink-700">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
