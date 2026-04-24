import { css } from "styled-components";

/** Tipografía compartida para títulos de sección (h2) en la landing strapless. */
export const straplessSectionH2Typography = css`
  font-family: var(--font-body);
  font-weight: 600;
  font-size: clamp(28px, 4.2vw, 40px);
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--ink-900);
  text-wrap: balance;
`;
