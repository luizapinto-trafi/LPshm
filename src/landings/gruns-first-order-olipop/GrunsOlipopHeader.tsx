import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { GrunsOlipopCdn } from "./grunsOlipopCdn";

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
  padding: var(--space-100) var(--space-400);
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;
  line-height: 1.35;
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
  gap: var(--space-400);
`;

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  gap: var(--space-300);
  flex-wrap: wrap;
`;

const StyledNavLink = styled.a`
  color: var(--white);
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  padding: var(--space-200) var(--space-400);
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: var(--radius-full);
  &:hover {
    background: rgba(255, 255, 255, 0.12);
  }
`;

const StyledLogo = styled.a`
  display: flex;
  align-items: center;
  line-height: 0;
  filter: brightness(0) invert(1);
  &:hover {
    opacity: 0.92;
  }
`;

const StyledRight = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-400);
`;

const StyledGhost = styled.span`
  font-family: var(--font-body);
  font-size: 13px;
  opacity: 0.85;
`;

export const GrunsOlipopHeader = () => {
  const { t } = useTranslation("grunsOlipop");
  return (
    <StyledHeader>
      <StyledAnnouncement>
        <div>
          <strong>{t("announcement.line1")}</strong>
        </div>
        <div>{t("announcement.line2")}</div>
      </StyledAnnouncement>
      <StyledMainBar>
        <StyledInner>
          <StyledNav aria-label="Primary">
            <StyledNavLink href="#offers">{t("header.shopAdults")}</StyledNavLink>
            <StyledNavLink href="#offers">{t("header.shopKids")}</StyledNavLink>
          </StyledNav>
          <StyledLogo href="https://shapermint.com" aria-label={t("a11y.logoHome")}>
            <Image
              src={GrunsOlipopCdn.logoHeader}
              alt=""
              width={132}
              height={22}
              priority
            />
          </StyledLogo>
          <StyledRight>
            <StyledGhost>{t("a11y.account")}</StyledGhost>
            <Image src={GrunsOlipopCdn.bagIcon} alt="" width={22} height={22} />
          </StyledRight>
        </StyledInner>
      </StyledMainBar>
    </StyledHeader>
  );
};
