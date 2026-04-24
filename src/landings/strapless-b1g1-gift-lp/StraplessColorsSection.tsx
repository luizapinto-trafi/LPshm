import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { StraplessB1g1Cdn } from "./straplessB1g1Cdn";
import { StraplessPrimaryButton } from "./StraplessPrimaryButton";
import { straplessSectionH2Typography } from "./straplessSectionH2Typography";

const StyledSection = styled.section`
  position: relative;
  background: #fff;
  overflow: hidden;
  padding-top: var(--space-1200);
  padding-bottom: var(--space-1200);
`;

const StyledWrap = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding-inline: clamp(var(--space-200), 4vw, var(--space-800));
`;

const StyledTitle = styled.h2`
  ${straplessSectionH2Typography}
  text-align: center;
  margin: 0 0 var(--space-1000);
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-800);
  @media (min-width: 901px) {
    grid-template-columns: repeat(3, 1fr);
    column-gap: var(--space-300);
    row-gap: var(--space-200);
    align-items: start;
  }
`;

const StyledCard = styled.div`
  width: 100%;
  max-width: 480px;
  margin-inline: auto;
  @media (min-width: 901px) {
    max-width: none;
    margin-inline: 0;
  }
`;

const StyledMediaBlock = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 320 / 480;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--ink-100);
`;

const StyledImg = styled.div`
  position: absolute;
  inset: 0;
  img {
    object-fit: cover;
  }
`;

const StyledTestimonial = styled.div`
  position: absolute;
  left: var(--space-300);
  right: var(--space-300);
  bottom: var(--space-300);
  z-index: 1;
  background: #fff;
  padding: var(--space-200);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
`;

const StyledQuote = styled.p`
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 14px;
  line-height: 1.35;
  color: var(--ink-800);
  margin: 0 0 var(--space-200);
`;

const StyledName = styled.p`
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 14px;
  line-height: 1.3;
  color: var(--ink-900);
  margin: 0;
`;

const StyledButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: var(--space-500);
`;

const StyledShopButton = styled(StraplessPrimaryButton)`
  width: 100%;
  max-width: none;
  font-size: 14px;
  min-height: 44px;
  padding-inline: var(--space-600);
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const COLOR_KEYS = ["white", "black", "nude"] as const;

function colorSrc(k: (typeof COLOR_KEYS)[number]) {
  if (k === "black") return StraplessB1g1Cdn.colorBlack;
  if (k === "white") return StraplessB1g1Cdn.colorWhite;
  return StraplessB1g1Cdn.colorNude;
}

export const StraplessColorsSection = () => {
  const { t } = useTranslation("straplessB1g1GiftLp");
  return (
    <StyledSection aria-labelledby="strapless-colors-title">
      <StyledWrap>
        <StyledTitle id="strapless-colors-title">{t("colors.title")}</StyledTitle>
        <StyledGrid>
          {COLOR_KEYS.map((k) => (
            <StyledCard key={k}>
              <StyledMediaBlock>
                <StyledImg>
                  <Image
                    src={colorSrc(k)}
                    alt={t(`colors.${k}.imageAlt`)}
                    fill
                    sizes="(max-width: 900px) 100vw, 33vw"
                  />
                </StyledImg>
                <StyledTestimonial>
                  <StyledQuote>{t(`colors.${k}.quote`)}</StyledQuote>
                  <StyledName>{t(`colors.${k}.name`)}</StyledName>
                </StyledTestimonial>
              </StyledMediaBlock>
              <StyledButtonWrap>
                <StyledShopButton href="#buy">{t(`colors.${k}.cta`)}</StyledShopButton>
              </StyledButtonWrap>
            </StyledCard>
          ))}
        </StyledGrid>
      </StyledWrap>
    </StyledSection>
  );
};
