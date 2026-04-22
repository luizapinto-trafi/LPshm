import styled from "styled-components";
import type { ReactNode } from "react";

const StyledCta = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: var(--space-300) var(--space-600);
  background: var(--coral-500);
  color: var(--white);
  border: none;
  border-radius: var(--radius-lg);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.06em;
  line-height: 1.2;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    background: var(--coral-450);
  }

  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

type TruekindBraCtaLinkProps = {
  children: ReactNode;
  href: string;
  ariaLabel?: string;
};

export const TruekindBraCtaLink = ({
  children,
  href,
  ariaLabel,
}: TruekindBraCtaLinkProps) => (
  <StyledCta href={href} aria-label={ariaLabel} rel="noopener noreferrer" target="_blank">
    {children}
  </StyledCta>
);
