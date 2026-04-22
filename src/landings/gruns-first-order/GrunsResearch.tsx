import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";

const StyledSection = styled.section`
  background: var(--gruns-cream);
  padding: var(--space-1000) var(--space-1000);
  text-align: center;
  @media (max-width: 800px) {
    padding: var(--space-800) var(--space-400);
  }
`;

const StyledInner = styled.div`
  max-width: 800px;
  margin: 0 auto;
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
  margin: 0 0 var(--space-400) 0;
`;

const StyledSubtext = styled.p`
  font-size: 16px;
  color: var(--gruns-dark);
  opacity: 0.8;
  margin: 0;
`;

const StyledSource = styled.p`
  font-size: 12px;
  color: var(--gruns-dark);
  opacity: 0.6;
  margin-top: var(--space-400);
  a {
    color: inherit;
    text-decoration: underline;
  }
`;

export const GrunsResearch = () => {
  const { t } = useTranslation("gruns");
  return (
    <StyledSection>
      <StyledInner>
        <StyledEyebrow>{t("research.eyebrow")}</StyledEyebrow>
        <StyledHeading>{t("research.heading")}</StyledHeading>
        <StyledSubtext>{t("research.subtext")}</StyledSubtext>
        <StyledSource>
          <a
            href="https://www.ars.usda.gov/ARSUserFiles/80400530/pdf/usual/Usual_Intake_MaleFemale_WWEIA_2015_2018.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("research.source")}
          </a>
        </StyledSource>
      </StyledInner>
    </StyledSection>
  );
};
