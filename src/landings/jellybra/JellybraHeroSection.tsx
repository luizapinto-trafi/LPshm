import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { JellybraCdn } from "./jellybraCdn";
import { JellybraPrimaryButton } from "./JellybraPrimaryButton";

/**
 * Layout aligned to shapermint.com/.../adv-ebra-acq-v1-viral:
 * desktop split (copy left / banner right); mobile title → image → copy → CTA.
 * Reviews sit above the title (HTML reference).
 */
const StyledSection = styled.section`
  background: var(--white);
  padding: var(--space-800) 0 var(--space-500);
  @media (max-width: 899px) {
    padding: var(--space-600) 0 var(--space-400);
  }
`;

const StyledGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-400);
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
  gap: var(--space-800);
  align-items: center;
  @media (max-width: 899px) {
    grid-template-columns: 1fr;
    gap: var(--space-500);
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

const StyledReviews = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 var(--space-300);
  @media (max-width: 899px) {
    justify-content: center;
  }
`;

const StyledStars = styled.span`
  color: var(--gold-500);
  font-size: 15px;
  letter-spacing: 1px;
  line-height: 1;
`;

const StyledReviewsLink = styled.a`
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 400;
  color: var(--ink-900);
  text-decoration: underline;
  &:hover {
    text-decoration: underline;
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
    margin-top: var(--space-500);
    margin-bottom: var(--space-200);
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: transparent;
    line-height: 0;
  }
`;

const StyledDesktopMedia = styled.div`
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: transparent;
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
  margin: var(--space-400) 0 0;
  max-width: 38rem;
`;

const StyledCta = styled(JellybraPrimaryButton)`
  margin-top: var(--space-500);
  max-width: 100%;
  @media (max-width: 899px) {
    width: 100%;
  }
`;

export const JellybraHeroSection = () => {
  const { t } = useTranslation("jellybra");

  return (
    <StyledSection aria-labelledby="jellybra-hero-title">
      <StyledGrid>
        <StyledLeft>
          <StyledReviews>
            <StyledStars aria-label={t("hero.starsAria")}>★★★★★</StyledStars>
            <StyledReviewsLink href="#reviews">{t("hero.reviewsLink")}</StyledReviewsLink>
          </StyledReviews>
          <StyledH1 id="jellybra-hero-title">{t("hero.title")}</StyledH1>
          <StyledMobileMedia>
            <Image
              src={JellybraCdn.heroProduct}
              alt={t("hero.imageAlt")}
              width={720}
              height={900}
              priority
              unoptimized
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </StyledMobileMedia>
          <StyledLead>
            <strong>{t("hero.leadBefore")}</strong>
            <br />
            {t("hero.leadMeet")}{" "}
            <strong>{t("hero.productName")}</strong> {t("hero.leadAfter")}
          </StyledLead>
          <StyledCta href="#offer">{t("hero.cta")}</StyledCta>
        </StyledLeft>
        <StyledDesktopMedia>
          <Image
            src={JellybraCdn.heroProduct}
            alt={t("hero.imageAlt")}
            width={720}
            height={900}
            priority
            unoptimized
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </StyledDesktopMedia>
      </StyledGrid>
    </StyledSection>
  );
};
