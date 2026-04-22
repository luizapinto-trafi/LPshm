import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { TruekindBraCdn } from "./truekindBraCdn";

const HEADER_BAR_HEIGHT_PX = 81;

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  width: 100%;
  background: var(--white);
  border-bottom: 1px solid var(--ink-200);
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.04);
`;

/**
 * Tres franjas como en Figma: [logo] | [nav centrado] | [bolsa].
 * `1fr + auto + 1fr` sitúa el menú en el eje visual central de la barra.
 */
const StyledInner = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(0, auto) 1fr;
  align-items: center;
  min-height: ${HEADER_BAR_HEIGHT_PX}px;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 var(--space-1000);
  box-sizing: border-box;
  column-gap: var(--space-500);
  @media (max-width: 1100px) {
    padding: 0 var(--space-600);
  }
  @media (max-width: 800px) {
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
    min-height: 0;
    row-gap: var(--space-400);
    padding: var(--space-300) var(--space-400) var(--space-500);
    column-gap: var(--space-400);
  }
`;

const StyledColLeft = styled.div`
  justify-self: start;
  display: flex;
  align-items: center;
  min-width: 0;
  @media (max-width: 800px) {
    grid-column: 1;
    grid-row: 1;
  }
`;

const StyledColCenter = styled.div`
  justify-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  @media (max-width: 800px) {
    grid-column: 1 / -1;
    grid-row: 2;
    width: 100%;
  }
`;

const StyledColRight = styled.div`
  justify-self: end;
  display: flex;
  align-items: center;
  @media (max-width: 800px) {
    grid-column: 2;
    grid-row: 1;
  }
`;

const StyledLogoLink = styled.a`
  display: block;
  line-height: 0;
  flex: 0 0 auto;
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }
`;

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  column-gap: var(--space-600);
  row-gap: var(--space-200);
`;

const StyledLink = styled.a<{ $promo?: boolean }>`
  color: var(--ink-1000);
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: ${({ $promo }) => ($promo ? 600 : 500)};
  line-height: 1.25;
  letter-spacing: 0.04em;
  text-transform: none;
  text-decoration: none;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  -webkit-tap-highlight-color: transparent;
  transition: color 0.12s ease;

  &:hover {
    color: var(--coral-500);
  }
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }
`;

const StyledChevron = styled.span`
  display: inline-flex;
  align-items: center;
  line-height: 0;
  flex: 0 0 auto;
  opacity: 0.9;
`;

const StyledCartLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  min-height: 32px;
  line-height: 0;
  &:hover {
    opacity: 0.8;
  }
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }
`;

export const TruekindBraSiteHeader = () => {
  const { t } = useTranslation("truekindBra");
  return (
    <StyledHeader>
      <StyledInner>
        <StyledColLeft>
          <StyledLogoLink
            href="https://shapermint.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("nav.logoHomeAria")}
          >
            <Image
              src={TruekindBraCdn.logo}
              alt=""
              width={160}
              height={32}
              unoptimized
              style={{ display: "block", width: "auto", height: 32, maxWidth: 160 }}
              priority
            />
          </StyledLogoLink>
        </StyledColLeft>
        <StyledColCenter>
          <StyledNav aria-label="Primary">
            <StyledLink href="https://shapermint.com/collections/best-sellers" target="_blank" rel="noopener noreferrer">
              {t("header.bestSellers")}
            </StyledLink>
            <StyledLink href="https://shapermint.com/collections/shapewear" target="_blank" rel="noopener noreferrer">
              {t("header.shapewear")}
              <StyledChevron aria-hidden>
                <Image src={TruekindBraCdn.chevron} alt="" width={10} height={10} unoptimized />
              </StyledChevron>
            </StyledLink>
            <StyledLink href="https://shapermint.com/collections/bras" target="_blank" rel="noopener noreferrer">
              {t("header.bras")}
              <StyledChevron aria-hidden>
                <Image src={TruekindBraCdn.chevron} alt="" width={10} height={10} unoptimized />
              </StyledChevron>
            </StyledLink>
            <StyledLink
              $promo
              href="https://shapermint.com/collections/mothers-day-sale"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("header.mothersDaySale")}
            </StyledLink>
          </StyledNav>
        </StyledColCenter>
        <StyledColRight>
          <StyledCartLink href="https://shapermint.com/cart" target="_blank" rel="noopener noreferrer" aria-label={t("a11y.cart")}>
            <Image src={TruekindBraCdn.bag} alt="" width={24} height={24} unoptimized style={{ display: "block" }} />
          </StyledCartLink>
        </StyledColRight>
      </StyledInner>
    </StyledHeader>
  );
};
