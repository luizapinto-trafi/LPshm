import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { StraplessCdn } from "./straplessCdn";

const StyledSection = styled.section`
  padding: clamp(50px, 7vw, 90px) 0;
  background: #f6f6f1;
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

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(20px, 3vw, 40px);
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 48px;
    max-width: 520px;
    margin: 0 auto;
  }
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-500);
`;

const StyledImgWrap = styled.div`
  position: relative;
  aspect-ratio: 440 / 486;
  border-radius: 20px;
  overflow: hidden;
  background: #ddd;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StyledTag = styled.span`
  position: absolute;
  left: 18px;
  top: 18px;
  background: var(--coral-200);
  color: var(--ink-900);
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.02em;
  padding: var(--space-200) 18px;
  border-radius: 9999px;
`;

const StyledNum = styled.div`
  width: 57px;
  height: 47px;
  border: 1px solid var(--ink-900);
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-weight: 400;
  font-style: italic;
  font-size: 26px;
  color: var(--ink-900);
  background: transparent;
  margin-top: 4px;
`;

const StyledCardTitle = styled.h3`
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 18px;
  line-height: 1.3;
  color: #000;
  margin: 0;
`;

const StyledCardBody = styled.p`
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: var(--ink-900);
  margin: 0;
`;

export const StraplessFeaturesSection = () => {
  const { t } = useTranslation("strapless");
  return (
    <StyledSection aria-labelledby="strapless-features-title">
      <StyledWrap>
        <StyledTitle id="strapless-features-title">{t("features.title")}</StyledTitle>
        <StyledGrid>
          <StyledCard>
            <StyledNum aria-hidden>01</StyledNum>
            <StyledCardTitle>{t("features.card1Title")}</StyledCardTitle>
            <StyledCardBody>{t("features.card1Body")}</StyledCardBody>
          </StyledCard>
          <StyledCard>
            <StyledImgWrap>
              <Image
                src={StraplessCdn.featBreathable}
                alt={t("features.card2ImageAlt")}
                fill
                sizes="(max-width: 900px) 100vw, 33vw"
              />
              <StyledTag>{t("features.card2Tag")}</StyledTag>
            </StyledImgWrap>
            <StyledNum aria-hidden>02</StyledNum>
            <StyledCardTitle>{t("features.card2Title")}</StyledCardTitle>
            <StyledCardBody>{t("features.card2Body")}</StyledCardBody>
          </StyledCard>
          <StyledCard>
            <StyledImgWrap>
              <Image
                src={StraplessCdn.featWireless}
                alt={t("features.card3ImageAlt")}
                fill
                sizes="(max-width: 900px) 100vw, 33vw"
              />
              <StyledTag>{t("features.card3Tag")}</StyledTag>
            </StyledImgWrap>
            <StyledNum aria-hidden>03</StyledNum>
            <StyledCardTitle>{t("features.card3Title")}</StyledCardTitle>
            <StyledCardBody>{t("features.card3Body")}</StyledCardBody>
          </StyledCard>
        </StyledGrid>
      </StyledWrap>
    </StyledSection>
  );
};
