import Head from "next/head";
import dynamic from "next/dynamic";
import type { GetStaticProps, NextPage } from "next";
import { ShapermintUpsellV2PagePath } from "@/landings/shapermint-upsell/shapermintUpsellPath";

// The upsell uses a countdown timer and `window.scrollTo`, so it is a
// client-only component. Loading it with `ssr: false` keeps the markup in the
// page DOM (editable + reachable by the visual selector) without an iframe.
const ShapermintUpsellV2 = dynamic(
  () => import("@/landings/shapermint-upsell/ShapermintUpsellV2").then((m) => m.ShapermintUpsellV2),
  { ssr: false }
);

const ShapermintUpsellV2Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Shapermint — Cami Upsell (V2)</title>
        <meta
          name="description"
          content="Shapermint checkout upsell (V2) — savings-first post-purchase copy experiment."
        />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={`https://www.shapermint.com${ShapermintUpsellV2PagePath}`} />
      </Head>
      <ShapermintUpsellV2 />
    </>
  );
};

export const getStaticProps: GetStaticProps = () => ({ props: {} });

export default ShapermintUpsellV2Page;
