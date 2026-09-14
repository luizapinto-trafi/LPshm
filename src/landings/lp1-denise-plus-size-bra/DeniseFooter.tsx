import styled from "styled-components";
import Image from "next/image";
import { DeniseAssets } from "./deniseCdn";

const StyledFooter = styled.footer`
  background-color: #000000;
  color: #ffffff;
`;

const StyledInner = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  width: 100%;
  max-width: 72rem;
  margin: 0 auto;
  padding: 56px 20px;

  @media (min-width: 640px) {
    padding: 56px 32px;
  }

  @media (min-width: 768px) {
    grid-template-columns: 1.4fr 1fr 1fr;
    gap: 32px;
  }
`;

const StyledBrand = styled.a`
  display: inline-flex;
  align-items: flex-start;
`;

const StyledLogo = styled(Image)`
  width: auto;
  height: 28px;
  /* Black CDN logo → white on dark footer */
  filter: brightness(0) invert(1);

  @media (min-width: 640px) {
    height: 36px;
  }
`;

const StyledColTitle = styled.h3`
  margin: 0;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
`;

const StyledLink = styled.span`
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
`;

const COMPANY = ["About", "Subscribe", "Contact", "Jobs", "Press", "Advertise With Us"] as const;
const INFO = [
  "Community Guidelines",
  "Privacy Policy",
  "Cookie Policy",
  "Terms of Use",
  "Editorial Guidelines",
  "Accessibility Statement",
] as const;

export const DeniseFooter = () => (
  <StyledFooter>
    <StyledInner>
      <StyledBrand href="https://shapermint.com" aria-label="Shapermint">
        <StyledLogo src={DeniseAssets.logo} alt="Shapermint" width={200} height={36} />
      </StyledBrand>
      <div>
        <StyledColTitle>Company</StyledColTitle>
        <StyledList>
          {COMPANY.map((l) => (
            <li key={l}>
              <StyledLink>{l}</StyledLink>
            </li>
          ))}
        </StyledList>
      </div>
      <div>
        <StyledColTitle>Information</StyledColTitle>
        <StyledList>
          {INFO.map((l) => (
            <li key={l}>
              <StyledLink>{l}</StyledLink>
            </li>
          ))}
        </StyledList>
      </div>
    </StyledInner>
  </StyledFooter>
);
