import Image from "next/image";
import { useMemo, useState } from "react";
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

export type LeggingsB2g3OfferSectionProps = {
  layout: LayoutId;
  anchor: AnchorId;
};

const StyledSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 12px 24px;
  box-sizing: border-box;
  @media (min-width: 900px) {
    padding: 24px 24px 32px;
  }
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  @media (min-width: 900px) {
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    gap: 40px;
    align-items: start;
  }
`;

const StyledBelowGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;
  margin-top: 28px;
  @media (min-width: 900px) {
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    gap: 40px;
    align-items: start;
    margin-top: 8px;
  }
`;

const StyledGallery = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
`;

const StyledHero = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 12px;
  overflow: hidden;
  background: var(--ink-100);
`;

const StyledThumbs = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
`;

const StyledThumbBtn = styled.button<{ $active?: boolean }>`
  flex: 0 0 auto;
  width: 64px;
  height: 80px;
  padding: 0;
  border: 2px solid ${({ $active }) => ($active ? "var(--ink-900)" : "transparent")};
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  background: var(--ink-100);
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;


const StyledBuybox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
`;

const StyledTitle = styled.h1`
  margin: 0;
  font-family: var(--font-body);
  font-size: clamp(1.35rem, 2.6vw, 1.75rem);
  font-weight: 700;
  line-height: 1.2;
  color: #292929;
  letter-spacing: -0.01em;
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
  color: #f5a623;
  line-height: 0;
`;

const StyledStar = styled.span<{ $fill: number }>`
  position: relative;
  display: inline-block;
  width: 16px;
  height: 16px;
  font-size: 16px;
  line-height: 16px;
  color: #e5e5e5;
  &::before {
    content: "★";
    position: absolute;
    inset: 0;
    color: #e5e5e5;
  }
  &::after {
    content: "★";
    position: absolute;
    inset: 0;
    color: #f5a623;
    width: ${({ $fill }) => `${Math.max(0, Math.min(1, $fill)) * 100}%`};
    overflow: hidden;
  }
`;

const StyledReviewsLink = styled.a`
  font-size: 14px;
  font-weight: 500;
  color: #292929;
  text-decoration: underline;
  text-underline-offset: 2px;
  &:hover {
    color: #c64844;
  }
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
    border-radius: 2px;
  }
`;

const StyledPriceBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 10px;
`;

const StyledCompareWrap = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const StyledCompare = styled.s`
  font-size: 16px;
  color: #9b9b9b;
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
  color: #9b9b9b;
  cursor: help;
  line-height: 0;
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
    border-radius: 999px;
  }
`;

const StyledSale = styled.span`
  display: inline-flex;
  align-items: flex-start;
  font-family: var(--font-body);
  font-weight: 800;
  color: #1a1a1a;
  letter-spacing: -0.02em;
  line-height: 1;
`;

const StyledSaleCurrency = styled.span`
  font-size: 22px;
  line-height: 1;
  margin-top: 2px;
`;

const StyledSaleDollars = styled.span`
  font-size: 36px;
  line-height: 1;
`;

const StyledSaleCents = styled.sup`
  font-size: 16px;
  font-weight: 800;
  line-height: 1;
  margin-left: 1px;
  top: 0.15em;
`;

const StyledBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem;
  min-height: 1.25rem;
  border-radius: 0.25rem;
  background: #c64844;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  line-height: 1rem;
  white-space: nowrap;
`;

const StyledCallout = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 17px;
  border-radius: 8px;
  background: #f5faf9;
  border: 1px dashed #d7e3d6;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const StyledCalloutTitleRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0.02em;
  color: #c64844;
`;

const StyledPulseDot = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #4cbea4;
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
  color: #c64844;
  letter-spacing: 0.02em;
`;

const StyledCalloutBody = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: #1a1a1a;
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
  border-top: 0.56px dashed #d7e3d6;
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
  color: #6e7b72;
  letter-spacing: 0.2px;
`;

const StyledIncludeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 0;
  & + & {
    border-top: 0.56px dashed #d7e3d6;
  }
`;

const StyledIncludeThumb = styled.div`
  width: 50px;
  height: 50px;
  flex: none;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  border: 1px solid #ecefec;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledIncludeName = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #292929;
  min-width: 0;
