import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { GrunsCdn } from "./grunsCdn";

const StyledFooter = styled.footer`
  background: var(--gruns-primary);
  color: var(--white);
  padding: var(--space-1200) var(--space-1000) var(--space-600);
  @media (max-width: 800px) {
    padding: var(--space-800) var(--space-400) var(--space-400);
  }
`;

const StyledInner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const StyledNewsletter = styled.div`
  text-align: center;
  margin-bottom: var(--space-1000);
`;

const StyledNewsletterHeading = styled.h3`
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 var(--space-400) 0;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--space-300);
  max-width: 400px;
  margin: 0 auto;
`;

const StyledInput = styled.input`
  padding: var(--space-300) var(--space-400);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--radius-full);
  background: transparent;
  color: var(--white);
  font-size: 16px;
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  &:focus {
    outline: none;
    border-color: var(--white);
  }
`;

const StyledButton = styled.button`
  padding: var(--space-300) var(--space-600);
  background: var(--white);
  color: var(--gruns-primary);
  border: none;
  border-radius: var(--radius-full);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const StyledDisclaimer = styled.p`
  font-size: 12px;
  opacity: 0.6;
  margin: var(--space-400) 0 0 0;
  a {
    color: inherit;
    text-decoration: underline;
  }
`;

const StyledNav = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-600);
  margin-bottom: var(--space-1000);
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const StyledNavColumn = styled.div``;

const StyledNavTitle = styled.h4`
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 var(--space-400) 0;
`;

const StyledNavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-200);
`;

const StyledNavLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  text-decoration: none;
  &:hover {
    color: var(--white);
  }
`;

const StyledBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-400);
  padding-top: var(--space-600);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

const StyledLogo = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: var(--gruns-gold);
`;

const StyledSocial = styled.div`
  display: flex;
  gap: var(--space-400);
`;

const StyledSocialLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  &:hover {
    color: var(--white);
  }
`;

const StyledLegal = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-200) var(--space-400);
  font-size: 12px;
  opacity: 0.6;
`;

const StyledLegalLink = styled.a`
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledCopyright = styled.p`
  font-size: 12px;
  opacity: 0.6;
  margin: 0;
`;

export const GrunsFooter = () => {
  const { t } = useTranslation("gruns");

  const navColumns = [
    { title: t("footer.navigation.learn.title"), links: t("footer.navigation.learn.links", { returnObjects: true }) as string[] },
    { title: t("footer.navigation.connect.title"), links: t("footer.navigation.connect.links", { returnObjects: true }) as string[] },
    { title: t("footer.navigation.usnacks.title"), links: t("footer.navigation.usnacks.links", { returnObjects: true }) as string[] },
  ];

  const legal = t("footer.legal", { returnObjects: true }) as string[];
  const social = t("footer.social", { returnObjects: true }) as string[];

  return (
    <StyledFooter>
      <StyledInner>
        <StyledNewsletter>
          <StyledNewsletterHeading>{t("footer.newsletter.heading")}</StyledNewsletterHeading>
          <StyledForm>
            <StyledInput type="tel" placeholder={t("footer.newsletter.phoneLabel")} />
            <StyledButton type="submit">{t("footer.newsletter.ctaSms")}</StyledButton>
          </StyledForm>
          <StyledDisclaimer>{t("footer.newsletter.smsDisclaimer")}</StyledDisclaimer>
        </StyledNewsletter>

        <StyledNav>
          {navColumns.map((column, i) => (
            <StyledNavColumn key={i}>
              <StyledNavTitle>{column.title}</StyledNavTitle>
              <StyledNavList>
                {column.links.map((link, j) => (
                  <li key={j}>
                    <StyledNavLink href="#">{link}</StyledNavLink>
                  </li>
                ))}
              </StyledNavList>
            </StyledNavColumn>
          ))}
        </StyledNav>

        <StyledBottom>
          <StyledLogo>Grüns</StyledLogo>
          <StyledSocial>
            {social.map((platform, i) => (
              <StyledSocialLink key={i} href="#">
                {platform}
              </StyledSocialLink>
            ))}
          </StyledSocial>
          <p style={{ fontSize: 12, opacity: 0.6, maxWidth: 600, textAlign: "center" }}>{t("footer.disclaimer")}</p>
          <StyledCopyright>{t("footer.copyright")}</StyledCopyright>
          <StyledLegal>
            {legal.map((item, i) => (
              <StyledLegalLink key={i} href="#">
                {item}
              </StyledLegalLink>
            ))}
          </StyledLegal>
        </StyledBottom>
      </StyledInner>
    </StyledFooter>
  );
};
