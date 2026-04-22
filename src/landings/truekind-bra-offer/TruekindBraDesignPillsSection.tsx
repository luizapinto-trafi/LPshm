import styled from "styled-components";
import { useTranslation } from "next-i18next";
import { TruekindBraCtaLink } from "./TruekindBraCtaLink";
import { TruekindBraShopPdp } from "./truekindBraCdn";

const DEFAULT_VARIANT = "40278561292422";

const StyledSection = styled.section<{ $bg: string }>`
  background: ${({ $bg }) => $bg};
  padding: var(--space-1000) var(--space-400);
`;

const StyledInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const StyledH2 = styled.h2`
  color: var(--ink-900);
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 2.2vw, 1.75rem);
  font-weight: 600;
  margin: 0 0 var(--space-600) 0;
  line-height: 1.25;
  text-transform: none;
`;

const StyledList = styled.ul`
  list-style: none;
  margin: 0 auto var(--space-800);
  padding: 0;
  max-width: 28rem;
  text-align: left;
`;

const StyledLi = styled.li`
  color: var(--ink-800);
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.5;
  padding: var(--space-200) 0;
  padding-left: var(--space-500);
  position: relative;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.65em;
    width: 6px;
    height: 6px;
    border-radius: var(--radius-full);
    background: var(--coral-500);
  }
`;

const bulletKeys = [
  "designDifference.bullet0",
  "designDifference.bullet1",
  "designDifference.bullet2",
  "designDifference.bullet3",
] as const;

type TruekindBraDesignPillsSectionProps = {
  shopVariantId?: string;
  showBullets?: boolean;
  showCta?: boolean;
  backgroundToken?: "cream" | "white" | "rose" | "mint" | "sand";
};

const bg = {
  cream: "var(--coral-050)",
  white: "var(--white)",
  rose: "var(--coral-075)",
  mint: "var(--mint-100)",
  sand: "var(--ink-100)",
} as const;

export const TruekindBraDesignPillsSection = ({
  shopVariantId = DEFAULT_VARIANT,
  showBullets = true,
  showCta = true,
  backgroundToken = "rose",
}: TruekindBraDesignPillsSectionProps) => {
  const { t } = useTranslation("truekindBra");
  const href = TruekindBraShopPdp.withVariant(shopVariantId);
  return (
    <StyledSection $bg={bg[backgroundToken]}>
      <StyledInner>
        <StyledH2>{t("designDifference.title")}</StyledH2>
        {showBullets && (
          <StyledList>
            {bulletKeys.map((k) => (
              <StyledLi key={k}>{t(k)}</StyledLi>
            ))}
          </StyledList>
        )}
        {showCta && <TruekindBraCtaLink href={href}>{t("designDifference.shopNow")}</TruekindBraCtaLink>}
      </StyledInner>
    </StyledSection>
  );
};
