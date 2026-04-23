/**
 * Assets Shapermint / design system para la réplica de first-order-olipop.
 * (Referencia de secciones: browser-mcp → gruns.co/pages/first-order-olipop)
 */
import type { StaticImageData } from "next/image";
import productHero from "@shapermint/assets/product-hero.png";
import lifestyle from "@shapermint/assets/lifestyle.jpg";
import bannerHero from "@shapermint/assets/banner-hero.png";

export const GrunsOlipopCdn = {
  logoHeader:
    "https://cdn.shapermint.com/assets/shapermint/images/shapermint_logo_black.svg",
  bagIcon:
    "https://cdn.shapermint.com/assets/common/icons/navigation/shopping_bag.svg",
  seal:
    "https://cdn.shapermint.com/assets/shapermint/images/seals/seal-selling-fast.svg?width=226",
} as const;

export const GrunsOlipopGallery: StaticImageData[] = [
  productHero,
  lifestyle,
  bannerHero,
];

export const GrunsOlipopPagePath = "/pages/gruns-first-order-olipop";
