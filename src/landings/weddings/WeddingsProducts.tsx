import Image from "next/image";
import { useTranslation } from "next-i18next/pages";
import { weddingsProductThumbs } from "./weddingsCdn";

export const WeddingsProducts = () => {
  const { t } = useTranslation("weddings");
  const items = t("products.items", { returnObjects: true }) as { name: string; price: string }[];

  return (
    <section className="mx-auto mb-16 w-full max-w-[1920px] px-4 lg:px-16">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-8">
        {items.map((p, i) => (
          <div
            key={p.name}
            className="group flex cursor-pointer flex-col items-center text-center"
          >
            <div className="relative mb-4 aspect-[4/5] w-full overflow-hidden rounded bg-ink-100">
              <Image
                src={weddingsProductThumbs[i] ?? weddingsProductThumbs[0]!}
                alt={t("products.imageAlt")}
                fill
                className="object-cover transition-opacity group-hover:opacity-90"
                sizes="(min-width: 1024px) 20vw, 50vw"
              />
            </div>
            <h3 className="text-sm font-medium font-body lg:text-base">{p.name}</h3>
            <p className="text-sm text-ink-600">{p.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
