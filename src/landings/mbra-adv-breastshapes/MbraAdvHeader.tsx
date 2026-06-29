import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import Image from "next/image";
import { MbraAdvAssets } from "./mbraAdvCdn";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 18px 20px;
`;

const StyledBrand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StyledLogo = styled(Image)`
  width: auto;
  height: 26px;
`;

const StyledSubtitle = styled.span`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 10px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #8a8a8a;
`;

const StyledSocial = styled.div`
  display: inline-flex;
  align-items: center;
`;

export const MbraAdvHeader = () => {
  const { t } = useTranslation("mbraAdv");
  return (
    <StyledHeader>
      <StyledBrand>
        <StyledLogo src={MbraAdvAssets.logo} alt={t("brand")} width={170} height={26} priority />
      </StyledBrand>
      <StyledSocial>
        <Image src={MbraAdvAssets.socialIcons} alt={t("header.socialAlt")} width={140} height={26} />
      </StyledSocial>
    </StyledHeader>
  );
};
