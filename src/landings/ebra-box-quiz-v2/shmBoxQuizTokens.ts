/**
 * Shapermint design tokens — ShaperBox / Club+ preference quiz (v2).
 * Mapped to shapermint-design-system/colors_and_type.css.
 *
 * Contrast: peach fills (--coral-300); text accents use --coral-500 / --sale.
 */

export const SHM_FONT = '"Avenir Next LT Pro", "Avenir Next", system-ui, sans-serif';
export const SHM_WEIGHT = 600;
export const SHM_RADIUS = 8;

export const SHM_COLORS = {
  paper: "#FAF7F2",
  ink: "#292929",
  inkStrong: "#292929",
  accent: "#F7A08B",
  accentText: "#C64844",
  accentHover: "#E08F7C",
  surface: "#FBD0C7",
  terra: "#F5BAB0",
  sand: "#FDF1EF",
  sandSoft: "#FFF6EF",
  terraSoft: "#FCE7E3",
  star: "#EECC3F",
  mint: "#4CBEA4",
  muted: "rgba(41, 41, 41, 0.55)",
  border: "rgba(41, 41, 41, 0.12)",
} as const;

export const SHM_SELECTED = {
  bg: SHM_COLORS.terraSoft,
  border: SHM_COLORS.accent,
  fg: SHM_COLORS.ink,
  checkBg: SHM_COLORS.accent,
  checkFg: "#292929",
} as const;

export const SHM_CHIP = {
  bg: "#FDFBF9",
  border: "#DED8D3",
  fg: "#3A3A3A",
} as const;

export const SHM_BTN = {
  primary: "#F7A08B",
  primaryHover: "#E08F7C",
  primaryFg: "#1B1B1B",
  disabledBg: "#E5E5E5",
  disabledFg: "#A6A6A6",
  radius: SHM_RADIUS,
  weight: SHM_WEIGHT,
} as const;

export const SHM_LOGO = "/ebra-quiz-v2/assets/shapermint-logo-dark.png";
