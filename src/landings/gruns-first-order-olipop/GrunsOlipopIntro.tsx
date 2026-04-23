import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";

const StyledSection = styled.section`
  background: linear-gradient(
    165deg,
    var(--coral-100) 0%,
    var(--coral-050) 42%,
    var(--cream-200) 100%
  );
  padding: var(--space-1200) var(--space-1000);
  @media (max-width: 800px) {
    padding: var(--space-800) var(--space-400);
  }
`;

const StyledInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: var(--space-600);
`;

const StyledStars = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-200);
  font-size: 14px;
  color: var(--gruns-dark);
  font-family: var(--font-body);
`;

const StyledStarRow = styled.span`
  color: var(--gruns-gold);
  letter-spacing: 2px;
  font-size: 18px;
`;

const StyledHeroTitle = styled.h1`
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 2.8vw, 2rem);
  font-weight: 700;
  line-height: 1.15;
  color: var(--gruns-dark);
  margin: 0;
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-300);
`;

const StyledLi = styled.li`
  display: flex;
  align-items: flex-start;
  gap: var(--space-200);
  font-family: var(--font-body);
  font-size: 15px;
  color: var(--gruns-dark);
  &::before {
    content: "✓";
    flex-shrink: 0;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--gruns-primary);
    color: var(--white);
    border-radius: var(--radius-full);
    font-size: 11px;
    font-weight: 700;
  }
`;

const StyledCollab = styled.p`
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 600;
  color: var(--gruns-dark);
  margin: 0;
`;

/** CTA stack: Shapermint DS tokens (gold + coral + ink) — badge overlaps pill button */
const StyledCtaCluster = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-inline: auto;
`;

const StyledHeroBadge = styled.span`
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: calc(-1 * var(--space-300));
  padding: 8px 10px;
  background: var(--gold-500);
  color: var(--ink-1000);
  border: 1px solid var(--ink-1000);
  border-radius: var(--radius-full);
  font-family: var(--font-display);
  font-size: clamp(11px, 1.9vw, 13px);
  font-weight: 700;
  letter-spacing: 0.05em;
  line-height: 1.2;
  text-transform: uppercase;
  text-align: center;
`;

const StyledHeroCta = styled.a`
  position: relative;
  z-index: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  max-width: 440px;
  padding: 28px 40px 20px;
  margin: 0;
  background: var(--coral-600);
  color: var(--ink-1000);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(15px, 2.4vw, 18px);
  line-height: 1.15;
  text-align: center;
  text-decoration: none;
  border-radius: var(--radius-full);
  border: 2px solid var(--ink-1000);
  box-shadow: 3px 3px 0 0 var(--ink-1000);
  transition: background-color 0.15s ease, transform 0.12s ease, box-shadow 0.12s ease;
  &:hover {
    background: var(--coral-550);
  }
  &:active {
    transform: translate(2px, 2px);
    box-shadow: 1px 1px 0 0 var(--ink-1000);
  }
  &:focus-visible {
    outline: 3px solid var(--coral-300);
    outline-offset: 3px;
  }
`;

const StyledRisk = styled.p`
  margin: var(--space-500) 0 0;
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 500;
  line-height: 1.4;
  color: var(--ink-1000);
  text-align: center;
`;

const StyledRiskUnderline = styled.span`
  font-weight: 700;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
`;

export const GrunsOlipopIntro = () => {
  const { t } = useTranslation("grunsOlipop");
  const bullets = t("hero.bullets", { returnObjects: true }) as string[];
  return (
    <StyledSection>
      <StyledInner>
        <StyledStars>
          <StyledStarRow aria-hidden>★★★★★</StyledStarRow>
          <span>{t("hero.ratingLine")}</span>
        </StyledStars>
        <StyledHeroTitle>{t("hero.title")}</StyledHeroTitle>
        <StyledList>
          {bullets.map((b) => (
            <StyledLi key={b}>{b}</StyledLi>
          ))}
        </StyledList>
        <StyledCollab>{t("hero.collabLine")}</StyledCollab>
        <StyledCtaCluster>
          <StyledHeroBadge>{t("hero.sold")}</StyledHeroBadge>
          <StyledHeroCta href="#offers">{t("hero.cta")}</StyledHeroCta>
        </StyledCtaCluster>
        <StyledRisk>
          {t("hero.riskIntro")}
          <StyledRiskUnderline>{t("hero.riskHighlight")}</StyledRiskUnderline>
        </StyledRisk>
      </StyledInner>
    </StyledSection>
  );
};
