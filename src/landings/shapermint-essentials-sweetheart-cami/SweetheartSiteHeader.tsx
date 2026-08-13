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
  padding: 18px 26px;
  @media (max-width: 1023px) {
    min-height: 48px;
    padding: 12px 15px;
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
  gap: 16px;
  list-style: none;
  margin: 0;
  padding: 0;
  @media (max-width: 1023px) {
    display: none;
  }
`;

const StyledMenuLink = styled.a`
  color: var(--ink-900);
  text-decoration: none;
  font-size: 14px;
  font-family: var(--font-display);
  &:hover {
    color: var(--coral-500);
  }
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }
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

const navKeys = ["nav0", "nav1", "nav2", "nav3", "nav4", "nav5", "nav6", "nav7"] as const;

export const SweetheartSiteHeader = () => {
  const { t } = useTranslation("sweetheartCami");
  const [menuOpen, setMenuOpen] = useState(false);
  const badge = t("header.accountNotificationCount");

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
          {navKeys.map((k) => (
            <li key={k}>
              <StyledMenuLink href="https://shapermint.com">{t(`header.${k}`)}</StyledMenuLink>
            </li>
          ))}
        </StyledDesktopMenu>
        <StyledActions>
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
            href="https://shapermint.com/cart"
            aria-label={t("header.cart")}
            data-testid="header-cart"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M6 7V6a6 6 0 1 1 12 0v1" />
              <rect x="4" y="7" width="16" height="14" rx="1.5" />
            </svg>
          </StyledIconLink>
        </StyledActions>
      </StyledInner>
      <StyledMobilePanel aria-label={t("header.mobileNavAria")} $open={menuOpen}>
        {navKeys.map((k) => (
          <StyledMenuLink key={k} href="https://shapermint.com" onClick={() => setMenuOpen(false)}>
            {t(`header.${k}`)}
          </StyledMenuLink>
        ))}
      </StyledMobilePanel>
    </StyledHeader>
  );
};
