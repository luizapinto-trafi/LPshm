import styled, { css } from "styled-components";

const ctaType = css`
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.02em;
  line-height: 1.15;
  text-transform: uppercase;
  color: var(--ink-900);
`;

const ctaChrome = css`
  background: var(--coral-300);
  border-radius: var(--radius-lg);
  border: 0;
  box-shadow: none;
  box-sizing: border-box;
  text-decoration: none;
  cursor: pointer;
  transition: background var(--dur-base) var(--ease-out);
  &:hover {
    background: var(--coral-250);
    text-decoration: none;
  }
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

/** Solid CTA — same type + chrome as the split ATC, without the divider */
export const SweetheartPrimaryButton = styled.a<{ $wide?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 48px;
  padding: 0.75rem 1.5rem;
  white-space: normal;
  ${ctaType}
  ${ctaChrome}
  ${({ $wide }) =>
    $wide &&
    css`
      width: 100%;
      max-width: none;
    `}
`;

/** Split ATC: BUY NOW! | GET X% OFF — do not restyle independently */
export const SweetheartSplitCta = styled.a<{ $full?: boolean }>`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  width: 100%;
  max-width: ${({ $full }) => ($full ? "400px" : "420px")};
  min-height: 48px;
  padding: 14px 32px;
  line-height: 1;
  box-sizing: border-box;
  ${ctaType}
  ${ctaChrome}
`;

export const SweetheartSplitCtaPart = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  padding: 0;
  white-space: nowrap;
  font-size: inherit;
`;

/** Short divider — text-height only, not full button height */
export const SweetheartSplitCtaDivider = styled.span`
  display: inline-block;
  width: 1px;
  height: 1.25em;
  align-self: center;
  background: currentColor;
  opacity: 0.55;
  border-radius: 1px;
`;
