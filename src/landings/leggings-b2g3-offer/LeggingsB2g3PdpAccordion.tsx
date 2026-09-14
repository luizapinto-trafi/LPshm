import Image from "next/image";
import { useId, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { PDP_BENEFITS, PDP_DETAILS, PDP_VIDEO_EMBED } from "./leggingsB2g3Content";

/**
 * Right-column PDP accordion — matches live BOGO below the buybox.
 * Why open by default; Exchanges + Details collapsed.
 */

const StyledWrap = styled.div`
  margin-top: 0;
  padding-top: 0;
  width: 100%;
`;

const StyledItem = styled.div`
  border-top: 1px solid var(--ink-200);
  padding: 10px 0;
  &:last-of-type {
    border-bottom: 1px solid var(--ink-200);
  }
`;

const StyledBtn = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin: 0;
  padding: 6px 0;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  color: var(--ink-900);
  font-family: var(--font-display);
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
    border-radius: var(--radius-md);
  }
`;

const StyledTitle = styled.span`
  font-size: 18px;
  line-height: 28px;
  font-weight: 700;
`;

const StyledChevron = styled.span<{ $open?: boolean }>`
  flex: none;
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--ink-900);
  transform: rotate(${({ $open }) => ($open ? "180deg" : "0deg")});
  transition: transform 0.18s ease;
  svg {
    width: 14px;
    height: 14px;
  }
`;

const StyledPanel = styled.div`
  padding: 8px 0 16px;
`;

const StyledLead = styled.p`
  margin: 0 0 20px;
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 24px;
  color: var(--ink-900);
  strong {
    font-weight: 700;
  }
`;

const StyledBenefitList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const StyledBenefit = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 22px;
  font-weight: 700;
  color: var(--ink-900);
`;

const StyledBenefitIcon = styled.div`
  width: 36px;
  height: 36px;
  flex: none;
  position: relative;
`;

const StyledVideo = styled.div`
  margin-top: 24px;
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
  overflow: hidden;
  background: #efefef;
  iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const StyledPolicyP = styled.p`
  margin: 0 0 12px;
  font-size: 16px;
  line-height: 1.55;
  color: var(--ink-900);
  &:last-child {
    margin-bottom: 0;
  }
  a {
    color: #1a5cff;
    text-decoration: underline;
  }
`;

const StyledDetailsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const StyledDetailRow = styled.li`
  display: grid;
  grid-template-columns: 18px minmax(0, 1fr);
  gap: 8px 10px;
  align-items: start;
`;

const StyledDetailChevron = styled.span`
  display: inline-flex;
  margin-top: 3px;
  color: var(--coral-500);
  line-height: 0;
  svg {
    width: 10px;
    height: 14px;
  }
`;

const StyledDetailLabel = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: var(--ink-900);
`;

const StyledDetailValue = styled.div`
  grid-column: 2;
  font-size: 14px;
  line-height: 1.45;
  color: var(--ink-900);
`;

