import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { SweetheartCdn } from "./sweetheartCamiCdn";

/** LP header: Shapermint logo + cart icon (no site nav). */
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
  box-sizing: border-box;
  @media (max-width: 1023px) {
    min-height: 48px;
    padding: 12px 16px;
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

const StyledCartLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  color: var(--ink-900);
  text-decoration: none;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }
  svg {
    width: 24px;
    height: 24px;
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

export const SweetheartSiteHeader = () => {
  const { t } = useTranslation("sweetheartCami");
  const cartCount = t("header.cartCount");

  return (
    <StyledHeader>
      <StyledInner>
        <StyledLogoLink href="https://shapermint.com" aria-label={t("header.logoAria")}>
          <StyledLogo src={SweetheartCdn.logo} alt="" width={140} height={32} priority unoptimized />
        </StyledLogoLink>
        <StyledCartLink
          href="https://shapermint.com/cart"
          aria-label={t("header.cart")}
          data-testid="header-cart"
        >
          <StyledCartHost>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M9 7V6a3 3 0 0 1 6 0v1" />
              <rect x="4" y="7" width="16" height="14" rx="1.5" />
            </svg>
            <StyledCartBadge aria-hidden>{cartCount}</StyledCartBadge>
          </StyledCartHost>
        </StyledCartLink>
      </StyledInner>
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
