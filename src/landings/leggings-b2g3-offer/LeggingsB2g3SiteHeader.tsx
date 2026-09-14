import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { handleKeyDown } from "@/shared/utils/KeyEvent";
import { LeggingsB2g3Cdn } from "./leggingsB2g3Cdn";

/**
 * Full shapermint.com header chrome (announcement sits above this).
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
  {
    label: "Warehouse Clearance",
    href: "https://shapermint.com/collections/warehouse-sale",
    promo: true,
  },
] as const;

const StyledHeader = styled.header`
  background: var(--white);
  border-bottom: 1px solid #e8e8e8;
`;

/** Full desktop nav needs ~9 labels — keep compact chrome until wide enough. */
const NAV_DESKTOP = "1320px";

const StyledInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 24px;
  box-sizing: border-box;
  max-width: 1440px;
  margin: 0 auto;
  @media (max-width: ${NAV_DESKTOP}) {
    padding: 12px 16px;
  }
`;

const StyledStart = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  z-index: 1;
`;

const StyledLogoLink = styled.a`
  display: inline-flex;
  line-height: 0;
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
    flex: 1 1 auto;
    align-items: center;
    justify-content: center;
    gap: 12px;
    min-width: 0;
    overflow: hidden;
  }
`;

const StyledNavLink = styled.a<{ $promo?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: ${({ $promo }) => ($promo ? "var(--coral-500)" : "var(--ink-900)")};
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: ${({ $promo }) => ($promo ? 600 : 500)};
  line-height: 1.2;
  text-decoration: none;
  white-space: nowrap;
  &:hover {
    color: var(--coral-500);
  }
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
    border-radius: var(--radius-md);
  }
`;

const StyledChevron = styled.span`
  display: inline-flex;
  font-size: 9px;
  line-height: 1;
  opacity: 0.85;
`;

const StyledActions = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;
  z-index: 1;
  color: var(--ink-900);
  svg {
    width: 22px;
    height: 22px;
  }
`;

const StyledLocale = styled.a`
  display: none;
  @media (min-width: ${NAV_DESKTOP}) {
    display: inline-flex;
    align-items: center;
    gap: 6px;
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
  width: 24px;
  height: 24px;
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
    border-radius: var(--radius-md);
  }
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
  top: -5px;
  right: -7px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: #e8a39a;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  line-height: 1;
`;

const StyledHamb = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--ink-900);
  cursor: pointer;
  @media (min-width: ${NAV_DESKTOP}) {
    display: none;
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
  gap: 12px;
  padding: 12px 16px 18px;
  border-top: 1px solid #e8e8e8;
  background: var(--white);
  @media (min-width: ${NAV_DESKTOP}) {
    display: none;
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
              width={150}
              height={32}
              priority
              unoptimized
              style={{ width: 150, height: "auto", maxHeight: 28 }}
            />
          </StyledLogoLink>
        </StyledStart>

        <StyledDesktopNav aria-label="Primary">
          {NAV.map((item) => (
            <StyledNavLink key={item.label} href={item.href} $promo={"promo" in item && item.promo}>
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
            $promo={"promo" in item && item.promo}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </StyledNavLink>
        ))}
      </StyledMobilePanel>
    </StyledHeader>
  );
};
