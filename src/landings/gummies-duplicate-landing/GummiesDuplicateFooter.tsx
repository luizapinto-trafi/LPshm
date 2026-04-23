import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";

const StyledFooter = styled.footer`
  background: var(--ink-900);
  color: var(--ink-200);
  padding: var(--space-800) var(--space-400);
  border-top: 4px solid var(--gruns-primary);
  @media (min-width: 801px) {
    padding: var(--space-1000) var(--space-1000);
  }
`;

const StyledInner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-500);
  text-align: center;
  @media (min-width: 801px) {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
`;

const StyledMark = styled.div`
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: -0.04em;
  color: var(--white);
`;

const StyledLinks = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-500);
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

const StyledA = styled.a`
  color: var(--coral-200);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledMeta = styled.p`
  font-size: 14px;
  color: var(--ink-500);
  margin: 0;
`;

export const GummiesDuplicateFooter = () => {
  const { t } = useTranslation("gummiesDuplicate");
  return (
    <StyledFooter>
      <StyledInner>
        <StyledMark>{t("footer.brand")}</StyledMark>
        <StyledLinks>
          <StyledA href="https://shapermint.com/pages/privacy-policy">{t("footer.privacy")}</StyledA>
          <StyledA href="https://shapermint.com/pages/shapermint-conditions-of-use">{t("footer.terms")}</StyledA>
          <StyledA href="https://shapermint.com/pages/contact-us">{t("footer.contact")}</StyledA>
        </StyledLinks>
        <StyledMeta>{t("footer.copyright")}</StyledMeta>
      </StyledInner>
    </StyledFooter>
  );
};
