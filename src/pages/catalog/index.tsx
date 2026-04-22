import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import type { GetStaticProps } from "next";

export const CatalogPage = () => {
  const { t } = useTranslation("common");
  return <main>{t("catalog.title")}</main>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});

export default CatalogPage;
