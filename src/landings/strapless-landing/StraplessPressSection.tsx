import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";

const StyledSection = styled.section`
  background: var(--coral-050);
  padding: 60px 0 72px;
  text-align: center;
`;

const StyledWrap = styled.div`
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 clamp(16px, 4vw, 60px);
`;

const StyledTitle = styled.div`
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0.12em;
  color: var(--ink-900);
  opacity: 0.75;
  margin: 0 0 32px;
`;

const StyledLogos = styled.div`
  display: flex;
  gap: clamp(30px, 5vw, 80px);
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  opacity: 0.55;
`;

const StyledInstyle = styled.span`
  font-family: var(--font-display);
  font-weight: 700;
  font-style: italic;
  letter-spacing: 0.01em;
  font-size: 30px;
  color: var(--ink-900);
`;

const StyledElle = styled.span`
  font-family: Didot, Georgia, serif;
  font-weight: 700;
  letter-spacing: 0.24em;
  font-size: 34px;
  color: var(--ink-900);
`;

const StyledCosmo = styled.span`
  font-family: Georgia, serif;
  font-weight: 700;
  letter-spacing: 0.16em;
  font-size: 22px;
  color: var(--ink-900);
`;

const StyledGlossy = styled.span`
  font-family: var(--font-display);
  font-weight: 300;
  font-style: italic;
  letter-spacing: 0.05em;
  font-size: 26px;
  color: var(--ink-900);
`;

export const StraplessPressSection = () => {
  const { t } = useTranslation("strapless");
  return (
    <StyledSection aria-label={t("press.aria")}>
      <StyledWrap>
        <StyledTitle>{t("press.title")}</StyledTitle>
        <StyledLogos>
          <StyledInstyle>{t("press.instyle")}</StyledInstyle>
          <StyledElle>{t("press.elle")}</StyledElle>
          <StyledCosmo>{t("press.cosmo")}</StyledCosmo>
          <StyledGlossy>{t("press.glossy")}</StyledGlossy>
        </StyledLogos>
      </StyledWrap>
    </StyledSection>
  );
};
