import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { JellybraShopUrl } from "./jellybraCdn";
import {
  JellybraSplitCta,
  JellybraSplitCtaDivider,
  JellybraSplitCtaPart,
} from "./JellybraPrimaryButton";

const StyledSection = styled.section`
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-1000) var(--space-400) var(--space-1200);
  @media (max-width: 899px) {
    padding: var(--space-800) var(--space-400) var(--space-1000);
  }
`;

const StyledH2 = styled.h2`
  font-family: var(--font-display);
  font-size: clamp(24px, 5.4vw, 32px);
  font-weight: 800;
  color: var(--ink-900);
  margin: 0 0 var(--space-200);
  text-align: center;
`;

const StyledMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 0 0 var(--space-600);
  font-size: 15px;
  color: var(--ink-600);
  font-weight: 700;
`;

const StyledStars = styled.span`
  color: var(--coral-300);
  font-size: 18px;
  letter-spacing: 2px;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-400);
`;

const StyledCard = styled.article`
  background: var(--white);
  border: 1px solid var(--ink-200);
  border-radius: var(--radius-lg);
  padding: var(--space-500) var(--space-400);
`;

const StyledCardStars = styled.div`
  color: var(--coral-300);
  font-size: 15px;
  letter-spacing: 2px;
  span {
    color: var(--ink-600);
    font-size: 13px;
    letter-spacing: 0;
    font-weight: 700;
  }
`;

const StyledCardTitle = styled.h3`
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 800;
  color: var(--ink-900);
  margin: var(--space-200) 0;
`;

const StyledCardBody = styled.p`
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.6;
  color: #4a4a4a;
  margin: 0 0 var(--space-300);
`;

const StyledAuthor = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: var(--ink-900);
`;

const StyledVerified = styled.div`
  font-size: 12px;
  color: var(--mint-700);
  font-weight: 700;
  margin-top: 4px;
`;

const StyledCtaWrap = styled.div`
  text-align: center;
  margin-top: var(--space-800);
`;

const StyledCta = styled(JellybraSplitCta)`
  margin-inline: auto;
`;

const StyledTrust = styled.p`
  font-size: 14px;
  color: var(--ink-400);
  margin-top: var(--space-300);
  font-weight: 600;
`;

type ReviewItem = { title: string; body: string; name: string; date: string };

export const JellybraReviewsSection = () => {
  const { t } = useTranslation("jellybra");
  const items = t("reviews.items", { returnObjects: true }) as ReviewItem[];

  return (
    <StyledSection id="reviews" aria-labelledby="jellybra-reviews-title">
      <StyledH2 id="jellybra-reviews-title">{t("reviews.title")}</StyledH2>
      <StyledMeta>
        <StyledStars aria-label={t("reviews.starsAria")}>★★★★★</StyledStars>
        <span>{t("reviews.count")}</span>
      </StyledMeta>
      <StyledGrid>
        {items.map((r) => (
          <StyledCard key={`${r.name}-${r.title}`}>
            <StyledCardStars>
              ★★★★★ <span>5/5</span>
            </StyledCardStars>
            <StyledCardTitle>{r.title}</StyledCardTitle>
            <StyledCardBody>{r.body}</StyledCardBody>
            <StyledAuthor>By {r.name}</StyledAuthor>
            <StyledVerified>
              ✓ {t("reviews.verified")} · {r.date}
            </StyledVerified>
          </StyledCard>
        ))}
      </StyledGrid>
      <StyledCtaWrap>
        <StyledCta href={JellybraShopUrl}>
          <JellybraSplitCtaPart>{t("offer.ctaLabel")}</JellybraSplitCtaPart>
          <JellybraSplitCtaDivider aria-hidden />
          <JellybraSplitCtaPart>{t("offer.ctaOffer")}</JellybraSplitCtaPart>
        </StyledCta>
        <StyledTrust>{t("reviews.trustLine")}</StyledTrust>
      </StyledCtaWrap>
    </StyledSection>
  );
};
