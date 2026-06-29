import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import Image from "next/image";
import { MbraAdvAssets } from "./mbraAdvCdn";

const StyledFooter = styled.footer`
  background-color: #1c1c1c;
  color: #ffffff;
  padding: 48px 20px 96px;
`;

const StyledInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 48px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const StyledBrandCol = styled.div`
  flex: 1 1 200px;
`;

const StyledLogo = styled(Image)`
  width: auto;
  height: 24px;
  /* Logo negro → blanco sobre el fondo oscuro del footer */
  filter: brightness(0) invert(1);
`;

const StyledBrandLine = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  color: #c9c9c9;
  margin-top: 12px;
`;

const StyledCopyright = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  color: #8a8a8a;
  margin-top: 8px;
`;

const StyledNavCol = styled.nav`
  flex: 0 1 auto;
`;

const StyledColTitle = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 14px;
  color: #ffffff;
`;

const StyledLinkList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledLink = styled.a`
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  color: #c9c9c9;

  &:hover {
    color: #ffffff;
  }
`;

const companyKeys = ["about", "subscribe", "contact", "jobs", "press", "advertise"] as const;
const infoKeys = ["community", "privacy", "cookie", "terms", "editorial", "accessibility"] as const;

export const MbraAdvFooter = () => {
  const { t } = useTranslation("mbraAdv");
  return (
    <StyledFooter>
      <StyledInner>
        <StyledBrandCol>
          <StyledLogo src={MbraAdvAssets.logo} alt={t("brand")} width={160} height={24} />
          <StyledBrandLine>{t("footer.brand")}</StyledBrandLine>
          <StyledCopyright>{t("footer.copyright")}</StyledCopyright>
        </StyledBrandCol>

        <StyledNavCol aria-label={t("footer.company")}>
          <StyledColTitle>{t("footer.company")}</StyledColTitle>
          <StyledLinkList>
            {companyKeys.map((key) => (
              <li key={key}>
                <StyledLink href="#">{t(`footer.links.${key}`)}</StyledLink>
              </li>
            ))}
          </StyledLinkList>
        </StyledNavCol>

        <StyledNavCol aria-label={t("footer.information")}>
          <StyledColTitle>{t("footer.information")}</StyledColTitle>
          <StyledLinkList>
            {infoKeys.map((key) => (
              <li key={key}>
                <StyledLink href="#">{t(`footer.links.${key}`)}</StyledLink>
              </li>
            ))}
          </StyledLinkList>
        </StyledNavCol>
      </StyledInner>
    </StyledFooter>
  );
};
