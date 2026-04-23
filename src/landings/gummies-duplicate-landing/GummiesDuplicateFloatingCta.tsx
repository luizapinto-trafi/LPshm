import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";

const StyledFloat = styled.div`
  position: fixed;
  top: 5.5rem;
  right: var(--space-400);
  z-index: 35;
  display: none;
  @media (min-width: 801px) {
    display: block;
  }
`;

const StyledLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: var(--space-200);
  padding: var(--space-200) var(--space-500);
  background: var(--gruns-primary);
  color: var(--white) !important;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 800;
  border-radius: var(--radius-lg);
  border: 2px solid var(--ink-1000);
  text-decoration: none;
  box-shadow: 4px 4px 0 0 var(--ink-1000);
  &:hover {
    filter: brightness(1.05);
  }
  &:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 0 var(--ink-1000);
  }
`;

export const GummiesDuplicateFloatingCta = () => {
  const { t } = useTranslation("gummiesDuplicate");
  return (
    <StyledFloat>
      <StyledLink href="#offers">{t("floatingCta")}</StyledLink>
    </StyledFloat>
  );
};
