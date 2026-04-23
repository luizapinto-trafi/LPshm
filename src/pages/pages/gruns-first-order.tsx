import Head from "next/head";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import type { GetStaticProps, NextPage } from "next";
import { GrunsHeader } from "@/landings/gruns-first-order/GrunsHeader";
import { GrunsHero } from "@/landings/gruns-first-order/GrunsHero";
import { GrunsTestimonials } from "@/landings/gruns-first-order/GrunsTestimonials";
import { GrunsResearch } from "@/landings/gruns-first-order/GrunsResearch";
import { GrunsBenefits } from "@/landings/gruns-first-order/GrunsBenefits";
import { GrunsWhatsInside } from "@/landings/gruns-first-order/GrunsWhatsInside";
import { GrunsResults } from "@/landings/gruns-first-order/GrunsResults";
import { GrunsProduct } from "@/landings/gruns-first-order/GrunsProduct";
import { GrunsFaq } from "@/landings/gruns-first-order/GrunsFaq";
import { GrunsFooter } from "@/landings/gruns-first-order/GrunsFooter";
import { GrunsPagePath } from "@/landings/gruns-first-order/grunsCdn";

const StyledSkip = styled.a`
  position: absolute;
  left: -10000px;
  top: 0;
  z-index: 200;
  padding: var(--space-200) var(--space-400);
  background: var(--gruns-primary);
  color: var(--white);
  font-size: 14px;
  font-weight: 600;
  border-radius: var(--radius-md);
  &:focus {
    left: var(--space-400);
    top: var(--space-200);
  }
`;

const GrunsFirstOrderPage: NextPage = () => {
  const { t } = useTranslation("gruns");
  return (
    <>
      <Head>
        <title>{t("metaTitle")}</title>
        <meta name="description" content={t("metaDescription")} />
        <link rel="canonical" href={`https://gruns.co${GrunsPagePath}`} />
      </Head>
      <GrunsHeader />
      <StyledSkip href="#main-content">{t("a11y.skipToContent")}</StyledSkip>
      <main id="main-content" tabIndex={-1} style={{ outline: "none" }}>
        <GrunsHero />
        <GrunsTestimonials />
        <GrunsResearch />
        <GrunsBenefits />
        <GrunsWhatsInside />
        <GrunsResults />
        <GrunsProduct />
        <GrunsFaq />
      </main>
      <GrunsFooter />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["gruns"])),
  },
});

export default GrunsFirstOrderPage;
