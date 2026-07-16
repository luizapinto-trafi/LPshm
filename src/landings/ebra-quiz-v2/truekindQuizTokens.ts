/**
 * Truekind design tokens for the breast-shape fit quiz.
 * Mapped to shapermint-design-system/colors_and_type.css + Truekind landings.
 */

export const TK_FONT = '"Circular XX", system-ui, sans-serif';

/** Quiz answer chips / shape cards — Demi (600). CTAs stay bold (700). */
export const TK_QUIZ_BTN_WEIGHT = 600;

export const TK_COLORS = {
  /** Warm section background — Truekind features (#f7f4ee) */
  paper: "#f7f4ee",
  /** Body text — --ink-900 */
  ink: "#292929",
  /** Headings / CTA fill — Truekind black */
  inkStrong: "#1c1b1a",
  /** Brand sale red — --coral-500 / --sale (emphasis copy) */
  accent: "#C64844",
  /** CTA hover — --coral-450 */
  accentHover: "#D4605B",
  /** Soft peach tint — --coral-200 */
  surface: "#FBD0C7",
  /** TKD DS — TERRA: secondary (borders, icons, checkmarks) */
  terra: "#EB9F79",
  /** TKD DS — SAND: canonical background */
  sand: "#FCD7B8",
  /** Soft wash — SAND lightened for unselected chip fills */
  sandSoft: "#FEF4EA",
  /** Soft wash — TERRA lightened for selected chip fills */
  terraSoft: "#FAE5D6",
  /** Rating stars — DS "Attention – Sunlight" */
  star: "#F2D96F",
  muted: "rgba(28, 27, 26, 0.65)",
  border: "rgba(28, 27, 26, 0.12)",
  /** Subtle border on soft sand chips */
  chipBorder: "rgba(235, 159, 121, 0.28)",
} as const;

/** Selected answer chips / shape cards — soft TERRA fill + TERRA ring. */
export const TK_SELECTED = {
  bg: TK_COLORS.terraSoft,
  border: TK_COLORS.terra,
  fg: TK_COLORS.ink,
  glyph: TK_COLORS.terra,
  checkBg: TK_COLORS.terra,
  checkFg: "#ffffff",
} as const;

/** Unselected quiz chips — soft SAND fill. */
export const TK_CHIP = {
  bg: TK_COLORS.sandSoft,
  border: TK_COLORS.chipBorder,
  fg: TK_COLORS.ink,
} as const;

/** Primary quiz CTAs — black pill (matches TruekindPdp .pdp-cta). */
export const TK_BTN = {
  primary: TK_COLORS.inkStrong,
  primaryHover: "#000000",
  primaryFg: "#ffffff",
  disabledBg: "#E5E5E5",
  disabledFg: "#A6A6A6",
} as const;

/** Product swatch hex values — matches TruekindProductsSection TONES. */
export const TK_PRODUCT_TONES = {
  black: "#1c1b1a",
  chai: "#d8c4a8",
  white: "#f1ede6",
  tan: "#c9a785",
  cocoa: "#6f4e38",
} as const;

export const TK_LOGO = "/truekind/logo.svg";

/** Size-chart cell fills — exact hex from the live truekind.com PDP size chart. */
export const TK_SIZE_CHART_COLORS: Record<string, string> = {
  S: "#F7A08B",
  M: "#FFE1B8",
  L: "#F5BAB0",
  XL: "#8BBEEA",
  "2XL": "#B1D7C3",
  "3XL": "#E7A4F7",
  "4XL": "#E7C9B2",
};

/** Row/column header wash — matches the live chart's cream header cells. */
export const TK_SIZE_CHART_HEAD_BG = "#FFF6EF";
