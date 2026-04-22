import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import { TruekindBraCtaLink } from "./TruekindBraCtaLink";
import { TruekindBraCdn, TruekindBraShopPdp } from "./truekindBraCdn";

const DEFAULT_VARIANT = "40278561292422";

const StyledSection = styled.section`
  background: var(--white);
  padding: var(--space-1000) var(--space-400) var(--space-1200);
`;

const StyledInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const StyledH2 = styled.h2`
  color: var(--ink-900);
  text-align: center;
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 2.2vw, 1.75rem);
  font-weight: 600;
  line-height: 1.25;
  max-width: 32rem;
  margin: 0 auto var(--space-1000);
  text-transform: none;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-800);
  margin-bottom: var(--space-1000);
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const StyledCard = styled.div`
  text-align: center;
`;

const StyledFigure = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1/1.05;
  margin: 0 auto var(--space-500);
  max-width: 280px;
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: var(--ink-050);
`;

const StyledH3 = styled.h3`
  color: var(--ink-1000);
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin: 0 0 var(--space-200) 0;
`;

const StyledBody = styled.p`
  color: var(--ink-700);
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 1.55;
  margin: 0 0 var(--space-500) 0;
`;

const StyledCtaRow = styled.div`
  text-align: center;
`;

const StyledIcon = styled.div`
  margin: 0 auto var(--space-300);
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  & img {
    object-fit: contain;
  }
`;

const items = [1, 2, 3] as const;

const titleKeys = {
  1: "engineered.feature1Title" as const,
  2: "engineered.feature2Title" as const,
  3: "engineered.feature3Title" as const,
} as const;

const bodyKeys = {
  1: "engineered.feature1Body" as const,
  2: "engineered.feature2Body" as const,
  3: "engineered.feature3Body" as const,
} as const;

const asset = [
  { img: TruekindBraCdn.feature1, alt: "engineered.feature1AssetAlt" },
  { img: TruekindBraCdn.feature2, alt: "engineered.feature2AssetAlt" },
  { img: TruekindBraCdn.feature3, alt: "engineered.feature3AssetAlt" },
] as const;

const icons = [TruekindBraCdn.feature1icon, TruekindBraCdn.feature2icon, TruekindBraCdn.feature3icon] as const;
const iconAlts = ["engineered.feature1IconAlt", "engineered.feature2IconAlt", "engineered.feature3IconAlt"] as const;

type TruekindBraEngineeredSectionProps = { shopVariantId?: string };

export const TruekindBraEngineeredSection = ({ shopVariantId = DEFAULT_VARIANT }: TruekindBraEngineeredSectionProps) => {
  const { t } = useTranslation("truekindBra");
  const cta = TruekindBraShopPdp.withVariant(shopVariantId);
  return (
    <StyledSection>
      <StyledInner>
        <StyledH2>{t("engineered.title")}</StyledH2>
        <StyledGrid>
          {items.map((i) => {
            const idx = i - 1;
            return (
              <StyledCard key={i}>
                <StyledFigure>
                  <Image src={asset[idx].img} alt={t(asset[idx].alt)} width={400} height={400} unoptimized style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                </StyledFigure>
                <StyledIcon>
                  <Image src={icons[idx]} alt={t(iconAlts[idx])} width={72} height={64} unoptimized />
                </StyledIcon>
                <StyledH3>{t(titleKeys[i])}</StyledH3>
                <StyledBody>{t(bodyKeys[i])}</StyledBody>
              </StyledCard>
            );
          })}
        </StyledGrid>
        <StyledCtaRow>
          <TruekindBraCtaLink href={cta}>{t("engineered.shopNow")}</TruekindBraCtaLink>
        </StyledCtaRow>
      </StyledInner>
    </StyledSection>
  );
};
