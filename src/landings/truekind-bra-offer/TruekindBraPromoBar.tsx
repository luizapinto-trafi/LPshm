import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";

const StyledBar = styled.div`
  position: relative;
  z-index: 30;
  width: 100%;
  background: var(--coral-200);
  color: var(--ink-900);
  text-align: center;
  text-transform: uppercase;
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  line-height: 1.2;
  /* ~44px band so header stack aligns with in-browser measurement (~45px to header top) */
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--space-400);
  box-sizing: border-box;
`;

export const TruekindBraPromoBar = () => {
  const { t } = useTranslation("truekindBra");
  return <StyledBar role="status">{t("promoBar")}</StyledBar>;
};
