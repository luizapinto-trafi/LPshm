import Head from "next/head";
import dynamic from "next/dynamic";
import type { GetStaticProps, NextPage } from "next";
import { EbraFitQuizV2PagePath } from "@/landings/ebra-quiz-v2/ebraFitQuizV2Path";

const EbraQuizV2 = dynamic(
  () => import("@/landings/ebra-quiz-v2/EbraQuizV2").then((m) => m.EbraQuizV2),
  { ssr: false }
);

const EbraQuizV2Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Shapermint — Find Your Perfect Bra Fit Quiz</title>
        <meta
          name="description"
          content="Take the Shapermint fit quiz, unlock your matches by email, and claim 40% off your first order."
        />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={`https://www.shapermint.com${EbraFitQuizV2PagePath}`} />
      </Head>
      <EbraQuizV2 offerVariant="shop-email" />
    </>
  );
};

export const getStaticProps: GetStaticProps = () => ({ props: {} });

export default EbraQuizV2Page;
