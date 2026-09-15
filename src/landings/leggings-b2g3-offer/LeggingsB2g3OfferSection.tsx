import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { handleKeyDown } from "@/shared/utils/KeyEvent";
import { LeggingsB2g3Cdn } from "./leggingsB2g3Cdn";
import {
  ANCHORS,
  BOOSTER,
  COLORS,
  PRODUCT,
  SIZES,
  SINGLE_UNIT_PRICE,
  money,
  type AnchorId,
  type ColorId,
  type LayoutId,
  type PackId,
  type SizeId,
} from "./leggingsB2g3Config";
import { buildCheckoutUrl, resolveVariantId } from "./leggingsB2g3Content";
import { LeggingsB2g3SizeChart } from "./LeggingsB2g3SizeChart";
import { LeggingsB2g3PdpAccordion } from "./LeggingsB2g3PdpAccordion";
import { LeggingsB2g3SeeInYourSizeModal } from "./LeggingsB2g3SeeInYourSizeModal";

export type LeggingsB2g3OfferSectionProps = {
  layout: LayoutId;
  anchor: AnchorId;
};

const StyledSection = styled.section`
  width: 100%;
  max-width: 1170px;
  margin: 24px auto;
  padding: 0;
  box-sizing: border-box;
  font-family: var(--font-body);
  color: var(--ink-900);
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-gap: 20px;
  align-items: start;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
  }
  @media (min-width: 1200px) {
    grid-template-columns: 0.55fr 0.45fr;
    grid-gap: 10px;
  }
`;

const StyledBelowGrid = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-gap: 20px;
  margin-top: 32px;
  align-items: start;
  width: 100%;
  box-sizing: border-box;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
  }
  @media (min-width: 1200px) {
    grid-template-columns: 0.55fr 0.45fr;
    grid-gap: 10px;
  }
  @media (max-width: 767px) {
    padding: 0 15px;
  }
`;

const StyledBelowRight = styled.div`
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
  /* Same horizontal inset as #product-details-summary (50px). */
  padding: 0 50px;
  @media (max-width: 1200px) {
    padding: 0 15px 15px;
  }
`;

const StyledGallery = styled.div`
  display: grid;
  grid-template-columns: minmax(6rem, max-content) minmax(0, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 16px;
  align-items: start;
  width: 100%;
  max-width: 670px;
  max-height: 50rem;
  box-sizing: border-box;
  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    max-height: none;
    gap: 12px;
  }
`;

const StyledHero = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 8px;
  overflow: hidden;
  background: var(--ink-100);
  grid-column: 2;
  grid-row: 1;
  align-self: start;
  @media (max-width: 767px) {
    order: 1;
    grid-column: auto;
    grid-row: auto;
  }
`;

const StyledThumbs = styled.div`
  grid-column: 1;
  grid-row: 1;
  display: grid;
  grid-row-gap: 20px;
  align-content: start;
  align-self: start;
  max-height: calc(530px / (3 / 4));
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: thin;
  box-sizing: border-box;
  @media (max-width: 767px) {
    order: 2;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
    max-height: none;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 6px;
  }
`;

const StyledThumbBtn = styled.button<{ $active?: boolean }>`
  flex: 0 0 auto;
  width: 65px;
  height: 86px;
  padding: 0;
  border: ${({ $active }) => ($active ? "1.5px solid var(--ink-900)" : "1.5px solid transparent")};
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  background: var(--ink-100);
  box-sizing: border-box;
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

const StyledSeeSizeWrap = styled.div`
  grid-column: 2;
  grid-row: 2;
  display: flex;
  justify-content: center;
  width: 100%;
  @media (max-width: 767px) {
    order: 3;
    margin-top: 12px;
  }
`;

const StyledSeeSize = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  margin: 12px 0 0;
  padding: 0.688rem 2rem;
  border: 1px solid #292929;
  border-radius: 0.5rem;
  background: #fff;
  color: #292929;
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 1;
  text-transform: capitalize;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background: #292929;
    color: #fff;
  }
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
  @media (max-width: 992px) {
    margin-top: 4px;
  }
`;