`;

const StyledIncludePrice = styled.span`
  margin-left: auto;
  padding-left: 12px;
  font-size: 14px;
  white-space: nowrap;
  color: #292929;
  s {
    color: #9aa39c;
    font-weight: 400;
    margin-right: 5px;
  }
  b {
    color: #c64844;
    font-weight: 700;
  }
`;

const StyledPackHeader = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: var(--ink-900);
`;

const StyledPacks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledPackCard = styled.div<{ $selected?: boolean; $hasBadge?: boolean }>`
  position: relative;
  border-radius: 10px;
  border: ${({ $selected }) =>
    $selected ? "2px solid var(--mint-500, #3f9754)" : "1px solid var(--ink-300)"};
  background: ${({ $selected }) => ($selected ? "#f5faf9" : "var(--white)")};
  cursor: pointer;
  overflow: visible;
  /* Room under floating BEST VALUE so it doesn't cover price */
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
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  padding: 4px 8px;
  border-radius: 4px;
  color: var(--white);
  background: #c64844;
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
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  color: #292929;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e5e5;
`;

const StyledSlot = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 12px 0;
`;

const StyledSlotThumb = styled.div`
  width: 60px;
  height: 80px;
  border-radius: 8px;
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
  color: #292929;
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
  border-radius: 999px;
  padding: 0;
  cursor: pointer;
  background: ${({ $bg }) => $bg};
  border: ${({ $selected, $light }) => {
    if ($selected) return "2px solid #1a1a1a";
    if ($light) return "1px solid #d0d0d0";
    return "1px solid transparent";
  }};
  box-shadow: ${({ $selected }) =>
    $selected ? "inset 0 0 0 2px #fff" : "none"};
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
  font-size: 14px;
  color: #292929;
  span {
    font-weight: 400;
    color: rgb(128, 128, 128);
    font-size: 0.875rem;
  }
`;

const StyledSizes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const StyledSizeBtn = styled.button<{ $selected?: boolean }>`
  min-width: 44px;
  height: 40px;
  padding: 0 10px;
  border-radius: 8px;
  border: 1px solid ${({ $selected }) => ($selected ? "var(--ink-900)" : "var(--ink-300)")};
  background: ${({ $selected }) => ($selected ? "var(--ink-900)" : "var(--white)")};
  color: ${({ $selected }) => ($selected ? "var(--white)" : "var(--ink-900)")};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

const StyledCta = styled.button`
  display: block;
  width: 100%;
  min-height: 52px;
  border: none;
  border-radius: 10px;
  background: var(--coral-500);
  color: var(--white);
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  &:hover {
    background: var(--coral-450, #e86a5e);
  }
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

const StyledPolicy = styled.div`
  margin: 0;
  padding: 20px 22px;
  width: 100%;
  box-sizing: border-box;
  background: #f7f7f7;
  border-radius: 8px;
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
  line-height: 1.25;
  color: #1a1a1a;
`;

const StyledPolicyBody = styled.p`
  margin: 0;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: #1a1a1a;
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

  const ctaLabel = useMemo(() => {
    if (isSelector && pack === "single") {
      return t("offer.ctaAddOnly");
    }
    return t("offer.ctaSave", { savings: money(pricing.savings) });
  }, [isSelector, pack, pricing.savings, t]);

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
          <StyledHero>
            <Image
              key={heroSrc}
              src={heroSrc}
              alt={PRODUCT.title}
              fill
              priority
              unoptimized
              sizes="(max-width: 900px) 100vw, 560px"
              style={{ objectFit: "cover" }}
            />
          </StyledHero>
          <StyledThumbs>
            {LeggingsB2g3Cdn.gallery.map((src) => (
              <StyledThumbBtn
                key={src}
                type="button"
                $active={heroSrc === src}
                aria-label={t("offer.galleryThumb", { n: LeggingsB2g3Cdn.gallery.indexOf(src) + 1 })}
                onClick={() => setHeroSrc(src)}
              >
                <Image src={src} alt="" width={64} height={80} unoptimized style={{ objectFit: "cover" }} />
              </StyledThumbBtn>
            ))}
          </StyledThumbs>
        </StyledGallery>

        <StyledBuybox>
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
                        <div style={{ color: "#c64844", fontWeight: 700, fontSize: 12, marginTop: 2 }}>
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

          <StyledSizeRow>
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
            {ctaLabel}
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
        <LeggingsB2g3PdpAccordion />
      </StyledBelowGrid>
    </StyledSection>
  );
};
