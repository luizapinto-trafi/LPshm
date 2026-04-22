import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";

const StyledSection = styled.section`
  background: var(--white);
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

const StyledEyebrow = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: var(--gruns-primary);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 var(--space-200) 0;
`;

const StyledHeading = styled.h2`
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: var(--gruns-dark);
  line-height: 1.2;
  margin: 0;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-400);
  margin-bottom: var(--space-800);
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const StyledItem = styled.div`
  background: var(--gruns-cream);
  padding: var(--space-500);
  border-radius: var(--radius-xl);
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const StyledEmoji = styled.div`
  font-size: 32px;
  margin-bottom: var(--space-300);
`;

const StyledItemText = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: var(--gruns-dark);
  margin: 0 0 var(--space-200) 0;
  line-height: 1.3;
`;

const StyledItemDesc = styled.p`
  font-size: 13px;
  color: var(--gruns-dark);
  opacity: 0.7;
  margin: 0;
  line-height: 1.4;
`;

const StyledSummary = styled.div`
  text-align: center;
  background: var(--gruns-cream);
  padding: var(--space-600);
  border-radius: var(--radius-xl);
  margin-bottom: var(--space-600);
`;

const StyledSummaryText = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: var(--gruns-dark);
  margin: 0 0 var(--space-300) 0;
  strong {
    color: var(--gruns-primary);
  }
`;

const StyledCta = styled.a`
  display: inline-block;
  color: var(--gruns-primary);
  font-weight: 600;
  text-decoration: underline;
  &:hover {
    opacity: 0.8;
  }
`;

const StyledBadges = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--space-400);
  flex-wrap: wrap;
`;

const StyledBadge = styled.span`
  font-size: 13px;
  color: var(--gruns-dark);
  opacity: 0.7;
`;

export const GrunsWhatsInside = () => {
  const { t } = useTranslation("gruns");
  const items = t("whatsInside.items", { returnObjects: true }) as Array<{
    emoji: string;
    text: string;
    description: string;
  }>;
  const badges = t("whatsInside.badges", { returnObjects: true }) as string[];

  return (
    <StyledSection>
      <StyledInner>
        <StyledHeader>
          <StyledEyebrow>{t("whatsInside.eyebrow")}</StyledEyebrow>
          <StyledHeading>{t("whatsInside.heading")}</StyledHeading>
        </StyledHeader>

        <StyledGrid>
          {items.map((item, i) => (
            <StyledItem key={i}>
              <StyledEmoji>{item.emoji}</StyledEmoji>
              <StyledItemText>{item.text}</StyledItemText>
              <StyledItemDesc>{item.description}</StyledItemDesc>
            </StyledItem>
          ))}
        </StyledGrid>

        <StyledSummary>
          <StyledSummaryText>{t("whatsInside.summary")}</StyledSummaryText>
          <StyledCta href="#offers">{t("whatsInside.cta")}</StyledCta>
        </StyledSummary>

        <StyledBadges>
          {badges.map((badge, i) => (
            <StyledBadge key={i}>✓ {badge}</StyledBadge>
          ))}
        </StyledBadges>
      </StyledInner>
    </StyledSection>
  );
};
