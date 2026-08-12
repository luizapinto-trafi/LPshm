import Image from "next/image";
import styled from "styled-components";
import { useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next/pages";
import { handleKeyDown } from "@/shared/utils/KeyEvent";
import { JellybraCdn, JellybraShopUrl, JellybraSizeGuideUrl } from "./jellybraCdn";
import {
  JellybraSplitCta,
  JellybraSplitCtaDivider,
  JellybraSplitCtaPart,
} from "./JellybraPrimaryButton";

/**
 * Offer / ProductDetails aligned to the Jelly Bra PDP buybox:
 * shipping note, reviews above title, packs, dual color, S–4XL sizes.
 * Gallery images + pack prices from the Jelly Bra HTML. No free gift.
 */
const GALLERY = [
  JellybraCdn.galleryFront,
  JellybraCdn.beforeAfter,
  JellybraCdn.reasonSilhouette,
  JellybraCdn.reasonSupport,
  JellybraCdn.reasonLift,
  JellybraCdn.galleryBack,
  JellybraCdn.heroProduct,
  JellybraCdn.galleryBlack,
  JellybraCdn.galleryFabric,
] as const;

const SIZES = ["S", "M", "L", "XL", "2XL", "3XL", "4XL"] as const;
type SizeId = (typeof SIZES)[number];
type PackId = 1 | 2;
type ColorId = "black" | "chai";

const StyledHeadingStrip = styled.div`
  background: var(--white);
  text-align: center;
  padding: var(--space-1000) var(--space-400) var(--space-600);
  @media (max-width: 899px) {
    padding: var(--space-800) var(--space-400) var(--space-500);
  }
`;

const StyledH2 = styled.h2`
  font-family: var(--font-display);
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 700;
  color: var(--ink-900);
  margin: 0;
`;

const StyledSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-400) var(--space-1000);
  @media (max-width: 899px) {
    padding: 0 var(--space-400) var(--space-800);
  }
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: var(--space-800);
  align-items: start;
  @media (max-width: 899px) {
    grid-template-columns: 1fr;
    gap: var(--space-600);
  }
`;

const StyledGallery = styled.div`
  display: grid;
  grid-template-columns: 65px minmax(0, 1fr);
  grid-template-rows: max-content max-content;
  column-gap: 20px;
  row-gap: 16px;
  width: 100%;
  align-items: start;
  @media (max-width: 899px) {
    display: flex;
    flex-direction: column;
    row-gap: 0;
  }
`;

const StyledThumbs = styled.div`
  grid-column: 1;
  grid-row: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-self: start;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: thin;
  @media (max-width: 899px) {
    flex-direction: row;
    order: 2;
    gap: 10px;
    height: auto !important;
    max-height: none !important;
    overflow-x: auto;
    overflow-y: hidden;
    margin-top: var(--space-300);
    padding-bottom: 6px;
  }
`;

const StyledThumbBtn = styled.button<{ $active?: boolean }>`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 65px;
  height: 86px;
  padding: 0;
  border-radius: 4px;
  border: 1px solid ${({ $active }) => ($active ? "var(--ink-900)" : "var(--ink-200)")};
  overflow: hidden;
  background: var(--white);
  cursor: pointer;
  line-height: 0;
  flex: 0 0 auto;
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

const StyledMainImage = styled.div`
  grid-column: 2;
  grid-row: 1;
  position: relative;
  overflow: hidden;
  background: transparent;
  line-height: 0;
  width: 100%;
  align-self: start;
  @media (max-width: 899px) {
    order: 1;
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
  grid-column: 2;
  grid-row: 2;
  display: flex;
  justify-content: center;
  width: 100%;
  @media (max-width: 899px) {
    order: 3;
    margin-top: var(--space-300);
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

const StyledShipping = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
  margin: 0 0 var(--space-400);
  padding: 10px 12px;
  background: var(--ink-100);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 1.4;
  color: var(--ink-900);
`;

const StyledMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin: 0 0 var(--space-300);
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

