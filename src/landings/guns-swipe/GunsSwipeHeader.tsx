"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "next-i18next/pages";
import { GunsSwipePromoBar } from "./GunsSwipePromoBar";
import { useGunsSwipeCart } from "./useGunsSwipeCart";
import { handleKeyDown } from "@/shared/utils/KeyEvent";

const LOGO =
  "https://cdn.shapermint.com/assets/shapermint/images/shapermint_logo_black.svg";

const NAV = [
  { label: "Best Sellers", href: "https://www.shapermint.com/collections/best-sellers" },
  { label: "Shapewear", href: "https://www.shapermint.com/collections/shapewear", chevron: true },
  { label: "Bras", href: "https://www.shapermint.com/collections/bras", chevron: true },
  { label: "Camis & Tops", href: "https://www.shapermint.com/collections/tanks-camiso" },
  { label: "Underwear", href: "https://www.shapermint.com/collections/underwear", chevron: true },
  { label: "Bodysuits", href: "https://www.shapermint.com/collections/bodysuits" },
  { label: "Packs & Bundles", href: "https://www.shapermint.com/collections/packs-bundles" },
  { label: "Community", href: "https://www.shapermint.com/pages/community", chevron: true },
  {
    label: "Mother's Day Sale",
    href: "https://www.shapermint.com/collections/sale",
    promo: true,
  },
] as const;

/**
 * Standard Shapermint site header used on LPs (logo + full nav + utility icons).
 * Promo timer bar above (Grüns-style, SHM tokens). Cart bag opens the page side cart.
 */
export function GunsSwipeHeader() {
  const { t } = useTranslation("gunsSwipe");
  const { openCart, productCount } = useGunsSwipeCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-ink-200 bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)]"
      data-behavior="header"
    >
      <GunsSwipePromoBar />
      <div className="mx-auto flex h-12 max-w-[1440px] items-center justify-between gap-3 px-[15px] min-[1024px]:h-14 min-[1024px]:px-[26px]">
        <div className="flex shrink-0 items-center gap-4">
          <button
            type="button"
            className="inline-flex h-6 w-6 items-center justify-center border-0 bg-transparent p-0 text-ink-900 min-[1024px]:hidden"
            aria-label={t("header.menuToggle")}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            onKeyDown={(e) =>
              handleKeyDown(e, () => setMenuOpen((o) => !o), ["Enter", " "])
            }
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <a
            href="https://www.shapermint.com"
            aria-label={t("a11y.logoHome")}
            className="inline-flex items-center leading-none"
          >
            <Image
              src={LOGO}
              alt=""
              width={120}
              height={22}
              priority
              className="h-5 w-auto min-[1024px]:h-6"
            />
          </a>
        </div>

        <nav className="hidden min-[1024px]:block" aria-label="Primary">
          <ul className="m-0 flex list-none items-center gap-4 p-0 xl:gap-5">
            {NAV.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`inline-flex items-center gap-1 whitespace-nowrap font-body text-[13px] no-underline transition-colors hover:text-coral-500 ${
                    "promo" in item && item.promo
                      ? "font-semibold text-[#8B3A3A]"
                      : "font-medium text-ink-900"
                  }`}
                >
                  {item.label}
                  {"chevron" in item && item.chevron && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-4 text-ink-900 min-[1024px]:gap-[18px]">
          <button
            type="button"
            className="hidden items-center gap-2 border-0 bg-transparent p-0 font-body text-xs text-ink-900 min-[1024px]:inline-flex"
            aria-label="Currency USD"
          >
            <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden>
              <rect width="18" height="12" fill="#B22234" />
              <rect y="1" width="18" height="1" fill="#fff" />
              <rect y="3" width="18" height="1" fill="#fff" />
              <rect y="5" width="18" height="1" fill="#fff" />
              <rect y="7" width="18" height="1" fill="#fff" />
              <rect y="9" width="18" height="1" fill="#fff" />
              <rect y="11" width="18" height="1" fill="#fff" />
              <rect width="7" height="7" fill="#3C3B6E" />
            </svg>
            <span className="h-3 w-px bg-ink-200" aria-hidden />
            <span>USD</span>
          </button>

          <a
            href="https://www.shapermint.com/search"
            className="inline-flex h-6 w-6 items-center justify-center text-ink-900"
            aria-label={t("header.search")}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
          </a>
          <a
            href="https://www.shapermint.com/account"
            className="inline-flex h-6 w-6 items-center justify-center text-ink-900"
            aria-label={t("a11y.account")}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
            </svg>
          </a>
          <a
            href="https://www.shapermint.com/wishlist"
            className="hidden h-6 w-6 items-center justify-center text-ink-900 min-[1024px]:inline-flex"
            aria-label="Wishlist"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
              <path d="M12 20s-7-4.3-7-10.2A4 4 0 0 1 12 6a4 4 0 0 1 7 3.8C19 15.7 12 20 12 20z" />
            </svg>
          </a>
          <button
            type="button"
            className="relative inline-flex h-6 w-6 items-center justify-center border-0 bg-transparent p-0 text-ink-900"
            aria-label={t("a11y.cart")}
            onClick={openCart}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
              <path d="M6 8h12l-1.5 11a2 2 0 0 1-2 1.8h-5a2 2 0 0 1-2-1.8L6 8z" />
              <path d="M9 8a3 3 0 0 1 6 0" />
            </svg>
            {productCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-coral-500 px-1 text-[10px] font-bold text-white">
                {productCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          className="flex flex-col gap-3 border-t border-ink-200 bg-white px-4 py-4 min-[1024px]:hidden"
          aria-label={t("header.mobileNavAria")}
        >
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`font-body text-sm no-underline ${
                "promo" in item && item.promo ? "font-semibold text-[#8B3A3A]" : "text-ink-900"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
