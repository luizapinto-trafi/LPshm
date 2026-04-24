import Image from "next/image";
import { useTranslation } from "next-i18next/pages";
import { weddingsHero } from "./weddingsCdn";

export const WeddingsHero = () => {
  const { t } = useTranslation("weddings");
  return (
    <section className="relative mx-auto mb-10 w-full max-w-[1920px]">
      <div className="relative aspect-[0.65/1] w-full md:aspect-[2/1]">
        <Image
          src={weddingsHero.desktop}
          alt=""
          className="hidden w-full object-cover md:block"
          fill
          sizes="100vw"
          priority
        />
        <Image
          src={weddingsHero.mobile}
          alt=""
          className="block w-full object-cover md:hidden"
          fill
          sizes="100vw"
          priority
        />
      </div>
      <div className="absolute bottom-10 left-4 flex max-w-[620px] flex-col items-start text-white md:bottom-1/4 md:left-20 md:top-1/3 md:bottom-auto lg:top-1/3">
        <h1 className="mb-4 font-display text-4xl leading-tight text-white drop-shadow-sm lg:text-7xl">
          {t("hero.title")}
        </h1>
        <p className="mb-6 text-left text-base text-white drop-shadow-md lg:text-lg">
          <span className="hidden lg:inline">
            {t("hero.lineDesktop")}
            {t("hero.bodyDesktop")}
          </span>
          <span className="lg:hidden">
            {t("hero.lineMobile1")}
            <br />
            {t("hero.lineMobile2")} <br className="lg:hidden" />
            {t("hero.lineMobile3")}
          </span>
        </p>
        <button
          type="button"
          className="border border-white bg-white px-8 py-4 font-mono text-sm uppercase text-ink-900 transition-colors duration-300 hover:bg-transparent hover:text-white lg:text-base"
        >
          {t("hero.cta")}
        </button>
      </div>
    </section>
  );
};
