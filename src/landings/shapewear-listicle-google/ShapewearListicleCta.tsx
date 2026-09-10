import styled from "styled-components";

/**
 * Item CTA matches the listicle section reference:
 * soft peach fill, dark label, rounded rect, "SHOP NOW".
 */
const StyledCtaButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  min-width: 180px;
  width: 100%;
  padding: 12px 36px;
  background: var(--coral-300);
  color: var(--ink-1000);
  border: none;
  border-radius: 8px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.04em;
  line-height: 1.2;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background: var(--coral-350);
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
