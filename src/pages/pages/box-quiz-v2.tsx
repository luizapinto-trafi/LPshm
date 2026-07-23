import Head from "next/head";
import dynamic from "next/dynamic";
import type { GetStaticProps, NextPage } from "next";
import { EbraBoxQuizV2PagePath } from "@/landings/ebra-box-quiz-v2/ebraBoxQuizV2Path";

const EbraBoxQuizV2 = dynamic(
  () => import("@/landings/ebra-box-quiz-v2/EbraBoxQuizV2").then((m) => m.EbraBoxQuizV2),
  { ssr: false }
);

const BoxQuizV2Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Shapermint — ShaperBox Preference Quiz</title>
        <meta
          name="description"
          content="Tell us your sizes and favorite categories. We'll curate your first box — try before you buy with Club+."
        />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={`https://www.shapermint.com${EbraBoxQuizV2PagePath}`} />
      </Head>
      <EbraBoxQuizV2 />
    </>
  );
};

export const getStaticProps: GetStaticProps = () => ({ props: {} });

export default BoxQuizV2Page;
