import styled, { css } from "styled-components";

export const StraplessPrimaryButton = styled.a<{ $wide?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-200);
  background: var(--coral-300);
  color: var(--ink-700);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.01em;
  text-transform: none;
  min-height: 48px;
  padding: 0 var(--space-800);
  border-radius: var(--radius-lg);
  text-decoration: none;
  transition: background var(--dur-base) var(--ease-out),
    transform var(--dur-fast) var(--ease-out);
  cursor: pointer;
  white-space: nowrap;
  border: 0;
  box-sizing: border-box;
  &:hover {
    background: var(--coral-250);
    text-decoration: none;
  }
  &:active {
    transform: translateY(1px);
  }
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
  ${({ $wide }) =>
    $wide &&
    css`
      width: 100%;
      max-width: 375px;
    `}
`;
