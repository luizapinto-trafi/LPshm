import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { StraplessB1g1Cdn } from "./straplessB1g1Cdn";

const StyledSection = styled.section`
  background: var(--coral-050);
  padding: 60px 0 72px;
  text-align: center;
`;

const StyledWrap = styled.div`
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 clamp(16px, 4vw, 60px);
`;

const StyledTitle = styled.div`
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0.12em;
  color: var(--ink-900);
  opacity: 0.75;
  margin: 0 0 32px;
`;

const StyledLogos = styled.div`
  display: flex;
  gap: clamp(30px, 5vw, 80px);
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  opacity: 0.55;
`;

const StyledPressLogoInstyle = styled.div`
  position: relative;
  height: 28px;
  width: 110px;
  img {
    object-fit: contain;
    object-position: center;
  }
  @media (min-width: 768px) {
    height: 32px;
    width: 126px;
  }
`;

const StyledPressLogoCosmo = styled.div`
  position: relative;
  height: 28px;
  width: 160px;
  img {
    object-fit: contain;
    object-position: center;
  }
  @media (min-width: 768px) {
    height: 34px;
    width: 200px;
  }
`;

const StyledPressLogoElle = styled.div`
  position: relative;
  height: 32px;
  width: 118px;
  img {
    object-fit: contain;
    object-position: center;
  }
  @media (min-width: 768px) {
    height: 40px;
    width: 148px;
  }
`;

const StyledPressLogoGlossy = styled.div`
  position: relative;
  height: 24px;
  width: 120px;
  img {
    object-fit: contain;
    object-position: center;
  }
  @media (min-width: 768px) {
    height: 32px;
    width: 200px;
  }
`;

export const StraplessPressSection = () => {
  const { t } = useTranslation("straplessB1g1GiftLp");
  return (
    <StyledSection aria-label={t("press.aria")}>
      <StyledWrap>
        <StyledTitle>{t("press.title")}</StyledTitle>
        <StyledLogos>
          <StyledPressLogoInstyle>
            <Image src={StraplessB1g1Cdn.pressInstyle} alt={t("press.instyleLogoAlt")} fill sizes="130px" unoptimized />
          </StyledPressLogoInstyle>
          <StyledPressLogoElle>
            <Image src={StraplessB1g1Cdn.pressElle} alt={t("press.elleLogoAlt")} fill sizes="(max-width: 767px) 120px, 160px" unoptimized />
          </StyledPressLogoElle>
          <StyledPressLogoCosmo>
            <Image src={StraplessB1g1Cdn.pressCosmo} alt={t("press.cosmoLogoAlt")} fill sizes="200px" unoptimized />
          </StyledPressLogoCosmo>
          <StyledPressLogoGlossy>
            <Image src={StraplessB1g1Cdn.pressGlossy} alt={t("press.glossyLogoAlt")} fill sizes="(max-width: 767px) 120px, 220px" unoptimized />
          </StyledPressLogoGlossy>
        </StyledLogos>
      </StyledWrap>
    </StyledSection>
  );
};
