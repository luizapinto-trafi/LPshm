import Image from "next/image";
import styled from "styled-components";
import { useState } from "react";
import { ShapewearListicleCdn } from "./shapewearListicleCdn";

const NAV_ITEMS = [
  { label: "Best Sellers", href: "https://shapermint.com/collections/best-sellers" },
  { label: "Shapewear", href: "https://shapermint.com/collections/shapewear", chevron: true },
  { label: "Bras", href: "https://shapermint.com/collections/bras", chevron: true },
  { label: "Camis & Tops", href: "https://shapermint.com/collections/tanks-camis" },
  { label: "Underwear", href: "https://shapermint.com/collections/underwear", chevron: true },
  { label: "Bodysuits", href: "https://shapermint.com/collections/bodysuits" },
  { label: "Packs & Bundles", href: "https://shapermint.com/collections/packs-bundles" },
  { label: "Community", href: "https://shapermint.com/pages/community", chevron: true },
  {
    label: "Warehouse Clearance",
    href: "https://shapermint.com/collections/warehouse-clearance",
    promo: true,
  },
] as const;

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  width: 100%;
  background: var(--white);
  border-bottom: 1px solid var(--ink-200);
`;

const StyledInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-400);
  min-height: 64px;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 12px clamp(12px, 2vw, 24px);
  box-sizing: border-box;

  @media (max-width: 1100px) {
    min-height: 56px;
  }
`;

const StyledStart = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
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

  @media (max-width: 1100px) {
    display: inline-flex;
  }

  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

const StyledLogoLink = styled.a`
  display: block;
  line-height: 0;

  img {
    width: auto;
    height: 28px;
  }

  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
    border-radius: var(--radius-md);
  }
`;

const StyledNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 4px 14px;
  flex: 1 1 auto;
  min-width: 0;

  @media (max-width: 1100px) {
    display: none;
  }
`;

const StyledNavLink = styled.a<{ $promo?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: ${({ $promo }) => ($promo ? "var(--coral-650)" : "var(--ink-900)")};
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: ${({ $promo }) => ($promo ? 600 : 500)};
  line-height: 1.2;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    color: var(--coral-500);
  }
`;

const StyledActions = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;
  color: var(--ink-900);
`;

const StyledLocale = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 500;
  color: var(--ink-800);
  white-space: nowrap;

  @media (max-width: 1100px) {
    display: none;
  }
`;

const StyledFlag = styled.span`
  display: inline-block;
  width: 18px;
  height: 12px;
  border-radius: 1px;
  background: linear-gradient(
    180deg,
    #b22234 0%,
    #b22234 46%,
    #fff 46%,
    #fff 54%,
    #3c3b6e 54%,
    #3c3b6e 100%
  );
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
`;

const StyledIconLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: inherit;
  line-height: 0;

  &:hover {
    opacity: 0.75;
  }

  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
    border-radius: var(--radius-md);
  }

  svg {
    width: 22px;
    height: 22px;
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
  border-radius: 9999px;
  background: var(--sale, #c64844);
  color: var(--white);
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 700;
  line-height: 1;
`;

const StyledMobilePanel = styled.nav<{ $open: boolean }>`
  display: none;

  @media (max-width: 1100px) {
    display: ${({ $open }) => ($open ? "flex" : "none")};
    flex-direction: column;
    gap: 14px;
    padding: 16px clamp(12px, 2vw, 24px) 20px;
    border-top: 1px solid var(--ink-200);
    background: var(--white);
  }
`;

export const ShapewearListicleHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <StyledHeader>
      <StyledInner>
        <StyledStart>
          <StyledHamb
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </StyledHamb>
          <StyledLogoLink href="https://shapermint.com/" aria-label="Shapermint">
            <Image
              src={ShapewearListicleCdn.logo}
              alt="Shapermint"
              width={160}
              height={28}
              priority
              unoptimized
            />
          </StyledLogoLink>
        </StyledStart>

        <StyledNav aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <StyledNavLink
              key={item.label}
              href={item.href}
              $promo={"promo" in item && item.promo}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.label}
              {"chevron" in item && item.chevron ? (
                <Image
                  src={ShapewearListicleCdn.chevron}
                  alt=""
                  width={10}
                  height={10}
                  unoptimized
                />
              ) : null}
            </StyledNavLink>
          ))}
        </StyledNav>

        <StyledActions>
          <StyledLocale aria-label="United States, USD">
            <StyledFlag aria-hidden />
            | USD
          </StyledLocale>
          <StyledIconLink href="https://shapermint.com/search" aria-label="Search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.5" y2="16.5" />
            </svg>
          </StyledIconLink>
          <StyledIconLink href="https://shapermint.com/account" aria-label="Account">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
            </svg>
          </StyledIconLink>
          <StyledIconLink href="https://shapermint.com/pages/faq" aria-label="Help">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <circle cx="12" cy="12" r="9" />
              <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.9.4-1.5 1.1-1.5 2.2V14" />
              <circle cx="12" cy="17" r="0.8" fill="currentColor" stroke="none" />
            </svg>
          </StyledIconLink>
          <StyledIconLink href="https://shapermint.com/cart" aria-label="Cart, 4 items">
            <StyledCartHost>
              <Image
                src={ShapewearListicleCdn.bag}
                alt=""
                width={22}
                height={22}
                unoptimized
              />
              <StyledCartBadge aria-hidden>4</StyledCartBadge>
            </StyledCartHost>
          </StyledIconLink>
        </StyledActions>
      </StyledInner>

      <StyledMobilePanel aria-label="Mobile navigation" $open={menuOpen}>
        {NAV_ITEMS.map((item) => (
          <StyledNavLink
            key={item.label}
            href={item.href}
            $promo={"promo" in item && item.promo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </StyledNavLink>
        ))}
      </StyledMobilePanel>
    </StyledHeader>
  );
};
