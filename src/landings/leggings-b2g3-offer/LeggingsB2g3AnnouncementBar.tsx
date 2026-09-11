import styled from "styled-components";

/** Live site promo bar — inline copy to avoid i18n key flash. */
const StyledBar = styled.div`
  background: #000;
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  text-align: center;
  min-height: 40px;
  box-sizing: border-box;
`;

const StyledMsg = styled.span`
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  line-height: 1.3;
`;

export const LeggingsB2g3AnnouncementBar = () => (
  <StyledBar role="region" aria-label="Promotions">
    <StyledMsg>YOU HAVE VIP BENEFITS! ENJOY YOUR FREE SHIPPING!</StyledMsg>
  </StyledBar>
);
