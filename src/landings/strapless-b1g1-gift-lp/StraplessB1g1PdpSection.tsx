import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { StraplessB1g1Cdn } from "./straplessB1g1Cdn";
import { StraplessPrimaryButton } from "./StraplessPrimaryButton";

const StyledSection = styled.section`
  background: #fff;
  padding-bottom: clamp(48px, 7vw, 88px);
`;

const StyledOfferBanner = styled.div`
  width: 100%;
  background: linear-gradient(105deg, var(--ink-900) 0%, #2d2d2d 42%, #1a1a1a 100%);
  color: #fff;
  padding: var(--space-600) clamp(16px, 4vw, 48px);
  text-align: center;
  border-bottom: 3px solid var(--coral-500);
`;

const StyledOfferBannerEyebrow = styled.p`
  margin: 0 0 var(--space-200);
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.72);
`;

const StyledOfferBannerHeadline = styled.p`
  margin: 0 0 var(--space-250);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(22px, 3.2vw, 32px);
  line-height: 1.15;
  letter-spacing: -0.02em;
`;

const StyledOfferBannerSub = styled.p`
  margin: 0 auto;
  max-width: 42rem;
  font-family: var(--font-body);
  font-size: clamp(14px, 1.5vw, 16px);
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.88);
`;

const StyledInner = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(280px, 400px);
  gap: clamp(20px, 3vw, 40px);
  align-items: start;
  max-width: 1500px;
  margin: 0 auto;
  padding: clamp(28px, 4vw, 48px) clamp(16px, 3vw, 40px) 0;
  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
  }
`;

const StyledGallery = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const StyledGalleryCell = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 540 / 740;
  background: var(--ink-100);
  img {
    object-fit: cover;
  }
`;

const StyledOfferColumn = styled.aside`
  display: flex;
  flex-direction: column;
  gap: var(--space-500);
  position: sticky;
  top: 90px;
  @media (max-width: 1023px) {
    position: static;
  }
`;

const StyledOfferSectionTitle = styled.h2`
  margin: 0;
  font-family: var(--font-body);
  font-size: clamp(18px, 2vw, 22px);
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.02em;
  color: var(--ink-900);
`;

const StyledOfferSectionSubtitle = styled.p`
  margin: calc(-1 * var(--space-300)) 0 0;
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.45;
  color: var(--ink-700);
`;

const StyledPriceWidget = styled.div`
  border: 1px solid var(--ink-200);
  border-radius: 12px;
  padding: var(--space-500);
  background: var(--ink-050);
  display: flex;
  flex-direction: column;
  gap: var(--space-400);
`;

const StyledPriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--space-300);
`;

const StyledPriceLabel = styled.span`
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--ink-600);
`;

const StyledPriceStrike = styled.span`
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 600;
  color: var(--ink-500);
  text-decoration: line-through;
`;

const StyledOfferRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-300);
`;

const StyledOfferBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 9999px;
  background: var(--coral-500);
  color: #fff;
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const StyledOfferPrice = styled.span`
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(28px, 4vw, 36px);
  letter-spacing: -0.03em;
  color: var(--ink-900);
`;

const StyledSavings = styled.p`
  margin: 0;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 700;
  color: var(--mint-700);
`;

const StyledGiftNote = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.45;
  color: var(--ink-800);
  padding-top: var(--space-200);
  border-top: 1px dashed var(--ink-200);
`;

const StyledMicrocopy = styled.p`
  margin: 0;
  font-family: var(--font-body);
  font-size: 12px;
  line-height: 1.45;
  color: var(--ink-600);
  text-align: center;
`;

export const StraplessB1g1PdpSection = () => {
  const { t } = useTranslation("straplessB1g1GiftLp");
  const titleId = "strapless-b1g1-pdp-title";

  return (
    <StyledSection id="buy" aria-labelledby={titleId}>
      <StyledOfferBanner role="region" aria-label={t("b1g1Pdp.offerBannerAria")}>
        <StyledOfferBannerEyebrow>{t("b1g1Pdp.offerBannerEyebrow")}</StyledOfferBannerEyebrow>
        <StyledOfferBannerHeadline>{t("b1g1Pdp.offerBannerHeadline")}</StyledOfferBannerHeadline>
        <StyledOfferBannerSub>{t("b1g1Pdp.offerBannerSub")}</StyledOfferBannerSub>
      </StyledOfferBanner>

      <StyledInner>
        <StyledGallery aria-label={t("b1g1Pdp.galleryAria")}>
          <StyledGalleryCell>
            <Image src={StraplessB1g1Cdn.gallery1} alt={t("pdp.gallery1Alt")} fill sizes="(max-width: 1023px) 100vw, 50vw" />
          </StyledGalleryCell>
          <StyledGalleryCell>
            <Image src={StraplessB1g1Cdn.gallery2} alt={t("pdp.gallery2Alt")} fill sizes="(max-width: 1023px) 100vw, 50vw" />
          </StyledGalleryCell>
        </StyledGallery>

        <StyledOfferColumn>
          <header>
            <StyledOfferSectionTitle id={titleId}>{t("b1g1Pdp.offerSectionTitle")}</StyledOfferSectionTitle>
            <StyledOfferSectionSubtitle>{t("b1g1Pdp.offerSectionSubtitle")}</StyledOfferSectionSubtitle>
          </header>

          <StyledPriceWidget aria-label={t("b1g1Pdp.priceWidgetAria")}>
            <StyledPriceRow>
              <StyledPriceLabel>{t("b1g1Pdp.priceWidgetCompareLabel")}</StyledPriceLabel>
              <StyledPriceStrike>{t("b1g1Pdp.priceWidgetCompareValue")}</StyledPriceStrike>
            </StyledPriceRow>
            <StyledPriceRow>
              <StyledPriceLabel>{t("b1g1Pdp.priceWidgetOfferLabel")}</StyledPriceLabel>
            </StyledPriceRow>
            <StyledOfferRow>
              <StyledOfferBadge>{t("b1g1Pdp.priceWidgetOfferBadge")}</StyledOfferBadge>
              <StyledOfferPrice>{t("b1g1Pdp.priceWidgetOfferValue")}</StyledOfferPrice>
            </StyledOfferRow>
            <StyledSavings>{t("b1g1Pdp.priceWidgetSavings")}</StyledSavings>
            <StyledGiftNote>{t("b1g1Pdp.priceWidgetGiftNote")}</StyledGiftNote>
          </StyledPriceWidget>

          <StyledMicrocopy>{t("b1g1Pdp.microcopyAboveCta")}</StyledMicrocopy>

          <StraplessPrimaryButton href="https://shapermint.com" $wide>
            {t("b1g1Pdp.cta")}
          </StraplessPrimaryButton>
        </StyledOfferColumn>
      </StyledInner>
    </StyledSection>
  );
};
