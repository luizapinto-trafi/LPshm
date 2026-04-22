import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";

const StyledBar = styled.div`
  background: var(--ink-900);
  color: var(--white);
  text-align: center;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: var(--space-200) var(--space-400);
`;

export const StraplessAnnouncementBar = () => {
  const { t } = useTranslation("strapless");
  return <StyledBar>{t("announce.text")}</StyledBar>;
};
