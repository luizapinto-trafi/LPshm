/**
 * Collab gummies / partner landing — estructura inspirada en duplicated-landing (2).html,
 * implementada con Shapermint DS (tokens en globals + colors_and_type) y activos @shapermint.
 */
import Head from "next/head";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import type { GetStaticProps, NextPage } from "next";
import { GummiesDuplicatePagePath } from "@/landings/gummies-duplicate-landing/gummiesDuplicateCdn";
import { GummiesDuplicateHeader } from "@/landings/gummies-duplicate-landing/GummiesDuplicateHeader";
import { GummiesDuplicateHero } from "@/landings/gummies-duplicate-landing/GummiesDuplicateHero";
import { GummiesDuplicateFeatures } from "@/landings/gummies-duplicate-landing/GummiesDuplicateFeatures";
import { GummiesDuplicateFloatingCta } from "@/landings/gummies-duplicate-landing/GummiesDuplicateFloatingCta";
import { GummiesDuplicateLifestyle } from "@/landings/gummies-duplicate-landing/GummiesDuplicateLifestyle";
import { GummiesDuplicateBuybox } from "@/landings/gummies-duplicate-landing/GummiesDuplicateBuybox";
import { GummiesDuplicateFooter } from "@/landings/gummies-duplicate-landing/GummiesDuplicateFooter";

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

const GummiesDuplicateLandingPage: NextPage = () => {
  const { t } = useTranslation("gummiesDuplicate");
  const site = "https://www.shapermint.com";
  return (
    <>
      <Head>
        <title>{t("metaTitle")}</title>
        <meta name="description" content={t("metaDescription")} />
        <link rel="canonical" href={`${site}${GummiesDuplicatePagePath}`} />
      </Head>
      <GummiesDuplicateHeader />
      <GummiesDuplicateFloatingCta />
      <StyledSkip href="#main-content">{t("a11y.skipToContent")}</StyledSkip>
      <main id="main-content" tabIndex={-1} style={{ outline: "none" }} role="main" aria-label={t("a11y.main")}>
        <GummiesDuplicateHero />
        <GummiesDuplicateFeatures />
        <GummiesDuplicateLifestyle />
        <GummiesDuplicateBuybox />
      </main>
      <GummiesDuplicateFooter />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["gummiesDuplicate"])),
  },
});

export default GummiesDuplicateLandingPage;
