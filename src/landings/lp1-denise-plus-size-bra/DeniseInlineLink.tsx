import type { ReactNode } from "react";
import styled from "styled-components";
import { DeniseCtaUrl } from "./deniseCdn";

const StyledLink = styled.a`
  font-family: Georgia, "Times New Roman", serif;
  font-weight: 400;
  color: #3d6b8a;
  text-decoration: underline;
  text-decoration-color: rgba(61, 107, 138, 0.5);
  text-underline-offset: 2px;

  &:hover {
    text-decoration-color: #3d6b8a;
  }
`;

type DeniseInlineLinkProps = {
  children: ReactNode;
};

/** Inline article link to the BOGO offer. */
export const DeniseInlineLink = ({ children }: DeniseInlineLinkProps) => (
  <StyledLink href={DeniseCtaUrl} target="_blank" rel="noopener noreferrer">
    {children}
  </StyledLink>
);
