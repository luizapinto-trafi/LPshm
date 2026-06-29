import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { MbraAdvCtaUrl } from "./mbraAdvCdn";

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
  padding: 14px 24px;
  background-color: #648d9c;

  @media (max-width: 600px) {
    padding: 12px 16px;
  }
`;

const StyledOffer = styled.span`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 17px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  color: #ffffff;

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const StyledButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  padding: 12px 22px;
  background-color: #1f1f1f;
  color: #ffffff;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 15px;
  line-height: 1;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  border-radius: 8px;
  white-space: nowrap;

  @media (max-width: 600px) {
    padding: 10px 16px;
    font-size: 13px;
  }
`;

export const MbraAdvStickyCta = () => {
  const { t } = useTranslation("mbraAdv");
  return (
    <StyledBar>
      <StyledOffer>{t("cta.buy")}</StyledOffer>
      <StyledButton href={MbraAdvCtaUrl} target="_blank" rel="noopener noreferrer">
        {t("promoBar.viewDeal")}
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M3 9h12M10 4l5 5-5 5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </StyledButton>
    </StyledBar>
  );
};
