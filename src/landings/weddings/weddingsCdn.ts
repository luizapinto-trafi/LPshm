/**
 * Wedding shapewear landing — assets y rutas. Colores: tokens Shapermint (coral, ink, gold) vía Tailwind.
 */
import type { StaticImageData } from "next/image";
import productHero from "@shapermint/assets/product-hero.png";
import lifestyle from "@shapermint/assets/lifestyle.jpg";
import bannerHero from "@shapermint/assets/banner-hero.png";
import gridA from "@shapermint/assets/grid-a.png";
import gridB from "@shapermint/assets/grid-b.png";

export const WeddingsCdn = {
  logoHeader: "https://cdn.shapermint.com/assets/shapermint/images/shapermint_logo_black.svg",
  bagIcon: "https://cdn.shapermint.com/assets/common/icons/navigation/shopping_bag.svg",
} as const;

export const WeddingsPagePath = "/pages/weddings";

/** Imágenes hero: desktop paisaje + mobile vertical. */
export const weddingsHero: { desktop: StaticImageData; mobile: StaticImageData } = {
  desktop: bannerHero,
  mobile: lifestyle,
};

export const weddingsProductThumbs: StaticImageData[] = [productHero, gridA, productHero, gridB];

export const weddingsFeatureImages: StaticImageData[] = [lifestyle, bannerHero, productHero];

export const weddingsReviewBackground: StaticImageData = lifestyle;

export const weddingsCompareBrand: StaticImageData = productHero;
export const weddingsCompareCompetitor: StaticImageData = gridB;