const StyledProductTitle = styled.h3`
  font-family: var(--font-body);
  font-size: 28px;
  font-weight: 400;
  line-height: 1.25;
  color: var(--ink-900);
  margin: 0 0 10px;
  letter-spacing: 0;
  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const StyledChoose = styled.p`
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 400;
  margin: 0 0 12px;
  color: var(--ink-900);
`;

const StyledPacks = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  margin-bottom: var(--space-500);
`;

const StyledPack = styled.div<{ $selected?: boolean }>`
  position: relative;
  flex: 1 1 0;
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  box-sizing: border-box;
  padding: 15px 8px;
  border-radius: 8px;
  border: ${({ $selected }) =>
    $selected ? "2px solid var(--mint-500)" : "1px solid #bbbbbb"};
  background: ${({ $selected }) => ($selected ? "#F5FAF9" : "var(--white)")};
  outline: none;
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
  width: fit-content;
`;

const StyledPackUnits = styled.div`
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 600;
  color: var(--ink-900);
  line-height: normal;
  padding-bottom: 8px;
`;

const StyledPackSave = styled.div<{ $selected?: boolean }>`
  display: inline-block;
  box-sizing: border-box;
  white-space: nowrap;
  text-transform: none;
  width: auto;
  border-radius: 4px;
  padding: 6px 8px;
  margin: 4px;
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 600;
  line-height: 12px;
  border: 1px solid ${({ $selected }) => ($selected ? "#c64844" : "#d1d1d1")};
  background: ${({ $selected }) => ($selected ? "#c64844" : "transparent")};
  color: ${({ $selected }) => ($selected ? "#fff" : "var(--ink-900)")};
`;

const StyledStrike = styled.div<{ $muted?: boolean }>`
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 400;
  color: ${({ $muted }) => ($muted ? "#767676" : "var(--ink-900)")};
  text-decoration: line-through;
  line-height: 1.2;
  padding-bottom: 8px;
`;

const StyledFinal = styled.div`
  font-family: var(--font-body);
  font-size: 18px;
  font-weight: 700;
  color: var(--ink-900);
  line-height: 1.2;
  span {
    font-size: 16px;
    font-weight: 400;
    color: var(--ink-900);
  }
`;

const StyledColorRow = styled.div`
  font-size: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--ink-200);
  color: var(--ink-900);
`;

const StyledColorPickers = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-300);
  padding: var(--space-300) 0;
  margin-bottom: var(--space-300);
`;

const StyledColorPicker = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const StyledColorThumb = styled.div`
  width: 66px;
  height: 88px;
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

const StyledSwatch = styled.button<{ $bg: string; $selected?: boolean }>`
  width: 34px;
  height: 34px;
  border-radius: var(--radius-full);
  background: ${({ $bg }) => $bg};
  border: none;
  cursor: pointer;
  box-shadow: ${({ $selected }) =>
    $selected
      ? "0 0 0 2px #FFFFFF inset, 0 0 0 3px var(--ink-900)"
      : "0 0 0 1px var(--ink-200)"};
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

const StyledSizeLabel = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
  color: var(--ink-900);
`;

const StyledSizeGuide = styled.div`
  border-top: 1px solid var(--ink-200);
  padding-top: var(--space-300);
  margin-bottom: var(--space-400);
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
  margin-bottom: var(--space-400);
  @media (max-width: 420px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const StyledSizeChip = styled.button<{ $selected?: boolean; $disabled?: boolean }>`
  min-width: 0;
  min-height: 44px;
  padding: 10px 6px;
  border-radius: 8px;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 600;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  background: ${({ $selected, $disabled }) =>
    $disabled ? "var(--white)" : $selected ? "var(--ink-900)" : "var(--white)"};
  color: ${({ $selected, $disabled }) =>
    $disabled ? "var(--ink-400)" : $selected ? "var(--white)" : "var(--ink-900)"};
  border: 1px solid
    ${({ $selected, $disabled }) =>
      $disabled ? "var(--ink-200)" : $selected ? "var(--ink-900)" : "var(--ink-300)"};
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

