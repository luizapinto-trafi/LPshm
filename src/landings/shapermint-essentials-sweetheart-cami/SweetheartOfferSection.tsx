import Image from "next/image";
import styled from "styled-components";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "next-i18next/pages";
import { handleKeyDown } from "@/shared/utils/KeyEvent";
import { SweetheartCdn, SweetheartShopUrl } from "./sweetheartCamiCdn";
import { SweetheartPrimaryButton } from "./SweetheartPrimaryButton";
import {
  SweetheartSeeInYourSizeModal,
  type SweetheartSiysSize,
} from "./SweetheartSeeInYourSizeModal";
import { SweetheartSizeGuideModal } from "./SweetheartSizeGuideModal";

/**
 * Offer aligned to Carpe Bundle reference:
 * left-aligned headline strip → gallery + buybox with radio pack tiers,
 * always-on free gift, per-unit color slots, global size, dynamic CTA.
 */
const GALLERY = [
  SweetheartCdn.modelBlack,
  SweetheartCdn.modelChai,
  SweetheartCdn.modelWhite,
  SweetheartCdn.galleryBack,
  SweetheartCdn.galleryBra,
  SweetheartCdn.beforeAfterBack,
  SweetheartCdn.beforeAfterFront,
] as const;

const SIZES = ["S", "M", "L", "XL", "2XL", "3XL", "4XL"] as const;
type SizeId = (typeof SIZES)[number];
type PackQty = 1 | 2 | 3;
type ColorId = "black" | "chai" | "white";

type PackTier = {
  qty: PackQty;
  per?: number;
  was?: number;
  oos?: boolean;
};

const PACK_TIERS: PackTier[] = [
  { qty: 2, per: 32.99, was: 60 },
  { qty: 3, oos: true },
  { qty: 1, per: 38.99, was: 60 },
];

const FIT_CHART: Record<SizeId, { range: string; bust: string; waist: string }> = {
  S: { range: "0-2", bust: "30-31", waist: "23-25.5" },
  M: { range: "4-6", bust: "32-33", waist: "26-28" },
  L: { range: "8-10", bust: "34-36", waist: "29-31" },
  XL: { range: "12-14", bust: "37-39", waist: "32-35" },
  "2XL": { range: "16-18", bust: "40-43", waist: "36-39" },
  "3XL": { range: "20-22", bust: "44-47", waist: "40-43" },
  "4XL": { range: "24-26", bust: "48-51", waist: "44-47" },
};

const COLOR_HEX: Record<ColorId, string> = {
  black: "#1A1A1A",
  chai: "#E8D9C5",
  white: "#F7F4EF",
};

const COLOR_THUMB: Record<ColorId, string> = {
  black: SweetheartCdn.modelBlack,
  chai: SweetheartCdn.modelChai,
  white: SweetheartCdn.modelWhite,
};

const COLORS: ColorId[] = ["black", "chai", "white"];

const GALLERY_BENEFITS = [
  { icon: SweetheartCdn.iconSmoothing, key: "offer.galleryBenefitSmoothing", fallback: "360° Smoothing" },
  { icon: SweetheartCdn.iconAllInOne, key: "offer.galleryBenefitAllInOne", fallback: "All-in-One" },
  { icon: SweetheartCdn.iconSupport, key: "offer.galleryBenefitSupport", fallback: "Bust Support" },
] as const;

/** Before/after slides — hide benefit chips (reference HTML). */
const BENEFIT_HIDDEN_THUMBS = new Set([5, 6]);

const packPct = (per: number, was: number) => Math.round((1 - per / was) * 100);

const StyledOfferHero = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-200);
  @media (min-width: 900px) {
    gap: var(--space-300);
  }
`;

const StyledHeadingStrip = styled.div`
  background: var(--white);
  text-align: left;
  padding: 16px 16px 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  box-sizing: border-box;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  @media (min-width: 900px) {
    padding: 24px var(--space-400) 8px;
  }
`;

const StyledPromoTitle = styled.h1`
  font-family: var(--font-display);
  font-size: clamp(21px, 3vw, 32px);
  font-weight: 700;
  line-height: 1.08;
  color: var(--ink-900);
  margin: 0;
  letter-spacing: 0;
  @media (min-width: 900px) {
    font-size: clamp(28px, 3.4vw, 42px);
  }
