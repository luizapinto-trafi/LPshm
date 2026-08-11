import Image from "next/image";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next/pages";
import { JellybraCdn, JellybraShopUrl } from "./jellybraCdn";

const StyledBar = styled.div<{ $visible: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 40;
  display: ${({ $visible }) => ($visible ? "flex" : "none")};
  align-items: center;
  gap: 12px;
  padding: 10px 14px calc(10px + env(safe-area-inset-bottom));
  background: var(--white);
  border-top: 1px solid var(--ink-200);
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.06);
  @media (min-width: 900px) {
    display: none;
  }
`;

const StyledThumb = styled.div`
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  overflow: hidden;
  flex: 0 0 auto;
  position: relative;
  background: var(--coral-050);
`;

const StyledCopy = styled.div`
  flex: 1;
  min-width: 0;
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  color: var(--ink-900);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledCta = styled.a`
  flex: 0 0 auto;
  background: var(--coral-300);
  color: var(--ink-900);
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.02em;
  line-height: 1;
  text-transform: uppercase;
  text-decoration: none;
  padding: 0.75rem 1.25rem;
  min-height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-lg);
  white-space: nowrap;
  box-sizing: border-box;
  &:hover {
    background: var(--coral-250);
  }
`;

export const JellybraStickyBar = () => {
  const { t } = useTranslation("jellybra");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible((window.scrollY || document.documentElement.scrollTop) > 900);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <StyledBar $visible={visible} role="region" aria-label={t("sticky.product")}>
      <StyledThumb>
        <Image
          src={JellybraCdn.galleryFront}
          alt=""
          fill
          sizes="48px"
          unoptimized
          style={{ objectFit: "cover" }}
        />
      </StyledThumb>
      <StyledCopy>{t("sticky.product")}</StyledCopy>
      <StyledCta href={JellybraShopUrl}>{t("sticky.cta")}</StyledCta>
    </StyledBar>
  );
};
