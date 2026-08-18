import Head from "next/head";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import type { GetStaticProps, NextPage } from "next";
import { SweetheartAnnouncementBar } from "@/landings/shapermint-essentials-sweetheart-cami/SweetheartAnnouncementBar";
import { SweetheartSiteHeader, SweetheartBreadcrumb } from "@/landings/shapermint-essentials-sweetheart-cami/SweetheartSiteHeader";
import { SweetheartOfferSection } from "@/landings/shapermint-essentials-sweetheart-cami/SweetheartOfferSection";
import { SweetheartBenefitsSection } from "@/landings/shapermint-essentials-sweetheart-cami/SweetheartBenefitsSection";
import { SweetheartCompareSection } from "@/landings/shapermint-essentials-sweetheart-cami/SweetheartCompareSection";
import { SweetheartReviewsSection } from "@/landings/shapermint-essentials-sweetheart-cami/SweetheartReviewsSection";
import { SweetheartFaqSection } from "@/landings/shapermint-essentials-sweetheart-cami/SweetheartFaqSection";
import { SweetheartSiteFooter } from "@/landings/shapermint-essentials-sweetheart-cami/SweetheartSiteFooter";
import { SweetheartStickyBar } from "@/landings/shapermint-essentials-sweetheart-cami/SweetheartStickyBar";
import { SweetheartPagePath } from "@/landings/shapermint-essentials-sweetheart-cami/sweetheartCamiCdn";

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

const StyledMain = styled.main`
  padding-bottom: 0;
`;

const SweetheartCamiPage: NextPage = () => {
  const { t } = useTranslation("sweetheartCami");

  return (
    <>
      <Head>
        <title>{t("metaTitle")}</title>
        <meta name="description" content={t("metaDescription")} />
        <link rel="canonical" href={`https://shapermint.com${SweetheartPagePath}`} />
      </Head>
      <StyledStickyTop>
        <SweetheartAnnouncementBar />
        <SweetheartSiteHeader />
      </StyledStickyTop>
      <SweetheartBreadcrumb />
      <StyledSkip href="#main-content">{t("a11y.skipToMain")}</StyledSkip>
      <StyledMain id="main-content" tabIndex={-1} style={{ outline: "none" }}>
        <SweetheartOfferSection />
        <SweetheartBenefitsSection />
        <SweetheartCompareSection />
        <SweetheartReviewsSection />
        <SweetheartFaqSection />
      </StyledMain>
      <SweetheartSiteFooter />
      <SweetheartStickyBar />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["sweetheartCami"])),
  },
});

export default SweetheartCamiPage;
