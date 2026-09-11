import type { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { LeggingsB2g3PageShell } from "@/landings/leggings-b2g3-offer/LeggingsB2g3PageShell";
import { LeggingsB2g3PagePaths } from "@/landings/leggings-b2g3-offer/leggingsB2g3Cdn";

/** V3 — Layout B (pack selector) + high anchor */
const Page: NextPage = () => (
  <LeggingsB2g3PageShell
    layout="selector"
    anchor="high"
    canonicalPath={LeggingsB2g3PagePaths.selectorHigh}
    variantLabel="V3 Selector High Anchor"
  />
);

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["leggingsB2g3"])),
  },
});

export default Page;
