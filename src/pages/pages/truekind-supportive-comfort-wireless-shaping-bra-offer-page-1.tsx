import Head from "next/head";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import type { GetStaticProps, NextPage } from "next";
import { TruekindBraPromoBar } from "@/landings/truekind-bra-offer/TruekindBraPromoBar";
import { TruekindBraSiteHeader } from "@/landings/truekind-bra-offer/TruekindBraSiteHeader";
import { TruekindBraHeroSection } from "@/landings/truekind-bra-offer/TruekindBraHeroSection";
import { TruekindBraEngineeredSection } from "@/landings/truekind-bra-offer/TruekindBraEngineeredSection";
import { TruekindBraDesignPillsSection } from "@/landings/truekind-bra-offer/TruekindBraDesignPillsSection";
import { TruekindBraCompareStack } from "@/landings/truekind-bra-offer/TruekindBraCompareStack";
import { TruekindBraVideoSection } from "@/landings/truekind-bra-offer/TruekindBraVideoSection";
import { TruekindBraColorPicksSection } from "@/landings/truekind-bra-offer/TruekindBraColorPicksSection";
import { TruekindBraProductPdpSection } from "@/landings/truekind-bra-offer/TruekindBraProductPdpSection";
import { TruekindBraPolicySection } from "@/landings/truekind-bra-offer/TruekindBraPolicySection";
import { TruekindBraDetailsSection } from "@/landings/truekind-bra-offer/TruekindBraDetailsSection";
import { TruekindBraFaqSection } from "@/landings/truekind-bra-offer/TruekindBraFaqSection";
import { TruekindBraSiteFooter } from "@/landings/truekind-bra-offer/TruekindBraSiteFooter";
import { TruekindBraPagePath } from "@/landings/truekind-bra-offer/truekindBraCdn";

const StyledSkip = styled.a`
  position: absolute;
  left: -10000px;
  top: 0;
  z-index: 200;
  padding: var(--space-200) var(--space-400);
  background: var(--coral-500);
  color: var(--white);
  font-size: 14px;
  font-weight: 600;
  border-radius: var(--radius-md);
  &:focus {
    left: var(--space-400);
    top: var(--space-200);
  }
`;

const TruekindBraOfferPage1: NextPage = () => {
  const { t } = useTranslation("truekindBra");
  return (
    <>
      <Head>
        <title>{t("metaTitle")} — Shapermint</title>
        <meta
          name="description"
          content="Truekind® Supportive Comfort Wireless Shaping Bra. Wire-free contour technology with lift, smoothing, and all-day comfort. Shop the Wireless Contour Bra on Shapermint."
        />
        <link rel="canonical" href={`https://shapermint.com${TruekindBraPagePath}`} />
      </Head>
      <TruekindBraPromoBar />
      <TruekindBraSiteHeader />
      <StyledSkip href="#main-content">{t("a11y.skipToMain")}</StyledSkip>
      <main id="main-content" tabIndex={-1} style={{ outline: "none" }}>
        <TruekindBraHeroSection />
        <TruekindBraEngineeredSection />
        <TruekindBraDesignPillsSection backgroundToken="rose" />
        <TruekindBraCompareStack />
        <TruekindBraDesignPillsSection showBullets={false} showCta={false} backgroundToken="white" />
        <TruekindBraCompareStack />
        <TruekindBraVideoSection />
        <TruekindBraColorPicksSection />
        <TruekindBraProductPdpSection />
        <TruekindBraPolicySection />
        <TruekindBraDetailsSection />
        <TruekindBraFaqSection />
      </main>
      <TruekindBraSiteFooter />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["truekindBra"])),
  },
});

export default TruekindBraOfferPage1;
