import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { StraplessPrimaryButton } from "./StraplessPrimaryButton";
import { straplessSectionH2Typography } from "./straplessSectionH2Typography";

const StyledSection = styled.section`
  background: var(--toffee-300);
  padding: 60px 0 72px;
`;

const StyledWrap = styled.div`
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 clamp(16px, 4vw, 60px);
`;

const StyledTitle = styled.h2`
  ${straplessSectionH2Typography}
  text-align: center;
  margin: 0 0 var(--space-1000);
`;

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
`;

const StyledDetails = styled.details`
  background: transparent;
  border-bottom: 1px solid rgba(0, 0, 0, 0.18);
  &[open] summary::after {
    content: "–";
  }
`;

const StyledSummary = styled.summary`
  padding: 18px 40px 18px 0;
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  color: #000;
  cursor: pointer;
  list-style: none;
  position: relative;
  &::-webkit-details-marker {
    display: none;
  }
  &::after {
    content: "+";
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    font-weight: 400;
    font-size: 20px;
  }
`;

const StyledAnswer = styled.div`
  padding: 0 0 20px;
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.55;
  color: #222;
`;

const faqIds = ["q0", "q1", "q2", "q3", "q4"] as const;

export const StraplessFaqSection = () => {
  const { t } = useTranslation("straplessB1g1GiftLp");
  return (
    <StyledSection aria-labelledby="strapless-faq-title">
      <StyledWrap>
        <StyledTitle id="strapless-faq-title">{t("faq.title")}</StyledTitle>
        <StyledList>
          {faqIds.map((id, index) => (
            <StyledDetails key={id} open={index === 0}>
              <StyledSummary>{t(`faq.${id}.q`)}</StyledSummary>
              <StyledAnswer>{t(`faq.${id}.a`)}</StyledAnswer>
            </StyledDetails>
          ))}
        </StyledList>
        <StraplessPrimaryButton href="#buy">{t("faq.cta")}</StraplessPrimaryButton>
      </StyledWrap>
    </StyledSection>
  );
};
