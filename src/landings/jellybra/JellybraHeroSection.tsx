import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { JellybraCdn } from "./jellybraCdn";
import {
  JellybraSplitCta,
  JellybraSplitCtaDivider,
  JellybraSplitCtaPart,
} from "./JellybraPrimaryButton";

/**
 * Layout aligned to shapermint.com/.../adv-ebra-acq-v1-viral:
 * desktop split (copy left / banner right); mobile title → image → copy → CTA.
 */
const StyledSection = styled.section`
  background: var(--white);
  padding: var(--space-1000) 0 var(--space-800);
  @media (max-width: 899px) {
    padding: var(--space-800) 0 var(--space-600);
  }
`;

const StyledGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-400);
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
  gap: var(--space-1000);
  align-items: center;
  @media (max-width: 899px) {
    grid-template-columns: 1fr;
    gap: var(--space-600);
  }
`;

const StyledLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
  @media (max-width: 899px) {
    align-items: center;
    text-align: center;
  }
`;

const StyledH1 = styled.h1`
  font-family: var(--font-display);
  font-size: clamp(28px, 4vw, 36px);
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--ink-900);
  margin: 0;
  text-wrap: balance;
  max-width: 18ch;
  @media (max-width: 899px) {
    max-width: none;
  }
`;

const StyledMobileMedia = styled.div`
  display: none;
  @media (max-width: 899px) {
    display: block;
    width: 100%;
    margin-top: var(--space-600);
    margin-bottom: var(--space-200);
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: var(--coral-050);
    line-height: 0;
  }
`;

const StyledDesktopMedia = styled.div`
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--coral-050);
  line-height: 0;
  @media (max-width: 899px) {
    display: none;
  }
`;

const StyledLead = styled.p`
  font-family: var(--font-body);
  font-size: clamp(15px, 2vw, 17px);
  line-height: 1.55;
  color: var(--ink-900);
  margin: var(--space-500) 0 0;
  max-width: 38rem;
`;

const StyledCta = styled(JellybraSplitCta)`
  margin-top: var(--space-600);
  max-width: 360px;
`;

export const JellybraHeroSection = () => {
  const { t } = useTranslation("jellybra");

  return (
    <StyledSection aria-labelledby="jellybra-hero-title">
      <StyledGrid>
        <StyledLeft>
          <StyledH1 id="jellybra-hero-title">{t("hero.title")}</StyledH1>
          <StyledMobileMedia>
            <Image
              src={JellybraCdn.heroProduct}
              alt={t("hero.imageAlt")}
              width={720}
              height={900}
              priority
              unoptimized
              style={{ width: "100%", height: "auto" }}
            />
          </StyledMobileMedia>
          <StyledLead>
            <strong>{t("hero.leadBefore")}</strong>
            <br />
            {t("hero.leadMeet")}{" "}
            <strong>{t("hero.productName")}</strong> {t("hero.leadAfter")}
          </StyledLead>
          <StyledCta href="#offer">
            <JellybraSplitCtaPart>{t("offer.ctaLabel")}</JellybraSplitCtaPart>
            <JellybraSplitCtaDivider aria-hidden />
            <JellybraSplitCtaPart>{t("offer.ctaOffer")}</JellybraSplitCtaPart>
          </StyledCta>
        </StyledLeft>
        <StyledDesktopMedia>
          <Image
            src={JellybraCdn.heroProduct}
            alt={t("hero.imageAlt")}
            width={720}
            height={900}
            priority
            unoptimized
            style={{ width: "100%", height: "auto" }}
          />
        </StyledDesktopMedia>
      </StyledGrid>
    </StyledSection>
  );
};
