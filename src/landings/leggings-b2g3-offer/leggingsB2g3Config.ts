/**
 * ACQ Leggings B2G3 offer — shared pricing + catalog config.
 * Anchor is the only intentional variable between V1↔V2 and V3↔V4.
 */

import washBagImg from "./wash-bag.png";

export type AnchorId = "high" | "unit";
export type LayoutId = "single" | "selector";
export type PackId = "b2g3" | "single";
export type ColorId = "black" | "heather-gray" | "gray" | "navy";
export type SizeId = "S" | "M" | "L" | "XL" | "2XL" | "3XL" | "4XL";

export type AnchorPricing = {
  id: AnchorId;
  /** Struck compare-at for the 3-unit pack. */
  compareAt: number;
  /** Pack sale price — always $75.98. */
  salePrice: number;
  /** Badge copy, e.g. "60% OFF – Save $116.02". */
  badge: string;
  /** Absolute dollars saved vs compare-at (for CTA). */
  savings: number;
  /** Display value of the free third unit in the offer/pack includes row. */
  freeUnitValue: number;
};

/** Sale price is always $75.98 for the 3-unit pack. Single unit always $37.99. */
export const PACK_SALE_PRICE = 75.98;
export const SINGLE_UNIT_PRICE = 37.99;

export const ANCHORS: Record<AnchorId, AnchorPricing> = {
  high: {
    id: "high",
    compareAt: 192,
    salePrice: PACK_SALE_PRICE,
    badge: "60% OFF - Save $116.02",
    savings: 116.02,
    freeUnitValue: 64,
  },
  unit: {
    id: "unit",
    compareAt: 113.97,
    salePrice: PACK_SALE_PRICE,
    badge: "33% OFF - Save $37.99",
    savings: 37.99,
    freeUnitValue: 37.99,
  },
};

/**
 * Free gift in the offer/pack includes row — data-driven only.
 * Matches live Bonded Shorts (`…shm15673-v1`) gift: Wash Bag @ $12.
 *
 * FLAG (eng): `shopifyId` empty until listing/metafield wiring lands.
 * Unlock is display-state only (qty >= unlockThreshold).
 */
export type OfferGiftConfig = {
  name: string;
  image: string;
  imageAlt: string;
  /** Shopify product/variant id when available — empty until eng wires listing. */
  shopifyId: string;
  unlockThreshold: number;
  /** Struck value shown next to FREE in the includes row. */
  displayValue: number;
};

/** @deprecated alias — prefer OFFER_GIFT; brief called this “Booster” but live gift is Wash Bag. */
export type BoosterConfig = OfferGiftConfig;

export const OFFER_GIFT: OfferGiftConfig = {
  name: "Wash Bag",
  image: typeof washBagImg === "string" ? washBagImg : washBagImg.src,
  imageAlt: "Wash Bag",
  shopifyId: "",
  unlockThreshold: 3,
  displayValue: 12,
};

/** Back-compat export used by offer section. */
export const BOOSTER = OFFER_GIFT;

export const COLORS: { id: ColorId; label: string; hex: string; light?: boolean }[] = [
  { id: "black", label: "Black", hex: "#1A1A1A" },
  { id: "heather-gray", label: "Heather Gray", hex: "#A8A8A8", light: true },
  { id: "gray", label: "Gray", hex: "#6B6B6B" },
  { id: "navy", label: "Navy", hex: "#1B2A4A" },
];

export const SIZES: SizeId[] = ["S", "M", "L", "XL", "2XL", "3XL", "4XL"];

export const PRODUCT = {
  title: "Shapermint Essentials High-Waisted Shaping Leggings",
  reviewCount: 12_728,
  rating: 4.52,
  subtitle: "Shape, smooth, and slim your body from tummy to ankle",
  /** Base PDP handle — listing duplication is out of scope for this pass. */
  baseHandle: "shapermint-essentials-high-waisted-shaping-leggings-1",
  shopifyProductId: "3899445346364",
} as const;

export const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });
