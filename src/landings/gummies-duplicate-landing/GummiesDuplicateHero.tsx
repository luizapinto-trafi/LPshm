import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { GummiesDuplicateCdn, GummiesDuplicateGallery } from "./gummiesDuplicateCdn";

const StyledSection = styled.section`
  position: relative;
  background: linear-gradient(180deg, var(--white) 0%, var(--coral-075) 100%);
  padding: var(--space-800) var(--space-400);
  overflow: hidden;
  @media (min-width: 801px) {
    padding: var(--space-1200) var(--space-1000);
  }
`;

const StyledRow = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: var(--space-800);
  @media (min-width: 801px) {
    flex-direction: row;
    gap: var(--space-1000);
  }
`;

const StyledCopy = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-500);
  z-index: 1;
  @media (min-width: 801px) {
    align-items: flex-start;
    text-align: left;
  }
`;

const StyledReviews = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-300);
  text-decoration: none;
  color: inherit;
  @media (min-width: 801px) {
    justify-content: flex-start;
  }
  &:hover {
    opacity: 0.88;
  }
  &:focus-visible {
    outline: 2px solid var(--coral-500);
    outline-offset: 3px;
  }
`;

const StyledStarRow = styled.div`
  color: var(--gruns-primary);
  letter-spacing: 2px;
  font-size: 14px;
`;

const StyledReviewMeta = styled.p`
  margin: 0;
  font-family: var(--font-body);
  font-size: 12px;
  line-height: 1.3;
  color: var(--ink-700);
  @media (min-width: 801px) {
    font-size: 14px;
  }
  strong {
    font-weight: 700;
  }
`;

const StyledH1 = styled.h1`
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 4.2vw, 2.75rem);
  font-weight: 800;
  line-height: 1.1;
  color: var(--ink-1000);
  margin: 0;
  letter-spacing: -0.03em;
  @media (min-width: 801px) {
    br {
      display: block;
    }
  }
  br {
    display: none;
  }
`;

const StyledAccent = styled.strong`
  color: var(--coral-600);
  font-weight: 800;
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-300);
  text-align: left;
  width: 100%;
  max-width: 28rem;
`;

const StyledLi = styled.li`
  display: flex;
  align-items: center;
  gap: var(--space-200);
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 500;
  color: var(--ink-900);
`;

const StyledCheck = styled.span`
  width: 24px;
  height: 24px;
  border-radius: var(--radius-full);
  background: var(--gruns-primary);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 800;
  flex-shrink: 0;
`;

const StyledDesc = styled.p`
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;
  color: var(--ink-900);
  margin: 0;
`;

const StyledCtaWrap = styled.div`
  position: relative;
  width: 100%;
  max-width: 22rem;
  margin: 0 auto;
  @media (min-width: 801px) {
    margin: 0;
  }
  &.is-mobile {
    @media (min-width: 801px) {
      display: none;
    }
  }
  &.is-desktop {
    display: none;
    @media (min-width: 801px) {
      display: block;
    }
  }
`;

const StyledCtaBadge = styled.span`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  background: var(--gold-500);
  color: var(--ink-1000);
  font-size: 11px;
  font-weight: 800;
  padding: var(--space-100) var(--space-200);
  border-radius: var(--radius-full);
  border: 1px solid var(--ink-1000);
  font-family: var(--font-body);
  white-space: nowrap;
`;

const StyledCta = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 56px;
  width: 100%;
  background: var(--gruns-primary);
  color: var(--white) !important;
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 800;
  border-radius: var(--radius-full);
  border: 2px solid var(--ink-1000);
  text-decoration: none;
  box-shadow: 4px 4px 0 0 var(--ink-1000);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  &:hover {
    filter: brightness(1.04);
  }
  &:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 0 var(--ink-1000);
  }
  &:focus-visible {
    outline: 3px solid var(--coral-300);
    outline-offset: 3px;
  }
`;

