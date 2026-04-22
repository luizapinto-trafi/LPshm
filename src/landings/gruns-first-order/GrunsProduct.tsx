import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { GrunsCdn } from "./grunsCdn";

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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-1000);
  align-items: start;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const StyledLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-500);
`;

const StyledRating = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-200);
`;

const StyledStars = styled.div`
  display: flex;
  gap: 2px;
`;

const StyledRatingText = styled.span`
  font-size: 14px;
  color: var(--gruns-dark);
`;

const StyledTitle = styled.h1`
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 700;
  color: var(--gruns-dark);
  margin: 0;
`;

const StyledSubtitle = styled.p`
  font-size: 16px;
  color: var(--gruns-dark);
  opacity: 0.8;
  margin: 0;
`;

const StyledFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-300);
`;

const StyledFeature = styled.li`
  display: flex;
  align-items: center;
  gap: var(--space-300);
  font-size: 15px;
  color: var(--gruns-dark);
  &:before {
    content: "✓";
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    background: var(--gruns-primary);
    color: var(--white);
    border-radius: var(--radius-full);
    font-size: 12px;
  }
`;

const StyledGallery = styled.div`
  display: flex;
  gap: var(--space-300);
  margin-top: var(--space-400);
`;

const StyledGalleryImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 2px solid var(--gruns-cream);
  cursor: pointer;
  &:hover {
    border-color: var(--gruns-primary);
  }
`;

const StyledRight = styled.div`
  background: var(--gruns-cream);
  padding: var(--space-600);
  border-radius: var(--radius-xl);
`;

const StyledFlavorLabel = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: var(--gruns-dark);
  margin: 0 0 var(--space-300) 0;
`;

const StyledFlavorOptions = styled.div`
  display: flex;
  gap: var(--space-300);
  margin-bottom: var(--space-500);
`;

const StyledFlavorOption = styled.button<{ $active?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-200);
  padding: var(--space-300);
  background: ${({ $active }) => ($active ? "var(--white)" : "transparent")};
  border: 2px solid ${({ $active }) => ($active ? "var(--gruns-primary)" : "var(--gruns-cream)")};
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    border-color: var(--gruns-primary);
  }
`;

const StyledFlavorName = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: var(--gruns-dark);
`;

const StyledSugarLabel = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: var(--gruns-dark);
  margin: 0 0 var(--space-300) 0;
`;

const StyledSugarOptions = styled.div`
  display: flex;
  gap: var(--space-200);
  margin-bottom: var(--space-500);
`;

const StyledSugarOption = styled.button<{ $active?: boolean }>`
  padding: var(--space-200) var(--space-400);
  background: ${({ $active }) => ($active ? "var(--gruns-primary)" : "var(--white)")};
  color: ${({ $active }) => ($active ? "var(--white)" : "var(--gruns-dark)")};
  border: 2px solid ${({ $active }) => ($active ? "var(--gruns-primary)" : "var(--gruns-cream)")};
  border-radius: var(--radius-full);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    border-color: var(--gruns-primary);
  }
`;

const StyledOfferLabel = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: var(--gruns-dark);
  margin: 0 0 var(--space-400) 0;
`;

const StyledOffer = styled.div`
  background: var(--white);
  padding: var(--space-400);
  border-radius: var(--radius-lg);
  border: 2px solid var(--gruns-primary);
  margin-bottom: var(--space-400);
`;

const StyledOfferBadge = styled.div`
  display: inline-block;
  background: var(--gruns-gold);
  color: var(--gruns-dark);
  font-size: 12px;
  font-weight: 700;
  padding: var(--space-100) var(--space-300);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-300);
`;

const StyledOfferTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: var(--gruns-dark);
  margin: 0 0 var(--space-100) 0;
`;

const StyledOfferDesc = styled.p`
  font-size: 13px;
  color: var(--gruns-dark);
  opacity: 0.7;
  margin: 0 0 var(--space-300) 0;
`;

const StyledPriceRow = styled.div`
n  display: flex;
  align-items: baseline;
  gap: var(--space-200);
  margin-bottom: var(--space-200);
`;

const StyledPriceCurrent = styled.span`
  font-size: 28px;
  font-weight: 700;
  color: var(--gruns-primary);
`;

const StyledPriceOriginal = styled.span`
  font-size: 18px;
  color: var(--gruns-dark);
  opacity: 0.5;
  text-decoration: line-through;
`;

const StyledPerDay = styled.span`
  font-size: 14px;
  color: var(--gruns-dark);
  opacity: 0.7;
`;

