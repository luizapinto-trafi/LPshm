/**
 * Style Insiders advertorial — Denise Carter plus-size bra recommendation.
 * Route: /pages/lp1-denise-plus-size-bra
 * Structure reference: thestyleinsiders.com/lp1-sarah-bra-expert
 */

const base = "/lp1-denise-plus-size-bra";

export const DeniseAssets = {
  logo: "https://cdn.shapermint.com/assets/shapermint/images/shapermint_logo_black.svg",
  socialIcons: `${base}/social-icons.svg`,
  authorAvatar: `${base}/denise-avatar.png`,
} as const;

/** BOGO offer — all CTAs and inline product links. */
export const DeniseCtaUrl =
  "https://shapermint.com/products/lp2-truekind-supportive-comfort-wireless-shaping-bra-1-bogo-offer-page?variant=44136880373894";

export const DenisePagePath = "/pages/lp1-denise-plus-size-bra";

export const DeniseCanonicalUrl = "https://thestyleinsiders.com/lp1-denise-plus-size-bra";

export type DeniseImageSlotConfig = {
  label: string;
  alt: string;
  ratio: number;
  src?: string;
  width?: number;
  height?: number;
};

/**
 * Six image slots per briefing Image Guidance + creative sequence:
 * 1A byline → 1B hero → 1C #1 pick → 3A #2 → 4A #3 → 5A honest take
 */
export const DENISE_IMAGE_SLOTS: Record<number, DeniseImageSlotConfig> = {
  2: {
    label: "EBRA_PLUSZISE_1B — Hero: band/back adjustment",
    alt: "Plus size woman adjusting the wide back band of a black wireless bra",
    ratio: 4 / 3,
    src: `${base}/slot-2-hero.jpg`,
    width: 1200,
    height: 800,
  },
  3: {
    label: "EBRA_PLUSZISE_1C — #1 Pick: on body and under clothes",
    alt: "Plus size model showing the Contour Bra on body and under a fitted tee",
    ratio: 4 / 5,
    src: `${base}/slot-3-pick1.jpg`,
    width: 1200,
    height: 800,
  },
  4: {
    label: "EBRA_PLUSZISE_3A — #2 Extended size underwire / product flat lay",
    alt: "Nude wireless bra laid flat on a bed, showing wide straps and full coverage cups",
    ratio: 4 / 5,
    src: `${base}/slot-4-underwire.jpg`,
    width: 1200,
    height: 800,
  },
  5: {
    label: "EBRA_PLUSZISE_4A — #3 Stretch-to-fit bralette comparison",
    alt: "Thin stretch bralette next to a wide-band wireless Contour Bra on hangers",
    ratio: 4 / 5,
    src: `${base}/slot-5-bralette.jpg`,
    width: 1200,
    height: 800,
  },
  6: {
    label: "EBRA_PLUSZISE_5A — My honest take: unboxing the product",
    alt: "Woman unboxing a black Contour Bra from a shipping package on her bed",
    ratio: 4 / 3,
    src: `${base}/slot-6-honest-take.jpg`,
    width: 1200,
    height: 800,
  },
};
