import { useTranslation } from "next-i18next/pages";

export const GrunsOlipopFooter = () => {
  const { t } = useTranslation("grunsOlipop");
  return (
    <footer className="bg-ink-900 px-4 py-8 text-center text-[13px] leading-relaxed text-ink-200 sm:px-6 sm:py-10">
      <p className="mb-2 m-0">{t("footer.disclaimer")}</p>
      <p className="m-0">
        {t("footer.copyright")} ·{" "}
        <a className="font-semibold text-white underline-offset-2 hover:underline" href="https://shapermint.com">
          {t("footer.shapermint")}
        </a>
      </p>
    </footer>
  );
};
