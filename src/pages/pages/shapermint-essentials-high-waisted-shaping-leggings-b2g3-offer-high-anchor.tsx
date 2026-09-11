import type { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { LeggingsB2g3PageShell } from "@/landings/leggings-b2g3-offer/LeggingsB2g3PageShell";
import { LeggingsB2g3PagePaths } from "@/landings/leggings-b2g3-offer/leggingsB2g3Cdn";

/** V1 — Layout A (single offer) + high anchor */
const Page: NextPage = () => (
  <LeggingsB2g3PageShell
    layout="single"
    anchor="high"
    canonicalPath={LeggingsB2g3PagePaths.offerHigh}
    variantLabel="V1 High Anchor"
  />
);

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["leggingsB2g3"])),
  },
});

export default Page;