const StyledBenefits = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-200);
`;

const StyledBenefit = styled.li`
  display: flex;
  align-items: center;
  gap: var(--space-200);
  font-size: 13px;
  color: var(--gruns-dark);
  &:before {
    content: "✓";
    color: var(--gruns-primary);
    font-weight: 700;
  }
`;

const StyledCta = styled.button`
  width: 100%;
  background: var(--gruns-primary);
  color: var(--white);
  font-size: 18px;
  font-weight: 700;
  padding: var(--space-400);
  border: none;
  border-radius: var(--radius-xl);
  cursor: pointer;
  box-shadow: 0 4px 0 var(--gruns-dark);
  transition: all 0.2s ease;
  &:hover {
    transform: translateY(2px);
    box-shadow: 0 2px 0 var(--gruns-dark);
  }
`;

const StyledDiscountBadge = styled.div`
  text-align: center;
  margin-top: var(--space-400);
  padding: var(--space-300);
  background: var(--gruns-cream);
  border-radius: var(--radius-lg);
  font-size: 13px;
  color: var(--gruns-dark);
`;

export const GrunsProduct = () => {
  const { t } = useTranslation("gruns");
  const features = t("product.features", { returnObjects: true }) as string[];

  return (
    <StyledSection id="offers">
      <StyledInner>
        <StyledLeft>
          <StyledRating>
            <StyledStars>
              {[...Array(5)].map((_, i) => (
                <Image key={i} src={GrunsCdn.starIcon} alt="" width={16} height={16} unoptimized />
              ))}
            </StyledStars>
            <StyledRatingText>{t("product.rating")}</StyledRatingText>
          </StyledRating>

          <StyledTitle>{t("product.title")}</StyledTitle>
          <StyledSubtitle>{t("product.subtitle")}</StyledSubtitle>

          <StyledFeatures>
            {features.map((feature, i) => (
              <StyledFeature key={i}>{feature}</StyledFeature>
            ))}
          </StyledFeatures>

          <StyledGallery>
            {[1, 2, 3].map((i) => (
              <StyledGalleryImage key={i}>
                <Image
                  src={GrunsCdn.productPack}
                  alt=""
                  width={80}
                  height={80}
                  unoptimized
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </StyledGalleryImage>
            ))}
          </StyledGallery>
        </StyledLeft>

        <StyledRight>
          <StyledFlavorLabel>{t("product.flavorLabel")}</StyledFlavorLabel>
          <StyledFlavorOptions>
            <StyledFlavorOption $active>
              <Image src={GrunsCdn.productPack} alt="" width={60} height={60} unoptimized />
              <StyledFlavorName>Original</StyledFlavorName>
            </StyledFlavorOption>
            <StyledFlavorOption>
              <Image src={GrunsCdn.productPack} alt="" width={60} height={60} unoptimized />
              <StyledFlavorName>New Strawberry Vanilla</StyledFlavorName>
            </StyledFlavorOption>
          </StyledFlavorOptions>

          <StyledSugarLabel>{t("product.sugarLabel")}</StyledSugarLabel>
          <StyledSugarOptions>
            <StyledSugarOption $active>Low Sugar</StyledSugarOption>
            <StyledSugarOption>Sugar-Free</StyledSugarOption>
          </StyledSugarOptions>

          <StyledOfferLabel>{t("product.offerLabel")}</StyledOfferLabel>
          <StyledOffer>
            <StyledOfferBadge>Most Popular: Get 49% Off</StyledOfferBadge>
            <StyledOfferTitle>Subscribe & Save</StyledOfferTitle>
            <StyledOfferDesc>28 packs each 4 weeks</StyledOfferDesc>
            <StyledPriceRow>
              <StyledPriceCurrent>$40.80</StyledPriceCurrent>
              <StyledPriceOriginal>$79.99</StyledPriceOriginal>
            </StyledPriceRow>
            <StyledPerDay>$1.46/day</StyledPerDay>
            <StyledBenefits>
              <StyledBenefit>FAST & FREE Shipping On First Order</StyledBenefit>
              <StyledBenefit>Pause Or Cancel Any Time</StyledBenefit>
              <StyledBenefit>30-Day Guarantee</StyledBenefit>
            </StyledBenefits>
          </StyledOffer>

          <StyledCta>{t("product.cta")}</StyledCta>
          <StyledDiscountBadge>{t("product.discountBadge")}</StyledDiscountBadge>
        </StyledRight>
      </StyledInner>
    </StyledSection>
  );
};
