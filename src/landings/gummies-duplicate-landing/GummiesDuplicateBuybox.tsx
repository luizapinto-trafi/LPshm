import Image from "next/image";
import styled from "styled-components";
import { useState } from "react";
import { useTranslation } from "next-i18next/pages";
import { GummiesDuplicateGallery } from "./gummiesDuplicateCdn";

const StyledSection = styled.section`
  background: var(--white);
  border-top: 1px solid var(--ink-200);
  padding: var(--space-1000) var(--space-400);
  scroll-margin-top: 80px;
  @media (min-width: 801px) {
    padding: var(--space-1200) var(--space-1000);
  }
`;

const StyledInner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const StyledHead = styled.div`
  text-align: center;
  margin-bottom: var(--space-1000);
`;

const StyledEyebrow = styled.div`
  display: inline-block;
  background: var(--coral-600);
  color: var(--white);
  font-size: 14px;
  font-weight: 800;
  padding: var(--space-200) var(--space-500);
  border-radius: var(--radius-full);
  border: 2px solid var(--ink-1000);
  box-shadow: 2px 2px 0 0 var(--ink-1000);
  margin-bottom: var(--space-400);
  font-family: var(--font-body);
`;

const StyledH2 = styled.h2`
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  font-weight: 800;
  color: var(--ink-1000);
  margin: 0;
  line-height: 1.15;
  max-width: 40rem;
  margin-inline: auto;
`;

const StyledGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-800);
  @media (min-width: 1000px) {
    flex-direction: row;
    align-items: flex-start;
    gap: var(--space-1000);
  }
`;

const StyledGallery = styled.div`
  width: 100%;
  @media (min-width: 1000px) {
    width: 60%;
    position: sticky;
    top: 6rem;
  }
  display: flex;
  flex-direction: column;
  gap: var(--space-300);
  @media (min-width: 1100px) {
    flex-direction: row-reverse;
    align-items: flex-start;
  }
`;

const StyledMain = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  min-width: 0;
  aspect-ratio: 1;
  border-radius: var(--radius-xl);
  border: 2px solid var(--ink-1000);
  box-shadow: 4px 4px 0 0 var(--ink-1000);
  overflow: hidden;
  background: var(--ink-100);
  line-height: 0;
`;

const StyledThumbs = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--space-200);
  overflow-x: auto;
  padding-bottom: var(--space-200);
  -webkit-overflow-scrolling: touch;
  @media (min-width: 1100px) {
    flex-direction: column;
    width: 88px;
    max-height: 400px;
    overflow-y: auto;
    padding-right: var(--space-200);
  }
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledThumb = styled.button<{ $active: boolean }>`
  flex: 0 0 80px;
  width: 80px;
  height: 80px;
  padding: 0;
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  background: var(--ink-100);
  border: 2px solid ${(p) => (p.$active ? "var(--ink-1000)" : "transparent")};
  opacity: ${(p) => (p.$active ? 1 : 0.65)};
  box-shadow: ${(p) => (p.$active ? "2px 2px 0 0 var(--ink-1000)" : "none")};
  transition: border 0.15s ease, opacity 0.15s ease;
  @media (min-width: 1100px) {
    width: 88px;
    height: 88px;
  }
  &:hover {
    opacity: 1;
  }
  &:focus-visible {
    outline: 2px solid var(--coral-500);
    outline-offset: 2px;
  }
`;

const StyledInfo = styled.div`
  width: 100%;
  @media (min-width: 1000px) {
    width: 40%;
  }
  display: flex;
  flex-direction: column;
  gap: var(--space-500);
`;

const StyledTrust = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-200);
  font-size: 14px;
  font-weight: 500;
  color: var(--ink-700);
  font-family: var(--font-body);
`;

const StyledStars = styled.span`
  color: var(--gruns-gold);
  letter-spacing: 1px;
`;

const StyledH1 = styled.h1`
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 800;
  color: var(--ink-1000);
  margin: 0 0 var(--space-200) 0;
  line-height: 1.15;
`;

const StyledLead = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: var(--ink-700);
  font-weight: 500;
  margin: 0;
`;

const StyledBullets = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-300);
`;

const StyledLi = styled.li`
  display: flex;
  align-items: center;
  gap: var(--space-200);
  font-size: 14px;
  font-weight: 700;
  color: var(--ink-900);
  font-family: var(--font-body);
`;

const StyledCheck = styled.span`
  width: 24px;
  height: 24px;
  border-radius: var(--radius-full);
  background: var(--coral-100);
  border: 1px solid var(--gruns-primary);
  color: var(--gruns-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 800;
  flex-shrink: 0;
`;

const StyledFlavorBlock = styled.div`
  border-top: 1px solid var(--ink-200);
  padding-top: var(--space-500);
  margin-top: var(--space-200);
`;

const StyledFlavorRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: var(--space-100);
`;

const StyledFlavorH = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--ink-1000);
  margin: 0;
  font-family: var(--font-body);
`;

const StyledHint = styled.p`
  font-size: 14px;
  font-style: italic;
  color: var(--ink-600);
  margin: 0 0 var(--space-500) 0;
`;

const StyledFlavorPicks = styled.div`
  display: flex;
  gap: var(--space-400);
`;

const StyledFlavorBtn = styled.button<{ $sel: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-200);
  width: 96px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  font: inherit;
  opacity: ${(p) => (p.$sel ? 1 : 0.6)};
  &:hover {
    opacity: 1;
  }
  &:focus-visible {
    outline: 2px solid var(--coral-500);
    outline-offset: 2px;
  }
`;

