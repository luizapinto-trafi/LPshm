import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { GrunsCdn } from "./grunsCdn";

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
`;

const StyledAnnouncement = styled.div`
  background: var(--gruns-peach);
  color: var(--gruns-dark);
  text-align: center;
  padding: var(--space-200) var(--space-400);
  font-size: 13px;
  font-weight: 500;
`;

const StyledAnnouncementLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-200);
  text-decoration: none;
  color: inherit;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledMainBar = styled.div`
  background: var(--gruns-primary);
  color: var(--white);
  padding: 0 var(--space-1000);
  @media (max-width: 800px) {
    padding: 0 var(--space-400);
  }
`;

const StyledInner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 64px;
`;

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  gap: var(--space-400);
`;

const StyledNavLink = styled.a`
  color: var(--white);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  padding: var(--space-200) var(--space-400);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--radius-full);
  transition: all 0.2s ease;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--white);
  }
`;

const StyledLogo = styled.a`
  display: block;
  line-height: 0;
  &:hover {
    opacity: 0.9;
  }
`;

const StyledRight = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-500);
`;

const StyledIconLink = styled.a`
  display: flex;
  align-items: center;
  gap: var(--space-100);
  color: var(--white);
  font-size: 14px;
  text-decoration: none;
  &:hover {
    opacity: 0.8;
  }
`;

export const GrunsHeader = () => {
  const { t } = useTranslation("gruns");
  return (
    <StyledHeader>
      <StyledAnnouncement>
        <StyledAnnouncementLink href="https://gruns.co/pages/first-order-olipop" target="_blank" rel="noopener noreferrer">
          <span>{t("announcement.text")}</span>
          <span>{t("announcement.subtext")}</span>
        </StyledAnnouncementLink>
      </StyledAnnouncement>
      <StyledMainBar>
        <StyledInner>
          <StyledNav aria-label="Primary">
            <StyledNavLink href="#offers">{t("header.shopAdults")}</StyledNavLink>
            <StyledNavLink href="https://gruns.co/pages/first-order-gruns-kids-daily">{t("header.shopKids")}</StyledNavLink>
          </StyledNav>
          <StyledLogo href="/" aria-label={t("a11y.logoHome")}>
            <Image src={GrunsCdn.logo} alt="" width={100} height={30} unoptimized style={{ display: "block" }} />
          </StyledLogo>
          <StyledRight>
            <StyledIconLink href="https://gruns.co/a/account/login" aria-label={t("a11y.account")}>
              <span>{t("header.account")}</span>
            </StyledIconLink>
            <StyledIconLink href="/cart" aria-label={t("a11y.cart")}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"
                  fill="currentColor"
                />
                <path
                  d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"
                  fill="currentColor"
                />
                <path
                  d="M1 2H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </StyledIconLink>
          </StyledRight>
        </StyledInner>
      </StyledMainBar>
    </StyledHeader>
  );
};
