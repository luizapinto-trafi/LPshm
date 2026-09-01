import Image from "next/image";
import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
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
  { qty: 3, per: 29.99, was: 60 },
  { qty: 2, per: 32.99, was: 60 },
  { qty: 1, per: 38.99, was: 60 },
];

const BEST_DEAL_QTY: PackQty = 3;

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

const packSaveDollars = (tier: PackTier) => {
  if (!tier.per || !tier.was) return 0;
  return Math.round(tier.was * tier.qty - tier.per * tier.qty);
};

const SELECTABLE_PACK_TIERS = [...PACK_TIERS].sort((a, b) => a.qty - b.qty);

/** Display order: best deal first (3 → 2 → 1). */
const DISPLAY_PACK_TIERS = [...SELECTABLE_PACK_TIERS].sort((a, b) => b.qty - a.qty);

const packStrikeFor = (tier: PackTier) => {
  if (!tier.was) return "";
  return `$${(tier.was * tier.qty).toFixed(2)}`;
};

const packFinalFor = (tier: PackTier) => {
  if (!tier.per) return "";
  return `$${tier.per.toFixed(2)}`;
};

const packAriaFor = (qty: PackQty, t: (k: string, o?: Record<string, unknown>) => string) => {
  if (qty === 1) return t("offer.pack1Aria", { defaultValue: "Select 1 unit for $38.99" });
  if (qty === 2) {
    return t("offer.pack2Aria", {
      defaultValue: "Select 2 Pack for $32.99 each, includes a free gift",
    });
  }
  return t("offer.pack3Aria", {
    defaultValue: "Select 3 units for $29.99 each, includes a free gift and free shipping",
  });
};

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
  gap: 12px;
  width: 100%;
  align-items: stretch;
`;

const StyledMainImage = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  aspect-ratio: 3 / 4;
  background: #f0eae0;
  line-height: 0;
  border-radius: 14px;
  @media (min-width: 900px) {
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
  font-weight: 700;
  margin: 0;
  color: var(--ink-900);
`;

const StyledOfferSelection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  min-width: 0;
`;

const StyledPacks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding-top: 6px;
`;

const StyledPackCard = styled.div<{ $selected?: boolean }>`
  position: relative;
  border-radius: 10px;
  border: ${({ $selected }) =>
    $selected ? "2px solid var(--mint-500)" : "1px solid var(--ink-300)"};
  background: ${({ $selected }) => ($selected ? "#F5FAF9" : "var(--white)")};
  box-sizing: border-box;
  overflow: visible;
  cursor: pointer;
  transition:
    border-color 0.22s ease,
    background-color 0.22s ease;
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

const StyledPackHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  box-sizing: border-box;
`;

const StyledPackRadio = styled.span<{ $selected?: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 999px;
  border: 2px solid var(--ink-900);
  flex: 0 0 auto;
  margin-top: 1px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  &::after {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: ${({ $selected }) => ($selected ? "var(--ink-900)" : "transparent")};
  }
`;

const StyledPackMain = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
`;

const StyledPackInfo = styled.div`
  flex-shrink: 0;
  min-width: 0;
`;

const StyledPackTitle = styled.div`
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 700;
  color: var(--ink-900);
  line-height: 1.15;
`;

const StyledPackGiftLine = styled.p`
  margin: 2px 0 0;
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.03em;
  line-height: 1.15;
  text-transform: uppercase;
  color: var(--sale);
  white-space: nowrap;
`;

const StyledPackPricing = styled.div`
  flex: 0 0 auto;
  text-align: right;
`;

const StyledPackCompareRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  gap: 4px;
  flex-wrap: nowrap;
  font-family: var(--font-body);
  font-size: 12px;
  line-height: 1.15;
  s {
    color: var(--ink-500);
    font-weight: 400;
    text-decoration: line-through;
  }
  strong {
    font-size: 14px;
    font-weight: 800;
    color: var(--ink-900);
  }
  span {
    font-size: 11px;
    font-weight: 400;
    color: var(--ink-600);
  }
`;

const StyledPackSaveLine = styled.div`
  margin-top: 2px;
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 800;
  line-height: 1.15;
  color: var(--sale);
`;

const StyledPackDealBadge = styled.span`
  position: absolute;
  top: 0;
  right: 10px;
  transform: translateY(-50%);
  z-index: 2;
  font-family: var(--font-body);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.02em;
  line-height: 1;
  text-transform: uppercase;
  padding: 4px 8px;
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
  color: var(--white);
  background: var(--sale);
`;

const StyledPackExpand = styled.div<{ $open?: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? "1fr" : "0fr")};
  padding: 0 12px;
  transition: grid-template-rows 0.28s ease, padding-bottom 0.28s ease;
  padding-bottom: ${({ $open }) => ($open ? "10px" : "0")};
`;

const StyledPackExpandInner = styled.div`
  overflow: hidden;
  min-height: 0;
  padding-top: 8px;
  border-top: 1px solid var(--ink-200);
`;

const StyledUnlockedWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

const StyledPerkRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-height: 24px;
`;

const StyledPerkIcon = styled.div<{ $plain?: boolean }>`
  width: 24px;
  height: 24px;
  flex: 0 0 auto;
  position: relative;
  border-radius: ${({ $plain }) => ($plain ? "0" : "4px")};
  overflow: ${({ $plain }) => ($plain ? "visible" : "hidden")};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $plain }) => ($plain ? "transparent" : "var(--white)")};
