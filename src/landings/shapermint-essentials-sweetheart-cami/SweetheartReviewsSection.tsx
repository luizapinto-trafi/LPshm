import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { SweetheartCdn } from "./sweetheartCamiCdn";

const PHOTOS = [
  SweetheartCdn.reviewDonna,
  SweetheartCdn.reviewMaria,
  SweetheartCdn.reviewKaren,
] as const;

const StyledSection = styled.section`
  background: var(--white);
  padding: 24px 20px;
  @media (min-width: 900px) {
    padding: 24px var(--space-400);
  }
`;

const StyledInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const StyledH2 = styled.h2`
  font-family: var(--font-display);
  font-size: clamp(22px, 5.4vw, 32px);
  font-weight: 700;
  color: var(--ink-900);
  margin: 0 0 10px;
  text-align: center;
`;

const StyledMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 0 0 18px;
  font-size: 14px;
  color: var(--ink-600);
  font-weight: 600;
  @media (min-width: 700px) {
    margin: 0 0 24px;
    font-size: 15px;
  }
`;

const StyledStars = styled.span`
  color: var(--gold-500);
  font-size: 18px;
  letter-spacing: 2px;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
  @media (min-width: 700px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-400);
  }
`;

const StyledCard = styled.article`
  background: var(--white);
  border: 1px solid var(--ink-200);
  border-radius: 14px;
  overflow: hidden;
`;

const StyledPhoto = styled.div`
  aspect-ratio: 4 / 5;
  background: var(--coral-050);
  line-height: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const StyledBody = styled.div`
  padding: 16px;
`;

const StyledCardStars = styled.div`
  color: var(--gold-500);
  font-size: 14px;
  letter-spacing: 2px;
  margin-bottom: 8px;
`;

const StyledCardTitle = styled.h3`
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  color: var(--ink-900);
  margin: 0 0 6px;
`;

const StyledCardBody = styled.p`
  font-family: var(--font-body);
  font-size: 13.5px;
  line-height: 1.55;
  color: var(--ink-700);
  margin: 0 0 10px;
`;

const StyledAuthor = styled.div`
  font-size: 12.5px;
  font-weight: 700;
  color: var(--ink-900);
`;

const StyledVerified = styled.span`
  font-size: 12px;
  color: var(--mint-700);
  font-weight: 600;
  margin-left: 6px;
`;

type ReviewItem = { title: string; body: string; name: string };

export const SweetheartReviewsSection = () => {
  const { t } = useTranslation("sweetheartCami");
  const items = t("reviews.items", { returnObjects: true }) as ReviewItem[];

  return (
    <StyledSection id="reviews" aria-labelledby="sweetheart-reviews-title">
      <StyledInner>
        <StyledH2 id="sweetheart-reviews-title">{t("reviews.title")}</StyledH2>
        <StyledMeta>
          <StyledStars aria-label={t("reviews.starsAria")}>★★★★★</StyledStars>
          <span>{t("reviews.count")}</span>
        </StyledMeta>
        <StyledGrid>
          {items.map((r, i) => (
            <StyledCard key={`${r.name}-${r.title}`}>
              <StyledPhoto>
                <Image src={PHOTOS[i]} alt="" width={400} height={500} unoptimized />
              </StyledPhoto>
              <StyledBody>
                <StyledCardStars aria-hidden>★★★★★</StyledCardStars>
                <StyledCardTitle>{r.title}</StyledCardTitle>
                <StyledCardBody>{r.body}</StyledCardBody>
                <StyledAuthor>
                  {r.name}
                  <StyledVerified>{t("reviews.verified")}</StyledVerified>
                </StyledAuthor>
              </StyledBody>
            </StyledCard>
          ))}
        </StyledGrid>
      </StyledInner>
    </StyledSection>
  );
};
