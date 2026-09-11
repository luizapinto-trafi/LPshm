/** Live PDP gallery (Shopify CDN) — High-Waisted Shaping Leggings. */
const SHOPIFY =
  "https://cdn.shopify.com/s/files/1/0021/4889/2732/files";

/** Primary color image from live PDP variant `images_id` mapping. */
export const LeggingsB2g3ColorImages = {
  black: `${SHOPIFY}/HWL_NewHalaraPDP_1_1.png?v=1787180636`,
  "heather-gray": `${SHOPIFY}/HWL_New_Halara_PDP_11.png?v=1783711627`,
  gray: `${SHOPIFY}/HWL_New_Halara_PDP_12.png?v=1783711626`,
  navy: `${SHOPIFY}/HWL_New_Halara_PDP_13.png?v=1783711626`,
} as const;

export const LeggingsB2g3Cdn = {
  logo: "/shapermint-essentials-sweetheart-cami/logo.svg",
  hero: LeggingsB2g3ColorImages.black,
  gallery: [
    LeggingsB2g3ColorImages.black,
    `${SHOPIFY}/PDP_HWLb_a4.png?v=1787181893`,
    `${SHOPIFY}/HWL_New_Halara_PDP_2.png?v=1783711627`,
    `${SHOPIFY}/HWL_New_Halara_PDP_3.png?v=1783711626`,
    `${SHOPIFY}/HWL_New_Halara_PDP_4.png?v=1783711627`,
    `${SHOPIFY}/HWL_New_Halara_PDP_5.png?v=1783711626`,
    LeggingsB2g3ColorImages["heather-gray"],
    LeggingsB2g3ColorImages.gray,
    LeggingsB2g3ColorImages.navy,
  ],
  colorImages: LeggingsB2g3ColorImages,
  /** Fallback thumb (Black). Prefer colorImages[color] in UI. */
  unitThumb: LeggingsB2g3ColorImages.black,
} as const;

export const LeggingsB2g3PagePaths = {
  offerHigh: "/pages/shapermint-essentials-high-waisted-shaping-leggings-b2g3-offer-high-anchor",
  offerUnit: "/pages/shapermint-essentials-high-waisted-shaping-leggings-b2g3-offer-unit-anchor",
  selectorHigh:
    "/pages/shapermint-essentials-high-waisted-shaping-leggings-b2g3-selector-high-anchor",
  selectorUnit:
    "/pages/shapermint-essentials-high-waisted-shaping-leggings-b2g3-selector-unit-anchor",
} as const;

/** CTA builds a Shopify cart permalink → checkout (see buildCheckoutUrl). */
export const LeggingsB2g3CheckoutBase = "https://shapermint.com/cart";
