import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { handleKeyDown } from "@/shared/utils/KeyEvent";
import { LeggingsB2g3Cdn } from "./leggingsB2g3Cdn";

/**
 * Full shapermint.com header chrome (announcement sits above this).
 * Spacing matched to live PDP header (`styles_header__Q_XTl`): 80px tall,
 * container padding 0 2rem, logo 164px, nav link padding 32px 4px.
 * Copy is inline (not i18n) so HMR/locale cache can't show raw keys.
 */

const NAV = [
  { label: "Best Sellers", href: "https://shapermint.com/collections/best-sellers" },
  { label: "Shapewear", href: "https://shapermint.com/collections/shapewear", chevron: true },
  { label: "Bras", href: "https://shapermint.com/collections/bras", chevron: true },
  { label: "Camis & Tops", href: "https://shapermint.com/collections/camis-and-tops" },
  { label: "Underwear", href: "https://shapermint.com/collections/underwear", chevron: true },
  { label: "Bodysuits", href: "https://shapermint.com/collections/bodysuits" },
  { label: "Packs & Bundles", href: "https://shapermint.com/collections/packs-bundles" },
  { label: "Community", href: "https://shapermint.com/pages/community", chevron: true },
] as const;

/** Live desktop header stays until ~1024; below that mobile chrome. */
const NAV_DESKTOP = "1024px";

const StyledHeader = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  height: 80px;
  background: var(--white);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  @media (max-width: ${NAV_DESKTOP}) {
    height: 58px;
    box-shadow: 0 2px 6px #00000029;
  }
`;

const StyledInner = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  gap: 0;
  width: 100%;
  height: 100%;
  padding: 0 2rem;
  box-sizing: border-box;
  @media (max-width: 1450px) {
    padding: 0 1rem;
  }
  @media (max-width: ${NAV_DESKTOP}) {
    padding: 0 15px;
  }
`;

const StyledStart = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 0 1 15%;
  max-width: 16.5%;
  min-width: 0;
  z-index: 1;
  @media (max-width: ${NAV_DESKTOP}) {
    flex: 0 0 auto;
    max-width: none;
  }
`;

const StyledLogoLink = styled.a`
  display: block;
  line-height: 0;
  max-width: 100%;
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
    border-radius: var(--radius-md);
  }
`;

const StyledDesktopNav = styled.nav`
  display: none;
  @media (min-width: ${NAV_DESKTOP}) {
    display: flex;
    flex: 1 1 66.666%;
    max-width: 66.666%;
    align-items: center;
    justify-content: center;
    gap: 10px;
    min-width: 0;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  @media (min-width: 1280px) and (max-width: 1370px) {
    justify-content: flex-start;
    gap: 3px;
  }
  @media (min-width: 1370px) and (max-width: 1500px) {
    gap: 5px;
  }
  @media (min-width: 1500px) {
    gap: 12px;
  }
`;

const StyledNavLink = styled.a<{ $promo?: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: ${({ $promo }) => ($promo ? "8px 14px" : "32px 4px")};
  color: ${({ $promo }) => ($promo ? "var(--white)" : "#1b1b1b")};
  background: ${({ $promo }) => ($promo ? "#1b1b1b" : "transparent")};
  border-radius: ${({ $promo }) => ($promo ? "4px" : "0")};
  font-family: var(--font-body);
  font-size: ${({ $promo }) => ($promo ? "12px" : "14px")};
  font-weight: ${({ $promo }) => ($promo ? 600 : 400)};
  letter-spacing: ${({ $promo }) => ($promo ? "0.04em" : "normal")};
  line-height: 1.2;
  text-decoration: none;
  text-transform: ${({ $promo }) => ($promo ? "uppercase" : "none")};
  white-space: nowrap;
  box-sizing: border-box;
  &:hover {
    color: ${({ $promo }) => ($promo ? "var(--white)" : "var(--coral-300)")};
    background: ${({ $promo }) => ($promo ? "#000" : "transparent")};
  }
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
    border-radius: var(--radius-md);
  }
  @media (max-width: 1200px) {
    font-size: ${({ $promo }) => ($promo ? "12px" : "12px")};
  }
`;

const StyledChevron = styled.span`
  display: inline-flex;
  font-size: 9px;
  line-height: 1;
  opacity: 0.85;
  margin-left: 4px;
`;

const StyledActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 0 1 16.5%;
  max-width: 18.8%;
  min-width: 0;
  z-index: 1;
  color: var(--ink-900);
  gap: 0;
  @media (max-width: ${NAV_DESKTOP}) {
    flex: 0 0 auto;
    max-width: none;
    gap: 16px;
  }
`;

const StyledLocale = styled.a`
  display: none;
  @media (min-width: ${NAV_DESKTOP}) {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px;
    color: var(--ink-900);
    text-decoration: none;
    font-size: 13px;
    font-weight: 600;
  }
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
    border-radius: var(--radius-md);
  }
