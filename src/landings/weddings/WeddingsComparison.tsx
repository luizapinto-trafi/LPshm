import Image from "next/image";
import { useTranslation } from "next-i18next/pages";
import { weddingsCompareBrand, weddingsCompareCompetitor } from "./weddingsCdn";
import { CheckIcon, XMarkIcon } from "./WeddingIcons";

const RowCheck = () => (
  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-coral-500 p-2 text-white lg:h-10 lg:w-10">
    <CheckIcon className="h-4 w-4" />
  </div>
);

const RowX = () => (
  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-ink-200 p-2 text-ink-500 lg:h-10 lg:w-10">
    <XMarkIcon className="h-4 w-4" />
  </div>
);

export const WeddingsComparison = () => {
  const { t } = useTranslation("weddings");
  const leftRows = t("compare.leftRows", { returnObjects: true }) as string[];

  return (
    <section className="mb-10 mt-16 flex w-full max-w-[1380px] flex-col flex-wrap justify-center px-4 lg:mb-10 lg:mt-32 lg:flex-row">
      <div className="flex w-full flex-1 flex-col lg:mr-24 lg:max-w-[425px]">
        <div className="pt-10 text-center font-display text-3xl text-ink-900 lg:pt-16 lg:text-left lg:text-5xl">
          {t("compare.leftTitle1")} <br />
          {t("compare.leftTitle2")}
          <button
            type="button"
            className="mt-8 hidden min-w-[225px] border border-ink-900 bg-ink-900 px-8 py-4 font-mono text-base uppercase text-white transition-colors duration-300 hover:bg-transparent hover:text-ink-900 lg:block"
          >
            {t("features.cta")}
          </button>
        </div>
        <div className="mt-4 hidden text-lg font-medium text-ink-900 lg:block">
          {leftRows.map((row) => (
            <div key={row} className="border-t border-ink-200 py-7 first:border-ink-200">
              {row}
            </div>
          ))}
        </div>
      </div>

      <div className="flex max-w-[427px] flex-1 flex-col rounded-t-xl bg-coral-50 px-4 lg:rounded-none lg:px-10">
        <div className="mt-8 flex flex-1 flex-col items-center pb-6 text-center">
          <Image
            src="https://cdn.shapermint.com/assets/shapermint/images/shapermint_logo_black.svg"
            alt={t("compare.brandLabel")}
            width={200}
            height={32}
            className="mb-4 h-8 w-auto object-contain"
          />
          <div className="relative aspect-[0.81/1] w-full overflow-hidden rounded">
            <Image
              src={weddingsCompareBrand}
              alt={t("compare.brandProductAlt")}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 400px, 50vw"
            />
          </div>
          <p className="mt-8 w-full text-left italic leading-relaxed text-ink-700">
            {t("compare.brandQuote")}
          </p>
          <span className="mt-6 w-full text-left font-bold uppercase text-coral-500">
            {t("compare.brandByline")}
          </span>
        </div>

        <div className="border-t border-ink-200 py-5 text-center lg:py-8">
          <span className="font-mono text-xs font-bold uppercase text-coral-500 lg:text-base">
            {t("compare.brandPillar")}
          </span>
        </div>

        <div className="relative flex items-center justify-between border-t border-ink-200 py-5 lg:justify-center lg:py-8">
          <span className="w-2/3 text-left text-sm font-medium text-ink-700 lg:hidden">
            {t("compare.mobileRowSupport")}
          </span>
          <RowCheck />
        </div>
        <div className="relative flex items-center justify-between border-t border-ink-200 py-5 lg:justify-center lg:py-8">
          <span className="w-2/3 text-left text-sm font-medium text-ink-700 lg:hidden">
            {t("compare.mobileRowComfort")}
          </span>
          <RowCheck />
        </div>
        <div className="relative flex items-center justify-between border-t border-ink-200 py-5 lg:justify-center lg:py-8">
          <span className="w-2/3 text-left text-sm font-medium text-ink-700 lg:hidden">
            {t("compare.mobileRowBath")}
          </span>
          <RowCheck />
        </div>
      </div>

      <div className="flex max-w-[427px] flex-1 flex-col px-4 lg:px-10">
        <div className="mt-8 flex flex-1 flex-col items-center pb-6 text-center">
          <span className="mb-4 flex h-8 items-center font-mono text-lg text-ink-500">
            {t("compare.competitorLabel")}
          </span>
          <div className="relative aspect-[0.81/1] w-full overflow-hidden rounded grayscale opacity-80">
            <Image
              src={weddingsCompareCompetitor}
              alt={t("compare.competitorProductAlt")}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 400px, 50vw"
            />
          </div>
          <p className="mt-8 w-full text-left italic leading-relaxed text-ink-500">
            {t("compare.competitorQuote")}
          </p>
          <span className="mt-6 w-full text-left font-bold uppercase text-ink-500">
            {t("compare.competitorByline")}
          </span>
        </div>

        <div className="border-t border-ink-200 py-5 text-center lg:py-8">
          <span className="font-mono text-xs font-bold uppercase text-ink-500 lg:text-base">
            {t("compare.competitorPillar")}
          </span>
        </div>

        <div className="flex items-center justify-end border-t border-ink-200 py-5 lg:justify-center lg:py-8">
          <RowX />
        </div>
        <div className="flex items-center justify-end border-t border-ink-200 py-5 lg:justify-center lg:py-8">
          <RowX />
        </div>
        <div className="flex items-center justify-end border-t border-ink-200 py-5 lg:justify-center lg:py-8">
          <RowX />
        </div>
      </div>

      <button
        type="button"
        className="mt-10 w-full max-w-[300px] self-center border border-ink-900 bg-ink-900 px-8 py-4 font-mono text-sm uppercase text-white transition-colors duration-300 hover:bg-transparent hover:text-ink-900 lg:hidden"
      >
        {t("features.cta")}
      </button>
    </section>
  );
};
