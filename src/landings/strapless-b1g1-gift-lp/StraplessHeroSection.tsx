import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { StraplessB1g1Cdn } from "./straplessB1g1Cdn";
import { StraplessPrimaryButton } from "./StraplessPrimaryButton";

const StyledHero = styled.section`
  position: relative;
  background: url(${StraplessB1g1Cdn.hero}) center / cover no-repeat;
  min-height: 680px;
  display: flex;
  align-items: center;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(235, 191, 178, 0) 0%,
      rgba(235, 191, 178, 0.88) 55%,
      rgba(235, 190, 177, 0.98) 100%
    );
    pointer-events: none;
  }
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(235, 191, 178, 0) 40%,
      rgba(235, 191, 178, 0) 100%
    );
    pointer-events: none;
  }
  @media (max-width: 767px) {
    min-height: 620px;
  }
`;

const StyledInner = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 80px clamp(16px, 4vw, 80px);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: var(--space-1000);
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-600);
    padding: 60px 20px 40px;
  }
`;

const StyledCopy = styled.div`
  max-width: 800px;
`;

const StyledH1 = styled.h1`
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(34px, 5vw, 52px);
  line-height: 1.05;
  letter-spacing: -0.01em;
  color: #000;
  margin: 0 0 var(--space-600);
  max-width: 100%;
  @media (max-width: 600px) {
    font-size: 34px;
  }
`;

const StyledLead = styled.p`
  font-size: clamp(16px, 1.6vw, 18px);
  line-height: 1.4;
  color: #1a1a1a;
  margin: 0 0 var(--space-800);
  max-width: 58ch;
`;

const StyledBadge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-300);
  align-self: center;
  min-width: 160px;
  text-align: center;
  @media (max-width: 767px) {
    align-self: flex-start;
    flex-direction: row;
    gap: var(--space-300);
    max-width: 340px;
    text-align: left;
  }
`;

const StyledBadgeCircle = styled.div`
  width: 96px;
  height: 96px;
  border: 1.5px solid rgba(255, 255, 255, 0.65);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  svg {
    width: 48px;
    height: 48px;
  }
`;

const StyledBadgeText = styled.div`
  font-family: var(--font-display);
  font-size: 13px;
  color: #fff;
  line-height: 1.3;
  max-width: 180px;
  @media (max-width: 767px) {
    text-align: left;
  }
`;

export const StraplessHeroSection = () => {
  const { t } = useTranslation("straplessB1g1GiftLp");
  return (
    <StyledHero aria-labelledby="strapless-hero-title">
      <StyledInner>
        <StyledCopy>
          <StyledH1 id="strapless-hero-title">{t("hero.title")}</StyledH1>
          <StyledLead>{t("hero.lead")}</StyledLead>
          <StraplessPrimaryButton href="#buy" $wide>
            {t("hero.cta")}
          </StraplessPrimaryButton>
        </StyledCopy>
        <StyledBadge>
          <StyledBadgeCircle aria-hidden>
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinejoin="round">
              <path d="M10 18h28v14H10z" strokeLinecap="round" />
              <path d="M16 18v-4a8 8 0 0116 0v4" strokeLinecap="round" />
              <path d="M20 28h8M24 24v8" strokeLinecap="round" />
            </svg>
          </StyledBadgeCircle>
          <StyledBadgeText>
            {t("hero.badgeLine1")}
            <br />
            {t("hero.badgeLine2")}
          </StyledBadgeText>
        </StyledBadge>
      </StyledInner>
    </StyledHero>
  );
};
