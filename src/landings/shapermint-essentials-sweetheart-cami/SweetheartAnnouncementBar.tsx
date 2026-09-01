import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";

const StyledBar = styled.div`
  background: var(--ink-900);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  text-align: center;
  box-sizing: border-box;
  min-height: 40px;
`;

const StyledMsg = styled.span`
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
  letter-spacing: 0.02em;
  b {
    color: var(--coral-300);
    letter-spacing: 0.04em;
  }
`;

export const SweetheartAnnouncementBar = () => {
  const { t } = useTranslation("sweetheartCami");

  return (
    <StyledBar role="region" aria-label={t("announce.regionLabel")}>
      <StyledMsg>
        {t("announce.emoji")} {t("announce.upTo")} <b>{t("announce.freeGift")}</b> {t("announce.emoji")}
      </StyledMsg>
    </StyledBar>
  );
};
