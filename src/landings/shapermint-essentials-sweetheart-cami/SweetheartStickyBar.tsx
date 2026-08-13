import styled from "styled-components";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next/pages";
import { SweetheartShopUrl } from "./sweetheartCamiCdn";
import { SweetheartPrimaryButton } from "./SweetheartPrimaryButton";

/**
 * Floating sticky ATC — same chrome/width as the PDP CTA column.
 * Copy stays "Add to Cart · 45% OFF" (not the PDP split label).
 * Shows only after the PDP CTA has scrolled above the viewport.
 */
const StyledBar = styled.div<{ $visible: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 60;
  display: flex;
  justify-content: center;
  padding: 10px 16px calc(10px + env(safe-area-inset-bottom));
  background: var(--coral-050);
  border-top: 1px solid var(--ink-200);
  box-shadow: none;
  filter: none;
  transform: ${({ $visible }) => ($visible ? "translateY(0)" : "translateY(100%)")};
  transition: transform 0.25s var(--ease-out);
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
`;

const StyledCtaWrap = styled.div`
  width: 100%;
  max-width: 560px;
  box-shadow: none;
  filter: none;

  @media (min-width: 900px) {
    max-width: min(
      100%,
      calc((min(1200px, 100vw) - 2 * var(--space-400) - var(--space-800)) * 0.9 / 2)
    );
  }

  a {
    width: 100%;
    box-shadow: none !important;
    filter: none;
    text-transform: none;
  }
`;

export const SweetheartStickyBar = () => {
  const { t } = useTranslation("sweetheartCami");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sync = () => {
      const pdpCta = document.getElementById("sweetheart-pdp-cta");
      if (!pdpCta) {
        setVisible(false);
        return;
      }
      setVisible(pdpCta.getBoundingClientRect().bottom < 0);
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  return (
    <StyledBar $visible={visible} role="region" aria-label={t("sticky.cta")}>
      <StyledCtaWrap>
        <SweetheartPrimaryButton $wide href={SweetheartShopUrl}>
          {t("sticky.cta")}
        </SweetheartPrimaryButton>
      </StyledCtaWrap>
    </StyledBar>
  );
};
