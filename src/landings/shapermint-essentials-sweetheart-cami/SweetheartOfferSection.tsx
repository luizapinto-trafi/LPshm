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
 * Offer / ProductDetails aligned to the live Shapermint PDP buybox
 * (gallery thumbs, packs, dual color, S–4XL). Title stack follows PDP logic:
 * promotional title, subtitle, product name. GWP is a gift tile, not a top banner.
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

const StyledSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 10px 32px;
  box-sizing: border-box;
  width: 100%;
  @media (min-width: 900px) {
    padding: var(--space-800) var(--space-400) var(--space-1000);
  }
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-areas:
    "title"
    "gallery"
    "buybox";
  gap: 14px;
  align-items: start;
  width: 100%;
  min-width: 0;
  @media (min-width: 900px) {
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    grid-template-areas: "gallery buybox";
    gap: var(--space-800);
  }
`;

const StyledGalleryCol = styled.div`
  grid-area: gallery;
  min-width: 0;
  width: 100%;
  @media (min-width: 900px) {
    position: sticky;
    top: 96px;
    align-self: start;
  }
`;

const StyledTitleBlock = styled.div`
  grid-area: title;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 4px 0 2px;
  min-width: 0;
  @media (min-width: 900px) {
    grid-area: auto;
    gap: 12px;
    padding: 0;
  }
`;

const StyledBuybox = styled.div`
  display: contents;
  @media (min-width: 900px) {
    display: flex;
    flex-direction: column;
    gap: 14px;
    grid-area: buybox;
    min-width: 0;
  }
`;

const StyledBuyboxInner = styled.div`
  grid-area: buybox;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 0;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  @media (min-width: 900px) {
    grid-area: auto;
  }
`;

const StyledCtaBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: stretch;
  margin-top: 18px; /* +14px buybox gap → 32px from Fits/sizes */
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
  height: auto !important;
  max-height: none !important;
  padding-bottom: 2px;
  @media (min-width: 900px) {
    flex-direction: column;
    grid-column: 1;
    grid-row: 1;
    order: unset;
    gap: 12px;
    align-self: start;
    overflow-x: hidden;
    overflow-y: auto;
    height: auto;
    max-height: none;
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

const StyledPromoTitle = styled.h1`
  font-family: var(--font-display);
  font-size: clamp(21px, 5.5vw, 28px);
  font-weight: 700;
  line-height: 1.1;
  color: var(--ink-900);
  margin: 0;
  letter-spacing: -0.01em;
  @media (min-width: 900px) {
    font-size: clamp(22px, 2.4vw, 28px);
    line-height: 1.2;
  }
`;

const StyledSubtitle = styled.p`
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 1.4;
  color: var(--ink-600);
  margin: 0;
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
  align-items: stretch;
  gap: 8px;
  margin: 0;
  padding-top: 10px;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
`;

const StyledPack = styled.div<{ $selected?: boolean }>`
  position: relative;
  flex: 1 1 0;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  box-sizing: border-box;
  padding: 16px 6px 12px;
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
  @media (min-width: 900px) {
    padding: 18px 8px 15px;
  }
`;

const StyledPackPop = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  background: var(--mint-500);
  color: var(--white);
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
  font-size: 13px;
  font-weight: 600;
  color: var(--ink-900);
  line-height: normal;
  padding-bottom: 6px;
  @media (min-width: 900px) {
    font-size: 14px;
    padding-bottom: 8px;
  }
`;

const StyledPackSave = styled.div<{ $selected?: boolean }>`
  display: inline-block;
  box-sizing: border-box;
  white-space: nowrap;
  text-transform: none;
  max-width: 100%;
  border-radius: 4px;
  padding: 5px 6px;
  margin: 2px 0 4px;
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 600;
  line-height: 12px;
  border: 1px solid ${({ $selected }) => ($selected ? "#c64844" : "#d1d1d1")};
  background: ${({ $selected }) => ($selected ? "#c64844" : "transparent")};
  color: ${({ $selected }) => ($selected ? "#fff" : "var(--ink-900)")};
  @media (min-width: 900px) {
    padding: 6px 8px;
    margin: 4px;
    font-size: 12px;
  }
`;

const StyledStrike = styled.div<{ $muted?: boolean }>`
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 400;
  color: ${({ $muted }) => ($muted ? "#767676" : "var(--ink-900)")};
  text-decoration: line-through;
  line-height: 1.2;
  padding-bottom: 4px;
  @media (min-width: 900px) {
    font-size: 14px;
    padding-bottom: 8px;
  }
`;

const StyledFinal = styled.div`
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 700;
  color: var(--ink-900);
  line-height: 1.2;
  word-break: break-word;
  span {
    font-size: 13px;
    font-weight: 400;
    color: var(--ink-900);
  }
  @media (min-width: 900px) {
    font-size: 18px;
    span {
      font-size: 16px;
    }
  }
`;

