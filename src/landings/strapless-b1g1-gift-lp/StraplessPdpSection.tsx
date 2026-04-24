import Image from "next/image";
import styled from "styled-components";
import { useState } from "react";
import { useTranslation } from "next-i18next/pages";
import { StraplessB1g1Cdn } from "./straplessB1g1Cdn";
import { StraplessPrimaryButton } from "./StraplessPrimaryButton";
import { StraplessFiveStars } from "./StraplessFiveStars";
import { handleKeyDown } from "@/shared/utils/KeyEvent";

const StyledSection = styled.section`
  background: #fff;
  padding-top: 0;
  padding-bottom: clamp(50px, 7vw, 90px);
`;

const StyledInner = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: clamp(20px, 3vw, 40px);
  align-items: flex-start;
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 clamp(16px, 3vw, 40px);
  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
  }
`;

const StyledGallery = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const StyledGalleryCell = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 540 / 740;
  background: #ddd;
  img {
    object-fit: cover;
  }
`;

const StyledBuybox = styled.aside`
  background: #fff;
  padding: 16px 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: sticky;
  top: 90px;
  @media (max-width: 1023px) {
    position: static;
    padding: 32px 0;
  }
`;

const StyledCrumb = styled.p`
  font-family: var(--font-display);
  font-size: 11px;
  color: var(--ink-700);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 0;
`;

const StyledTitle = styled.h2`
  font-family: var(--font-body);
  font-size: 22px;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.02em;
  color: var(--ink-900);
  margin: 6px 0 8px;
`;

const StyledRatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--ink-700);
  a {
    color: var(--ink-700);
    text-decoration: underline;
  }
`;

const StyledBlurb = styled.p`
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.4;
  color: #000;
  margin: 0;
`;

const StyledLabel = styled.div`
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 14px;
  color: var(--ink-900);
  margin-bottom: 8px;
`;

const StyledPacks = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`;

const StyledPack = styled.div<{ $selected?: boolean }>`
  position: relative;
  border: ${({ $selected }) => ($selected ? "2px solid var(--mint-500)" : "1px solid var(--ink-300)")};
  border-radius: 8px;
  padding: 14px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  background: ${({ $selected }) => ($selected ? "#F5FAF9" : "#fff")};
  transition: border-color var(--dur-fast);
  text-align: center;
  outline: none;
  &:hover {
    border-color: var(--ink-900);
  }
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

const StyledPackPop = styled.div`
  position: absolute;
  top: -9px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--coral-500);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 2px 10px;
  border-radius: 9999px;
  white-space: nowrap;
  width: 106px;
  text-align: center;
`;

const StyledPackUnits = styled.div`
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 16px;
  color: #000;
`;

const StyledPackSave = styled.div<{ $highlight?: boolean }>`
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 4px;
  background: ${({ $highlight }) => ($highlight ? "var(--coral-500)" : "#fff")};
  border: ${({ $highlight }) => ($highlight ? "none" : "1px solid var(--ink-300)")};
  color: ${({ $highlight }) => ($highlight ? "#fff" : "var(--ink-900)")};
  letter-spacing: 0.02em;
`;

const StyledStrike = styled.div`
  font-size: 13px;
  color: var(--ink-600);
  text-decoration: line-through;
`;

const StyledFinal = styled.div`
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 15px;
  color: #000;
`;

const StyledColorpicker = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const StyledThumb = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 2px;
  overflow: hidden;
  background: #eee;
  flex-shrink: 0;
`;