`;

const StyledSubtitle = styled.p`
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 400;
  line-height: 1.45;
  color: var(--ink-600);
  margin: 0;
  max-width: 42rem;
  strong {
    font-weight: 700;
    color: var(--ink-900);
  }
`;

const StyledSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 10px 32px;
  box-sizing: border-box;
  width: 100%;
  @media (min-width: 900px) {
    padding: 0 var(--space-400) var(--space-1000);
  }
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 14px;
  align-items: start;
  width: 100%;
  min-width: 0;
  @media (min-width: 900px) {
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    gap: var(--space-800);
  }
`;

const StyledGalleryCol = styled.div`
  min-width: 0;
  width: 100%;
  @media (min-width: 900px) {
    position: sticky;
    top: 104px;
    align-self: start;
  }
`;

const StyledBuybox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 0;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
`;

const StyledCtaBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: stretch;
  margin-top: 4px;
  width: 100%;
  max-width: 400px;
  min-width: 0;
`;

const StyledProductTitle = styled.h2`
  font-family: var(--font-body);
  font-size: clamp(22px, 3vw, 28px);
  font-weight: 600;
  line-height: 1.25;
  color: var(--ink-900);
  margin: 0;
  letter-spacing: 0;
`;

const StyledGallery = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  align-items: stretch;
  @media (min-width: 900px) {
    display: grid;
    grid-template-columns: 65px minmax(0, 1fr);
    grid-template-rows: max-content max-content;
    column-gap: 20px;
    row-gap: 12px;
    align-items: start;
  }
`;

const StyledThumbs = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
  order: 2;
  width: 100%;
  box-sizing: border-box;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  padding-bottom: 2px;
  @media (max-width: 899px) {
    height: auto !important;
    max-height: none !important;
  }
  @media (min-width: 900px) {
    flex-direction: column;
    grid-column: 1;
    grid-row: 1;
    order: unset;
    gap: 12px;
    align-self: start;
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior: contain;
    padding-bottom: 0;
  }
`;

const StyledThumbBtn = styled.button<{ $active?: boolean; $hiddenMobile?: boolean }>`
  list-style: none;
  display: ${({ $hiddenMobile }) => ($hiddenMobile ? "none" : "flex")};
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  padding: 0;
  border-radius: 7px;
  border: 2px solid ${({ $active }) => ($active ? "var(--ink-900)" : "transparent")};
  overflow: hidden;
  background: var(--white);
  cursor: pointer;
  line-height: 0;
  flex: 0 0 auto;
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
  @media (min-width: 900px) {
    display: flex;
    width: 65px;
    height: 86px;
    border-radius: 4px;
    border: 1px solid ${({ $active }) => ($active ? "var(--ink-900)" : "var(--ink-200)")};
  }
`;

const StyledMainImage = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  aspect-ratio: 3 / 4;
  background: #f0eae0;
  line-height: 0;
  align-self: start;
  order: 1;
  border-radius: 14px;
  @media (min-width: 900px) {
    grid-column: 2;
    grid-row: 1;
    order: unset;
    border-radius: 0;
  }
`;

const StyledArrow = styled.button<{ $side: "left" | "right" }>`
  position: absolute;
  top: 50%;
  ${({ $side }) => ($side === "left" ? "left: 10px;" : "right: 10px;")}
  z-index: 3;
  transform: translateY(-50%);
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid var(--ink-200);
  display: grid;
  place-items: center;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  color: var(--ink-900);
  padding: 0;
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
  @media (min-width: 900px) {
    display: none;
  }
`;

const StyledSeal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  line-height: 0;
  height: 22px;
  width: auto;
  img {
    display: block;
    height: 22px;
    width: auto;
  }
`;

const StyledNewIn = styled.div`
  position: absolute;
  bottom: 12px;
  left: 0;
  z-index: 2;
  line-height: 0;
  width: 85px;
  height: 24px;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const StyledGalleryBenefits = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-end;
`;

