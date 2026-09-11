import type { ColorId, SizeId } from "./leggingsB2g3Config";
import PDP_REVIEWS_DATA from "./leggingsB2g3Reviews.json";

/** Full SSR review set + photo grid from the live BOGO / Stamped widget. */
export const PDP_REVIEWS = PDP_REVIEWS_DATA.reviews;
export const PDP_REVIEW_PHOTOS = PDP_REVIEWS_DATA.photoGrid;

/** Size chart from live BOGO / base High-Waisted Shaping Leggings PDP. */
export const PDP_SIZE_CHART = {
  rows: [
    { size: "S", pant: "2 - 4", waistIn: "26 - 29", hipsIn: "35.5 - 38", waistCm: "66 - 74", hipsCm: "90 - 97" },
    { size: "M", pant: "6 - 8", waistIn: "29.5 - 33", hipsIn: "38.5 - 42", waistCm: "75 - 84", hipsCm: "98 - 107" },
    { size: "L", pant: "10 - 12", waistIn: "33.5 - 36", hipsIn: "42.5 - 45", waistCm: "85 - 91", hipsCm: "108 - 114" },
    { size: "XL", pant: "14 - 16", waistIn: "36.5 - 38.5", hipsIn: "45.5 - 48", waistCm: "93 - 98", hipsCm: "116 - 122" },
    { size: "2XL", pant: "18 - 20", waistIn: "39 - 42", hipsIn: "48.5 - 52", waistCm: "99 - 107", hipsCm: "123 - 132" },
    { size: "3XL", pant: "22", waistIn: "42.5 - 46", hipsIn: "52.5 - 55", waistCm: "108 - 117", hipsCm: "133 - 140" },
    { size: "4XL", pant: "24", waistIn: "46.5 - 50", hipsIn: "56 - 58", waistCm: "118 - 127", hipsCm: "142 - 147" },
  ],
} as const;

/** Base PDP variant IDs (color × size) — used for cart/checkout permalinks. */
export const VARIANT_IDS: Record<ColorId, Record<SizeId, string>> = {
  black: {
    S: "39533322174598",
    M: "40279230349446",
    L: "40279230316678",
    XL: "40024345247878",
    "2XL": "39533322338438",
    "3XL": "39533322371206",
    "4XL": "39533322403974",
  },
  "heather-gray": {
    S: "40229888655494",
    M: "40229888721030",
    L: "40229888786566",
    XL: "40229888852102",
    "2XL": "40229888917638",
    "3XL": "40229888983174",
    "4XL": "40229889081478",
  },
  gray: {
    S: "40279231037574",
    M: "40279231201414",
    L: "40155166638214",
    XL: "40164809900166",
    "2XL": "40164710547590",
    "3XL": "40279231135878",
    "4XL": "40279231168646",
  },
  navy: {
    S: "40279230414982",
    M: "40279230677126",
    L: "40279230611590",
    XL: "40178052595846",
    "2XL": "39438406287494",
    "3XL": "40155166408838",
    "4XL": "40279230546054",
  },
};

/** Builds a Shopify cart permalink that lands on checkout. */
export const buildCheckoutUrl = (variantIds: string[]) => {
  const counts = new Map<string, number>();
  for (const id of variantIds) {
    if (!id) continue;
    counts.set(id, (counts.get(id) ?? 0) + 1);
  }
  const path = [...counts.entries()].map(([id, qty]) => `${id}:${qty}`).join(",");
  return `https://shapermint.com/cart/${path}?checkout`;
};

export const resolveVariantId = (color: ColorId, size: SizeId) =>
  VARIANT_IDS[color]?.[size] ?? VARIANT_IDS.black.S;

/** Copy + media pulled from live BOGO / base PDP HTML. */
export const PDP_BENEFITS = [
  {
    icon: "https://cdn.shopify.com/s/files/1/0021/4889/2732/files/diamond_1.svg?v=1634750571",
    text: "The comfort of leggings, the power of shapewear",
  },
  {
    icon: "https://cdn.shopify.com/s/files/1/0021/4889/2732/files/shining_1.svg?v=1634737471",
    text: "Designed for women of every body type",
  },
  {
    icon: "https://cdn.shopify.com/s/files/1/0021/4889/2732/files/Shape-fit_f6ec334c-2be8-46e1-84bb-de1cfca8f653.svg?v=1634750553",
    text: "Tucks and lifts in all the right places",
  },
  {
    icon: "https://cdn.shopify.com/s/files/1/0021/4889/2732/files/fabric_1.svg?v=1634750571",
    text: "Opaque, non-see-through fabric",
  },
  {
    icon: "https://cdn.shopify.com/s/files/1/0021/4889/2732/files/Shape-size_b20b04b6-2780-4c4b-988a-969d03601c85.svg?v=1634750553",
    text: "360° smoothing from the waist to ankle",
  },
] as const;

export const PDP_VIDEO_EMBED = "https://www.youtube-nocookie.com/embed/AQGdOxExdRE?controls=0";

export const PDP_DETAILS = {
  compression: "MEDIUM: Serene sculpting for maximum control and confidence.",
  composition: ["96% Polyamide", "4% Elastane"],
  styleNumber: "42075",
} as const;

export const PDP_YMAL = [
  {
    title: "Shapermint Essentials All Day Every Day Scoop Neck Cami",
    href: "https://shapermint.com/products/shapermint-essentials-all-day-every-day-scoop-neck-cami",
    image:
      "https://cdn.shopify.com/s/files/1/0021/4889/2732/files/01_62001_SHM_BLACK_1_42d8b277-c264-4c3b-98d4-f4a833ca36c8.jpg?v=1777486475",
  },
  {
    title: "Truekind Supportive Comfort Wireless Shaping Bra",
    href: "https://shapermint.com/products/truekind-supportive-comfort-wireless-shaping-bra-1",
    image:
      "https://cdn.shopify.com/s/files/1/0021/4889/2732/files/PDP_EBRA_MAIN_IMAGE_1.jpg?v=1787230420",
  },
  {
    title: "Shapermint Essentials Everyday Empower High-Waisted Shaper Shorts",
    href: "https://shapermint.com/products/shapermint-essentials-everyday-empower-high-waisted-shaper-short-1-shm15673-v1",
    image:
      "https://cdn.shopify.com/s/files/1/0021/4889/2732/files/PDP_Bonded_benefit_x3_Black_e2e82935-9e5e-4efb-a388-1527eaa58097.jpg?v=1774800789",
  },
  {
    title: "Shapermint Essentials Ultra-Thin High-Waisted Panties",
    href: "https://shapermint.com/products/shapermint-essentials-ultra-thin-high-waisted-panties",
    image:
      "https://cdn.shopify.com/s/files/1/0021/4889/2732/files/01_54008_HWSP_PDP.jpg?v=1759509214",
  },
] as const;

