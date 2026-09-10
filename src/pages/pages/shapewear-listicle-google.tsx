/**
 * Shapewear Listicle Google — ACQ Shapermint listicle.
 * Hero uses cover photo as background; body is a 5-item product listicle.
 */
import Head from "next/head";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import type { GetStaticProps, NextPage } from "next";
import { ShapewearListiclePagePath } from "@/landings/shapewear-listicle-google/shapewearListicleCdn";
import { ShapewearListiclePromoBar } from "@/landings/shapewear-listicle-google/ShapewearListiclePromoBar";
import { ShapewearListicleHeader } from "@/landings/shapewear-listicle-google/ShapewearListicleHeader";
import { ShapewearListicleCover } from "@/landings/shapewear-listicle-google/ShapewearListicleCover";
import { ShapewearListicleArticle } from "@/landings/shapewear-listicle-google/ShapewearListicleArticle";
import { ShapewearListicleFooter } from "@/landings/shapewear-listicle-google/ShapewearListicleFooter";
import { ShapewearListicleStickyBar } from "@/landings/shapewear-listicle-google/ShapewearListicleStickyBar";

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

const ShapewearListicleGooglePage: NextPage = () => {
  const { t } = useTranslation("shapewearListicleGoogle");
  return (
    <>
      <Head>
        <title>{`${t("metaTitle")} — Shapermint`}</title>
        <meta name="description" content={t("metaDescription")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`https://shapermint.com${ShapewearListiclePagePath}`} />
      </Head>
      <StyledSkip href="#main-content">{t("a11y.skipToContent")}</StyledSkip>
      <ShapewearListiclePromoBar />
      <ShapewearListicleHeader />
      <main id="main-content" tabIndex={-1} style={{ outline: "none" }} aria-label={t("a11y.main")}>
        <ShapewearListicleCover />
        <ShapewearListicleArticle />
      </main>
      <ShapewearListicleFooter />
      <ShapewearListicleStickyBar />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["shapewearListicleGoogle"])),
  },
});

export default ShapewearListicleGooglePage;
