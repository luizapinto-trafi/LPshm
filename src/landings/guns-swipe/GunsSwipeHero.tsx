"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "next-i18next/pages";
import { GunsSwipePageGallery } from "./gunsSwipeCdn";

/** Matches Grüns `--gallery-interval` (~5s) with progress-bar dots. */
const AUTO_MS = 5000;

/**
 * First fold: copy + page-owned gallery (independent from Shopify PDP / #offers).
 * Gallery mirrors Grüns embla: horizontal slide, pill progress dots, soft arrow chips.
 * Mobile: gallery above copy. Desktop ≥992px: copy left, gallery right.
 * data-behavior="first-fold"
 */
export function GunsSwipeHero() {
  const { t } = useTranslation("gunsSwipe");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const total = GunsSwipePageGallery.length;

  const goTo = useCallback(
    (i: number) => setIndex(((i % total) + total) % total),
    [total],
  );
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion || total < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion, total, index]);

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#FFF8F3]"
      data-behavior="first-fold"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col min-[992px]:flex-row">
        {/* Gallery — DOM first so it stacks above copy on mobile.
            Fixed square frame (Grüns); photos crop via object-cover. */}
        <div
          className="relative aspect-square w-full overflow-hidden bg-[#F5F0EB] min-[992px]:order-2 min-[992px]:w-1/2"
          data-behavior="page-gallery"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {/* Horizontal track — Grüns/embla-style slide */}
          <div
            className="flex h-full will-change-transform"
            style={{
              width: `${total * 100}%`,
              transform: `translateX(-${(index * 100) / total}%)`,
              transition: reduceMotion
                ? "none"
                : "transform 650ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {GunsSwipePageGallery.map((src, i) => (
              <div
                key={src}
                className="relative h-full shrink-0 grow-0 overflow-hidden"
                style={{ width: `${100 / total}%` }}
              >
                <Image
                  src={src}
                  alt={t("hero.galleryAlt", { n: i + 1 })}
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 992px) 50vw, 100vw"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>

          {/* Arrows — Grüns chips, no browser button stroke */}
          <button
            type="button"
            className="absolute left-3 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 appearance-none items-center justify-center rounded-full border-0 bg-white/90 p-0 text-base leading-none text-ink-900 shadow-none outline-none transition-colors hover:bg-white"
            aria-label={t("a11y.galleryPrev")}
            onClick={prev}
          >
            ‹
          </button>
          <button
            type="button"
            className="absolute right-3 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 appearance-none items-center justify-center rounded-full border-0 bg-white/90 p-0 text-base leading-none text-ink-900 shadow-none outline-none transition-colors hover:bg-white"
            aria-label={t("a11y.galleryNext")}
            onClick={next}
          >
            ›
          </button>

          {/* Progress pill dots — no stroke */}
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/30 px-2.5 py-2">
            {GunsSwipePageGallery.map((_, i) => {
              const selected = i === index;
              return (
                <button
                  key={i}
                  type="button"
                  className="relative h-[3px] w-5 shrink-0 appearance-none overflow-hidden rounded-full border-0 bg-white/35 p-0 outline-none"
                  aria-label={t("a11y.galleryDot", { n: i + 1 })}
                  aria-current={selected}
                  onClick={() => goTo(i)}
                >
                  {selected && !paused && !reduceMotion && (
                    <span
                      key={`progress-${index}`}
                      className="absolute inset-0 origin-left bg-white"
                      style={{
                        animation: `guns-gallery-progress ${AUTO_MS}ms linear forwards`,
                      }}
                    />
                  )}
                  {selected && (paused || reduceMotion) && (
                    <span className="absolute inset-0 bg-white" />
                  )}
                </button>
              );
            })}
          </div>

          <style>{`
            @keyframes guns-gallery-progress {
              from { transform: scaleX(0); }
              to { transform: scaleX(1); }
            }
          `}</style>
        </div>

        {/* Copy */}
        <div className="flex w-full flex-col justify-center gap-5 px-5 py-8 min-[992px]:order-1 min-[992px]:w-1/2 min-[992px]:gap-6 min-[992px]:px-12 min-[992px]:py-16">
          <div className="inline-flex w-full items-center gap-1.5 rounded-full bg-white px-2 py-1 text-sm text-ink-900 shadow-[2px_4px_20px_rgba(0,0,0,0.1)] min-[992px]:w-fit">
            <span className="text-gold-500" aria-hidden>
              ★★★★★
            </span>
            <span>{t("hero.ratingLine")}</span>
          </div>
          <div>
            <h1 className="m-0 font-display text-[1.75rem] font-bold leading-[1.05] tracking-[-0.05em] text-ink-900 min-[992px]:text-[2.5rem]">
              {t("hero.title")}
            </h1>
            <p className="mt-2 m-0 font-display text-lg font-semibold tracking-[-0.03em] text-ink-700 min-[992px]:text-xl">
              {t("hero.titleAside")}
            </p>
          </div>
          <p className="m-0 max-w-[42ch] text-base leading-relaxed text-ink-700">
            {t("hero.lead")}
          </p>
          <div className="relative mt-3 w-full max-w-sm">
            <span className="pointer-events-none absolute left-1/2 top-0 z-[1] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--sale)] px-3 py-0.5 text-[11px] font-bold leading-none text-white">
              {t("hero.sold")}
            </span>
            <a
              href="#offers"
              className="flex min-h-12 w-full items-center justify-center rounded-full bg-coral-300 font-display text-sm font-semibold text-ink-900 no-underline transition hover:bg-coral-400 active:scale-[0.98]"
            >
              {t("hero.cta")}
            </a>
          </div>
          <p className="m-0 text-sm text-ink-700">
            {t("hero.riskIntro")}
            <strong className="text-ink-900">{t("hero.riskHighlight")}</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
