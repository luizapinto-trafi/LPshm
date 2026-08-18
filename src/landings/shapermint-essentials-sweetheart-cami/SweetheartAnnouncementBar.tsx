import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";

/**
 * Navigation / Top Bar (Figma instance, node 2350:2545) — vía TalkToFigma.
 * Fondo #292929 (ink-900), texto #fff, 12px / 600, line-height 16px, altura 24px.
 */
const StyledBar = styled.div`
  background: var(--ink-900);
  color: var(--white);
  text-align: center;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px var(--space-200);
  box-sizing: border-box;
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export const SweetheartAnnouncementBar = () => {
  const { t } = useTranslation("sweetheartCami");
  return (
    <StyledBar role="region" aria-label={t("announce.regionLabel")}>
      {t("announce.text")}
    </StyledBar>
  );
};
