"use client";

import { useEffect, useId, useState } from "react";
import { useTranslation } from "next-i18next/pages";

type Remaining = { hrs: string; min: string; sec: string };

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

/** Countdown to end of current day in America/New_York (real clock, not a looping fake timer). */
function remainingUntilEndOfDayEt(now = new Date()): Remaining {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);

  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value ?? "0");

  const secondsToday = get("hour") * 3600 + get("minute") * 60 + get("second");
  const secondsLeft = Math.max(0, 24 * 3600 - secondsToday - 1);

  return {
    hrs: pad(Math.floor(secondsLeft / 3600)),
    min: pad(Math.floor((secondsLeft % 3600) / 60)),
    sec: pad(secondsLeft % 60),
  };
}

/**
 * Grüns-style promo strip + countdown + tooltip (SHM tokens).
 * Centered row. Rose bar, secondary type in ink-900.
 * data-behavior="promo-timer"
 */
export function GunsSwipePromoBar() {
  const { t } = useTranslation("gunsSwipe");
  const tipId = useId();
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState<Remaining>({ hrs: "00", min: "00", sec: "00" });

  useEffect(() => {
    const tick = () => setTime(remainingUntilEndOfDayEt());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className="relative z-[60] bg-coral-250 px-3 py-1.5 text-ink-900"
      data-behavior="promo-timer"
    >
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-3 gap-y-1">
        <div className="text-center leading-tight">
          <p className="m-0 font-body text-[11px] font-bold uppercase tracking-wide text-ink-900">
            {t("announcement.line1")}
          </p>
          <p className="m-0 font-body text-[10px] font-semibold uppercase tracking-wide text-ink-900">
            {t("announcement.line2")}
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <div
            className="rounded-lg bg-white px-2 py-1 text-ink-900"
            aria-live="polite"
            aria-label={t("announcement.timerAria", {
              hrs: time.hrs,
              min: time.min,
              sec: time.sec,
            })}
          >
            <div className="flex items-end justify-center gap-1 font-body text-[13px] font-bold leading-none tabular-nums">
              <span className="inline-flex flex-col items-center">
                <span>{time.hrs}</span>
                <span className="mt-0.5 text-[8px] font-semibold uppercase tracking-wider text-ink-600">
                  {t("announcement.hrs")}
                </span>
              </span>
              <span className="pb-2.5 text-ink-500" aria-hidden>
                :
              </span>
              <span className="inline-flex flex-col items-center">
                <span>{time.min}</span>
                <span className="mt-0.5 text-[8px] font-semibold uppercase tracking-wider text-ink-600">
                  {t("announcement.min")}
                </span>
              </span>
              <span className="pb-2.5 text-ink-500" aria-hidden>
                :
              </span>
              <span className="inline-flex flex-col items-center">
                <span>{time.sec}</span>
                <span className="mt-0.5 text-[8px] font-semibold uppercase tracking-wider text-ink-600">
                  {t("announcement.sec")}
                </span>
              </span>
            </div>
          </div>

          <div className="relative">
            <button
              type="button"
              className="flex h-5 w-5 appearance-none items-center justify-center rounded-full border-0 bg-ink-900/10 p-0 text-[10px] font-bold leading-none text-ink-900 shadow-none outline-none ring-0 drop-shadow-none filter-none hover:bg-ink-900/15"
              aria-label={t("announcement.tooltipAria")}
              aria-expanded={open}
              aria-controls={tipId}
              onClick={() => setOpen((v) => !v)}
              onBlur={(e) => {
                if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) {
                  setOpen(false);
                }
              }}
            >
              i
            </button>
            {open && (
              <div
                id={tipId}
                role="tooltip"
                className="absolute left-1/2 top-[calc(100%+8px)] z-[70] w-[min(260px,calc(100vw-2rem))] -translate-x-1/2 rounded-md bg-ink-900 px-2.5 py-2 text-center font-body text-[11px] leading-snug text-white shadow-none"
              >
                <span
                  className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 bg-ink-900"
                  aria-hidden
                />
                <p className="relative m-0">{t("announcement.tooltip")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