`;

const StyledPerkText = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  font-family: var(--font-body);
  font-size: 12px;
  line-height: 1.2;
  color: var(--ink-900);
  strong {
    font-weight: 800;
    margin-right: 4px;
  }
`;

const StyledPerkWas = styled.span`
  flex: 0 0 auto;
  font-family: var(--font-body);
  font-size: 12px;
  line-height: 1.2;
  color: var(--ink-500);
  text-decoration: line-through;
`;

const StyledColorSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 4px;
`;

const StyledSlotPanels = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
`;

const StyledColorSummary = styled.div`
  font-size: 14px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--ink-200);
  margin-bottom: 0;
  color: var(--ink-900);
  strong {
    font-weight: 700;
  }
`;

const StyledSlotUnit = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--ink-200);
  &:last-of-type {
    border-bottom: none;
  }
`;

const StyledSlotThumbWrap = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
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
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledColorFlag = styled.span<{ $variant: "bestseller" | "backinstock" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 22px;
  padding: 0 10px;
  border-radius: 2px;
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0.02em;
  text-align: center;
  text-transform: uppercase;
  white-space: nowrap;
  background: ${({ $variant }) => ($variant === "bestseller" ? "#FCD9D1" : "#DDF0E0")};
  color: ${({ $variant }) => ($variant === "bestseller" ? "#231F20" : "#3F9754")};
`;

const StyledSlotBody = styled.div`
  min-width: 0;
  flex: 0 1 auto;
`;