const ChevronIcon = () => (
  <svg viewBox="0 0 12 8" fill="none" aria-hidden>
    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const DetailChevronIcon = () => (
  <svg viewBox="0 0 6 10" fill="none" aria-hidden>
    <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

type AccordionId = "why" | "policy" | "details";

export const LeggingsB2g3PdpAccordion = () => {
  const { t } = useTranslation("leggingsB2g3");
  const uid = useId();
  const [open, setOpen] = useState<Record<AccordionId, boolean>>({
    why: true,
    policy: false,
    details: false,
  });

  const toggle = (id: AccordionId) => setOpen((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <StyledWrap>
      <StyledItem data-testid="pdp-accordion-why-love-tablet">
        <StyledBtn
          type="button"
          aria-expanded={open.why}
          aria-controls={`${uid}-why`}
          id={`${uid}-why-btn`}
          onClick={() => toggle("why")}
        >
          <StyledTitle>{t("pdp.whyTitle", { defaultValue: "Why you'll love it!" })}</StyledTitle>
          <StyledChevron $open={open.why} aria-hidden>
            <ChevronIcon />
          </StyledChevron>
        </StyledBtn>
        {open.why ? (
          <StyledPanel id={`${uid}-why`} role="region" aria-labelledby={`${uid}-why-btn`}>
            <StyledLead>
              <strong>The High-Waisted Shaping Leggings smooth and enhance your curves from waist to ankle</strong>{" "}
              while offering <strong>unmatched comfort for everyday</strong> wear. They&apos;re made with breathable,
              moisture-wicking fabric and go with every outfit. With an anti-roll silicon strip, they stay in place
              throughout the day. You&apos;ll feel confident and comfortable all day, from your waist to your ankles.
            </StyledLead>
            <StyledBenefitList>
              {PDP_BENEFITS.map((b) => (
                <StyledBenefit key={b.text}>
                  <StyledBenefitIcon>
                    <Image src={b.icon} alt="" width={36} height={36} unoptimized />
                  </StyledBenefitIcon>
                  <span>{b.text}</span>
                </StyledBenefit>
              ))}
            </StyledBenefitList>
            <StyledVideo>
              <iframe
                src={PDP_VIDEO_EMBED}
                title={t("pdp.videoTitle", { defaultValue: "High-Waisted Shaping Leggings product video" })}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </StyledVideo>
          </StyledPanel>
        ) : null}
      </StyledItem>

      <StyledItem data-testid="pdp-accordion-exchanges-returns">
        <StyledBtn
          type="button"
          aria-expanded={open.policy}
          aria-controls={`${uid}-policy`}
          id={`${uid}-policy-btn`}
          onClick={() => toggle("policy")}
        >
          <StyledTitle>
            {t("pdp.policyTitle", { defaultValue: "Hassle-Free Exchanges & Returns Policy" })}
          </StyledTitle>
          <StyledChevron $open={open.policy} aria-hidden>
            <ChevronIcon />
          </StyledChevron>
        </StyledBtn>
        {open.policy ? (
          <StyledPanel id={`${uid}-policy`} role="region" aria-labelledby={`${uid}-policy-btn`}>
            <StyledPolicyP>
              {t("pdp.policyP1", {
                defaultValue:
                  "We know that even with guidance, finding the perfect fit can take a try or two. That's why we offer easy exchanges within 60 days, so you can shop with confidence.",
              })}
            </StyledPolicyP>
            <StyledPolicyP>
              {t("pdp.policyP2", {
                defaultValue:
                  "Swap for a different size, color, or style you love within 60 days of delivery for free, or return your item for a $6 USD processing fee. Just make sure it's in good condition, with original tags, packaging, and hygiene seals fully intact. We'll take care of the rest!",
              })}
            </StyledPolicyP>
            <StyledPolicyP>
              <a href="https://shapermint.com/pages/returns-exchanges">
                {t("pdp.policyLink", { defaultValue: "See full Exchanges & Returns policy here." })}
              </a>{" "}
              {t("pdp.policyContact", { defaultValue: "Have questions? Contact us." })}
            </StyledPolicyP>
          </StyledPanel>
        ) : null}
      </StyledItem>

      <StyledItem data-testid="pdp-accordion-details">
        <StyledBtn
          type="button"
          aria-expanded={open.details}
          aria-controls={`${uid}-details`}
          id={`${uid}-details-btn`}
          onClick={() => toggle("details")}
        >
          <StyledTitle>{t("pdp.detailsTitle", { defaultValue: "Details" })}</StyledTitle>
          <StyledChevron $open={open.details} aria-hidden>
            <ChevronIcon />
          </StyledChevron>
        </StyledBtn>
        {open.details ? (
          <StyledPanel id={`${uid}-details`} role="region" aria-labelledby={`${uid}-details-btn`}>
            <StyledDetailsList>
              <StyledDetailRow>
                <StyledDetailChevron>
                  <DetailChevronIcon />
                </StyledDetailChevron>
                <StyledDetailLabel>{t("pdp.compressionLabel", { defaultValue: "Compression Level" })}</StyledDetailLabel>
                <StyledDetailValue>{PDP_DETAILS.compression}</StyledDetailValue>
              </StyledDetailRow>
              <StyledDetailRow>
                <StyledDetailChevron>
                  <DetailChevronIcon />
                </StyledDetailChevron>
                <StyledDetailLabel>{t("pdp.compositionLabel", { defaultValue: "Composition" })}</StyledDetailLabel>
                <StyledDetailValue>
                  {PDP_DETAILS.composition.map((line) => (
                    <div key={line}>- {line}</div>
                  ))}
                </StyledDetailValue>
              </StyledDetailRow>
              <StyledDetailRow>
                <StyledDetailChevron>
                  <DetailChevronIcon />
                </StyledDetailChevron>
                <StyledDetailLabel>{t("pdp.styleLabel", { defaultValue: "Style Number" })}</StyledDetailLabel>
                <StyledDetailValue>{PDP_DETAILS.styleNumber}</StyledDetailValue>
              </StyledDetailRow>
            </StyledDetailsList>
          </StyledPanel>
        ) : null}
      </StyledItem>
    </StyledWrap>
  );
};
