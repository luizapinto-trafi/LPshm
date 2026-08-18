import Image from "next/image";
import styled from "styled-components";
import { useState } from "react";
import { useTranslation } from "next-i18next/pages";
import { SweetheartCdn } from "./sweetheartCamiCdn";
import { handleKeyDown } from "@/shared/utils/KeyEvent";

/**
 * Desktop: logo | nav | acciones.
 * Móvil (Figma: Navigation / Mobile / Main Menu, 2350:3183):
 * barra 48px, padding 12px 15px, hamb 24 + gap 16 + logo 140×24 a la izquierda;
 * búsqueda, cuenta (badge #2f806a), bolsa 24 a la derecha, gap 16.
 */
const StyledHeader = styled.header`
  background: var(--white);
  box-shadow: var(--shadow-sm);
`;

const StyledInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-300);
  padding: 24px 16px;
  @media (max-width: 1023px) {
    min-height: 48px;
    padding: 12px 16px;
    box-sizing: border-box;
    gap: 0;
  }
`;

/* Hamburger + logo juntos a la izquierda en móvil (evita “logo” centrado con space-between) */
const StyledStart = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  @media (max-width: 1023px) {
    gap: 16px;
  }
  @media (min-width: 1024px) {
    gap: 0;
  }
`;

const StyledLogoLink = styled.a`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  line-height: 0;
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }
`;

const StyledLogo = styled(Image)`
  width: 140px;
  height: auto;
  @media (max-width: 1023px) {
    max-height: 24px;
    width: 140px;
    object-fit: contain;
  }
  @media (min-width: 1024px) {
    max-height: 32px;
  }
`;

const StyledDesktopMenu = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
  gap: 14px;
  list-style: none;
  margin: 0;
  padding: 0;
  min-width: 0;
  @media (max-width: 1023px) {
    display: none;
  }
`;

const StyledMenuLink = styled.a<{ $sale?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  color: ${({ $sale }) => ($sale ? "var(--sale)" : "var(--ink-900)")};
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  font-family: var(--font-body);
  white-space: nowrap;
  &:hover {
    color: ${({ $sale }) => ($sale ? "var(--coral-700)" : "var(--coral-500)")};
  }
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }
`;

const StyledCaret = styled.svg`
  width: 10px;
  height: 10px;
  flex: 0 0 auto;
`;

const StyledActions = styled.div`
  display: flex;
  align-items: center;
  color: var(--ink-900);
  flex-shrink: 0;
  & svg {
    width: 24px;
    height: 24px;
  }
  @media (max-width: 1023px) {
    gap: 16px;
  }
  @media (min-width: 1024px) {
    gap: 18px;
  }
`;

const StyledIconLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  color: inherit;
  text-decoration: none;
  @media (max-width: 1023px) {
    width: 24px;
    height: 24px;
  }
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }
`;

const UserIconHost = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

const StyledAccountBadge = styled.span`
  display: none;
  @media (max-width: 1023px) {
    display: flex;
    position: absolute;
    right: -2px;
    bottom: -5px;
    min-width: 13px;
    height: 13px;
    padding: 0 3px;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background: #2f806a;
    color: var(--white);
    font-family: var(--font-body);
    font-size: 10px;
    font-weight: 700;
    line-height: 12px;
    letter-spacing: 0;
  }
`;

const StyledHamb = styled.button`
  display: none;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: var(--ink-900);
  border: none;
  @media (max-width: 1023px) {
    display: inline-flex;
    width: 24px;
    height: 24px;
    padding: 0;
  }
  @media (min-width: 1024px) {
    display: none;
  }
  & svg {
    width: 24px;
    height: 24px;
  }
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }
`;

const StyledMobilePanel = styled.nav<{ $open: boolean }>`
  display: none;
  @media (max-width: 1023px) {
    display: ${({ $open }) => ($open ? "flex" : "none")};
    flex-direction: column;
    gap: var(--space-300);
    padding: var(--space-400) 16px var(--space-500);
    border-top: 1px solid var(--ink-200);
    background: var(--white);
  }
`;

const StyledLocale = styled.span`
  display: none;
  @media (min-width: 1024px) {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-right: 4px;
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 600;
    color: var(--ink-900);
    white-space: nowrap;
  }
`;

const StyledFlag = styled.span`
  font-size: 16px;
  line-height: 1;
`;

const StyledLocaleDivider = styled.span`
  color: var(--ink-400);
`;

const StyledCartHost = styled.span`
  position: relative;
  display: inline-flex;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
`;

const StyledCartBadge = styled.span`
  position: absolute;
  top: -4px;
  right: -6px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background: var(--sale);
  color: var(--white);
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 700;
  line-height: 1;
`;

const StyledBreadcrumb = styled.nav`
  background: var(--white);
  border-top: 1px solid var(--ink-200);
  padding: 24px 16px;
  font-family: var(--font-body);
  font-size: 13px;
  line-height: 1.4;
  color: var(--ink-700);
