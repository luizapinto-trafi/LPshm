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
  margin-bottom: var(--space-800);
`;

const StyledHeading = styled.h2`
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: var(--gruns-dark);
  line-height: 1.2;
  margin: 0 0 var(--space-300) 0;
`;

const StyledSubtext = styled.p`
  font-size: 16px;
  color: var(--gruns-dark);
  opacity: 0.8;
  margin: 0;
`;

const StyledClinicians = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-400);
  margin-bottom: var(--space-800);
  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
`;

const StyledCliniciansBadge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--white);
  padding: var(--space-400);
  border-radius: var(--radius-lg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const StyledCliniciansText = styled.div`
  font-size: 14px;
  color: var(--gruns-dark);
  max-width: 300px;
  strong {
    font-weight: 700;
  }
`;

const StyledVerified = styled.p`
  font-size: 12px;
  color: var(--gruns-dark);
  opacity: 0.6;
  margin-top: var(--space-200);
`;

const StyledQuality = styled.div`
  background: var(--white);
  padding: var(--space-600);
  border-radius: var(--radius-xl);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: var(--space-800);
`;

const StyledQualityHeading = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: var(--gruns-dark);
  margin: 0 0 var(--space-200) 0;
  text-align: center;
`;

const StyledQualityDesc = styled.p`
  font-size: 15px;
  color: var(--gruns-dark);
  opacity: 0.8;
  margin: 0 0 var(--space-600) 0;
  text-align: center;
`;

const StyledTests = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-400);
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const StyledTest = styled.div`
  text-align: center;
  padding: var(--space-400);
  background: var(--gruns-cream);
  border-radius: var(--radius-lg);
`;

const StyledTestHeading = styled.h4`
  font-size: 24px;
  font-weight: 700;
  color: var(--gruns-primary);
  margin: 0 0 var(--space-100) 0;
`;

const StyledTestText = styled.p`
  font-size: 14px;
  color: var(--gruns-dark);
  margin: 0;
`;

const StyledOffer = styled.div`
  background: var(--gruns-primary);
  color: var(--white);
  padding: var(--space-600);
  border-radius: var(--radius-xl);
  text-align: center;
`;

const StyledOfferLabel = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 var(--space-200) 0;
`;

const StyledOfferValue = styled.p`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
`;

export const GrunsResults = () => {
  const { t } = useTranslation("gruns");
  const tests = t("results.quality.tests", { returnObjects: true }) as string[];

  return (
    <StyledSection>
      <StyledInner>
        <StyledHeader>
          <StyledHeading>{t("results.heading")}</StyledHeading>
          <StyledSubtext>{t("results.subtext")}</StyledSubtext>
        </StyledHeader>

        <StyledClinicians>
          <StyledCliniciansBadge>
            <span>Clinicians&apos;</span>
            <span>Choice</span>
          </StyledCliniciansBadge>
          <div>
            <StyledCliniciansText>
              <strong>1,600+ clinicians</strong> {t("results.clinicians.text")}
            </StyledCliniciansText>
            <StyledVerified>{t("results.clinicians.verified")}</StyledVerified>
          </div>
        </StyledClinicians>

        <StyledQuality>
          <StyledQualityHeading>{t("results.quality.heading")}</StyledQualityHeading>
          <StyledQualityDesc>{t("results.quality.description")}</StyledQualityDesc>
          <StyledTests>
            {tests.map((test, i) => (
              <StyledTest key={i}>
                <StyledTestHeading>{test.split(" ")[0]}</StyledTestHeading>
                <StyledTestText>{test.split(" ").slice(1).join(" ")}</StyledTestText>
              </StyledTest>
            ))}
          </StyledTests>
        </StyledQuality>

        <StyledOffer>
          <StyledOfferLabel>{t("results.offer")}</StyledOfferLabel>
          <StyledOfferValue>{t("results.offerSub")}</StyledOfferValue>
        </StyledOffer>
      </StyledInner>
    </StyledSection>
  );
};
