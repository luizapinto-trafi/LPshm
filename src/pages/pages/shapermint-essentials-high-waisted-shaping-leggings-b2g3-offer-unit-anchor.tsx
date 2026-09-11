import type { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { LeggingsB2g3PageShell } from "@/landings/leggings-b2g3-offer/LeggingsB2g3PageShell";
import { LeggingsB2g3PagePaths } from "@/landings/leggings-b2g3-offer/leggingsB2g3Cdn";

/** V2 — Layout A (single offer) + unit anchor */
const Page: NextPage = () => (
  <LeggingsB2g3PageShell
    layout="single"
    anchor="unit"
    canonicalPath={LeggingsB2g3PagePaths.offerUnit}
    variantLabel="V2 Unit Anchor"
  />
);

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["leggingsB2g3"])),
  },
});

export default Page;
