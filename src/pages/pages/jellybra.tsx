import Head from "next/head";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import type { GetStaticProps, NextPage } from "next";
import { JellybraAnnouncementBar } from "@/landings/jellybra/JellybraAnnouncementBar";
import { JellybraSiteHeader } from "@/landings/jellybra/JellybraSiteHeader";
import { JellybraHeroSection } from "@/landings/jellybra/JellybraHeroSection";
import { JellybraPressSection } from "@/landings/jellybra/JellybraPressSection";
import { JellybraLoveSection } from "@/landings/jellybra/JellybraLoveSection";
import { JellybraReasonsSection } from "@/landings/jellybra/JellybraReasonsSection";
import { JellybraPromiseSection } from "@/landings/jellybra/JellybraPromiseSection";
import { JellybraOfferSection } from "@/landings/jellybra/JellybraOfferSection";
import { JellybraReviewsSection } from "@/landings/jellybra/JellybraReviewsSection";
import { JellybraSiteFooter } from "@/landings/jellybra/JellybraSiteFooter";
import { JellybraStickyBar } from "@/landings/jellybra/JellybraStickyBar";
import { JellybraPagePath } from "@/landings/jellybra/jellybraCdn";

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
  padding-bottom: var(--space-1000);
  @media (max-width: 899px) {
    padding-bottom: calc(var(--space-1000) + 56px);
  }
`;

const JellybraPage: NextPage = () => {
  const { t } = useTranslation("jellybra");

  return (
    <>
      <Head>
        <title>{t("metaTitle")}</title>
        <meta name="description" content={t("metaDescription")} />
        <link rel="canonical" href={`https://shapermint.com${JellybraPagePath}`} />
      </Head>
      <StyledStickyTop>
        <JellybraAnnouncementBar />
        <JellybraSiteHeader />
      </StyledStickyTop>
      <StyledSkip href="#main-content">{t("a11y.skipToMain")}</StyledSkip>
      <StyledMain id="main-content" tabIndex={-1} style={{ outline: "none" }}>
        <JellybraHeroSection />
        <JellybraPressSection />
        <JellybraLoveSection />
        <JellybraReasonsSection />
        <JellybraPromiseSection />
        <JellybraOfferSection />
        <JellybraReviewsSection />
      </StyledMain>
      <JellybraSiteFooter />
      <JellybraStickyBar />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["jellybra"])),
  },
});

export default JellybraPage;
