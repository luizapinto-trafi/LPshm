import Image from "next/image";
import styled from "styled-components";
import { useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next/pages";
import { handleKeyDown } from "@/shared/utils/KeyEvent";
import { SweetheartCdn, SweetheartShopUrl, SweetheartSizeGuideUrl } from "./sweetheartCamiCdn";
import {
  SweetheartSplitCta,
  SweetheartSplitCtaDivider,
  SweetheartSplitCtaPart,
} from "./SweetheartPrimaryButton";

/**
 * Offer aligned to Truekind/SHM PDP pattern:
 * headline strip above gallery → shipping bar → product title → packs → unlocked gifts → ATC → return card.
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
type PackId = 1 | 2;
type ColorId = "black" | "chai" | "white";

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
  text-align: center;
  padding: 24px 16px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  box-sizing: border-box;
`;

const StyledSaleTag = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  height: 44px;
  padding: 0 16px;
  box-sizing: border-box;
  background: var(--coral-100);
  border: 1px dashed var(--coral-600);
  border-radius: 6px;
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 700;
  color: var(--ink-900);
  line-height: 1.2;
  &::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--coral-500);
    flex: 0 0 auto;
  }
`;

const StyledPromoTitle = styled.h1`
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 700;
  line-height: 1.3;
  color: #333333;
  margin: 0;
  letter-spacing: 0;
`;

const StyledSubtitle = styled.p`
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--ink-700);
  margin: 0;
  max-width: 42rem;
`;

const StyledHeroMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 700;
  color: var(--ink-900);
`;

const StyledHeroScore = styled.span`
  font-weight: 700;
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
    top: 96px;
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

const StyledShipping = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 10px 12px;
  background: var(--ink-100);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 1.4;
  color: var(--ink-900);
`;

const StyledShippingIcon = styled.span`
  display: inline-flex;
  flex: 0 0 auto;
  width: 20px;
  height: 20px;
  line-height: 0;
`;

const StyledProductTitle = styled.h2`
  font-family: var(--font-body);
  font-size: clamp(22px, 3vw, 28px);
  font-weight: 400;
  line-height: 1.25;
  color: var(--ink-900);
  margin: 0;
  letter-spacing: 0;
`;

const StyledChoose = styled.p`
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 400;
  margin: 0;
  color: var(--ink-900);
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

const StyledThumbBtn = styled.button<{ $active?: boolean }>`
  list-style: none;
  display: flex;
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
    width: 65px;
    height: 86px;
    border-radius: 4px;
    border: 1px solid ${({ $active }) => ($active ? "var(--ink-900)" : "var(--ink-200)")};
  }
`;

const StyledMainImage = styled.div`
  position: relative;
  overflow: hidden;
  background: transparent;
  line-height: 0;
  width: 100%;
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
  left: 12px;
  z-index: 2;
  line-height: 0;
  width: 64px;
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

const StyledPacks = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 8px;
  margin: 0;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
`;

const StyledPack = styled.div<{ $selected?: boolean }>`
  position: relative;
  flex: 1 1 196px;
  width: 196px;
  max-width: calc(50% - 4px);
  min-width: 0;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  box-sizing: border-box;
  padding: 15px 8px;
  border-radius: 8px;
  border: ${({ $selected }) =>
    $selected ? "2px solid var(--mint-500)" : "1px solid #bbbbbb"};
  background: ${({ $selected }) => ($selected ? "#F5FAF9" : "var(--white)")};
  outline: none;
  overflow: visible;
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

const StyledPackPop = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  background: linear-gradient(93.15deg, #f2d96f -5.81%, #faa540 111.09%);
  color: var(--ink-900);
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  text-align: center;
  height: 18px;
  line-height: 18px;
  padding: 0 8px;
  border-radius: 4px;
  white-space: nowrap;
`;

const StyledPackUnits = styled.div`
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 600;
  color: var(--ink-900);
  line-height: normal;
  padding-bottom: 6px;
`;

const StyledPackSave = styled.div<{ $selected?: boolean }>`
  display: inline-block;
  box-sizing: border-box;
  white-space: nowrap;
  text-transform: none;
  max-width: 100%;
  border-radius: 4px;
  padding: 6px 8px;
  margin: 2px 0 4px;
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 600;
  line-height: 12px;
  border: 1px solid ${({ $selected }) => ($selected ? "var(--sale)" : "#d1d1d1")};
  background: ${({ $selected }) => ($selected ? "var(--sale)" : "transparent")};
  color: ${({ $selected }) => ($selected ? "#fff" : "var(--ink-900)")};
`;

const StyledStrike = styled.div<{ $muted?: boolean }>`
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 400;
  color: ${({ $muted }) => ($muted ? "#767676" : "var(--ink-900)")};
  text-decoration: line-through;
  line-height: 1.2;
  padding-bottom: 4px;
`;

const StyledFinal = styled.div`
  font-family: var(--font-body);
  font-size: 18px;
  font-weight: 700;
  color: var(--ink-900);
  line-height: 1.2;
  word-break: break-word;
  span {
    font-size: 14px;
    font-weight: 400;
    color: var(--ink-900);
  }
`;

const StyledOfferSelection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 400px;
  min-width: 0;
  margin-top: -6px;
`;

const StyledUnlockedWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-width: 0;
`;

const StyledUnlockedDivider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  margin: 0;
  align-self: stretch;
`;

const StyledUnlockedRule = styled.span`
  flex: 1 1 auto;
  height: 1px;
  background: var(--ink-200);
`;

const StyledUnlockedLabel = styled.p`
  margin: 0;
  flex: 0 0 auto;
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-900);
  text-align: center;
  line-height: 1.3;
  white-space: nowrap;
`;

const StyledUnlockedRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-150);
  width: 300px;
  max-width: 100%;
  height: 62px;
  min-height: 62px;
  padding: 6px 8px;
  border-radius: 8px;
  background: #F5FAF9;
  border: 1px dashed var(--mint-600);
  box-shadow: none;
  outline: none;
  box-sizing: border-box;
  cursor: default;
  user-select: none;
`;

const StyledUnlockedMain = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-300);
  min-width: 0;
  flex: 1 1 auto;
`;

const StyledUnlockedThumb = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  background: var(--white);
  display: grid;
  place-items: center;
  flex: 0 0 auto;
`;

const StyledUnlockedName = styled.p`
  margin: 0;
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 700;
  line-height: 1.25;
  color: var(--ink-900);
`;

const StyledUnlockedPrice = styled.p`
  margin: 0;
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  gap: 6px;
  flex: 0 0 auto;
  font-family: var(--font-body);
  font-size: 13px;
  line-height: 1.2;
  white-space: nowrap;
  s {
    color: var(--ink-500);
    font-weight: 400;
    text-decoration: line-through;
  }
  strong {
    color: var(--sale);
    font-weight: 700;
    text-transform: uppercase;
  }
`;

const StyledLockedRow = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 300px;
  max-width: 100%;
  height: 62px;
  min-height: 62px;
  padding: 6px 12px;
  border-radius: 8px;
  background: var(--ink-100);
  border: 1px dashed var(--ink-300);
  box-sizing: border-box;
  cursor: pointer;
  appearance: none;
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  color: var(--ink-500);
  &:hover {
    color: var(--ink-700);
    border-color: var(--ink-400);
  }
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M8 11V8a4 4 0 0 1 8 0v3"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const StyledColorRow = styled.div`
  font-size: 14px;
  padding: 0 0 12px;
  margin: 0 0 4px;
  color: var(--ink-900);
  width: 100%;
  max-width: 400px;
  border-bottom: 1px solid var(--ink-200);
`;

const StyledColorPickers = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 400px;
  min-width: 0;
`;

const StyledColorPicker = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  width: 100%;
  max-width: 400px;
  min-height: 70px;
  > div:last-child {
    min-width: 0;
    flex: 1 1 auto;
  }
`;

const StyledColorThumb = styled.div`
  width: 52px;
  height: 70px;
  border-radius: 2px;
  overflow: hidden;
  flex: 0 0 auto;
  position: relative;
  background: var(--ink-100);
`;

const StyledSwatches = styled.div`
  display: flex;
  gap: 12px;
`;

const StyledSwatch = styled.button<{ $bg: string; $selected?: boolean; $light?: boolean }>`
  width: 34px;
  height: 34px;
  border-radius: var(--radius-full);
  background: ${({ $bg }) => $bg};
  border: none;
  cursor: pointer;
  box-shadow: ${({ $selected, $light }) =>
    $selected
      ? "0 0 0 2px #FFFFFF inset, 0 0 0 3px var(--ink-900)"
      : $light
        ? "0 0 0 1px var(--ink-300)"
        : "0 0 0 1px var(--ink-200)"};
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

const StyledSizeLabel = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
  color: var(--ink-900);
`;

const StyledSizePicker = styled.div`
  width: 100%;
  max-width: 400px;
  min-width: 0;
`;

const StyledSizeGuide = styled.div`
  border-top: 1px solid var(--ink-200);
  padding-top: 12px;
  margin: 0;
  width: 100%;
  max-width: 400px;
`;

const StyledSizeGuideLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 400;
  color: var(--ink-900);
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    color: var(--ink-700);
  }
`;

const StyledSizes = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 8px 0 0;
  width: 100%;
  max-width: 400px;
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
  margin: 8px 0 0;
  width: 100%;
  max-width: 400px;
  color: var(--ink-900);
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

const colorName = (c: ColorId, t: (k: string) => string) =>
  c === "black" ? t("offer.colorBlack") : c === "chai" ? t("offer.colorChai") : t("offer.colorWhite");

const ColorPickerRow = ({
  label,
  value,
  onChange,
  thumbAlt,
  blackAria,
  chaiAria,
  whiteAria,
}: {
  label: string;
  value: ColorId;
  onChange: (c: ColorId) => void;
  thumbAlt: string;
  blackAria: string;
  chaiAria: string;
  whiteAria: string;
}) => (
  <StyledColorPicker>
    <StyledColorThumb>
      <Image
        src={COLOR_THUMB[value]}
        alt={thumbAlt}
        fill
        sizes="52px"
        unoptimized
        style={{ objectFit: "cover" }}
      />
    </StyledColorThumb>
    <div>
      <StyledSizeLabel style={{ marginBottom: 6, fontSize: 14 }}>{label}</StyledSizeLabel>
      <StyledSwatches>
        <StyledSwatch
          type="button"
          $bg={COLOR_HEX.black}
          $selected={value === "black"}
          aria-label={blackAria}
          aria-pressed={value === "black"}
          onClick={() => onChange("black")}
        />
        <StyledSwatch
          type="button"
          $bg={COLOR_HEX.chai}
          $selected={value === "chai"}
          aria-label={chaiAria}
          aria-pressed={value === "chai"}
          onClick={() => onChange("chai")}
        />
        <StyledSwatch
          type="button"
          $bg={COLOR_HEX.white}
          $selected={value === "white"}
          $light
          aria-label={whiteAria}
          aria-pressed={value === "white"}
          onClick={() => onChange("white")}
        />
      </StyledSwatches>
    </div>
  </StyledColorPicker>
);

export const SweetheartOfferSection = () => {
  const { t } = useTranslation("sweetheartCami");
  const [pack, setPack] = useState<PackId>(2);
  const [size, setSize] = useState<SizeId>("S");
  const [colorA, setColorA] = useState<ColorId>("black");
  const [colorB, setColorB] = useState<ColorId>("black");
  const [activeThumb, setActiveThumb] = useState(0);
  const [thumbsHeight, setThumbsHeight] = useState(0);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);

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
  const colorSummary =
    pack === 2
      ? `${colorName(colorA, t)}, ${colorName(colorB, t)}`
      : colorName(colorA, t);

  const shiftThumb = (delta: number) => {
    setActiveThumb((i) => (i + delta + GALLERY.length) % GALLERY.length);
  };

  const scrollToSizes = () => {
    document.getElementById("sweetheart-size-picker")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <StyledOfferHero>
      <StyledHeadingStrip>
        <StyledSaleTag>{t("offer.saleTag", { defaultValue: "End of Season Sale Special Deal" })}</StyledSaleTag>
        <StyledPromoTitle id="sweetheart-promo-title">
          {t("offer.promoTitle", { defaultValue: "Save Up To 45% Off + Free Gift" })}
        </StyledPromoTitle>
        <StyledSubtitle>
          {t("offer.subtitle", {
            defaultValue: "Join 1 million+ women who ditched underwires for all-day comfort and full shape.",
          })}
        </StyledSubtitle>
        <StyledHeroMeta>
          <StyledHeroScore>{t("offer.ratingScore")}</StyledHeroScore>
          <StyledStars aria-label={t("offer.starsAria")}>★★★★★</StyledStars>
          <span>{t("offer.socialProof")}</span>
        </StyledHeroMeta>
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
                  width={640}
                  height={800}
                  unoptimized
                  style={{ width: "100%", height: "auto", display: "block" }}
                  priority
                  onLoad={() => {
                    const el = mainImageRef.current;
                    if (!el) return;
                    const h = Math.round(el.getBoundingClientRect().height);
                    if (h > 0) setThumbsHeight(h);
                  }}
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
                    width={64}
                    height={64}
                    unoptimized
                  />
                </StyledNewIn>
              </StyledMainImage>
              <StyledSeeSizeWrap>
                <StyledSeeSize type="button" onClick={scrollToSizes}>
                  {t("offer.seeInYourSize")}
                </StyledSeeSize>
              </StyledSeeSizeWrap>
            </StyledGallery>
          </StyledGalleryCol>

          <StyledBuybox>
            <StyledShipping>
              <StyledShippingIcon aria-hidden>
                <Image
                  src={SweetheartCdn.iconShipping}
                  alt=""
                  width={20}
                  height={20}
                  unoptimized
                  style={{ width: 20, height: 20, objectFit: "contain" }}
                />
              </StyledShippingIcon>
              <span>
                Get <strong>{t("offer.shippingStrong")}</strong> {t("offer.shippingRest")}
              </span>
            </StyledShipping>

            <StyledProductTitle>{t("offer.productTitle")}</StyledProductTitle>

            <StyledMeta>
              <StyledStars aria-label={t("offer.starsAria")}>★★★★★</StyledStars>
              <StyledReviewsLink href="#reviews">{t("offer.reviewsLink")}</StyledReviewsLink>
            </StyledMeta>

            <StyledOfferSelection>
            <StyledChoose>
              {t("offer.chooseSavings")} <strong>{pack === 2 ? t("offer.pack2Units") : t("offer.pack1Units")}</strong>
            </StyledChoose>

            <StyledPacks>
              <StyledPack
                role="button"
                tabIndex={0}
                $selected={pack === 1}
                aria-pressed={pack === 1}
                aria-label={t("offer.pack1Aria")}
                onClick={() => setPack(1)}
                onKeyDown={(e) => handleKeyDown(e, () => setPack(1), ["Enter", " "])}
              >
                <StyledPackUnits>{t("offer.pack1Units")}</StyledPackUnits>
                <StyledPackSave $selected={pack === 1}>{t("offer.pack1Save")}</StyledPackSave>
                <StyledStrike $muted={pack !== 1}>{t("offer.pack1Strike")}</StyledStrike>
                <StyledFinal>{t("offer.pack1Final")}</StyledFinal>
              </StyledPack>

              <StyledPack
                role="button"
                tabIndex={0}
                $selected={pack === 2}
                aria-pressed={pack === 2}
                aria-label={t("offer.pack2Aria")}
                onClick={() => setPack(2)}
                onKeyDown={(e) => handleKeyDown(e, () => setPack(2), ["Enter", " "])}
              >
                <StyledPackPop>{t("offer.pack2Popular")}</StyledPackPop>
                <StyledPackUnits>{t("offer.pack2Units")}</StyledPackUnits>
                <StyledPackSave $selected={pack === 2}>{t("offer.pack2Save")}</StyledPackSave>
                <StyledStrike $muted={pack !== 2}>{t("offer.pack2Strike")}</StyledStrike>
                <StyledFinal>
                  {t("offer.pack2Final")}
                  <span>{t("offer.pack2Each")}</span>
                </StyledFinal>
              </StyledPack>
            </StyledPacks>

            <StyledUnlockedWrap
              role={pack === 2 ? "list" : undefined}
              aria-label={
                pack === 2
                  ? t("offer.unlockedTitle", { defaultValue: "Congrats! You've unlocked 1 gift" })
                  : t("offer.lockedTitle", { defaultValue: "Buy a 2-pack to unlock a free gift" })
              }
            >
              <StyledUnlockedDivider>
                <StyledUnlockedRule aria-hidden />
                <StyledUnlockedLabel>
                  {pack === 2
                    ? t("offer.unlockedTitle", { defaultValue: "Congrats! You've unlocked 1 gift" })
                    : t("offer.lockedTitle", { defaultValue: "Buy a 2-pack to unlock a free gift" })}
                </StyledUnlockedLabel>
                <StyledUnlockedRule aria-hidden />
              </StyledUnlockedDivider>

              {pack === 2 ? (
                <StyledUnlockedRow role="listitem" aria-label={t("offer.giftName")}>
                  <StyledUnlockedMain>
                    <StyledUnlockedThumb>
                      <Image
                        src={SweetheartCdn.giftBottom}
                        alt=""
                        fill
                        sizes="36px"
                        unoptimized
                        style={{ objectFit: "cover" }}
                      />
                    </StyledUnlockedThumb>
                    <StyledUnlockedName>{t("offer.giftName")}</StyledUnlockedName>
                  </StyledUnlockedMain>
                  <StyledUnlockedPrice>
                    <s>{t("offer.giftPriceWas")}</s>
                    <strong>{t("offer.giftPriceNow")}</strong>
                  </StyledUnlockedPrice>
                </StyledUnlockedRow>
              ) : (
                <StyledLockedRow
                  type="button"
                  aria-label={t("offer.lockedAria", { defaultValue: "Select the 2-pack to unlock a free gift" })}
                  onClick={() => setPack(2)}
                  onKeyDown={(e) => handleKeyDown(e, () => setPack(2), ["Enter", " "])}
                >
                  <LockIcon />
                  {t("offer.lockedLabel", { defaultValue: "2-pack" })}
                </StyledLockedRow>
              )}
            </StyledUnlockedWrap>
            </StyledOfferSelection>

            <StyledColorRow>
              {t("offer.colorLabel")} <strong>{colorSummary}</strong>
            </StyledColorRow>

            <StyledColorPickers>
              <ColorPickerRow
                label={`${t("offer.colorLabel")} ${colorName(colorA, t)}`}
                value={colorA}
                onChange={setColorA}
                thumbAlt={t("offer.colorThumbAlt")}
                blackAria={t("offer.swatchBlackAria")}
                chaiAria={t("offer.swatchChaiAria")}
                whiteAria={t("offer.swatchWhiteAria")}
              />
              {pack === 2 ? (
                <ColorPickerRow
                  label={`${t("offer.colorLabel")} ${colorName(colorB, t)}`}
                  value={colorB}
                  onChange={setColorB}
                  thumbAlt={t("offer.colorThumbAlt")}
                  blackAria={t("offer.swatchBlackAria")}
                  chaiAria={t("offer.swatchChaiAria")}
                  whiteAria={t("offer.swatchWhiteAria")}
                />
              ) : null}
            </StyledColorPickers>

            <StyledSizeGuide>
              <StyledSizeGuideLink href={SweetheartSizeGuideUrl} target="_blank" rel="noopener noreferrer">
                <Image src={SweetheartCdn.iconSizeGuide} alt="" width={24} height={12} unoptimized />
                <span>{t("offer.sizeGuide")}</span>
              </StyledSizeGuideLink>
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

            <StyledCtaBlock>
              <div id="sweetheart-pdp-cta">
                <SweetheartSplitCta $full href={SweetheartShopUrl}>
                  <SweetheartSplitCtaPart>{t("offer.ctaLabel")}</SweetheartSplitCtaPart>
                  <SweetheartSplitCtaDivider aria-hidden />
                  <SweetheartSplitCtaPart>{t("offer.ctaOffer")}</SweetheartSplitCtaPart>
                </SweetheartSplitCta>
              </div>
            </StyledCtaBlock>

            <StyledReturn>
              <Image src={SweetheartCdn.iconReturn} alt="" width={34} height={34} unoptimized />
              <div>
                <StyledReturnTitle>{t("offer.returnTitle")}</StyledReturnTitle>
                <StyledReturnBody>
                  {t("offer.returnBodyBefore")} <strong>{t("offer.returnBodyStrong")}</strong>{" "}
                  {t("offer.returnBodyAfter")}
                </StyledReturnBody>
              </div>
            </StyledReturn>
          </StyledBuybox>
        </StyledGrid>
      </StyledSection>
    </StyledOfferHero>
  );
};
