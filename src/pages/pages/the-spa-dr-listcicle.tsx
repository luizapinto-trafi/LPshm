import Head from "next/head";
import type { GetStaticProps, NextPage } from "next";
import { SpaDrListcicleWebflowEmbed } from "@/landings/the-spa-dr-listcicle/SpaDrListcicleWebflowEmbed";

const WEBFLOW_SHARED_CSS =
  "https://cdn.prod.website-files.com/6581a4ebeea456b4072fe120/css/the-spa-dr.webflow.shared.fd8c5ed7c.min.css";
const WEBFLOW_SSI =
  "sha384-/Yxe18GKiGW8dlwpF1BdAFQ/PzGr12yhsH6ug/sE3X/hh619SUEx0GUFsBBP1VhZ";
const TSD_FAVICON =
  "https://cdn.prod.website-files.com/6581a4ebeea456b4072fe120/65e9c5d0891fce2e5fa27009_Favicon_TSD.png";
const PUBLISHED_ORIGIN = "https://try.thespadr.com";

const TheSpaDrListciclePage: NextPage = () => {
  return (
    <>
      <Head>
        <link href="https://cdn.prod.website-files.com" rel="preconnect" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href={WEBFLOW_SHARED_CSS}
          crossOrigin="anonymous"
          integrity={WEBFLOW_SSI}
        />
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
