import Image from "next/image";
import { useTranslation } from "next-i18next/pages";
import { GrunsOlipopCdn } from "./grunsOlipopCdn";

export const GrunsOlipopHeader = () => {
  const { t } = useTranslation("grunsOlipop");
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-gruns-peach text-center font-body text-[13px] font-semibold leading-snug text-gruns-dark">
        <div>
          <strong>{t("announcement.line1")}</strong>
        </div>
        <div>{t("announcement.line2")}</div>
      </div>
      <div className="bg-gruns-primary px-4 text-white sm:px-6 lg:px-24">
        <div className="mx-auto flex h-16 min-h-[4rem] max-w-[1400px] items-center justify-between gap-4">
          <nav
            className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-6"
            aria-label="Primary"
          >
            <a
              className="rounded-full border border-white/35 bg-transparent px-4 py-2 font-body text-sm font-medium text-white no-underline hover:bg-white/10"
              href="#offers"
            >
              {t("header.shopAdults")}
            </a>
            <a
              className="rounded-full border border-white/35 bg-transparent px-4 py-2 font-body text-sm font-medium text-white no-underline hover:bg-white/10"
              href="#offers"
            >
              {t("header.shopKids")}
            </a>
          </nav>
          <a
            className="flex items-center leading-none brightness-0 invert filter hover:opacity-90"
            href="https://shapermint.com"
            aria-label={t("a11y.logoHome")}
          >
            <Image
              src={GrunsOlipopCdn.logoHeader}
              alt=""
              width={132}
              height={22}
              priority
            />
          </a>
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="font-body text-[13px] opacity-85 sm:inline">{t("a11y.account")}</span>
            <Image src={GrunsOlipopCdn.bagIcon} alt="" width={22} height={22} />
          </div>
        </div>
      </div>
    </header>
  );
};
