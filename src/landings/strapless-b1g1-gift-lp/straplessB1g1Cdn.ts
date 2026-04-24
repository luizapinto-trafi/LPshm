/**
 * Assets propios de `/pages/strapless-b1g1-gift-lp` (`public/strapless-b1g1-gift-lp`).
 * Duplicados de los de strapless para poder sustituir archivos sin afectar la landing original.
 */
const BASE = "/strapless-b1g1-gift-lp";

export const StraplessB1g1Cdn = {
  logo: `${BASE}/shapermint-logo.svg`,
  /** Hero (`hero.png` ← DS `landing-assets/hero.png`). */
  hero: `${BASE}/hero.png`,
  /** Tarjeta 1 features (DS `landing-assets/Rectangle 6.png`). */
  featBreathe: `${BASE}/feat-breathe.png`,
  /** Tarjeta 2 features (`rectangle-5.png` ← DS `landing-assets/Rectangle 5.png`). */
  featBreathable: `${BASE}/rectangle-5.png`,
  /** Tarjeta 3 features (`rectangle-4.png` ← DS `landing-assets/Rectangle 4.png`). */
  featWireless: `${BASE}/rectangle-4.png`,
  /** Badge nº tarjeta 1 features (DS `landing-assets/03 1.svg`). */
  featureNum01Svg: `${BASE}/03-1.svg`,
  /** Badges tarjetas 2 y 3 features (DS `landing-assets/05 2.svg`). */
  featureNum02Svg: `${BASE}/05-2.svg`,
  /** Columna “Shapermint” en compare (308×370). */
  compareUsProduct: `${BASE}/compare-us.png`,
  /** Tarjeta color “nude” (`mask-group-2.png` ← DS `landing-assets/Mask group-2.png`). */
  colorNude: `${BASE}/mask-group-2.png`,
  /** Compare col. competidor 1 (`mask-group-4.png` ← DS `Mask group-4.png`). */
  competitor1: `${BASE}/mask-group-4.png`,
  /** Compare col. competidor 2 (`mask-group-5.png` ← DS `Mask group-5.png`). */
  competitor2: `${BASE}/mask-group-5.png`,
  bestSellerBg: `${BASE}/best-seller-bg.png`,
  /** Tarjeta color “black” (`mask-group-1.png` ← DS `landing-assets/Mask group-1.png`). */
  colorBlack: `${BASE}/mask-group-1.png`,
  /** Tarjeta color “white” (`mask-group.png` ← DS `landing-assets/Mask group.png`). */
  colorWhite: `${BASE}/mask-group.png`,
  gallery1: `${BASE}/gallery-1.png`,
  gallery2: `${BASE}/gallery-2.png`,
  swatchBlack: `${BASE}/swatch-black.png`,
  swatchChai: `${BASE}/swatch-chai.png`,
  pressInstyle: `${BASE}/press-instyle.png`,
  pressCosmo: `${BASE}/press-cosmo.png`,
} as const;

export const StraplessB1g1GiftLpPagePath = "/pages/strapless-b1g1-gift-lp";
