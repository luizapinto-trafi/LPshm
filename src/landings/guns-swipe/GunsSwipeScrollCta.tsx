"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next/pages";

/**
 * Scroll-gated CTA — Grüns sticky-cta behavior.
 * Badge overlaps the CTA edge (not a separate row above). Proof sits under the button on mobile.
 * data-behavior="scroll-cta"
 */
export function GunsSwipeScrollCta() {
  const { t } = useTranslation("gunsSwipe");
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const offers = document.getElementById("offers");
    if (!hero) return;

    let pastFirstFold = false;
    let offersVisible = false;

    const sync = () => setStuck(pastFirstFold && !offersVisible);

    const heroObs = new IntersectionObserver(
      ([entry]) => {
        pastFirstFold = !entry?.isIntersecting;
        sync();
      },
      { threshold: 0, rootMargin: "0px 0px -45% 0px" },
    );
    heroObs.observe(hero);

    let offersObs: IntersectionObserver | undefined;
    if (offers) {
      offersObs = new IntersectionObserver(
        ([entry]) => {
          offersVisible = Boolean(
            entry?.isIntersecting && (entry.intersectionRatio ?? 0) > 0.12,
          );
          sync();
        },
        { threshold: [0, 0.12, 0.25] },
      );
      offersObs.observe(offers);
    }

    sync();

    return () => {
      heroObs.disconnect();
      offersObs?.disconnect();
    };
  }, []);

  const badge = (
    <span className="pointer-events-none absolute left-1/2 top-0 z-[1] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[var(--sale)] px-3 py-1 text-[11px] font-bold leading-none text-white">
      {t("scrollCta.badge")}
    </span>
  );

  return (
    <div
      data-behavior="scroll-cta"
      className={`fixed inset-x-0 z-[60] bg-ink-900 transition-[transform,opacity] duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] max-[991px]:bottom-0 min-[992px]:top-0 min-[992px]:bottom-auto min-[992px]:border-b min-[992px]:border-white/15 ${
        stuck
          ? "translate-y-0 opacity-100"
          : "pointer-events-none invisible opacity-0 max-[991px]:translate-y-full min-[992px]:-translate-y-full"
      }`}
      aria-hidden={!stuck}
    >
      {/* Mobile: badge ON the CTA; proof below */}
      <div className="mx-auto flex max-w-[1200px] flex-col items-center px-4 pb-3 pt-5 min-[992px]:hidden">
        <div className="relative w-full max-w-md">
          {badge}
          <a
            href="#offers"
            tabIndex={stuck ? 0 : -1}
            className="flex min-h-12 w-full items-center justify-center rounded-full border-0 bg-coral-300 font-display text-[15px] font-bold text-ink-900 no-underline transition hover:bg-coral-400"
          >
            {t("scrollCta.cta")}
          </a>
        </div>
        <p className="m-0 mt-2.5 flex items-center justify-center gap-1.5 text-center text-[12px] leading-none text-white">
          <span className="tracking-tight text-gold-500" aria-hidden>
            ★★★★★
          </span>
          <span>
            <strong className="font-semibold">{t("scrollCta.proof")}</strong>
          </span>
        </p>
      </div>

      {/* Desktop: proof left; badge ON the CTA */}
      <div className="mx-auto hidden h-[72px] max-w-[1200px] items-center justify-between gap-4 px-5 min-[992px]:flex">
        <p className="m-0 flex items-center gap-2 text-sm text-white">
          <span className="text-gold-500" aria-hidden>
            ★★★★★
          </span>
          <span>
            <strong>{t("scrollCta.proof")}</strong>
          </span>
        </p>
        <div className="relative w-72">
          {badge}
          <a
            href="#offers"
            tabIndex={stuck ? 0 : -1}
            className="flex min-h-11 w-full items-center justify-center rounded-full border-0 bg-coral-300 font-display text-sm font-bold text-ink-900 no-underline transition hover:bg-coral-400"
          >
            {t("scrollCta.cta")}
          </a>
        </div>
      </div>
    </div>
  );
}
