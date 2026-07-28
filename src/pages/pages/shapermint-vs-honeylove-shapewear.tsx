import Head from "next/head";
import type { GetStaticProps, NextPage } from "next";
import { ShapermintVsHoneyloveShapewear } from "@/landings/shapermint-vs-honeylove/ShapermintVsHoneyloveShapewear";
import { ShapermintVsHoneyloveShapewearPagePath } from "@/landings/shapermint-vs-honeylove/shapermintVsHoneylovePath";

const ShapermintVsHoneyloveShapewearPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Shapermint vs. Honeylove: Price, Reviews, and Real-World Value | Shapermint</title>
        <meta
          name="description"
          content="Both brands make great shapewear — so what actually decides it? An honest look at Shapermint vs. Honeylove on price, reviews, comfort, and real-world value."
        />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={`https://www.shapermint.com${ShapermintVsHoneyloveShapewearPagePath}`} />
      </Head>
      <ShapermintVsHoneyloveShapewear />
    </>
  );
};

export const getStaticProps: GetStaticProps = () => ({ props: {} });

export default ShapermintVsHoneyloveShapewearPage;
