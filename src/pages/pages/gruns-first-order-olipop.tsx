/**
 * Réplica estructural de https://gruns.co/pages/first-order-olipop
 * Referencia de secciones validada con browser-mcp (browser_navigate + browser_snapshot).
 * Assets y tokens: Shapermint DS + cdn.shapermint.com + @shapermint/assets.
 */
import Head from "next/head";
import styled from "styled-components";
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

const StyledSkip = styled.a`
  position: absolute;
  left: -10000px;
  top: 0;
  z-index: 200;
  padding: var(--space-200) var(--space-400);
  background: var(--gruns-primary);
  color: var(--white);
  font-size: 14px;
  font-weight: 600;
  border-radius: var(--radius-md);
  &:focus {
    left: var(--space-400);
    top: var(--space-200);
  }
`;

const GrunsFirstOrderOlipopPage: NextPage = () => {
  const { t } = useTranslation("grunsOlipop");
  const site = "https://www.shapermint.com";
  return (
    <>
      <Head>
        <title>{t("metaTitle")}</title>
        <meta name="description" content={t("metaDescription")} />
        <link rel="canonical" href={`${site}${GrunsOlipopPagePath}`} />
      </Head>
      <GrunsOlipopHeader />
      <StyledSkip href="#main-content">{t("a11y.skipToContent")}</StyledSkip>
      <main id="main-content" tabIndex={-1} style={{ outline: "none" }}>
        <GrunsOlipopIntro />
        <GrunsOlipopMid />
        <GrunsOlipopOffers />
        <GrunsOlipopTrust />
        <GrunsOlipopFaq />
      </main>
      <GrunsOlipopFooter />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["grunsOlipop"])),
  },
});

export default GrunsFirstOrderOlipopPage;