const StyledGift = styled.div`
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr);
  gap: 12px;
  align-items: center;
  padding: 10px;
  margin: 0;
  border: 1px solid var(--mint-500);
  border-radius: var(--radius-lg);
  background: var(--mint-100);
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  min-width: 0;
  @media (min-width: 900px) {
    grid-template-columns: 66px minmax(0, 1fr);
    gap: 14px;
    padding: 12px;
  }
`;

const StyledGiftThumb = styled.div`
  width: 56px;
  height: 74px;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  background: var(--white);
  flex: 0 0 auto;
  @media (min-width: 900px) {
    width: 66px;
    height: 88px;
  }
`;

const StyledGiftName = styled.p`
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  color: var(--ink-900);
  margin: 0 0 6px;
`;

const StyledGiftPrice = styled.p`
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 700;
  color: var(--coral-500);
  margin: 0;
  s {
    color: var(--ink-500);
    font-weight: 400;
    margin-right: 8px;
  }
`;

const StyledColorRow = styled.div`
  font-size: 16px;
  padding: 0;
  color: var(--ink-900);
`;

const StyledColorPickers = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0;
  margin: 0;
`;

const StyledColorPicker = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  min-width: 0;
  width: 100%;
  max-width: 100%;
  > div:last-child {
    min-width: 0;
    flex: 1 1 auto;
  }
`;

const StyledColorThumb = styled.div`
  width: 56px;
  height: 74px;
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
  font-size: 16px;
  margin-bottom: 8px;
  color: var(--ink-900);
`;

const StyledSizeGuide = styled.div`
  border-top: 1px solid var(--ink-200);
  padding-top: 12px;
  margin: 0;
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
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 8px;
  margin: 0;
  @media (max-width: 420px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const StyledSizeChip = styled.button<{ $selected?: boolean }>`
  min-width: 0;
  min-height: 44px;
  padding: 10px 6px;
  border-radius: 8px;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 600;
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
  color: var(--ink-900);
`;

const StyledFineprint = styled.p`
  font-family: var(--font-body);
  font-size: 11.5px;
  line-height: 1.4;
  color: var(--ink-600);
  margin: 0;
  text-align: center;
  @media (min-width: 900px) {
    font-size: 13px;
  }
`;

const StyledReturn = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin: 0;
  padding-top: 12px;
  border-top: 1px solid var(--ink-200);
`;

const StyledReturnTitle = styled.div`
  font-size: 15px;
  font-weight: 800;
  color: var(--ink-900);
`;

const StyledReturnBody = styled.div`
  font-size: 14px;
  color: var(--ink-600);
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
        sizes="56px"
        unoptimized
        style={{ objectFit: "cover" }}
      />
    </StyledColorThumb>
    <div>
      <StyledSizeLabel style={{ marginBottom: 8 }}>{label}</StyledSizeLabel>
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
          <StyledTitleBlock>
            <StyledPromoTitle id="sweetheart-promo-title">{t("offer.promoTitle")}</StyledPromoTitle>
            <StyledSubtitle>{t("offer.subtitle")}</StyledSubtitle>
          </StyledTitleBlock>

          <StyledBuyboxInner>
          <StyledMeta>
            <StyledStars aria-label={t("offer.starsAria")}>★★★★★</StyledStars>
            <StyledReviewsLink href="#reviews">{t("offer.reviewsLink")}</StyledReviewsLink>
          </StyledMeta>

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

          <StyledGift>
            <StyledGiftThumb>
              <Image
                src={SweetheartCdn.giftBottom}
                alt={t("offer.giftAlt")}
                fill
                sizes="66px"
                unoptimized
                style={{ objectFit: "cover" }}
              />
            </StyledGiftThumb>
            <div>
              <StyledGiftName>{t("offer.giftName")}</StyledGiftName>
              <StyledGiftPrice>
                <s>{t("offer.giftPriceWas")}</s>
                {t("offer.giftPriceNow")}
              </StyledGiftPrice>
            </div>
          </StyledGift>

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

          <div id="sweetheart-size-picker">
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
          </div>

          <StyledFits>
            Fits sizes: <strong>{FIT_CHART[size].range}</strong>
            {" | "}
            Bust: <strong>{FIT_CHART[size].bust} in</strong>
            {", "}
            Waist: <strong>{FIT_CHART[size].waist} in</strong>
          </StyledFits>

          <StyledCtaBlock>
            <StyledFineprint>{t("offer.fineprint")}</StyledFineprint>
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
          </StyledBuyboxInner>
        </StyledBuybox>
      </StyledGrid>
    </StyledSection>
  );
};
