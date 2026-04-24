import Image from "next/image";
import { useTranslation } from "next-i18next/pages";
import { weddingsFeatureImages } from "./weddingsCdn";
import productHero from "@shapermint/assets/product-hero.png";

type Feature = { title: string; body: string };

export const WeddingsFeatures = () => {
  const { t } = useTranslation("weddings");
  const features = t("features.items", { returnObjects: true }) as Feature[];

  return (
    <section className="box-border flex w-full flex-col items-center justify-center bg-coral-50 px-4 py-10 lg:pb-32 lg:pt-20">
      <h2 className="mb-8 text-center font-display text-3xl leading-tight text-ink-900 lg:mb-16 lg:text-5xl">
        <span className="lg:hidden">
          {t("features.m1")} <br />
          {t("features.m2")} <br />
          {t("features.m3")}
        </span>
        <span className="hidden text-center lg:block">
          {t("features.d1")} <br />
          {t("features.d2")}
        </span>
      </h2>
      <div className="flex w-full max-w-[1400px] flex-col justify-between gap-8 lg:flex-row lg:gap-12">
        {features.map((f, i) => (
          <div
            key={f.title}
            className="relative flex flex-1 flex-col items-center lg:items-start"
          >
            <div className="relative mb-6 aspect-square w-full max-w-[500px] overflow-hidden rounded-2xl lg:mb-10">
              <Image
                src={weddingsFeatureImages[i] ?? weddingsFeatureImages[0]!}
                alt={t("features.featureImageAlt")}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 30vw, 100vw"
              />
            </div>
            <div className="flex w-full max-w-[500px] flex-row items-start lg:flex-col">
              <div className="relative mr-4 h-16 w-16 shrink-0 overflow-hidden rounded-full bg-ink-200 lg:mb-6 lg:mr-0 lg:h-20 lg:w-20">
                <Image src={productHero} alt={t("features.iconAlt")} fill className="object-cover" />
              </div>
              <div className="flex flex-col">
                <h3 className="mb-2 font-mono text-sm uppercase text-ink-900 lg:mb-4 lg:mt-6 lg:text-base">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-700 lg:text-lg">{f.body}</p>
              </div>
            </div>
            <button
              type="button"
              className="-bottom-20 left-0 hidden min-w-[225px] border border-ink-900 bg-ink-900 px-8 py-4 font-mono text-base uppercase text-white transition-colors duration-300 hover:bg-transparent hover:text-ink-900 lg:absolute lg:block"
            >
              {t("features.cta")}
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="mt-8 w-full max-w-[300px] border border-ink-900 bg-ink-900 px-8 py-4 font-mono text-sm uppercase text-white transition-colors duration-300 hover:bg-transparent hover:text-ink-900 lg:hidden"
      >
        {t("features.cta")}
      </button>
    </section>
  );
};
