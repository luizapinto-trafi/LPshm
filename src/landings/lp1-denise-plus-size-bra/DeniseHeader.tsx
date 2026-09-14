import styled from "styled-components";
import Image from "next/image";
import { DeniseAssets } from "./deniseCdn";

const StyledHeader = styled.header`
  border-bottom: 1px solid #e5e5e5;
`;

const StyledInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 72rem;
  margin: 0 auto;
  padding: 20px;

  @media (min-width: 640px) {
    padding: 20px 32px;
  }
`;

const StyledLogo = styled(Image)`
  width: auto;
  height: 24px;

  @media (min-width: 640px) {
    height: 32px;
  }
`;

const StyledSocial = styled(Image)`
  width: auto;
  height: 22px;
`;

export const DeniseHeader = () => (
  <StyledHeader>
    <StyledInner>
      <a href="https://shapermint.com" aria-label="Shapermint">
        <StyledLogo src={DeniseAssets.logo} alt="Shapermint" width={180} height={28} priority />
      </a>
      <StyledSocial src={DeniseAssets.socialIcons} alt="" width={140} height={26} aria-hidden />
    </StyledInner>
  </StyledHeader>
);