const StyledFlCircle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: var(--radius-full);
  border: 2px solid var(--ink-1000);
  background: var(--coral-100);
  overflow: visible;
  position: relative;
  box-shadow: 2px 2px 0 0 var(--ink-1000);
`;

const StyledLto = styled.span`
  position: absolute;
  top: -10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: max-content;
  background: var(--gold-500);
  color: var(--ink-1000);
  font-size: 9px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: var(--radius-full);
  border: 1px solid var(--ink-1000);
  font-family: var(--font-body);
`;

const StyledAdd = styled.button`
  width: 100%;
  padding: var(--space-400);
  background: var(--gruns-primary);
  color: var(--white) !important;
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 800;
  border: 2px solid var(--ink-1000);
  border-radius: var(--radius-full);
  box-shadow: 4px 4px 0 0 var(--ink-1000);
  cursor: pointer;
  margin-top: var(--space-300);
  transition: filter 0.12s ease, transform 0.12s ease;
  &:hover {
    filter: brightness(1.05);
  }
  &:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 0 var(--ink-1000);
  }
`;

const StyledNote = styled.p`
  text-align: center;
  font-size: 12px;
  color: var(--ink-500);
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-100);
`;

const StyledMobileNutrition = styled.div`
  @media (min-width: 1100px) {
    display: none;
  }
`;

const StyledMobileNutBtn = styled.button`
  width: 100%;
  padding: var(--space-300);
  background: var(--white);
  border: 2px solid var(--ink-1000);
  border-radius: var(--radius-full);
  font-weight: 800;
  font-family: var(--font-body);
  box-shadow: 4px 4px 0 0 var(--ink-1000);
  cursor: default;
  margin-top: var(--space-200);
`;

export const GummiesDuplicateBuybox = () => {
  const { t } = useTranslation("gummiesDuplicate");
  const [idx, setIdx] = useState(0);
  const [flav, setFlav] = useState<"a" | "b">("a");
  const gallery = GummiesDuplicateGallery;
  const bullets = t("offers.bullets", { returnObjects: true }) as string[];

  return (
    <StyledSection id="offers">
      <StyledInner>
        <StyledHead>
          <StyledEyebrow>{t("offers.eyebrow")}</StyledEyebrow>
          <StyledH2>{t("offers.headline")}</StyledH2>
        </StyledHead>
        <StyledGrid>
          <StyledGallery>
            <StyledMain>
              <Image
                src={gallery[idx]!}
                alt={t("offers.galleryMainAlt")}
                width={800}
                height={800}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </StyledMain>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0, flex: "1 1  auto" }}>
              <StyledThumbs>
                {gallery.map((img, i) => (
                  <StyledThumb
                    key={i}
                    type="button"
                    $active={i === idx}
                    onClick={() => setIdx(i)}
                    aria-label={t("offers.thumbAlt", { n: i + 1 })}
                  >
                    <Image src={img} alt="" width={85} height={85} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </StyledThumb>
                ))}
              </StyledThumbs>
              <StyledMobileNutrition>
                <StyledMobileNutBtn type="button">{t("offers.nutritionCta")}</StyledMobileNutBtn>
              </StyledMobileNutrition>
            </div>
          </StyledGallery>
          <StyledInfo>
            <StyledTrust>
              <StyledStars aria-hidden>★★★★★</StyledStars>
              <span>{t("offers.trustLine")}</span>
            </StyledTrust>
            <div>
              <StyledH1>{t("offers.productTitle")}</StyledH1>
              <StyledLead>{t("offers.productLead")}</StyledLead>
            </div>
            <StyledBullets>
              {bullets.map((b) => (
                <StyledLi key={b}>
                  <StyledCheck aria-hidden>✓</StyledCheck>
                  {b}
                </StyledLi>
              ))}
            </StyledBullets>
            <StyledFlavorBlock>
              <StyledFlavorRow>
                <StyledFlavorH>
                  {t("offers.flavorLabel")}{" "}
                  <span style={{ fontWeight: 400 }}>{t("offers.flavorSelectedName")}</span>
                </StyledFlavorH>
                <span style={{ fontSize: 14, fontWeight: 600, textDecoration: "underline" }}>{t("offers.tastesLike")}</span>
              </StyledFlavorRow>
              <StyledHint>{t("offers.flavorHint")}</StyledHint>
              <StyledFlavorPicks>
                <StyledFlavorBtn $sel={flav === "a"} type="button" onClick={() => setFlav("a")}>
                  <div style={{ position: "relative" }}>
                    <StyledLto>{t("offers.lto")}</StyledLto>
                    <StyledFlCircle>
                      <Image
                        src={gallery[0]!}
                        alt={t("offers.flavor1")}
                        width={100}
                        height={100}
                        style={{ objectFit: "cover", width: "100%", height: "100%", borderRadius: "50%" }}
                      />
                    </StyledFlCircle>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 800 }}>{t("offers.flavor1")}</span>
                </StyledFlavorBtn>
                <StyledFlavorBtn $sel={flav === "b"} type="button" onClick={() => setFlav("b")}>
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      border: "1px solid var(--ink-300)",
                      background: "var(--ink-050)",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={gallery[1]!}
                      alt={t("offers.flavor2")}
                      width={100}
                      height={100}
                      style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 500, marginTop: 4 }}>{t("offers.flavor2")}</span>
                </StyledFlavorBtn>
              </StyledFlavorPicks>
            </StyledFlavorBlock>
            <StyledAdd type="button">{t("offers.addToCart")}</StyledAdd>
            <StyledNote>
              <span aria-hidden>🔒</span> {t("offers.secureNote")}
            </StyledNote>
          </StyledInfo>
        </StyledGrid>
      </StyledInner>
    </StyledSection>
  );
};
