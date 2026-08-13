import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";

const StyledSection = styled.section`
  background: var(--coral-050);
  padding: 24px 0;
`;

const StyledWrap = styled.div`
  max-width: 760px;
  margin: 0 auto;
  padding: 0 20px;
  @media (min-width: 900px) {
    padding: 0 var(--space-400);
  }
`;

const StyledTitle = styled.h2`
  font-family: var(--font-display);
  font-size: clamp(22px, 4vw, 32px);
  font-weight: 700;
  line-height: 1.2;
  color: var(--ink-900);
  text-align: center;
  margin: 0 0 16px;
  @media (min-width: 900px) {
    margin: 0 0 24px;
  }
`;

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledDetails = styled.details`
  background: var(--white);
  border: 1px solid var(--ink-200);
  border-radius: 12px;
  padding: 4px 16px;
  &[open] summary::after {
    content: "−";
  }
`;

const StyledSummary = styled.summary`
  padding: 14px 28px 14px 0;
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  color: var(--ink-900);
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
    font-size: 22px;
    color: var(--ink-700);
  }
`;

const StyledAnswer = styled.div`
  padding: 0 0 14px;
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 1.6;
  color: var(--ink-800);
`;

type FaqItem = { q: string; a: string };

export const SweetheartFaqSection = () => {
  const { t } = useTranslation("sweetheartCami");
  const items = t("faq.items", { returnObjects: true }) as FaqItem[];

  return (
    <StyledSection aria-labelledby="sweetheart-faq-title">
      <StyledWrap>
        <StyledTitle id="sweetheart-faq-title">{t("faq.title")}</StyledTitle>
        <StyledList>
          {items.map((item, index) => (
            <StyledDetails key={item.q} open={index === 0}>
              <StyledSummary>{item.q}</StyledSummary>
              <StyledAnswer>{item.a}</StyledAnswer>
            </StyledDetails>
          ))}
        </StyledList>
      </StyledWrap>
    </StyledSection>
  );
};
