import Head from "next/head";
import dynamic from "next/dynamic";
import type { GetStaticProps, NextPage } from "next";
import { EbraQuizV2PagePath } from "@/landings/ebra-quiz-v2/ebraQuizV2Path";

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
        <title>EBRA — Fit Quiz V2 (Email Gate)</title>
        <meta
          name="description"
          content="EBRA Modern Bra fit quiz with email gate — native React port of the bundled export, rendered directly in the page."
        />
        <meta name="robots" content="noindex" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cardo:ital@0;1&family=Montserrat:wght@400;500;600;700;800&family=Mulish:wght@400;500;600;700&display=swap"
        />
        <link rel="canonical" href={`https://www.shapermint.com${EbraQuizV2PagePath}`} />
      </Head>
      <EbraQuizV2 />
    </>
  );
};

export const getStaticProps: GetStaticProps = () => ({ props: {} });

export default EbraQuizV2Page;
