import Head from "next/head";
import dynamic from "next/dynamic";
import type { GetStaticProps, NextPage } from "next";

const TruekindPdp = dynamic(
  () => import("@/landings/truekind/TruekindPdp").then((m) => m.TruekindPdp),
  { ssr: false }
);

const TruekindPdpPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Supportive Comfort Wireless Shaping Bra — Truekind</title>
        <meta name="robots" content="noindex" />
      </Head>
      <TruekindPdp />
    </>
  );
};

export const getStaticProps: GetStaticProps = () => ({ props: {} });

export default TruekindPdpPage;
