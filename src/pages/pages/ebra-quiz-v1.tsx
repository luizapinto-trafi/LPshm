import Head from "next/head";
import dynamic from "next/dynamic";
import type { GetStaticProps, NextPage } from "next";
import { EbraQuizV1PagePath } from "@/landings/ebra-quiz-v2/ebraQuizV1Path";

const EbraQuizV2 = dynamic(
  () => import("@/landings/ebra-quiz-v2/EbraQuizV2").then((m) => m.EbraQuizV2),
  { ssr: false }
);

const EbraQuizV1Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Shapermint — Find Your Perfect Bra Fit Quiz</title>
        <meta
          name="description"
          content="Take the 15-second Shapermint fit quiz and discover the wireless bra made for your breast shape."
        />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={`https://www.shapermint.com${EbraQuizV1PagePath}`} />
      </Head>
      <EbraQuizV2 offerVariant="shop" />
    </>
  );
};

export const getStaticProps: GetStaticProps = () => ({ props: {} });

export default EbraQuizV1Page;
