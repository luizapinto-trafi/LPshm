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
      </StyledInner>
    </StyledHero>
  );
};
