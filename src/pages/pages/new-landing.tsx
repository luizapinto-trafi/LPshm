import Head from "next/head";
import dynamic from "next/dynamic";
import type { GetStaticProps, NextPage } from "next";

const NewLanding = dynamic(
  () => import("@/landings/new-landing/NewLanding").then((m) => m.NewLanding),
  { ssr: false }
);

const NewLandingPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>New Landing</title>
        <meta name="robots" content="noindex" />
      </Head>
      <NewLanding />
    </>
  );
};

export const getStaticProps: GetStaticProps = () => ({ props: {} });

export default NewLandingPage;
