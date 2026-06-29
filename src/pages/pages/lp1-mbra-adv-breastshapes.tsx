/**
 * Réplica de la advertorial "Style Insiders" (try.shapermint.com/lp1-mbra-adv-breastshapes),
 * publicada originalmente en Figma Sites. Estructura, tipografía y colores replicados;
 * textos e imágenes son placeholders editables (mbraAdv.json + mbraAdvCdn.ts).
 */
import Head from "next/head";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import type { GetStaticProps, NextPage } from "next";
import { MbraAdvPagePath } from "@/landings/mbra-adv-breastshapes/mbraAdvCdn";
import { MbraAdvHeader } from "@/landings/mbra-adv-breastshapes/MbraAdvHeader";
import { MbraAdvArticle } from "@/landings/mbra-adv-breastshapes/MbraAdvArticle";
import { MbraAdvFooter } from "@/landings/mbra-adv-breastshapes/MbraAdvFooter";
import { MbraAdvStickyCta } from "@/landings/mbra-adv-breastshapes/MbraAdvStickyCta";

const StyledSkip = styled.a`
  position: absolute;
  left: -10000px;
  top: 0;
  z-index: 200;
  padding: 12px 20px;
  background: #c64844;
  color: #ffffff;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;

  &:focus {
    left: 16px;
    top: 8px;
  }
`;

const MbraAdvBreastShapesPage: NextPage = () => {
  const { t } = useTranslation("mbraAdv");
  const site = "https://try.shapermint.com";
  return (
    <>
      <Head>
        <title>{t("metaTitle")}</title>
        <meta name="description" content={t("metaDescription")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${site}${MbraAdvPagePath}`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <StyledSkip href="#main-content">{t("a11y.skipToContent")}</StyledSkip>
      <MbraAdvHeader />
      <main id="main-content" tabIndex={-1} style={{ outline: "none" }} role="main" aria-label={t("a11y.main")}>
        <MbraAdvArticle />
      </main>
      <MbraAdvFooter />
      <MbraAdvStickyCta />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["mbraAdv"])),
  },
});

export default MbraAdvBreastShapesPage;
