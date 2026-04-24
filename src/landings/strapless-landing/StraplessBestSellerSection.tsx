import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { StraplessCdn } from "./straplessCdn";
import { StraplessFiveStars } from "./StraplessFiveStars";
import { straplessSectionH2Typography } from "./straplessSectionH2Typography";

const StyledSection = styled.section`
  position: relative;
  padding: 60px 0 0;
  background: #fff;
`;

const StyledTitle = styled.h2`
  ${straplessSectionH2Typography}
  text-align: center;
  margin: 0 auto var(--space-1000);
  max-width: 18ch;
`;

const StyledMedia = styled.div`
  position: relative;
  background: url(${StraplessCdn.bestSellerBg}) center / cover no-repeat;
  min-height: 640px;
  overflow: hidden;
  @media (max-width: 767px) {
    min-height: 480px;
  }
`;

const StyledInner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px clamp(16px, 4vw, 80px);
  display: grid;
  grid-template-columns: minmax(0, 400px) 1fr;
  gap: var(--space-800);
  align-items: flex-end;
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    padding: 40px 16px;
  }
`;

const StyledReviewCard = styled.div`
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  gap: var(--space-500);
  max-width: 400px;
  width: 100%;
`;

const StyledReviewText = styled.p`
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.55;
  color: var(--ink-900);
  margin: 0;
`;

const StyledMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--ink-900);

  > span {
    font-weight: 700;
  }
`;

const StyledVerified = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--mint-700);
  font-size: 12px;
  ${StyledMeta} > & {
    font-weight: 600;
  }
  svg {
    width: 16px;
    height: 16px;
  }
`;

const StyledLink = styled.a`
  font-family: var(--font-body);
  font-size: 15px;
  color: var(--ink-900);
  text-decoration: underline;
  font-weight: 600;
  margin-top: 4px;
  &:hover {
    color: var(--coral-500);
  }
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

export const StraplessBestSellerSection = () => {
  const { t } = useTranslation("strapless");
  return (
    <StyledSection aria-labelledby="strapless-bestseller-title">
      <StyledTitle id="strapless-bestseller-title">{t("bestseller.title")}</StyledTitle>
      <StyledMedia>
        <StyledInner>
          <StyledReviewCard>
            <StraplessFiveStars label={t("bestseller.starsAria")} sizePx={24} />
            <StyledReviewText>{t("bestseller.quote")}</StyledReviewText>
            <StyledMeta>
              <span>{t("bestseller.author")}</span>
              <StyledVerified>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t("bestseller.verified")}
              </StyledVerified>
            </StyledMeta>
            <StyledLink href="#buy">{t("bestseller.cta")}</StyledLink>
          </StyledReviewCard>
        </StyledInner>
      </StyledMedia>
    </StyledSection>
  );
};
