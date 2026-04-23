/**
 * Landing duplicada desde duplicated-landing (2).html — assets vía Shapermint DS.
 */
import type { StaticImageData } from "next/image";
import productHero from "@shapermint/assets/product-hero.png";
import lifestyle from "@shapermint/assets/lifestyle.jpg";
import bannerHero from "@shapermint/assets/banner-hero.png";

export const GummiesDuplicateCdn = {
  logoHeader:
    "https://cdn.shapermint.com/assets/shapermint/images/shapermint_logo_black.svg",
  bagIcon:
    "https://cdn.shapermint.com/assets/common/icons/navigation/shopping_bag.svg",
  seal:
    "https://cdn.shapermint.com/assets/shapermint/images/seals/seal-selling-fast.svg?width=226",
} as const;

export const GummiesDuplicateGallery: StaticImageData[] = [productHero, lifestyle, bannerHero, productHero];

export const GummiesDuplicatePagePath = "/pages/gummies-duplicate-landing";