`;

const StyledLocaleSep = styled.span`
  color: #cfcfcf;
  font-weight: 400;
`;

const StyledIconLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  text-decoration: none;
  line-height: 0;
  padding: 5px;
  box-sizing: border-box;
  svg {
    width: 20px;
    height: 20px;
  }
  @media (max-width: 1040px) {
    svg {
      width: 18px;
      height: 18px;
    }
  }
  @media (max-width: ${NAV_DESKTOP}) {
    padding: 0;
    svg {
      width: 24px;
      height: 24px;
    }
  }
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
    border-radius: var(--radius-md);
  }
`;

const StyledCartHost = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const StyledCartBadge = styled.span`
  position: absolute;
  top: -7px;
  right: -7px;
  width: 15px;
  height: 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--coral-300);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  line-height: 16px;
  text-align: center;
`;

const StyledHamb = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--ink-900);
  cursor: pointer;
  @media (max-width: ${NAV_DESKTOP}) {
    display: inline-flex;
  }
  svg {
    width: 22px;
    height: 22px;
  }
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
    border-radius: var(--radius-md);
  }
`;

const StyledMobilePanel = styled.nav<{ $open?: boolean }>`
  display: ${({ $open }) => ($open ? "flex" : "none")};
  flex-direction: column;
  gap: 0;
  padding: 0;
  border-top: 1px solid #e8e8e8;
  background: var(--white);
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 20;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  @media (min-width: ${NAV_DESKTOP}) {
    display: none;
  }
  a {
    padding: 20px 16px;
    border-bottom: 1px solid #efefef;
  }
`;

const FLAG_US =
  "https://cdn.shopify.com/s/files/1/0021/4889/2732/files/united-states.png";

export const LeggingsB2g3SiteHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <StyledHeader>
      <StyledInner>
        <StyledStart>
          <StyledHamb
            type="button"
            aria-label="Menu"
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
          <StyledLogoLink href="https://shapermint.com" aria-label="Shapermint home">
            <Image
              src={LeggingsB2g3Cdn.logo}
              alt="Shapermint"
              width={164}
              height={35}
              priority
              unoptimized
              style={{ width: 164, height: "auto", maxWidth: "100%" }}
            />
          </StyledLogoLink>
        </StyledStart>

        <StyledDesktopNav aria-label="Primary">
          {NAV.map((item) => (
            <StyledNavLink key={item.label} href={item.href} $promo={"promo" in item && Boolean(item.promo)}>
              {item.label}
              {"chevron" in item && item.chevron ? <StyledChevron aria-hidden>▾</StyledChevron> : null}
            </StyledNavLink>
          ))}
        </StyledDesktopNav>

        <StyledActions>
          <StyledLocale href="https://shapermint.com" aria-label="Country and currency">
            <Image src={FLAG_US} alt="" width={18} height={18} unoptimized style={{ borderRadius: "50%" }} />
            <StyledLocaleSep aria-hidden>|</StyledLocaleSep>
            <span>USD</span>
          </StyledLocale>
          <StyledIconLink href="https://shapermint.com/search" aria-label="Search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.5" y2="16.5" />
            </svg>
          </StyledIconLink>
          <StyledIconLink href="https://shapermint.com/account" aria-label="Account">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5 20c0-3.5 3.2-6 7-6s7 2.5 7 6" />
            </svg>
          </StyledIconLink>
          <StyledIconLink href="https://shapermint.com/pages/contact-us" aria-label="Help">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <circle cx="12" cy="12" r="9" />
              <path d="M9.5 9.2a2.6 2.6 0 1 1 3.7 2.4c-.7.4-1.2.9-1.2 1.7" />
              <circle cx="12" cy="16.5" r="0.8" fill="currentColor" stroke="none" />
            </svg>
          </StyledIconLink>
          <StyledIconLink href="https://shapermint.com/cart" aria-label="Cart">
            <StyledCartHost>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M8 7V6a4 4 0 0 1 8 0v1" />
                <rect x="4.5" y="7" width="15" height="13" rx="1.5" />
              </svg>
              <StyledCartBadge aria-hidden>4</StyledCartBadge>
            </StyledCartHost>
          </StyledIconLink>
        </StyledActions>
      </StyledInner>

      <StyledMobilePanel aria-label="Menu" $open={menuOpen}>
        {NAV.map((item) => (
          <StyledNavLink
            key={item.label}
            href={item.href}
            $promo={"promo" in item && Boolean(item.promo)}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </StyledNavLink>
        ))}
      </StyledMobilePanel>
    </StyledHeader>
  );
};
