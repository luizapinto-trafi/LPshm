import Head from "next/head";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import type { GetStaticProps, NextPage } from "next";
import { StraplessAnnouncementBar } from "@/landings/strapless-landing/StraplessAnnouncementBar";
import { StraplessSiteHeader } from "@/landings/strapless-landing/StraplessSiteHeader";
import { StraplessHeroSection } from "@/landings/strapless-landing/StraplessHeroSection";
import { StraplessFeaturesSection } from "@/landings/strapless-landing/StraplessFeaturesSection";
import { StraplessCompareSection } from "@/landings/strapless-landing/StraplessCompareSection";
import { StraplessBestSellerSection } from "@/landings/strapless-landing/StraplessBestSellerSection";
import { StraplessColorsSection } from "@/landings/strapless-landing/StraplessColorsSection";
import { StraplessPdpSection } from "@/landings/strapless-landing/StraplessPdpSection";
import { StraplessReviewsSection } from "@/landings/strapless-landing/StraplessReviewsSection";
import { StraplessFaqSection } from "@/landings/strapless-landing/StraplessFaqSection";
import { StraplessPressSection } from "@/landings/strapless-landing/StraplessPressSection";
import { StraplessBrandCardSection } from "@/landings/strapless-landing/StraplessBrandCardSection";
import { StraplessSiteFooter } from "@/landings/strapless-landing/StraplessSiteFooter";
import { StraplessPagePath } from "@/landings/strapless-landing/straplessCdn";

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

/** Promo + header: una sola capa sticky en la parte superior al hacer scroll. */
const StyledStickyTop = styled.div`
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--white);
`;

const StraplessLandingPage: NextPage = () => {
  const { t } = useTranslation("strapless");
  return (
    <>
      <Head>
        <title>{t("metaTitle")}</title>
        <meta name="description" content={t("metaDescription")} />
        <link rel="canonical" href={`https://shapermint.com${StraplessPagePath}`} />
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
        <StraplessPdpSection />
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
    ...(await serverSideTranslations(locale ?? "en", ["strapless"])),
  },
});

export default StraplessLandingPage;
