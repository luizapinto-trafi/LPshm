/**
 * Shapermint design tokens for the breast-shape fit quiz.
 * Mapped to shapermint-design-system/colors_and_type.css.
 *
 * Export names keep the TK_ prefix so EbraQuizV2 call sites stay stable.
 *
 * Contrast rule: peach (--coral-300) is for fills (CTAs, chips, washes).
 * Text on light backgrounds uses --coral-500 / --sale so copy stays AA.
 */

export const TK_FONT = '"Avenir Next LT Pro", "Avenir Next", system-ui, sans-serif';

/** Quiz chips + primary CTAs — Avenir Next LT Pro Demi (600). */
export const TK_QUIZ_BTN_WEIGHT = 600;

export const TK_COLORS = {
  /** Creamy section background — --cream-100 */
  paper: "#FAF7F2",
  /** Body text — --ink-900 */
  ink: "#292929",
  /** Headings — --ink-900 */
  inkStrong: "#292929",
  /** Peach fill — --coral-300 (CTA bg, chips, decorative washes) */
  accent: "#F7A08B",
  /** Accessible text accent — --coral-500 / --sale (headlines, body emphasis) */
  accentText: "#C64844",
  /** CTA / peach hover */
  accentHover: "#E08F7C",
  /** Soft peach tint — --coral-200 */
  surface: "#FBD0C7",
  /** Soft peach for rings / icons — --coral-250 */
  terra: "#F5BAB0",
  /** Soft wash — --coral-075 */
  sand: "#FDF1EF",
  /** Soft wash — section tints — --coral-050 */
  sandSoft: "#FFF6EF",
  /** Soft wash — selected chip fills — --coral-100 */
  terraSoft: "#FCE7E3",
  /** Rating stars — --gold-500 */
  star: "#EECC3F",
  /** Success / confirmation — --mint-600 */
  mint: "#4CBEA4",
  muted: "rgba(41, 41, 41, 0.55)",
  border: "rgba(41, 41, 41, 0.12)",
  /** Subtle border on soft peach chips (selected / decorative) */
  chipBorder: "rgba(247, 160, 139, 0.35)",
} as const;

/** Selected answer chips / shape cards — soft peach fill + peach ring. */
export const TK_SELECTED = {
  bg: TK_COLORS.terraSoft,
  border: TK_COLORS.accent,
  fg: TK_COLORS.ink,
  glyph: TK_COLORS.accentHover,
  checkBg: TK_COLORS.accent,
  checkFg: "#292929",
} as const;

/**
 * Unselected option pills — warm off-white fill, tan border, charcoal text.
 * Radius stays TK_RADIUS (8px); only colors change.
 */
export const TK_CHIP = {
  bg: "#FDFBF9",
  border: "#DED8D3",
  fg: "#3A3A3A",
} as const;

/**
 * Primary quiz CTAs — peach fill + dark Demi text (Shapermint DS).
 * Shared radius for all rectangular components.
 */
export const TK_RADIUS = 8;

export const TK_BTN = {
  primary: "#F7A08B",
  primaryHover: "#E08F7C",
  primaryFg: "#1B1B1B",
  disabledBg: "#E5E5E5",
  disabledFg: "#A6A6A6",
  radius: TK_RADIUS,
  weight: 600,
} as const;

/** Product swatch hex values — wireless bra tones. */
export const TK_PRODUCT_TONES = {
  black: "#1c1b1a",
  chai: "#d8c4a8",
  white: "#f1ede6",
  tan: "#c9a785",
  cocoa: "#6f4e38",
} as const;

export const TK_LOGO = "/ebra-quiz-v2/assets/shapermint-logo-dark.png";

/** Size-chart cell fills — same palette as the live size chart. */
export const TK_SIZE_CHART_COLORS: Record<string, string> = {
  S: "#F7A08B",
  M: "#FFE1B8",
  L: "#F5BAB0",
  XL: "#8BBEEA",
  "2XL": "#B1D7C3",
  "3XL": "#E7A4F7",
  "4XL": "#E7C9B2",
};

/** Row/column header wash — creamy header cells. */
export const TK_SIZE_CHART_HEAD_BG = "#FFF6EF";
