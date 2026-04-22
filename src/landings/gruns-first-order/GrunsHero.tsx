import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { GrunsCdn } from "./grunsCdn";

const StyledSection = styled.section`
  background: var(--gruns-cream);
  padding: var(--space-1200) var(--space-1000);
  @media (max-width: 800px) {
    padding: var(--space-800) var(--space-400);
  }
`;

const StyledInner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-1000);
  align-items: center;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const StyledLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-500);
`;

const StyledRating = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-200);
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--gruns-dark);
`;

const StyledStars = styled.div`
  display: flex;
  gap: 2px;
`;

const StyledHeading = styled.h1`
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 700;
  line-height: 1.1;
  color: var(--gruns-dark);
  margin: 0;
  span {
    color: var(--gruns-primary);
  }
`;

const StyledFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-300);
`;

const StyledFeature = styled.li`
  display: flex;
  align-items: center;
  gap: var(--space-200);
  font-family: var(--font-body);
  font-size: 15px;
  color: var(--gruns-dark);
  &:before {
    content: "✓";
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    background: var(--gruns-primary);
    color: var(--white);
    border-radius: var(--radius-full);
    font-size: 12px;
  }
`;

const StyledSubtext = styled.p`
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 600;
  color: var(--gruns-dark);
  margin: 0;
`;

const StyledSold = styled.div`
  display: inline-flex;
  align-items: center;
  background: var(--gruns-gold);
  color: var(--gruns-dark);
  padding: var(--space-200) var(--space-400);
  border-radius: var(--radius-md);
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
`;

const StyledCta = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--gruns-primary);
  color: var(--white);
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 600;
  padding: var(--space-400) var(--space-600);
  border-radius: var(--radius-xl);
  text-decoration: none;
  text-align: center;
  box-shadow: 0 4px 0 var(--gruns-dark);
  transition: all 0.2s ease;
  &:hover {
    transform: translateY(2px);
    box-shadow: 0 2px 0 var(--gruns-dark);
  }
`;

const StyledRiskFree = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-200);
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--gruns-dark);
  &:before {
    content: "✓";
    color: var(--gruns-primary);
    font-weight: 700;
  }
`;

const StyledRight = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledProductImage = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
`;

const StyledBadge = styled.div`
  position: absolute;
  top: -20px;
  right: -20px;
  background: var(--gruns-gold);
  color: var(--gruns-dark);
  padding: var(--space-300);
  border-radius: var(--radius-full);
  text-align: center;
  font-family: var(--font-display);
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;
  .limited {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .percent {
    font-size: 28px;
    line-height: 1;
  }
  .off {
    font-size: 14px;
  }
`;

const StyledClinicians = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: var(--white);
  padding: var(--space-300) var(--space-400);
  border-radius: var(--radius-lg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: var(--space-300);
  font-family: var(--font-body);
  font-size: 13px;
  max-width: 280px;
`;

const StyledCliniciansBadge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
`;

export const GrunsHero = () => {
  const { t } = useTranslation("gruns");
  const features = t("hero.features", { returnObjects: true }) as string[];

  return (
    <StyledSection>
      <StyledInner>
        <StyledLeft>
          <StyledRating>
            <StyledStars>
              {[...Array(5)].map((_, i) => (
                <Image key={i} src={GrunsCdn.starIcon} alt="" width={16} height={16} unoptimized />
              ))}
            </StyledStars>
            <span>
              <strong>{t("hero.rating")}</strong> {t("hero.starsAlt")} | {t("hero.reviews")} | {t("hero.members")}
            </span>
            <span style={{ marginLeft: "auto", fontWeight: 700, color: "var(--gruns-primary)" }}>
              {t("hero.discount")}
            </span>
          </StyledRating>

          <StyledHeading>
            You Have Nutrition Gaps. <span>Grüns Fills Them.</span>
          </StyledHeading>

          <StyledFeatures>
            {features.map((feature, i) => (
              <StyledFeature key={i}>{feature}</StyledFeature>
            ))}
          </StyledFeatures>

          <StyledSubtext>{t("hero.subtext")}</StyledSubtext>

          <StyledSold>{t("hero.sold")}</StyledSold>

          <StyledCta href="#offers">{t("hero.cta")}</StyledCta>

          <StyledRiskFree>{t("hero.riskFree")}</StyledRiskFree>
        </StyledLeft>

        <StyledRight>
          <StyledProductImage>
            <Image
              src={GrunsCdn.productMain}
              alt="Grüns Superfood Gummies"
              width={500}
              height={500}
              unoptimized
              style={{ width: "100%", height: "auto" }}
            />
            <StyledBadge>
              <div className="limited">Limited Time</div>
              <div className="percent">52%</div>
              <div className="off">OFF</div>
            </StyledBadge>
            <StyledClinicians>
              <StyledCliniciansBadge>
                <span>Clinicians&apos;</span>
                <span>Choice</span>
              </StyledCliniciansBadge>
              <span>1,600+ clinicians shared this with their patients without compensation.</span>
            </StyledClinicians>
          </StyledProductImage>
        </StyledRight>
      </StyledInner>
    </StyledSection>
  );
};