`;

const StyledCrumbLink = styled.a`
  color: var(--ink-700);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }
`;

const StyledCrumbCurrent = styled.span`
  color: var(--ink-900);
  font-weight: 700;
`;

const NAV = [
  { key: "nav0" },
  { key: "nav1", hasMenu: true },
  { key: "nav2", hasMenu: true },
  { key: "nav3" },
  { key: "nav4", hasMenu: true },
  { key: "nav5" },
  { key: "nav6" },
  { key: "nav7", hasMenu: true },
  { key: "nav8", sale: true },
] as const;

const Caret = () => (
  <StyledCaret viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </StyledCaret>
);

export const SweetheartSiteHeader = () => {
  const { t } = useTranslation("sweetheartCami");
  const [menuOpen, setMenuOpen] = useState(false);
  const badge = t("header.accountNotificationCount");
  const cartCount = t("header.cartCount");

  return (
    <StyledHeader>
      <StyledInner>
        <StyledStart>
          <StyledHamb
            type="button"
            aria-label={t("header.menuToggle")}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            onKeyDown={(e) => handleKeyDown(e, () => setMenuOpen((o) => !o), ["Enter", " "])}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </StyledHamb>
          <StyledLogoLink href="https://shapermint.com" aria-label={t("header.logoAria")}>
            <StyledLogo
              src={SweetheartCdn.logo}
              alt=""
              width={140}
              height={32}
              priority
              unoptimized
            />
          </StyledLogoLink>
        </StyledStart>
        <StyledDesktopMenu>
          {NAV.map((item) => (
            <li key={item.key}>
              <StyledMenuLink href="https://shapermint.com" $sale={"sale" in item && item.sale}>
                {t(`header.${item.key}`)}
                {"hasMenu" in item && item.hasMenu ? <Caret /> : null}
              </StyledMenuLink>
            </li>
          ))}
        </StyledDesktopMenu>
        <StyledActions>
          <StyledLocale>
            <StyledFlag aria-hidden>🇺🇸</StyledFlag>
            <StyledLocaleDivider aria-hidden>|</StyledLocaleDivider>
            {t("header.locale")}
          </StyledLocale>
          <StyledIconLink
            href="https://shapermint.com"
            aria-label={t("header.search")}
            data-testid="header-search"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.5" y2="16.5" />
            </svg>
          </StyledIconLink>
          <StyledIconLink
            href="https://shapermint.com/account"
            aria-label={t("header.account")}
            data-testid="header-account"
          >
            <UserIconHost>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
              </svg>
              {badge && <StyledAccountBadge aria-hidden="true">{badge}</StyledAccountBadge>}
            </UserIconHost>
          </StyledIconLink>
          <StyledIconLink
            href="https://help.shapermint.com/hc/en-us"
            aria-label={t("header.help")}
            data-testid="header-help"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <circle cx="12" cy="12" r="9" />
              <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1.2.8-1.2 1.7" strokeLinecap="round" />
              <circle cx="12" cy="17" r="0.8" fill="currentColor" stroke="none" />
            </svg>
          </StyledIconLink>
          <StyledIconLink
            href="https://shapermint.com/cart"
            aria-label={t("header.cart")}
            data-testid="header-cart"
          >
            <StyledCartHost>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M6 7V6a6 6 0 1 1 12 0v1" />
                <rect x="4" y="7" width="16" height="14" rx="1.5" />
              </svg>
              <StyledCartBadge aria-hidden>{cartCount}</StyledCartBadge>
            </StyledCartHost>
          </StyledIconLink>
        </StyledActions>
      </StyledInner>
      <StyledMobilePanel aria-label={t("header.mobileNavAria")} $open={menuOpen}>
        {NAV.map((item) => (
          <StyledMenuLink
            key={item.key}
            href="https://shapermint.com"
            $sale={"sale" in item && item.sale}
            onClick={() => setMenuOpen(false)}
          >
            {t(`header.${item.key}`)}
            {"hasMenu" in item && item.hasMenu ? <Caret /> : null}
          </StyledMenuLink>
        ))}
      </StyledMobilePanel>
    </StyledHeader>
  );
};

export const SweetheartBreadcrumb = () => {
  const { t } = useTranslation("sweetheartCami");
  return (
    <StyledBreadcrumb aria-label="Breadcrumb">
      <StyledCrumbLink href="https://shapermint.com">{t("header.crumbHome")}</StyledCrumbLink>
      {" > "}
      <StyledCrumbLink href="https://shapermint.com">{t("header.crumbCategory")}</StyledCrumbLink>
      {" > "}
      <StyledCrumbCurrent>{t("header.crumbCurrent")}</StyledCrumbCurrent>
    </StyledBreadcrumb>
  );
};
