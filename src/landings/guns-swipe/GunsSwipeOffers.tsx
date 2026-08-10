"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { useTranslation } from "next-i18next/pages";
import {
  COLOR_SWATCHES,
  GunsSwipeCdn,
  GunsSwipeOfferGallery,
  PACK_PRICES,
  SIZE_OPTIONS,
  type GunsSwipeColorId,
  type GunsSwipePackId,
  type GunsSwipeSizeId,
} from "./gunsSwipeCdn";
import { useGunsSwipeCart } from "./useGunsSwipeCart";

/**
 * Shapermint PDP offer standard + GWP.
 * Mobile: single-image gallery slider (SHM PDP). Desktop: 2-up grid.
 * Packs match live Truekind buybox selection chrome.
 * data-behavior="pdp-offer"
 */
export function GunsSwipeOffers() {
  const { t } = useTranslation("gunsSwipe");
  const { addProduct } = useGunsSwipeCart();

  const [pack, setPack] = useState<GunsSwipePackId>("2");
  const [colorA, setColorA] = useState<GunsSwipeColorId>("black");
  const [colorB, setColorB] = useState<GunsSwipeColorId>("nude");
  const [size, setSize] = useState<GunsSwipeSizeId>("M");
  const [galleryIndex, setGalleryIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const pricing = PACK_PRICES[pack];
  const units = pack === "2" ? 2 : 1;
  const lineTotal = (pricing.unit * units).toFixed(2);
  const gallerySrc = GunsSwipeOfferGallery[0]!;
  const total = GunsSwipeOfferGallery.length;

  const syncGallery = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    setGalleryIndex(Math.round(track.scrollLeft / track.clientWidth));
  }, []);

  const goGallery = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const next = ((i % total) + total) % total;
    track.scrollTo({ left: track.clientWidth * next, behavior: "smooth" });
    setGalleryIndex(next);
  };

  const onAdd = () => {
    addProduct({
      title: t("offers.title"),
      color: colorA,
      size,
      pack,
      unitPrice: pricing.unit,
      qty: units,
      img: gallerySrc,
      giftTitle: t("offers.gwpCartTitle"),
    });
  };

  return (
    <section
      id="offers"
      className="scroll-mt-24 bg-white py-0 min-[1024px]:px-8 min-[1024px]:py-14"
      data-behavior="pdp-offer"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-0 min-[1024px]:grid-cols-[1.2fr_400px] min-[1024px]:gap-10">
        {/* —— Gallery —— */}
        <div
          className="min-[1024px]:sticky min-[1024px]:top-[5.5rem]"
          data-behavior="offer-gallery"
        >
          {/* Mobile slider — Shapermint PDP */}
          <div className="relative min-[1024px]:hidden">
            <div
              ref={trackRef}
              className="flex snap-x snap-mandatory overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              onScroll={() => window.requestAnimationFrame(syncGallery)}
            >
              {GunsSwipeOfferGallery.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-square w-full min-w-full shrink-0 snap-center bg-ink-100"
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>

            <span className="absolute left-3 top-3 z-[1] rounded-sm bg-[var(--sale)] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
              {t("offers.saleBadge")}
            </span>

            <div className="absolute bottom-3 left-3 z-[1] h-8 w-[7.5rem]">
              <Image
                src={GunsSwipeCdn.sealSellingFast}
                alt={t("offers.sellingFast")}
                fill
                className="object-contain object-left"
                sizes="120px"
              />
            </div>

            <button
              type="button"
              className="absolute right-2 top-1/2 z-[1] -translate-y-1/2 appearance-none border-0 bg-transparent p-2 text-3xl leading-none text-ink-900 shadow-none outline-none"
              aria-label={t("a11y.galleryNext")}
              onClick={() => goGallery(galleryIndex + 1)}
            >
              ›
            </button>

            <div className="absolute bottom-3 left-1/2 z-[1] flex -translate-x-1/2 items-center gap-1.5">
              {GunsSwipeOfferGallery.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={t("a11y.galleryDot", { n: i + 1 })}
                  aria-current={i === galleryIndex}
                  className={`h-2 w-2 appearance-none rounded-full border border-white p-0 outline-none ${
                    i === galleryIndex ? "bg-white" : "bg-transparent"
                  }`}
                  onClick={() => goGallery(i)}
                />
              ))}
            </div>
          </div>

          <div className="px-4 pt-3 min-[1024px]:hidden">
            <a
              href="#offers-buybox"
              className="flex min-h-11 w-full items-center justify-center rounded-md border border-ink-900 bg-white font-body text-sm font-semibold text-ink-900 no-underline"
            >
              {t("offers.seeInYourSize")}
            </a>
          </div>

          {/* Desktop 2-up grid */}
          <div className="hidden grid-cols-2 gap-1.5 min-[1024px]:grid">
            {GunsSwipeOfferGallery.map((img, i) => (
              <div
                key={i}
                className="relative aspect-[4/5] overflow-hidden bg-ink-100"
              >
                <Image
                  src={img}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 35vw, 50vw"
                  priority={i < 2}
                />
                {i === 0 && (
                  <span className="absolute left-2 top-2 rounded-sm bg-[var(--sale)] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    {t("offers.saleBadge")}
                  </span>
                )}
                {i === 1 && (
                  <span className="absolute left-2 top-2 h-8 w-[7.5rem]">
                    <Image
                      src={GunsSwipeCdn.sealSellingFast}
                      alt={t("offers.sellingFast")}
                      fill
                      className="object-contain object-left"
                      sizes="120px"
                    />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* —— Buybox —— */}
        <aside
          id="offers-buybox"
          className="flex flex-col gap-5 px-4 py-6 min-[1024px]:sticky min-[1024px]:top-[5.5rem] min-[1024px]:px-0 min-[1024px]:py-0"
          data-behavior="pdp-buybox"
        >
          <h2 className="m-0 font-body text-[22px] font-semibold leading-snug tracking-tight text-ink-900">
            {t("offers.title")}
          </h2>

          <div className="flex items-center gap-2 text-sm text-ink-700">
            <span className="text-gold-500" aria-hidden>
              ★★★★★
            </span>
            <a href="#reviews" className="text-ink-700 underline">
              {t("offers.reviewsLink")}
            </a>
          </div>

          {/* Choose your savings — Truekind pack chrome */}
          <div>
            <p className="mb-3 m-0 font-display text-sm font-semibold text-ink-900">
              {t("offers.savingsLabel")}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {(["1", "2"] as GunsSwipePackId[]).map((id) => {
                const p = PACK_PRICES[id];
                const selected = pack === id;
                const popular = id === "2";
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setPack(id)}
                    aria-pressed={selected}
                    style={{
                      appearance: "none",
                      WebkitAppearance: "none",
                      boxShadow: "none",
                      border: selected
                        ? "2px solid var(--mint-500)"
                        : "1px solid var(--ink-300)",
                    }}
                    className={`relative flex flex-col items-center gap-1.5 rounded-lg px-2 py-4 text-center outline-none ring-0 ${
                      selected ? "bg-[#F5FAF9]" : "bg-white"
                    }`}
                  >
                    {popular && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink-900">
                        {t("offers.mostPopular")}
                      </span>
                    )}
                    <span className="font-display text-sm font-bold text-ink-900">
                      {t(`offers.pack${id}Units`)}
                    </span>
                    <span
                      className={`rounded px-2 py-0.5 text-[11px] font-bold shadow-none ${
                        selected
                          ? "border-0 bg-[var(--sale)] text-white"
                          : "border border-solid border-ink-300 bg-white text-ink-900"
                      }`}
                      style={{ appearance: "none", boxShadow: "none" }}
                    >
                      {t(`offers.pack${id}Save`, { amount: p.save })}
                    </span>
                    <span className="text-xs text-ink-600 line-through">
                      ${p.compare.toFixed(2)}
                    </span>
                    <span className="font-display text-sm font-bold text-ink-900">
                      {id === "2" ? (
                        <>
                          ${p.unit.toFixed(2)}
                          <span className="font-normal text-ink-600">/each</span>
                        </>
                      ) : (
                        `$${p.unit.toFixed(2)}`
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className="rounded-lg bg-[var(--mint-100,#DFEFEB)] px-4 py-3"
            data-behavior="gwp-callout"
          >
            <p className="m-0 font-display text-sm font-bold text-ink-900">
              {t("offers.gwpTitle")}
            </p>
            <p className="mt-1 m-0 text-sm leading-snug text-ink-700">
              {t("offers.gwpBody")}
            </p>
          </div>

          {/* Color rows — one per unit when 2-pack */}
          <div className="flex flex-col gap-3">
            <ColorRow
              thumb={gallerySrc}
              label={t("offers.colorLabelSingle", {
                a: COLOR_SWATCHES.find((c) => c.id === colorA)?.label,
              })}
              selected={colorA}
              onSelect={setColorA}
            />
            {pack === "2" && (
              <ColorRow
                thumb={GunsSwipeOfferGallery[1]!}
                label={t("offers.colorLabelSingle", {
                  a: COLOR_SWATCHES.find((c) => c.id === colorB)?.label,
                })}
                selected={colorB}
                onSelect={setColorB}
              />
            )}
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className="m-0 text-sm font-medium text-ink-900">
                {t("offers.sizeHeading", { size })}
              </p>
              <a
                href="https://www.shapermint.com/pages/size-guide"
                className="text-sm text-ink-900 underline"
              >
                {t("offers.sizeGuide")}
              </a>
            </div>
            <div className="flex flex-wrap gap-2">
              {SIZE_OPTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={`min-h-9 min-w-11 appearance-none rounded border px-3 text-sm font-semibold outline-none ${
                    size === s
                      ? "border-ink-900 bg-ink-900 text-white"
                      : "border-ink-300 bg-white text-ink-900"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={onAdd}
            data-behavior="add-to-cart"
            className="flex min-h-12 w-full appearance-none items-center justify-center rounded-lg border-0 bg-coral-300 font-display text-sm font-bold uppercase tracking-wide text-ink-900 outline-none transition hover:bg-coral-400 active:scale-[0.98]"
          >
            {t("offers.addToCart")}
          </button>

          <div className="flex gap-3 rounded-lg bg-ink-100 p-4">
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="shrink-0 text-ink-900"
              aria-hidden
            >
              <path d="M4 12a8 8 0 0 1 14-5.3L20 4" strokeLinecap="round" />
              <path d="M20 4v5h-5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20 12a8 8 0 0 1-14 5.3L4 20" strokeLinecap="round" />
              <path d="M4 20v-5h5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <p className="m-0 font-display text-[15px] font-bold text-ink-900">
                {t("offers.returnTitle")}
              </p>
              <p className="mt-1.5 m-0 text-sm leading-relaxed text-ink-900">
                {t("offers.returnBody")}
              </p>
            </div>
          </div>

          <div>
            <h3 className="m-0 mb-2 font-display text-[17px] font-bold text-ink-900">
              {t("offers.longTitle")}
            </h3>
            <p className="m-0 text-[15px] leading-relaxed text-ink-900">
              {t("offers.longBody")}
            </p>
          </div>

          <div className="border-t border-ink-200">
            {(
              [
                ["accSizeTitle", "accSizeBody"],
                ["accFabricTitle", "accFabricBody"],
                ["accCareTitle", "accCareBody"],
              ] as const
            ).map(([titleKey, bodyKey]) => (
              <details key={titleKey} className="border-b border-ink-200">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-display text-[15px] font-bold text-ink-900 marker:content-none [&::-webkit-details-marker]:hidden">
                  {t(`offers.${titleKey}`)}
                  <span className="text-xl font-normal text-ink-900" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="m-0 pb-4 text-sm leading-relaxed text-ink-700">
                  {t(`offers.${bodyKey}`)}
                </p>
              </details>
            ))}
          </div>

          <p className="m-0 text-xs text-ink-600">
            {t("offers.lineTotalHint", { price: lineTotal })}
          </p>
        </aside>
      </div>
    </section>
  );
}

function ColorRow({
  thumb,
  label,
  selected,
  onSelect,
}: {
  thumb: string;
  label: string;
  selected: GunsSwipeColorId;
  onSelect: (id: GunsSwipeColorId) => void;
}) {
  return (
    <div className="flex items-start gap-3.5">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm bg-ink-100">
        <Image src={thumb} alt="" fill className="object-cover" sizes="64px" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="mb-2 m-0 text-sm font-medium text-ink-900">{label}</p>
        <div className="flex flex-wrap gap-2">
          {COLOR_SWATCHES.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-label={c.label}
              aria-pressed={selected === c.id}
              onClick={() => onSelect(c.id)}
              style={{
                appearance: "none",
                WebkitAppearance: "none",
                backgroundColor: c.hex,
                boxShadow: selected === c.id
                  ? "0 0 0 2px #fff, 0 0 0 4px var(--ink-900)"
                  : "none",
                border: "1px solid var(--ink-200)",
              }}
              className="h-7 w-7 rounded-full outline-none ring-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
