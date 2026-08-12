import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { JellybraCdn } from "./jellybraCdn";

/** Full-bleed as-seen-in strip (viral ebra ImageBannerSection). */
const StyledWrap = styled.div`
  width: 100%;
  background: var(--white);
  padding: var(--space-400) 0 var(--space-600);
  @media (max-width: 899px) {
    padding: var(--space-300) 0 var(--space-500);
  }
`;

const StyledInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 var(--space-500);
  line-height: 0;
  @media (max-width: 640px) {
    padding: 0 var(--space-400);
  }
`;

const StyledDesktop = styled.div`
  display: block;
  @media (max-width: 640px) {
    display: none;
  }
`;

const StyledMobile = styled.div`
  display: none;
  @media (max-width: 640px) {
    display: block;
  }
`;

export const JellybraPressSection = () => {
  const { t } = useTranslation("jellybra");

  return (
    <StyledWrap>
      <StyledInner>
        <StyledDesktop>
          <Image
            src={JellybraCdn.pressLogos}
            alt={t("press.alt")}
            width={1200}
            height={96}
            unoptimized
            style={{ width: "100%", height: "auto" }}
          />
        </StyledDesktop>
        <StyledMobile>
          <Image
            src={JellybraCdn.pressLogosMobile}
            alt={t("press.alt")}
            width={750}
            height={120}
            unoptimized
            style={{ width: "100%", height: "auto" }}
          />
        </StyledMobile>
      </StyledInner>
    </StyledWrap>
  );
};
