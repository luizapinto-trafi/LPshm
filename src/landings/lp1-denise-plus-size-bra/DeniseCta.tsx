import styled from "styled-components";
import { DeniseCtaUrl } from "./deniseCdn";

const StyledWrap = styled.div`
  margin: 32px 0;
`;

const StyledButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 16px 20px;
  border-radius: 6px;
  background-color: #c64844;
  color: #ffffff;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0.04em;
  text-align: center;
  text-transform: uppercase;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  transition: background-color 0.15s ease;

  &:hover {
    background-color: #b13a36;
  }

  @media (min-width: 640px) {
    font-size: 16px;
  }
`;

const StyledGuarantee = styled.p`
  margin: 12px 0 0;
  font-family: "Poppins", sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-align: center;
  text-transform: uppercase;
  color: rgba(41, 41, 41, 0.7);

  @media (min-width: 640px) {
    font-size: 12px;
  }
`;

type DeniseCtaProps = {
  label: string;
};

export const DeniseCta = ({ label }: DeniseCtaProps) => (
  <StyledWrap>
    <StyledButton href={DeniseCtaUrl} target="_blank" rel="noopener noreferrer">
      {label}
    </StyledButton>
    <StyledGuarantee>60-Day Fit Guarantee — No Questions Asked</StyledGuarantee>
  </StyledWrap>
);
