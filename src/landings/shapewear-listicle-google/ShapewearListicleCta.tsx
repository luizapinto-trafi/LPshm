import styled from "styled-components";

/**
 * Primary peach CTA — Shapermint DS: coral-300 fill, ink-900 label, radius-lg.
 */
const StyledCtaButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  min-width: 180px;
  width: auto;
  padding: var(--space-150) var(--space-300);
  background: var(--coral-300);
  color: var(--ink-900);
  border: none;
  border-radius: var(--radius-lg);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.02em;
  line-height: 1.2;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  box-sizing: border-box;
  cursor: pointer;
  transition: background var(--dur-base, 160ms) var(--ease-out, ease);

  &:hover {
    background: var(--coral-250);
  }

  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

type ShapewearListicleCtaProps = {
  label: string;
  href: string;
};

export const ShapewearListicleCta = ({ label, href }: ShapewearListicleCtaProps) => (
  <StyledCtaButton href={href} target="_blank" rel="noopener noreferrer">
    {label}
  </StyledCtaButton>
);