const StyledBenefitChip = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.94);
  border-radius: 999px;
  padding: 6px 12px 6px 8px;
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 800;
  color: var(--ink-900);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
  white-space: nowrap;
  line-height: 1;
  img {
    width: 18px;
    height: 18px;
    object-fit: contain;
  }
`;

const StyledSeeSizeWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  order: 3;
  margin-top: 4px;
  @media (min-width: 900px) {
    grid-column: 2;
    grid-row: 2;
    order: unset;
    margin-top: 0;
  }
`;

const StyledSeeSize = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 0.688rem 2rem;
  border: 1px solid var(--ink-900);
  border-radius: 0.5rem;
  background: var(--white);
  color: var(--ink-900);
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 1;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  transition: background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out);
  &:hover {
    background: var(--ink-900);
    color: var(--white);
  }
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

const StyledMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin: 0;
`;

const StyledStars = styled.span`
  color: var(--gold-500);
  font-size: 14px;
  letter-spacing: 1px;
  line-height: 1;
`;

const StyledReviewsLink = styled.a`
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 0.875rem;
  color: var(--ink-900);
  text-decoration: underline;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledChoose = styled.p`
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 400;
  margin: 0;
  color: var(--ink-900);
`;

const StyledOfferSelection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 400px;
  min-width: 0;
`;

const StyledPacks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  margin: 14px 0 0;
  width: 100%;
  padding-top: 4px;
`;

