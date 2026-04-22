/**
 * Fuentes de imágenes de la landing (CDN Shapermint / Shopify).
 * Copiadas de la página pública; no reemplaza `public/` del DS.
 */
const LP =
  "https://cdn.shapermint.com/assets/shapermint/images/landingPages/truekind-supportive-comfort-wireless-shaping-bra-offer-page-1";

export const TruekindBraCdn = {
  logo: "https://cdn.shapermint.com/assets/shapermint/images/shapermint_logo_black.svg",
  bag: "https://cdn.shapermint.com/assets/common/icons/navigation/shopping_bag.svg",
  chevron: "https://cdn.shapermint.com/assets/common/icons/arrows/chevron_down.svg",
  hero: `${LP}/main-bg-desk.png`,
  feature1: `${LP}/item1.png`,
  feature1icon: `${LP}/icon1.svg?format=svg`,
  feature2: `${LP}/item2.png`,
  feature2icon: `${LP}/item2.svg?format=svg`,
  feature3: `${LP}/item3.png`,
  feature3icon: `${LP}/item3.svg?format=svg`,
  table1: `${LP}/table1.png`,
  table2: `${LP}/table2.png`,
  table3: `${LP}/table3.png`,
  videoBg: `${LP}/video-bg.png`,
  verifiedBuyer:
    "https://cdn.shopify.com/s/files/1/0021/4889/2732/files/verified-buyer-icon.svg?v=1731502227",
  productBlack:
    "https://cdn.shopify.com/s/files/1/0021/4889/2732/files/bra-black-s-truekind-supportive-comfort-wireless-shaping-bra-33230051475590.png?v=1775750393",
  mothersDaySeal:
    "https://cdn.shapermint.com/assets/shapermint/images/transition/mothers-day-early-access-sale/seal.svg",
  sellingFastSeal: "https://cdn.shapermint.com/assets/shapermint/images/seals/seal-selling-fast.svg?width=226",
  pdpCami: "https://cdn.shopify.com/s/files/1/0021/4889/2732/files/PDPT-CAMI_S.png?v=1775848639",
  fitGuarantee: "https://cdn.shapermint.com/assets/shapermint/autorenew.svg?format=svg",
} as const;

export const TruekindBraShopPdp = {
  withVariant: (variantId: string) =>
    `https://shapermint.com/products/truekind-supportive-comfort-wireless-shaping-bra?variant=${variantId}`,
  default: "https://shapermint.com/products/truekind-supportive-comfort-wireless-shaping-bra",
} as const;

export const TruekindBraPagePath =
  "/pages/truekind-supportive-comfort-wireless-shaping-bra-offer-page-1";
