"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useTranslation } from "next-i18next/pages";
import { useGunsSwipeCart } from "./useGunsSwipeCart";

/**
 * Side cart drawer — opens on Add to Cart (see BEHAVIOR.md §5).
 * data-behavior="side-cart"
 */
export function GunsSwipeSideCart() {
  const { t } = useTranslation("gunsSwipe");
  const { open, items, closeCart, setQty, removeItem, subtotal, hasGwp } =
    useGunsSwipeCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeCart]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const count = items.filter((i) => !i.isGift).reduce((a, b) => a + b.qty, 0);

  return (
    <>
      <div
        className={`fixed inset-0 z-[120] bg-black/40 transition-opacity duration-200 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden={!open}
        data-behavior="side-cart-scrim"
      />
      <aside
        className={`fixed inset-y-0 right-0 z-[130] flex w-full max-w-[440px] flex-col bg-white shadow-lg transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
        aria-label={t("cart.title")}
        data-behavior="side-cart"
      >
        <header className="flex items-center justify-between border-b border-ink-200 px-5 py-4">
          <h3 className="m-0 font-display text-lg font-bold text-ink-900">
            {t("cart.title")} ({count})
          </h3>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 text-ink-900"
            onClick={closeCart}
            aria-label={t("a11y.closeCart")}
          >
            ✕
          </button>
        </header>

        <div className="flex-1 overflow-auto px-5 py-2">
          {items.length === 0 && (
            <p className="py-10 text-center text-sm text-ink-600">{t("cart.empty")}</p>
          )}
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 border-b border-ink-100 py-4"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-ink-100">
                <Image src={item.img} alt="" fill className="object-cover" sizes="96px" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="m-0 font-display text-sm font-semibold text-ink-900">
                  {item.title}
                </p>
                {!item.isGift && (
                  <p className="m-0 mt-1 text-xs text-ink-600">
                    {t("cart.lineMeta", {
                      color: item.color,
                      size: item.size,
                      pack: item.pack,
                    })}
                  </p>
                )}
                {item.isGift ? (
                  <p className="m-0 mt-2 text-xs font-semibold text-coral-500">
                    {t("cart.gwpNote")}
                  </p>
                ) : (
                  <div className="mt-2 inline-flex items-center gap-2 rounded-lg border border-ink-200">
                    <button
                      type="button"
                      className="h-8 w-8 text-ink-900"
                      aria-label={t("a11y.decreaseQty")}
                      onClick={() => setQty(item.id, item.qty - 1)}
                    >
                      −
                    </button>
                    <span className="min-w-6 text-center text-sm font-semibold">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      className="h-8 w-8 text-ink-900"
                      aria-label={t("a11y.increaseQty")}
                      onClick={() => setQty(item.id, item.qty + 1)}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
              <div className="flex flex-col items-end justify-between">
                {!item.isGift && (
                  <button
                    type="button"
                    className="text-xs text-ink-600"
                    aria-label={t("a11y.removeItem")}
                    onClick={() => removeItem(item.id)}
                  >
                    ✕
                  </button>
                )}
                <p className="m-0 font-display text-sm font-bold text-coral-500">
                  {item.isGift ? "$0.00" : `$${(item.price * item.qty).toFixed(2)}`}
                </p>
              </div>
            </div>
          ))}
        </div>

        <footer className="border-t border-ink-200 px-5 py-5">
          {hasGwp && (
            <p className="mb-3 m-0 rounded-lg bg-coral-50 px-3 py-2 text-xs font-semibold text-ink-900">
              {t("cart.gwpNote")}
            </p>
          )}
          <div className="mb-4 flex justify-between font-display text-base font-bold text-ink-900">
            <span>{t("cart.subtotal")}</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <a
            href="https://www.shapermint.com"
            className={`flex min-h-12 w-full items-center justify-center rounded-lg bg-coral-300 font-display text-sm font-semibold text-ink-900 no-underline transition hover:bg-coral-400 ${
              items.length === 0 ? "pointer-events-none opacity-50" : ""
            }`}
          >
            {t("cart.checkout")}
          </a>
          <p className="mt-3 m-0 text-center text-xs text-ink-600">{t("cart.secure")}</p>
        </footer>
      </aside>
    </>
  );
}
