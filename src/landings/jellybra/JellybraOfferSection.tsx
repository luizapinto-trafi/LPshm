import Image from "next/image";
import styled from "styled-components";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "next-i18next/pages";
import { handleKeyDown } from "@/shared/utils/KeyEvent";
import { JellybraCdn, JellybraShopUrl } from "./jellybraCdn";
import {
  JellybraSplitCta,
  JellybraSplitCtaDivider,
  JellybraSplitCtaPart,
} from "./JellybraPrimaryButton";

/**
 * Viral ebra PDP chrome (vertical thumbs, dual color, Band+Cup, split CTA).
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

const BANDS = [30, 32, 34, 36, 38, 40, 42, 44] as const;
type BandId = (typeof BANDS)[number];

const CUPS = ["A", "B", "C", "D", "DD/E", "DDD/F", "G"] as const;
type CupId = (typeof CUPS)[number];

/** Band × cup → letter size. S row matches Jelly Bra HTML fits. */
const SIZE_CHART: Record<CupId, (SizeId | null)[]> = {
  A: [null, "S", "S", "M", "L", null, null, null],
  B: ["S", "S", "S", "M", "L", "L", "XL", "2XL"],
  C: ["S", "S", "M", "M", "L", "XL", "2XL", "2XL"],
  D: ["S", "M", "M", "L", "XL", "XL", "2XL", "3XL"],
  "DD/E": ["S", "M", "L", "L", "XL", "2XL", "2XL", "3XL"],
  "DDD/F": ["M", "L", "L", "XL", "XL", "2XL", "3XL", "3XL"],
  G: ["M", "L", "XL", "XL", "2XL", "2XL", "3XL", "4XL"],
};

const lookupSize = (band: BandId | null, cup: CupId | null): SizeId | null => {
  if (band == null || cup == null) return null;
  const i = BANDS.indexOf(band);
  if (i < 0) return null;
  return SIZE_CHART[cup][i] ?? null;
};

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

const StyledMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 0;
  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const StyledRatingRow = styled.div`
  display: flex;
  align-items: center;
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
  margin-left: 0.313rem;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledProductTitle = styled.h3`
  font-family: var(--font-body);
  font-size: 30px;
  font-weight: 500;
  line-height: 1.25;
  color: var(--ink-900);
  margin: 16px 0 0;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const StyledUrgency = styled.p`
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.4;
  color: var(--ink-900);
  margin: 16px 0 0;
`;

const StyledBuyboxDivider = styled.div`
  border: unset;
  outline: unset;
  background-color: var(--ink-200);
  height: 1px;
  width: 100%;
  margin: 4% auto;
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
  color: var(--ink-900);
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  text-align: center;
  height: 18px;
  line-height: 18px;
  padding: 0 6px;
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

const StyledBandCup = styled.div`
  width: 100%;
  max-width: 90dvw;
  margin-bottom: var(--space-400);
`;

const StyledBandCupRow = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
`;

const StyledBandCupPair = styled.div`
  display: flex;
  gap: 5px;
  max-width: 260px;
  flex: 1 1 auto;
`;

const StyledSelect = styled.select`
  appearance: none;
  border: 1px solid var(--ink-300);
  border-radius: var(--radius-md);
  background: var(--white)
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23292929' d='M1.4 0.6 6 5.2 10.6.6 12 2 6 8 0 2z'/%3E%3C/svg%3E")
    no-repeat right 12px center;
  background-size: 10px 7px;
  box-sizing: border-box;
  min-height: 36px;
  height: 36px;
  padding: 0 32px 0 12px;
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--ink-900);
  cursor: pointer;
  width: 100%;
  min-width: 0;
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

const StyledEquals = styled.span`
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  color: var(--ink-900);
  padding: 0 4px;
