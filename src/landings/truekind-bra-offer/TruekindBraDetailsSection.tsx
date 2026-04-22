import styled from "styled-components";
import { useTranslation } from "next-i18next";

const StyledSection = styled.section`
  background: var(--white);
  padding: var(--space-1000) var(--space-400) var(--space-800);
`;

const StyledInner = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-800);
`;

const StyledBlock = styled.div``;

const StyledH2 = styled.h2`
  color: var(--ink-1000);
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
  margin: 0 0 var(--space-300) 0;
  text-transform: none;
`;

const StyledP = styled.p`
  color: var(--ink-800);
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.6;
  margin: 0;
`;

const StyledLink = styled.a`
  color: var(--blue-700);
  text-decoration: underline;
  font-size: 15px;
  display: inline-block;
  margin-top: var(--space-200);
`;

export const TruekindBraDetailsSection = () => {
  const { t } = useTranslation("truekindBra");
  return (
    <StyledSection>
      <StyledInner>
        <StyledBlock>
          <StyledH2>{t("details.makes.title")}</StyledH2>
          <StyledP>{t("details.makes.body")}</StyledP>
        </StyledBlock>
        <StyledBlock>
          <StyledH2>{t("details.sizeFit.title")}</StyledH2>
          <StyledP>{t("details.sizeFit.body")}</StyledP>
          <StyledLink
            href="https://shapermint.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("details.sizeGuideCta")}
          >
            {t("details.sizeGuideCta")}
          </StyledLink>
        </StyledBlock>
        <StyledBlock>
          <StyledH2>{t("details.fabric.title")}</StyledH2>
          <StyledP>{t("details.fabric.body")}</StyledP>
        </StyledBlock>
        <StyledBlock>
          <StyledH2>{t("details.care.title")}</StyledH2>
          <StyledP>{t("details.care.body")}</StyledP>
        </StyledBlock>
      </StyledInner>
    </StyledSection>
  );
};
