import Image from "next/image";
import { useTranslation } from "next-i18next/pages";
import { GrunsOlipopCdn, GrunsOlipopGallery } from "./grunsOlipopCdn";

export const GrunsOlipopOffers = () => {
  const { t } = useTranslation("grunsOlipop");
  const bullets = t("offers.bullets", { returnObjects: true }) as string[];
  const subBullets = t("offers.subscribeBullets", { returnObjects: true }) as string[];
  const otpBullets = t("offers.otpBullets", { returnObjects: true }) as string[];
  const heroThumb = GrunsOlipopGallery[0]!;

  return (
    <section
      id="offers"
      className="scroll-m-16 bg-gruns-cream px-4 py-10 sm:px-6 md:scroll-m-20 md:px-6 md:py-16"
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 flex items-center gap-2 text-sm text-gruns-dark">
          <span className="text-gruns-gold" aria-hidden>
            ★★★★★
          </span>
          <span>{t("offers.trustLine")}</span>
        </div>
        <h2 className="mb-2 font-display text-2xl font-bold text-gruns-dark sm:text-3xl">
          {t("offers.productTitle")}
        </h2>
        <p className="mb-6 text-base text-gruns-gray sm:mb-8">{t("offers.productLead")}</p>
        <ul className="mb-8 space-y-2.5 pl-0 sm:mb-10">
          {bullets.map((b) => (
            <li
              className="flex list-none items-start gap-2 text-[15px] text-ink-900"
              key={b}
            >
              <span className="shrink-0 text-gruns-primary" aria-hidden>
                ✓
              </span>
              {b}
            </li>
          ))}
        </ul>
        <p className="mb-3 font-display font-bold text-ink-900">{t("offers.flavorLabel")}</p>
        <div className="mb-8 flex flex-col flex-wrap gap-4 sm:mb-10 sm:flex-row">
          <button
            className="flex max-w-xs flex-1 items-start gap-2 rounded-2xl border-2 border-gruns-primary bg-white p-4 text-left"
            type="button"
            disabled
          >
            <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-md">
              <Image
                src={heroThumb}
                alt=""
                fill
                className="object-cover"
                sizes="72px"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-gruns-dark">{t("offers.flavorNew")}</p>
              <p className="mt-0.5 text-xs text-gruns-gray">{t("offers.flavorHint")}</p>
            </div>
          </button>
          <button
            className="flex max-w-xs flex-1 items-start gap-2 rounded-2xl border-2 border-ink-200 bg-white p-4 text-left opacity-80"
            type="button"
            disabled
          >
            <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-md">
              <Image
                src={GrunsOlipopGallery[2]!}
                alt=""
                fill
                className="object-cover"
                sizes="72px"
              />
            </div>
            <p className="pt-0.5 text-sm font-bold text-gruns-dark">{t("offers.flavorOriginal")}</p>
          </button>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          <div className="relative rounded-2xl border-2 border-gruns-primary bg-white p-5 sm:p-6">
            <p className="m-0 font-bold leading-snug text-ink-900 sm:text-sm">{t("offers.subscribeTitle")}</p>
            <p className="mt-1.5 text-sm text-gruns-gray">{t("offers.subscribeSub")}</p>
            <div className="mt-3 flex flex-wrap items-baseline gap-2">
              <span className="font-display text-2xl font-extrabold text-gruns-primary sm:text-3xl">
                {t("offers.subscribePriceNow")}
              </span>
              <span className="text-sm line-through text-ink-500">{t("offers.subscribePriceWas")}</span>
            </div>
            <p className="text-sm text-gruns-gray">{t("offers.subscribePerDay")}</p>
            <ul className="ml-0 mt-3 list-outside pl-4 text-sm text-gruns-dark sm:text-[13px] sm:leading-relaxed">
              {subBullets.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <a
              className="mt-4 flex w-full min-h-12 items-center justify-center rounded-xl bg-coral-500 font-display text-sm font-semibold text-white no-underline transition hover:bg-coral-400"
              href="https://shapermint.com"
            >
              {t("offers.cta")}
            </a>
          </div>
          <div className="rounded-2xl border-2 border-ink-200 bg-ink-50 p-5 sm:p-6">
            <p className="font-bold text-ink-900">{t("offers.otpTitle")}</p>
            <p className="mt-1.5 text-sm text-gruns-gray">{t("offers.otpSub")}</p>
            <p className="mt-3 font-display text-2xl font-extrabold text-gruns-primary">{t("offers.otpPrice")}</p>
            <p className="text-sm text-gruns-gray">{t("offers.otpPerDay")}</p>
            <ul className="ml-0 mt-3 list-outside pl-4 text-sm text-gruns-dark sm:text-[13px] sm:leading-relaxed">
              {otpBullets.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <a
              className="mt-4 flex w-full min-h-12 items-center justify-center rounded-xl bg-coral-500 font-display text-sm font-semibold text-white no-underline transition hover:bg-coral-400"
              href="https://shapermint.com"
            >
              {t("offers.cta")}
            </a>
          </div>
        </div>
        <div className="mt-8 flex justify-center sm:mt-10">
          <Image src={GrunsOlipopCdn.seal} alt="" width={120} height={120} />
        </div>
      </div>
    </section>
  );
};