const StyledBuybox = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-gap: 16px;
  min-width: 0;
  width: 100%;
  /* Live #product-details-summary: 522px column, padding 0 50px */
  padding: 0 50px;
  box-sizing: border-box;
  @media (max-width: 1200px) {
    padding: 0 15px 15px;
    grid-gap: 20px;
  }
  @media (max-width: 767px) {
    padding: 0 15px 15px;
    grid-gap: 8px;
  }
`;

const StyledTitleBlock = styled.div`
  display: grid;
  grid-gap: 16px;
  @media (max-width: 767px) {
    grid-gap: 8px;
  }
`;

const StyledTitle = styled.h1`
  margin: 0;
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 400;
  line-height: 28px;
  color: var(--ink-900);
  letter-spacing: 0;
  @media (min-width: 768px) {
    font-size: 30px;
    line-height: 38px;
  }
`;

const StyledReviewsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
`;

const StyledStars = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  color: var(--gold-600);
  line-height: 0;
`;

const StyledStar = styled.span<{ $fill: number }>`
  position: relative;
  display: inline-block;
  width: 14px;
  height: 14px;
  font-size: 14px;
  line-height: 14px;
  color: var(--ink-200);
  &::before {
    content: "★";
    position: absolute;
    inset: 0;
    color: var(--ink-200);
  }
  &::after {
    content: "★";
    position: absolute;
    inset: 0;
    color: var(--gold-600);
    width: ${({ $fill }) => `${Math.max(0, Math.min(1, $fill)) * 100}%`};
    overflow: hidden;
  }
`;

const StyledReviewsLink = styled.a`
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
  color: var(--ink-900);
  text-decoration: underline;
  text-underline-offset: 2px;
  &:hover {
    color: var(--coral-500);
  }
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
    border-radius: var(--radius-md);
  }
`;

const StyledPriceBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 12px;
`;

const StyledCompareWrap = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const StyledCompare = styled.s`
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 22px;
  color: #767676;
  font-weight: 400;
  text-decoration: line-through;
`;

const StyledInfoBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--ink-500);
  cursor: help;
  line-height: 0;
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
    border-radius: var(--radius-full);
  }
`;

const StyledSale = styled.span`
  display: inline-flex;
  align-items: flex-start;
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--ink-900);
  letter-spacing: 0;
  line-height: 1;
`;

const StyledSaleCurrency = styled.span`
  font-size: 16px;
  line-height: 1;
  margin-top: 4px;
  margin-right: 2px;
  font-weight: 700;
`;

const StyledSaleDollars = styled.span`
  font-size: 28px;
  line-height: 1.1;
  font-weight: 700;
`;

const StyledSaleCents = styled.sup`
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
  margin-left: 1px;
  top: 0.25em;
`;

const StyledBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  min-height: 20px;
  border-radius: 4px;
  background: var(--sale);
  color: var(--white);
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  white-space: nowrap;
`;

const StyledCallout = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 17px;
  border-radius: var(--radius-lg);
  background: #f5faf9;
  border: 1px dashed #d7e3d6;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-100);
`;

const StyledCalloutTitleRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: var(--space-100);
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.02em;
  color: var(--coral-500);
`;

