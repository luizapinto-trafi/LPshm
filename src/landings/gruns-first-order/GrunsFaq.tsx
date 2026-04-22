import { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { handleKeyDown } from "@/shared/utils/KeyEvent";

const StyledSection = styled.section`
  background: var(--gruns-cream);
  padding: var(--space-1200) var(--space-1000);
  @media (max-width: 800px) {
    padding: var(--space-800) var(--space-400);
  }
`;

const StyledInner = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const StyledHeading = styled.h2`
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: var(--gruns-dark);
  text-align: center;
  margin: 0 0 var(--space-800) 0;
`;

const StyledItem = styled.div`
  border-bottom: 1px solid rgba(0, 88, 45, 0.1);
`;

const StyledQuestion = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-500) 0;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 600;
  color: var(--gruns-dark);
  cursor: pointer;
  text-align: left;
  &:hover {
    color: var(--gruns-primary);
  }
`;

const StyledIcon = styled.span<{ $open: boolean }>`
  font-size: 20px;
  transition: transform 0.2s ease;
  transform: ${({ $open }) => ($open ? "rotate(45deg)" : "rotate(0)")};
`;

const StyledAnswer = styled.div<{ $open: boolean }>`
  max-height: ${({ $open }) => ($open ? "500px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const StyledAnswerText = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: var(--gruns-dark);
  opacity: 0.8;
  padding: 0 0 var(--space-500) 0;
  margin: 0;
`;

export const GrunsFaq = () => {
  const { t } = useTranslation("gruns");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const questions = t("faq.questions", { returnObjects: true }) as Array<{
    question: string;
    answer: string;
  }>;

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <StyledSection>
      <StyledInner>
        <StyledHeading>{t("faq.heading")}</StyledHeading>
        {questions.map((item, i) => (
          <StyledItem key={i}>
            <StyledQuestion
              onClick={() => toggle(i)}
              onKeyDown={(e) => handleKeyDown(e, () => toggle(i), ["Enter", " "])}
              aria-expanded={openIndex === i}
            >
              {item.question}
              <StyledIcon $open={openIndex === i}>+</StyledIcon>
            </StyledQuestion>
            <StyledAnswer $open={openIndex === i}>
              <StyledAnswerText>{item.answer}</StyledAnswerText>
            </StyledAnswer>
          </StyledItem>
        ))}
      </StyledInner>
    </StyledSection>
  );
};
