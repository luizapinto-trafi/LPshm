import styled from "styled-components";
import { MbraAdvCtaUrl } from "./mbraAdvCdn";

const StyledCtaButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 480px;
  margin: 8px auto 0;
  padding: 18px 24px;
  background-color: #c64844;
  color: #ffffff;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 1;
  letter-spacing: 0.2px;
  text-align: center;
  text-transform: uppercase;
  border-radius: 8px;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: #b13a36;
  }
`;

type MbraAdvCtaButtonProps = {
  label: string;
};

export const MbraAdvCtaButton = ({ label }: MbraAdvCtaButtonProps) => (
  <StyledCtaButton href={MbraAdvCtaUrl} target="_blank" rel="noopener noreferrer">
    {label}
  </StyledCtaButton>
);
