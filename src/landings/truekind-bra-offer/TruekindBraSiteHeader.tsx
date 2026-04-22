import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import { TruekindBraCdn } from "./truekindBraCdn";

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  width: 100%;
  background: var(--white);
  border-bottom: 1px solid var(--ink-200);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
`;

const StyledInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-300) var(--space-400);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-400);
  flex-wrap: wrap;
`;

const StyledNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--space-200) var(--space-500);
  flex: 1;
`;

const StyledLink = styled.a`
  color: var(--ink-900);
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 500;
  text-transform: none;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  &:hover {
    color: var(--coral-500);
  }
`;

const StyledEnd = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-200);
`;

export const TruekindBraSiteHeader = () => {
  const { t } = useTranslation("truekindBra");
  return (
    <StyledHeader>
      <StyledInner>
        <a href="https://shapermint.com/" target="_blank" rel="noopener noreferrer" aria-label={t("nav.logoHomeAria")}>
          <Image src={TruekindBraCdn.logo} alt="" width={160} height={32} unoptimized style={{ display: "block" }} />
        </a>
        <StyledNav aria-label="Primary">
          <StyledLink href="https://shapermint.com/collections/best-sellers" target="_blank" rel="noopener noreferrer">
            {t("header.bestSellers")}
          </StyledLink>
          <StyledLink href="https://shapermint.com/collections/shapewear" target="_blank" rel="noopener noreferrer">
            {t("header.shapewear")}{" "}
            <Image src={TruekindBraCdn.chevron} alt="" width={10} height={10} unoptimized />
          </StyledLink>
          <StyledLink href="https://shapermint.com/collections/bras" target="_blank" rel="noopener noreferrer">
            {t("header.bras")}{" "}
            <Image src={TruekindBraCdn.chevron} alt="" width={10} height={10} unoptimized />
          </StyledLink>
          <StyledLink href="https://shapermint.com/collections/mothers-day-sale" target="_blank" rel="noopener noreferrer">
            {t("header.mothersDaySale")}
          </StyledLink>
        </StyledNav>
        <StyledEnd>
          <a
            href="https://shapermint.com/cart"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("a11y.cart")}
          >
            <Image src={TruekindBraCdn.bag} alt="" width={24} height={24} unoptimized />
          </a>
        </StyledEnd>
      </StyledInner>
    </StyledHeader>
  );
};
