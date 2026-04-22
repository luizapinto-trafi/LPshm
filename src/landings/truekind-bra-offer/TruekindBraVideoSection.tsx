import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import { TruekindBraCtaLink } from "./TruekindBraCtaLink";
import { TruekindBraCdn, TruekindBraShopPdp } from "./truekindBraCdn";

const DEFAULT_VARIANT = "40278561292422";

const StyledSection = styled.section`
  position: relative;
  background: var(--mint-100);
  padding: var(--space-1200) var(--space-400);
  overflow: hidden;
`;

const StyledInner = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const StyledH2 = styled.h2`
  color: var(--ink-900);
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 2vw, 1.6rem);
  font-weight: 600;
  margin: 0 0 var(--space-800) 0;
  line-height: 1.3;
  text-transform: none;
`;

const StyledMedia = styled.div`
  position: relative;
  width: 100%;
  min-height: 200px;
  max-width: 720px;
  margin: 0 auto var(--space-800);
  border-radius: var(--radius-xl);
  overflow: hidden;
  aspect-ratio: 16/9;
  background: var(--ink-200);
`;

const StyledQuote = styled.p`
  color: var(--ink-800);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.55;
  font-style: italic;
  margin: 0 0 var(--space-500) 0;
`;

const StyledAttribution = styled.p`
  color: var(--ink-900);
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 var(--space-300) 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-200);
  flex-wrap: wrap;
`;

type TruekindBraVideoSectionProps = { shopVariantId?: string };

export const TruekindBraVideoSection = ({ shopVariantId = DEFAULT_VARIANT }: TruekindBraVideoSectionProps) => {
  const { t } = useTranslation("truekindBra");
  const href = TruekindBraShopPdp.withVariant(shopVariantId);
  return (
    <StyledSection>
      <StyledInner>
        <StyledH2>{t("bestSeller.title")}</StyledH2>
        <StyledMedia>
          <Image
            src={TruekindBraCdn.videoBg}
            alt={t("bestSeller.imageAlt")}
            fill
            sizes="(max-width: 800px) 100vw, 720px"
            unoptimized
            priority={false}
          />
        </StyledMedia>
        <StyledQuote>“{t("bestSeller.quote")}”</StyledQuote>
        <StyledAttribution>
          {t("bestSeller.author")}
          <Image
            src={TruekindBraCdn.verifiedBuyer}
            alt={t("bestSeller.verifiedAlt")}
            width={20}
            height={20}
            unoptimized
          />
        </StyledAttribution>
        <TruekindBraCtaLink href={href}>{t("bestSeller.cta")}</TruekindBraCtaLink>
      </StyledInner>
    </StyledSection>
  );
};
