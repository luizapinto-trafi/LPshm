/**
 * Assets Shapermint DS for guns-swipe landing.
 * Page gallery and offer gallery are independent (see BEHAVIOR.md).
 */

export const GunsSwipeCdn = {
  logoHeader:
    "https://cdn.shapermint.com/assets/shapermint/images/shapermint_logo_black.svg",
  bagIcon:
    "https://cdn.shapermint.com/assets/common/icons/navigation/shopping_bag.svg",
  sealSellingFast:
    "https://cdn.shapermint.com/assets/shapermint/images/seals/seal-selling-fast.svg?width=226",
} as const;

/** Shared lifestyle set — cropped via object-cover into each section's fixed frame. */
export const GunsSwipePhotos = [
  "/guns-swipe/shaperbox-1.png",
  "/guns-swipe/shaperbox-3.png",
  "/guns-swipe/shaperbox-4.png",
] as const;

/** First-fold page gallery — not the Shopify PDP gallery, not #offers gallery. */
export const GunsSwipePageGallery: string[] = [...GunsSwipePhotos];

/** Mid-page PDP offer gallery — 2-up grid (Shapermint PDP style). */
export const GunsSwipeOfferGallery: string[] = [
  ...GunsSwipePhotos,
  ...GunsSwipePhotos,
];

/** Reason block images (one per persuasion block; cycles the shared set). */
export const GunsSwipeReasonImages: string[] = [
  GunsSwipePhotos[0]!,
  GunsSwipePhotos[1]!,
  GunsSwipePhotos[2]!,
  GunsSwipePhotos[0]!,
  GunsSwipePhotos[1]!,
  GunsSwipePhotos[2]!,
];

export const GunsSwipePagePath = "/pages/guns-swipe";

export const PACK_PRICES = {
  "1": { unit: 32.99, compare: 54.99, save: 22 },
  "2": { unit: 29.99, compare: 109.98, save: 50 },
} as const;

export type GunsSwipePackId = keyof typeof PACK_PRICES;

export const COLOR_SWATCHES = [
  { id: "black", hex: "#1a1a1a", label: "Black" },
  { id: "white", hex: "#f5f5f5", label: "White" },
  { id: "nude", hex: "#e8d5c4", label: "Nude" },
  { id: "chai", hex: "#c4a484", label: "Chai" },
  { id: "rose", hex: "#e8b4b8", label: "Rose" },
] as const;

export type GunsSwipeColorId = (typeof COLOR_SWATCHES)[number]["id"];

export const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "2X"] as const;
export type GunsSwipeSizeId = (typeof SIZE_OPTIONS)[number];
