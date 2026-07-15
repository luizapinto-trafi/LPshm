import Head from "next/head";
import dynamic from "next/dynamic";
import type { GetStaticProps, NextPage } from "next";

const Truekind = dynamic(
  () => import("@/landings/truekind/Truekind").then((m) => m.Truekind),
  { ssr: false }
);

const TruekindPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Truekind</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Truekind />
    </>
  );
};

export const getStaticProps: GetStaticProps = () => ({ props: {} });

export default TruekindPage;