const StyledFits = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 15px;
  line-height: 1.5;
  margin-bottom: var(--space-400);
  color: var(--ink-900);
`;

const StyledReturn = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-top: var(--space-400);
  padding-top: var(--space-400);
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

const ColorPickerRow = ({
  label,
  value,
  onChange,
  thumbAlt,
  blackAria,
  chaiAria,
}: {
  label: string;
  value: ColorId;
  onChange: (c: ColorId) => void;
  thumbAlt: string;
  blackAria: string;
  chaiAria: string;
}) => (
  <StyledColorPicker>
    <StyledColorThumb>
      <Image
        src={value === "chai" ? JellybraCdn.galleryFabric : JellybraCdn.galleryFront}
        alt={thumbAlt}
        fill
        sizes="66px"
        unoptimized
        style={{ objectFit: "cover" }}
      />
    </StyledColorThumb>
    <div>
      <StyledSizeLabel style={{ marginBottom: 10 }}>{label}</StyledSizeLabel>
      <StyledSwatches>
        <StyledSwatch
          type="button"
          $bg="#000000"
          $selected={value === "black"}
          aria-label={blackAria}
          aria-pressed={value === "black"}
          onClick={() => onChange("black")}
        />
        <StyledSwatch
          type="button"
          $bg="#E8D9C5"
          $selected={value === "chai"}
          aria-label={chaiAria}
          aria-pressed={value === "chai"}
          onClick={() => onChange("chai")}
        />
      </StyledSwatches>
    </div>
  </StyledColorPicker>
);

export const JellybraOfferSection = () => {
  const { t } = useTranslation("jellybra");
  const [pack, setPack] = useState<PackId>(2);
  const [size, setSize] = useState<SizeId>("S");
  const [colorA, setColorA] = useState<ColorId>("black");
  const [colorB, setColorB] = useState<ColorId>("black");
  const [activeThumb, setActiveThumb] = useState(0);
  const [thumbsHeight, setThumbsHeight] = useState(0);
  const mainImageRef = useRef<HTMLDivElement>(null);

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
  const thumbs = t("offer.thumbs", { returnObjects: true }) as string[];
  const packLabel = pack === 2 ? t("offer.pack2Units") : t("offer.pack1Units");
  const fits = t(`offer.fits.${size}`);
  const colorSummary =
    pack === 2
      ? `${colorA === "black" ? t("offer.colorBlack") : t("offer.colorChai")}, ${
          colorB === "black" ? t("offer.colorBlack") : t("offer.colorChai")
        }`
      : colorA === "black"
        ? t("offer.colorBlack")
        : t("offer.colorChai");

  const scrollToSizes = () => {
    document.getElementById("jellybra-size-picker")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      <StyledHeadingStrip>
        <StyledH2 id="jellybra-offer-title">{t("offer.title")}</StyledH2>
      </StyledHeadingStrip>

      <StyledSection id="offer" aria-labelledby="jellybra-offer-title">
        <StyledGrid>
          <div>
            <StyledGallery>
              <StyledThumbs
                role="list"
                aria-label={t("offer.galleryThumbsAria")}
                style={thumbsHeight > 0 ? { height: thumbsHeight, maxHeight: thumbsHeight } : undefined}
              >
                {GALLERY.map((src, i) => (
                  <StyledThumbBtn
                    key={src}
                    type="button"
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
                <StyledSeal>
                  <Image
                    src={JellybraCdn.sealSale}
                    alt={t("offer.sealAlt")}
                    width={134}
                    height={22}
                    unoptimized
                    style={{ display: "block", height: 22, width: "auto" }}
                  />
                </StyledSeal>
                <StyledNewIn>
                  <Image
                    src={JellybraCdn.sealNewIn}
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
          </div>

          <div>
            <StyledShipping>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M3 7h11v10H3V7zm11 3h4l3 3v4h-7V10z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <circle cx="7.5" cy="18.5" r="1.5" fill="currentColor" />
                <circle cx="17.5" cy="18.5" r="1.5" fill="currentColor" />
              </svg>
              <span>
                Get <strong>{t("offer.shippingStrong")}</strong> {t("offer.shippingRest")}
              </span>
            </StyledShipping>

            <StyledProductTitle>
              Shapermint Essentials
              <br />
              Everyday Wireless Jelly Bra
            </StyledProductTitle>

            <StyledMeta>
              <StyledStars aria-label={t("offer.starsAria")}>★★★★★</StyledStars>
              <StyledReviewsLink href="#reviews">{t("offer.reviewsLink")}</StyledReviewsLink>
            </StyledMeta>

            <StyledChoose>
              {t("offer.chooseSavings")} {packLabel}
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

            <StyledColorRow>
              {t("offer.colorLabel")} <strong>{colorSummary}</strong>
            </StyledColorRow>

            <StyledColorPickers>
              <ColorPickerRow
                label={`${t("offer.colorLabel")} ${colorA === "black" ? t("offer.colorBlack") : t("offer.colorChai")}`}
                value={colorA}
                onChange={setColorA}
                thumbAlt={t("offer.colorThumbAlt")}
                blackAria={t("offer.swatchBlackAria")}
                chaiAria={t("offer.swatchChaiAria")}
              />
              {pack === 2 ? (
                <ColorPickerRow
                  label={`${t("offer.colorLabel")} ${colorB === "black" ? t("offer.colorBlack") : t("offer.colorChai")}`}
                  value={colorB}
                  onChange={setColorB}
                  thumbAlt={t("offer.colorThumbAlt")}
                  blackAria={t("offer.swatchBlackAria")}
                  chaiAria={t("offer.swatchChaiAria")}
                />
              ) : null}
            </StyledColorPickers>

            <StyledSizeGuide>
              <StyledSizeGuideLink href={JellybraSizeGuideUrl} target="_blank" rel="noopener noreferrer">
                <Image src={JellybraCdn.iconSizeGuide} alt="" width={24} height={12} unoptimized />
                <span>{t("offer.sizeGuide")}</span>
              </StyledSizeGuideLink>
            </StyledSizeGuide>

            <div id="jellybra-size-picker">
              <StyledSizeLabel>
                {t("offer.sizeHeading")} <strong>{size}</strong>
              </StyledSizeLabel>
              <StyledSizes>
                {SIZES.map((s) => {
                  const soldOut = s === "4XL";
                  return (
                    <StyledSizeChip
                      key={s}
                      type="button"
                      $selected={size === s}
                      $disabled={soldOut}
                      disabled={soldOut}
                      onClick={() => !soldOut && setSize(s)}
                    >
                      {s}
                    </StyledSizeChip>
                  );
                })}
              </StyledSizes>
            </div>

            <StyledFits>
              <Image src={JellybraCdn.iconFit} alt="" width={30} height={30} unoptimized />
              <div>
                <strong>{t("offer.fitsLabel")}</strong> {fits}
              </div>
            </StyledFits>

            <JellybraSplitCta $full href={JellybraShopUrl}>
              <JellybraSplitCtaPart>{t("offer.ctaLabel")}</JellybraSplitCtaPart>
              <JellybraSplitCtaDivider aria-hidden />
              <JellybraSplitCtaPart>{t("offer.ctaOffer")}</JellybraSplitCtaPart>
            </JellybraSplitCta>

            <StyledReturn>
              <Image src={JellybraCdn.iconReturn} alt="" width={34} height={34} unoptimized />
              <div>
                <StyledReturnTitle>{t("offer.returnTitle")}</StyledReturnTitle>
                <StyledReturnBody>
                  {t("offer.returnBodyBefore")} <strong>{t("offer.returnBodyStrong")}</strong>{" "}
                  {t("offer.returnBodyAfter")}
                </StyledReturnBody>
              </div>
            </StyledReturn>
          </div>
        </StyledGrid>
      </StyledSection>
    </>
  );
};
