import Head from "next/head";
import dynamic from "next/dynamic";
import type { GetStaticProps, NextPage } from "next";

const Gamification = dynamic(
  () => import("@/landings/gamification/Gamification").then((m) => m.Gamification),
  { ssr: false }
);

const GamificationPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Gamification</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Gamification />
    </>
  );
};

export const getStaticProps: GetStaticProps = () => ({ props: {} });

export default GamificationPage;