const StyledPack = styled.div<{ $selected?: boolean; $oos?: boolean; $hasBadge?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: ${({ $hasBadge }) => ($hasBadge ? "26px 20px 16px" : "16px 20px")};
  border-radius: 14px;
  border: 2px solid
    ${({ $selected, $oos }) =>
      $oos ? "var(--ink-200)" : $selected ? "var(--coral-500)" : "var(--ink-200)"};
  background: ${({ $selected, $oos }) =>
    $oos ? "var(--ink-100)" : $selected ? "var(--coral-050)" : "var(--white)"};
  cursor: ${({ $oos }) => ($oos ? "not-allowed" : "pointer")};
  box-sizing: border-box;
  outline: none;
  isolation: isolate;
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

const StyledPackBadge = styled.span<{ $variant: "best" | "oos" }>`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.04em;
  line-height: 1;
  text-transform: uppercase;
  padding: 5px 12px;
  border-radius: 999px;
  color: var(--white);
  white-space: nowrap;
  pointer-events: none;
  background: ${({ $variant }) => ($variant === "best" ? "var(--mint-500)" : "#882A2B")};
`;

const StyledRadio = styled.span<{ $selected?: boolean; $oos?: boolean }>`
  width: 22px;
  height: 22px;
  border-radius: 999px;
  border: 2px solid ${({ $selected }) => ($selected ? "var(--coral-500)" : "var(--ink-300)")};
  flex-shrink: 0;
  position: relative;
  opacity: ${({ $oos }) => ($oos ? 0.5 : 1)};
  &::after {
    content: "";
    position: absolute;
    inset: 4px;
    border-radius: 999px;
    background: var(--coral-500);
    display: ${({ $selected }) => ($selected ? "block" : "none")};
  }
`;

const StyledPackText = styled.div`
  flex: 1;
  text-align: center;
  margin-right: 22px;
  min-width: 0;
`;

const StyledPackTitle = styled.div<{ $muted?: boolean }>`
  font-family: var(--font-body);
  font-size: 19px;
  font-weight: 800;
  color: ${({ $muted }) => ($muted ? "var(--ink-500)" : "var(--ink-900)")};
  line-height: 1.2;
`;

const StyledPackPrice = styled.div`
  font-family: var(--font-body);
  font-size: 19px;
  font-weight: 800;
  color: var(--ink-900);
  margin-top: 4px;
  line-height: 1.2;
  s {
    display: block;
    color: var(--ink-500);
    font-weight: 600;
    font-size: 14px;
    text-decoration: line-through;
    margin: 0 0 2px;
  }
  span {
    font-size: 14px;
    color: var(--ink-500);
    font-weight: 600;
  }
`;

const StyledGiftBlock = styled.div<{ $inactive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  background: #f5faf9;
  border: 1px dashed var(--mint-600);
  box-sizing: border-box;
  opacity: ${({ $inactive }) => ($inactive ? 0.5 : 1)};
  filter: ${({ $inactive }) => ($inactive ? "grayscale(1)" : "none")};
  transition: opacity 0.2s ease, filter 0.2s ease;
`;

const StyledGiftThumb = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  flex: 0 0 auto;
  background: var(--white);
`;

const StyledGiftCopy = styled.div`
  min-width: 0;
`;

const StyledGiftPrice = styled.p`
  margin: 0 0 2px;
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 1.2;
  s {
    color: var(--ink-500);
    font-weight: 400;
  }
  strong {
    color: var(--sale);
    font-weight: 800;
    text-transform: uppercase;
  }
`;

const StyledGiftName = styled.h4`
  margin: 0;
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 700;
  color: var(--ink-900);
  line-height: 1.25;
`;

const StyledSlotPanels = styled.div`
  border: 1px solid var(--ink-200);
  border-radius: 14px;
  background: var(--white);
  padding: 14px 16px;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
`;

const StyledColorSummary = styled.div`
  font-size: 13.5px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--ink-200);
  margin-bottom: 4px;
  color: var(--ink-900);
`;

const StyledSlotUnit = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 10px 0;
  border-bottom: 1px solid var(--ink-200);
  &:last-of-type {
    border-bottom: none;
  }
`;

const StyledSlotThumbWrap = styled.div`
  width: 108px;
  flex: 0 0 108px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledSlotThumb = styled.div`
  width: 52px;
  height: 66px;
  min-width: 52px;
  min-height: 66px;
  max-width: 52px;
  max-height: 66px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  flex: 0 0 auto;
  background: var(--ink-100);
`;

const StyledColorFlagSlot = styled.div`
  width: 100%;
  min-height: 28px;
  margin-top: 6px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const StyledColorFlag = styled.span<{ $variant: "bestseller" | "backinstock"; $hidden?: boolean }>`
  display: inline-block;
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 0.02em;
  padding: 3px 10px;
  border-radius: 999px;
  text-align: center;
  white-space: nowrap;
  visibility: ${({ $hidden }) => ($hidden ? "hidden" : "visible")};
  background: ${({ $variant }) => ($variant === "bestseller" ? "#FBE4D8" : "#DDF0E0")};
  color: ${({ $variant }) => ($variant === "bestseller" ? "#D4605B" : "#3F9754")};
`;

const StyledSlotBody = styled.div`
  min-width: 0;
  flex: 1 1 auto;
`;

const StyledSlotUnitLabel = styled.div`
  font-size: 13px;
  margin-bottom: 8px;
  color: var(--ink-900);
  strong {
    font-weight: 800;
  }
`;

const StyledSwatches = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledSwatch = styled.button<{ $bg: string; $selected?: boolean; $light?: boolean }>`
  width: 26px;
  height: 26px;
  border-radius: 999px;
  background: ${({ $bg }) => $bg};
  border: 2px solid ${({ $selected }) => ($selected ? "var(--ink-900)" : "transparent")};
  box-shadow: ${({ $light, $selected }) =>
    !$selected && $light ? "0 0 0 1px var(--ink-300)" : "none"};
  cursor: pointer;
  padding: 0;
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

const StyledSizeGuide = styled.div`
  border-top: 1px solid var(--ink-200);
  padding-top: 12px;
  margin: 8px 0 0;
  width: 100%;
`;

const StyledSizeGuideBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-body);
  font-size: 12.5px;
  font-weight: 700;
  color: var(--ink-900);
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  margin: 10px 0 8px;
  &:hover {
    color: var(--ink-700);
  }
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

const StyledSizePicker = styled.div`
  width: 100%;
  scroll-margin-top: 72px;
`;

const StyledSizeLabel = styled.div`
  font-size: 14px;
  margin: 12px 0 8px;
  color: var(--ink-900);
`;

const StyledSizes = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  width: 100%;
`;

const StyledSizeChip = styled.button<{ $selected?: boolean }>`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 38px;
  min-width: 64px;
  min-height: 38px;
  padding: 0;
  margin: 0 8px 10px 0;
  border-radius: 4px;
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 400;
  line-height: 1;
  cursor: pointer;
  background: ${({ $selected }) => ($selected ? "var(--ink-900)" : "var(--white)")};
  color: ${({ $selected }) => ($selected ? "var(--white)" : "var(--ink-900)")};
  border: 1px solid ${({ $selected }) => ($selected ? "var(--ink-900)" : "var(--ink-300)")};
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

const StyledFits = styled.div`
  font-size: 12px;
  line-height: 1.5;
  margin: 0;
  width: 100%;
  color: var(--ink-900);
`;

const StyledIconRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px 18px;
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;
  color: var(--ink-900);
  text-align: center;
`;

const StyledIconItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const StyledReturn = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin: 0;
  padding: 16px;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
  background: var(--ink-100);
  border-radius: var(--radius-lg);
`;

const StyledReturnTitle = styled.div`
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  color: var(--ink-900);
  margin: 0 0 6px;
`;

const StyledReturnBody = styled.div`
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--ink-900);
  line-height: 1.5;
`;

const colorName = (c: ColorId, t: (k: string, o?: Record<string, unknown>) => string) =>
  c === "black" ? t("offer.colorBlack") : c === "chai" ? t("offer.colorChai") : t("offer.colorWhite");

const colorFlag = (
  c: ColorId,
  t: (k: string, o?: Record<string, unknown>) => string,
): { variant: "bestseller" | "backinstock"; label: string } | null => {
  if (c === "black") return { variant: "bestseller", label: t("offer.flagBestSeller") };
  if (c === "white") return { variant: "backinstock", label: t("offer.flagBackInStock") };
  return null;
};

export const SweetheartOfferSection = () => {
  const { t } = useTranslation("sweetheartCami");
  const [packQty, setPackQty] = useState<PackQty>(2);
  const [size, setSize] = useState<SizeId>("S");
  const [siysOpen, setSiysOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [slotColors, setSlotColors] = useState<ColorId[]>(["black", "black"]);
  const [activeThumb, setActiveThumb] = useState(0);
  const [thumbsHeight, setThumbsHeight] = useState(0);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSlotColors((prev) =>
      Array.from({ length: packQty }, (_, i) => prev[i] ?? "black"),
    );
  }, [packQty]);

  useLayoutEffect(() => {
    const el = mainImageRef.current;
    if (!el) return;

    const sync = () => {
      const h = Math.round(el.getBoundingClientRect().height);
      setThumbsHeight((prev) => (h > 0 && h !== prev ? h : prev));
    };

    sync();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(sync) : null;
    ro?.observe(el);
    window.addEventListener("resize", sync);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, [activeThumb]);

  useLayoutEffect(() => {
    const rail = thumbsRef.current;
    if (!rail) return;
    const active = rail.querySelector<HTMLElement>(`[data-thumb-index="${activeThumb}"]`);
    active?.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
  }, [activeThumb]);

  const thumbs = t("offer.thumbs", { returnObjects: true }) as string[];
  const activeTier = PACK_TIERS.find((p) => p.qty === packQty && !p.oos) ?? PACK_TIERS[0];
  const pct = useMemo(() => {
    if (!activeTier.per || !activeTier.was) return 45;
    return packPct(activeTier.per, activeTier.was);
  }, [activeTier]);

  const ctaLabel = t("offer.ctaDynamic", {
    pct,
    defaultValue: `Add to Cart · ${pct}% OFF`,
  });

  const colorSummary = slotColors.map((c) => colorName(c, t)).join(", ");

  const setSlotColor = (index: number, color: ColorId) => {
    setSlotColors((prev) => prev.map((c, i) => (i === index ? color : c)));
  };

  const shiftThumb = (delta: number) => {
    setActiveThumb((i) => (i + delta + GALLERY.length) % GALLERY.length);
  };

  const openSeeInYourSize = () => setSiysOpen(true);

  const selectPack = (tier: PackTier) => {
    if (tier.oos) return;
    setPackQty(tier.qty);
  };

  return (
    <StyledOfferHero>
      <SweetheartSeeInYourSizeModal
        open={siysOpen}
        initialSize={size as SweetheartSiysSize}
        onClose={() => setSiysOpen(false)}
        onSelect={(next) => {
          setSize(next);
          setSiysOpen(false);
          window.requestAnimationFrame(() => {
            document.getElementById("sweetheart-size-picker")?.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
            });
          });
        }}
      />
      <SweetheartSizeGuideModal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
      <StyledHeadingStrip>
        <StyledPromoTitle id="sweetheart-promo-title">
          {t("offer.promoTitle", { defaultValue: "Save Up To 45% Off + a Free Gift" })}
        </StyledPromoTitle>
        <StyledSubtitle>
          {t("offer.subtitleBefore", { defaultValue: "With today's" })}{" "}
          <strong>{t("offer.subtitleProduct", { defaultValue: "Sweetheart Cami" })}</strong>{" "}
          {t("offer.subtitleAfter", { defaultValue: "bundle offer" })}
        </StyledSubtitle>
      </StyledHeadingStrip>

      <StyledSection id="offer" aria-labelledby="sweetheart-promo-title">
        <StyledGrid>
          <StyledGalleryCol>
            <StyledGallery>
              <StyledThumbs
                ref={thumbsRef}
                role="list"
                aria-label={t("offer.galleryThumbsAria")}
                style={thumbsHeight > 0 ? { height: thumbsHeight, maxHeight: thumbsHeight } : undefined}
              >
                {GALLERY.map((src, i) => (
                  <StyledThumbBtn
                    key={src}
                    type="button"
                    data-thumb-index={i}
                    $active={activeThumb === i}
                    $hiddenMobile={i >= 5}
                    aria-label={thumbs[i]}
                    aria-pressed={activeThumb === i}
                    onClick={() => setActiveThumb(i)}
                  >
                    <Image
                      src={src}
                      alt=""
                      width={65}
                      height={86}
                      unoptimized
                      style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    />
                  </StyledThumbBtn>
                ))}
              </StyledThumbs>
              <StyledMainImage ref={mainImageRef}>
                <Image
                  src={GALLERY[activeThumb]}
                  alt={t("offer.galleryMainAlt")}
                  fill
                  unoptimized
                  priority={activeThumb === 0}
                  sizes="(max-width: 899px) 100vw, 55vw"
                  style={{ objectFit: "cover", objectPosition: "center 15%" }}
                />
                <StyledArrow
                  type="button"
                  $side="left"
                  aria-label={t("offer.galleryPrev")}
                  onClick={() => shiftThumb(-1)}
                >
                  ‹
                </StyledArrow>
                <StyledArrow
                  type="button"
                  $side="right"
                  aria-label={t("offer.galleryNext")}
                  onClick={() => shiftThumb(1)}
                >
                  ›
                </StyledArrow>
                <StyledSeal>
                  <Image
                    src={SweetheartCdn.sealSale}
                    alt={t("offer.sealAlt")}
                    width={134}
                    height={22}
                    unoptimized
                    style={{ display: "block", height: 22, width: "auto" }}
                  />
                </StyledSeal>
                <StyledNewIn>
                  <Image
                    src={SweetheartCdn.sealNewIn}
                    alt={t("offer.newInAlt")}
                    width={85}
                    height={24}
                    unoptimized
                  />
                </StyledNewIn>
                {!BENEFIT_HIDDEN_THUMBS.has(activeThumb) ? (
                  <StyledGalleryBenefits aria-hidden>
                    {GALLERY_BENEFITS.map(({ icon, key, fallback }) => (
                      <StyledBenefitChip key={key}>
                        <Image src={icon} alt="" width={18} height={18} unoptimized />
                        {t(key, { defaultValue: fallback })}
                      </StyledBenefitChip>
                    ))}
                  </StyledGalleryBenefits>
                ) : null}
              </StyledMainImage>
              <StyledSeeSizeWrap>
                <StyledSeeSize type="button" onClick={openSeeInYourSize}>
                  {t("offer.seeInYourSize")}
                </StyledSeeSize>
              </StyledSeeSizeWrap>
            </StyledGallery>
          </StyledGalleryCol>

          <StyledBuybox>
            <StyledProductTitle>{t("offer.productTitle")}</StyledProductTitle>

            <StyledMeta>
              <StyledStars aria-label={t("offer.starsAria")}>★★★★★</StyledStars>
              <StyledReviewsLink href="#reviews">{t("offer.reviewsLink")}</StyledReviewsLink>
            </StyledMeta>

            <StyledOfferSelection>
              <StyledChoose>
                {t("offer.chooseSavings")}{" "}
                <strong>
                  {packQty === 1
                    ? t("offer.pack1Title", { defaultValue: "1 Cami" })
                    : t("offer.packNTitle", { qty: packQty, defaultValue: `${packQty} Pack` })}
                </strong>
              </StyledChoose>

              <StyledPacks role="radiogroup" aria-label={t("offer.chooseSavings")}>
                {PACK_TIERS.map((tier) => {
                  const selected = !tier.oos && packQty === tier.qty;
                  const hasBadge = tier.qty === 2 || Boolean(tier.oos);
                  const strike =
                    tier.qty === 1
                      ? t("offer.pack1Strike")
                      : tier.qty === 2
                        ? t("offer.pack2Strike")
                        : null;
                  const final =
                    tier.qty === 1
                      ? t("offer.pack1Final")
                      : tier.qty === 2
                        ? t("offer.pack2Final")
                        : null;
                  const title =
                    tier.qty === 1
                      ? t("offer.pack1Title", { defaultValue: "1 Cami" })
                      : t("offer.packNTitle", { qty: tier.qty, defaultValue: `${tier.qty} Pack` });

                  return (
                    <StyledPack
                      key={tier.qty}
                      role="radio"
                      tabIndex={tier.oos ? -1 : 0}
                      $selected={selected}
                      $oos={tier.oos}
                      $hasBadge={hasBadge}
                      aria-checked={selected}
                      aria-disabled={tier.oos || undefined}
                      aria-label={
                        tier.oos
                          ? t("offer.pack3Aria", { defaultValue: "3 Pack, out of stock" })
                          : tier.qty === 1
                            ? t("offer.pack1Aria")
                            : t("offer.pack2Aria")
                      }
                      onClick={() => selectPack(tier)}
                      onKeyDown={(e) =>
                        handleKeyDown(e, () => selectPack(tier), ["Enter", " "])
                      }
                    >
                      {tier.qty === 2 ? (
                        <StyledPackBadge $variant="best">
                          {t("offer.pack2Badge", { defaultValue: "Best Deal" })}
                        </StyledPackBadge>
                      ) : null}
                      {tier.oos ? (
                        <StyledPackBadge $variant="oos">
                          {t("offer.pack3Badge", { defaultValue: "Out of Stock" })}
                        </StyledPackBadge>
                      ) : null}
                      <StyledRadio $selected={selected} $oos={tier.oos} aria-hidden />
                      <StyledPackText>
                        <StyledPackTitle $muted={tier.oos}>{title}</StyledPackTitle>
                        {final && strike ? (
                          <StyledPackPrice>
                            <s>{strike}</s>
                            {final}
                            {tier.qty === 2 ? <span>{t("offer.pack2Each")}</span> : null}
                          </StyledPackPrice>
                        ) : null}
                      </StyledPackText>
                    </StyledPack>
                  );
                })}
              </StyledPacks>

              <StyledGiftBlock $inactive={packQty === 1} aria-label={t("offer.giftName")}>
                <StyledGiftThumb>
                  <Image
                    src={SweetheartCdn.giftBottom}
                    alt=""
                    fill
                    sizes="56px"
                    unoptimized
                    style={{ objectFit: "cover" }}
                  />
                </StyledGiftThumb>
                <StyledGiftCopy>
                  <StyledGiftPrice>
                    <s>{t("offer.giftPriceWas")}</s>
                    <strong>{t("offer.giftPriceNow")}</strong>
                  </StyledGiftPrice>
                  <StyledGiftName>{t("offer.giftName")}</StyledGiftName>
                </StyledGiftCopy>
              </StyledGiftBlock>
            </StyledOfferSelection>

            <StyledSlotPanels>
              <StyledColorSummary>
                {t("offer.colorLabel")} <strong>{colorSummary}</strong>
              </StyledColorSummary>

              {slotColors.map((color, index) => {
                const flag = colorFlag(color, t);
                return (
                  <StyledSlotUnit key={`unit-${index}`}>
                    <StyledSlotThumbWrap>
                      <StyledSlotThumb>
                        <Image
                          src={COLOR_THUMB[color]}
                          alt={t("offer.colorThumbAlt")}
                          fill
                          sizes="52px"
                          unoptimized
                          style={{ objectFit: "cover" }}
                        />
                      </StyledSlotThumb>
                      <StyledColorFlagSlot aria-hidden={!flag}>
                        <StyledColorFlag
                          $variant={flag?.variant ?? "bestseller"}
                          $hidden={!flag}
                        >
                          {flag?.label ?? t("offer.flagBestSeller")}
                        </StyledColorFlag>
                      </StyledColorFlagSlot>
                    </StyledSlotThumbWrap>
                    <StyledSlotBody>
                      <StyledSlotUnitLabel>
                        {t("offer.unitLabel", { n: index + 1, defaultValue: `Unit #${index + 1}` })}
                        {": "}
                        <strong>{colorName(color, t)}</strong>
                      </StyledSlotUnitLabel>
                      <StyledSwatches>
                        {COLORS.map((c) => (
                          <StyledSwatch
                            key={c}
                            type="button"
                            $bg={COLOR_HEX[c]}
                            $selected={color === c}
                            $light={c === "white" || c === "chai"}
                            aria-label={
                              c === "black"
                                ? t("offer.swatchBlackAria")
                                : c === "chai"
                                  ? t("offer.swatchChaiAria")
                                  : t("offer.swatchWhiteAria")
                            }
                            aria-pressed={color === c}
                            onClick={() => setSlotColor(index, c)}
                          />
                        ))}
                      </StyledSwatches>
                    </StyledSlotBody>
                  </StyledSlotUnit>
                );
              })}

              <StyledSizeGuide>
                <StyledSizeGuideBtn type="button" onClick={() => setSizeGuideOpen(true)}>
                  <Image src={SweetheartCdn.iconSizeGuide} alt="" width={24} height={12} unoptimized />
                  <span>{t("offer.sizeGuide")}</span>
                </StyledSizeGuideBtn>
              </StyledSizeGuide>

              <StyledSizePicker id="sweetheart-size-picker">
                <StyledSizeLabel>
                  {t("offer.sizeHeading")} <strong>{size}</strong>
                </StyledSizeLabel>
                <StyledSizes>
                  {SIZES.map((s) => (
                    <StyledSizeChip
                      key={s}
                      type="button"
                      $selected={size === s}
                      onClick={() => setSize(s)}
                    >
                      {s}
                    </StyledSizeChip>
                  ))}
                </StyledSizes>
              </StyledSizePicker>

              <StyledFits>
                Fits sizes: <strong>{FIT_CHART[size].range}</strong>
                {" | "}
                Bust: <strong>{FIT_CHART[size].bust} in</strong>
                {", "}
                Waist: <strong>{FIT_CHART[size].waist} in</strong>
              </StyledFits>
            </StyledSlotPanels>

            <StyledCtaBlock>
              <div id="sweetheart-pdp-cta">
                <SweetheartPrimaryButton $wide href={SweetheartShopUrl}>
                  {ctaLabel}
                </SweetheartPrimaryButton>
              </div>
              <StyledIconRow>
                <StyledIconItem>
                  <span aria-hidden>🎁</span>
                  {t("offer.iconGift", { defaultValue: "Free Gift Included" })}
                </StyledIconItem>
                <StyledIconItem>
                  <span aria-hidden>✓</span>
                  {t("offer.iconCheckout", { defaultValue: "Fast & Easy Checkout" })}
                </StyledIconItem>
              </StyledIconRow>
            </StyledCtaBlock>

            <StyledReturn>
              <Image src={SweetheartCdn.iconReturn} alt="" width={34} height={34} unoptimized />
              <div>
                <StyledReturnTitle>{t("offer.returnTitle")}</StyledReturnTitle>
                <StyledReturnBody>
                  {t("offer.returnBody", {
                    defaultValue:
                      "Hassle-free exchanges for any size, color or style. No questions asked.",
                  })}
                </StyledReturnBody>
              </div>
            </StyledReturn>
          </StyledBuybox>
        </StyledGrid>
      </StyledSection>
    </StyledOfferHero>
  );
};