const StyledSlotUnitLabel = styled.div`
  font-size: 13px;
  margin-bottom: 6px;
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
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: ${({ $bg }) => $bg};
  border: 2px solid ${({ $selected }) => ($selected ? "var(--ink-900)" : "transparent")};
  box-shadow: ${({ $selected, $light }) => {
    if ($selected) return "0 0 0 2px var(--white), 0 0 0 3px var(--ink-900)";
    if ($light) return "inset 0 0 0 1px var(--ink-300)";
    return "none";
  }};
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
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
  const [packQty, setPackQty] = useState<PackQty>(3);
  const [size, setSize] = useState<SizeId>("S");
  const [siysOpen, setSiysOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [slotColors, setSlotColors] = useState<ColorId[]>(["black", "black", "black"]);
  const [activeThumb, setActiveThumb] = useState(0);

  useEffect(() => {
    setSlotColors((prev) =>
      Array.from({ length: packQty }, (_, i) => prev[i] ?? "black"),
    );
  }, [packQty]);

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
    setPackQty(tier.qty);
  };

  const packUnitsTitle = (tier: PackTier) =>
    tier.qty === 1
      ? t("offer.pack1UnitsTitle", { defaultValue: "1 Unit" })
      : t("offer.packNUnitsTitle", { qty: tier.qty, defaultValue: `${tier.qty} Units` });

  const renderColorSlots = () => (
    <>
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
              {flag ? (
                <StyledColorFlagSlot>
                  <StyledColorFlag $variant={flag.variant}>{flag.label}</StyledColorFlag>
                </StyledColorFlagSlot>
              ) : null}
            </StyledSlotThumbWrap>
            <StyledSlotBody>
              <StyledSlotUnitLabel>
                {t("offer.colorLabel")} <strong>{colorName(color, t)}</strong>
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
    </>
  );

  const renderUnlockedPerks = (qty: PackQty) => (
    <StyledUnlockedWrap>
      <StyledPerkRow aria-label={t("offer.giftName")}>
        <StyledPerkIcon>
          <Image
            src={SweetheartCdn.giftBottom}
            alt=""
            fill
            sizes="24px"
            unoptimized
            style={{ objectFit: "cover" }}
          />
        </StyledPerkIcon>
        <StyledPerkText>
          <strong>{t("offer.giftPriceNow", { defaultValue: "FREE" })}</strong>
          {t("offer.giftName")}
        </StyledPerkText>
        <StyledPerkWas>{t("offer.giftPriceWas", { defaultValue: "$26.00" })}</StyledPerkWas>
      </StyledPerkRow>

      {qty === BEST_DEAL_QTY ? (
        <StyledPerkRow
          aria-label={t("offer.shippingTitle", { defaultValue: "Free shipping" })}
        >
          <StyledPerkIcon $plain>
            <Image
              src={SweetheartCdn.iconShipping}
              alt=""
              width={20}
              height={20}
              unoptimized
              style={{ objectFit: "contain" }}
            />
          </StyledPerkIcon>
          <StyledPerkText>
            <strong>{t("offer.shippingFree", { defaultValue: "FREE" })}</strong>
            {t("offer.shippingTitle", { defaultValue: "Free shipping" })}
          </StyledPerkText>
          <StyledPerkWas>{t("offer.shippingCompare", { defaultValue: "$10.00" })}</StyledPerkWas>
        </StyledPerkRow>
      ) : null}
    </StyledUnlockedWrap>
  );

  const renderPackCard = (tier: PackTier) => {
    const selected = packQty === tier.qty;
    const strike = packStrikeFor(tier);
    const final = packFinalFor(tier);
    const saveAmount = packSaveDollars(tier);
    const tierPct = tier.per && tier.was ? packPct(tier.per, tier.was) : pct;
    const showDealBadge = tier.qty === BEST_DEAL_QTY;

    return (
      <StyledPackCard
        key={tier.qty}
        $selected={selected}
        role="radio"
        aria-checked={selected}
        tabIndex={selected ? 0 : -1}
        aria-label={packAriaFor(tier.qty, t)}
        onClick={() => selectPack(tier)}
        onKeyDown={(e) => handleKeyDown(e, () => selectPack(tier), ["Enter", " "])}
      >
        {showDealBadge ? (
          <StyledPackDealBadge>
            {t("offer.packBestDealBadge", {
              pct: tierPct,
              defaultValue: `BEST DEAL • ${tierPct}% OFF`,
            })}
          </StyledPackDealBadge>
        ) : null}
        <StyledPackHeader>
          <StyledPackRadio $selected={selected} aria-hidden />
          <StyledPackMain>
            <StyledPackInfo>
              <StyledPackTitle>{packUnitsTitle(tier)}</StyledPackTitle>
              <StyledPackGiftLine>
                {t("offer.packGiftIncluded", { defaultValue: "1 GIFT INCLUDED" })}
              </StyledPackGiftLine>
            </StyledPackInfo>
            <StyledPackPricing>
              <StyledPackCompareRow>
                <s>{strike}</s>
                <strong>{final}</strong>
                {tier.qty > 1 ? (
                  <span>{t("offer.pack2Each", { defaultValue: " /each" })}</span>
                ) : null}
              </StyledPackCompareRow>
              {saveAmount > 0 ? (
                <StyledPackSaveLine>
                  {t("offer.packSaveBadge", {
                    amount: saveAmount,
                    defaultValue: `Save $${saveAmount}`,
                  })}
                </StyledPackSaveLine>
              ) : null}
            </StyledPackPricing>
          </StyledPackMain>
        </StyledPackHeader>

        <StyledPackExpand $open={selected} aria-hidden={!selected}>
          <StyledPackExpandInner>{renderUnlockedPerks(tier.qty)}</StyledPackExpandInner>
        </StyledPackExpand>
      </StyledPackCard>
    );
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
              <StyledMainImage>
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
                {t("offer.chooseSavings", { defaultValue: "Buy more save more:" })}
              </StyledChoose>

              <StyledPacks role="radiogroup" aria-label={t("offer.chooseSavings")}>
                {DISPLAY_PACK_TIERS.map((tier) => renderPackCard(tier))}
              </StyledPacks>

              <StyledColorSection>{renderColorSlots()}</StyledColorSection>
            </StyledOfferSelection>

            <StyledSlotPanels>
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
