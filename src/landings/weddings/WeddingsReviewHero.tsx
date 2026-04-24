import Image from "next/image";
import { useTranslation } from "next-i18next/pages";
import { weddingsReviewBackground } from "./weddingsCdn";
import { StarRow } from "./WeddingIcons";

export const WeddingsReviewHero = () => {
  const { t } = useTranslation("weddings");
  return (
    <section className="box-border flex w-full flex-col items-center justify-center px-4 py-16 lg:py-32">
      <h2 className="mb-8 text-center font-display text-3xl leading-tight text-ink-900 lg:mb-10 lg:text-5xl">
        <span className="lg:hidden">
          {t("review.titleM1")} <br className="lg:hidden" />
          {t("review.titleM2")} <br />
          {t("review.titleM3")}
        </span>
        <span className="hidden lg:inline">
          {t("review.titleD1")} <br />
          {t("review.titleD2")}
        </span>
      </h2>

      <div className="relative mx-auto flex w-full max-w-[1920px] flex-col items-center justify-center">
        <div className="relative aspect-[2/1] w-full overflow-hidden rounded-xl lg:rounded-none">
          <Image
            src={weddingsReviewBackground}
            alt={t("review.backgroundAlt")}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="z-10 mx-4 -mt-12 flex max-w-[350px] flex-col rounded-xl bg-white/90 p-8 text-left shadow-xl backdrop-blur-md lg:absolute lg:bottom-10 lg:left-[10%] lg:mt-0 lg:p-10">
          <StarRow className="mb-4" />
          <p className="text-base leading-relaxed text-ink-700 lg:text-lg">{t("review.quote")}</p>
          <p className="mt-4 font-display text-lg font-semibold text-ink-900">{t("review.author")}</p>
          <p className="mt-1 text-sm text-ink-500">{t("review.subline")}</p>
        </div>
      </div>
    </section>
  );
};
