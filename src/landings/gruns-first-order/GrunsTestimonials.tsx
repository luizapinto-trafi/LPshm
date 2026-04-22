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

const StyledCards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-400);
  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const StyledCard = styled.div`
  background: var(--white);
  padding: var(--space-500);
  border-radius: var(--radius-xl);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: var(--space-400);
`;

const StyledQuote = styled.p`
  font-size: 15px;
  line-height: 1.5;
  color: var(--gruns-dark);
  margin: 0;
  strong {
    color: var(--gruns-primary);
    font-weight: 600;
  }
`;

const StyledStars = styled.div`
  display: flex;
  gap: 2px;
`;

const StyledAuthor = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--gruns-dark);
  margin-top: auto;
`;

export const GrunsTestimonials = () => {
  const { t } = useTranslation("gruns");

  const testimonials = [
    { quote: t("testimonials.reviews.chelsea.quote"), author: t("testimonials.reviews.chelsea.author") },
    { quote: t("testimonials.reviews.jason.quote"), author: t("testimonials.reviews.jason.author") },
    { quote: t("testimonials.reviews.carson.quote"), author: t("testimonials.reviews.carson.author") },
    { quote: t("testimonials.reviews.nicole.quote"), author: t("testimonials.reviews.nicole.author") },
  ];

  return (
    <StyledSection>
      <StyledInner>
        <StyledCards>
          {testimonials.map((item, i) => (
            <StyledCard key={i}>
              <StyledStars>
                {[...Array(5)].map((_, j) => (
                  <Image key={j} src={GrunsCdn.starIcon} alt="" width={16} height={16} unoptimized />
                ))}
              </StyledStars>
              <StyledQuote>{item.quote}</StyledQuote>
              <StyledAuthor>{item.author}</StyledAuthor>
            </StyledCard>
          ))}
        </StyledCards>
      </StyledInner>
    </StyledSection>
  );
};
