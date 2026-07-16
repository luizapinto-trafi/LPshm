import Head from "next/head";
import dynamic from "next/dynamic";
import type { GetStaticProps, NextPage } from "next";
import { EbraQuizV2PagePath } from "@/landings/ebra-quiz-v2/ebraQuizV2Path";
import { TruekindFonts } from "@/landings/truekind/TruekindFonts";

// The quiz reads `window.matchMedia` and runs timers/Image() on mount, so it is
// a client-only component. Loading it with `ssr: false` avoids a server/client
// mismatch on the responsive `compact` flag and keeps the markup in the page
// DOM (so the visual element selector can reach it — unlike the old iframe).
const EbraQuizV2 = dynamic(
  () => import("@/landings/ebra-quiz-v2/EbraQuizV2").then((m) => m.EbraQuizV2),
  { ssr: false }
);

const EbraQuizV2Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Truekind — Find Your Perfect Bra Fit Quiz</title>
        <meta
          name="description"
          content="Take the 15-second Truekind fit quiz and discover the wireless bra made for your breast shape."
        />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={`https://www.shapermint.com${EbraQuizV2PagePath}`} />
      </Head>
      <TruekindFonts />
      <EbraQuizV2 />
    </>
  );
};

export const getStaticProps: GetStaticProps = () => ({ props: {} });

export default EbraQuizV2Page;
