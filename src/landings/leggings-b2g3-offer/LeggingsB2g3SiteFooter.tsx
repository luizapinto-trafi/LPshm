import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";

const StyledFooter = styled.footer`
  background: var(--ink-050);
  padding: 40px 20px;
  text-align: center;
`;

const StyledP = styled.p`
  margin: 0;
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--ink-600);
`;

export const LeggingsB2g3SiteFooter = () => {
  const { t } = useTranslation("leggingsB2g3");
  return (
    <StyledFooter>
      <StyledP>{t("footer.note")}</StyledP>
    </StyledFooter>
  );
};
