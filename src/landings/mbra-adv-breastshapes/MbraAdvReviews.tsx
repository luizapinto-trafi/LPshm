import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";

const StyledWrapper = styled.div`
  margin: 26px 0;
`;

const StyledStars = styled.p`
  font-size: 20px;
  letter-spacing: 2px;
  color: #fbb621;
  text-align: center;
  margin-bottom: 4px;
`;

const StyledTitle = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 15px;
  text-align: center;
  color: #292929;
  margin-bottom: 18px;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const StyledCard = styled.figure`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 18px;
  background-color: #ffffff;
  border: 1px solid #ececec;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

const StyledCardStars = styled.span`
  font-size: 14px;
  letter-spacing: 1px;
  color: #fbb621;
`;

const StyledQuote = styled.blockquote`
  font-family: Georgia, "Times New Roman", serif;
  font-size: 15px;
  line-height: 1.5;
  color: #292929;
`;

const StyledName = styled.figcaption`
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #6a6a6a;
`;

const reviewKeys = ["1", "2", "3"] as const;

export const MbraAdvReviews = () => {
  const { t } = useTranslation("mbraAdv");
  return (
    <StyledWrapper>
      <StyledStars aria-hidden="true">★★★★★</StyledStars>
      <StyledTitle>{t("article.reviewsTitle")}</StyledTitle>
      <StyledGrid>
        {reviewKeys.map((key) => (
          <StyledCard key={key}>
            <StyledCardStars aria-hidden="true">★★★★★</StyledCardStars>
            <StyledQuote>“{t(`article.reviews.q${key}`)}”</StyledQuote>
            <StyledName>{t(`article.reviews.n${key}`)}</StyledName>
          </StyledCard>
        ))}
      </StyledGrid>
    </StyledWrapper>
  );
};
