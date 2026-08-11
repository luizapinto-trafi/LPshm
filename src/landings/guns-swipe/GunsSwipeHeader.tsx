import Image from "next/image";
import { useTranslation } from "next-i18next/pages";
import { GunsSwipePromoBar } from "./GunsSwipePromoBar";

const LOGO =
  "https://cdn.shapermint.com/assets/shapermint/images/shapermint_logo_black.svg";

/**
 * Grüns-style chrome: promo bar + centered brand mark only (non-functional nav).
 * data-behavior="header"
 */
export function GunsSwipeHeader() {
  const { t } = useTranslation("gunsSwipe");

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-ink-200 bg-white"
      data-behavior="header"
    >
      <GunsSwipePromoBar />
      <div className="flex h-12 items-center justify-center px-4 min-[1024px]:h-14">
        <Image
          src={LOGO}
          alt={t("a11y.logoHome")}
          width={140}
          height={26}
          priority
          className="h-5 w-auto min-[1024px]:h-6"
        />
      </div>
    </header>
  );
}