const StyledRisk = styled.p`
  margin: 0;
  font-size: 14px;
  color: var(--ink-600);
  text-align: center;
  @media (min-width: 801px) {
    text-align: left;
  }
`;

const StyledMedia = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const StyledFrame = styled.div`
  position: relative;
  width: 100%;
  max-width: 420px;
`;

const StyledHeroImg = styled.div`
  border-radius: var(--radius-xl);
  border: 2px solid var(--ink-1000);
  box-shadow: 4px 4px 0 0 var(--ink-1000);
  overflow: hidden;
  background: var(--ink-100);
  line-height: 0;
`;

const StyledSticker = styled.div`
  position: absolute;
  top: -24px;
  left: -20px;
  width: 33%;
  max-width: 100px;
  border-radius: var(--radius-full);
  border: 2px solid var(--ink-1000);
  box-shadow: 2px 2px 0 0 var(--ink-1000);
  background: var(--white);
  overflow: hidden;
  line-height: 0;
  transform: rotate(-10deg);
  @media (max-width: 800px) {
    top: -16px;
    left: -8px;
  }
`;

const StyledSeal = styled.div`
  position: relative;
  width: 80px;
  height: 40px;
  flex-shrink: 0;
  background: var(--ink-100);
  border: 1px dashed var(--ink-300);
  border-radius: var(--radius-md);
  overflow: hidden;
`;

export const GummiesDuplicateHero = () => {
  const { t } = useTranslation("gummiesDuplicate");
  const bullets = t("hero.bullets", { returnObjects: true }) as string[];
  return (
    <StyledSection>
      <StyledRow>
        <StyledCopy>
          <StyledReviews href="#reviews">
            <StyledSeal>
              <Image src={GummiesDuplicateCdn.seal} alt="" width={80} height={40} style={{ objectFit: "cover" }} />
            </StyledSeal>
            <div>
              <StyledStarRow aria-hidden>★★★★★</StyledStarRow>
              <StyledReviewMeta>{t("hero.reviewLine")}</StyledReviewMeta>
            </div>
          </StyledReviews>
          <StyledH1>
            {t("hero.titleBefore")}{" "}
            <br />
            <StyledAccent as="span">{t("hero.titleAccent")}</StyledAccent>
          </StyledH1>
          <StyledCtaWrap className="is-mobile">
            <StyledCtaBadge>{t("hero.badge")}</StyledCtaBadge>
            <StyledCta href="#offers">{t("hero.cta")}</StyledCta>
          </StyledCtaWrap>
          <StyledList>
            {bullets.map((b) => (
              <StyledLi key={b}>
                <StyledCheck aria-hidden>✓</StyledCheck>
                {b}
              </StyledLi>
            ))}
          </StyledList>
          <StyledDesc>{t("hero.collabLine")}</StyledDesc>
          <StyledCtaWrap className="is-desktop">
            <StyledCtaBadge>{t("hero.badge")}</StyledCtaBadge>
            <StyledCta href="#offers">{t("hero.cta")}</StyledCta>
          </StyledCtaWrap>
          <StyledRisk>
            {t("hero.riskIntro")}
            <strong style={{ textDecoration: "underline", cursor: "pointer" }}>{t("hero.riskHighlight")}</strong>
          </StyledRisk>
        </StyledCopy>
        <StyledMedia>
          <StyledFrame>
            <StyledHeroImg>
              <Image
                src={GummiesDuplicateGallery[0]!}
                alt={t("hero.heroImageAlt")}
                width={600}
                height={500}
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
                priority
              />
            </StyledHeroImg>
            <StyledSticker>
              <Image
                src={GummiesDuplicateGallery[2] ?? GummiesDuplicateGallery[0]}
                alt={t("hero.stickerAlt")}
                width={150}
                height={150}
                style={{ width: "100%", height: "auto" }}
              />
            </StyledSticker>
          </StyledFrame>
        </StyledMedia>
      </StyledRow>
    </StyledSection>
  );
};
