/**
 * Style Insiders advertorial — Denise Carter plus-size bra recommendation.
 * Structure mirrors thestyleinsiders.com/lp1-sarah-bra-expert.
 * Copy from "Plus Size Bra Advertorial" briefing.
 */
import Head from "next/head";
import styled from "styled-components";
import type { GetStaticProps, NextPage } from "next";
import { DeniseCanonicalUrl } from "@/landings/lp1-denise-plus-size-bra/deniseCdn";
import { DeniseStickyBars } from "@/landings/lp1-denise-plus-size-bra/DeniseStickyBar";
import { DeniseHeader } from "@/landings/lp1-denise-plus-size-bra/DeniseHeader";
import { DeniseArticle } from "@/landings/lp1-denise-plus-size-bra/DeniseArticle";
import { DeniseFooter } from "@/landings/lp1-denise-plus-size-bra/DeniseFooter";

const TITLE = "After 12 Years Fitting Plus Size Women, This Is The Bra I Recommend";
const DESCRIPTION =
  "A plus-size fit specialist explains why most bras fail fuller busts — and the wire-free contour bra she wishes every client had started with.";

const StyledPage = styled.div`
  background-color: #ffffff;
  color: #292929;
`;

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

const DenisePlusSizeBraPage: NextPage = () => (
  <StyledPage>
    <Head>
      <title>After 12 Years Fitting Plus Size Women, This Is The Bra I Recommend — Style Insiders</title>
      <meta name="description" content={DESCRIPTION} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={DeniseCanonicalUrl} />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={DeniseCanonicalUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={DESCRIPTION} />
    </Head>

    <StyledSkip href="#main-content">Skip to content</StyledSkip>
    <DeniseStickyBars>
      <DeniseHeader />
      <main id="main-content" tabIndex={-1} style={{ outline: "none" }} role="main">
        <DeniseArticle />
      </main>
      <DeniseFooter />
    </DeniseStickyBars>
  </StyledPage>
);

export const getStaticProps: GetStaticProps = () => ({ props: {} });

export default DenisePlusSizeBraPage;