const StyledPulseDot = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background-color: var(--mint-500, #4cbea4);
  opacity: 0.5;
  flex-shrink: 0;
  animation: b2g3-offer-dot-blink 1.6s ease-in-out infinite;
  @keyframes b2g3-offer-dot-blink {
    0%,
    100% {
      opacity: 0.35;
    }
    50% {
      opacity: 1;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.5;
  }
`;

const StyledCalloutTitle = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: var(--coral-500);
  letter-spacing: 0.02em;
`;

const StyledCalloutBody = styled.p`
  margin: 0;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: var(--ink-900);
  b,
  strong {
    font-weight: 700;
  }
`;

const StyledIncludesNest = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin-top: 6px;
  padding-top: 13px;
  border-top: 1px dashed #d7e3d6;
`;

const StyledIncludes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
`;

const StyledIncludesLabel = styled.p`
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 600;
  color: var(--ink-600);
  letter-spacing: 0.2px;
`;

const StyledIncludeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 0;
  & + & {
    border-top: 1px dashed #d7e3d6;
  }
`;

const StyledIncludeThumb = styled.div`
  width: 50px;
  height: 50px;
  flex: none;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--white);
  border: 1px solid var(--ink-150);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledIncludeName = styled.span`
  font-size: 14px;
  font-weight: 700;
  line-height: 22px;
  color: var(--ink-900);
  min-width: 0;
`;

const StyledIncludePrice = styled.span`
  margin-left: auto;
  padding-left: 12px;
  font-size: 14px;
  line-height: 22px;
  white-space: nowrap;
  color: var(--ink-900);
  s {
    color: var(--ink-500);
    font-weight: 400;
    margin-right: 5px;
  }
  b {
    color: var(--sale);
    font-weight: 700;
  }
`;

const StyledPackHeader = styled.p`
  margin: 0;
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  line-height: 22px;
  color: var(--ink-900);
`;

const StyledPacks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledPackCard = styled.div<{ $selected?: boolean; $hasBadge?: boolean }>`
  position: relative;
  border-radius: var(--radius-lg);
  border: ${({ $selected }) =>
    $selected ? "2px solid var(--mint-500, #3f9754)" : "1px solid var(--ink-300)"};
  background: ${({ $selected }) => ($selected ? "#f5faf9" : "var(--white)")};
  cursor: pointer;
  overflow: visible;
  padding-top: ${({ $hasBadge }) => ($hasBadge ? "10px" : "0")};
  transition: border-color 0.2s ease, background-color 0.2s ease;
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

const StyledBestValue = styled.span`
  position: absolute;
  top: 0;
  right: 12px;
  transform: translateY(-50%);
  z-index: 2;
  font-family: var(--font-display);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  padding: 4px 8px;
  border-radius: var(--radius-md);
  color: var(--white);
  background: var(--sale);
  pointer-events: none;
  white-space: nowrap;
`;

const StyledPackRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px;
`;

const StyledPackPricing = styled.div`
  text-align: right;
  flex: none;
  /* Keep price under the floating BEST VALUE chip */
  padding-top: 6px;
`;

const StyledRadio = styled.span<{ $selected?: boolean }>`
  width: 18px;
  height: 18px;
  margin-top: 2px;
  border-radius: 999px;
  border: 2px solid var(--ink-900);
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  &::after {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: ${({ $selected }) => ($selected ? "var(--ink-900)" : "transparent")};
  }
`;

const StyledPackMain = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const StyledPackTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: var(--ink-900);
  line-height: 1.2;
`;

const StyledPackSub = styled.div`
  margin-top: 2px;
  font-size: 12px;
  color: var(--ink-600);
`;

const StyledPackExpand = styled.div<{ $open?: boolean }>`
  display: ${({ $open }) => ($open ? "block" : "none")};
  padding: 0 12px 12px;
  border-top: 1px solid var(--ink-200);
`;

const StyledReminder = styled.p`
  margin: 0;
  padding: 10px 12px;
  border-radius: 8px;
  background: #fff6f0;
  border: 1px solid #f0d7c8;
  font-size: 13px;
  line-height: 1.4;
  color: var(--ink-800);
`;

const StyledUnitGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  & + & {
    margin-top: 20px;
  }
`;

const StyledUnitsHead = styled.div`
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  color: var(--ink-900);
  padding-bottom: 8px;
  border-bottom: 1px solid var(--ink-200);
`;

const StyledSlot = styled.div`
  display: flex;
  gap: var(--space-200);
  align-items: flex-start;
  padding: 12px 0;
`;

const StyledSlotThumb = styled.div`
  width: 60px;
  height: 80px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  position: relative;
  flex: none;
  background: var(--ink-100);
`;

const StyledSlotBody = styled.div`
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 2px;
`;

const StyledSlotLabel = styled.div`
  margin: 0;
  font-family: var(--font-body);
  color: var(--ink-900);
  font-size: 14px;
  line-height: 22px;
  font-weight: 400;
  strong {
    font-weight: 700;
  }
`;

const StyledSwatches = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const StyledSwatch = styled.button<{ $bg: string; $selected?: boolean; $light?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  padding: 0;
  cursor: pointer;
  background: ${({ $bg }) => $bg};
  border: ${({ $selected, $light }) => {
    if ($selected) return "2px solid var(--ink-900)";
    if ($light) return "1px solid var(--ink-300)";
    return "1px solid transparent";
  }};
  box-shadow: ${({ $selected }) => ($selected ? "inset 0 0 0 2px #fff" : "none")};
  box-sizing: border-box;
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

const StyledSizeRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledSizeLabel = styled.p`
  margin: 0;
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 22px;
  color: var(--ink-900);
  span {
    font-weight: 400;
    color: var(--ink-500);
    font-size: 14px;
  }
`;

const StyledSizes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const StyledSizeBtn = styled.button<{ $selected?: boolean }>`
  min-width: 4rem;
  height: auto;
  padding: 0.75rem 1rem 0.625rem;
  border-radius: 0.375rem;
  border: ${({ $selected }) => ($selected ? "none" : "1px solid var(--ink-300)")};
  background: ${({ $selected }) => ($selected ? "var(--ink-900)" : "var(--white)")};
  color: ${({ $selected }) => ($selected ? "var(--white)" : "var(--ink-900)")};
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  box-sizing: border-box;
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

const StyledCta = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  min-width: unset;
  min-height: unset;
  padding: 0.875rem 2rem;
  border: none;
  border-radius: 0.5rem;
  background: var(--coral-300);
  color: var(--ink-900);
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: normal;
  line-height: normal;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background: var(--coral-200, #fcd9d1);
  }
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

const StyledCtaInner = styled.span`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  width: 100%;
  gap: 0;
  line-height: 1;
`;

const StyledCtaPart = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  padding: 0 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: inherit;
  font-size: inherit;
  font-weight: 700;
  @media (max-width: 424px) {
    padding: 0 4px;
    font-size: 12px;
  }
`;

const StyledCtaDivider = styled.span`
  display: inline-block;
  height: 1.25em;
  width: 1px;
  background-color: currentColor;
  opacity: 0.55;
  border-radius: 1px;
`;

const StyledPolicy = styled.div`
  margin: 0;
  padding: var(--space-300);
  width: 100%;
  box-sizing: border-box;
  background: var(--ink-050);
  border-radius: var(--radius-lg);
  text-align: left;
`;

const StyledPolicyHead = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 10px;
`;

const StyledPolicyTitle = styled.p`
  margin: 0;
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  line-height: 28px;
  color: var(--ink-900);
`;

const StyledPolicyBody = styled.p`
  margin: 0;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: var(--ink-900);
  strong {
    font-weight: 700;
  }
`;

const colorLabel = (id: ColorId) => COLORS.find((c) => c.id === id)?.label ?? id;

const splitMoney = (n: number) => {
  const [dollars, cents = "00"] = n.toFixed(2).split(".");
  return { dollars, cents };
};

const StarRating = ({ value, label }: { value: number; label: string }) => (
  <StyledStars role="img" aria-label={label}>
    {[0, 1, 2, 3, 4].map((i) => (
      <StyledStar key={i} $fill={Math.max(0, Math.min(1, value - i))} aria-hidden />
    ))}
  </StyledStars>
);

const SalePrice = ({ amount }: { amount: number }) => {
  const { dollars, cents } = splitMoney(amount);
  return (
    <StyledSale>
      <StyledSaleCurrency>$</StyledSaleCurrency>
      <StyledSaleDollars>{dollars}</StyledSaleDollars>
      <StyledSaleCents>{cents}</StyledSaleCents>
    </StyledSale>
  );
};

const OfferIncludes = ({
  freeUnitValue,
  showBooster,
  label,
  nested = false,
}: {
  freeUnitValue: number;
  showBooster: boolean;
  label: string;
  /** When true, omit outer spacing — parent already provides nest chrome. */
  nested?: boolean;
}) => {
  const { t } = useTranslation("leggingsB2g3");
  const body = (
    <>
      <StyledIncludesLabel>{label}</StyledIncludesLabel>
      <StyledIncludeRow>
        <StyledIncludeThumb>
          <Image
            src={LeggingsB2g3Cdn.unitThumb}
            alt={t("offer.freeUnitAlt")}
            fill
            unoptimized
            sizes="50px"
            style={{ objectFit: "cover" }}
          />
        </StyledIncludeThumb>
        <StyledIncludeName>{t("offer.freeUnitName")}</StyledIncludeName>
        <StyledIncludePrice>
          <s>{money(freeUnitValue)}</s>
          <b>{t("offer.freeLabel")}</b>
        </StyledIncludePrice>
      </StyledIncludeRow>
      {showBooster ? (
        <StyledIncludeRow data-booster-row data-shopify-id={BOOSTER.shopifyId || undefined}>
          <StyledIncludeThumb>
            <Image
              src={BOOSTER.image}
              alt={BOOSTER.imageAlt}
              fill
              unoptimized
              sizes="50px"
              style={{ objectFit: "cover" }}
            />
          </StyledIncludeThumb>
          <StyledIncludeName>{BOOSTER.name}</StyledIncludeName>
          <StyledIncludePrice>
            <s>{money(BOOSTER.displayValue)}</s>
            <b>{t("offer.freeLabel")}</b>
          </StyledIncludePrice>
        </StyledIncludeRow>
      ) : null}
    </>
  );

  return nested ? (
    <StyledIncludesNest data-offer-includes>{body}</StyledIncludesNest>
  ) : (
    <StyledIncludes data-offer-includes>{body}</StyledIncludes>
  );
};

export const LeggingsB2g3OfferSection = ({ layout, anchor }: LeggingsB2g3OfferSectionProps) => {
  const { t } = useTranslation("leggingsB2g3");
  const pricing = ANCHORS[anchor];
  const isSelector = layout === "selector";

  const [pack, setPack] = useState<PackId>("b2g3");
  const [heroSrc, setHeroSrc] = useState<string>(LeggingsB2g3Cdn.hero);
  const [size, setSize] = useState<SizeId>("S");
  const [siysOpen, setSiysOpen] = useState(false);
  const [unitColors, setUnitColors] = useState<[ColorId, ColorId, ColorId]>([
    "black",
    "black",
    "black",
  ]);
  const [singleColor, setSingleColor] = useState<ColorId>("black");

  const qty = !isSelector || pack === "b2g3" ? 3 : 1;
  const showBooster = qty >= BOOSTER.unlockThreshold;
  const showFreeUnit = qty >= 3;
  const showSinglePicker = isSelector && pack === "single";
  const showMultiUnits = !showSinglePicker;

  const ctaShowSave = !(isSelector && pack === "single");
  const ctaSavings = money(pricing.savings);

  const showColorOnGallery = (color: ColorId) => {
    setHeroSrc(LeggingsB2g3Cdn.colorImages[color]);
  };

  const setUnitColor = (index: 0 | 1 | 2, color: ColorId) => {
    setUnitColors((prev) => {
      const next = [...prev] as [ColorId, ColorId, ColorId];
      next[index] = color;
      return next;
    });
    showColorOnGallery(color);
  };

  const pickSingleColor = (color: ColorId) => {
    setSingleColor(color);
    showColorOnGallery(color);
  };

  const onAdd = () => {
    const ids =
      showSinglePicker
        ? [resolveVariantId(singleColor, size)]
        : (showFreeUnit ? [0, 1, 2] : [0, 1]).map((i) =>
            resolveVariantId(unitColors[i as 0 | 1 | 2], size),
          );
    window.location.assign(buildCheckoutUrl(ids));
  };

  const renderSwatches = (selected: ColorId, onPick: (c: ColorId) => void, name: string) => (
    <StyledSwatches role="group" aria-label={name}>
      {COLORS.map((c) => (
        <StyledSwatch
          key={c.id}
          type="button"
          $bg={c.hex}
          $light={c.light}
          $selected={selected === c.id}
          aria-label={c.label}
          aria-pressed={selected === c.id}
          onClick={() => onPick(c.id)}
        />
      ))}
    </StyledSwatches>
  );

  const priceBlock = (
    <StyledPriceBlock aria-label={t("offer.priceAria")}>
      <StyledCompareWrap>
        <StyledCompare>{money(pricing.compareAt)}</StyledCompare>
        <StyledInfoBtn type="button" aria-label={t("offer.msrpInfo")} title={t("offer.msrpInfo")}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4" />
            <path d="M8 7.2v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="8" cy="5" r="0.9" fill="currentColor" />
          </svg>
        </StyledInfoBtn>
      </StyledCompareWrap>
      <SalePrice amount={pricing.salePrice} />
      <StyledBadge>{pricing.badge}</StyledBadge>
    </StyledPriceBlock>
  );

  const callout = (withIncludes: boolean) => (
    <StyledCallout>
      <StyledCalloutTitleRow>
        <StyledPulseDot aria-hidden />
        <StyledCalloutTitle>{t("offer.calloutTitle")}</StyledCalloutTitle>
      </StyledCalloutTitleRow>
      <StyledCalloutBody>
        {t("offer.calloutBodyBefore")}
        <b>{t("offer.calloutBodyBold")}</b>
      </StyledCalloutBody>
      {withIncludes ? (
        <OfferIncludes
          nested
          freeUnitValue={pricing.freeUnitValue}
          showBooster={showBooster}
          label={t("offer.includesLabel")}
        />
      ) : null}
    </StyledCallout>
  );

  return (
    <StyledSection aria-labelledby="b2g3-title">
      <StyledGrid>
        <StyledGallery>
          <StyledThumbs>
            {LeggingsB2g3Cdn.gallery.map((src) => (
              <StyledThumbBtn
                key={src}
                type="button"
                $active={heroSrc === src}
                aria-label={t("offer.galleryThumb", { n: LeggingsB2g3Cdn.gallery.indexOf(src) + 1 })}
                onClick={() => setHeroSrc(src)}
              >
                <Image src={src} alt="" width={65} height={86} unoptimized style={{ objectFit: "cover" }} />
              </StyledThumbBtn>
            ))}
          </StyledThumbs>
          <StyledHero>
            <Image
              key={heroSrc}
              src={heroSrc}
              alt={PRODUCT.title}
              fill
              priority
              unoptimized
              sizes="(max-width: 767px) 100vw, (max-width: 1200px) 45vw, 530px"
              style={{ objectFit: "cover" }}
            />
          </StyledHero>
          <StyledSeeSizeWrap>
            <StyledSeeSize type="button" onClick={() => setSiysOpen(true)}>
              {t("offer.seeInYourSize", { defaultValue: "See In Your Size" })}
            </StyledSeeSize>
          </StyledSeeSizeWrap>
        </StyledGallery>

        <StyledBuybox>
          <StyledTitleBlock>
            <StyledTitle id="b2g3-title">{PRODUCT.title}</StyledTitle>
            <StyledReviewsRow>
              <StarRating
                value={PRODUCT.rating}
                label={t("offer.starsAria", { rating: PRODUCT.rating })}
              />
              <StyledReviewsLink href="#reviews">
                {t("offer.reviews", { count: PRODUCT.reviewCount.toLocaleString("en-US") })}
              </StyledReviewsLink>
            </StyledReviewsRow>
          </StyledTitleBlock>

          {!isSelector ? (
            <>
              {priceBlock}
              {callout(true)}
            </>
          ) : (
            <>
              <StyledPackHeader>{t("offer.packHeader")}</StyledPackHeader>
              <StyledPacks role="radiogroup" aria-label={t("offer.packHeader")}>
                <StyledPackCard
                  role="radio"
                  tabIndex={0}
                  aria-checked={pack === "b2g3"}
                  $selected={pack === "b2g3"}
                  $hasBadge
                  onClick={() => setPack("b2g3")}
                  onKeyDown={(e) => handleKeyDown(e, () => setPack("b2g3"), ["Enter", " "])}
                >
                  <StyledBestValue>{t("offer.bestValue")}</StyledBestValue>
                  <StyledPackRow>
                    <StyledRadio $selected={pack === "b2g3"} aria-hidden />
                    <StyledPackMain>
                      <div>
                        <StyledPackTitle>{t("offer.packATitle")}</StyledPackTitle>
                        <StyledPackSub>{t("offer.packASub")}</StyledPackSub>
                      </div>
                      <StyledPackPricing>
                        <div>
                          <s style={{ color: "var(--ink-500)", marginRight: 6 }}>
                            {money(pricing.compareAt)}
                          </s>
                          <strong>{money(pricing.salePrice)}</strong>
                        </div>
                        <div style={{ color: "var(--coral-500)", fontWeight: 700, fontSize: 12, marginTop: 2 }}>
                          {pricing.badge}
                        </div>
                      </StyledPackPricing>
                    </StyledPackMain>
                  </StyledPackRow>
                  <StyledPackExpand $open={pack === "b2g3"}>
                    <div style={{ paddingTop: 10 }}>
                      <OfferIncludes
                        freeUnitValue={pricing.freeUnitValue}
                        showBooster={showBooster}
                        label={t("offer.packIncludesLabel")}
                      />
                    </div>
                  </StyledPackExpand>
                </StyledPackCard>

                <StyledPackCard
                  role="radio"
                  tabIndex={0}
                  aria-checked={pack === "single"}
                  $selected={pack === "single"}
                  onClick={() => setPack("single")}
                  onKeyDown={(e) => handleKeyDown(e, () => setPack("single"), ["Enter", " "])}
                >
                  <StyledPackRow>
                    <StyledRadio $selected={pack === "single"} aria-hidden />
                    <StyledPackMain>
                      <div>
                        <StyledPackTitle>{t("offer.packBTitle")}</StyledPackTitle>
                        <StyledPackSub>{t("offer.packBSub")}</StyledPackSub>
                      </div>
                      <StyledPackPricing>
                        <strong>{money(SINGLE_UNIT_PRICE)}</strong>
                      </StyledPackPricing>
                    </StyledPackMain>
                  </StyledPackRow>
                </StyledPackCard>
              </StyledPacks>

              {pack === "single" ? <StyledReminder>{t("offer.leaveBehindReminder")}</StyledReminder> : null}
              {pack === "b2g3" ? callout(false) : null}
            </>
          )}

          {showMultiUnits ? (
            <div>
              <StyledUnitGroup>
                <StyledUnitsHead>{t("offer.yourLeggings", { defaultValue: "Your leggings:" })}</StyledUnitsHead>
                {([0, 1] as const).map((i) => (
                  <StyledSlot key={i}>
                    <StyledSlotThumb>
                      <Image
                        src={LeggingsB2g3Cdn.colorImages[unitColors[i]]}
                        alt=""
                        fill
                        unoptimized
                        sizes="60px"
                        style={{ objectFit: "cover" }}
                      />
                    </StyledSlotThumb>
                    <StyledSlotBody>
                      <StyledSlotLabel>
                        {t("offer.colorLabel", { defaultValue: "Color:" })}{" "}
                        <strong>{colorLabel(unitColors[i])}</strong>
                      </StyledSlotLabel>
                      {renderSwatches(
                        unitColors[i],
                        (c) => setUnitColor(i, c),
                        t("offer.unitColorAria", { n: i + 1, defaultValue: `Color for unit ${i + 1}` }),
                      )}
                    </StyledSlotBody>
                  </StyledSlot>
                ))}
              </StyledUnitGroup>
              {showFreeUnit ? (
                <StyledUnitGroup>
                  <StyledUnitsHead>
                    {t("offer.freeLeggingsUnit", { defaultValue: "Your FREE leggings:" })}
                  </StyledUnitsHead>
                  <StyledSlot>
                    <StyledSlotThumb>
                      <Image
                        src={LeggingsB2g3Cdn.colorImages[unitColors[2]]}
                        alt=""
                        fill
                        unoptimized
                        sizes="60px"
                        style={{ objectFit: "cover" }}
                      />
                    </StyledSlotThumb>
                    <StyledSlotBody>
                      <StyledSlotLabel>
                        {t("offer.colorLabel", { defaultValue: "Color:" })}{" "}
                        <strong>{colorLabel(unitColors[2])}</strong>
                      </StyledSlotLabel>
                      {renderSwatches(
                        unitColors[2],
                        (c) => setUnitColor(2, c),
                        t("offer.unitColorAria", { n: 3, defaultValue: "Color for unit 3" }),
                      )}
                    </StyledSlotBody>
                  </StyledSlot>
                </StyledUnitGroup>
              ) : null}
            </div>
          ) : null}

          {showSinglePicker ? (
            <StyledUnitGroup>
              <StyledUnitsHead>{t("offer.yourLeggings", { defaultValue: "Your leggings:" })}</StyledUnitsHead>
              <StyledSlot>
                <StyledSlotThumb>
                  <Image
                    src={LeggingsB2g3Cdn.colorImages[singleColor]}
                    alt=""
                    fill
                    unoptimized
                    sizes="60px"
                    style={{ objectFit: "cover" }}
                  />
                </StyledSlotThumb>
                <StyledSlotBody>
                  <StyledSlotLabel>
                    {t("offer.colorLabel", { defaultValue: "Color:" })} <strong>{colorLabel(singleColor)}</strong>
                  </StyledSlotLabel>
                  {renderSwatches(
                    singleColor,
                    pickSingleColor,
                    t("offer.unitColorAria", { n: 1, defaultValue: "Color for unit 1" }),
                  )}
                </StyledSlotBody>
              </StyledSlot>
            </StyledUnitGroup>
          ) : null}

          <StyledSizeRow id="b2g3-sizes">
            <StyledSizeLabel>
              {t("offer.sizeLabel")} <strong>{size}</strong>
              <span>
                {" "}
                · {showFreeUnit ? t("offer.sizeAppliesAll") : t("offer.sizeAppliesSingle")}
              </span>
            </StyledSizeLabel>
            <StyledSizes role="group" aria-label={t("offer.sizeLabel")}>
              {SIZES.map((s) => (
                <StyledSizeBtn
                  key={s}
                  type="button"
                  $selected={size === s}
                  aria-pressed={size === s}
                  onClick={() => setSize(s)}
                >
                  {s}
                </StyledSizeBtn>
              ))}
            </StyledSizes>
          </StyledSizeRow>

          {/* Explicitly no Length selector — not on this PDP. */}

          <StyledCta type="button" onClick={onAdd}>
            {ctaShowSave ? (
              <StyledCtaInner data-testid="atc-discount-text">
                <StyledCtaPart>
                  {t("offer.ctaAddOnly", { defaultValue: "ADD TO CART" })}
                </StyledCtaPart>
                <StyledCtaDivider aria-hidden />
                <StyledCtaPart aria-live="polite">
                  {t("offer.ctaSaveShort", {
                    defaultValue: "SAVE {{savings}}",
                    savings: ctaSavings,
                  })}
                </StyledCtaPart>
              </StyledCtaInner>
            ) : (
              t("offer.ctaAddOnly", { defaultValue: "ADD TO CART" })
            )}
          </StyledCta>
          <StyledPolicy>
            <StyledPolicyHead>
              <Image
                src="/shapermint-essentials-sweetheart-cami/icon-return.svg"
                alt=""
                width={24}
                height={24}
                unoptimized
                aria-hidden
              />
              <StyledPolicyTitle>
                {t("offer.policyTitle", { defaultValue: "90-Day Return Policy" })}
              </StyledPolicyTitle>
            </StyledPolicyHead>
            <StyledPolicyBody>
              {t("offer.policyBodyBefore", { defaultValue: "Enjoy " })}
              <strong>
                {t("offer.policyBodyBold", {
                  defaultValue: "hassle-free exchanges within 90 days!",
                })}
              </strong>
              {t("offer.policyBodyAfter", {
                defaultValue:
                  " Swap your product for any size, color, or style you love. No questions asked!",
              })}
            </StyledPolicyBody>
          </StyledPolicy>
        </StyledBuybox>
      </StyledGrid>

      <StyledBelowGrid>
        <LeggingsB2g3SizeChart />
        <StyledBelowRight>
          <LeggingsB2g3PdpAccordion />
        </StyledBelowRight>
      </StyledBelowGrid>

      <LeggingsB2g3SeeInYourSizeModal
        open={siysOpen}
        initialSize={size}
        onClose={() => setSiysOpen(false)}
        onSelect={(next) => {
          setSize(next);
          setSiysOpen(false);
        }}
      />
    </StyledSection>
  );
};
