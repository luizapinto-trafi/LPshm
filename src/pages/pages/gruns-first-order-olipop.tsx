/**
 * Réplica estructural de https://gruns.co/pages/first-order-olipop
 * Referencia de secciones validada con browser-mcp (browser_navigate + browser_snapshot).
 * Assets y tokens: Shapermint DS + cdn.shapermint.com + @shapermint/assets.
 */
import Head from "next/head";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import type { GetStaticProps, NextPage } from "next";
import { GrunsOlipopPagePath } from "@/landings/gruns-first-order-olipop/grunsOlipopCdn";
import { GrunsOlipopHeader } from "@/landings/gruns-first-order-olipop/GrunsOlipopHeader";
import { GrunsOlipopIntro } from "@/landings/gruns-first-order-olipop/GrunsOlipopIntro";
import { GrunsOlipopMid } from "@/landings/gruns-first-order-olipop/GrunsOlipopMid";
import { GrunsOlipopOffers } from "@/landings/gruns-first-order-olipop/GrunsOlipopOffers";
import { GrunsOlipopTrust } from "@/landings/gruns-first-order-olipop/GrunsOlipopTrust";
import { GrunsOlipopFaq } from "@/landings/gruns-first-order-olipop/GrunsOlipopFaq";
import { GrunsOlipopFooter } from "@/landings/gruns-first-order-olipop/GrunsOlipopFooter";
import { GrunsOlipopFloatCta } from "@/landings/gruns-first-order-olipop/GrunsOlipopFloatCta";

const GrunsFirstOrderOlipopPage: NextPage = () => {
  const { t } = useTranslation("grunsOlipop");
  const site = "https://www.shapermint.com";
  return (
    <div className="font-body text-ink-900">
      <Head>
        <title>{t("metaTitle")}</title>
        <meta name="description" content={t("metaDescription")} />
        <link rel="canonical" href={`${site}${GrunsOlipopPagePath}`} />
      </Head>
      <GrunsOlipopHeader />
      <a
        href="#main-content"
        className="absolute left-[-10000px] top-0 z-[200] rounded-md bg-gruns-primary px-4 py-2 text-sm font-semibold text-white focus:left-4 focus:top-2"
      >
        {t("a11y.skipToContent")}
      </a>
      <GrunsOlipopFloatCta />
      <main id="main-content" tabIndex={-1} className="outline-none" role="main">
        <GrunsOlipopIntro />
        <GrunsOlipopMid />
        <GrunsOlipopOffers />
        <GrunsOlipopTrust />
        <GrunsOlipopFaq />
      </main>
      <GrunsOlipopFooter />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["grunsOlipop"])),
  },
});

export default GrunsFirstOrderOlipopPage;
