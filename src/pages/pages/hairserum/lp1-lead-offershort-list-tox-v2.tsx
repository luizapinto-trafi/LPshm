import Head from "next/head";
import type { GetStaticProps, NextPage } from "next";
import { SpaDrLp1V2WebflowEmbed } from "@/landings/the-spa-dr-hair-serum-lp1-v2/SpaDrLp1V2WebflowEmbed";

const TSD_FAVICON =
  "https://cdn.prod.website-files.com/6581a4ebeea456b4072fe120/65e9c5d0891fce2e5fa27009_Favicon_TSD.png";
const PUBLISHED_ORIGIN = "https://try.thespadr.com";

// The Webflow shared CSS bundle (v2 fingerprint 23bc7a576) and the Google
// Fonts CSS are registered for this route inside `pages/_document.tsx` —
// see PAGE_STYLESHEETS keyed by `/pages/hairserum/lp1-lead-offershort-list-tox-v2`.
// Loading them via next/head is unreliable in Next 16 (the link tags can be
// deferred behind Suspense boundaries, which makes Poppins fall back to the
// system sans-serif on first paint).
const SpaDrHairSerumLp1V2Page: NextPage = () => {
  return (
    <>
      <Head>
        <link href="https://cdn.prod.website-files.com" rel="preconnect" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        <link rel="icon" type="image/png" href={TSD_FAVICON} />
        <title>Hair Serum</title>
        <meta
          name="description"
          content="The Spa Dr. Hair Serum — peptide-powered serum for visibly thicker, fuller-looking hair (LP1 v2 Webflow embed)."
        />
        <link
          rel="canonical"
          href={`${PUBLISHED_ORIGIN}/pages/hairserum/lp1-lead-offershort-list-tox-v2`}
        />
      </Head>
      <SpaDrLp1V2WebflowEmbed />
    </>
  );
};

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {},
  };
};

export default SpaDrHairSerumLp1V2Page;
