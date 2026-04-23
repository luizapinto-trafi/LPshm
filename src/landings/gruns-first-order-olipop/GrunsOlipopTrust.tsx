import { useTranslation } from "next-i18next/pages";

export const GrunsOlipopTrust = () => {
  const { t } = useTranslation("grunsOlipop");
  const snackStats = t("stats.snackStats", { returnObjects: true }) as { value: string; body: string }[];
  const qualityList = t("stats.qualityList", { returnObjects: true }) as string[];
  const reviews = t("reviews.items", { returnObjects: true }) as {
    headline: string;
    quote: string;
    author: string;
  }[];

  return (
    <section className="bg-white px-4 py-10 sm:px-6 sm:py-20 md:px-8">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-8 text-center font-display text-xl font-bold text-gruns-dark sm:mb-10 sm:text-2xl">
          {t("stats.deficientTitle")}
        </h2>
        <div className="mb-8 grid grid-cols-1 gap-5 sm:mb-10 md:grid-cols-2 md:gap-6">
          <div className="rounded-2xl border border-ink-100 bg-gruns-cream p-5 text-center sm:p-6">
            <p className="mb-2 font-display text-4xl font-extrabold text-gruns-primary sm:text-5xl">
              {t("stats.stat1")}
            </p>
            <p className="m-0 leading-relaxed text-gruns-dark">{t("stats.stat1Body")}</p>
          </div>
          <div className="rounded-2xl border border-ink-100 bg-gruns-cream p-5 text-center sm:p-6">
            <p className="mb-2 font-display text-4xl font-extrabold text-gruns-primary sm:text-5xl">
              {t("stats.stat2")}
            </p>
            <p className="m-0 leading-relaxed text-gruns-dark">{t("stats.stat2Body")}</p>
          </div>
        </div>
        <a
          className="mx-auto mt-2 table rounded-xl bg-gruns-primary px-5 py-3.5 text-center text-base font-semibold text-white no-underline transition hover:bg-gruns-primary-light sm:px-6"
          href="#offers"
        >
          {t("stats.cta")}
        </a>

        <h2 className="mb-3 mt-16 text-center font-display text-xl font-bold text-gruns-dark sm:mb-4 sm:mt-20 sm:text-2xl">
          {t("stats.snackTitle")}
        </h2>
        <p className="mx-auto mb-6 max-w-2xl text-center text-base leading-relaxed text-gruns-gray sm:mb-8">
          {t("stats.snackLead")}
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {snackStats.map((s) => (
            <div className="rounded-xl bg-ink-50 p-4 sm:p-5" key={s.value + s.body}>
              <p className="text-center font-display text-3xl font-extrabold text-gruns-primary sm:text-4xl">
                {s.value}
              </p>
              <p className="m-0 mt-1.5 text-center text-sm text-gruns-dark">{s.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-ink-500 sm:mt-5">{t("stats.snackFoot")}</p>

        <h2 className="mb-3 mt-16 text-center font-display text-xl font-bold text-gruns-dark sm:mt-20 sm:text-2xl">
          {t("stats.qualityTitle")}
        </h2>
        <p className="mb-3 text-center text-base text-gruns-gray sm:mb-4">{t("stats.qualityLead")}</p>
        <ul className="mx-auto max-w-lg list-decimal pl-5 text-left text-base leading-relaxed text-gruns-dark sm:pl-6">
          {qualityList.map((item) => (
            <li className="mb-1" key={item}>
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-16 grid gap-5 sm:mt-20" id="reviews">
          <h2 className="text-center font-display text-xl font-bold text-gruns-dark sm:text-2xl">
            {t("reviews.title")}
          </h2>
          {reviews.map((r) => (
            <article
              className="rounded-2xl border border-ink-200 bg-white p-4 sm:p-5"
              key={r.author}
            >
              <div className="mb-2 text-gruns-gold" style={{ letterSpacing: 2 }} aria-hidden>
                ★★★★★
              </div>
              <h3 className="mb-2 text-lg font-bold text-ink-900">{r.headline}</h3>
              <p className="m-0 mb-3 text-base leading-relaxed text-gruns-gray">{r.quote}</p>
              <footer className="text-sm font-semibold text-ink-900">— {r.author}</footer>
            </article>
          ))}
          <p className="text-center text-xs text-ink-500">{t("reviews.disclaimer")}</p>
        </div>

        <div className="mt-12 rounded-2xl bg-gruns-primary px-5 py-8 text-center text-white sm:mt-16 sm:px-8 sm:py-10">
          <h2 className="m-0 mb-3 text-xl font-bold sm:text-2xl">{t("closing.vsTitle")}</h2>
          <p className="m-0 text-base leading-relaxed opacity-95">{t("closing.vsBody")}</p>
        </div>

        <div className="mt-10 text-center sm:mt-12">
          <h2 className="mb-2 font-display text-xl font-bold text-gruns-dark sm:text-2xl">
            {t("closing.fumbleTitle")}
          </h2>
          <p className="mx-auto mb-4 max-w-lg text-base leading-relaxed text-gruns-dark">
            {t("closing.fumbleBody")}
          </p>
          <a
            className="mt-1 inline-block font-semibold text-coral-500 no-underline hover:underline"
            href="#offers"
          >
            {t("closing.fumbleCta")}
          </a>
        </div>

        <h2 className="mb-3 mt-10 text-center font-display text-xl font-bold text-gruns-dark sm:mt-12 sm:text-2xl">
          {t("closing.questionsTitle")}
        </h2>
        <a
          className="mx-auto table rounded-xl bg-gruns-primary px-5 py-3.5 text-center text-base font-semibold text-white no-underline transition hover:bg-gruns-primary-light sm:px-6"
          href="#offers"
        >
          {t("closing.questionsCta")}
        </a>
      </div>
    </section>
  );
};
