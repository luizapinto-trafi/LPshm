import Image from "next/image";
import styled from "styled-components";
import { useState } from "react";
import { useTranslation } from "next-i18next/pages";
import { StraplessCdn } from "./straplessCdn";
import { handleKeyDown } from "@/shared/utils/KeyEvent";

const StyledHeader = styled.header`
  background: var(--white);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 50;
`;

const StyledInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-600);
  padding: 18px clamp(16px, 4vw, 60px);
  @media (max-width: 1023px) {
    padding: 14px 16px;
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

const StyledDesktopMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 28px;
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

const StyledIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  color: var(--ink-900);
  svg {
    width: 22px;
    height: 22px;
  }
`;

const StyledHamb = styled.button`
  display: none;
  background: transparent;
  padding: var(--space-200);
  color: var(--ink-900);
  @media (max-width: 1023px) {
    display: inline-flex;
  }
  svg {
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

export const StraplessSiteHeader = () => {
  const { t } = useTranslation("strapless");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <StyledHeader>
      <StyledInner>
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
          <Image src={StraplessCdn.logo} alt="" width={140} height={32} priority unoptimized />
        </StyledLogoLink>
        <StyledDesktopMenu>
          {navKeys.map((k) => (
            <li key={k}>
              <StyledMenuLink href="https://shapermint.com">{t(`header.${k}`)}</StyledMenuLink>
            </li>
          ))}
        </StyledDesktopMenu>
        <StyledIcons aria-hidden>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.5" y2="16.5" />
          </svg>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
          </svg>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 7V6a6 6 0 1 1 12 0v1" />
            <rect x="4" y="7" width="16" height="14" rx="1.5" />
          </svg>
        </StyledIcons>
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
