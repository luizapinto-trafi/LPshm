import Head from "next/head";
import type { GetStaticProps, NextPage } from "next";
import { ShapermintVsHoneyloveBras } from "@/landings/shapermint-vs-honeylove/ShapermintVsHoneyloveBras";
import { ShapermintVsHoneyloveBrasPagePath } from "@/landings/shapermint-vs-honeylove/shapermintVsHoneylovePath";

const ShapermintVsHoneyloveBrasPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Shapermint vs. Honeylove: Which Wireless Bra Wins on Price & Reviews? | Shapermint</title>
        <meta
          name="description"
          content="Both brands make great wireless bras — so what actually decides it? An honest look at Shapermint vs. Honeylove bras on price, reviews, comfort, and real-world value."
        />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={`https://www.shapermint.com${ShapermintVsHoneyloveBrasPagePath}`} />
      </Head>
      <ShapermintVsHoneyloveBras />
    </>
  );
};

export const getStaticProps: GetStaticProps = () => ({ props: {} });

export default ShapermintVsHoneyloveBrasPage;
