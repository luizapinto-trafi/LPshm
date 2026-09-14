import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";

/** Black VIP / promo announcement bar — Shapermint site chrome. */
const StyledBar = styled.div`
  position: relative;
  z-index: 30;
  width: 100%;
  background: var(--ink-1000);
  color: var(--white);
  text-align: center;
  text-transform: uppercase;
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  line-height: 1.3;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-100) var(--space-400);
  box-sizing: border-box;
`;

export const ShapewearListiclePromoBar = () => {
  const { t } = useTranslation("shapewearListicleGoogle");
  return <StyledBar role="status">{t("promoBar")}</StyledBar>;
};