const StyledSwatches = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledSwatch = styled.span<{ $bg: string; $selected?: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 9999px;
  border: 1.5px solid var(--ink-200);
  background: ${({ $bg }) => $bg};
  cursor: pointer;
  outline: ${({ $selected }) => ($selected ? "2px solid var(--ink-900)" : "none")};
  outline-offset: 2px;
  box-sizing: border-box;
`;

const StyledSizes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const StyledSizeChip = styled.button<{ $selected?: boolean }>`
  min-width: 44px;
  height: 36px;
  padding: 0 12px;
  border: 1px solid var(--ink-300);
  border-radius: 4px;
  background: ${({ $selected }) => ($selected ? "var(--ink-900)" : "#fff")};
  color: ${({ $selected }) => ($selected ? "#fff" : "#000")};
  border-color: ${({ $selected }) => ($selected ? "var(--ink-900)" : "var(--ink-300)")};
  font-family: var(--font-display);
  font-size: 14px;
  cursor: pointer;
  transition: border-color var(--dur-fast);
  &:hover {
    border-color: var(--ink-900);
  }
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

const StyledReturnbox = styled.div`
  background: var(--ink-100);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  gap: 12px;
  svg {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    color: var(--ink-900);
  }
`;

const StyledReturnH = styled.h4`
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  margin: 0 0 6px;
  color: #000;
`;

const StyledReturnP = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #000;
`;

const StyledLongdesc = styled.div`
  h3 {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 17px;
    color: #000;
    margin: 0 0 12px;
  }
  p {
    font-family: var(--font-body);
    font-size: 15px;
    line-height: 1.5;
    color: #000;
    margin: 0 0 12px;
  }
`;

const StyledAccordion = styled.div`
  border-top: 1px solid var(--ink-200);
  details {
    border-bottom: 1px solid var(--ink-200);
  }
  summary {
    padding: 16px 0;
    font-family: var(--font-display);
    font-size: 15px;
    font-weight: 700;
    color: #000;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
  }
  summary::-webkit-details-marker {
    display: none;
  }
  summary::after {
    content: "＋";
    font-weight: 400;
    font-size: 20px;
    color: var(--ink-900);
  }
  details[open] summary::after {
    content: "−";
  }
  details > div {
    padding: 0 0 16px;
    font-family: var(--font-body);
    font-size: 14px;
    line-height: 1.55;
    color: var(--ink-700);
  }
`;

const StyledSizeRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const StyledFitLink = styled.a`
  font-size: 13px;
  color: var(--ink-900);
  text-decoration: underline;
`;

const StyledMeasureRow = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  margin-top: 10px;
  font-size: 13px;
  span {
    text-decoration: underline;
  }
`;

const packIds = ["1", "2", "3"] as const;
type PackId = (typeof packIds)[number];
const sizeOrder = ["XS", "S", "M", "L", "XL", "2X", "3X"] as const;

export const StraplessPdpSection = () => {
  const { t } = useTranslation("straplessB1g1GiftLp");
  const [pack, setPack] = useState<PackId>("2");
  const [size, setSize] = useState("S");
  const [blackPicker, setBlackPicker] = useState<"black" | "chai">("black");
  const [chaiPicker, setChaiPicker] = useState<"black" | "chai">("chai");

  return (
    <StyledSection id="buy" aria-labelledby="strapless-pdp-title">
      <StyledInner>
        <StyledGallery>
          <StyledGalleryCell>
            <Image src={StraplessB1g1Cdn.gallery1} alt={t("pdp.gallery1Alt")} fill sizes="(max-width: 1023px) 100vw, 50vw" />
          </StyledGalleryCell>
          <StyledGalleryCell>
            <Image src={StraplessB1g1Cdn.gallery2} alt={t("pdp.gallery2Alt")} fill sizes="(max-width: 1023px) 100vw, 50vw" />
          </StyledGalleryCell>
        </StyledGallery>

        <StyledBuybox>
          <StyledCrumb>{t("pdp.breadcrumb")}</StyledCrumb>
          <StyledTitle id="strapless-pdp-title">{t("pdp.title")}</StyledTitle>
          <StyledRatingRow>
            <StraplessFiveStars label={t("pdp.starsAria")} sizePx={16} />
            <a href="https://shapermint.com">{t("pdp.reviewsLink")}</a>
          </StyledRatingRow>
          <StyledBlurb>{t("pdp.blurb")}</StyledBlurb>

          <div>
            <StyledLabel>{t("pdp.packsLabel")}</StyledLabel>
            <StyledPacks>
              {packIds.map((id) => (
                <StyledPack
                  key={id}
                  role="button"
                  tabIndex={0}
                  $selected={pack === id}
                  aria-pressed={pack === id}
                  aria-label={t(`pdp.pack${id}Aria`)}
                  onClick={() => setPack(id)}
                  onKeyDown={(e) => handleKeyDown(e, () => setPack(id), ["Enter", " "])}
                >
                  {id === "2" ? <StyledPackPop>{t("pdp.packPopular")}</StyledPackPop> : null}
                  <StyledPackUnits>{t(`pdp.pack${id}Units`)}</StyledPackUnits>
                  <StyledPackSave $highlight={pack === id}>{t(`pdp.pack${id}Save`)}</StyledPackSave>
                  <StyledStrike>{t(`pdp.pack${id}Strike`)}</StyledStrike>
                  <StyledFinal>{t(`pdp.pack${id}Final`)}</StyledFinal>
                </StyledPack>
              ))}
            </StyledPacks>
          </div>

          <div>
            <StyledLabel>{t("pdp.colorsDualLabel")}</StyledLabel>
            <StyledColorpicker>
              <StyledThumb>
                <Image src={StraplessB1g1Cdn.swatchBlack} alt="" fill sizes="64px" />
              </StyledThumb>
              <div>
                <StyledLabel style={{ marginBottom: 6 }}>{t("pdp.colorBlackLabel")}</StyledLabel>
                <StyledSwatches>
                  <StyledSwatch
                    role="button"
                    tabIndex={0}
                    $bg="#1a1a1a"
                    $selected={blackPicker === "black"}
                    aria-label={t("pdp.swatchBlackAria")}
                    aria-pressed={blackPicker === "black"}
                    onClick={() => setBlackPicker("black")}
                    onKeyDown={(e) => handleKeyDown(e, () => setBlackPicker("black"), ["Enter", " "])}
                  />
                  <StyledSwatch
                    role="button"
                    tabIndex={0}
                    $bg="#d9b9a2"
                    $selected={blackPicker === "chai"}
                    aria-label={t("pdp.swatchChaiAria")}
                    aria-pressed={blackPicker === "chai"}
                    onClick={() => setBlackPicker("chai")}
                    onKeyDown={(e) => handleKeyDown(e, () => setBlackPicker("chai"), ["Enter", " "])}
                  />
                </StyledSwatches>
              </div>
            </StyledColorpicker>
            <StyledColorpicker style={{ marginTop: 14 }}>
              <StyledThumb>
                <Image src={StraplessB1g1Cdn.swatchChai} alt="" fill sizes="64px" />
              </StyledThumb>
              <div>
                <StyledLabel style={{ marginBottom: 6 }}>{t("pdp.colorChaiLabel")}</StyledLabel>
                <StyledSwatches>
                  <StyledSwatch
                    role="button"
                    tabIndex={0}
                    $bg="#1a1a1a"
                    $selected={chaiPicker === "black"}
                    aria-label={t("pdp.swatchBlackAria")}
                    aria-pressed={chaiPicker === "black"}
                    onClick={() => setChaiPicker("black")}
                    onKeyDown={(e) => handleKeyDown(e, () => setChaiPicker("black"), ["Enter", " "])}
                  />
                  <StyledSwatch
                    role="button"
                    tabIndex={0}
                    $bg="#d9b9a2"
                    $selected={chaiPicker === "chai"}
                    aria-label={t("pdp.swatchChaiAria")}
                    aria-pressed={chaiPicker === "chai"}
                    onClick={() => setChaiPicker("chai")}
                    onKeyDown={(e) => handleKeyDown(e, () => setChaiPicker("chai"), ["Enter", " "])}
                  />
                </StyledSwatches>
              </div>
            </StyledColorpicker>
          </div>

          <div>
            <StyledSizeRow>
              <StyledLabel style={{ margin: 0 }}>
                {t("pdp.sizeHeading", { size })}
              </StyledLabel>
              <StyledFitLink href="https://shapermint.com">{t("pdp.sizeGuide")}</StyledFitLink>
            </StyledSizeRow>
            <StyledSizes>
              {sizeOrder.map((s) => (
                <StyledSizeChip key={s} type="button" $selected={size === s} onClick={() => setSize(s)}>
                  {s}
                </StyledSizeChip>
              ))}
            </StyledSizes>
            <StyledMeasureRow>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--mint-700)" strokeWidth="2.2" aria-hidden>
                <polyline points="20 6 9 17 4 12" strokeLinecap="round" />
              </svg>
              <span>{t("pdp.measureHint")}</span>
            </StyledMeasureRow>
          </div>

          <StraplessPrimaryButton href="https://shapermint.com" $wide>
            {t("pdp.cta")}
          </StraplessPrimaryButton>

          <StyledReturnbox>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="M4 12a8 8 0 0 1 14-5.3L20 4" strokeLinecap="round" />
              <path d="M20 4v5h-5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20 12a8 8 0 0 1-14 5.3L4 20" strokeLinecap="round" />
              <path d="M4 20v-5h5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <StyledReturnH>{t("pdp.returnTitle")}</StyledReturnH>
              <StyledReturnP>{t("pdp.returnBody")}</StyledReturnP>
            </div>
          </StyledReturnbox>

          <StyledLongdesc>
            <h3>{t("pdp.longTitle")}</h3>
            <p>{t("pdp.longP1")}</p>
            <p>{t("pdp.longP2")}</p>
            <p>{t("pdp.longP3")}</p>
          </StyledLongdesc>

          <StyledAccordion>
            <details>
              <summary>{t("pdp.accSizeTitle")}</summary>
              <div>{t("pdp.accSizeBody")}</div>
            </details>
            <details>
              <summary>{t("pdp.accFabricTitle")}</summary>
              <div>
                {t("pdp.accFabricLine1")}
                <br />
                {t("pdp.accFabricLine2")}
                <br />
                {t("pdp.accFabricLine3")}
              </div>
            </details>
            <details>
              <summary>{t("pdp.accCareTitle")}</summary>
              <div>{t("pdp.accCareBody")}</div>
            </details>
          </StyledAccordion>
        </StyledBuybox>
      </StyledInner>
    </StyledSection>
  );
};