`;

const StyledSizeResult = styled.div`
  display: flex;
  align-items: center;
  width: 160px;
  min-width: 133px;
  height: 36px;
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
  const [band, setBand] = useState<BandId | null>(null);
  const [cup, setCup] = useState<CupId | null>(null);
  const [size, setSize] = useState<SizeId | null>(null);
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
  const colorSummary =
    pack === 2
      ? `${colorA === "black" ? t("offer.colorBlack") : t("offer.colorChai")}, ${
          colorB === "black" ? t("offer.colorBlack") : t("offer.colorChai")
        }`
      : colorA === "black"
        ? t("offer.colorBlack")
        : t("offer.colorChai");

  const computed = useMemo(() => lookupSize(band, cup), [band, cup]);

  const sizeHeading =
    size != null
      ? `${t("offer.sizeHeading")} ${size}`
      : `${t("offer.sizeHeading")} ${t("offer.sizeSelectPrompt")}`;

  const onBandChange = (next: BandId | null) => {
    setBand(next);
    const mapped = lookupSize(next, cup);
    setSize(mapped);
  };

  const onCupChange = (next: CupId | null) => {
    setCup(next);
    const mapped = lookupSize(band, next);
    setSize(mapped);
  };

  const onSizeChange = (next: SizeId | null) => {
    setSize(next);
  };

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
              </StyledMainImage>
              <StyledSeeSizeWrap>
                <StyledSeeSize type="button" onClick={scrollToSizes}>
                  {t("offer.seeInYourSize")}
                </StyledSeeSize>
              </StyledSeeSizeWrap>
            </StyledGallery>
          </div>

          <div>
            <StyledMeta>
              <Image
                src={JellybraCdn.sealSellingFast}
                alt={t("offer.sellingFastAlt")}
                width={90}
                height={34}
                unoptimized
              />
              <StyledRatingRow>
                <StyledStars aria-label={t("offer.starsAria")}>★★★★★</StyledStars>
                <StyledReviewsLink href="#reviews">{t("offer.reviewsLink")}</StyledReviewsLink>
              </StyledRatingRow>
            </StyledMeta>

            <StyledProductTitle>{t("offer.productTitle")}</StyledProductTitle>
            <StyledUrgency>{t("offer.urgency")}</StyledUrgency>
            <StyledBuyboxDivider aria-hidden />

            <StyledChoose>
              {t("offer.chooseSavings")} <strong>{packLabel}</strong>
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

            <StyledBandCup id="jellybra-size-picker" data-testid="bandAndCupSizeSelector">
              <StyledSizeLabel>
                <strong>{sizeHeading}</strong>
              </StyledSizeLabel>
              <StyledBandCupRow>
                <StyledBandCupPair>
                  <StyledSelect
                    aria-label={t("offer.bandAria")}
                    value={band ?? ""}
                    onChange={(e) => onBandChange(e.target.value ? (Number(e.target.value) as BandId) : null)}
                  >
                    <option value="">{t("offer.bandPlaceholder")}</option>
                    {BANDS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </StyledSelect>
                  <StyledSelect
                    aria-label={t("offer.cupAria")}
                    value={cup ?? ""}
                    onChange={(e) => onCupChange(e.target.value ? (e.target.value as CupId) : null)}
                  >
                    <option value="">{t("offer.cupPlaceholder")}</option>
                    {CUPS.map((c) => (
                      <option key={c} value={c} disabled={band != null && lookupSize(band, c) == null}>
                        {c}
                      </option>
                    ))}
                  </StyledSelect>
                </StyledBandCupPair>
                <StyledEquals aria-hidden>=</StyledEquals>
                <StyledSizeResult>
                  <StyledSelect
                    aria-label={t("offer.sizeResultAria")}
                    value={size ?? ""}
                    onChange={(e) => onSizeChange(e.target.value ? (e.target.value as SizeId) : null)}
                  >
                    <option value="">{t("offer.sizePlaceholder")}</option>
                    {SIZES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </StyledSelect>
                </StyledSizeResult>
              </StyledBandCupRow>
              {band != null && cup != null && computed == null ? (
                <StyledSizeLabel style={{ marginTop: 8, fontSize: 14, color: "var(--coral-500)" }}>
                  {t("offer.sizeUnavailable")}
                </StyledSizeLabel>
              ) : null}
            </StyledBandCup>

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
