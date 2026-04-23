import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { StraplessCdn } from "./straplessCdn";
import { StraplessPrimaryButton } from "./StraplessPrimaryButton";

const StyledSection = styled.section`
  padding: clamp(50px, 7vw, 90px) 0;
  background: #fff;
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
  max-width: none;
  text-wrap: balance;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(16px, 2.5vw, 24px);
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    max-width: 480px;
    margin: 0 auto;
  }
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-400);
`;

const StyledImg = styled.div`
  aspect-ratio: 1 / 1.15;
  border-radius: 4px;
  overflow: hidden;
  background: #eee;
  position: relative;
  img {
    object-fit: cover;
  }
`;

const StyledTestimonial = styled.div`
  background: #fff;
  padding: 20px 24px;
  border: 1px solid var(--ink-200);
  border-radius: 0 0 4px 4px;
  margin-top: -12px;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const StyledName = styled.h3`
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 16px;
  color: #000;
  margin: 0;
`;

const StyledQuote = styled.p`
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.5;
  color: #000;
  margin: 0;
`;

export const StraplessColorsSection = () => {
  const { t } = useTranslation("strapless");
  const keys = ["black", "white", "nude"] as const;
  return (
    <StyledSection aria-labelledby="strapless-colors-title">
      <StyledWrap>
        <StyledTitle id="strapless-colors-title">{t("colors.title")}</StyledTitle>
        <StyledGrid>
          {keys.map((k) => (
            <StyledCard key={k}>
              <StyledImg>
                <Image
                  src={
                    k === "black"
                      ? StraplessCdn.colorBlack
                      : k === "white"
                        ? StraplessCdn.colorWhite
                        : StraplessCdn.colorNude
                  }
                  alt={t(`colors.${k}.imageAlt`)}
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                />
              </StyledImg>
              <StyledTestimonial>
                <StyledName>{t(`colors.${k}.name`)}</StyledName>
                <StyledQuote>{t(`colors.${k}.quote`)}</StyledQuote>
                <StraplessPrimaryButton href="#buy" $wide>
                  {t(`colors.${k}.cta`)}
                </StraplessPrimaryButton>
              </StyledTestimonial>
            </StyledCard>
          ))}
        </StyledGrid>
      </StyledWrap>
    </StyledSection>
  );
};
