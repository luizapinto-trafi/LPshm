/**
 * ShaperBox preference quiz — data contract for Dev / BI.
 *
 * Screens (no branching):
 * 0 Landing → 1 Categories → 2 Fit priorities → 3 Sizes → 4 Loader → 5 Offer
 *
 * Edge cases:
 * - Categories / priorities: Continue disabled until ≥1 selected; user can
 *   deselect down to 1 (cannot clear all once advanced).
 * - Sizes: clothingSize required; braBand/braCup optional (skip allowed).
 * - Unsupported size: clothing sizes limited to S–4XL; bra band/cup limited
 *   to standard US options shown in UI.
 * - Offer always shown after loader (no empty-state dead end).
 */

export type BoxQuizAnswers = {
  /** Multi-select category ids */
  preferredCategories: string[];
  /** Multi-select fit priority ids */
  fitPriorities: string[];
  /** Apparel size: S | M | L | XL | 2XL | 3XL | 4XL */
  clothingSize: string | null;
  /** Optional bra band: 30–48 even */
  braBand: string | null;
  /** Optional bra cup: A–DDD/F */
  braCup: string | null;
};

export const CATEGORY_OPTIONS = [
  { id: "bras", label: "Bras", preview: "Wireless shaping bras" },
  { id: "camis", label: "Camis & tops", preview: "Smoothing camis & tanks" },
  { id: "leggings", label: "Leggings", preview: "Sculpting leggings" },
  { id: "shorts", label: "Shorts", preview: "Everyday shaping shorts" },
  { id: "panties", label: "Panties", preview: "High-waist shaping panties" },
  { id: "bodysuits", label: "Bodysuits", preview: "All-in-one bodysuits" },
] as const;

export const FIT_PRIORITY_OPTIONS = [
  { id: "smooth", label: "Smooth under clothes" },
  { id: "support", label: "All-day support" },
  { id: "comfort", label: "Soft, no-dig comfort" },
  { id: "shape", label: "Visible shape & lift" },
  { id: "versatile", label: "Works with my wardrobe" },
  { id: "inclusive", label: "True-to-size for my body" },
] as const;

export const CLOTHING_SIZES = ["S", "M", "L", "XL", "2XL", "3XL", "4XL"] as const;
export const BRA_BANDS = ["30", "32", "34", "36", "38", "40", "42", "44", "46", "48"] as const;
export const BRA_CUPS = ["A", "B", "C", "D", "DD/E", "DDD/F"] as const;

export function emptyAnswers(): BoxQuizAnswers {
  return {
    preferredCategories: [],
    fitPriorities: [],
    clothingSize: null,
    braBand: null,
    braCup: null,
  };
}

export function categoryLabel(id: string) {
  return CATEGORY_OPTIONS.find((c) => c.id === id)?.label ?? id;
}

export function categoryPreview(id: string) {
  return CATEGORY_OPTIONS.find((c) => c.id === id)?.preview ?? id;
}
