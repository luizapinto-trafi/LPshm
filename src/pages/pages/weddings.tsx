import Head from "next/head";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import type { GetStaticProps, NextPage } from "next";
import { WeddingsPagePath } from "@/landings/weddings/weddingsCdn";
import { WeddingsHeader } from "@/landings/weddings/WeddingsHeader";
import { WeddingsHero } from "@/landings/weddings/WeddingsHero";
import { WeddingsProducts } from "@/landings/weddings/WeddingsProducts";
import { WeddingsFeatures } from "@/landings/weddings/WeddingsFeatures";
import { WeddingsComparison } from "@/landings/weddings/WeddingsComparison";
import { WeddingsReviewHero } from "@/landings/weddings/WeddingsReviewHero";
import { WeddingsFooter } from "@/landings/weddings/WeddingsFooter";

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

const WeddingsLandingPage: NextPage = () => {
  const { t } = useTranslation("weddings");
  const site = "https://www.shapermint.com";
  return (
    <>
      <Head>
        <title>{t("metaTitle")}</title>
        <meta name="description" content={t("metaDescription")} />
        <link rel="canonical" href={`${site}${WeddingsPagePath}`} />
      </Head>
      <WeddingsHeader />
      <StyledSkip href="#main-content">{t("a11y.skipToContent")}</StyledSkip>
      <main
        id="main-content"
        tabIndex={-1}
        className="min-w-0 bg-white text-ink-900"
        style={{ outline: "none" }}
        role="main"
        aria-label={t("a11y.main")}
      >
        <WeddingsHero />
        <WeddingsProducts />
        <WeddingsFeatures />
        <WeddingsComparison />
        <WeddingsReviewHero />
      </main>
      <WeddingsFooter />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["weddings"])),
  },
});

export default WeddingsLandingPage;
