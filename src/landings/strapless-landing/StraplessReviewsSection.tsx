import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";

const StyledSection = styled.section`
  background: #fff;
  padding: 90px 0;
`;

const StyledWrap = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(16px, 4vw, 60px);
`;

const StyledTitle = styled.h2`
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(30px, 4.5vw, 52px);
  line-height: 1.1;
  color: #000;
  text-align: center;
  margin: 0 auto 48px;
  max-width: 18ch;
  text-wrap: balance;
`;

const StyledList = styled.div`
  max-width: 780px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const StyledRow = styled.div`
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 40px;
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 6px;
  }
`;

const StyledName = styled.p`
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 16px;
  color: #000;
  margin: 0;
`;

const StyledRole = styled.p`
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--ink-700);
  margin: 2px 0 0;
`;

const StyledStars = styled.span`
  display: inline-flex;
  gap: 2px;
  color: var(--gold-600);
  svg {
    width: 14px;
    height: 14px;
  }
`;

const StyledRevTitle = styled.h3`
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  color: #000;
  margin: 8px 0 4px;
`;

const StyledBody = styled.p`
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 1.55;
  color: var(--ink-700);
  margin: 0;
`;

const starPath = "M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z";

const reviewIds = ["r0", "r1", "r2", "r3", "r4"] as const;

export const StraplessReviewsSection = () => {
  const { t } = useTranslation("strapless");
  return (
    <StyledSection aria-labelledby="strapless-reviews-title">
      <StyledWrap>
        <StyledTitle id="strapless-reviews-title">{t("reviews.title")}</StyledTitle>
        <StyledList>
          {reviewIds.map((id) => (
            <StyledRow key={id}>
              <div>
                <StyledName>{t(`reviews.${id}.name`)}</StyledName>
                <StyledRole>{t(`reviews.${id}.role`)}</StyledRole>
              </div>
              <div>
                <StyledStars aria-label={t(`reviews.${id}.starsAria`)}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg key={i} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d={starPath} />
                    </svg>
                  ))}
                </StyledStars>
                <StyledRevTitle>{t(`reviews.${id}.title`)}</StyledRevTitle>
                <StyledBody>{t(`reviews.${id}.body`)}</StyledBody>
              </div>
            </StyledRow>
          ))}
        </StyledList>
      </StyledWrap>
    </StyledSection>
  );
};
