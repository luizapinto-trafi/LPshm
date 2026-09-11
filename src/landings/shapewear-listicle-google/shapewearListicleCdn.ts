/**
 * Shapewear Listicle Google — ACQ Shapermint listicle.
 * Cover banners from club-membership LP; product shots + CTAs from live PDPs.
 */

const base = "/shapewear-listicle-google";

export const ShapewearListicleCdn = {
  logo: "https://cdn.shapermint.com/assets/shapermint/images/shapermint_logo_black.svg",
  bag: "https://cdn.shapermint.com/assets/common/icons/navigation/shopping_bag.svg",
  chevron: "https://cdn.shapermint.com/assets/common/icons/arrows/chevron_down.svg",
  authorAvatar: `${base}/author-avatar.png`,
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
    /** Current offer price (US). */
    price: string;
    /** Compare-at / list price from live PDP. */
    compareAt: string;
    /** Discount badge from live PDP. */
    discountLabel: string;
    rating: number;
    reviewCount: number;
  }
> = {
  cami: {
    image:
      "https://cdn.shopify.com/s/files/1/0021/4889/2732/products/camis-tanks-black-m-shapermint-essentials-all-day-every-day-scoop-neck-cami-30024602091654.jpg",
    url: "https://shapermint.com/products/empetua-all-day-every-day-scoop-neck-cami-12?variant=40166475366534",
    price: "$23.99",
    compareAt: "$45.00",
    discountLabel: "45% OFF",
    rating: 4.5,
    reviewCount: 18988,
  },
  leggings: {
    image:
      "https://cdn.shopify.com/s/files/1/0021/4889/2732/files/GABI_HWL__L_1b60f083-1e25-4631-8989-23f083c51810.jpg",
    url: "https://shapermint.com/products/shapermint-essentials-high-waisted-shaping-leggings-1?variant=39533322174598",
    price: "$37.99",
    compareAt: "$64.00",
    discountLabel: "40% OFF",
    rating: 4.5,
    reviewCount: 12728,
  },
  sweetheart: {
    image:
      "https://cdn.shopify.com/s/files/1/0021/4889/2732/files/62206_ACQ_12_649b0dce-a3a8-4efb-b6eb-455b34736849.jpg",
    url: "https://shapermint.com/products/shapermint-essentials-sweetheart-built-in-bra-shaper-cami-1?variant=42393768984710",
    price: "$38.99",
    compareAt: "$60.00",
    discountLabel: "35% OFF",
    rating: 4.5,
    reviewCount: 2672,
  },
  shorts: {
    image:
      "https://cdn.shopify.com/s/files/1/0021/4889/2732/files/55021_PDP-SHM_ACQ_10.jpg?v=1769723157",
    url: "https://shapermint.com/products/all-day-every-day-high-waisted-shaper-shorts-5?variant=21578971676732",
    price: "$28.99",
    compareAt: "$44.00",
    discountLabel: "35% OFF",
    rating: 4.5,
    reviewCount: 22428,
  },
  empower: {
    image:
      "https://cdn.shopify.com/s/files/1/0021/4889/2732/files/She_is_Pant_Size_8_and_wears_an_M_in_Black.jpg",
    url: "https://shapermint.com/products/shapermint-essentials-everyday-empower-high-waisted-shaper-short-1?variant=41179291123846",
    price: "$39.99",
    compareAt: "$58.00",
    discountLabel: "30% OFF",
    rating: 4.5,
    reviewCount: 3053,
  },
};

export const ShapewearListicleCollectionUrl =
  "https://shapermint.com/collections/shapewear";

export const ShapewearListiclePagePath = "/pages/shapewear-listicle-google";
