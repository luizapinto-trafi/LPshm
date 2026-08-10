/**
 * Structural swipe of https://gruns.co/pages/gwp-gut-health
 * Shapermint DS tokens + PDP offer standard + GWP + side cart.
 * Interaction rules: ./BEHAVIOR.md
 */
import Head from "next/head";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import type { GetStaticProps, NextPage } from "next";
import { GunsSwipePagePath } from "@/landings/guns-swipe/gunsSwipeCdn";
import { GunsSwipeCartProvider } from "@/landings/guns-swipe/useGunsSwipeCart";
import { GunsSwipeHeader } from "@/landings/guns-swipe/GunsSwipeHeader";
import { GunsSwipeHero } from "@/landings/guns-swipe/GunsSwipeHero";
import { GunsSwipeScrollCta } from "@/landings/guns-swipe/GunsSwipeScrollCta";
import { GunsSwipeReasons } from "@/landings/guns-swipe/GunsSwipeReasons";
import { GunsSwipeReviews } from "@/landings/guns-swipe/GunsSwipeReviews";
import { GunsSwipeOffers } from "@/landings/guns-swipe/GunsSwipeOffers";
import { GunsSwipeSideCart } from "@/landings/guns-swipe/GunsSwipeSideCart";
import { GunsSwipeTrust } from "@/landings/guns-swipe/GunsSwipeTrust";
import { GunsSwipeFaq } from "@/landings/guns-swipe/GunsSwipeFaq";
import { GunsSwipeFooter } from "@/landings/guns-swipe/GunsSwipeFooter";

const GunsSwipePage: NextPage = () => {
  const { t } = useTranslation("gunsSwipe");
  const site = "https://www.shapermint.com";

  return (
    <GunsSwipeCartProvider>
      <div className="font-body text-ink-900">
        <Head>
          <title>{t("metaTitle")}</title>
          <meta name="description" content={t("metaDescription")} />
          <link rel="canonical" href={`${site}${GunsSwipePagePath}`} />
        </Head>
        <GunsSwipeHeader />
        <a
          href="#main-content"
          className="absolute left-[-10000px] top-0 z-[200] rounded-md bg-coral-500 px-4 py-2 text-sm font-semibold text-white focus:left-4 focus:top-2"
        >
          {t("a11y.skipToContent")}
        </a>
        <GunsSwipeScrollCta />
        <main id="main-content" tabIndex={-1} className="outline-none" role="main">
          <GunsSwipeHero />
          <GunsSwipeReasons />
          <GunsSwipeOffers />
          <GunsSwipeReviews />
          <GunsSwipeTrust />
          <GunsSwipeFaq />
        </main>
        <GunsSwipeFooter />
        <GunsSwipeSideCart />
      </div>
    </GunsSwipeCartProvider>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["gunsSwipe"])),
  },
});

export default GunsSwipePage;
