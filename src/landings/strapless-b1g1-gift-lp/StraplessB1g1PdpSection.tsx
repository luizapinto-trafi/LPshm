import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { useEffect, useState } from "react";
import { StraplessB1g1Cdn } from "./straplessB1g1Cdn";
import { StraplessPrimaryButton } from "./StraplessPrimaryButton";

const StyledSection = styled.section`
  background: var(--coral-075);
  padding: clamp(40px, 6vw, 72px) clamp(16px, 4vw, 32px) clamp(56px, 8vw, 96px);
`;

const StyledCardShell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  max-width: 920px;
  margin: 0 auto;
  position: relative;
  padding-top: 22px;
`;

const StyledFloatingBadge = styled.div`
  position: relative;
  align-self: center;
  z-index: 2;
  margin-bottom: -28px;
  background: var(--brand);
  color: var(--fg-inverse);
  padding: 10px clamp(20px, 4vw, 32px);
  border-radius: 999px;
  font-family: var(--font-display);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  box-shadow: var(--shadow-md);
  white-space: nowrap;
`;

const StyledCard = styled.div`
  background: var(--bg-raised);
  border-radius: 20px;
  box-shadow: var(--shadow-lg);
  padding: clamp(28px, 4vw, 44px) clamp(20px, 3vw, 40px) clamp(24px, 3vw, 36px);
`;

const StyledCardGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.4fr) minmax(0, 0.6fr);
  gap: clamp(20px, 3vw, 36px);
  align-items: stretch;
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const StyledImageWrap = styled.div`
  position: relative;
  width: 100%;
  min-height: 200px;
  background: var(--bg-subtle);
  border-radius: 16px;
  overflow: hidden;
  @media (min-width: 768px) {
    min-height: 0;
    height: 100%;
    align-self: stretch;
  }
  @media (max-width: 767px) {
    aspect-ratio: 4 / 5;
    max-height: 420px;
  }
  & img,
  & picture img,
  & span img {
    object-fit: cover;
    object-position: center;
  }
`;

const StyledRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
`;

const StyledFeatureList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StyledFeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-display);
  font-size: clamp(12px, 1.5vw, 13px);
  font-weight: 800;
  letter-spacing: 0.06em;
  color: var(--fg-1);
`;

const StyledCheckWrap = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  color: var(--accent-mint);
`;

const CheckIcon = () => (
  <StyledCheckWrap aria-hidden>
    <svg width="20" height="20" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <path
        d="M7 12l3 3 7-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </StyledCheckWrap>
);

const StyledOfferLine = styled.p`
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.05rem, 2.4vw, 1.35rem);
  font-weight: 800;
  line-height: 1.25;
  color: var(--fg-1);
  text-transform: uppercase;
  letter-spacing: 0.02em;
`;

const StyledSupporting = styled.p`
  margin: 0;
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.5;
  color: var(--fg-2);
`;

const StyledPromoCta = styled(StraplessPrimaryButton)`
  background: var(--brand-soft);
  color: var(--cool-900);
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 14px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border-radius: 10px;
  min-height: 52px;
  width: 100%;
  max-width: none;
  &:hover {
    background: var(--coral-250);
    color: var(--cool-900);
  }
  &:focus-visible {
    outline-color: var(--border-focus);
    outline-offset: 3px;
  }
`;

const StyledCountdown = styled.p`
  margin: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 4px var(--space-150);
  font-family: var(--font-display);
  font-size: clamp(13px, 1.8vw, 15px);
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--coral-700);
  font-variant-numeric: tabular-nums;
  text-align: center;
`;

const StyledTrustPill = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 6px 10px;
  padding: 10px 16px;
  border-radius: 999px;
  background-color: var(--coral-050);
  border: 1px solid var(--border);
  font-family: var(--font-body);
  font-size: 12px;
  line-height: 1.35;
  color: var(--fg-2);
`;

const StyledTrustStrong = styled.span`
  font-weight: 800;
  color: var(--fg-1);
`;

const StyledGuaranteeFoot = styled.p`
  margin: 0;
  text-align: center;
  font-family: var(--font-body);
  font-size: 12px;
  line-height: 1.45;
  color: var(--fg-3);
`;

const INITIAL_COUNTDOWN_SEC = 1 * 3600 + 29 * 60 + 30;

function formatCountdown(totalSec: number) {
  const s = Math.max(0, totalSec);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = s % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

export const StraplessB1g1PdpSection = () => {
  const { t } = useTranslation("straplessB1g1GiftLp", { keyPrefix: "b1g1Pdp" });
  const { t: tRoot } = useTranslation("straplessB1g1GiftLp");
  const [remainSec, setRemainSec] = useState(INITIAL_COUNTDOWN_SEC);

  useEffect(() => {
    const id = window.setInterval(() => {
      setRemainSec((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const features = [t("feature0"), t("feature1"), t("feature2")];

  return (
    <StyledSection id="buy" aria-label={`${t("pageHeadline")}. ${t("pageSubheadline")}`}>
      <StyledCardShell>
        <StyledFloatingBadge>{t("cardBadge")}</StyledFloatingBadge>
        <StyledCard role="region" aria-label={t("cardAria")}>
          <StyledCardGrid>
            <StyledImageWrap>
              <Image
                src={StraplessB1g1Cdn.colorBlack}
                alt={tRoot("pdp.gallery1Alt")}
                fill
                sizes="(max-width: 767px) 100vw, 38vw"
                priority
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </StyledImageWrap>

            <StyledRight>
              <StyledOfferLine>{t("offerLine")}</StyledOfferLine>

              <StyledSupporting>{t("supportingCopy")}</StyledSupporting>

              <StyledPromoCta href="https://shapermint.com">{t("cta")}</StyledPromoCta>

              <StyledFeatureList>
                {features.map((text) => (
                  <StyledFeatureItem key={text}>
                    <CheckIcon />
                    {text}
                  </StyledFeatureItem>
                ))}
              </StyledFeatureList>

              <StyledCountdown>
                <span>{t("countdownPrefix")}</span>
                <span>{formatCountdown(remainSec)}</span>
              </StyledCountdown>

              <StyledTrustPill>
                <span>{t("trustPillBefore")}</span> <StyledTrustStrong>{t("trustPillHigh")}</StyledTrustStrong>
                <span aria-hidden> | </span>
                <StyledTrustStrong>{t("trustPillFree")}</StyledTrustStrong>
                <span> {t("trustPillShipping")}</span>
              </StyledTrustPill>

              <StyledGuaranteeFoot>{t("guaranteeFooter")}</StyledGuaranteeFoot>
            </StyledRight>
          </StyledCardGrid>
        </StyledCard>
      </StyledCardShell>
    </StyledSection>
  );
};
