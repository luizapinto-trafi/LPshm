"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next/pages";
import { GunsSwipeReasonImages } from "./gunsSwipeCdn";

type ReasonItem = { num: string; title: string; body: string };

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function ReasonSlide({
  item,
  img,
  className = "",
}: {
  item: ReasonItem;
  img: string;
  className?: string;
}) {
  return (
    <section
      className={className}
      data-behavior="persuasion-reason"
      aria-label={`${item.num}. ${item.title}`}
    >
      <div className="mx-auto flex max-w-[960px] flex-col px-5 py-6 min-[992px]:flex-row min-[992px]:items-center min-[992px]:gap-12 min-[992px]:px-5 min-[992px]:py-14">
        <div className="order-2 mt-4 w-full shrink-0 overflow-hidden rounded-2xl min-[992px]:order-2 min-[992px]:mt-0 min-[992px]:w-1/2 min-[992px]:self-stretch">
          <div className="relative aspect-square w-full min-[992px]:h-full min-[992px]:min-h-[320px]">
            <Image
              src={img}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 992px) 480px, 100vw"
            />
          </div>
        </div>

        <div className="contents min-[992px]:flex min-[992px]:w-1/2 min-[992px]:flex-col min-[992px]:gap-4">
          <div className="order-1 flex flex-col gap-1">
            <span className="font-display text-2xl font-semibold tracking-tight text-coral-500">
              {item.num}
            </span>
            <h2 className="m-0 font-display text-[1.75rem] font-bold leading-tight tracking-tight text-ink-900 min-[992px]:text-[2.5rem]">
              {item.title}
            </h2>
          </div>
          <div className="order-3 mt-4 text-base leading-relaxed text-ink-700 min-[992px]:mt-0 min-[992px]:text-[17px]">
            <p className="m-0">{item.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Persuasion blocks — Grüns reasons behavior (BEHAVIOR.md §3).
 * Mobile <992px: horizontal snap slider + "Swipe For Benefits" hint.
 * Desktop ≥992px: stacked listicle (title/image/body layout per breakpoint).
 * data-behavior="persuasion-list"
 */
export function GunsSwipeReasons() {
  const { t } = useTranslation("gunsSwipe");
  const items = asArray<ReasonItem>(t("reasons.items", { returnObjects: true }));
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const syncIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    setIndex(Math.round(track.scrollLeft / track.clientWidth));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => window.requestAnimationFrame(syncIndex);
    track.addEventListener("scroll", onScroll, { passive: true });
    syncIndex();
    return () => track.removeEventListener("scroll", onScroll);
  }, [syncIndex, items.length]);

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.max(0, Math.min(items.length - 1, i));
    track.scrollTo({ left: track.clientWidth * next, behavior: "smooth" });
  };

  if (!items.length) return null;

  return (
    <div data-behavior="persuasion-list">
      {/* Mobile slider — Grüns brry-reasons-slider */}
      <div
        className="bg-white pt-2 min-[992px]:hidden"
        data-behavior="persuasion-slider"
      >
        <div className="flex items-center justify-between gap-4 px-4 pb-2 pt-6">
          <p className="m-0 font-display text-[28px] font-bold leading-[1.1] tracking-[-0.04em] text-ink-900">
            Swipe For Benefits
          </p>
          <span className="shrink-0 text-ink-900" aria-hidden>
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </div>

        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, i) => {
            const img = GunsSwipeReasonImages[i % GunsSwipeReasonImages.length]!;
            return (
              <ReasonSlide
                key={item.num}
                item={item}
                img={img}
                className="w-full min-w-full shrink-0 snap-center"
              />
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-5 bg-white px-4 py-6">
          <button
            type="button"
            className="flex h-7 w-7 shrink-0 appearance-none items-center justify-center rounded-full border-0 bg-white/90 p-0 text-base leading-none text-ink-900 shadow-none outline-none transition-colors hover:bg-white disabled:opacity-25"
            aria-label={t("reasons.prev")}
            disabled={index <= 0}
            onClick={() => goTo(index - 1)}
          >
            ‹
          </button>

          <div className="flex items-center gap-2">
            {items.map((item, i) => (
              <button
                key={item.num}
                type="button"
                aria-label={t("reasons.goTo", { n: i + 1 })}
                aria-current={i === index}
                className={`h-2 appearance-none rounded border-0 p-0 outline-none transition-[width,opacity] ${
                  i === index
                    ? "w-5 bg-ink-900 opacity-100"
                    : "w-2 bg-ink-900 opacity-25"
                }`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>

          <button
            type="button"
            className="flex h-7 w-7 shrink-0 appearance-none items-center justify-center rounded-full border-0 bg-white/90 p-0 text-base leading-none text-ink-900 shadow-none outline-none transition-colors hover:bg-white disabled:opacity-25"
            aria-label={t("reasons.next")}
            disabled={index >= items.length - 1}
            onClick={() => goTo(index + 1)}
          >
            ›
          </button>
        </div>
      </div>

      {/* Desktop stacked listicle */}
      <div className="hidden min-[992px]:block" data-behavior="persuasion-desktop">
        {items.map((item, i) => {
          const img = GunsSwipeReasonImages[i % GunsSwipeReasonImages.length]!;
          const bg = i % 2 === 0 ? "bg-white" : "bg-coral-50";
          return <ReasonSlide key={item.num} item={item} img={img} className={bg} />;
        })}
      </div>
    </div>
  );
}
