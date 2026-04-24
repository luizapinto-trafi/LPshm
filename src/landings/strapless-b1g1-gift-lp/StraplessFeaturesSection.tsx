import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { StraplessB1g1Cdn } from "./straplessB1g1Cdn";
import { straplessSectionH2Typography } from "./straplessSectionH2Typography";

/* Frame Figma 2350:2644: 3 columnas 441×486 con imagen + nº + título 15/700 + cuerpo 18; assets vía StraplessB1g1Cdn. */
const MOBILE_MAX = 900;

const FEATURE_IMG_SIZES = `(max-width: ${MOBILE_MAX}px) 45vw, 441px`;

const StyledSection = styled.section`
  padding: clamp(50px, 7vw, 90px) 0;
  background: #f6f6f1;
`;

const StyledWrap = styled.div`
  max-width: 1512px;
  margin: 0 auto;
  padding: 0 clamp(16px, 4vw, 60px);
`;

const StyledTitle = styled.h2`
  ${straplessSectionH2Typography}
  width: 800px;
  max-width: 100%;
  margin: 0 auto var(--space-1000);
  box-sizing: border-box;
  text-align: center;
  @media (max-width: ${MOBILE_MAX}px) {
    margin-bottom: var(--space-1000);
  }
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 441px));
  justify-content: center;
  align-items: start;
  gap: 32px;
  @media (max-width: ${MOBILE_MAX}px) {
    display: flex;
    flex-direction: column;
    gap: 32px;
    max-width: 100%;
  }
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-500);
  @media (max-width: ${MOBILE_MAX}px) {
    gap: 20px;
  }
`;

const StyledImageBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  @media (max-width: ${MOBILE_MAX}px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 16px;
  }
`;

const StyledTextCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-300);
  flex: 1;
  min-width: 0;
`;

const StyledImgWrap = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  min-height: 0;
  aspect-ratio: 441 / 486;
  border-radius: 20px;
  overflow: hidden;
  background: #ddd;
  flex-shrink: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media (max-width: ${MOBILE_MAX}px) {
    width: 42%;
    min-width: 120px;
    max-width: 200px;
    height: auto;
  }
`;

const StyledTag = styled.span`
  position: absolute;
  left: 18px;
  top: 18px;
  z-index: 1;
  background: var(--coral-200);
  color: var(--ink-900);
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.02em;
  padding: var(--space-200) 18px;
  border-radius: 9999px;
  line-height: 1.25;
`;

/** Badges SVG (incluyen marco); tarjetas 2 y 3 comparten `05-2.svg`. */
const StyledNumSvgWrap = styled.div`
  width: 53px;
  height: 53px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    display: block;
    width: 53px;
    height: 53px;
    object-fit: contain;
  }
`;

const StyledCardTitle = styled.h3`
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 15px;
  line-height: 1.28;
  color: #000;
  margin: 0;
  text-transform: none;
  letter-spacing: 0;
`;

const StyledCardBody = styled.p`
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 18px;
  line-height: 24.59px;
  color: #000;
  margin: 0;
  @media (max-width: ${MOBILE_MAX}px) {
    font-size: 16px;
    line-height: 1.5;
  }
`;

type FeatureImageProps = {
  src: string;
  alt: string;
  tag?: string;
};

const FeatureImage = ({ src, alt, tag }: FeatureImageProps) => (
  <StyledImgWrap>
    <Image src={src} alt={alt} fill sizes={FEATURE_IMG_SIZES} quality={80} />
    {!!tag && <StyledTag>{tag}</StyledTag>}
  </StyledImgWrap>
);

export const StraplessFeaturesSection = () => {
  const { t } = useTranslation("straplessB1g1GiftLp");
  return (
    <StyledSection aria-labelledby="strapless-features-title">
      <StyledWrap>
        <StyledTitle id="strapless-features-title">{t("features.title")}</StyledTitle>
        <StyledGrid>
          <StyledCard>
            <StyledImageBlock>
              <FeatureImage
                src={StraplessB1g1Cdn.featBreathe}
                alt={t("features.card1ImageAlt")}
              />
              <StyledTextCol>
                <StyledNumSvgWrap aria-hidden>
                  <Image src={StraplessB1g1Cdn.featureNum01Svg} alt="" width={53} height={53} unoptimized />
                </StyledNumSvgWrap>
                <StyledCardTitle>{t("features.card1Title")}</StyledCardTitle>
                <StyledCardBody>{t("features.card1Body")}</StyledCardBody>
              </StyledTextCol>
            </StyledImageBlock>
          </StyledCard>
          <StyledCard>
            <StyledImageBlock>
              <FeatureImage
                src={StraplessB1g1Cdn.featBreathable}
                alt={t("features.card2ImageAlt")}
                tag={t("features.card2Tag")}
              />
              <StyledTextCol>
                <StyledNumSvgWrap aria-hidden>
                  <Image src={StraplessB1g1Cdn.featureNum02Svg} alt="" width={53} height={53} unoptimized />
                </StyledNumSvgWrap>
                <StyledCardTitle>{t("features.card2Title")}</StyledCardTitle>
                <StyledCardBody>{t("features.card2Body")}</StyledCardBody>
              </StyledTextCol>
            </StyledImageBlock>
          </StyledCard>
          <StyledCard>
            <StyledImageBlock>
              <FeatureImage
                src={StraplessB1g1Cdn.featWireless}
                alt={t("features.card3ImageAlt")}
                tag={t("features.card3Tag")}
              />
              <StyledTextCol>
                <StyledNumSvgWrap aria-hidden>
                  <Image src={StraplessB1g1Cdn.featureNum02Svg} alt="" width={53} height={53} unoptimized />
                </StyledNumSvgWrap>
                <StyledCardTitle>{t("features.card3Title")}</StyledCardTitle>
                <StyledCardBody>{t("features.card3Body")}</StyledCardBody>
              </StyledTextCol>
            </StyledImageBlock>
          </StyledCard>
        </StyledGrid>
      </StyledWrap>
    </StyledSection>
  );
};
