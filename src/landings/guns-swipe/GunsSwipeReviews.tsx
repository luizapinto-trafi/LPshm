"use client";

import { useRef } from "react";
import { useTranslation } from "next-i18next/pages";

type QuoteItem = {
  headline: string;
  quote: string;
  author: string;
  verified: string;
};

type FeedItem = {
  initials: string;
  name: string;
  verified: string;
  stars: number;
  time: string;
  title: string;
  body: string;
  product: string;
};

type RatingBar = { stars: number; pct: number };

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

/**
 * Reviews — Grüns order after PDP: (1) quote rectangles, (2) feed-style reviews.
 * data-behavior="reviews"
 */
export function GunsSwipeReviews() {
  const { t } = useTranslation("gunsSwipe");
  const quotes = asArray<QuoteItem>(t("reviews.quotes", { returnObjects: true }));
  const feed = asArray<FeedItem>(t("reviews.feed", { returnObjects: true }));
  const bars = asArray<RatingBar>(t("reviews.ratingBars", { returnObjects: true }));
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: -1 | 1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 360), behavior: "smooth" });
  };

  return (
    <div data-behavior="reviews" id="reviews">
      {/* 1. Quote rectangles — Grüns listicle-reviews-v2 */}
      <section
        className="bg-coral-50 px-5 py-12 min-[992px]:py-16"
        data-behavior="reviews-quotes"
        aria-labelledby="guns-reviews-quotes-title"
      >
        <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-8 min-[992px]:gap-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-3">
              <span className="font-display text-lg font-bold text-ink-900">
                {t("reviews.ratingSummary")}
              </span>
              <span className="text-gold-600" aria-hidden>
                ★★★★★
              </span>
            </div>
            <h2
              id="guns-reviews-quotes-title"
              className="m-0 max-w-[22ch] font-display text-[1.75rem] font-bold leading-tight tracking-tight text-ink-900 min-[992px]:text-[2.25rem]"
            >
              {t("reviews.quotesTitle")}
            </h2>
          </div>

          <div className="relative w-full">
            <div
              ref={scroller}
              className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory min-[992px]:grid min-[992px]:grid-cols-3 min-[992px]:gap-6 min-[992px]:overflow-visible [&::-webkit-scrollbar]:hidden"
            >
              {quotes.map((item) => (
                <article
                  key={item.author + item.headline}
                  className="flex min-w-[88%] shrink-0 snap-start flex-col items-center gap-4 overflow-hidden rounded-2xl bg-white px-5 py-6 text-center shadow-[2px_4px_16px_rgba(0,0,0,0.1)] min-[600px]:min-w-[55%] min-[992px]:min-w-0 min-[992px]:px-6 min-[992px]:py-8"
                >
                  <p className="m-0 text-sm tracking-tight text-gold-600" aria-hidden>
                    ★★★★★
                  </p>
                  <div className="flex w-full flex-col items-center gap-3">
                    <h3 className="m-0 font-display text-lg font-bold leading-snug text-ink-900 min-[992px]:text-xl">
                      “{item.headline}”
                    </h3>
                    <p className="m-0 text-sm leading-relaxed text-ink-700 min-[992px]:text-base">
                      {item.quote}
                    </p>
                  </div>
                  <div className="mt-auto flex w-full items-center justify-center gap-2 pt-2">
                    <span className="text-sm font-bold text-ink-900">{item.author}</span>
                    <span className="text-sm text-ink-600">{item.verified}</span>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 min-[992px]:hidden">
              <button
                type="button"
                className="flex h-10 w-10 appearance-none items-center justify-center border-0 bg-transparent p-0 text-2xl text-ink-900 outline-none"
                aria-label={t("a11y.galleryPrev")}
                onClick={() => scrollBy(-1)}
              >
                ‹
              </button>
              <button
                type="button"
                className="flex h-10 w-10 appearance-none items-center justify-center border-0 bg-transparent p-0 text-2xl text-ink-900 outline-none"
                aria-label={t("a11y.galleryNext")}
                onClick={() => scrollBy(1)}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Normal review feed — Junip-style summary + list */}
      <section
        className="bg-white px-5 py-12 min-[992px]:py-16"
        data-behavior="reviews-feed"
        aria-labelledby="guns-reviews-feed-title"
      >
        <div className="mx-auto max-w-[1100px]">
          <h2
            id="guns-reviews-feed-title"
            className="m-0 mb-8 font-display text-2xl font-bold tracking-tight text-ink-900 min-[992px]:mb-10 min-[992px]:text-3xl"
          >
            {t("reviews.feedTitle")}
          </h2>

          <div className="mb-8 flex flex-col gap-6 border-b border-ink-200 pb-8 min-[768px]:flex-row min-[768px]:items-start min-[768px]:justify-between">
            <div className="flex items-start gap-4">
              <p className="m-0 font-display text-5xl font-bold leading-none text-ink-900">
                {t("reviews.feedScore")}
              </p>
              <div>
                <p className="m-0 text-gold-600" aria-hidden>
                  ★★★★★
                </p>
                <p className="mt-1 m-0 text-sm text-ink-700">{t("reviews.feedCount")}</p>
              </div>
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-1.5 min-[768px]:max-w-sm">
              {bars.map((bar) => (
                <div key={bar.stars} className="flex items-center gap-2 text-xs text-ink-700">
                  <span className="w-8 shrink-0 tabular-nums">{bar.stars}★</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink-100">
                    <div
                      className="h-full rounded-full bg-gold-600"
                      style={{ width: `${bar.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="inline-flex appearance-none items-center gap-2 rounded-lg border border-ink-300 bg-white px-4 py-2 text-sm font-medium text-ink-900 outline-none"
            >
              {t("reviews.filter")}
            </button>
            <label className="inline-flex items-center gap-2 text-sm text-ink-700">
              <select
                className="appearance-none rounded-lg border border-ink-300 bg-white px-3 py-2 text-sm text-ink-900 outline-none"
                defaultValue="latest"
                aria-label={t("reviews.sortLabel")}
              >
                <option value="latest">{t("reviews.sortLatest")}</option>
                <option value="rating">{t("reviews.sortRating")}</option>
              </select>
            </label>
          </div>

          <ul className="m-0 flex list-none flex-col gap-0 p-0">
            {feed.map((item) => (
              <li
                key={item.name + item.title}
                className="border-t border-ink-200 py-6 first:border-t-0 first:pt-0"
              >
                <div className="flex gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coral-250 font-display text-sm font-bold text-ink-900"
                    aria-hidden
                  >
                    {item.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="font-display text-sm font-bold text-ink-900">
                        {item.name}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[color:var(--mint-700)]">
                        <span aria-hidden>✓</span>
                        {item.verified}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className="text-sm text-gold-600" aria-label={`${item.stars} stars`}>
                        {"★".repeat(item.stars)}
                        <span className="text-ink-300">
                          {"★".repeat(Math.max(0, 5 - item.stars))}
                        </span>
                      </span>
                      <span className="text-xs text-ink-500">{item.time}</span>
                    </div>
                    <h3 className="mt-2 m-0 font-display text-base font-semibold text-ink-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 m-0 text-sm leading-relaxed text-ink-700">{item.body}</p>
                    <p className="mt-2 m-0 text-xs text-ink-500">{item.product}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
