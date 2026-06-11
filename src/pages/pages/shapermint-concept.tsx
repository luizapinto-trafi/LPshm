import Head from "next/head";
import dynamic from "next/dynamic";
import type { GetStaticProps, NextPage } from "next";

const ShapermintConcept = dynamic(
  () =>
    import("@/landings/shapermint-concept/ShapermintConcept").then(
      (m) => m.ShapermintConcept
    ),
  { ssr: false }
);

const ShapermintConceptPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Shapermint Concept</title>
        <meta name="robots" content="noindex" />
      </Head>
      <ShapermintConcept />
    </>
  );
};

export const getStaticProps: GetStaticProps = () => ({ props: {} });

export default ShapermintConceptPage;
