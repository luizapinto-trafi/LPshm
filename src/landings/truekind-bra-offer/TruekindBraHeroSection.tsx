import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { TruekindBraCtaLink } from "./TruekindBraCtaLink";
import { TruekindBraCdn, TruekindBraShopPdp } from "./truekindBraCdn";

const DEFAULT_VARIANT = "40278561292422";

const StyledSection = styled.section`
  position: relative;
  background: var(--coral-050);
  overflow: hidden;
`;

const StyledLayout = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  align-items: center;
  min-height: min(520px, 80vh);
  gap: var(--space-500);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    min-height: unset;
  }
`;

const StyledText = styled.div`
  position: relative;
  z-index: 1;
  padding: var(--space-1000) var(--space-400) var(--space-1000) 0;
  @media (max-width: 900px) {
    padding: var(--space-800) var(--space-400);
    text-align: center;
  }
`;

const StyledH1 = styled.h1`
  color: var(--ink-1000);
  font-family: var(--font-display);
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  font-weight: 600;
  line-height: 1.1;
  margin: 0 0 var(--space-400) 0;
  letter-spacing: -0.02em;
  text-transform: none;
`;

const StyledLead = styled.p`
  color: var(--ink-800);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.5;
  margin: 0 0 var(--space-600) 0;
  max-width: 36rem;
  @media (max-width: 900px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const StyledVisual = styled.div`
  position: relative;
  min-height: 320px;
  min-width: 0;
  @media (max-width: 900px) {
    min-height: 260px;
    order: -1;
  }
`;

const StyledImageWrap = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: 0 0 0 0;
`;

type TruekindBraHeroSectionProps = {
  shopVariantId?: string;
};

export const TruekindBraHeroSection = ({ shopVariantId = DEFAULT_VARIANT }: TruekindBraHeroSectionProps) => {
  const { t } = useTranslation("truekindBra");
  const cta = TruekindBraShopPdp.withVariant(shopVariantId);
  return (
    <StyledSection aria-label={t("metaTitle")}>
      <StyledLayout>
        <StyledText>
          <StyledH1>{t("hero.title")}</StyledH1>
          <StyledLead>{t("hero.subtitle")}</StyledLead>
          <TruekindBraCtaLink href={cta}>{t("hero.cta")}</TruekindBraCtaLink>
        </StyledText>
        <StyledVisual>
          <StyledImageWrap>
            <Image
              src={TruekindBraCdn.hero}
              alt={t("hero.imageAlt")}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              priority
              unoptimized
            />
          </StyledImageWrap>
        </StyledVisual>
      </StyledLayout>
    </StyledSection>
  );
};
