import Head from "next/head";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import type { GetStaticProps, NextPage } from "next";
import { StraplessAnnouncementBar } from "@/landings/strapless-b1g1-gift-lp/StraplessAnnouncementBar";
import { StraplessSiteHeader } from "@/landings/strapless-b1g1-gift-lp/StraplessSiteHeader";
import { StraplessHeroSection } from "@/landings/strapless-b1g1-gift-lp/StraplessHeroSection";
import { StraplessFeaturesSection } from "@/landings/strapless-b1g1-gift-lp/StraplessFeaturesSection";
import { StraplessCompareSection } from "@/landings/strapless-b1g1-gift-lp/StraplessCompareSection";
import { StraplessBestSellerSection } from "@/landings/strapless-b1g1-gift-lp/StraplessBestSellerSection";
import { StraplessColorsSection } from "@/landings/strapless-b1g1-gift-lp/StraplessColorsSection";
import { StraplessB1g1PdpSection } from "@/landings/strapless-b1g1-gift-lp/StraplessB1g1PdpSection";
import { StraplessReviewsSection } from "@/landings/strapless-b1g1-gift-lp/StraplessReviewsSection";
import { StraplessFaqSection } from "@/landings/strapless-b1g1-gift-lp/StraplessFaqSection";
import { StraplessPressSection } from "@/landings/strapless-b1g1-gift-lp/StraplessPressSection";
import { StraplessBrandCardSection } from "@/landings/strapless-b1g1-gift-lp/StraplessBrandCardSection";
import { StraplessSiteFooter } from "@/landings/strapless-b1g1-gift-lp/StraplessSiteFooter";
import { StraplessB1g1GiftLpPagePath } from "@/landings/strapless-b1g1-gift-lp/straplessB1g1Cdn";

const StyledSkip = styled.a`
  position: absolute;
  left: -10000px;
  top: 0;
  z-index: 200;
  padding: var(--space-200) var(--space-400);
  background: var(--coral-300);
  color: var(--ink-900);
  font-size: 14px;
  font-weight: 600;
  border-radius: var(--radius-md);
  &:focus {
    left: var(--space-400);
    top: var(--space-200);
  }
`;

const StyledStickyTop = styled.div`
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--white);
`;

const StraplessB1g1GiftLpPage: NextPage = () => {
  const { t } = useTranslation("straplessB1g1GiftLp");
  return (
    <>
      <Head>
        <title>{t("metaTitle")}</title>
        <meta name="description" content={t("metaDescription")} />
        <link rel="canonical" href={`https://shapermint.com${StraplessB1g1GiftLpPagePath}`} />
      </Head>
      <StyledStickyTop>
        <StraplessAnnouncementBar />
        <StraplessSiteHeader />
      </StyledStickyTop>
      <StyledSkip href="#main-content">{t("a11y.skipToMain")}</StyledSkip>
      <main id="main-content" tabIndex={-1} style={{ outline: "none" }}>
        <StraplessHeroSection />
        <StraplessFeaturesSection />
        <StraplessCompareSection />
        <StraplessBestSellerSection />
        <StraplessColorsSection />
        <StraplessB1g1PdpSection />
        <StraplessReviewsSection />
        <StraplessFaqSection />
        <StraplessPressSection />
        <StraplessBrandCardSection />
      </main>
      <StraplessSiteFooter />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["straplessB1g1GiftLp"])),
  },
});

export default StraplessB1g1GiftLpPage;
