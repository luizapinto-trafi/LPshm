import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { StraplessPrimaryButton } from "./StraplessPrimaryButton";

const StyledBar = styled.div`
  display: none;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.08);
  padding: 12px 16px;
  z-index: 40;
  @media (max-width: 1023px) {
    display: block;
  }
`;

export const StraplessStickyCta = () => {
  const { t } = useTranslation("strapless");
  return (
    <StyledBar>
      <StraplessPrimaryButton href="#buy" $wide>
        {t("sticky.cta")}
      </StraplessPrimaryButton>
    </StyledBar>
  );
};
