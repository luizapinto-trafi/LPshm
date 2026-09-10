import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { ShapewearListicleCollectionUrl } from "./shapewearListicleCdn";

/** Teal sticky bar layout matching Style Insiders / deal-bar print. */
const StyledBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  padding: 14px clamp(16px, 4vw, 40px);
  background: #648d9c;
  box-sizing: border-box;
`;

const StyledOffer = styled.span`
  font-family: Georgia, "Times New Roman", serif;
  font-weight: 700;
  font-size: 17px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #ffffff;
  line-height: 1.2;

  @media (max-width: 600px) {
    font-size: 13px;
  }
`;

const StyledButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  min-height: 44px;
  padding: 12px 22px;
  background: #ffffff;
  color: #1f1f1f;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 0;
  white-space: nowrap;

  &:hover {
    background: #f2f2f2;
  }

  @media (max-width: 600px) {
    padding: 10px 14px;
    font-size: 12px;
    min-height: 40px;
  }
`;

export const ShapewearListicleStickyBar = () => {
  const { t } = useTranslation("shapewearListicleGoogle");
  return (
    <StyledBar>
      <StyledOffer>{t("sticky.offer")}</StyledOffer>
      <StyledButton
        href={ShapewearListicleCollectionUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {t("sticky.cta")}
      </StyledButton>
    </StyledBar>
  );
};
