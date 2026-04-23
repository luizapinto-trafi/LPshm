import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";

const StyledFooter = styled.footer`
  background: var(--ink-900);
  color: var(--ink-200);
  padding: var(--space-800) var(--space-1000);
  text-align: center;
  font-size: 13px;
  line-height: 1.6;
`;

const StyledLink = styled.a`
  color: var(--white);
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;

export const GrunsOlipopFooter = () => {
  const { t } = useTranslation("grunsOlipop");
  return (
    <StyledFooter>
      <p style={{ margin: "0 0 12px" }}>{t("footer.disclaimer")}</p>
      <p style={{ margin: 0 }}>
        {t("footer.copyright")} ·{" "}
        <StyledLink href="https://shapermint.com">{t("footer.shapermint")}</StyledLink>
      </p>
    </StyledFooter>
  );
};
