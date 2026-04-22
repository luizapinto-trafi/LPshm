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
`;

const StyledHeader = styled.div`
  text-align: center;
  margin-bottom: var(--space-1000);
`;

const StyledEyebrow = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: var(--gruns-primary);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 var(--space-300) 0;
`;

const StyledHeading = styled.h2`
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 700;
  color: var(--gruns-dark);
  line-height: 1.2;
  margin: 0;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-600);
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const StyledBenefit = styled.div`
  background: var(--white);
  padding: var(--space-600);
  border-radius: var(--radius-xl);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const StyledBenefitTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: var(--gruns-dark);
  margin: 0 0 var(--space-300) 0;
`;

const StyledBenefitDesc = styled.p`
  font-size: 15px;
  line-height: 1.5;
  color: var(--gruns-dark);
  opacity: 0.8;
  margin: 0;
`;

export const GrunsBenefits = () => {
  const { t } = useTranslation("gruns");
  const benefits = t("benefits.items", { returnObjects: true }) as Array<{ title: string; description: string }>;

  return (
    <StyledSection>
      <StyledInner>
        <StyledHeader>
          <StyledEyebrow>{t("benefits.eyebrow")}</StyledEyebrow>
          <StyledHeading>{t("benefits.heading")}</StyledHeading>
        </StyledHeader>
        <StyledGrid>
          {benefits.map((benefit, i) => (
            <StyledBenefit key={i}>
              <StyledBenefitTitle>{benefit.title}</StyledBenefitTitle>
              <StyledBenefitDesc>{benefit.description}</StyledBenefitDesc>
            </StyledBenefit>
          ))}
        </StyledGrid>
      </StyledInner>
    </StyledSection>
  );
};
