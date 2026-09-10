/**
 * Shapewear Listicle Google — ACQ Shapermint listicle.
 * Cover banners from club-membership LP; product shots + CTAs from live PDPs.
 */

export const ShapewearListicleCdn = {
  logo: "https://cdn.shapermint.com/assets/shapermint/images/shapermint_logo_black.svg",
  bag: "https://cdn.shapermint.com/assets/common/icons/navigation/shopping_bag.svg",
  chevron: "https://cdn.shapermint.com/assets/common/icons/arrows/chevron_down.svg",
  coverDesk:
    "https://cdn.shapermint.com/assets/shapermint/images/landingPages/club-membership-subscription/main-banner-desk.jpg",
  coverMobile:
    "https://cdn.shapermint.com/assets/shapermint/images/landingPages/club-membership-subscription/main-banner-mobile.jpg",
} as const;

export type ShapewearListicleItemId =
  | "cami"
  | "leggings"
  | "sweetheart"
  | "shorts"
  | "empower";

export const ShapewearListicleProducts: Record<
  ShapewearListicleItemId,
  {
    image: string;
    url: string;
    /** Display price from live US PDP (offer differs by market). */
    price: string;
    /** Live PDP aggregate rating (rounded display uses half-stars). */
    rating: number;
    /** Live PDP review count for social proof link. */
    reviewCount: number;
  }
> = {
  cami: {
    image:
      "https://cdn.shopify.com/s/files/1/0021/4889/2732/products/camis-tanks-black-s-shapermint-essentials-all-day-every-day-scoop-neck-cami-30024164049030.jpg?v=1784126360",
    url: "https://shapermint.com/products/empetua-all-day-every-day-scoop-neck-cami-12?variant=40166475366534",
    price: "$23.99",
    rating: 4.5,
    reviewCount: 18988,
  },
  leggings: {
    image:
      "https://cdn.shopify.com/s/files/1/0021/4889/2732/files/HWL_NewHalaraPDP_1_1.png?v=1787180636",
    url: "https://shapermint.com/products/shapermint-essentials-high-waisted-shaping-leggings-1?variant=39533322174598",
    price: "$37.99",
    rating: 4.5,
    reviewCount: 12728,
  },
  sweetheart: {
    image:
      "https://cdn.shopify.com/s/files/1/0021/4889/2732/files/image_f7b854f7-b0ad-4eae-b802-d895690b4a64.png?v=1767114543",
    url: "https://shapermint.com/products/shapermint-essentials-sweetheart-built-in-bra-shaper-cami-1?variant=42393768984710",
    price: "$38.99",
    rating: 4.5,
    reviewCount: 2672,
  },
  shorts: {
    image:
      "https://cdn.shopify.com/s/files/1/0021/4889/2732/files/55021_-_Shaper_shorts_-_F_B_Control_v2_Black.jpg?v=1769723055",
    url: "https://shapermint.com/products/all-day-every-day-high-waisted-shaper-shorts-5?variant=21578971676732",
    price: "$28.99",
    rating: 4.5,
    reviewCount: 22428,
  },
  empower: {
    image:
      "https://cdn.shopify.com/s/files/1/0021/4889/2732/files/PDP_Bonded_benefit_x3_Black.jpg?v=1769119613",
    url: "https://shapermint.com/products/shapermint-essentials-everyday-empower-high-waisted-shaper-short-1?variant=41179291123846",
    price: "$39.99",
    rating: 4.5,
    reviewCount: 3053,
  },
};

/** Close CTA — shapewear collection (ACQ: no club / no cross-sell). */
export const ShapewearListicleCollectionUrl =
  "https://shapermint.com/collections/shapewear";

export const ShapewearListiclePagePath = "/pages/shapewear-listicle-google";
