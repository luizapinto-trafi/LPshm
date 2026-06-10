import Head from "next/head";
import dynamic from "next/dynamic";
import type { GetStaticProps, NextPage } from "next";
import { ShapermintUpsellPagePath } from "@/landings/shapermint-upsell/shapermintUpsellPath";

// The upsell uses a countdown timer and `window.scrollTo`, so it is a
// client-only component. Loading it with `ssr: false` keeps the markup in the
// page DOM (editable + reachable by the visual selector) without an iframe.
const ShapermintUpsell = dynamic(
  () => import("@/landings/shapermint-upsell/ShapermintUpsell").then((m) => m.ShapermintUpsell),
  { ssr: false }
);

const ShapermintUpsellPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Shapermint — Cami Upsell</title>
        <meta
          name="description"
          content="Shapermint checkout upsell (Buy One Cami, Get One Free) — native, editable React port."
        />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={`https://www.shapermint.com${ShapermintUpsellPagePath}`} />
      </Head>
      <ShapermintUpsell />
    </>
  );
};

export const getStaticProps: GetStaticProps = () => ({ props: {} });

export default ShapermintUpsellPage;
