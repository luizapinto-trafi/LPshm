/**
 * Replica de la advertorial "Style Insiders" publicada en Figma Sites
 * (try.shapermint.com/lp1-mbra-adv-breastshapes).
 *
 * Las imágenes y los textos son PLACEHOLDERS: se reemplazan editando este
 * archivo (assets) y `public/locales/en/mbraAdv.json` (copys). La estructura,
 * tipografía y colores replican la página original.
 */

const base = "/lp1-mbra-adv-breastshapes";

export const MbraAdvAssets = {
  logo: `${base}/si-logo.svg`,
  socialIcons: `${base}/social-icons.svg`,
  arrow: `${base}/arrow.svg`,
  authorAvatar: `${base}/author-avatar.png`,
  productBox: `${base}/product-box.png`,
  lifestyleFront: `${base}/lifestyle-front.png`,
  lifestyleBack: `${base}/lifestyle-back.png`,
  lifestyle3Duo: `${base}/lifestyle3-duo.png`,
  comparison: `${base}/comparison.png`,
  heroCollage: `${base}/hero-collage.png`,
  expertMeasure: `${base}/expert-measure.png`,
  reviewMadeline: `${base}/review-madeline.png`,
  fourWomen: `${base}/four-women.png`,
  braExtender: `${base}/bra-extender.png`,
  reviewTaylor: `${base}/review-taylor.png`,
  womanHanger: `${base}/woman-hanger.png`,
  brasFlatlay: `${base}/bras-flatlay.png`,
} as const;

/** Destino de todos los CTA ("VIEW DEAL" / "BUY 2, SAVE 45%"). */
export const MbraAdvCtaUrl =
  "https://shapermint.com/products/lp2-truekind-supportive-comfort-wireless-shaping-bra-1-shm12480-c?variant=42507051794566";

export const MbraAdvPagePath = "/pages/lp1-mbra-adv-breastshapes";
