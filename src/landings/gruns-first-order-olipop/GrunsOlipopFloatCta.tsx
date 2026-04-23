import { useTranslation } from "next-i18next/pages";

/** Botón fijo a la derecha (desktop) — alineado a gruns first-order-olipop. */
export const GrunsOlipopFloatCta = () => {
  const { t } = useTranslation("grunsOlipop");
  return (
    <a
      href="#offers"
      className="group fixed right-4 top-32 z-40 hidden max-w-xs items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap rounded-2xl border-2 border-ink-1000 bg-gruns-primary px-4 py-3 font-body text-sm font-bold text-white no-underline shadow-brutal transition active:translate-x-0.5 active:translate-y-0.5 active:shadow-brutal-active md:inline-flex"
    >
      {t("taste.floatingCta")}
    </a>
  );
};
