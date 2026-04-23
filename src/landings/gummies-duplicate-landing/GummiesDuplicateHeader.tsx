import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { GummiesDuplicateCdn } from "./gummiesDuplicateCdn";

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 40;
  width: 100%;
  background: var(--white);
  border-bottom: 1px solid var(--ink-200);
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.04);
`;

const StyledAnnouncement = styled.div`
  background: var(--coral-200);
  color: var(--ink-900);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding: var(--space-100) var(--space-400);
  text-align: center;
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 1.35;
`;

const StyledBar = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-400);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  @media (max-width: 800px) {
    padding: 0 var(--space-400) var(--space-200);
  }
`;

const StyledNav = styled.nav`
  grid-column: 1 / -1;
  grid-row: 2;
  display: flex;
  width: 100%;
  border-top: 1px solid var(--ink-200);
  margin-top: var(--space-200);
  @media (min-width: 801px) {
    grid-column: 1;
    grid-row: 1;
    width: auto;
    border-top: none;
    margin-top: 0;
    gap: var(--space-200);
  }
`;

const StyledNavLink = styled.a`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  color: var(--gruns-primary-dark);
  text-decoration: none;
  border-right: 1px solid var(--ink-200);
  transition: background 0.15s ease;
  &:last-child {
    border-right: none;
  }
  @media (min-width: 801px) {
    flex: 0 1 auto;
    min-height: 36px;
    padding: var(--space-100) var(--space-300);
    border: 1px solid var(--gruns-primary-dark);
    border-radius: var(--radius-full);
  }
  &:hover {
    background: var(--ink-050);
  }
`;

const StyledLogo = styled.a`
  grid-column: 2;
  grid-row: 1;
  display: flex;
  justify-content: center;
  padding: var(--space-300) 0 var(--space-200);
  line-height: 0;
  @media (min-width: 801px) {
    padding: 0;
  }
  &:hover {
    opacity: 0.9;
  }
`;

const StyledRight = styled.div`
  grid-column: 3;
  grid-row: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-400);
`;

const StyledAccount = styled.span`
  display: none;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  color: var(--gruns-primary-dark);
  @media (min-width: 801px) {
    display: inline;
  }
`;

const StyledCart = styled.a`
  position: relative;
  line-height: 0;
  color: var(--gruns-primary-dark);
  &:hover {
    opacity: 0.85;
  }
`;

const StyledCartCount = styled.span`
  position: absolute;
  top: -6px;
  right: -6px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gold-500);
  color: var(--ink-1000);
  font-size: 10px;
  font-weight: 700;
  border-radius: var(--radius-full);
  border: 1px solid var(--ink-1000);
`;

export const GummiesDuplicateHeader = () => {
  const { t } = useTranslation("gummiesDuplicate");
  return (
    <>
      <StyledAnnouncement>
        <p>
          <strong>{t("announcement.line1")}</strong>
        </p>
        <p>
          <strong>{t("announcement.line2")}</strong>
        </p>
      </StyledAnnouncement>
      <StyledHeader>
        <StyledBar>
          <StyledNav aria-label="Primary">
            <StyledNavLink href="#offers">{t("header.shopAdults")}</StyledNavLink>
            <StyledNavLink href="#offers">{t("header.shopKids")}</StyledNavLink>
          </StyledNav>
          <StyledLogo href="https://shapermint.com" aria-label={t("a11y.logoHome")}>
            <Image src={GummiesDuplicateCdn.logoHeader} alt="" width={120} height={20} priority />
          </StyledLogo>
          <StyledRight>
            <StyledAccount>{t("a11y.account")}</StyledAccount>
            <StyledCart href="#offers" aria-label={t("a11y.cart")}>
              <Image src={GummiesDuplicateCdn.bagIcon} alt="" width={24} height={24} />
              <StyledCartCount>0</StyledCartCount>
            </StyledCart>
          </StyledRight>
        </StyledBar>
      </StyledHeader>
    </>
  );
};
