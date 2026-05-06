import Head from "next/head";
import type { GetStaticProps, NextPage } from "next";
import { SpaDrListcicleWebflowEmbed } from "@/landings/the-spa-dr-listcicle/SpaDrListcicleWebflowEmbed";

const TSD_FAVICON =
  "https://cdn.prod.website-files.com/6581a4ebeea456b4072fe120/65e9c5d0891fce2e5fa27009_Favicon_TSD.png";
const PUBLISHED_ORIGIN = "https://try.thespadr.com";

// NOTE: the Webflow CSS bundle and Google Fonts CSS are NOT loaded from this
// page's <Head>. Next 16 doesn't guarantee that <link rel="stylesheet"> tags
// added via next/head land in the initial SSR response, which makes external
// stylesheets race the first paint and breaks the cascade (Poppins ends up
// resolving to the system sans-serif fallback). Both stylesheets are
// declared per-route inside `pages/_document.tsx`, where they are part of
// the initial HTML the browser parses.
const TheSpaDrListciclePage: NextPage = () => {
  return (
    <>
      <Head>
        <link href="https://cdn.prod.website-files.com" rel="preconnect" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        <link rel="icon" type="image/png" href={TSD_FAVICON} />
        <title>5 Reasons Your Hair Is Thinning, And Why Most Products Make It Worse</title>
        <meta
          name="description"
          content="The Spa Dr. Hair Serum — the same listicle as the published Webflow page (bty-7459-lp1), embedded in this app."
        />
        <link rel="canonical" href={`${PUBLISHED_ORIGIN}/pages/hairserum/bty-7459-lp1-lead-offershort-list-tox`} />
      </Head>
      <SpaDrListcicleWebflowEmbed />
    </>
  );
};

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {},
  };
};

export default TheSpaDrListciclePage;
