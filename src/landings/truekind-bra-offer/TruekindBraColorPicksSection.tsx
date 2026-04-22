import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import { TruekindBraCtaLink } from "./TruekindBraCtaLink";
import { TruekindBraCdn, TruekindBraShopPdp } from "./truekindBraCdn";

const DEFAULT_VARIANT = "40278561292422";

const StyledSection = styled.section`
  background: var(--coral-050);
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
  font-size: clamp(1.4rem, 2vw, 1.5rem);
  font-weight: 600;
  margin: 0 0 var(--space-800) 0;
  text-transform: none;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-600);
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const StyledCard = styled.div`
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: var(--space-600);
  display: flex;
  flex-direction: column;
  gap: var(--space-400);
  height: 100%;
  box-sizing: border-box;
  box-shadow: 0 0 0 1px var(--ink-200);
`;

const StyledQuote = styled.p`
  color: var(--ink-800);
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 1.55;
  font-style: italic;
  margin: 0;
  flex: 1;
`;

const StyledName = styled.p`
  color: var(--ink-1000);
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 600;
  margin: 0;
`;

const variants = [
  { body: "colorPick.white.body" as const, cta: "colorPick.white.cta" as const, name: "colorPick.white.name" as const },
  { body: "colorPick.black.body" as const, cta: "colorPick.black.cta" as const, name: "colorPick.black.name" as const },
  { body: "colorPick.chai.body" as const, cta: "colorPick.chai.cta" as const, name: "colorPick.chai.name" as const },
] as const;

type TruekindBraColorPicksSectionProps = { shopVariantId?: string };

export const TruekindBraColorPicksSection = ({ shopVariantId = DEFAULT_VARIANT }: TruekindBraColorPicksSectionProps) => {
  const { t } = useTranslation("truekindBra");
  const productHref = TruekindBraShopPdp.withVariant(shopVariantId);
  return (
    <StyledSection>
      <StyledInner>
        <StyledH2>{t("colorPick.title")}</StyledH2>
        <StyledGrid>
          {variants.map((v) => (
            <StyledCard key={v.name}>
              <div style={{ position: "relative", maxWidth: "100%" }}>
                <Image
                  src={TruekindBraCdn.productBlack}
                  alt={t("product.colorSwatchBlackAlt")}
                  width={400}
                  height={500}
                  unoptimized
                  style={{ width: "100%", height: "auto", borderRadius: "var(--radius-md)" }}
                />
              </div>
              <StyledName>{t(v.name)}</StyledName>
              <StyledQuote>“{t(v.body)}”</StyledQuote>
              <TruekindBraCtaLink href={productHref}>{t(v.cta)}</TruekindBraCtaLink>
            </StyledCard>
          ))}
        </StyledGrid>
        <div style={{ marginTop: "var(--space-800)", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "var(--space-300)" }}>
          <Image src={TruekindBraCdn.mothersDaySeal} alt={t("product.mothersDayAlt")} width={100} height={32} unoptimized />
          <Image src={TruekindBraCdn.sellingFastSeal} alt={t("product.sellingFastAlt")} width={100} height={32} unoptimized />
        </div>
      </StyledInner>
    </StyledSection>
  );
};
