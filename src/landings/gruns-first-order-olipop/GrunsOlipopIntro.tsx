import Image from "next/image";
import { useTranslation } from "next-i18next/pages";
import { GrunsOlipopCdn, GrunsOlipopGallery } from "./grunsOlipopCdn";

function CtaPillWithBadge({ className = "" }: { className?: string }) {
  const { t } = useTranslation("grunsOlipop");
  return (
    <div className={`flex w-full max-w-[440px] flex-col items-stretch ${className}`}>
      <div className="relative -mb-3 flex w-full flex-col">
        <span
          className="relative z-10 mx-auto inline-flex rounded-full border border-ink-1000 bg-gold-500 px-2.5 py-1 font-display text-[11px] font-bold uppercase tracking-wide text-ink-1000"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          {t("hero.sold")}
        </span>
        <a
          href="#offers"
          className="relative z-0 -mt-2 inline-flex w-full items-center justify-center rounded-full border-2 border-ink-1000 bg-coral-600 px-5 pb-4 pt-7 font-display text-base font-bold text-ink-1000 shadow-brutal no-underline transition hover:bg-coral-550 active:translate-x-0.5 active:translate-y-0.5 active:shadow-brutal-active sm:text-lg"
        >
          {t("hero.cta")}
        </a>
      </div>
    </div>
  );
}

export const GrunsOlipopIntro = () => {
  const { t } = useTranslation("grunsOlipop");
  const bullets = t("hero.bullets", { returnObjects: true }) as string[];
  return (
    <section className="bg-gradient-to-b from-white from-0% via-coral-100/90 via-40% to-cream-200 to-100% py-10 md:py-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col-reverse items-center gap-8 px-4 sm:px-6 md:flex-row md:items-stretch md:gap-10 md:px-8 lg:gap-14">
        {/* copy */}
        <div className="z-10 flex w-full min-w-0 max-w-lg flex-1 flex-col items-center gap-3 text-left md:max-w-[50%] md:items-start md:gap-5">
          <a
            className="flex w-full max-w-sm items-center gap-3 self-center no-underline hover:opacity-90 sm:max-w-md md:justify-start"
            href="#reviews"
          >
            <div className="relative h-9 w-16 shrink-0 overflow-hidden rounded border border-dashed border-ink-200 bg-ink-100 sm:h-10 sm:w-20">
              <Image
                src={GrunsOlipopCdn.seal}
                alt=""
                fill
                className="object-contain p-0.5"
                sizes="80px"
              />
            </div>
            <div className="min-w-0 text-gruns-dark">
              <div className="text-base leading-none text-gruns-gold" aria-hidden>
                ★★★★★
              </div>
              <p className="mt-0.5 font-body text-xs text-ink-700 sm:text-sm">{t("hero.ratingLine")}</p>
            </div>
          </a>

          <h1 className="text-center font-display text-3xl font-black leading-[1.08] tracking-tight text-ink-1000 sm:text-4xl md:max-w-none md:text-left md:text-5xl md:leading-tight">
            {t("hero.titleLine1")} <br className="hidden md:block" />
            <span className="text-coral-600">
              <strong className="font-extrabold">{t("hero.titleLine2")}</strong>
            </span>
          </h1>

          <div className="w-full self-center sm:max-w-sm md:hidden">
            <CtaPillWithBadge className="items-center" />
          </div>

          <ul className="mt-1 w-full list-none pl-0">
            {bullets.map((b) => (
              <li
                className="mb-0 flex min-h-8 items-center gap-2.5 pl-0 font-body text-sm font-medium text-ink-900 sm:text-base"
                key={b}
              >
                <span
                  className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gruns-primary text-[0.6rem] font-extrabold text-white"
                  aria-hidden
                >
                  ✓
                </span>
                {b}
              </li>
            ))}
          </ul>

          <p className="max-w-xl text-center text-[15px] font-bold text-ink-800 sm:text-base md:max-w-none md:text-left">
            {t("hero.collabLine")}
          </p>

          <div className="hidden w-full self-start md:mt-1 md:block">
            <CtaPillWithBadge />
          </div>

          <p className="w-full self-center text-center text-sm text-ink-1000 sm:text-[15px] md:self-start md:text-left">
            {t("hero.riskIntro")}
            <strong className="cursor-pointer font-bold underline decoration-1 underline-offset-2">
              {t("hero.riskHighlight")}
            </strong>
          </p>
        </div>

        {/* product */}
        <div className="flex w-full min-w-0 max-w-md flex-1 items-center justify-center self-center sm:max-w-md md:max-w-[50%] md:justify-end">
          <div className="relative w-full max-w-md">
            <div className="relative aspect-[6/5] w-full max-h-[32rem] overflow-hidden rounded-2xl border-2 border-ink-1000 bg-ink-100 shadow-brutal">
              <Image
                src={GrunsOlipopGallery[0]!}
                alt={t("hero.heroImageAlt")}
                width={600}
                height={500}
                className="h-full w-full object-contain p-0"
                priority
              />
            </div>
            <div className="absolute -left-2 -top-3 z-10 w-[32%] max-w-[7.5rem] -rotate-6 overflow-hidden rounded-full border-2 border-ink-1000 bg-white p-0 shadow-brutal-sm sm:-left-3 sm:-top-4">
              <Image
                src={GrunsOlipopGallery[2]!}
                alt={t("hero.heroStickerAlt")}
                width={120}
                height={120}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
