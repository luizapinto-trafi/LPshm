import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";

const ROWS = 6;

const StyledSection = styled.section`
  background: var(--ink-100);
  padding: 24px 0;
`;

const StyledInner = styled.div`
  max-width: 560px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (min-width: 900px) {
    max-width: 760px;
    padding: 0 var(--space-400);
    gap: 24px;
  }
`;

const StyledH2 = styled.h2`
  font-family: var(--font-display);
  font-size: clamp(22px, 5vw, 36px);
  font-weight: 700;
  line-height: 1.2;
  color: var(--ink-900);
  margin: 0;
  text-align: center;
`;

const StyledLead = styled.p`
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.5;
  color: var(--ink-700);
  text-align: center;
  margin: 0 auto;
  max-width: 44ch;
`;

const StyledTable = styled.div`
  background: var(--white);
  border: 1px solid var(--ink-200);
  border-radius: 16px;
  overflow: hidden;
`;

const StyledHead = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2.1fr) minmax(72px, 1fr) minmax(72px, 1fr);
  align-items: center;
  padding: 16px 14px;
  background: var(--coral-050);
  border-bottom: 1px solid var(--ink-200);
  @media (min-width: 900px) {
    grid-template-columns: minmax(0, 1.4fr) minmax(88px, 1fr) minmax(88px, 1fr);
    padding: var(--space-400);
  }
`;

const StyledHeadUs = styled.span`
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  color: var(--coral-500);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  @media (min-width: 900px) {
    font-size: 13px;
  }
`;

const StyledHeadThem = styled.span`
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  color: var(--ink-500);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  @media (min-width: 900px) {
    font-size: 13px;
  }
`;

const StyledRow = styled.div<{ $alt?: boolean }>`
  display: grid;
  grid-template-columns: minmax(0, 2.1fr) minmax(72px, 1fr) minmax(72px, 1fr);
  align-items: center;
  padding: 14px;
  background: ${({ $alt }) => ($alt ? "var(--ink-050)" : "var(--white)")};
  font-family: var(--font-body);
  font-size: 14.5px;
  font-weight: 600;
  color: var(--ink-900);
  @media (min-width: 900px) {
    grid-template-columns: minmax(0, 1.4fr) minmax(88px, 1fr) minmax(88px, 1fr);
    padding: 14px var(--space-400);
    font-size: 15px;
  }
`;

const StyledCell = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledYes = styled.span`
  color: var(--mint-600);
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
`;

const StyledNo = styled.span`
  color: var(--ink-400);
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
`;

export const SweetheartCompareSection = () => {
  const { t } = useTranslation("sweetheartCami");
  const rows = t("compare.rows", { returnObjects: true }) as string[];

  return (
    <StyledSection aria-labelledby="sweetheart-compare-title">
      <StyledInner>
        <StyledH2 id="sweetheart-compare-title">{t("compare.title")}</StyledH2>
        <StyledLead>{t("compare.lead")}</StyledLead>
        <StyledTable role="table" aria-label={t("compare.title")}>
          <StyledHead role="row">
            <span aria-hidden />
            <StyledHeadUs role="columnheader">{t("compare.us")}</StyledHeadUs>
            <StyledHeadThem role="columnheader">{t("compare.them")}</StyledHeadThem>
          </StyledHead>
          {rows.slice(0, ROWS).map((label, i) => (
            <StyledRow key={label} role="row" $alt={i % 2 === 1}>
              <span role="rowheader">{label}</span>
              <StyledCell role="cell">
                <StyledYes aria-label="Yes">✓</StyledYes>
              </StyledCell>
              <StyledCell role="cell">
                <StyledNo aria-label="No">-</StyledNo>
              </StyledCell>
            </StyledRow>
          ))}
        </StyledTable>
      </StyledInner>
    </StyledSection>
  );
};
